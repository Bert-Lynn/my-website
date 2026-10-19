'use strict';
// Local semantic DOM checks with synthetic progress; no browser-layout or live playback claim.
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const click=node=>{assert(node,'action exists');assert.equal(typeof node.onclick,'function');return node.onclick({preventDefault(){},currentTarget:node});};
const snapshot=ctx=>JSON.stringify({tasks:ctx.AppProgress.sync().snapshot(),lessons:ctx.AppProgress.sync().lessonSnapshot(),career:ctx.phdCareerProgress.read(),taskDates:ctx.AppProgress.sync().taskCompletedAtSnapshot(),lessonDates:ctx.AppProgress.sync().lessonCompletedAtSnapshot()});
(async()=>{
  const h=app({hash:'#modules'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
  const videos=ctx.VIDEO_LEARNING.resources,stages=ctx.PROJECT_OUTLINE.milestones,before=snapshot(ctx);
  const research=h.query('[data-hub-route="execution/research"]');
  for(const text of ['AutoModSAT','方法与实验','半页流程笔记','原文位置'])assert(research.textContent.includes(text));
  assert(!research.textContent.includes('确定Agent'),'research entry does not decide the candidate topic');
  assert(h.query('[data-hub-route="projects"]').textContent.includes('4 项交付'));
  assert(h.query('.hub-course-card p').textContent.includes('交付 1'));
  click(h.query('[data-hub-route="projects"]'));
  assert.equal(h.query('.project-delivery-path').open,false);
  assert.equal(h.all('.project-delivery-path li').length,4);
  assert.equal(h.all('#careerProjects [data-project-id="work-assistant"]').length,0,'overview creates no duplicate progress forms');
  for(const [index,stage] of stages.entries()){
    const brief=ctx.UnifiedTasks.actionDetails('milestone:work-assistant:'+stage.id);
    const item=h.all('.project-delivery-path li')[index];
    assert(item.textContent.includes(brief.title.replace(/^交付：/,'')));
    assert(item.textContent.includes(brief.output));
  }
  const firstBrief=ctx.UnifiedTasks.actionDetails('milestone:work-assistant:wa-m0');
  const current=h.query('.project-next-delivery');
  for(const value of [firstBrief.action,firstBrief.output,firstBrief.check])assert(current.textContent.includes(value),'overview shares the same action, files and check as its task');
  click(h.query('.project-next-delivery [data-open-task]'));
  assert.equal(ctx.AppNavigation.route(),'execution');
  assert(h.query('[data-unified-row="milestone:work-assistant:wa-m0"]').open);
  assert(h.query('[data-current-task="wa-m0"] .task-work-detail').open,'delivery button opens actual steps and record form');
  for(const stage of ctx.VIDEO_LEARNING.stages){
    ctx.AppNavigation.open('learn/'+stage.moduleIds[0]);
    const resources=videos.filter(v=>v.taskId===stage.taskId);
    for(const resource of resources){
      const card=h.query('[data-video-resource="'+resource.id+'"]'),brief=ctx.UnifiedTasks.actionDetails('lesson:practice-'+resource.id);
      for(const value of [resource.practice,brief.output,resource.check])assert(card.textContent.includes(value));
      assert.deepEqual(card.querySelectorAll('.video-application dt').map(x=>x.textContent),['看完动手做','保留结果','小验收']);
      const source=card.querySelector('.video-card-actions a');
      assert.equal(source.getAttribute('href'),resource.url);assert.equal(source.getAttribute('rel'),'noopener noreferrer');
      assert.equal(card.querySelector('[data-course-record]').dataset.courseRecord,'watch-'+resource.id);
    }
    // A later-stage course must reveal that exact record despite the current-stage filter.
    const target=resources[resources.length-1];
    click(h.query('[data-video-resource="'+target.id+'"] [data-course-record]'));
    assert.equal(ctx.AppNavigation.route(),'execution');
    const row=h.query('[data-unified-row="lesson:watch-'+target.id+'"]');
    assert(row?.open,'record jump reveals the exact watch row');assert.equal(ctx.document.activeElement,row.querySelector('summary'));
    assert(!ctx.AppProgress.sync().lessonSnapshot()['watch-'+target.id],'opening the record is not a completion action');
  }
  assert.equal(snapshot(ctx),before,'reading, all cross-links and opening forms never write progress');
  ctx.AppNavigation.open('resources');
  assert(h.query('.video-learning a[download]'),'first delivery includes the actual starter download');
  assert(h.query('.course-next-check').textContent.includes(ctx.UnifiedTasks.actionDetails('lesson:practice-'+videos[0].id).output));
  // Marking a watched video changes its next action, but leaves its exercise and project untouched.
  ctx.AppProgress.sync().setLesson('watch-'+videos[0].id,'done');
  const watchDone=snapshot(ctx);
  const firstCard=h.query('[data-video-resource="'+videos[0].id+'"]');
  assert.equal(firstCard.querySelector('[data-course-record]').dataset.courseRecord,'practice-'+videos[0].id);
  click(firstCard.querySelector('[data-course-record]'));
  assert(h.query('[data-unified-row="lesson:practice-'+videos[0].id+'"]').open);
  assert.equal(snapshot(ctx),watchDone);assert.equal(ctx.CareerUI.mainProjectStats().done,0);
  // Only an explicit project record advances the project overview; undo restores the prior step.
  ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'done',evidenceUrl:'https://example.com/synthetic-course-actions'});
  ctx.AppNavigation.open('projects');assert.equal(h.query('.project-next-delivery [data-open-task]').dataset.openTask,'wa-m1');
  ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'todo'});
  assert.equal(h.query('.project-next-delivery [data-open-task]').dataset.openTask,'wa-m0');
  for(const stage of stages)ctx.phdCareerProgress.setMilestone('work-assistant',stage.id,{status:'done',evidenceUrl:'https://example.com/synthetic-'+stage.id});
  assert.equal(h.query('.project-next-delivery'),null);
  assert(h.query('.project-task-return').textContent.includes('均已保存完成'));
  h.destroy();
  console.log('PASS course/project actions: specific research entry, shared action/output/check copy, four-delivery map, exact course/practice and delivery jumps including later stages, real starter link, stable sources, read-only navigation, and explicit stage advance/undo/all-done.');
})().catch(error=>{console.error(error);process.exitCode=1;});
