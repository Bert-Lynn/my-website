'use strict';
// Local DOM and data contracts; video playback and visual layout need browser QA.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {app}=require('./helpers/app-harness.cjs');
const catalog=require('../data/video-learning.json'),curriculum=require('../data/career-curriculum.json'),outline=require('../data/project-outline.json');
const root=path.join(__dirname,'..'),plain=value=>JSON.parse(JSON.stringify(value));
const click=node=>{assert(node,'click target exists');assert.equal(typeof node.onclick,'function');return node.onclick({preventDefault(){},currentTarget:node})};
const snapshot=ctx=>JSON.stringify({tasks:ctx.AppProgress.sync().snapshot(),lessons:ctx.AppProgress.sync().lessonSnapshot(),career:ctx.phdCareerProgress.read()});
const videos=task=>catalog.resources.filter(resource=>resource.taskId===task);
const hrefs=nodes=>nodes.map(node=>node.getAttribute('href'));
(async()=>{
 const generated={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'video-learning.js'),'utf8'),generated);assert.deepEqual(plain(generated.window.VIDEO_LEARNING),catalog);
 const h=app({hash:'#resources'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 const legacyIDs=new Set([...curriculum.learningUnits.map(unit=>unit.id),...ctx.COURSE_LESSONS.courses.flatMap(course=>course.lessons.map(lesson=>lesson.id))]);
 for(const resource of catalog.resources){assert(!legacyIDs.has(resource.id));assert(!resource.canonicalProgressId&&!resource.progressId);}
 assert.deepEqual(catalog.stages.map(stage=>stage.taskId),outline.milestones.map(stage=>stage.id));
 assert.equal(h.query('.video-practice-archive').open,false);assert.equal(h.query('#legacyLearningArchive').open,false);assert.equal(h.all('#courseList [data-lesson]').length,53);
 assert.equal(h.all('.video-direction-steps li').length,3);assert.equal(h.all('.video-task-tabs button').length,4);
 assert.equal(h.all('.video-learning input').length,0,'videos do not create another completion system');
 assert.equal(h.all('.video-learning [role="progressbar"]').length,0,'old progress cannot look like watched-video progress');
 const before=snapshot(ctx);
 for(const stage of catalog.stages){
   click(h.query('.video-task-tabs [data-open-module="'+stage.moduleIds[0]+'"]'));
   assert.equal(ctx.AppNavigation.route(),'learn/'+stage.moduleIds[0]);
   assert.deepEqual(hrefs(h.all('.video-card-actions a')),videos(stage.taskId).map(resource=>resource.url));
   for(const [i,card] of h.all('.video-course-card').entries()){
     const resource=videos(stage.taskId)[i];assert.equal(card.dataset.videoResource,resource.id);
     for(const field of ['title','episodeLabel','skillLabel','practice','check','publishedAt','technologySummary'])assert(card.textContent.includes(resource[field]),field+' is visible per video');
     assert.equal(card.closest('details'),null);assert.equal(card.querySelector('.video-skill-detail').open,false);
     assert.deepEqual(card.querySelectorAll('[data-assess]').map(node=>node.dataset.assess),resource.skillIds);
     const link=card.querySelector('.video-card-actions a');assert.equal(link.getAttribute('target'),'_blank');assert.equal(link.getAttribute('rel'),'noopener noreferrer');
   }
 }
 ctx.history.back();assert.equal(ctx.AppNavigation.route(),'learn/check-results');ctx.history.forward();assert.equal(ctx.AppNavigation.route(),'learn/interview');
 assert.equal(snapshot(ctx),before,'all video navigation is read-only');
 for(const [module,task] of [['data','wa-m0'],['app','wa-m1']]){ctx.AppNavigation.open('learn/'+module);assert.deepEqual(hrefs(h.all('.video-card-actions a')),videos(task).map(resource=>resource.url),'existing aliases preserve their task mapping');}
 ctx.AppNavigation.open('execution');
 for(const stage of catalog.stages){assert.deepEqual(hrefs(h.all('[data-current-task="'+stage.taskId+'"] .task-course-link')),videos(stage.taskId).map(resource=>resource.url));}
 const form=h.query('#currentTaskList [data-milestone-form="wa-m0"]');form.querySelector('[name="milestoneEvidence"]').value='https://example.com/synthetic-unsaved';form.oninput();h.setConfirmation(false);
 assert.equal(ctx.AppNavigation.open('resources'),false);assert.equal(ctx.AppNavigation.route(),'execution');assert.equal(h.query('#currentTaskList [data-milestone-form="wa-m0"]'),form);
 h.setConfirmation(true);ctx.AppNavigation.open('resources');
 // An old completion is preserved and reversible, never interpreted as a watched video.
 ctx.AppProgress.sync().setLesson('u-python-diagnostic','done');
 assert.equal(ctx.AppProgress.sync().lessonSnapshot()['u-python-diagnostic'],'done');assert(h.query('[data-unit-check="u-python-diagnostic"]').checked);
 assert(h.query('[data-unit-check="u-python-diagnostic"]').closest('.video-practice-archive'));
 assert.deepEqual(hrefs(h.all('.video-card-actions a')),videos('wa-m0').map(resource=>resource.url));
 assert(!h.query('.video-course-card').classList.contains('is-done'));assert.equal(ctx.CareerUI.mainProjectStats().done,0);
 const oldCheckbox=h.query('[data-unit-check="u-python-diagnostic"]');oldCheckbox.checked=false;oldCheckbox.onchange();assert.equal(ctx.AppProgress.sync().lessonSnapshot()['u-python-diagnostic'],false);assert.equal(ctx.CareerUI.mainProjectStats().done,0);
 ctx.AppNavigation.open('modules');
 assert.deepEqual(hrefs(h.all('.hub-course-shortcuts a')),videos('wa-m0').slice(0,2).map(resource=>resource.url));
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'done',evidenceUrl:'https://example.com/synthetic-wa0'});
 assert.deepEqual(hrefs(h.all('.hub-course-shortcuts a')),videos('wa-m1').slice(0,2).map(resource=>resource.url));
 ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'todo'});
 assert.deepEqual(hrefs(h.all('.hub-course-shortcuts a')),videos('wa-m0').slice(0,2).map(resource=>resource.url));
 assert(!Object.keys(ctx.AppProgress.sync().lessonSnapshot()).some(id=>id.startsWith('wa-video-')));
 const memory=h.memory;h.destroy();
 const reload=app({hash:'#learn/check-results',memory});await reload.ctx.AppProgress.sync().start();assert.deepEqual(hrefs(reload.all('.video-card-actions a')),videos('wa-m2').map(resource=>resource.url));
 reload.ctx.phdCareerProgress.setRole('decision_optimization');reload.ctx.AppNavigation.open('resources');assert.equal(reload.query('.video-learning'),null);assert.equal(reload.ctx.CareerUI.stats().lessons.total,26);assert(!reload.query('#pageSubtitle').textContent.includes('看视频'));reload.ctx.AppNavigation.open('modules');assert.equal(reload.query('.hub-course-card h3').textContent,'课程学习');assert.equal(reload.all('#courseList [data-lesson]').length,53);reload.destroy();
 const unsafe=app({hash:'#resources'});const attack='<img src=x onerror=alert(1)>';Object.assign(unsafe.ctx.VIDEO_LEARNING.resources[0],{title:attack,skillLabel:attack,practice:attack,check:attack,url:'javascript:alert(1)'});unsafe.ctx.CareerUI.render();assert.equal(unsafe.all('.video-learning img').length,0);assert.equal(unsafe.query('.video-course-card').querySelector('.video-card-actions a'),null);delete unsafe.ctx.VIDEO_LEARNING;unsafe.ctx.CareerUI.render();assert(unsafe.query('.video-practice-archive [data-unit-check]'),'missing video asset still leaves original exercises accessible');assert.equal(unsafe.all('#courseList [data-lesson]').length,53);unsafe.destroy();
 console.log('PASS video learning: verified public snapshot, stable IDs without completion keys, visible video/skill/task/check mapping, four task routes plus aliases/history/reload, safe external URLs, default-folded old30/53 history, reversible old completion, WA-only recommendation advance/undo, dirty-form guard, preserved other direction and text escaping.');
})().catch(error=>{console.error(error);process.exitCode=1});
