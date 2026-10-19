'use strict';
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const p=require('../data/project-outline.json');
const copy=x=>JSON.parse(JSON.stringify(x));
(async()=>{
 const h=app({hash:'#execution'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 h.query('[data-unified-filter="all"]').onclick();
 const initial=copy(ctx.phdCareerProgress.read());
 const cards=h.all('#currentTaskList [data-current-task]');assert.equal(cards.length,4);
 assert.deepEqual(cards.map(card=>card.dataset.currentTask),p.milestones.map(m=>m.id));
 for(const [i,card] of cards.entries()){
  assert.deepEqual(card.querySelectorAll('.task-brief dt').map(x=>x.textContent),['做什么','看视频','交什么','怎么算完成'],'each task answers four concrete questions in the compact surface');
  assert(card.querySelector('h3').textContent.length<=24,'task headline remains short');
  assert(card.querySelector('.task-brief').textContent.length<220,'compact task fields do not expand back into long instructions');
  assert.equal(card.querySelector('.task-work-detail').open,false,'original steps and progress forms start collapsed');
  const body=card.querySelector('.current-project-stage-body');
  for(const detail of [...p.milestones[i].steps,...p.milestones[i].files,...p.milestones[i].deliverables,...p.milestones[i].acceptance]) assert(body.textContent.includes(detail),'complete original instructions and completion meaning remain nested');
  const sources=require('../data/video-learning.json').resources.filter(resource=>resource.taskId===p.milestones[i].id);
  for(const source of sources){assert(card.querySelector('.task-reading a[href="'+source.url+'"]'),'exact verified video URL is exposed');assert(card.querySelector('.task-reading-detail').textContent.includes(source.watchScope),'exact video scope remains available inside the folded task details')}
 }
 assert.equal(h.all('#currentTaskList .is-next').length,1);assert.equal(h.query('#currentTaskList .is-next').dataset.currentTask,'wa-m0');
 cards[0].querySelector('.task-work-detail').open=true;cards[0].querySelector('.task-work-detail').ontoggle();ctx.CareerUI.render();assert(h.query('[data-current-task="wa-m0"] .task-work-detail').open,'intentional expansion survives safe refresh');
 ctx.AppNavigation.open('projects');
 const intro=h.query('.proposed-project');assert(intro);
 for(const text of [p.targetRole,p.mainTitle,p.oneLine,p.capabilityScope,p.executionBoundary])assert(intro.textContent.includes(text),'compact project keeps its concrete purpose and honest nested scope');
 assert(intro.querySelector('.project-preview-note').textContent.includes('待制作'),'preview does not claim the product exists');
 assert.equal(intro.querySelector('.work-project-context').open,false);assert.equal(intro.querySelector('.project-growth-plan').open,false,'future learning has one collapsed entrance');
 assert.equal(h.all('#careerProjects [data-project-id="work-assistant"]').length,0,'overview does not duplicate current task forms');
 assert.equal(h.query('.archived-assistant-plan').open,false);assert.equal(h.query('.legacy-project-plan').open,false);
 assert(!/航班|AirDemandLab|EnterpriseAgentLab|VisionLab/.test(intro.querySelector('h2').textContent),'current product does not require historical products');
 ctx.AppNavigation.open('execution/year');
 assert.equal(h.all('#taskGroups [data-id]').length,47,'all original checkboxes remain reachable');
 const oldDemoIds=h.evaluate('tasks.filter(t=>t.category==="demo"&&t.id!=="sep-apply").map(t=>t.id)');
 for(const id of oldDemoIds)assert(h.query('#task-'+id+' .task-plan-context').textContent.includes('不是当前主作品的必做清单'),id+': old record retains honest scope');
 const target=h.query('[data-task-section="execution"]');assert(target);target.onclick();assert.equal(ctx.AppNavigation.route(),'execution');assert.equal(h.query('#currentTaskList').hidden,false);
 ctx.AppNavigation.open('execution/research');assert.equal(h.query('.execution-project-note'),null,'research view remains independent');
 assert.deepEqual(copy(ctx.phdCareerProgress.read()),initial,'reading, expansions and navigation never create achievement');
 h.destroy();console.log('PASS compact task clarity: four concrete fields, exact verified video sections, original instructions nested and preserved, one next task, honest project preview, folded future scope, separate archives, complete47 original tasks and zero navigation writes.');
})().catch(e=>{console.error(e);process.exitCode=1});
