'use strict';
// Source contracts, not pixel or computed-layout verification.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
const theme=read('ink-theme.css'),cover=read('cover.css'),html=read('index.html');
for(const [name,css] of [['theme',theme],['cover',cover]]){
 assert(!/https?:\/\/|@import/.test(css),name+': no new external visual assets');
 assert.equal((css.match(/\{/g)||[]).length,(css.match(/\}/g)||[]).length,name+': balanced declaration blocks');
 assert(!/box-shadow\s*:(?!none)[^;}]+/.test(css),name+': no decorative shadows');
 assert(!/border[^:;{}]*:[^;{}]*(double)/.test(css),name+': no double rules');
 assert(!/scale\(|zoom\s*:/.test(css),name+': readability is not fake page scaling');
 assert(css.includes('prefers-reduced-motion')&&css.includes('forced-colors'),name+': accessibility media support');
}
assert(theme.includes('@font-face')&&theme.includes('font-display:swap'));
assert(theme.includes('"Songti SC","STSong","SimSun",serif'));
assert(fs.statSync(path.join(root,'assets/fonts/growth-song.woff')).size<650000);
const license=read('assets/fonts/LICENSE.txt');
assert(license.includes('2017–2024 Adobe')&&license.includes('SIL OPEN FONT LICENSE Version 1.1')&&license.includes('Growth Song'));
assert(cover.includes('body[data-current-page=cover] #workspaceShell{display:none}'));
assert(cover.includes('body:not([data-current-page=cover]) .site-cover{display:none}'));
assert(cover.includes('.cover-visual{display:none}'),'moon window is removed from visible layout');
assert(html.includes('id="enterWorkspace" href="#modules"'),'cover navigation remains');
assert(theme.includes('.hub-module-card:before,.hub-module-card:after{display:none;content:none}'),'no decorative spines or inner rules');
assert(theme.includes('.hub-card-top{display:none}'),'no decorative numbers or repeated labels');
assert(theme.includes('.hub-module-section{order:0;margin:0}')&&theme.includes('.hub-plan-progress{order:1;'),'primary entrances precede supporting metrics');
assert(theme.includes('.hub-module-card[data-hub-route="execution"]{background:var(--surface);border-color:var(--line)}'),'task entrance has the same light surface');
assert(theme.includes('.unified-row{')&&/\.unified-title\{[^}]*font-size:16px;/.test(theme));
assert(theme.includes('grid-template-columns:64px minmax(0,1fr) auto'),'task list aligns type, title, and state');
assert(theme.includes('.unified-row-body .focus-task{border:0;'),'expanded forms are not nested decorative cards');
assert(theme.includes('.app-header .cloud-pill,.app-header .guide-entry,.app-header .more-navigation>summary,.app-header .more-navigation nav button{min-height:44px'));
assert(theme.includes('max-width:760px')&&theme.includes('max-width:380px'));
const vars=Object.fromEntries([...theme.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(m=>[m[1],m[2].trim()]));
const resolve=v=>/^var\(--[\w-]+\)$/.test(v.trim())?resolve(vars[v.trim().slice(4,-1)]):v.trim();
const lum=v=>{const x=resolve(v);assert(/^#[0-9a-f]{6}$/i.test(x));return x.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)};
const contrast=(a,b)=>{a=lum(a);b=lum(b);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
for(const fg of ['--ink','--text','--muted','--accent','--amber'])for(const bg of ['--paper','--surface','--surface-soft','--selected'])assert(contrast(vars[fg],vars[bg])>=4.5,fg+' on '+bg+' is readable');
assert(contrast(vars['--accent'],vars['--line'])>=3,'progress/focus contrast');
assert(contrast(vars['--surface'],vars['--accent'])>=4.5,'primary action label contrast');
console.log('PASS quiet workspace source: local licensed type, 4.5:1 text contrast, no decoration/shadows/double rules, functional cover, clear module order, unified row contract, 16px text/44px controls, narrow/reduced-motion/forced-colors rules. Browser pixel review remains separate.');
