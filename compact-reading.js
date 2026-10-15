/* Progressive reading controls only: no progress, account or storage writes. */
(function(root){
'use strict';
if(root.CompactReading)return;
const doc=root.document;
const selectors=['.paper2-intro','.video-watch-scope','.video-application dd','.track-summary','.proposal-lead','.flow-goal > div > p','.demo-grid article p','.paper-grid article > p'];
const interactive='a,button,input,select,textarea,form,details,summary,[tabindex],[contenteditable]';
const states=new Map();
let serial=0,queued=false;
function eligible(node){return !node.closest('details,summary,.compact-reading')}
function parts(node){
 if(node.matches('.paper2-intro,.track-summary'))return Array.from(node.children).filter((child,i)=>child.tagName==='P'&&(!node.matches('.paper2-intro')||i>0));
 return [node];
}
function enhance(node){
 if(!eligible(node)||!node.getClientRects().length)return;
 const selected=parts(node);
 if(!selected.length||selected.some(el=>el.querySelector(interactive)))return;
 // Do not move non-adjacent paragraphs past a title, link or progress indicator.
 if(selected.some((el,i)=>i&&selected[i-1].nextElementSibling!==el))return;
 const height=selected.reduce((sum,el)=>sum+el.getBoundingClientRect().height,0);
 const line=parseFloat(root.getComputedStyle(selected[0]).lineHeight)||24;
 if(height<=line*4+2)return;
 const key=node.className+'|'+selected.map(el=>el.textContent).join('\n');
 const inside=node.tagName==='DD';
 const wrapper=inside?node:doc.createElement('div'),body=doc.createElement('div'),button=doc.createElement('button');
 wrapper.classList.add('compact-reading');body.className='compact-reading-body';
 body.id='compact-reading-'+(++serial);body.style.setProperty('--reading-preview-height',line*4+'px');
 if(inside){Array.from(node.childNodes).forEach(child=>body.append(child));wrapper.append(body)}
 else{selected[0].before(wrapper);wrapper.append(body);selected.forEach(el=>body.append(el))}
 button.type='button';button.className='compact-reading-toggle';button.setAttribute('aria-controls',body.id);
 wrapper.append(button);
 let expanded=states.get(key)===true;
 function paint(){
  wrapper.classList.toggle('is-expanded',expanded);
  button.textContent=expanded?'收起 ↑':'看全文 ↓';
  button.setAttribute('aria-expanded',String(expanded));
 }
 button.addEventListener('click',()=>{
  const before=button.getBoundingClientRect().top;
  const collapsing=expanded;expanded=!expanded;states.set(key,expanded);paint();
  button.focus({preventScroll:true});
  // Keep the reading control in place when collapsing a long passage.
  if(collapsing&&before>=0&&before<root.innerHeight){
   const after=button.getBoundingClientRect().top;
   root.scrollBy({top:after-before,behavior:'instant'});
  }
 });
 paint();
}
function refresh(){
 queued=false;
 doc.querySelectorAll(selectors.join(',')).forEach(enhance);
 doc.querySelectorAll('.compact-reading').forEach(wrapper=>{
  if(!wrapper.getClientRects().length)return;
  const body=wrapper.querySelector('.compact-reading-body'),button=wrapper.querySelector('.compact-reading-toggle');
  const line=parseFloat(root.getComputedStyle(body.firstElementChild||body).lineHeight)||24;
  body.style.setProperty('--reading-preview-height',line*4+'px');
  const short=body.scrollHeight<=line*4+2;
  button.hidden=short;wrapper.classList.toggle('is-short',short);
 });
}
function schedule(){if(!queued){queued=true;root.queueMicrotask(refresh)}}
root.CompactReading={refresh,eligible};
if(root.MutationObserver)new root.MutationObserver(records=>{
 // Ignore our own insertions and labels, but respond to business renderer replacements.
 if(records.some(record=>!record.target.closest?.('.compact-reading')))schedule();
}).observe(doc.querySelector('.site-shell main')||doc.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','data-current-page','data-task-view']});
root.addEventListener('resize',schedule);
doc.fonts?.ready.then(schedule);
refresh();
})(window);
