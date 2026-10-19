const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const registry = require('../career-state.js');
const root = path.join(__dirname, '..');
const ctx = { window: {}, URL };
for (const file of ['course-lessons.js', 'career-curriculum.js', 'internship-data.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
}
const plain = value => JSON.parse(JSON.stringify(value));
const curriculum = plain(ctx.window.CAREER_CURRICULUM), jobs = plain(ctx.window.INTERNSHIP_DATA);
const lessons = plain(ctx.window.COURSE_LESSONS.courses.flatMap(course => course.lessons));
const ids = (items, name) => {
  const values = items.map(item => item.id);
  assert(values.every(id => typeof id === 'string' && id.length), name + ': stable IDs');
  assert.equal(new Set(values).size, values.length, name + ': unique IDs');
  return new Set(values);
};
const https = (value, label) => {
  const u = new URL(value);
  assert.equal(u.protocol, 'https:', label + ': HTTPS source');
  assert(!u.username && !u.password, label + ': no credentials');
};
const date = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(value).toISOString().slice(0, 10) === value;
const skillIds = ids(curriculum.skills, 'skills'), unitIds = ids(curriculum.learningUnits, 'learning units');
const lessonIds = ids(lessons, 'legacy lessons');
const milestones = curriculum.projects.flatMap(project => project.milestones), milestoneIds = ids(milestones, 'milestones');
assert.equal(skillIds.size, 13); assert.equal(unitIds.size, 30); assert.equal(lessonIds.size, 53); assert.equal(milestoneIds.size, 7);
assert.deepEqual([...skillIds].sort(), [...registry.skills].sort(), 'all curriculum skills have matching private storage identities');
assert.deepEqual([...milestoneIds].sort(), [...registry.milestones].sort(), 'all project milestones can persist');
assert.equal(curriculum.projects[0].id, registry.project);
assert.equal(curriculum.timeBudget.weeklyCapHours, 8);
assert.equal(curriculum.timeBudget.revisionWeekHours, 3);
const refs = (values, known, label) => values.forEach(id => assert(known.has(id), label + ': missing ' + id));
for (const skill of curriculum.skills) {
  refs(skill.lessonIds || [], lessonIds, skill.id + ' exact lessons');
  refs(skill.learningUnitIds || [], unitIds, skill.id + ' new sections');
  refs(skill.prerequisites || [], skillIds, skill.id + ' prerequisites');
  refs(skill.milestoneIds || [], milestoneIds, skill.id + ' evidence milestones');
  assert((skill.lessonIds?.length || 0) + (skill.learningUnitIds?.length || 0) > 0, skill.id + ': learning material exists');
  assert(skill.milestoneIds.length > 0, skill.id + ': has project evidence destination');
  const assessment = skill.assessment;
  assert.equal(assessment.criteria.length, 4, skill.id + ': four mandatory criteria match persisted rubric schema');
  assert.deepEqual(assessment.criteria.map(c => c.id).sort(), [1, 2, 3, 4].map(n => skill.id + '-c' + n));
  assert(assessment.criteria.every(c => c.mandatory === true));
  assert.equal(assessment.passRule.minimumScore, 100);
  assert.equal(assessment.passRule.requireEvidence, true);
  assert(assessment.evidenceRequired.length && assessment.transferTask, skill.id + ': evidence and transfer test specified');
}
const visiting = new Set(), visited = new Set();
function visit(id) {
  assert(!visiting.has(id), 'skill prerequisites must not contain a cycle: ' + id);
  if (visited.has(id)) return;
  visiting.add(id);
  curriculum.skills.find(skill => skill.id === id).prerequisites.forEach(visit);
  visiting.delete(id); visited.add(id);
}
curriculum.skills.forEach(skill => visit(skill.id));
for (const unit of curriculum.learningUnits) {
  assert.equal(unit.canonicalProgressId, unit.id, unit.id + ': new unit status is independent of legacy lessons');
  refs(unit.skillIds || [], skillIds, unit.id + ' skills');
  refs(unit.existingLessonIds || [], lessonIds, unit.id + ' related legacy lessons');
  https(unit.url, unit.id);
  assert(unit.scope && unit.exercise && unit.provider, unit.id + ': exact reading scope, exercise and provider');
  assert(date(unit.sourceVerifiedAt), unit.id + ': has a real source-check date');
  assert(unit.estimatedMinutes > 0 && unit.estimateNote, unit.id + ': estimate is explicitly an estimate');
}
for (const [id, override] of Object.entries(curriculum.lessonOverrides)) {
  assert(lessonIds.has(id), 'overlay never invents legacy lesson ' + id);
  assert.equal(typeof override.required, 'boolean');
}
assert.equal(Object.keys(curriculum.lessonOverrides).length, 53);
for (const track of curriculum.tracks) {
  refs(track.requiredSkillIds, skillIds, track.id + ' required skills');
  refs(track.optionalSkillIds, skillIds, track.id + ' optional skills');
  refs(track.requiredLearningUnitIds, unitIds, track.id + ' required learning');
  refs(track.optionalLearningUnitIds, unitIds, track.id + ' optional learning');
  refs(track.requiredMilestoneIds, milestoneIds, track.id + ' required milestones');
  refs(track.optionalMilestoneIds, milestoneIds, track.id + ' optional milestones');
  const required = new Set(track.requiredSkillIds);
  assert(required.size > 0, track.id + ': no empty completed route');
  for (const id of required) refs(curriculum.skills.find(s => s.id === id).prerequisites, required, track.id + ': required prerequisite closure');
  assert(track.optionalSkillIds.every(id => !required.has(id)));
  assert(track.requiredLearningUnitIds.every(id => !track.optionalLearningUnitIds.includes(id)));
  assert(track.requiredMilestoneIds.every(id => !track.optionalMilestoneIds.includes(id)));
}
for (const coverage of curriculum.roleCoverage) {
  refs(coverage.skillIds, skillIds, coverage.roleFamily + ' role skills');
  for (const id of coverage.skillIds) refs(curriculum.skills.find(s => s.id === id).prerequisites, new Set(coverage.skillIds), coverage.roleFamily + ' role prerequisites');
  assert.equal(coverage.notHiringGuarantee, true);
  if (['search_recommendation', 'foundation_model_research'].includes(coverage.roleFamily)) assert.equal(coverage.readinessScoreEnabled, false);
}
const allCompanies = ['京东', '字节跳动', '美团', '小红书', '多邻国', '滴滴', '百度', '阿里巴巴', '腾讯', '网易'];
assert.deepEqual(jobs.companies.map(company => company.company).sort(), allCompanies.sort(), 'all ten requested companies explicitly covered');
assert.equal(jobs.target.salaryMin, 400); assert.equal(jobs.target.salaryMax, 600);
assert.equal(jobs.target.currency, 'CNY'); assert.equal(jobs.target.unit, 'day');
const roles = jobs.companies.flatMap(company => company.roles), roleIds = ids(roles, 'jobs');
assert.equal(roles.length, jobs.summaryCounts.rolesDocumented);
const historicalRoleIdentity = {
  jd_or_intern:['京东','decision_optimization'], jd_or_salary_history:['京东','decision_optimization'],
  bytedance_tts_algo_engineering:['字节跳动','agent_engineering'], bytedance_ecommerce_or:['字节跳动','decision_optimization'],
  meituan_forecasting:['美团','forecasting_ml'], meituan_planning_eval:['美团','decision_optimization'],
  xiaohongshu_agent_engine:['小红书','agent_engineering'], xiaohongshu_growth_agent_history:['小红书','agent_engineering'],
  didi_passenger_pricing:['滴滴','decision_optimization'], baidu_business_j92971:['百度','decision_optimization'],
  baidu_agent_j104743:['百度','agent_engineering'], alibaba_logistics_or_agent:['阿里巴巴','decision_optimization'],
  alibaba_ecs_salary_history:['阿里巴巴','decision_optimization'], alibaba_2027_or:['阿里巴巴','decision_optimization'],
  tencent_agentic_rl_history:['腾讯','foundation_model_research'], netease_youdao_llm_history:['网易','foundation_model_research']
};
for (const [id, [company, family]] of Object.entries(historicalRoleIdentity)) {
  const preserved=jobs.companies.find(c=>c.company===company)?.roles.find(r=>r.id===id);
  assert(preserved, id+': historical role identity cannot be deleted or moved to another company');
  assert.equal(preserved.roleFamily,family,id+': preserve the historical role meaning');
}
assert.deepEqual(jobs,JSON.parse(fs.readFileSync(path.join(root,'data/internships.json'),'utf8')),'browser snapshot must exactly match editable public JSON');
assert(date(jobs.verifiedAt));
assert.equal(jobs.summaryCounts.companiesChecked,jobs.companies.length);
assert.equal(jobs.summaryCounts.referenceShortlist,jobs.recommendedReferenceRoleIds.length);
refs(jobs.recommendedReferenceRoleIds, roleIds, 'reference shortlist');
assert.equal(jobs.recommendedReferenceRoleIds.length, 8);
const families = new Set(curriculum.roleCoverage.map(item => item.roleFamily));
for (const company of jobs.companies) {
  https(company.officialCareersUrl, company.company);
  assert(company.overallFinding && company.targetSalaryEvidence, company.company + ': explicit findings even if no matching posting');
  if (!company.roles.length) assert(company.sources.length, company.company + ': negative finding has source evidence');
}
for (const role of roles) {
  assert(families.has(role.roleFamily), role.id + ': job connects to known skills route');
  const salary = role.salary;
  assert(salary.scope && salary.note, role.id + ': salary is scoped to the specific posting');
  assert(role.status.value && role.status.label && role.status.caveat, role.id + ': status and uncertainty retained');
  assert(Object.hasOwn(jobs.statusLabels,role.status.value),role.id+': known status without inventing confirmed HC');
  assert(role.eligibility && role.attendance && role.sources.length, role.id + ': eligibility, attendance and evidence present');
  if (role.status.sourceDate !== null) assert(date(role.status.sourceDate), role.id + ': source date is valid or remains unknown');
  for (const source of role.sources) {
    https(source.url, role.id + ' source');
    assert(source.type && source.supports && source.accessNote, role.id + ': source type, supported claim and access caveat');
    assert(date(source.checkedAt));
    assert(source.checkedAt<=jobs.verifiedAt,role.id+': source check cannot postdate catalog verification');
  }
  const mapping=role.skillMapping;
  assert(mapping && mapping.mappingNote && mapping.uncoveredRequirements?.length,role.id+': honest partial coverage and gaps');
  for(const field of ['directRequiredSkillIds','supportingSkillIds','preferredSkillIds']) {
    assert(Array.isArray(mapping[field]),role.id+': '+field+' is an array');
    assert.equal(new Set(mapping[field]).size,mapping[field].length,role.id+': no duplicate mapped skills');
    refs(mapping[field],skillIds,role.id+' '+field);
  }
  assert(mapping.directRequiredSkillIds.every(id=>!mapping.supportingSkillIds.includes(id)),role.id+': direct and support meanings stay distinct');
  assert(mapping.directRequiredSkillIds.every(id=>mapping.directCoverageNotes?.[id]),role.id+': explain each direct partial mapping');
  assert(mapping.nonSkillBlockers?.length && date(mapping.mappedAt),role.id+': preserve eligibility and time barriers');
  assert(mapping.sourceUrls?.length && mapping.sourceUrls.every(url=>role.sources.some(s=>s.url===url)),role.id+': skill mapping must cite this same role');
  if (salary.evidenceClass === 'undisclosed') {
    assert.equal(salary.min, null); assert.equal(salary.max, null);
  } else {
    assert(Number.isFinite(salary.min) && Number.isFinite(salary.max) && salary.min <= salary.max);
    assert.equal(salary.currency, 'CNY'); assert.equal(salary.unit, 'day');
    if (salary.evidenceClass === 'exact_target') {
      assert(salary.min >= 400 && salary.max <= 600, role.id + ': entire disclosed range lies in target');
      if(role.status.value!=='closed') {
        assert(['publisher_page_unconfirmed','public_page_unconfirmed','aggregator_unconfirmed'].includes(role.status.value));
        assert(role.status.caveat,role.id+': target-band price never establishes current HC or user eligibility');
      }
    } else if (salary.evidenceClass === 'overlap_only') {
      assert(salary.max >= 400 && salary.min <= 600 && !(salary.min >= 400 && salary.max <= 600));
    } else if (salary.evidenceClass === 'below_target') assert(salary.max < 400);
    else assert.fail(role.id + ': unsupported salary classification');
  }
}
assert.equal(jobs.summaryCounts.historicalExactBandExamples,roles.filter(role=>role.salary.evidenceClass==='exact_target'&&role.status.value==='closed').length,'historical salary count derives from closed roles only');
assert.equal(jobs.summaryCounts.confirmedCurrentEligibleTargetSalaryMatches, 0, 'never invent live eligible salary matches');
for (const excluded of jobs.exclusions) assert(!roles.some(role => role.sources.some(source => source.url === excluded.url)), 'conflicting source must stay excluded');
const privateKeys = new Set(['assessedAt', 'completedAt', 'evidenceUrl', 'evidenceNote', 'history', 'access_token', 'refresh_token']);
function noPrivateRecords(value, trail = '') {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert(!privateKeys.has(key), 'public data must not embed private progress: ' + trail + '/' + key);
    noPrivateRecords(child, trail + '/' + key);
  }
}
noPrivateRecords(curriculum); noPrivateRecords(jobs);
const challenge = curriculum.challenges.find(challenge => challenge.id === 'challenge-optimization');
let optimum = Infinity, allocation;
for (let x = 0; x <= 3; x++) for (let y = 0; y <= 4; y++) if (x + y <= 5) {
  const objective = 3 * (3 - x) + (4 - y);
  if (objective < optimum) { optimum = objective; allocation = [x, y]; }
}
assert.deepEqual(challenge.expected.optimalAllocation, allocation);
assert.equal(challenge.expected.objective, optimum);
const forecast = curriculum.challenges.find(challenge => challenge.id === 'challenge-forecast').expected;
assert.equal(forecast.seasonalMAE, forecast.test.reduce((sum, actual, i) => sum + Math.abs(actual - forecast.seasonalNaive[i]), 0) / forecast.test.length);
assert.equal(forecast.lastValueMAE, forecast.test.reduce((sum, actual, i) => sum + Math.abs(actual - forecast.lastValueNaive[i]), 0) / forecast.test.length);
console.log('PASS career data: complete job→skill→exact section→rubric→project chains, 13/30/53/7 stable identities, prerequisite-closed tracks, independent unit progress, ten-company evidence coverage, honest salary/status classes, private-record exclusion and hand-checkable challenge answers.');
