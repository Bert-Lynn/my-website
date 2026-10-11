'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),json=f=>JSON.parse(read(f));
const sha=x=>crypto.createHash('sha256').update(typeof x==='string'?x:JSON.stringify(x)).digest('hex');
const baseline=require('./fixtures/work-assistant-preserved-baseline.json');
const c=json('data/career-curriculum.json'),m=json('data/learning-modules.json'),p=json('data/project-outline.json');
const originalHashes=require('./fixtures/growth-hub-baseline.json').files;
const registryOnly=read('career-state.js').replace("const MAIN_PROJECT = 'work-assistant';","const MAIN_PROJECT = 'ai-choice-assistant';").replace("const PROJECTS = { [PROJECT]: MILESTONES, 'ai-choice-assistant': Array.from({length:6},(_,i)=>'aca-m'+i), [MAIN_PROJECT]: Array.from({length:4},(_,i)=>'wa-m'+i) };","const PROJECTS = { [PROJECT]: MILESTONES, [MAIN_PROJECT]: Array.from({length:6},(_,i)=>'aca-m'+i) };");
assert.equal(sha(registryOnly),originalHashes['career-state.js'],'client validation, dates, history and storage logic are byte-unchanged outside the explicit additive registry');
assert.equal(sha(read('app.js').split('const streamLabels=')[0]),baseline.taskPrefixSha256,'all 47 complete original task records are byte-preserved');
assert.equal(sha(read('course-lessons.js')),baseline.courseLessonsSha256,'all 53 lesson records are byte-preserved');
for(const [field,key] of [['learningUnits','unitsSha256'],['skills','skillsSha256'],['projects','legacyProjectsSha256'],['challenges','challengesSha256'],['lessonOverrides','lessonOverridesSha256']]) assert.equal(sha(c[field]),baseline[key],field+': original identities, prompts, acceptance criteria and progress meaning are preserved');
const approvedTrackFields=['currentProjectId','currentProjectMilestoneIds','note','progressionPolicy','estimateNote'];
for(const track of c.tracks) { const before=baseline.tracks.find(x=>x.id===track.id); const clean=x=>Object.fromEntries(Object.entries(x).filter(([key])=>track.id!=='agent_engineering'||!approvedTrackFields.includes(key))); assert.deepEqual(clean(track),clean(before),track.id+': only approved current-project track fields change'); }
assert.deepEqual(p.archivedProjects[0],baseline.acaProject,'complete original ACA project is retained in its own archive');
for(const [id,old] of Object.entries(baseline.labels)) {
 const current=Object.fromEntries(Object.entries(m.unitLabels[id]).filter(([key])=>key!=='projectApply'));
 assert.deepEqual(current,old,id+': original exercise and completion wrappers retain their meaning');
}
assert.equal(p.projectId,'work-assistant');assert.equal(p.mainTitle,'用户反馈分析 Agent');
assert.deepEqual(p.milestones.map(x=>x.id),['wa-m0','wa-m1','wa-m2','wa-m3']);
assert.equal(p.milestones.length,4);
assert(/feedback\.csv/.test(JSON.stringify(p)));assert(/product_guide\.md/.test(JSON.stringify(p)));
for(const name of ['issues.xlsx','report.md','run.json']) assert(JSON.stringify(p).includes(name),'real named deliverable '+name+' is explained');
for(const stage of p.milestones) {
 assert(stage.title && stage.title.length>8,'large-stage title names a visible outcome');
 assert(stage.steps.length>=3&&stage.steps.length<=5,stage.id+': each expanded outcome has a bounded three-to-five-step recipe');
 assert(stage.input&&stage.software.length&&stage.files.length&&stage.save,stage.id+': input, software, files and destination are explicit');
 assert(stage.deliverables.length>=2 && stage.acceptance.length>=2,stage.id+': work has concrete files and success criteria');
 assert(!/航班|选项比较|AirDemandLab|EnterpriseAgentLab|VisionLab/.test(JSON.stringify(stage)),stage.id+': rejected project is not mandatory current work');
}
const agent=m.tracks.find(x=>x.id==='agent_engineering');
assert.deepEqual(agent.archivedFirstSession,baseline.firstSession,'old flight starter remains unmodified and explicitly archived');
for(const module of agent.modules) assert(!/航班|选项比较/.test([module.title,module.learn,module.make,module.done,...(module.notes||[])].join(' ')),module.id+': current module does not mandate the rejected product');
for(const [id,label] of Object.entries(m.unitLabels)) assert(!/航班|选项比较/.test(label.projectApply||''),id+': course-to-project application uses the new work assistant');
assert(/合成|虚构|公开/.test(p.demo));
assert(/AI Agent.*应用研发实习/.test(p.targetRole),'the target job is explicit');
assert(/额外|另外/.test(p.capabilityScope) && /强化学习|算法/.test(p.capabilityScope),'this one application project does not claim complete training or algorithm-job readiness');
assert(/产品|运营|支持/.test(JSON.stringify(p)),'the actual product audience is explicit');
assert(/回放/.test(p.executionBoundary),'real model runs are distinguished from replay');
const execution=JSON.stringify(p.milestones.find(x=>x.id==='wa-m1')),recovery=JSON.stringify(p.milestones.find(x=>x.id==='wa-m2'));
assert(/run_id/.test(execution)&&/持久保存/.test(execution)&&/已完成步骤/.test(execution),'real task and step state is persisted with its run identity');
assert(/中断/.test(recovery)&&/未完成步骤/.test(recovery)&&/新建.*运行/.test(recovery),'interruption has bounded resume or explicit clean restart');
assert(/不覆盖|不能.*覆盖/.test(recovery)&&/不把异常写成成功/.test(recovery),'recovery preserves old results and honest terminal status');
assert(/本地|电脑/.test(JSON.stringify(p)) && /链接/.test(JSON.stringify(p)),'website records links while actual files stay on the user computer');
console.log('PASS independent work-assistant content: preserved complete47/53 records, 30 units/13 skills/rubrics, old projects/challenges/tracks and label criteria; four new outcomes, real named files, bounded synthetic scenario and no flight mandate in current project applications.');
