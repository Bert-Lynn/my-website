'use strict';
const assert=require('node:assert/strict');const {app,makeDocument}=require('./helpers/app-harness.cjs');
const click=node=>{assert(node);return node.onclick({preventDefault(){},currentTarget:node})};
const doc=makeDocument('<main><input id="test"></main>');assert.equal(doc.querySelector('.missing input, input'),doc.querySelector('#test'));doc.querySelector('main').innerHTML='<input id="new">';assert.equal(doc.querySelector('#test'),null);assert(doc.querySelector('#new'));
(async()=>{
 const h=app({hash:'#execution',now:'2026-10-12T09:00:00Z'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 assert.equal(h.all('[data-unified-row]').length,20);assert.equal(h.all('[data-current-task]').length,4);assert(h.query('[data-unified-total]').textContent.includes('0 / 18'));
 const watch=ctx.UnifiedTasks.progressIds[0],practice=ctx.UnifiedTasks.progressIds[1];
 let input=h.query('[data-unified-lesson="'+watch+'"]');input.checked=true;input.onchange();assert.equal(ctx.AppProgress.sync().lessonSnapshot()[watch],'done');assert.equal(ctx.AppProgress.sync().lessonSnapshot()[practice],undefined);assert.equal(ctx.CareerUI.mainProjectStats().done,0);assert.equal(ctx.LessonUI.stats().done,0);assert(h.query('[data-unified-total]').textContent.includes('1 / 18'));
 click(h.query('[data-unified-filter="courses"]'));assert.equal(h.all('[data-unified-row]').length,7);click(h.query('[data-unified-filter="practice"]'));assert.equal(h.all('[data-unified-row]').length,7);
 click(h.query('[data-unified-filter="research"]'));assert.equal(h.all('[data-unified-row]').length,23);click(h.query('[data-unified-filter="original"]'));assert.equal(h.all('[data-unified-row]').length,133);
 const search=h.query('#unifiedSearch');search.value='CSV 读写';search.onchange();assert(h.query('[data-unified-filter="all"]').getAttribute('aria-pressed')==='true');assert.equal(h.all('[data-unified-row]').length,2);
 const clear=h.query('#unifiedSearch');clear.value='';clear.onchange();click(h.query('[data-unified-filter="all"]'));assert.equal(h.all('[data-unified-row]').length,174);
 const state=h.query('#unifiedStatus');state.value='done';state.onchange({target:state});assert.equal(h.all('[data-unified-row]').length,1);
 input=h.query('[data-unified-lesson="'+watch+'"]');input.checked=false;input.onchange();assert.equal(ctx.AppProgress.sync().lessonSnapshot()[watch],false);assert.equal(ctx.AppProgress.sync().lessonCompletedAtSnapshot()[watch],undefined);
 const status=h.query('#unifiedStatus');status.value='all';status.onchange({target:status});click(h.query('[data-unified-filter="recent"]'));
 const form=h.query('[data-milestone-form="wa-m0"]');form.querySelector('[name="milestoneEvidence"]').value='https://example.invalid/unsaved';form.oninput();h.setConfirmation(false);click(h.query('[data-unified-filter="courses"]'));assert.equal(h.query('[data-milestone-form="wa-m0"]'),form,'cancel preserves exact draft');assert.equal(h.all('[data-unified-row]').length,20);
 // Another project state can arrive without rebuilding the dirty form or stale summary.
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m1',{status:'done',evidenceUrl:'https://example.invalid/verified'});assert.equal(h.query('[data-milestone-form="wa-m0"]'),form);assert(h.query('[data-unified-total]').textContent.includes('1 / 18'));const row=h.query('[data-unified-row="milestone:work-assistant:wa-m1"]');assert(row.classList.contains('is-done'));assert(row.querySelector('.unified-state').textContent.includes('已完成'));
 h.setConfirmation(true);click(h.query('[data-unified-filter="original"]'));click(h.query('[data-unified-project="demand-decision-lab"]'));assert.equal(ctx.AppNavigation.current(),'projects');assert(h.query('.legacy-project-plan').open,'opening a DDL record opens its actual ancestor');
 h.destroy();console.log('PASS unified task UI:20 default rows; all174; categories/search/completed/undo; independent course state; unsaved cancel; dirty status refresh; original DDL navigation.');
})().catch(error=>{console.error(error);process.exitCode=1});
