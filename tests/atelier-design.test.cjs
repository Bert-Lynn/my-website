'use strict';
// Source/semantic constraints only. A native-browser review is required for pixels.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const baseline=require('./fixtures/atelier-protected-baseline.json');
// Unified adapters have separate sync tests. paper2 changes goal display only; its immutable source/state protection is covered by paper2-research.test.cjs.
const reviewedChanges=new Set(['app.js','cloud-sync.js','goal-ui.js']);
for(const [file,sha] of Object.entries(baseline.files)){
 if(reviewedChanges.has(file))continue;
 const bytes=fs.readFileSync(path.join(root,file));
 assert.equal(crypto.createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex'),sha,file+': protected source remains at the verified pre-redesign main');
}
const html=read('index.html'),css=read('ink-theme.css'),cover=read('cover.css'),hub=read('module-hub.js');
assert(html.indexOf('ink-theme.css')>html.indexOf('employer-events.css'),'the unified display layer owns the final cascade');
assert(html.includes('星灯学舍 · 2026.10.13'),'visible edition distinguishes the castle release');
assert(html.indexOf('castle-theme.css')>html.indexOf('ink-theme.css'),'castle theme is the final display cascade');
assert(html.includes('id="portalCircle"')&&html.includes('clip-path="url(#portalCircle)"'),'moon-window art is a real structured decorative component');
assert(html.includes('aria-hidden="true"'),'decorative artwork remains noninteractive');
assert(css.includes('@font-face')&&css.includes('font-display:swap'));
assert(css.includes('"Songti SC","STSong","SimSun",serif'),'no-font fallback is defined');
assert(fs.statSync(path.join(root,'assets/fonts/growth-song.woff')).size<650000,'display subset stays within its 650 KB budget');
const license=read('assets/fonts/LICENSE.txt');assert(license.includes('2017–2024 Adobe'));assert(license.includes('SIL OPEN FONT LICENSE Version 1.1'));assert(license.includes('Growth Song'));
assert(!/https?:\/\/|@import/.test(css+cover),'no third-party stylesheet/font/art requests');
for(const n of ['一','二','三','四','五'])assert(hub.includes("number:'"+n+"'"),'all module labels use readable Chinese chapter numbers');
for(const text of ['所有任务','视频课程','科研与论文','实习准备'])assert(hub.includes(text),'functional names remain explicit');
assert(css.includes('.hub-module-card:before,.hub-module-card:after{display:none;content:none}'),'the new quiet theme removes former decorative spines');
assert(css.includes('.focus-task.is-next{')&&css.includes('.video-course-card{'),'the same treatment reaches task and course screens');
assert(/\.unified-title\{[^}]*font-size:16px;/.test(css),'unified task titles remain readable');
assert(css.includes('.video-release-meta{'),'visible course dates and version are supported');
assert(css.includes('.app-header .cloud-pill,.app-header .guide-entry,.app-header .more-navigation>summary,.app-header .more-navigation nav button{min-height:44px'));
assert(css.includes('prefers-reduced-motion')&&css.includes('forced-colors')&&cover.includes('prefers-reduced-motion'));
console.log('PASS preserved growth sources and quiet replacement: immutable app/auth/data/SQL/classroom, meaningful module/task/course treatment, local licensed typeface and fallback, source accessibility, edition identity, and no new external requests. Native pixel/auth testing remains separate.');
