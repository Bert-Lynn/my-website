'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { app, makeDocument } = require('./helpers/app-harness.cjs');
const plain = value => JSON.parse(JSON.stringify(value));
const click = node => { assert(node, 'click target exists'); assert.equal(typeof node.onclick, 'function'); return node.onclick({ preventDefault() {}, currentTarget: node }); };
const root = path.join(__dirname, '..');
const now = '2026-11-10T00:00:00.000Z';
const oldDate = '2026-10-01T08:00:00.000Z';
const keys = { tasks: 'lin-ai-phd-roadmap-progress-v1', lessons: 'lin-ai-phd-roadmap-lessons-v1', dates: 'lin-ai-phd-roadmap-completion-dates-v1', career: 'lin-ai-phd-roadmap-career-v1' };
const snapshots = h => plain({ tasks: h.ctx.AppProgress.sync().snapshot(), lessons: h.ctx.AppProgress.sync().lessonSnapshot(), taskDates: h.ctx.AppProgress.sync().taskCompletedAtSnapshot(), lessonDates: h.ctx.AppProgress.sync().lessonCompletedAtSnapshot(), career: h.ctx.phdCareerProgress.read() });
const assertCover = h => {
  assert.equal(h.ctx.AppNavigation.current(), 'cover');
  assert.equal(h.ctx.AppNavigation.route(), 'cover');
  assert.equal(h.query('#cover').hidden, false);
  assert.equal(h.query('#workspaceShell').hidden, true, 'cover hides the whole workspace, including its interactive navigation');
  assert.equal(h.query('#workspace').hidden, true);
  assert.equal(h.document.body.getAttribute('data-current-page'), 'cover');
};
const assertWorkspace = (h, page = 'execution') => {
  assert.equal(h.ctx.AppNavigation.current(), page);
  assert.equal(h.query('#cover').hidden, true);
  assert.equal(h.query('#workspaceShell').hidden, false);
};

