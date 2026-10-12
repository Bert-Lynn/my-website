'use strict';
// DOM and data contracts. Browser screenshots validate computed layout separately.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const { app } = require('./helpers/app-harness.cjs');
const root = path.join(__dirname, '..'), read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = require('../data/employer-events.json');
const load = h => { for (const file of ['employer-events.js', 'employer-events-ui.js']) vm.runInContext(read(file), h.ctx, { filename: file }); };
const state = h => JSON.stringify({ memory: h.memory, tasks: h.ctx.AppProgress.sync().snapshot(), lessons: h.ctx.AppProgress.sync().lessonSnapshot(), career: h.ctx.phdCareerProgress.read() });
(async () => {
  require('../scripts/validate-employer-events.cjs');
  const generated = { window: {} }; vm.runInNewContext(read('employer-events.js'), generated);
  assert.deepEqual(JSON.parse(JSON.stringify(generated.window.EMPLOYER_EVENTS)), data);
  const html = read('index.html');
  for (const file of ['employer-events.css', 'employer-events.js', 'employer-events-ui.js']) assert(html.includes('./' + file + '?v=20261012-events1'));
  const h = app({ hash: '#roles' }); await h.ctx.AppProgress.sync().start();
  const before = state(h); load(h); assert.equal(state(h), before);
  const panel = h.query('#employerEvents');
  assert.equal(panel.closest('[data-panel]').dataset.panel, 'roles');
  assert.equal(h.query('.event-featured').dataset.employerEvent, 'cozeloop-contribution');
  assert.equal(h.all('.event-featured').length, 1); assert.equal(h.all('.event-option').length, 4);
  assert.equal(h.query('.event-later').open, false);
  assert(h.all('#employerEvents details').every(details => details.open === false));
  assert.equal(h.all('#employerEvents input, #employerEvents form, #employerEvents button, #employerEvents [role="progressbar"]').length, 0);
  for (const item of data.items) {
    const card = h.query('[data-employer-event="' + item.id + '"]'); assert(card);
    for (const field of ['shortTitle', 'participation', 'skills', 'output', 'recognition', 'recognitionLimit', 'dateSummary']) assert(card.textContent.includes(item.presentation[field]), item.id + ' shows ' + field);
    assert(card.textContent.includes(item.status.label));
    assert(card.textContent.includes(item.employerRecognition.limit));
    for (const id of item.sourceIds) {
      const source = data.sources.find(source => source.id === id);
      assert(card.querySelector('a[href="' + source.url + '"]'), 'Exact official source is retained: ' + id);
      if (source.accessNote) assert(card.textContent.includes(source.accessNote));
    }
  }
  assert(h.query('.event-boundary').textContent.includes('旁听'));
  for (const anchor of h.all('#employerEvents a')) {
    const url = new URL(anchor.getAttribute('href')); assert(['https:', 'http:'].includes(url.protocol) && !url.username && !url.password);
    assert.equal(anchor.getAttribute('target'), '_blank'); assert.equal(anchor.getAttribute('rel'), 'noopener noreferrer');
  }
  for (const details of h.all('#employerEvents details')) { details.open = true; details.open = false; }
  assert.equal(state(h), before, 'Expanding and closing options cannot write progress');
  h.ctx.AppNavigation.open('execution'); h.ctx.AppNavigation.open('resources'); h.ctx.history.back(); h.ctx.history.back();
  assert.equal(h.ctx.AppNavigation.route(), 'roles'); assert.equal(state(h), before);
  const form = h.query('#currentTaskList [data-milestone-form="wa-m0"]'); h.ctx.AppNavigation.open('execution');
  form.querySelector('[name="milestoneEvidence"]').value = 'https://example.com/events-unsaved'; form.oninput(); h.setConfirmation(false);
  assert.equal(h.ctx.AppNavigation.open('roles'), false, 'Existing dirty-form guard is preserved'); h.setConfirmation(true); h.ctx.AppNavigation.open('roles');
  const original = JSON.stringify(h.ctx.EMPLOYER_EVENTS); const attack = '<img src=x onerror=alert(1)>';
  h.ctx.EMPLOYER_EVENTS.items[0].presentation.shortTitle = attack;
  h.ctx.EMPLOYER_EVENTS.items[0].presentation.skills = attack;
  h.ctx.EMPLOYER_EVENTS.items[0].employerRecognition.limit = attack;
  h.ctx.EMPLOYER_EVENTS.sources[0].url = 'javascript:alert(1)';
  h.ctx.EMPLOYER_EVENTS.sources[1].url = 'https://user:password@example.com/';
  h.ctx.EmployerEventsUI.render(); assert.equal(h.all('#employerEvents img').length, 0); assert(h.query('#employerEvents').textContent.includes(attack));
  assert(!h.all('#employerEvents a').some(anchor => /javascript:|user:password/.test(anchor.getAttribute('href'))));
  h.ctx.EMPLOYER_EVENTS = undefined; h.ctx.EmployerEventsUI.render(); assert(h.query('.event-unavailable')); assert(h.query('#careerRoles').textContent.includes('400–600'));
  h.ctx.EMPLOYER_EVENTS = JSON.parse(original); h.ctx.EmployerEventsUI.render(); assert.equal(h.all('.event-option').length, 4);
  const css = read('employer-events.css'), ui = read('employer-events-ui.js');
  assert(/max-width:700px/.test(css) && /min-height:44px/.test(css) && /focus-visible/.test(css));
  assert(!/https?:\/\/|@import/.test(css));
  assert(!/localStorage|fetch\(|setMilestone|setLesson|setRole|XMLHttpRequest/.test(ui));
  h.destroy();
  console.log('PASS employer activities: roles-only, one visible/four folded, full evidence and caveats, safe links/text, missing-data fallback, history and dirty-form protection, unchanged private state.');
})().catch(error => { console.error(error); process.exitCode = 1; });
