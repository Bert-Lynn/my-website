/* Presentation only. Existing task identities, progress and authentication own all writes. */
(function(root){
'use strict';
const doc=root.document,byId=id=>doc.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion=()=>!!root.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const safeURL=url=>{try{const parsed=new URL(url);return ['https:','http:'].includes(parsed.protocol)&&!parsed.username&&!parsed.password?parsed.href:null}catch{return null}};
const tasks=()=>root.UnifiedTasks?.registry?.()||[];
const nextTask=(list=tasks())=>root.UnifiedTasks?.nextAction?root.UnifiedTasks.nextAction():list.find(x=>['watch','practice','delivery'].includes(x.kind)&&!x.done);
function openTask(item){
 if(!item)return false;
 if(root.UnifiedTasks?.openItem)return root.UnifiedTasks.openItem(item.id);
 if(root.CareerUI?.canNavigate?.()===false)return false;
 root.UnifiedTasks?.reset?.();
 if(root.AppNavigation?.open?.('execution')===false)return false;
 const row=[...doc.querySelectorAll('[data-unified-row]')].find(x=>x.dataset.unifiedRow===item.id);
 if(row){row.open=true;row.scrollIntoView?.({block:'center',behavior:reducedMotion()?'auto':'smooth'});row.querySelector('summary')?.focus?.({preventScroll:true})}
 return !!row;
}
function render(){
 const all=tasks(),next=nextTask(all),hero=byId('castleNext');
 if(hero){
  const current=all.filter(x=>['watch','practice','delivery'].includes(x.kind)),loaded=current.length>0;
  const url=next?.kind==='watch'?safeURL(next.href||next.url):null;
  const title=next?.title||(loaded?'当前学习与项目交付已完成':'任务暂未载入');
  const metadata=next?.kind==='watch'?[next.source?.episodeLabel,next.source?.durationLabel].filter(Boolean).join(' · '):next?.location||'';
  hero.innerHTML='<div class="castle-next-copy"><span class="castle-kicker">'+(next?'现在做 · '+({watch:'课程学习',practice:'项目练习',delivery:'项目交付'}[next.kind]):loaded?'下一步 · 科研与复习':'当前任务')+'</span><h2>'+esc(title)+'</h2>'+(metadata?'<p class="future-task-meta">'+esc(metadata)+'</p>':'')+(!next?'<p>'+esc(loaded?'可以继续科研任务，或回看课程资料。':'请刷新后重试；已有记录不会因此改变。')+'</p>':'')+'</div><div class="castle-next-actions">'+(url?'<a class="castle-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(next.linkLabel||'打开这节视频')+' <span aria-hidden="true">↗</span></a>':next?'<button class="castle-button" id="castleOpenNext" type="button">'+esc(next.linkLabel||'打开这项任务')+' <span aria-hidden="true">→</span></button>':loaded?'<a class="castle-button" href="#execution/research" data-castle-route="execution/research">查看科研任务 →</a>':'<a class="castle-button" href="#execution" data-castle-route="execution">查看任务 →</a>')+'</div>';
  if(byId('castleOpenNext'))byId('castleOpenNext').onclick=()=>openTask(next);
  hero.querySelectorAll('[data-castle-route]').forEach(a=>a.onclick=e=>{e.preventDefault();root.AppNavigation?.open?.(a.dataset.castleRoute)});
 }
 const research=doc.body.getAttribute('data-task-view')==='research';
 doc.querySelectorAll('#mainTabs [data-page]').forEach(button=>{if(['execution','execution/research'].includes(button.dataset.page))button.setAttribute('aria-pressed',String(doc.body.getAttribute('data-current-page')==='execution'&&(button.dataset.page==='execution/research'?research:!research)))});
 const catalog=byId('castleCatalog');if(catalog)catalog.textContent='当前主线 '+all.filter(x=>['watch','practice','delivery'].includes(x.kind)).length+' 项 · 全部 '+all.length+' 条记录';
 const summary=byId('castleProject');if(summary)summary.textContent='用户反馈分析 Agent · 四项项目交付';
}
function init(){
 doc.querySelectorAll('[data-future-route]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();root.AppNavigation?.open?.(a.dataset.futureRoute)}));
 const list=byId('currentTaskList');if(list&&root.MutationObserver)new root.MutationObserver(render).observe(list,{childList:true});
 render();
}
root.CastleTheme={render,openTask,nextTask,safeURL};
init();
})(window);