(async () => {
  // Static HTML must start with the cover: no task-list flash or second overlay to dismiss.
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const initial = makeDocument(html);
  assert(initial.querySelector('#cover'));
  assert.equal(initial.querySelector('#cover').hidden, false);
  assert.equal(initial.body.getAttribute('data-current-page'), 'cover');
  const heading = initial.querySelector('#coverTitle');
  assert.equal(heading.tagName, 'H1');
  assert.equal(heading.getAttribute('tabindex'), '-1', 'route focus has a heading target');
  const entry = initial.querySelector('#enterWorkspace');
  assert.equal(entry.tagName, 'A', 'the entry is keyboard-operable without a custom key handler');
  assert.equal(entry.getAttribute('href'), '#modules');
  assert(entry.textContent.includes('进入成长工作台'), 'entry destination is explicit');
  assert(!entry.hasAttribute('target'), 'entry stays in the current tab');
  assert.equal(initial.querySelector('#cover').querySelectorAll('input,select,textarea,form').length, 0, 'decorative cover has no pretend progress controls');
  assert(!/\d+\s*%|\d+\s*\/\s*\d+\s*(?:已完成|项已完成)/.test(initial.querySelector('#cover').textContent), 'cover does not advertise fabricated completion');
  const coverStyle = initial.querySelector('link[href="./cover.css?v=20261011-cover1"]');
  assert(coverStyle, 'versioned isolated cover stylesheet is loaded');
  const css = fs.readFileSync(path.join(root, 'cover.css'), 'utf8');
  assert(css.includes('body[data-current-page=cover] #workspaceShell{display:none}'), 'cover state hides the workspace before app initialization');
  assert(css.includes('body:not([data-current-page=cover]) .site-cover{display:none}'), 'explicit deep links do not flash the cover');
  assert(css.includes(':focus-visible'), 'keyboard focus is visibly styled');
  assert(css.includes('prefers-reduced-motion'), 'cover honors the reduced-motion preference');
  assert(/@media\s*\([^)]*max-width/.test(css), 'narrow-screen cover layout is defined');
  assert(!/https?:\/\//.test(css), 'cover needs no third-party visual assets or request');
  const colorFor = selector => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(match => match[1].trim() === selector)
    .flatMap(match => [...match[2].matchAll(/(?:^|;)\s*color\s*:\s*(#[0-9a-f]{6})/ig)].map(color => color[1])).at(-1);
  const luminance = hex => hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
    .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
  for (const selector of ['.cover-footer', '.cover-footer>span:last-child']) {
    const color = colorFor(selector); assert(color, selector + ' has an explicit text color');
    assert((luminance('#fafbfc') + .05) / (luminance(color) + .05) >= 4.5, 'small cover footer text meets 4.5:1 contrast on its background');
  }


  const memory = {
    [keys.tasks]: JSON.stringify({ 'sep-python': true, 'sep-git': false }),
    [keys.lessons]: JSON.stringify({ 'python-basics': 'done', 'u-sql-select': 'done' }),
    [keys.dates]: JSON.stringify({ 'task:sep-python': oldDate, 'lesson:python-basics': oldDate, 'lesson:u-sql-select': oldDate }),
    [keys.career]: JSON.stringify({ selectedRole: 'agent_engineering', 'milestone:demand-decision-lab:ddl-m0': { status: 'done', evidenceUrl: 'https://example.com/synthetic-legacy-evidence', completedAt: oldDate } }),
    unrelated: 'keep'
  };
  let h = app({ memory, now }), ctx = h.ctx;
  await ctx.AppProgress.sync().start();
  assertCover(h);
  assert.equal(ctx.location.hash, '', 'startup does not overwrite the bare URL');
  click(h.query('#skipLink'));
  assert.equal(h.document.activeElement, h.query('#coverTitle'));
  assert.equal(ctx.location.hash, '', 'cover skip link focuses content without mutating the route');
  const before = snapshots(h), persisted = plain(memory);
  assert.equal(before.tasks['sep-python'], true);
  assert.equal(before.taskDates['sep-python'], oldDate);
  assert.equal(before.lessons['python-basics'], 'done');
  assert.equal(before.lessons['u-sql-select'], 'done');
  assert.equal(before.career.milestones['demand-decision-lab']['ddl-m0'].completedAt, oldDate);
  click(h.query('#enterWorkspace'));
  assertWorkspace(h, 'modules');
  assert.equal(ctx.location.hash, '#modules');
  assert.equal(h.query('#modules').hidden, false);
  assert.equal(h.query('#workspace').hidden, true, 'the chooser does not expose the task list');
  assert.equal(h.document.activeElement, h.query('#pageTitle'), 'entry moves keyboard focus to module chooser heading');
  click(h.query('#skipLink'));
  assert.equal(h.document.activeElement, h.query('#pageTitle'));
  assert.equal(ctx.location.hash, '#modules', 'workspace skip link preserves the hub route');
  assert.equal(h.query('#mainTabs').querySelectorAll('[data-page]')[0].dataset.page, 'execution');
  assert(h.query('#taskGroups').textContent.includes('2026.11'));
  assert(h.query('#taskGroups').textContent.includes('顺延'));
  const firstEntryCount = ctx.history.entries.length;
  click(h.query('#enterWorkspace'));
  assert.equal(ctx.history.entries.length, firstEntryCount, 'repeat entry does not duplicate history');
  ctx.history.back(); assertCover(h);
  assert.equal(h.document.activeElement, h.query('#coverTitle'));
  assert.equal(h.document.lastScrolled, h.query('#cover'), 'returning to cover keeps its brand and introduction visible');
  ctx.history.forward(); assertWorkspace(h, 'modules');
  assert.equal(ctx.location.hash, '#modules');
  click(h.query('[data-hub-route="execution/month"]')); assertWorkspace(h);
  assert.equal(ctx.location.hash, '#execution/month');
  click(h.query('#mainTabs [data-page="resources"]')); assertWorkspace(h, 'resources');
  click(h.query('#homeBtn')); assertWorkspace(h, 'modules');
  click(h.query('#moreNavigation [data-page="cover"]')); assertCover(h);
  click(h.query('#enterWorkspace')); assertWorkspace(h, 'modules');
  for (const page of ['modules', 'today', 'overview', 'timeline', 'outcomes', 'projects', 'roles', 'skills', 'assessments', 'storage', 'resources', 'execution']) {
    assert.equal(ctx.AppNavigation.open(page), true);
    assertWorkspace(h, page);
  }
  assert.deepEqual(snapshots(h), before, 'cover entry/return and normal navigation never complete or reset anything');
  assert.deepEqual(plain(memory), persisted, 'cover introduces no local preference, progress, or completion-date writes');

  // Cover links and browser navigation reuse the existing unsaved-project guard.
  ctx.AppNavigation.open('learn/code');
  const form = h.query('.module-project-output [data-milestone-form="aca-m0"]'); assert(form);
  form.querySelector('[name="milestoneEvidence"]').value = 'https://example.com/synthetic-unsaved-cover-draft'; form.oninput();
  h.setConfirmation(false);
  click(h.query('#moreNavigation [data-page="cover"]'));
  assertWorkspace(h, 'resources');
  assert.equal(ctx.location.hash, '#learn/code');
  assert.equal(h.query('.module-project-output [data-milestone-form="aca-m0"]'), form, 'cancel keeps the exact dirty form');
  ctx.history.back();
  assert.equal(ctx.location.hash, '#learn/code', 'cancelled history restores the displayed route');
  assert.equal(h.query('.module-project-output [data-milestone-form="aca-m0"]'), form);
  const confirmations = h.confirmations.length;
  ctx.dispatchEvent({ type: 'hashchange' });
  assert.equal(h.confirmations.length, confirmations, 'the matching hashchange does not ask twice after popstate');
  assert.equal(h.query('.module-project-output [data-milestone-form="aca-m0"]'), form);
  ctx.location.hash = '#cover'; ctx.dispatchEvent({ type: 'hashchange' });
  assert.equal(ctx.location.hash, '#learn/code', 'direct hash changes also respect the unsaved guard');
  assert.equal(h.query('.module-project-output [data-milestone-form="aca-m0"]'), form);
  h.setConfirmation(true); click(h.query('#moreNavigation [data-page="cover"]')); assertCover(h);
  assert.deepEqual(snapshots(h), before, 'discarding the draft to return to cover never saves it');
  assert.deepEqual(plain(memory), persisted);
  h.destroy();

  // Direct task/module/account links bypass the cover, including on reload.
  for (const [hash, page] of [['#modules', 'modules'], ['#execution/research', 'execution'], ['#execution', 'execution'], ['#learn/code', 'resources'], ['#storage', 'storage'], ['#today', 'today']]) {
    h = app({ memory, hash, now }); ctx = h.ctx; await ctx.AppProgress.sync().start();
    assertWorkspace(h, page); assert.equal(ctx.location.hash, hash);
    assert.deepEqual(snapshots(h), before);
    if (page === 'storage') {
      assert.equal(h.query('#resetBtn').hidden, false, 'existing task-reset control stays reachable without activating it');
      assert(h.query('#cloudControls').textContent.includes('本机勾选仍会保存'));
    } else assert.equal(h.query('#resetBtn').hidden, true);
    h.destroy();
  }
  for (const hash of ['', '#cover']) {
    h = app({ memory, hash, now }); await h.ctx.AppProgress.sync().start();
    assertCover(h); assert.deepEqual(snapshots(h), before); h.destroy();
  }
  // These are synthetic callback values, not a real login or password-reset test.
  for (const hash of ['#access_token=synthetic-not-a-token&type=recovery', '#error=access_denied&error_description=synthetic', '#unknown-existing-link']) {
    h = app({ memory, hash, now }); await h.ctx.AppProgress.sync().start();
    assertWorkspace(h); assert.equal(h.ctx.location.hash, hash, 'unrecognized nonempty callback hashes are never rewritten by the cover');
    assert.deepEqual(snapshots(h), before); h.destroy();
  }
  console.log('PASS cover entry: semantic accessible landing, cover-to-hub entry and selected tasks, direct/reload route bypass, focus, history, repeat clicks, dirty-form guards, callback-hash preservation, reachable account/reset controls, and unchanged independent saved records. CSS checks are structural; desktop/narrow pixel and real-auth verification remain separate.');
})().catch(error => { console.error(error); process.exitCode = 1; });
