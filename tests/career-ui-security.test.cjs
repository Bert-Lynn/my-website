const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');

function setup() {
  const nodes = {}, groups = {}, listeners = {}, memory = {}, pages = [];
  const node = () => ({ innerHTML: '', textContent: '', dataset: {}, value: '', checked: false, open: false,
    style: { setProperty() {} }, classList: { toggle() {}, add() {}, remove() {} },
    setAttribute() {}, focus() {}, scrollIntoView() {}, querySelector() { return this.error ||= node(); } });
  const get = key => nodes[key] ||= node();
  const forms = Array.from({ length: 7 }, (_, n) => Object.assign(node(), { dataset: { projectId: 'demand-decision-lab', milestoneForm: 'ddl-m' + n } }));
  groups['[data-milestone-form]'] = forms;
  groups['[data-role]'] = [Object.assign(node(), { dataset: { role: 'agent_engineering' } })];
  groups['[data-select-role]'] = [Object.assign(node(), { value: 'agent_engineering' })];
  groups['[data-unit-check]'] = [Object.assign(node(), { dataset: { unitCheck: 'u-sql-select' }, checked: true })];
  groups['[data-salary-filter]'] = ['all', 'exact_target', 'overlap_only', 'undisclosed'].map(value => Object.assign(node(), { dataset: { salaryFilter: value } }));
  let confirmation = true;
  class FakeFormData {
    constructor(form) { this.values = form.formValues || {}; }
    get(key) { const value = this.values[key]; return Array.isArray(value) ? value[0] : value; }
    getAll(key) { const value = this.values[key]; return Array.isArray(value) ? value : value == null ? [] : [value]; }
  }
  const ctx = { window: null, URL, FormData: FakeFormData, setTimeout, clearTimeout,
    localStorage: { getItem: key => memory[key] || null, setItem: (key, value) => { memory[key] = value; } },
    document: { getElementById: key => get('#' + key), querySelector: get, querySelectorAll: selector => groups[selector] || [], addEventListener() {} },
    addEventListener(name, callback) { (listeners[name] ||= []).push(callback); },
    dispatchEvent(event) { for (const callback of listeners[event.type] || []) callback(event); },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
    confirm: () => confirmation,
    LessonUI: { stats: () => ({ done: 0, total: 53 }), render() {}, openLesson() {} }
  };
  ctx.window = ctx; vm.createContext(ctx);
  for (const file of ['course-lessons.js', 'career-curriculum.js', 'learning-modules.js', 'project-outline.js', 'internship-data.js', 'career-state.js', 'cloud-sync.js', 'career-ui.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), ctx, { filename: file });
  }
  const sync = ctx.PhdCloud.create({ ids: ['task-a'], config: { enabled: false }, storage: ctx.localStorage });
  ctx.AppProgress = { sync: () => sync };
  ctx.CareerUI.init({ openPage: page => pages.push(page) });
  return { ctx, nodes, groups, forms, sync, pages, get, confirm: value => { confirmation = value; } };
}
const agentTrack = require('../data/career-curriculum.json').tracks.find(track => track.id === 'agent_engineering');
const submit = form => form.onsubmit({ preventDefault() {}, currentTarget: form });

(async () => {
  const h = setup(), { ctx, get, forms } = h;
  await h.sync.start();
  assert.equal(ctx.CareerUI.stats().skillsPassed, 0);
  assert.equal(ctx.CareerUI.stats().skillsTotal, agentTrack.requiredSkillIds.length);
  assert(get('#careerToday').innerHTML.includes('class="module-flow"'));
  assert(!get('#careerToday').innerHTML.includes('关键能力已有自评证据'));
  for (const unsafe of ['javascript:alert(1)', 'data:text/html,test', 'file:///tmp/test', 'https://user:pass@example.com']) assert.equal(ctx.CareerUI.safeURL(unsafe), '');
  assert.equal(ctx.CareerUI.escape('</textarea><script>alert("x")</script>'), '&lt;/textarea&gt;&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
  ctx.phdCareerProgress.setRole('foundation_model_research');
  assert(ctx.CareerUI.stats().skillsTotal > 0, 'persisted advanced role never renders empty fully passed route');
  assert(!get('#careerToday').innerHTML.includes('关键能力已有自评证据'));
  ctx.phdCareerProgress.setRole('agent_engineering');
  assert.equal(ctx.CareerUI.stats().skillsTotal, agentTrack.requiredSkillIds.length);
  ctx.phdCareerProgress.setRole('decision_optimization');
  const form = get('#assessmentForm'); form.dataset.skillId = 'ai-code';
  const criteria = [1, 2, 3, 4].map(n => 'ai-code-c' + n);
  form.formValues = { criterion: criteria, evidenceUrl: '', evidenceNote: '' };
  submit(form);
  assert(get('#assessmentError').textContent.includes('证据'), 'all checked boxes without evidence cannot pass');
  assert.equal(ctx.phdCareerProgress.read().skills['ai-code'], undefined);
  form.formValues = { criterion: criteria, evidenceUrl: 'javascript:alert(1)', evidenceNote: 'Complete independent run with a real test record.' };
  submit(form);
  assert(get('#assessmentError').textContent.includes('http'));
  assert.equal(ctx.phdCareerProgress.read().skills['ai-code'], undefined);
  const injection = '</textarea><img src=x onerror="alert(1)"><script>unsafe()</script> Independent QA text.';
  form.formValues = { criterion: criteria, evidenceUrl: 'https://example.com/report?a=1&b=%22test%22', evidenceNote: injection };
  submit(form);
  const skill = ctx.phdCareerProgress.read().skills['ai-code'];
  assert.equal(skill.level, 'passed'); assert.equal(skill.verification, 'self_assessed');
  assert.equal(h.sync.lessonSnapshot()['python-basics'], undefined, 'diagnostic pass leaves original lesson completion untouched');
  const html = get('#careerAssessments').innerHTML;
  assert(!html.includes('<img src=x') && !html.includes('<script>unsafe()'), 'user evidence must not become HTML');
  assert(html.includes('&lt;/textarea&gt;&lt;img'), 'evidence text safely escaped inside textarea');
  assert(html.includes('rel="noopener noreferrer"'), 'external evidence links isolate opener');
  assert(html.includes('实操通过 · 自评') && html.includes('不是招聘通过率'));
  assert.equal(ctx.CareerUI.stats().skillsPassed, 1);
  assert(get('#careerToday').innerHTML.includes('data-open-module="data" aria-current="step"'), 'diagnostic pass advances to the next module, not redundant foundation lessons');
  assert(get('#careerToday').innerHTML.includes('自查通过，可继续'), 'diagnostic bypass is labelled self-check-based continuation, not lessons completed');
  const date = skill.assessedAt;
  submit(form); assert.equal(ctx.phdCareerProgress.read().skills['ai-code'].assessedAt, date, 'repeat submit cannot reset assessment date');
  form.formValues = { criterion: ['ai-code-c1'], evidenceUrl: '', evidenceNote: 'Still practicing and recording the remaining gaps.' };
  submit(form); assert.equal(ctx.phdCareerProgress.read().skills['ai-code'].level, 'practicing', 'partial re-assessment revokes pass');
  assert.equal(ctx.CareerUI.stats().skillsPassed, 0);
  const originalSetSkill = ctx.phdCareerProgress.setSkill;
  ctx.phdCareerProgress.setSkill = () => false;
  get('#announcer').textContent = '';
  form.oninput(); const draft = get('#careerAssessments').innerHTML;
  submit(form);
  assert(get('#assessmentError').textContent.includes('未成功保存'), 'persistence failure is reported');
  assert.equal(get('#announcer').textContent, '', 'failed assessment save never announces success');
  ctx.CareerUI.render(); assert.equal(get('#careerAssessments').innerHTML, draft, 'failed draft remains displayed');
  ctx.phdCareerProgress.setSkill = originalSetSkill;
  h.confirm(false); assert.equal(ctx.CareerUI.canNavigate(), false, 'cancel navigation keeps an unsaved assessment');
  h.confirm(true); assert.equal(ctx.CareerUI.canNavigate(), true);
  const project = forms[0];
  project.formValues = { milestoneStatus: 'done', milestoneEvidence: '', milestoneAttest: '' };
  submit(project);
  assert(project.querySelector('.form-error').textContent.includes('证据'));
  assert.equal(ctx.phdCareerProgress.read().milestones['demand-decision-lab'], undefined);
  project.formValues = { milestoneStatus: 'doing', milestoneEvidence: '' };
  submit(project);
  assert.equal(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0'].status, 'doing', 'in-progress project save succeeds without an invalid null date');
  project.formValues = { milestoneStatus: 'done', milestoneEvidence: 'https://example.com/project', milestoneAttest: 'on' };
  submit(project);
  const completion = ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0'].completedAt;
  assert(completion);
  submit(project);
  assert.equal(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0'].completedAt, completion, 'repeat project save preserves actual completion date');
  project.formValues = { milestoneStatus: 'todo', milestoneEvidence: '' };
  submit(project);
  assert.equal(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0'].completedAt, '', 'project undo clears completion date');
  assert.equal(h.sync.snapshot()['task-a'], undefined, 'milestone changes never complete legacy task');
  project.oninput();
  get('#careerProjects').innerHTML = 'UNSAVED PROJECT DRAFT';
  ctx.dispatchEvent(new ctx.CustomEvent('careerprogresschange', { detail: ctx.phdCareerProgress.read() }));
  assert.equal(get('#careerProjects').innerHTML, 'UNSAVED PROJECT DRAFT', 'background sync preserves unsaved project input');
  h.confirm(false); assert.equal(ctx.CareerUI.canNavigate(), false);
  h.confirm(true); ctx.CareerUI.canNavigate();
  const originalSetMilestone = ctx.phdCareerProgress.setMilestone;
  ctx.phdCareerProgress.setMilestone = () => false; get('#announcer').textContent = '';
  submit(project);
  assert(project.querySelector('.form-error').textContent.includes('未成功保存'));
  assert.equal(get('#announcer').textContent, '');
  ctx.phdCareerProgress.setMilestone = originalSetMilestone;
  for (const company of ctx.INTERNSHIP_DATA.companies) assert(get('#careerRoles').innerHTML.includes(company.company), 'all ten companies, including negative findings, visible: ' + company.company);
  assert(get('#careerRoles').innerHTML.includes('历史样本'));
  for (const filter of ['exact_target', 'overlap_only', 'undisclosed']) {
    h.groups['[data-salary-filter]'].find(button => button.dataset.salaryFilter === filter).onclick();
    const roleHTML = get('#careerRoles').innerHTML;
    const visibleJobIds = [...roleHTML.matchAll(/data-opportunity="([^"]+)"/g)].map(match => match[1]);
    const allJobs = ctx.INTERNSHIP_DATA.companies.flatMap(company => company.roles);
    assert.deepEqual(visibleJobIds.sort(), Array.from(allJobs.filter(job => job.salary.evidenceClass === filter).map(job => job.id)).sort(), 'salary filter returns only its explicitly disclosed evidence class: ' + filter);
  }
  const originalSetRole = ctx.phdCareerProgress.setRole;
  ctx.phdCareerProgress.setRole = () => false;
  get('#announcer').textContent = '';
  h.groups['[data-role]'][0].onclick();
  assert(!get('#announcer').textContent.includes('已更新'), 'failed role button save never announces success');
  assert(/保存|失败|错误/.test(get('#announcer').textContent), 'failed role button save is disclosed');
  get('#announcer').textContent = '';
  h.groups['[data-select-role]'][0].value = 'agent_engineering';
  h.groups['[data-select-role]'][0].onchange();
  assert(/保存|失败|错误/.test(get('#announcer').textContent), 'failed role dropdown save is disclosed');
  assert.equal(h.groups['[data-select-role]'][0].value, ctx.CareerUI.role().id, 'failed role dropdown restores actual state');
  ctx.phdCareerProgress.setRole = originalSetRole;
  const originalSetLesson = h.sync.setLesson;
  h.sync.setLesson = () => false; get('#announcer').textContent = '';
  h.groups['[data-unit-check]'][0].onchange();
  assert(!get('#announcer').textContent.includes('记录已保存'));
  assert(/保存|失败|错误/.test(get('#announcer').textContent), 'failed learning save is disclosed');
  h.sync.setLesson = originalSetLesson;
  h.sync.destroy();
  console.log('PASS career UI VM: safe evidence rendering, self-assessment-only pass gating, diagnostic advance, revocation, truthful failed saves, repeat/undo dates, dirty form preservation, advanced-route fallback and salary/company coverage. Browser interaction remains a separate QA stage.');
})().catch(error => { console.error(error); process.exit(1); });
