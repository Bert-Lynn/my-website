'use strict';
// Semantic DOM tests with synthetic progress only, not browser pixel verification.
const assert=require('node:assert/strict'),fs=require('node:fs'),{app}=require('./helpers/app-harness.cjs');
(async()=>{
const h=app({hash:'#resources'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
const videos=ctx.VIDEO_LEARNING.resources,sync=ctx.AppProgress.sync(),first=videos[0];
const snap=()=>JSON.stringify({lessons:sync.lessonSnapshot(),tasks:sync.snapshot(),career:ctx.phdCareerProgress.read()});
const before=snap();
h.query('.video-task-tabs [data-open-module="ai-tools"]').onclick();assert.equal(ctx.document.activeElement,h.query('.course-detail-title'));assert.equal(h.query('.course-detail-title').getAttribute('tabindex'),'-1');ctx.AppNavigation.open('resources');
assert.equal(h.all('[data-course-overview]').length,7);assert.equal(h.all('.course-group').length,4);
assert(h.all('.course-group').every(n=>n.open));assert(h.query('.course-real-progress').textContent.includes('尚无完成记录'));
assert.equal(h.query('#courseNextTitle').textContent,first.title);
assert.equal(h.query('.course-next-actions a').getAttribute('href'),first.url);
assert(h.query('.course-next-check').textContent.includes(first.practice));assert(h.query('.course-next-check').textContent.includes(first.check));
assert.equal(h.query('.course-direction-detail').open,false);
for(const v of videos){const row=h.query('[data-course-overview="'+v.id+'"]');assert.equal(row.querySelector('a').getAttribute('href'),v.url);assert(row.textContent.includes(v.skillLabel));}
ctx.CareerUI.render();assert.equal(snap(),before,'render/navigation never writes progress');
// Existing unrelated completion never credits this sequence.
sync.setLesson('u-python-diagnostic','done');assert.equal(h.query('#courseNextTitle').textContent,first.title);
sync.setLesson('watch-'+first.id,'done');assert.equal(h.query('#courseNextTitle').textContent,first.title);assert(h.query('.course-next-heading').textContent.includes('做练习'));assert.equal(h.query('.course-next-actions button').dataset.courseRecord,'practice-'+first.id);
// Direct record jump lands on the exact original row; no parallel storage.
h.query('.course-next-actions button').onclick();assert.equal(ctx.AppNavigation.route(),'execution');const row=h.query('[data-unified-row="lesson:practice-'+first.id+'"]');assert(row.open);assert(!sync.lessonSnapshot()['practice-'+first.id]);
ctx.AppNavigation.open('resources');sync.setLesson('practice-'+first.id,'done');assert.equal(h.query('#courseNextTitle').textContent,videos[1].title);
sync.setLesson('watch-'+first.id,false);assert.equal(h.query('#courseNextTitle').textContent,first.title,'undo returns earliest unfinished video');
for(const v of videos){sync.setLesson('watch-'+v.id,'done');sync.setLesson('practice-'+v.id,'done');}
assert(h.query('.course-next').textContent.includes('均已记录完成'));assert.equal(ctx.CareerUI.mainProjectStats().done,0);
const memory=h.memory;h.destroy();const reload=app({hash:'#resources',memory});await reload.ctx.AppProgress.sync().start();assert(reload.query('.course-next').textContent.includes('均已记录完成'));reload.ctx.AppProgress.sync().setLesson('practice-'+first.id,false);assert.equal(reload.query('#courseNextTitle').textContent,first.title);reload.destroy();
const css=fs.readFileSync(require('node:path').join(__dirname,'../course-clarity.css'),'utf8');assert(css.includes('@media(max-width:640px)'));assert(css.includes('min-height:44px'));assert(css.includes(':focus-visible'));
console.log('PASS course clarity: all 7 real sources, stable independent state, next watch/practice, undo/reload, exact record jump, no automatic project completion, mobile/focus source contracts.');
})().catch(e=>{console.error(e);process.exitCode=1});
