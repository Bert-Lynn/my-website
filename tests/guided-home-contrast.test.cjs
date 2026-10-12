'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const ui = fs.readFileSync(path.join(root, 'career-ui.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'career.css'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// The new light surface must never reuse the former dark continuation theme.
assert(ui.includes('class="next-action-panel"'));
assert(!ui.includes('class="next-action-panel flow-continue"'));
assert(!css.includes('.next-action-panel.flow-continue'));
const rules = selector => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  .filter(match => match[1].trim() === selector).map(match => match[2]);
const declaration = (selector, property) => rules(selector).flatMap(rule => [...rule.matchAll(new RegExp('(?:^|;)\\s*' + property + '\\s*:\\s*([^;]+)', 'g'))].map(match => match[1].trim())).at(-1);
assert.equal(declaration('.next-action-panel', 'background'), '#fff');
assert.equal(declaration('.next-action-panel', 'color'), 'var(--ink)');
assert.equal(declaration('.next-action-panel h2', 'color'), 'var(--ink)');
assert.equal(declaration('.primary-button', 'background'), 'var(--ink)');
assert.equal(declaration('.primary-button', 'color'), 'var(--surface)!important');
assert(!rules('.next-action-cta .primary-button').some(rule => /background\s*:\s*(?:#fff|var\(--surface\))/.test(rule)));
assert(html.includes('./career.css?v=20261011-workassistant1'),'unchanged base CSS identity retained');
assert(html.includes('./career-ui.js?v=20261012-video1'),'task clarity UI cache invalidated');
assert(html.includes('./task-focus.css?v=20261012-refined1'),'isolated task clarity overrides loaded');
assert(css.includes('html{scroll-padding-top:100px}'), 'desktop navigation leaves room for the sticky header');
assert(css.includes('@media(max-width:760px){html{scroll-padding-top:128px}'), 'narrow navigation leaves room for two header rows');
console.log('PASS guided-home contrast: independent light panel, explicit charcoal heading, dark primary action, and refreshed assets. Pixel verification remains a separate live-browser check.');
