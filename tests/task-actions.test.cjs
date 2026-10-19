'use strict';
// Synthetic independent progress + semantic DOM assertions. No real account writes.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {app}=require('./helpers/app-harness.cjs');
const click=node=>{assert(node);return node.onclick({preventDefault(){},currentTarget:node})};
(async()=>{
 const h=app({hash:'#execution',now:'2026-10-19T05:00:00Z'}),c=h.ctx;
 await c.AppProgress.sync().start();
 const u=c.UnifiedTasks,sync=c.AppProgress.sync(),videos=c.VIDEO_LEARNING.resources;
 const snapshot=()=>JSON.stringify({lessons:sync.lessonSnapshot(),tasks:sync.snapshot(),career:c.phdCareerProgress.read()});
 const initial=snapshot(),ids=Array.from(u.registry(),x=>x.id).sort(),first=videos[0];
 assert.equal(ids.length,177);assert.equal(new Set(ids).size,177);
 assert.equal(h.all('[data-unified-row]').length,5);
 assert(h.all('[data-unified-row]').every(row=>u.registry().find(x=>x.id===row.dataset.unifiedRow).stageId==='wa-m0'));
 assert.equal(u.nextAction().id,'lesson:watch-'+first.id);
 assert.equal(u.nextAction().href,first.url);
 assert(u.nextAction().title.includes(first.title));
 for(const item of u.registry().filter(x=>['watch','practice','delivery'].includes(x.kind))){
  const d=u.actionDetails(item.id);assert(d.title&&d.action&&d.output&&d.check&&d.href);assert.equal(d.id,item.id);
 }
 for(const card of h.all('[data-unified-card]')){
  const row=card.querySelector('[data-unified-row]');assert.equal(row.open,false,'compact actions are visible without expanding');
  const summary=row.querySelector('summary');assert(summary.querySelector('.unified-brief'));assert(summary.textContent.includes('现在做'));assert(summary.textContent.includes('验收'));
  assert(card.querySelector('.unified-quick-actions'));
 }
 const watchCard=h.query('[data-unified-card="lesson:watch-'+first.id+'"]');
 assert.equal(watchCard.querySelector('.unified-quick-actions a').getAttribute('href'),first.url);
 const practiceCard=h.query('[data-unified-card="lesson:practice-'+first.id+'"]');
 assert(practiceCard.querySelector('summary').textContent.includes(first.practice));
 assert(practiceCard.querySelector('summary').textContent.includes(first.check));
 assert.equal(practiceCard.querySelector('.unified-quick-actions a').getAttribute('href'),'./data/work-agent-starter.zip');
 click(practiceCard.querySelector('[data-unified-open]'));
 assert(h.query('[data-unified-row="lesson:practice-'+first.id+'"]').open);
 assert.equal(snapshot(),initial,'reading and exposing a record never writes progress');
 // Complete the first stage in the same order used by the next-action API.
 for(const v of videos.filter(v=>v.taskId==='wa-m0'))for(const kind of ['watch','practice']){
  assert.equal(u.nextAction().id,'lesson:'+kind+'-'+v.id);
  const input=h.query('[data-unified-lesson="'+kind+'-'+v.id+'"]');input.checked=true;input.onchange();
 }
 assert.equal(u.nextAction().id,'milestone:work-assistant:wa-m0');
 assert.equal(c.CareerUI.mainProjectStats().done,0,'watch/practice do not complete delivery');
 // Save through the actual form to check the final stage item advances live.
 const form=h.query('[data-milestone-form="wa-m0"]');
 form.querySelector('[name="milestoneStatus"]').value='done';form.querySelector('[name="milestoneEvidence"]').value='https://example.invalid/task-action-test';form.querySelector('[name="milestoneAttest"]').checked=true;form.oninput();
 form.onsubmit({preventDefault(){},currentTarget:form});
 assert.equal(u.nextAction().stageId,'wa-m1');assert.equal(h.all('[data-unified-row]').length,3);
 assert(h.all('[data-unified-row]').every(row=>u.registry().find(x=>x.id===row.dataset.unifiedRow).stageId==='wa-m1'));
 // Roll back an earlier independent check while still on the default view.
 sync.setLesson('practice-'+first.id,false);
 assert.equal(u.nextAction().id,'lesson:practice-'+first.id);assert.equal(h.all('[data-unified-row]').length,5);
 assert.equal(c.CareerUI.mainProjectStats().done,1,'undoing practice never clears real delivery');
 // A direct link to a later record reveals its actual stage without altering state.
 const beforeJump=snapshot(),later=videos[videos.length-1];
 assert(u.openItem('lesson:practice-'+later.id));assert(h.query('[data-unified-row="lesson:practice-'+later.id+'"]').open);assert.equal(snapshot(),beforeJump);
 click(h.query('[data-unified-filter="recent"]'));assert.equal(h.all('[data-unified-row]').length,5);
 click(h.query('[data-unified-filter="research"]'));const plan=u.registry().find(x=>x.kind==='researchPlan');
 const planRow=h.query('[data-unified-row="'+plan.id+'"]');assert(planRow.querySelector('summary').textContent.includes(plan.source.deliverable));assert.equal(planRow.querySelectorAll('input,form,textarea,select').length,0);
 click(h.query('[data-unified-filter="all"]'));assert.equal(h.all('[data-unified-row]').length,177);assert.deepEqual(Array.from(u.registry(),x=>x.id).sort(),ids);
 const original=u.registry().find(x=>x.kind==='lesson'&&x.exercise&&x.check);assert(h.query('[data-unified-row="'+original.id+'"] summary').textContent.includes(original.check));
 // Every independent item must be complete before the automatic view is empty.
 for(const id of u.progressIds)sync.setLesson(id,'done');
 for(const m of c.PROJECT_OUTLINE.milestones)c.phdCareerProgress.setMilestone('work-assistant',m.id,{status:'done',evidenceUrl:'https://example.invalid/task-action-test'});
 click(h.query('[data-unified-filter="recent"]'));assert.equal(u.nextAction(),null);assert.equal(h.all('[data-unified-row]').length,0);assert(h.query('.unified-empty').textContent.includes('18项'));
 sync.setLesson('watch-'+first.id,false);assert.equal(u.nextAction().id,'lesson:watch-'+first.id);assert.equal(h.all('[data-unified-row]').length,5);
 const memory=h.memory;h.destroy();const reload=app({hash:'#execution',memory});await reload.ctx.AppProgress.sync().start();assert.equal(reload.ctx.UnifiedTasks.nextAction().id,'lesson:watch-'+first.id);assert.equal(reload.all('[data-unified-row]').length,5);reload.destroy();
 const root=path.join(__dirname,'..'),css=fs.readFileSync(path.join(root,'task-actions.css'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 assert(html.indexOf('task-actions.css')>html.indexOf('light-future.css'));assert(css.includes('@media(max-width:640px)'));assert(css.includes('min-height:44px'));assert(css.includes(':focus-visible'));assert(!/line-clamp:\s*\d/.test(css),'action text has no numeric line clamp');assert(css.includes('line-clamp:unset'),'legacy recommendation clamp is explicitly removed');
 console.log('PASS task actions: 177 stable IDs; 5 stage rows; concrete action/output/check; exact video/download links; watch-practice-delivery sequence; live stage advance and undo; later-stage jump; independent completion; all-done/reload; original/research read-only briefs; no presentation writes.');
})().catch(e=>{console.error(e);process.exitCode=1});
