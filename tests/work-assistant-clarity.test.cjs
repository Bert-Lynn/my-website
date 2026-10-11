'use strict';
const assert=require('node:assert/strict');
const {app}=require('./helpers/app-harness.cjs');
const p=require('../data/project-outline.json');
const copy=x=>JSON.parse(JSON.stringify(x));
(async()=>{
 const h=app({hash:'#projects'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 const initial=copy(ctx.phdCareerProgress.read());
 const intro=h.query('.proposed-project');assert(intro);
 for(const label of ['当前作品对应岗位','AI Agent 应用研发实习','最终作品','用户反馈分析 Agent','当前任务','产品、运营与客服团队']) assert(intro.textContent.includes(label),'direction is explicit: '+label);
 assert(intro.textContent.includes(p.milestones[0].title),'current task is an actual still-open outcome');
 for(const phrase of ['Python / SQL','模型与工具','操作入口与任务状态','错误处理与评测','GitHub']) assert(intro.textContent.includes(phrase),'visible skill-to-product route includes '+phrase);
 assert(/尚未建成/.test(intro.textContent)&&/不会执行 Agent/.test(intro.textContent),'planning UI does not pretend to be an executing Agent');
 assert(intro.textContent.includes(p.capabilityScope),'product proof is explicitly scoped instead of promising readiness for every AI role');
 const cards=h.all('.current-project-progress .work-outcome');assert.equal(cards.length,4);
 assert(cards.every(card=>!card.open),'project overview initially shows four outcome summaries instead of all implementation details');
 assert.deepEqual(cards.map(card=>card.querySelector('summary h3').textContent),p.milestones.map(m=>m.title));
 for(const [i,card] of cards.entries()) {
  const summary=card.querySelector('summary');
  assert(!/\.py|\.csv|pytest|安装/.test(summary.textContent),'top-level summary remains outcome-focused');
  const body=card.querySelector('.current-project-stage-body');
  for(const phrase of ['准备什么输入','打开什么软件','照着做这几步','最后留下哪些文件','怎样检查真的完成','文件放哪里，网站记什么']) assert(body.textContent.includes(phrase),p.milestones[i].id+': nested actionable guidance '+phrase);
  for(const detail of [...p.milestones[i].steps,...p.milestones[i].files,...p.milestones[i].acceptance]) assert(body.textContent.includes(detail),'complete concrete instruction is rendered');
 }
 assert.equal(h.query('.archived-assistant-plan').open,false);assert.equal(h.query('.legacy-project-plan').open,false);
 assert(!/航班|AirDemandLab|EnterpriseAgentLab|VisionLab/.test(intro.textContent),'current project does not mandate historical products');
 cards[0].open=true;cards[0].ontoggle();ctx.CareerUI.render();assert(h.query('.current-project-progress [data-outcome-id="wa-m0"]').open,'intentional expansion survives safe background refresh');
 ctx.AppNavigation.open('execution/year');
 assert(h.query('.execution-project-note').textContent.includes('用户反馈分析 Agent'));
 assert(h.query('.execution-project-note').textContent.includes('不把多个旧 Demo 当作当前必做主线'));
 assert.equal(h.all('#taskGroups [data-id]').length,47,'historical checkboxes remain available');
 const oldDemoIds=h.evaluate('tasks.filter(t=>t.category==="demo"&&t.id!=="sep-apply").map(t=>t.id)');
 for(const id of oldDemoIds) assert(h.query('#task-'+id+' .task-plan-context').textContent.includes('不是当前主作品的必做清单'),id+': old checkbox has honest scope');
 const target=h.query('[data-current-project]');assert(target);target.onclick();assert.equal(ctx.AppNavigation.current(),'projects');
 ctx.AppNavigation.open('execution/research');assert.equal(h.query('.execution-project-note'),null,'research task view stays independent of the internship product');
 assert.deepEqual(copy(ctx.phdCareerProgress.read()),initial,'reading, expansion, links and route changes never write achievement state');
 h.destroy();
 console.log('PASS independent direction clarity: explicit target role→one product→current outcome, four closed summaries with complete nested recipes, separate old archives, honest old task labels, direct product route and independent aviation research.');
})().catch(error=>{console.error(error);process.exitCode=1});
