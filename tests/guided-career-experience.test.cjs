'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { app } = require('./helpers/app-harness.cjs');
const catalog = require('../data/learning-modules.json');
const curriculum = require('../data/career-curriculum.json');
const project = require('../data/project-outline.json');
const agent = catalog.tracks.find(track => track.id === 'agent_engineering');
const first = agent.firstSession;
const agentCanonical = curriculum.tracks.find(track => track.id === 'agent_engineering');
const agentUnitCount = agentCanonical.requiredLearningUnitIds.length;
const plain = value => JSON.parse(JSON.stringify(value));
const click = node => { assert(node, 'expected action exists'); assert.equal(typeof node.onclick, 'function'); return node.onclick({ preventDefault() {}, currentTarget: node }); };
const includes = (node, value, message) => { assert(node, message + ': target exists'); assert(node.textContent.includes(value), message); };
const currentFlowId = h => h.query('.module-flow [aria-current="step"]')?.dataset.openModule;
const careerKey = 'lin-ai-phd-roadmap-career-v1';
const lessonKey = 'lin-ai-phd-roadmap-lessons-v1';

// Public guidance must remain a small on-ramp to an existing unit, not a new completion identity.
assert(first, 'Agent route supplies one concrete first session');
assert.equal(first.minutes, 30);
assert.equal(first.unitId, 'u-python-diagnostic');
assert.equal(curriculum.learningUnits.find(unit => unit.id === first.unitId).estimatedMinutes, 90);
assert.equal(agent.requiredUnitCount, agentUnitCount);
for (const key of ['title', 'output', 'saveInstruction', 'completionNote', 'environmentNote']) assert(first[key]?.trim(), 'first session explains ' + key);
assert(first.steps.length >= 3 && first.steps.every(step => step.title && step.text), 'first session has concrete ordered instructions');
const windows = first.steps.map(step => String(step.minutes).match(/^(\d+)–(\d+) 分钟$/)).map(match => { assert(match, 'step has a bounded minute window'); return [Number(match[1]), Number(match[2])]; });
assert.equal(windows[0][0], 0); assert.equal(windows.at(-1)[1], 30);
windows.slice(1).forEach((window, i) => assert.equal(window[0], windows[i][1], 'practice windows are contiguous'));
for (const expected of first.expected) {
  const feasible = first.sample.filter(row => row.totalCostCny <= expected.budgetCny).sort((a, b) => a.totalHours - b.totalHours);
  assert.equal(expected.result, feasible[0]?.flight || '没有符合条件的选项', 'published expected output is hand-checkable');
}
assert(first.materials.length && first.materials.every(source => /^https:\/\//.test(source.url) && source.scope), 'first session limits exact linked source scope');
assert(catalog.homeIntro.careerGoal && catalog.homeIntro.relationship.length && catalog.homeIntro.growth.length, 'why, work and longer-term growth are explicit public content');
assert.equal(new Set(agent.modules.flatMap(module => module.unitIds)).size, agentUnitCount);

(async () => {
  let h = app(), ctx = h.ctx;
  await ctx.AppProgress.sync().start();
  assert.equal(ctx.phdCareerProgress.read().selectedRole, 'agent_engineering');
  const home = h.query('#careerToday');
  assert(home.innerHTML.indexOf('next-action-panel') < home.innerHTML.indexOf('module-flow'), 'today action precedes the complete roadmap');
  assert.equal(h.all('.next-action-panel .primary-button').length, 1, 'one dominant next action');
  includes(h.query('.next-action-panel'), first.title, 'homepage names the actual first task');
  includes(h.query('.next-action-panel'), first.output, 'homepage says what the user will have made');
  includes(h.query('.next-action-panel'), '30', 'small first-session time estimate is visible');
  includes(h.query('.next-action-panel'), '项目目录', 'home says where actual work belongs');
  includes(h.query('.next-action-panel'), '学习路线', 'home says where to continue next time');
  includes(h.query('.flow-goal'), catalog.homeIntro.careerGoal, 'career why is visible next to the action');
  assert.equal(h.all('#careerToday [data-unit-check]').length, 0, 'homepage is not a course checkbox catalogue');
  assert.equal(h.all('.module-flow [data-open-module]').length, 6);
  assert.equal(h.all('.home-progress-strip [role="progressbar"]').length, 2, 'study and project have separate actual-progress bars');
  assert.deepEqual(h.all('.home-progress-strip [role="progressbar"]').map(node => node.getAttribute('aria-valuemax')), [String(agentUnitCount), '6']);
  assert(h.all('.home-progress-strip [role="progressbar"]').every(node => node.getAttribute('aria-valuenow') === '0'));
  for (const stage of project.milestones) {
    const row = h.query('.module-flow [data-open-module="' + stage.moduleId + '"]');
    includes(row, stage.title, stage.id + ': road explains the corresponding output');
  }
  const initialRecords = plain(ctx.phdCareerProgress.read());
  click(h.query('[data-start-session]'));
  assert.equal(ctx.location.hash, '#learn/code');
  assert.equal(ctx.CareerUI.currentModule().id, 'code');
  const session = h.query('#firstSession');
  assert(session);
  includes(session, first.output, 'module preserves the promised first-session output');
  includes(session, first.saveInstruction, 'module says where work and website records are saved');
  includes(session, first.completionNote, 'short activity cannot masquerade as full-unit completion');
  includes(session, first.environmentNote, 'setup prerequisite and estimate boundary are explicit');
  for (const step of first.steps) includes(session, step.text, 'concrete step instructions are rendered');
  for (const source of first.materials) {
    const anchor = session.querySelector('a[href="' + source.url + '"]');
    assert(anchor, 'first-session source keeps exact URL: ' + source.title);
    assert.equal(anchor.getAttribute('target'), '_blank');
    assert.match(anchor.getAttribute('rel'), /noopener/);
  }
  assert.equal(h.all('#firstSession [data-unit-check]').length, 0, 'on-ramp introduces no competing completion checkbox');
  assert.equal(h.all('#careerLearning [data-unit-check]').length, 4);
  assert(h.query('#careerLearning').innerHTML.indexOf('firstSession') < h.query('#careerLearning').innerHTML.indexOf('module-lessons'));
  click(h.query('[data-session-next]'));
  assert.equal(ctx.location.hash, '#learn/code', 'next instructional action stays in the module');
  assert.equal(h.document.lastScrolled, h.query('.module-lessons'), 'next instructional action reaches complete lesson work');
  assert.deepEqual(plain(ctx.phdCareerProgress.read()), initialRecords, 'opening and reading instructions creates no career completion');
  assert.equal(ctx.CareerUI.stats().lessons.done, 0);
  assert.equal(ctx.CareerUI.mainProjectStats().done, 0);
  assert.equal(ctx.LessonUI.stats().done, 0);
  assert.equal(h.evaluate('tally(tasks).done'), 0);
  assert.equal(h.query('#legacyLearningArchive').open, false);

  // The new CTA must use the existing navigation guard even when activated during an unfinished form.
  ctx.CareerUI.openSkill('ai-code');
  const form = h.query('#assessmentForm');
  form.querySelector('[name="evidenceNote"]').value = 'UNSAVED guided-experience QA'; form.oninput();
  h.setConfirmation(false); click(h.query('[data-start-session]'));
  assert.equal(ctx.location.hash, '#assessments');
  assert(h.query('#assessmentForm') === form, 'cancel keeps the same unsaved form node');
  h.destroy();

  // Resume exact progress, with the small introduction out of the way after its canonical unit is done.
  const firstDone = { [lessonKey]: JSON.stringify({ 'u-python-diagnostic': 'done' }) };
  h = app({ memory: firstDone, hash: '#learn/code' }); ctx = h.ctx;
  await ctx.AppProgress.sync().start();
  assert.equal(h.query('#firstSession'), null, 'returning learner is not forced through the already-completed starter');
  assert.equal(h.query('[data-start-session]'), null);
  includes(h.query('.next-action-panel'), project.milestones[0].title, 'homepage still follows the outstanding project output');
  assert.equal(currentFlowId(h), 'code', 'a course completion alone cannot advance a project stage');
  assert.equal(h.query('[data-module-unit="u-ai-spec"]').open, true, 'first incomplete reference lesson is ready within the current stage');
  assert.equal(ctx.CareerUI.stats().lessons.done, 1);
  assert.equal(ctx.CareerUI.mainProjectStats().done, 0);
  h.destroy();

  // Previously completed learning and self-checks cannot skip the new project's independent output stages.
  const oldPass = { level: 'passed', score: 100, rubric: Object.fromEntries([1, 2, 3, 4].map(n => ['ai-code-c' + n, 4])), evidenceUrl: 'https://example.com/old-skill-evidence', evidenceNote: 'Historical synthetic QA self-assessment', assessedAt: '2026-10-01T08:00:00.000Z', verification: 'self_assessed', history: [] };
  const oldStages = Object.fromEntries(Array.from({ length: 7 }, (_, n) => ['milestone:demand-decision-lab:ddl-m' + n, { status: 'done', evidenceUrl: 'https://example.com/old-project-evidence', completedAt: '2026-10-01T08:00:00.000Z' }]));
  h = app({ memory: { [lessonKey]: JSON.stringify(Object.fromEntries(agent.modules.flatMap(module => module.unitIds).map(id => [id, 'done']))), [careerKey]: JSON.stringify({ ...oldStages, 'skill:ai-code': oldPass }) } }); ctx = h.ctx;
  await ctx.AppProgress.sync().start();
  assert.equal(ctx.CareerUI.stats().lessons.done, agentUnitCount);
  assert.equal(ctx.CareerUI.mainProjectStats().done, 0);
  assert.equal(h.query('[data-start-session]'), null);
  assert.equal(currentFlowId(h), 'code', 'all old study, skill and project progress cannot skip the new first output stage');
  assert.equal(ctx.phdCareerProgress.read().skills['ai-code'].level, 'passed', 'old self-check stays saved');
  includes(h.query('.next-action-panel'), project.milestones[0].title, 'completed study leads to the actual missing output stage');
  click(h.query('.next-action-panel .primary-button'));
  assert.equal(ctx.CareerUI.currentModule().id, 'code', 'portfolio action opens the exact outstanding stage module');
  assert(h.query('.module-project-output [data-milestone-form="aca-m0"]'), 'current stage save form is reachable');
  h.destroy();

  // A genuinely completed portfolio has its own terminal action, without granting any course credit.
  const finishedStages = Object.fromEntries(project.milestones.map(stage => ['milestone:' + project.projectId + ':' + stage.id, { status: 'done', evidenceUrl: 'https://example.com/new-project-evidence', completedAt: '2026-10-09T08:00:00.000Z' }]));
  h = app({ memory: { [careerKey]: JSON.stringify(finishedStages) } }); ctx = h.ctx; await ctx.AppProgress.sync().start();
  assert.equal(ctx.CareerUI.mainProjectStats().done, 6);
  assert.equal(ctx.CareerUI.stats().lessons.done, 0);
  assert.equal(h.query('[data-start-session]'), null);
  const portfolio = h.query('.next-action-panel [data-career-page="projects"]');
  assert(portfolio, 'only actual six-stage completion offers the completed-portfolio action');
  click(portfolio); assert.equal(ctx.AppNavigation.current(), 'projects');
  h.destroy();

  // Existing saved direction is displayed honestly; the new career default never overwrites it.
  for (const selectedRole of ['decision_optimization', 'forecasting_ml']) {
    const memory = { [careerKey]: JSON.stringify({ selectedRole }) };
    h = app({ memory }); ctx = h.ctx; await ctx.AppProgress.sync().start();
    assert.equal(ctx.phdCareerProgress.read().selectedRole, selectedRole);
    assert.equal(ctx.CareerUI.stats().lessons.total, 26);
    assert(!h.query('#pageSubtitle').textContent.includes('Agent 开发实习'), 'saved original direction gets its own honest career heading');
    assert.equal(h.query('[data-start-session]'), null);
    click(h.query('.next-action-panel [data-open-module]'));
    assert.equal(h.query('#firstSession'), null, 'Agent first-session content does not replace the saved original route');
    assert.equal(h.all('#careerLearning [data-project-id="ai-choice-assistant"]').length, 0);
    h.destroy();
  }
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /career-ui\.js\?v=20261010-journey1/, 'new interactive entry bypasses stale old UI');
  console.log('PASS guided career experience: career purpose, one precise first action, output/save/source guidance, 30-minute on-ramp without new state, truthful independent progress, guarded CTA, resume and terminal-state paths, and saved original directions.');
})().catch(error => { console.error(error); process.exitCode = 1; });
