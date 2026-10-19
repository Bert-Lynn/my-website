/* Castle presentation only. Existing task identities, progress and authentication own all writes. */
(function(root){
'use strict';
const doc=root.document,byId=id=>doc.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion=()=>!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const safeURL=url=>{try{const parsed=new URL(url);return ['https:','http:'].includes(parsed.protocol)&&!parsed.username&&!parsed.password?parsed.href:null}catch{return null}};
const tasks=()=>root.UnifiedTasks?.registry?.()||[];
const nextTask=list=>list.find(x=>['watch','practice','delivery'].includes(x.kind)&&!x.done);
function openTask(item){
 if(!item||root.CareerUI?.canNavigate?.()===false)return false;
 root.UnifiedTasks?.reset?.();
 if(root.AppNavigation?.open?.('execution')===false)return false;
 const row=[...doc.querySelectorAll('[data-unified-row]')].find(x=>x.dataset.unifiedRow===item.id);
 if(row){row.open=true;row.scrollIntoView?.({block:'center',behavior:reducedMotion()?'auto':'smooth'});row.querySelector('summary')?.focus?.({preventScroll:true})}
 return true;
}
function render(){
 const all=tasks(),next=nextTask(all),hero=byId('castleNext');
 if(hero){
  const url=next?.kind==='watch'?safeURL(next.url):null;
  hero.innerHTML='<div class="castle-next-copy"><span class="castle-kicker">下一步 · '+(next?({watch:'课程学习',practice:'亲手练习',delivery:'作品交付'}[next.kind]):'自主复习')+'</span><h2>'+esc(next?.title.replace(/^(看课：|练习：)/,'')||'当前主线已完成')+'</h2><p>'+esc(next?.kind==='watch'?next.source.episodeLabel+' · '+next.source.durationLabel:next?.kind==='practice'?next.source.practice:next?.description||'可以回看资料，或继续科研任务。')+'</p></div><div class="castle-next-actions">'+(url?'<a class="castle-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">打开这节视频 <span aria-hidden="true">↗</span></a>':next?'<button class="castle-button" id="castleOpenNext">查看任务要求 <span aria-hidden="true">→</span></button>':'<a class="castle-button" href="#resources" data-castle-route="resources">回到课程目录</a>')+'<small>观看、练习、交付分别记录</small></div>';
  const practice=all.find(x=>x.kind==='practice'&&!x.done&&x.stageId===next?.stageId);
  if(practice){hero.innerHTML+='<section class="future-practice"><span class="castle-kicker">对应练习 · 独立记录</span><h3>'+esc(practice.title.replace(/^练习：/,''))+'</h3><p>'+esc(practice.description||practice.source.practice||'打开原任务查看练习与验收。')+'</p>'+(practice.check?'<p class="future-check">验收：'+esc(practice.check)+'</p>':'')+'<button id="futureOpenPractice" type="button">查看练习要求 →</button></section>';byId('futureOpenPractice').onclick=()=>openTask(practice)}
  if(byId('castleOpenNext'))byId('castleOpenNext').onclick=()=>openTask(next);
  hero.querySelectorAll('[data-castle-route]').forEach(a=>a.onclick=e=>{e.preventDefault();root.AppNavigation?.open?.(a.dataset.castleRoute)});
 }
 const research=doc.body.getAttribute('data-task-view')==='research';
 doc.querySelectorAll('#mainTabs [data-page]').forEach(button=>{if(['execution','execution/research'].includes(button.dataset.page))button.setAttribute('aria-pressed',String(doc.body.getAttribute('data-current-page')==='execution'&&(button.dataset.page==='execution/research'?research:!research)))});
 const catalog=byId('castleCatalog');if(catalog)catalog.textContent='近期 '+all.filter(x=>x.current).length+' 项 / 全部 '+all.length+' 项';
 const summary=byId('castleProject');if(summary)summary.textContent='用户反馈分析 Agent · 四阶段研习';
}
function init(){
 doc.querySelectorAll('[data-future-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();root.AppNavigation?.open?.(a.dataset.futureRoute)}));
 const list=byId('currentTaskList');if(list&&root.MutationObserver)new root.MutationObserver(render).observe(list,{childList:true});
 render();
}
root.CastleTheme={render,openTask,nextTask,safeURL};
init();
})(window);
