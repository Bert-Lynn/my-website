'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {makeDocument}=require('./helpers/app-harness.cjs');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const doc=makeDocument('<body><main><div class="paper2-intro"><p><strong>研究标题</strong></p><p>长研究范围</p><p>阅读计划原文</p><p>备选方向原文</p><small>进度说明</small></div><p class="proposal-lead">短文</p><p class="video-watch-scope">长课程说明</p><dl class="video-application"><div><dt>交付标准</dt><dd><span>完整标准原文</span></dd></div><div><dt>小验收</dt><dd><span>完整验收原文</span></dd></div></dl><p class="proposal-lead"><a href="https://example.com/course">课程链接</a>长文</p><details><p class="video-watch-scope">已有折叠内容</p></details><section id="hiddenSection" hidden><p class="video-watch-scope">暂未显示的长说明</p></section><div class="track-summary"><p>计划第一段</p><p>计划第二段</p><select id="route"><option value="keep" selected>保留方向</option></select></div><button id="action">保存</button><input id="check" type="checkbox" checked></main></body>');
// Deterministic DOM geometry model, deliberately not a browser/pixel test.
const proto=Object.getPrototypeOf(doc);
Object.defineProperties(proto,{
 className:{get(){return this.attrs.class||''},set(v){this.attrs.class=v}},
 childNodes:{get(){return this.children}},
 firstElementChild:{get(){return this.children[0]}},
 nextElementSibling:{get(){const c=this.parentElement?.children||[];return c[c.indexOf(this)+1]}},
 scrollHeight:{get(){return this.children.reduce((sum,c)=>sum+c.getBoundingClientRect().height,0)}}
});
proto.matches=function(s){return s.split(',').some(x=>x.startsWith('.')?this.classList.contains(x.slice(1)):this.tagName===x.toUpperCase())};
proto.getClientRects=function(){for(let el=this;el;el=el.parentElement)if(el.hidden)return [];return [{}]};
proto.getBoundingClientRect=function(){return {height:this._height??(this.textContent==='短文'?24:this.classList.contains('video-watch-scope')?160:this.tagName==='P'?60:160),top:this.tagName==='BUTTON'?(this.parentElement.classList.contains('is-expanded')?300:100):40}};
proto.before=function(el){const p=this.parentElement;p.children.splice(p.children.indexOf(this),0,el);el.parentElement=p};
proto.append=function(el){if(el.parentElement){const c=el.parentElement.children;c.splice(c.indexOf(el),1)}this.children.push(el);el.parentElement=this};
proto.addEventListener=function(type,fn){this['on'+type]=fn};
const originalId=Object.getOwnPropertyDescriptor(proto,'id');Object.defineProperty(proto,'id',{get:originalId.get,set(v){this.attrs.id=v}});
doc.createElement=tag=>makeDocument('<'+tag+'></'+tag+'>').children[0];
// Each makeDocument has its own class. Create elements with the patched class instead.
doc.createElement=tag=>new doc.constructor(tag);
let observer,resize,scroll=0,microtasks=[];
const context={document:doc,innerHeight:800,getComputedStyle:()=>({lineHeight:'24px'}),addEventListener:(type,fn)=>{if(type==='resize')resize=fn},scrollBy:o=>{scroll+=o.top},queueMicrotask:fn=>microtasks.push(fn),MutationObserver:class{constructor(fn){observer=fn}observe(){}}};context.window=context;
vm.runInNewContext(read('compact-reading.js'),context);
const wrappers=()=>doc.querySelectorAll('.compact-reading');
assert.equal(wrappers().length,5,'only long text areas receive a control');
const intro=doc.querySelector('.paper2-intro');assert.equal(intro.children[0].tagName,'P');assert.equal(intro.children.at(-1).tagName,'SMALL');
const wrapper=wrappers()[0],body=wrapper.children[0],button=wrapper.children[1],full=body.textContent;
assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(button.getAttribute('aria-controls'),body.id);assert.equal(button.type,'button');
button.onclick();assert.equal(button.textContent,'收起 ↑');assert(wrapper.classList.contains('is-expanded'));assert.equal(body.textContent,full);
button.onclick();assert.equal(button.getAttribute('aria-expanded'),'false');assert.equal(scroll,-200);assert.equal(doc.activeElement,button);
for(let i=0;i<4;i++){button.onclick();button.onclick();context.CompactReading.refresh()}
assert.equal(wrappers().length,5,'repeated refresh never nests controls');
assert(doc.querySelector('#check').checked);assert.equal(doc.querySelector('#action').textContent,'保存');assert(!doc.querySelector('a').closest('.compact-reading'));assert(!doc.querySelector('details p').closest('.compact-reading'));
button.onclick();
intro.innerHTML='<p><strong>研究标题</strong></p><p>长研究范围</p><p>阅读计划原文</p><p>备选方向原文</p><small>进度说明</small>';
observer([{target:intro}]);microtasks.splice(0).forEach(fn=>fn());assert.equal(intro.querySelector('button').getAttribute('aria-expanded'),'true','same text remains expanded after business rerender');
resize();microtasks.splice(0).forEach(fn=>fn());assert.equal(wrappers().length,5);
const course=doc.querySelector('.video-watch-scope');course._height=20;context.CompactReading.refresh();assert(course.closest('.compact-reading').querySelector('button').hidden,'short text after wider layout hides the control');course._height=160;context.CompactReading.refresh();assert(!course.closest('.compact-reading').querySelector('button').hidden,'narrow layout restores the control');
assert(!doc.querySelector('#route').closest('.compact-reading'));assert.equal(doc.querySelector('#route').value,'keep');
const hidden=doc.querySelector('#hiddenSection');assert(!hidden.querySelector('.compact-reading'));hidden.hidden=false;observer([{target:hidden}]);microtasks.splice(0).forEach(fn=>fn());assert(hidden.querySelector('.compact-reading'),'revealed section is enhanced');
const source=read('compact-reading.js'),css=read('compact-reading.css'),html=read('index.html');
assert(!/localStorage|sessionStorage|fetch\(|innerHTML\s*=|\.checked\s*=/.test(source));
assert(css.includes('.paper-grid article > .compact-reading{grid-column:2}'));
assert(doc.querySelectorAll('dt').every(el=>!el.closest('.compact-reading')),'both delivery/check headings stay visible outside preview');
assert(css.includes('min-height:44px')&&css.includes('max-width:390px')&&css.includes('@media print'));
assert(html.includes('./compact-reading.js?v=20261015-reading1')&&html.includes('./compact-reading.css?v=20261015-reading1'));
console.log('PASS compact reading: long-only, original text, ARIA, native button, repeated toggles, stable rerenders, links/details/progress preserved; modeled DOM geometry only, no pixel QA.');
