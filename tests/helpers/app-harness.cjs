// A small DOM model for bound-handler integration tests, not a layout/browser test.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { inspect } = require('node:util');
const root = path.join(__dirname, '../..');
const decode = value => String(value).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function makeDocument(html) {
  let doc;
  class Element {
    constructor(tag, attrs = {}, parent = null) {
      this.tagName = tag.toUpperCase(); this.attrs = attrs; this.parentElement = parent; this.children = [];
      this.dataset = Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith('data-')).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value]));
      this.checked = 'checked' in attrs; this.open = 'open' in attrs; this.hidden = 'hidden' in attrs; this.disabled = 'disabled' in attrs;
      this.value = attrs.value || ''; this._html = ''; this._text = ''; this.isConnected = true;
      this.style = { setProperty() {} };
      this.classList = {
        contains: name => (this.attrs.class || '').split(/\s+/).includes(name),
        add: name => { this.attrs.class = [...new Set((this.attrs.class || '').split(/\s+/).filter(Boolean).concat(name))].join(' '); },
        remove: name => { this.attrs.class = (this.attrs.class || '').split(/\s+/).filter(x => x !== name).join(' '); },
        toggle: (name, enabled) => { const next = enabled ?? !this.classList.contains(name); this.classList[next ? 'add' : 'remove'](name); return next; }
      };
    }
    get id() { return this.attrs.id || ''; }
    [inspect.custom]() { return '<' + this.tagName.toLowerCase() + (this.id ? '#' + this.id : '') + ' ' + JSON.stringify(this.dataset) + '>'; }
    get innerHTML() { return this._html; }
    set innerHTML(value) {
      for (const child of this.walk()) child.isConnected = false;
      this._html = String(value); this._text = ''; this.children = []; parse(this._html, this);
    }
    get textContent() { return this._text + this.children.map(child => child.textContent).join(''); }
    set textContent(value) { this._text = String(value); this._html = String(value); this.children = []; }
    *walk() { for (const child of this.children) { yield child; yield* child.walk(); } }
    setAttribute(key, value) { this.attrs[key] = String(value); }
    getAttribute(key) { return this.attrs[key] ?? null; }
    hasAttribute(key) { return key in this.attrs; }
    focus() { doc.activeElement = this; }
    scrollIntoView() { doc.lastScrolled = this; }
    querySelectorAll(selector) { return [...this.walk()].filter(node => matches(node, selector)); }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    closest(selector) { for (let node = this; node; node = node.parentElement) if (matches(node, selector)) return node; return null; }
  }
  function simple(node, selector) {
    const outsideAttributes = selector.replace(/\[[^\]]*\]/g, '');
    const tag = outsideAttributes.match(/^[a-z][\w-]*/i)?.[0];
    if (tag && node.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    const id = outsideAttributes.match(/#([\w-]+)/)?.[1]; if (id && node.id !== id) return false;
    for (const [, cls] of outsideAttributes.matchAll(/\.([\w-]+)/g)) if (!node.classList.contains(cls)) return false;
    for (const [, key, , value] of selector.matchAll(/\[([\w-]+)(?:=(['"]?)(.*?)\2)?\]/g)) {
      if (!(key in node.attrs)) return false;
      if (value !== undefined && node.attrs[key] !== value) return false;
    }
    return true;
  }
  function matches(node, selector) {
    if (selector.includes(',')) return selector.split(',').some(part => matches(node, part.trim()));
    const parts = selector.trim().split(/\s+(?=(?:[^"']|"[^"]*"|'[^']*')*$)/);
    if (!simple(node, parts.pop())) return false;
    for (const part of parts.reverse()) {
      node = node.parentElement;
      while (node && !simple(node, part)) node = node.parentElement;
      if (!node) return false;
    }
    return true;
  }
  function parse(source, parent) {
    const stack = [parent];
    for (const token of source.match(/<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/g) || []) {
      if (/^<!/.test(token)) continue;
      if (/^<\//.test(token)) {
        const tag = token.match(/^<\/\s*([\w-]+)/)?.[1]?.toUpperCase();
        for (let i = stack.length - 1; i > 0; i--) if (stack[i].tagName === tag) { stack.length = i; break; }
      } else if (/^</.test(token)) {
        const match = token.match(/^<([\w-]+)([\s\S]*?)\/?\s*>$/); if (!match) continue;
        const attrs = {};
        for (const [, key, double, single, bare] of match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) attrs[key] = decode(double ?? single ?? bare ?? '');
        const node = new Element(match[1], attrs, stack.at(-1)); stack.at(-1).children.push(node);
        if (!voidTags.has(match[1].toLowerCase()) && !token.endsWith('/>')) stack.push(node);
      } else stack.at(-1)._text += decode(token);
    }
    for (const node of parent.walk()) {
      if (node.tagName === 'TEXTAREA') node.value = node.textContent;
      if (node.tagName === 'SELECT') node.value = (node.querySelector('option[selected]') || node.querySelector('option'))?.value || '';
    }
  }
  doc = new Element('document'); doc.innerHTML = html; doc.body = doc.querySelector('body');
  doc.getElementById = id => doc.querySelector('#' + id); doc.addEventListener = () => {};
  return doc;
}

function app({ memory = {}, hash = '', now = null, cloudClient = null } = {}) {
  const listeners = {}, confirmations = [], doc = makeDocument(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
  let allowNavigation = true;
  const location = { hash };
  const entries = [hash], history = {
    index: 0,
    pushState(state, title, url) { entries.splice(++this.index); entries.push(url); location.hash = url; },
    replaceState(state, title, url) { entries[this.index] = url; location.hash = url; },
    go(delta) { this.index = Math.min(entries.length - 1, Math.max(0, this.index + delta)); location.hash = entries[this.index]; ctx.dispatchEvent({ type: 'popstate' }); },
    back() { this.go(-1); }, forward() { this.go(1); }, entries
  };
  class FakeFormData {
    constructor(form) {
      this.values = {};
      for (const input of form.querySelectorAll('input,textarea,select')) {
        const name = input.attrs.name; if (!name || input.disabled || (['checkbox', 'radio'].includes(input.attrs.type) && !input.checked)) continue;
        (this.values[name] ||= []).push(input.value || (input.attrs.type === 'checkbox' ? 'on' : ''));
      }
    }
    get(name) { return this.values[name]?.[0] ?? null; }
    getAll(name) { return this.values[name] || []; }
  }
  const NativeDate = Date;
  const ClockDate = now === null ? Date : class extends NativeDate { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return +new NativeDate(now); } };
  const ctx = { window: null, URL, Intl, Date: ClockDate, console, FormData: FakeFormData, document: doc, location, history,
    localStorage: { getItem: key => memory[key] || null, setItem: (key, value) => { memory[key] = value; }, removeItem: key => { delete memory[key]; } },
    addEventListener: (name, fn) => { (listeners[name] ||= []).push(fn); },
    dispatchEvent: event => { for (const fn of listeners[event.type] || []) fn(event); },
    CustomEvent: class { constructor(type, options = {}) { this.type = type; this.detail = options.detail; } },
    setInterval() {}, setTimeout, clearTimeout, confirm: message => { confirmations.push(message); return allowNavigation; }, PHD_CLOUD_CONFIG: { enabled: false }
  };
  ctx.window = ctx; vm.createContext(ctx);
  for (const file of ['course-lessons.js', 'career-curriculum.js', 'learning-modules.js', 'project-outline.js', 'video-learning.js', 'internship-data.js', 'career-state.js', 'goal-ui.js', 'lesson-ui.js', 'cloud-sync.js', 'career-ui.js', 'module-hub.js', 'app.js']) {
    if (fs.existsSync(path.join(root, file))) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
    if (file === 'cloud-sync.js' && cloudClient) {
      const create = ctx.PhdCloud.create;
      ctx.PhdCloud.create = options => create({ ...options, client: cloudClient });
    }
  }
  return { ctx, document: doc, memory, confirmations, setConfirmation: value => { allowNavigation = value; }, query: selector => doc.querySelector(selector), all: selector => doc.querySelectorAll(selector), evaluate: source => vm.runInContext(source, ctx), destroy: () => ctx.AppProgress.sync().destroy() };
}
module.exports = { app, makeDocument };
