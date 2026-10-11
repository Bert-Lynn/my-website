const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const registry = require('../career-state.js');
const { makeDocument } = require('./helpers/app-harness.cjs');
const root = path.join(__dirname, '..');
const curriculum = require('../data/career-curriculum.json');
const catalog = require('../data/learning-modules.json');
const clone = value => JSON.parse(JSON.stringify(value));
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'learning-modules.js'), 'utf8'), context);
assert.deepEqual(clone(context.window.LEARNING_MODULES), catalog, 'browser snapshot exactly matches public module source');
const project = require('../data/project-outline.json');
vm.runInNewContext(fs.readFileSync(path.join(root, 'project-outline.js'), 'utf8'), context);
assert.deepEqual(clone(context.window.PROJECT_OUTLINE), project, 'public project snapshot matches its source');
assert(/计划/.test(project.status) && /尚未建成/.test(project.status), 'approved software plan cannot be represented as a finished application');
assert(/合成|虚构/.test(project.demo), 'feedback examples are explicitly synthetic or fictional');
assert(/不新增论文目标/.test(project.research) && /独立推进/.test(project.research), 'internship product does not silently become a new paper commitment');
assert(/不保证/.test(project.boundaries), 'no publication, hiring, or GitHub popularity guarantee');
assert(/回放/.test(project.executionBoundary) && /真实/.test(project.executionBoundary), 'replay cannot masquerade as a live AI evaluation');
const unitMap = new Map(curriculum.learningUnits.map(unit => [unit.id, unit]));
assert.deepEqual(Object.keys(catalog.unitLabels).sort(), [...unitMap.keys()].sort(), 'all 30 units have an explicit plain-language wrapper');
for (const [id, label] of Object.entries(catalog.unitLabels)) {
  for (const field of ['title', 'description', 'exercise', 'done']) assert(typeof label[field] === 'string' && label[field].trim().length > 5, id + ': specific ' + field);
  assert.equal(label.progressId, id, 'plain-language labels do not migrate completion identities');
  assert.equal(label.estimatedMinutes, unitMap.get(id).estimatedMinutes);
}
const expectedOrders = {
  decision_optimization: ['code', 'data', 'forecast', 'allocation', 'app', 'interview'],
  agent_engineering: ['code', 'data', 'ai-tools', 'app', 'check-results', 'interview']
};
const exactOnce = (actual, expected, label) => {
  assert.equal(new Set(actual).size, actual.length, label + ': each identity occurs once');
  assert.deepEqual([...actual].sort(), [...expected].sort(), label + ': exact canonical coverage');
};
assert.deepEqual(catalog.tracks.map(track => track.id).sort(), Object.keys(expectedOrders).sort());
for (const track of catalog.tracks) {
  const source = curriculum.tracks.find(item => item.id === track.id);
  const required = track.modules.flatMap(module => module.unitIds);
  const branches = track.modules.flatMap(module => module.branches || []);
  const optional = branches.flatMap(branch => branch.unitIds);
  assert.deepEqual(track.modules.map(module => module.id), expectedOrders[track.id], track.id + ': six ordered modules');
  exactOnce(required, source.requiredLearningUnitIds, track.id + ' required sections');
  exactOnce(optional, source.optionalLearningUnitIds, track.id + ' optional sections');
  exactOnce(track.modules.flatMap(module => module.skillIds), source.requiredSkillIds, track.id + ' required checks');
  exactOnce(branches.flatMap(branch => branch.skillIds), source.optionalSkillIds, track.id + ' optional checks');
  assert(required.every(id => !optional.includes(id)), 'electives never inflate the core denominator');
  assert.equal(required.length, source.requiredLearningUnitIds.length);
  assert.equal(track.requiredUnitCount, required.length);
  assert.equal(track.requiredSkillCount, source.requiredSkillIds.length);
  const minutes = required.reduce((total, id) => total + unitMap.get(id).estimatedMinutes, 0);
  assert.equal(minutes, source.requiredLearningUnitIds.reduce((total, id) => total + unitMap.get(id).estimatedMinutes, 0));
  assert.equal(track.learningEstimatedMinutes, minutes);
  assert.equal(track.estimatedHours, source.estimatedHours, 'module presentation does not invent extra course hours');
  assert.equal(track.firstDemoEstimatedHours, source.mvpEstimatedHours);
  assert.deepEqual(track.requiredMilestoneIds, source.requiredMilestoneIds);
  assert.deepEqual(track.optionalMilestoneIds, source.optionalMilestoneIds);
  assert.equal(track.flow.direction, 'sequential');
  assert.deepEqual(track.flow.edges.map(edge => [edge.from, edge.to]), track.modules.slice(1).map((module, i) => [track.modules[i].id, module.id]), 'flowchart follows the displayed order without skipped or reversed edges');
  for (const [index, module] of track.modules.entries()) {
    for (const key of ['title', 'learn', 'make', 'done', 'prerequisiteLabel']) assert(module[key]?.trim(), module.id + ': plain ' + key + ' exists');
    assert(module.unitIds.length > 0, module.id + ': module contains real sections');
    assert.equal(module.learningEstimatedMinutes, module.unitIds.reduce((total, id) => total + unitMap.get(id).estimatedMinutes, 0));
    assert.deepEqual(module.prerequisiteModuleIds, index ? [track.modules[index - 1].id] : []);
    for (const branch of module.branches || []) {
      assert(/选学|选修/.test(branch.label) && /跳过|按需/.test(branch.label), branch.id + ': optionality is explicit');
      assert.equal(branch.learningEstimatedMinutes, branch.unitIds.reduce((total, id) => total + unitMap.get(id).estimatedMinutes, 0));
      assert(branch.unitIds.every(id => unitMap.has(id)));
      assert(branch.prerequisiteUnitIds.every(id => unitMap.has(id)));
    }
  }
  assert.deepEqual(track.modules[0].diagnosticUnitIds, ['u-python-diagnostic']);
  assert(/如实|记录/.test(track.modules[0].diagnosticNote), 'diagnostic does not silently mark study complete');
}
// Approved Agent correction keeps forecasting optional and moves testing into the checking stage.
const agentRoute = catalog.tracks.find(track => track.id === 'agent_engineering');
const agentCanonical = curriculum.tracks.find(track => track.id === 'agent_engineering');
assert.deepEqual(agentRoute.modules.map(module => module.unitIds.length), [4, 6, 3, 3, 2, 2]);
assert.deepEqual(agentRoute.modules.find(module => module.id === 'check-results').unitIds, ['u-pytest', 'u-test-param']);
for (const id of ['u-metrics', 'u-uncertainty', 'u-leakage']) {
  assert(!agentCanonical.requiredLearningUnitIds.includes(id), id + ': forecasting material does not gate the Agent project');
  assert(agentCanonical.optionalLearningUnitIds.includes(id), id + ': elective identity and past records remain usable');
}
assert(!curriculum.skills.find(skill => skill.id === 'agent-evaluation').prerequisites.includes('ml-validation'));
assert.equal(agentRoute.requiredSkillCount, 7);
assert.equal(agentRoute.learningEstimatedMinutes, 2340, 'reference lesson estimate is not a software delivery promise');
assert.equal(catalog.budget.weeklyCapHours, 8);
assert.equal(catalog.budget.revisionWeekHours, 3);
assert(catalog.budget.plannedWeeklyHours + catalog.budget.bufferWeeklyHours <= catalog.budget.weeklyCapHours);
assert.equal(curriculum.learningUnits.length, 30, 'module grouping preserves 30 existing identities');
assert.equal(project.projectId, registry.mainProject);
assert.deepEqual(project.milestones.map(stage => stage.id), registry.projects[project.projectId]);
assert.deepEqual(project.milestones.map(stage => stage.moduleId), ['code','ai-tools','check-results','interview'], 'new outcomes advance through their actual primary reference modules');
assert.deepEqual(project.milestones.flatMap(stage => stage.moduleIds).sort(), [...expectedOrders.agent_engineering].sort(), 'six learning modules map exactly once to the four new outcomes');
for (const stage of project.milestones) {
  assert(stage.deliverables.length >= 2 && stage.deliverables.every(value => value.trim()));
  assert(stage.acceptance.length >= 2 && stage.acceptance.every(value => value.trim()));
  assert(registry.ids.includes('milestone:' + project.projectId + ':' + stage.id));
}
const guideSource = fs.readFileSync(path.join(root, 'guide.html'), 'utf8');
const guide = makeDocument(guideSource), ids = guide.querySelectorAll('[id]').map(node => node.id);
assert.equal(new Set(ids).size, ids.length, 'guide anchors remain unique after archiving the old manual');
assert.equal(guide.querySelectorAll('.guide-plain-flow li').length,6,'six reference-module groups remain');
assert.equal(guide.querySelectorAll('#plan .guide-card').length,4,'only four independent product outcomes are required');
assert.equal(guide.querySelector('#first-use').querySelectorAll('.guide-steps li').length, 3);
assert.equal(guide.querySelector('#legacy-manual').open, false, 'old navigation/product instructions are closed by default');
assert(guide.querySelector('.guide-legacy-banner').textContent.includes('不是现在的主项目说明'));
const currentGuide = guideSource.split('<details class="guide-legacy"')[0];
assert(currentGuide.includes('用户反馈分析 Agent') && currentGuide.includes('尚未建成') && /候选|导师|独立推进/.test(currentGuide));
assert(!currentGuide.includes('DemandDecisionLab'), 'old lab cannot remain the current how-to product');
for (const anchor of guide.querySelectorAll('a')) {
  const href = anchor.getAttribute('href');
  if (href?.startsWith('#')) assert(guide.querySelector(href), 'guide anchor exists: ' + href);
}
console.log('PASS module catalog: two six-step ordered routes, exact-once source-derived core sections and checks, every elective separate, source-derived counts/timing, and unchanged state identities.');
