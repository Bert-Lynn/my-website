'use strict';
// Source/semantic checks only; native-browser pixel QA is separate.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {makeDocument}=require('./helpers/app-harness.cjs');
const root=path.join(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8');
const baseline=require('./fixtures/ink-functional-baseline.json');
// These UI/document files were explicitly reworked after the ink-only release.
// Their behavior is covered by the task-focus/navigation suites; all immutable
// source remains hash-protected here and against the newer task-focus baseline.
const taskClarityFiles=new Set(['app.js','career-ui.js','module-hub.js','README.md']);
for(const [file,sha] of Object.entries(baseline.protectedFiles))if(!taskClarityFiles.has(file))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex'),sha,file+': ink styling cannot alter approved functional/data/storage content');
const html=read('index.html'),guide=read('guide.html'),doc=makeDocument(html);
const scripts=[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1]);
assert.deepEqual(scripts.map(x=>x.split('?')[0]),baseline.indexScripts.map(x=>x.split('?')[0]),'task clarity keeps the exact script set and dependency order');
for(const [i,url] of scripts.entries())if(!taskClarityFiles.has(url.split('?')[0].replace('./','')))assert.equal(url,baseline.indexScripts[i],'unchanged script keeps its original cache identity');
const ids=doc.querySelectorAll('[id]').map(x=>x.id);assert.equal(new Set(ids).size,ids.length,'new decorative SVG has no duplicate IDs');
assert.equal(doc.querySelector('#enterWorkspace').getAttribute('href'),'#modules');
assert.equal(doc.querySelector('#coverTitle').tagName,'H1');assert.equal(doc.querySelector('#coverTitle').getAttribute('tabindex'),'-1');
assert.equal(doc.querySelector('#cover').querySelectorAll('input,select,textarea,form').length,0,'decorative ink cover introduces no pretend state');
assert.equal(doc.querySelector('#cover').hidden,false);assert.equal(doc.body.getAttribute('data-current-page'),'cover');
for(const text of [html,guide]) {
 assert(text.includes('./ink-theme.css?v=20261011-ink1'),'separate growth pages include versioned ink theme');
 assert(text.indexOf('ink-theme.css')>text.indexOf('career.css'),'ink overrides load after the unchanged base palette');
}
assert(html.includes('./cover.css?v=20261011-cover1'),'byte-unchanged base cover CSS keeps its identity');
assert(html.includes('./module-hub.css?v=20261011-modules1'),'byte-unchanged base module CSS keeps its identity');
const ink=read('ink-theme.css'),cover=read('cover.css');
assert(!/https?:\/\//.test(ink+cover),'visual theme adds no third-party font or image requests');
assert(!/@import/.test(ink),'theme has no hidden stylesheet dependency');
assert(/prefers-reduced-motion/.test(cover+ink));assert(/:focus-visible/.test(cover+ink));
assert(/@media\s*\([^)]*max-width/.test(cover+ink),'narrow-screen ink layout exists');
assert(doc.querySelector('#cover svg[aria-hidden="true"]'),'ink artwork is decorative to screen readers');
const vars=Object.fromEntries([...ink.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));
const resolve=value=>{value=value.trim();if(/^var\(--[\w-]+\)$/.test(value))return resolve(vars[value.slice(4,-1)]);assert(/^#[0-9a-f]{6}$/i.test(value),'contrast token resolves to solid six-digit color: '+value);return value;};
const luminance=hex=>hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
const ratio=(foreground,background)=>{const a=luminance(resolve(foreground)),b=luminance(resolve(background));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
const surfaces=['var(--paper)','var(--paper-raised)','var(--surface-soft)','var(--selected)','#f2e8d9'];
for(const foreground of ['var(--ink)','var(--text)','var(--muted)','var(--cinnabar)','var(--amber)'])for(const background of surfaces)assert(ratio(foreground,background)>=4.5,foreground+' meets small-text contrast on '+background);
assert(ratio('var(--paper-raised)','var(--cinnabar)')>=4.5,'primary cover action text is readable');
assert(ratio('var(--cinnabar)','#e1d8ca')>=3,'real progress fill is visually distinct from its track');
assert(ratio('var(--cinnabar)','var(--paper)')>=3,'keyboard focus is visible against paper');
for(const selector of ['.hub-overall-number>strong','.hub-breakdown-row strong','.hub-independent-progress strong'])assert(ink.includes(selector),'actual task/progress numbers have explicit theme treatment');
assert(/\.hub-progress-bar>span\s*\{[^}]*background:var\(--cinnabar\)/.test(ink),'progress bars retain actual dynamic fill with a visible ink-theme color');
console.log('PASS ink-theme source integrity: immutable data/state/SQL/assets byte-preserved with explicit later task-clarity UI exceptions, exact script set/order, original theme cache key, >=4.5:1 text and >=3:1 progress/focus token contrast, unchanged semantic cover entry, unique SVG IDs, keyboard/reduced-motion/narrow contracts and no third-party visual requests.');
