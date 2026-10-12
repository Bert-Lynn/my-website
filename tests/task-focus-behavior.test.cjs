'use strict';
// Synthetic in-memory state only. No real accounts, private progress or network.
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const {backend}=require('./helpers/synthetic-progress-backend.cjs');
const plain=x=>JSON.parse(JSON.stringify(x)),pause=()=>new Promise(r=>setTimeout(r,35));
const click=x=>{assert(x);return x.onclick({preventDefault(){},currentTarget:x})};
const form=(h,id='wa-m0')=>h.query('#currentTaskList [data-milestone-form="'+id+'"]');
const milestone=(id)=>({status:'done',evidenceUrl:'https://example.com/synthetic-'+id,completedAt:'2026-10-10T00:00:00.000Z'});
const snapshot=h=>plain({tasks:h.ctx.AppProgress.sync().snapshot(),lessons:h.ctx.AppProgress.sync().lessonSnapshot(),career:h.ctx.phdCareerProgress.read()});
(async()=>{
 let h=app({hash:'#execution',now:'2026-11-10T00:00:00.000Z'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 const before=snapshot(h);assert.equal(h.query('#currentTaskList').hidden,false);assert.equal(h.query('#originalTaskPlan').hidden,true);
 const backlog=h.evaluate('carriedTasks(currentMonth()).length');assert(backlog>0);
 assert(h.query('[data-task-section="execution/month"]').textContent.replace(/\s/g,'').includes(backlog+'项顺延'),'current view still surfaces the true original-plan backlog');
 assert(h.query('[data-unified-total]').textContent.includes('0 / 18'));assert.equal(ctx.ModuleHub.snapshot().total.total,47);
 for(const route of ['execution/current','execution/research','execution/year','execution/month','execution','projects','learn/code','modules']){ctx.AppNavigation.open(route);assert.deepEqual(snapshot(h),before,'route '+route+' is read-only')}
 ctx.AppNavigation.open('execution');
 // Out-of-order manual completion must still recommend the earliest gap.
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m2',milestone('two'));
 assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m0');
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',milestone('zero'));
 assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m1');
 assert(h.query('[data-unified-total]').textContent.includes('2 / 18'));assert.equal(ctx.ModuleHub.snapshot().total.done,0);assert.equal(ctx.ModuleHub.snapshot().project.done,2);
 ctx.AppProgress.sync().setLesson('u-api','done');assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m1');assert.equal(ctx.CareerUI.mainProjectStats().done,2,'course completion never auto-finishes a task');
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m1',milestone('one'));ctx.phdCareerProgress.setMilestone('work-assistant','wa-m3',milestone('three'));
 assert.equal(h.all('#currentTaskList .is-next').length,0);assert(h.query('[data-unified-total]').textContent.includes('4 / 18'),'all four deliverables do not auto-complete fourteen learning activities');assert.equal(h.all('#currentTaskList [data-milestone-form]').length,4,'completed tasks remain reachable for undo and evidence review');
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'todo'});assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m0');assert.equal(ctx.phdCareerProgress.read().milestones['work-assistant']['wa-m0'].completedAt,'');
 ctx.AppNavigation.open('learn/code');const first=ctx.CareerUI.currentModule().unitIds[0];assert.equal(h.query('.module-intro [data-open-course-unit]').dataset.openCourseUnit,first);
 click(h.query('.module-intro [data-open-course-unit]'));assert.equal(h.query('[data-module-unit="'+first+'"]').open,true);assert.equal(h.document.lastScrolled,h.query('[data-module-unit="'+first+'"]'));
 ctx.AppProgress.sync().setLesson(first,'done');assert.notEqual(h.query('.module-intro [data-open-course-unit]').dataset.openCourseUnit,first,'next-lesson entrance follows real course progress');
 assert.equal(h.query('.first-session-guide').open,false);assert(h.query('.session-save').textContent.includes('回任务列表保存进度'));assert(!h.query('.session-save').textContent.includes('我的作品'));
 // Saving a second task must not discard the first task's unsaved input.
 ctx.AppNavigation.open('execution');const firstDraft=form(h);firstDraft.querySelector('[name="milestoneEvidence"]').value='https://example.com/UNSAVED_TASK_ZERO';firstDraft.oninput();
 const secondForm=form(h,'wa-m1');secondForm.querySelector('[name="milestoneStatus"]').value='doing';secondForm.oninput();secondForm.onsubmit({preventDefault(){},currentTarget:secondForm});
 assert.equal(form(h).querySelector('[name="milestoneEvidence"]').value,'https://example.com/UNSAVED_TASK_ZERO','saving another task preserves the unsaved first draft');
 assert(h.query('[data-unified-total]').textContent.includes('2 / 18'),'saved completion count updates even while another form is dirty');
 assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m0','next task still follows saved state with another draft open');
 h.setConfirmation(false);assert.equal(ctx.AppNavigation.open('resources'),false,'the remaining draft still protects navigation');
 const remaining=form(h);remaining.querySelector('[name="milestoneStatus"]').value='doing';remaining.onsubmit({preventDefault(){},currentTarget:remaining});assert.equal(ctx.AppNavigation.open('resources'),true,'saving the final draft releases navigation');
 h.destroy();
 // Auth transitions must discard only unsaved account-bound UI; no draft may leak
 // across identities or be written by a stale detached handler after switching.
 const b=backend();h=app({hash:'#execution',cloudClient:b.client});ctx=h.ctx;const sync=ctx.AppProgress.sync();await sync.start();
 const login=async email=>{await sync.signIn(email,'synthetic-placeholder');await pause();await sync.syncNow()};
 await login('synthetic-account-a@example.invalid');let oldForm=form(h);oldForm.querySelector('[name="milestoneStatus"]').value='doing';oldForm.querySelector('[name="milestoneEvidence"]').value='https://example.com/ACCOUNT_A_UNSAVED';oldForm.oninput();
 ctx.CareerUI.render();assert(oldForm===form(h),'same-account refresh preserves draft');
 await sync.signOut();await login('synthetic-account-b@example.invalid');
 assert.equal(form(h).querySelector('[name="milestoneEvidence"]').value,'','new account never sees the former account draft');
 assert.equal(oldForm.isConnected,false,'old account form is removed');assert.deepEqual(plain(ctx.phdCareerProgress.read().milestones),{});
 oldForm.onsubmit({preventDefault(){},currentTarget:oldForm});assert.equal(ctx.phdCareerProgress.read().milestones['work-assistant']?.['wa-m0'],undefined,'stale old-account handler cannot submit into new account');
 assert.equal(b.writes.length,0,'auth transitions and discarded drafts never persist synthetic state');
 // Offline canonical task save remains local and reloadable, then retries normally.
 b.failures.add('career_state');const current=form(h);current.querySelector('[name="milestoneStatus"]').value='doing';current.querySelector('[name="milestoneEvidence"]').value='https://example.com/synthetic-offline';current.oninput();current.onsubmit({preventDefault(){},currentTarget:current});await sync.syncNow();assert.equal(sync.status().mode,'error');const memory=h.memory;h.destroy();
 h=app({hash:'#execution',memory,cloudClient:b.client});ctx=h.ctx;await ctx.AppProgress.sync().start();await pause();
 assert.equal(form(h).querySelector('[name="milestoneStatus"]').value,'doing');assert.equal(form(h).querySelector('[name="milestoneEvidence"]').value,'https://example.com/synthetic-offline');
 b.failures.clear();await ctx.AppProgress.sync().syncNow();assert.equal(b.rows.get('synthetic-account-b@example.invalid').career_state['milestone:work-assistant:wa-m0'].status,'doing');
 h.destroy();console.log('PASS current task behavior: backlog visible,47/4 independent, next-earliest gap/all-done/undo, exact next lesson, no navigation or lesson auto-completion, multi-form draft retention, canonical dirty-draft account isolation and stale-handler rejection, offline reload/retry.');
})().catch(e=>{console.error(e);process.exitCode=1});
