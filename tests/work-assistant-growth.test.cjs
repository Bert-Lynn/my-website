'use strict';
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const p=require('../data/project-outline.json'),state=require('../career-state.js');
const expected=require('./fixtures/agent-growth-verified-sources.json');
const plain=x=>JSON.parse(JSON.stringify(x));
(async()=>{
 assert.equal(p.growthLevels.length,3,'approved route has application, Agent algorithm/eval and post-training/RL layers');
 assert.equal(new Set(p.growthLevels.map(x=>x.id)).size,3,'future descriptions have distinct public content IDs');
 assert.equal(state.ids.length,31,'public learning layers do not expand cloud state');
 assert.deepEqual(Object.keys(state.projects).sort(),['ai-choice-assistant','demand-decision-lab','work-assistant']);
 const h=app({hash:'#projects'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 const snapshot=()=>plain({career:ctx.phdCareerProgress.read(),tasks:ctx.AppProgress.sync().snapshot(),lessons:ctx.AppProgress.sync().lessonSnapshot()});
 const before=snapshot();
 const root=h.query('#careerProjects .growth-ladder');assert(root);
 const cards=root.querySelectorAll('.growth-level');assert.equal(cards.length,3);assert(cards.every(x=>!x.open),'all three explanation layers are collapsed initially');
 assert.equal(root.querySelectorAll('form,input,select,textarea,progress,[role="progressbar"]').length,0,'future plans contain no editable completion or progress widgets');
 assert.equal(h.all('.current-project-progress [data-project-id="work-assistant"]').length,4,'only current four outcomes expose product progress');
 for(const [i,level] of p.growthLevels.entries()) {
  const card=cards[i],verified=expected.levels[i];assert.equal(level.id,verified.id);assert(card.querySelector('summary').textContent.includes(level.title));assert(card.textContent.includes(level.goal));
  for(const field of ['boundary','costGate','estimateNote']) assert(card.textContent.includes(verified[field]),level.id+': full verified '+field+' is rendered');
  const sources=[...verified.resources,...verified.steps.flatMap(x=>x.resources)];
  for(const source of sources) {const a=card.querySelector('a[href="'+source.url+'"]');assert(a,'official researched source link survives integration: '+source.url);if(source.scope)assert(card.textContent.includes(source.scope),'exact selected reading scope is retained');}
  for(const step of verified.steps) {assert(card.textContent.includes(step.title),'specific planned outcome is rendered');assert(card.textContent.includes(step.computeGate),'per-experiment compute/cost gate survives');for(const item of [...step.files,...step.checks,...(Array.isArray(step.exercise)?step.exercise:[step.exercise])])assert(card.textContent.includes(item),'specific planned files and acceptance checks survive');}
  if(i>0) {assert(!/已完成|已掌握|已通过/.test(card.querySelector('summary').textContent),'future learning is not shown as achieved');assert(/后续|计划|尚未|不.*勾选/.test(card.querySelector('.growth-record-note').textContent),'future record limits are honest');}
  card.open=true;card.ontoggle();
  const resources=[...(level.resources||[]),...(level.steps||[]).filter(x=>typeof x==='object').flatMap(x=>x.resources||[])];
  for(const source of resources) if(source.url) {const a=card.querySelector('a[href="'+source.url+'"]');assert(a,'exact research-backed source URL is rendered: '+source.url);assert.equal(a.getAttribute('target'),'_blank');assert(/noopener/.test(a.getAttribute('rel')));}
 }
 assert(root.querySelectorAll('.growth-study-step').every(x=>x.tagName==='DETAILS'&&!x.open),'detailed course recipes are nested and closed instead of making a giant expanded page');
 assert(root.textContent.includes('DPO')&&root.textContent.includes('不是完成了在线RL实验'),'DPO is not misrepresented as online RL');
 assert(root.textContent.includes('原CSV不能直接当DPO或RLHF数据'),'feedback CSV is not misrepresented as preference training data');
 assert(root.textContent.includes('可选进阶')&&root.textContent.includes('GRPO'),'actual RL path is clearly optional');
 ctx.CareerUI.render();assert(h.all('#careerProjects .growth-level').every(x=>x.open),'safe refresh retains expanded learning details');
 assert.deepEqual(snapshot(),before,'reading and expanding future layers creates no completion anywhere');
 ctx.AppNavigation.open('learn/code');const learning=h.query('.learning-growth-ladder');assert(learning&&!learning.open,'course view hides the longer-term route under one optional expansion');
 assert.equal(learning.querySelectorAll('form,input,select,textarea,progress,[role="progressbar"]').length,0);
 assert.deepEqual(plain(ctx.CareerUI.mainProjectStats()),{done:0,total:4});
 assert.deepEqual(snapshot(),before);
 h.destroy();
 console.log('PASS three-layer guidance: exact three public descriptions, collapsed future paths, sources preserved, no editable controls/progress claims/new private keys, WA4 unchanged and no inferred completion.');
})().catch(error=>{console.error(error);process.exitCode=1});
