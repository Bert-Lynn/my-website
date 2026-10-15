/* Castle presentation only. Existing task identities, progress and authentication own all writes. */
(function(root){
'use strict';
const doc=root.document,byId=id=>doc.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let hidden=false,tipMode='next',tipOpen=true;
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
function updateCompanion(){
 const stage=byId('castleCompanion'),hide=byId('castleHide'),restore=byId('castleRestore');
 if(!stage)return;
 stage.hidden=hidden;
 if(hide)hide.setAttribute('aria-expanded',String(!hidden));if(restore)restore.hidden=!hidden;
 doc.body.classList.toggle('companion-hidden',hidden);
 const dialogue=byId('castleDialogue'),dialogueToggle=byId('castleDialogueToggle');
 if(dialogue)dialogue.hidden=!tipOpen;
 if(dialogueToggle){dialogueToggle.textContent=tipOpen?'收起提示':'研习提示';dialogueToggle.setAttribute('aria-expanded',String(tipOpen))}
}
function render(){
 const all=tasks(),next=nextTask(all),hero=byId('castleNext'),note=byId('castleCompanionText');
 if(hero){
  const url=next?.kind==='watch'?safeURL(next.url):null;
  hero.innerHTML='<div class="castle-next-copy"><span class="castle-kicker">下一步 · '+(next?({watch:'课程学习',practice:'亲手练习',delivery:'作品交付'}[next.kind]):'自主复习')+'</span><h2>'+esc(next?.title.replace(/^(看课：|练习：)/,'')||'当前主线已完成')+'</h2><p>'+esc(next?.kind==='watch'?next.source.episodeLabel+' · '+next.source.durationLabel:next?.kind==='practice'?next.source.practice:next?.description||'可以回看资料，或继续科研任务。')+'</p></div><div class="castle-next-actions">'+(url?'<a class="castle-button" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">打开这节视频 <span aria-hidden="true">↗</span></a>':next?'<button class="castle-button" id="castleOpenNext">查看任务要求 <span aria-hidden="true">→</span></button>':'<a class="castle-button" href="#resources" data-castle-route="resources">回到课程目录</a>')+'<small>观看、练习、交付分别记录</small></div>';
  if(byId('castleOpenNext'))byId('castleOpenNext').onclick=()=>openTask(next);
  hero.querySelectorAll('[data-castle-route]').forEach(a=>a.onclick=e=>{e.preventDefault();root.AppNavigation?.open?.(a.dataset.castleRoute)});
 }
 const research=doc.body.getAttribute('data-task-view')==='research';
 doc.querySelectorAll('#mainTabs [data-page]').forEach(button=>{if(['execution','execution/research'].includes(button.dataset.page))button.setAttribute('aria-pressed',String(doc.body.getAttribute('data-current-page')==='execution'&&(button.dataset.page==='execution/research'?research:!research)))});
 const catalog=byId('castleCatalog');if(catalog)catalog.textContent='近期 '+all.filter(x=>x.current).length+' 项 / 全部 '+all.length+' 项';
 const summary=byId('castleProject');if(summary)summary.textContent='用户反馈分析 Agent · 四阶段研习';
 if(note)note.textContent=!next?'主线记录已完成，可以回看课程和验收。':tipMode==='check'?(next.check||next.description||'打开任务，查看原有验收标准。'):'先做「'+next.title.replace(/^(看课：|练习：)/,'')+'」。'+(next.kind==='watch'?'看完指定课节，再亲手练习。':next.kind==='practice'?'保留输入和输出，按标准核对结果。':'把结果与证据整理好，再记录实际进度。');
 const course=byId('castleCompanionCourse'),video=next?.kind==='watch'?next:all.find(x=>x.kind==='watch'&&x.stageId===next?.stageId);
 if(course){const url=safeURL(video?.url);course.hidden=!url;if(url){course.href=url;course.textContent='打开对应课程 ↗'}}
 updateCompanion();
}
function init(){
 byId('castleDialogueToggle')?.addEventListener('click',()=>{tipOpen=!tipOpen;render()});
 byId('castleHide')?.addEventListener('click',()=>{hidden=true;updateCompanion();byId('castleRestore')?.focus?.()});
 byId('castleRestore')?.addEventListener('click',()=>{hidden=false;updateCompanion();byId('castleHide')?.focus?.()});
 byId('castleTipNext')?.addEventListener('click',()=>{tipMode='next';render()});
 byId('castleTipCheck')?.addEventListener('click',()=>{tipMode='check';render()});
 byId('castleTaskFocus')?.addEventListener('click',()=>openTask(nextTask(tasks())));
 const figure=byId('castlePortrait');figure?.addEventListener('click',()=>{tipOpen=true;render()});
 const list=byId('currentTaskList');if(list&&root.MutationObserver)new root.MutationObserver(render).observe(list,{childList:true});
 render();
}
root.CastleTheme={render,openTask,nextTask,safeURL};
init();
})(window);
