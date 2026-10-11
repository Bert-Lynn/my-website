'use strict';
// Bound DOM handlers with synthetic local state. Real browser/layout QA is separate.
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const plain=x=>JSON.parse(JSON.stringify(x));
const sameNode=(a,b,message='same dirty form is retained')=>assert(a===b,message);
const click=node=>{assert(node,'bound click target exists');return node.onclick({preventDefault(){},currentTarget:node})};
const submit=form=>form.onsubmit({preventDefault(){},currentTarget:form});
const setForm=(form,status,evidence,attest=false)=>{form.querySelector('[name="milestoneStatus"]').value=status;form.querySelector('[name="milestoneEvidence"]').value=evidence;form.querySelector('[name="milestoneAttest"]').checked=attest};
const record=(ctx,id)=>ctx.phdCareerProgress.read().milestones['work-assistant']?.[id];
const formFor=(h,id='wa-m0')=>h.query('#currentTaskList [data-milestone-form="'+id+'"]');
const currentFlowId=h=>h.query('.module-flow [aria-current="step"]')?.dataset.openModule;
(async()=>{
 const oldDate='2026-10-01T08:00:00.000Z',oldRecord={status:'done',evidenceUrl:'https://example.com/legacy-project-evidence',completedAt:oldDate};
 let h=app({hash:'#execution',memory:{'lin-ai-phd-roadmap-career-v1':JSON.stringify({'milestone:demand-decision-lab:ddl-m0':oldRecord,'milestone:ai-choice-assistant:aca-m0':{...oldRecord,evidenceUrl:'https://example.com/old-aca-evidence'}})}}),ctx=h.ctx;
 await ctx.AppProgress.sync().start();
 assert.equal(ctx.phdCareerProgress.read().selectedRole,'agent_engineering');
 assert.equal(ctx.CareerUI.mainProject().id,'work-assistant');
 assert.deepEqual(plain(ctx.CareerUI.mainProjectStats()),{done:0,total:4});
 assert.equal(currentFlowId(h),'code','old completion cannot skip new outcomes');
 assert.deepEqual(plain(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0']),oldRecord);
 const stages=ctx.CareerUI.mainProject().milestones;
 assert.deepEqual(plain(stages.map(s=>s.moduleId)),['code','ai-tools','check-results','interview']);
 assert.deepEqual(plain(stages.flatMap(s=>s.moduleIds).sort()),plain(ctx.CareerUI.modules().map(m=>m.id).sort()));
 const uniqueForms=()=>{
  assert.deepEqual(h.all('[data-project-id="work-assistant"]').map(f=>f.dataset.milestoneForm),['wa-m0','wa-m1','wa-m2','wa-m3'],'exactly one canonical form per outcome across all panels');
  assert.equal(h.all('#careerLearning [data-milestone-form]').length,0,'lessons do not duplicate project forms');
  assert.equal(h.all('#careerProjects [data-project-id="work-assistant"]').length,0,'project overview does not duplicate task forms');
 };
 uniqueForms();assert.equal(h.all('.legacy-project-plan [data-milestone-form]').length,7);assert.equal(h.all('.archived-assistant-plan [data-milestone-form]').length,6);
 for(const module of ctx.CareerUI.modules()){
  ctx.AppNavigation.open('learn/'+module.id);uniqueForms();
  const stage=stages.find(s=>s.moduleIds.includes(module.id)),link=h.query('#careerLearning [data-open-task="'+stage.id+'"]');assert(link,'each of six modules points to its single real WA outcome');
  click(link);assert.equal(ctx.location.hash,'#execution');assert.equal(h.document.lastScrolled,h.query('[data-current-task="'+stage.id+'"]'));
  assert.equal(record(ctx,stage.id),undefined,'reading/opening lessons or tasks never creates completion');
 }
 let form=formFor(h);
 setForm(form,'done','',false);submit(form);assert(form.querySelector('.form-error').textContent.includes('证据'));assert.equal(record(ctx,'wa-m0'),undefined);
 for(const bad of ['javascript:alert(1)','file:///tmp/result','https://user:password@example.com']){setForm(form,'done',bad,true);submit(form);assert.equal(record(ctx,'wa-m0'),undefined)}
 setForm(form,'done','https://example.com/assistant-code',false);submit(form);assert.equal(record(ctx,'wa-m0'),undefined,'valid link alone is not completion');
 const originalSet=ctx.phdCareerProgress.setMilestone;let calls=0;ctx.phdCareerProgress.setMilestone=(...args)=>{calls++;return originalSet(...args)};
 setForm(form,'done','https://example.com/assistant-code',true);submit(form);assert.equal(calls,1,'one submit invokes exactly one state write');ctx.phdCareerProgress.setMilestone=originalSet;
 const completedAt=record(ctx,'wa-m0').completedAt;assert(completedAt);
 assert.deepEqual(plain(ctx.CareerUI.mainProjectStats()),{done:1,total:4});assert.equal(currentFlowId(h),'ai-tools');
 assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m1');uniqueForms();
 assert.equal(ctx.CareerUI.stats().lessons.done,0);assert.equal(ctx.CareerUI.stats().skillsPassed,0);assert.equal(ctx.LessonUI.stats().done,0);assert.equal(h.evaluate('tally(tasks).done'),0);
 assert.deepEqual(plain(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0']),oldRecord);
 ctx.AppNavigation.open('learn/data');click(h.query('#careerLearning [data-open-task="wa-m0"]'));form=formFor(h);assert.equal(form.querySelector('[name="milestoneStatus"]').value,'done');submit(form);assert.equal(record(ctx,'wa-m0').completedAt,completedAt,'repeat save preserves date');
 const memory=h.memory;h.destroy();h=app({memory,hash:'#execution'});ctx=h.ctx;await ctx.AppProgress.sync().start();
 assert.equal(record(ctx,'wa-m0').completedAt,completedAt);assert.equal(currentFlowId(h),'ai-tools');
 form=formFor(h);setForm(form,'todo','https://example.com/assistant-code');submit(form);assert.equal(record(ctx,'wa-m0').completedAt,'');assert.equal(ctx.CareerUI.mainProjectStats().done,0);assert.equal(currentFlowId(h),'code');
 h.destroy();h=app({memory,hash:'#execution'});ctx=h.ctx;await ctx.AppProgress.sync().start();assert.equal(record(ctx,'wa-m0').status,'todo','undo survives reload');
 // Canonical task drafts survive refresh, Cancel, direct hash/history, and failed writes.
 ctx.AppNavigation.open('learn/app');click(h.query('#careerLearning [data-open-task="wa-m1"]'));form=formFor(h,'wa-m1');
 setForm(form,'doing','https://example.com/unsaved-assistant-data');form.oninput();ctx.CareerUI.render();sameNode(formFor(h,'wa-m1'),form);uniqueForms();
 h.setConfirmation(false);click(h.query('[data-task-section="execution/research"]'));assert.equal(ctx.location.hash,'#execution');sameNode(formFor(h,'wa-m1'),form);
 ctx.history.back();assert.equal(ctx.location.hash,'#execution');sameNode(formFor(h,'wa-m1'),form);
 const asks=h.confirmations.length;ctx.dispatchEvent({type:'hashchange'});assert.equal(h.confirmations.length,asks,'restored hash does not prompt twice');
 assert.equal(ctx.CareerUI.openSkill('sql-data'),false);assert.equal(ctx.LessonUI.openLesson('python-basics'),false);
 const original=ctx.phdCareerProgress.setMilestone;ctx.phdCareerProgress.setMilestone=()=>false;submit(form);assert(form.querySelector('.form-error').textContent.includes('未成功保存'));sameNode(formFor(h,'wa-m1'),form);
 assert.equal(ctx.AppNavigation.open('today'),false,'failed save retains navigation guard');assert.equal(record(ctx,'wa-m1'),undefined);
 ctx.phdCareerProgress.setMilestone=original;submit(form);assert.equal(record(ctx,'wa-m1').status,'doing');assert.equal(record(ctx,'wa-m1').completedAt,'');assert.equal(ctx.AppNavigation.open('today'),true);
 ctx.phdCareerProgress.setRole('decision_optimization');assert.equal(ctx.CareerUI.mainProjectStats().done,0);assert.equal(record(ctx,'wa-m1').status,'doing');
 ctx.AppNavigation.open('learn/data');assert.equal(h.all('#careerLearning [data-open-task]').length,0,'legacy route does not relabel its exercises as WA');
 ctx.AppNavigation.open('execution');uniqueForms();assert.equal(h.all('#currentTaskList [data-project-id="work-assistant"]').length,4,'WA remains reachable under a saved legacy role');
 ctx.AppNavigation.open('projects');let archived=h.query('.archived-assistant-plan [data-milestone-form="aca-m0"]');setForm(archived,'todo','https://example.com/old-aca-evidence');submit(archived);
 assert.equal(ctx.phdCareerProgress.read().milestones['ai-choice-assistant']['aca-m0'].completedAt,'');assert.equal(ctx.phdCareerProgress.read().milestones['demand-decision-lab']['ddl-m0'].completedAt,oldDate);assert.equal(record(ctx,'wa-m1').status,'doing');
 archived=h.query('.archived-assistant-plan [data-milestone-form="aca-m0"]');setForm(archived,'done','https://example.com/old-aca-evidence',true);submit(archived);assert.equal(ctx.phdCareerProgress.read().milestones['ai-choice-assistant']['aca-m0'].status,'done');assert.equal(ctx.CareerUI.mainProjectStats().done,0);
 h.destroy();console.log('PASS canonical WA task UI: one form per outcome, all six module links, old/new isolation, strict evidence/attestation, single writes, done/date/repeat/undo/reload, next-incomplete stage, draft/history/failed-save guards, role retention and no inferred task/lesson/skill completion.');
})().catch(e=>{console.error(e);process.exitCode=1});
