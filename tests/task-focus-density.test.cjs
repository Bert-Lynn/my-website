'use strict';
// DOM and source contracts only. This is not computed layout or pixel validation.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {app}=require('./helpers/app-harness.cjs');
const root=path.join(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),css=fs.readFileSync(path.join(root,'task-focus.css'),'utf8');
for(const [file,version] of Object.entries({'app.js':'20261019-b-20261014-paper2-1','career-ui.js':'20261019-salary-label1','module-hub.js':'20261014-paper2-1','course-navigation.css':'20261012-refined1','task-focus.css':'20261012-refined1','course-clarity.css':'20261015-courseclarity1'}))assert(html.includes('./'+file+'?v='+version),'changed asset cache is invalidated: '+file);
for(const file of ['guide.html'])assert(html.includes('./'+file+'?v=20261012-unified1'),'updated guide bypasses its previous cache: '+file);
assert(html.indexOf('ink-theme.css')>html.indexOf('task-focus.css'),'unified book-page theme follows the unchanged density layer');
assert(css.includes('#currentTaskList .focus-task{max-width:none;width:100%;font-weight:400;box-sizing:border-box}'),'current cards override inherited narrow/heavy styling without affecting other cards');
for(const selector of ['main','.module-return','.workspace-heading','.workspace-heading h1','.today-label','.task-section-tabs','.task-section-tabs button'])assert(css.includes('body[data-current-page="execution"][data-task-view="current"] '+selector),'header density rule is scoped to the current task route: '+selector);
(async()=>{
 const h=app({hash:'#execution',now:'2026-11-10T00:00:00.000Z'}),ctx=h.ctx;await ctx.AppProgress.sync().start();
 const before=JSON.stringify({tasks:ctx.AppProgress.sync().snapshot(),career:ctx.phdCareerProgress.read(),lessons:ctx.AppProgress.sync().lessonSnapshot()});
 assert.equal(h.document.body.getAttribute('data-task-view'),'current');assert.equal(h.query('#pageEyebrow').hidden,true);assert.equal(h.query('#pageSubtitle').hidden,true);
 assert(h.query('[data-unified-total]').textContent.includes('0 / 18'));assert(!h.query('[data-unified-total]').textContent.includes('当前项目任务'),'duplicate task heading is removed');
 const brief=h.all('#currentTaskList .task-reading a'),full=h.all('#currentTaskList .task-reading-detail a');assert(brief.length>0);assert.equal(brief.length,full.length);
 for(const [i,a] of brief.entries()){assert(!a.textContent.includes('↗'));assert.equal(a.getAttribute('href'),full[i].getAttribute('href'),'exact official source retained');assert.equal(a.getAttribute('target'),'_blank');assert(/noopener/.test(a.getAttribute('rel')));assert(/noreferrer/.test(a.getAttribute('rel')));assert(full[i].textContent.includes('↗'),'other external links retain their marker')}
 for(const route of ['execution/research','execution/month','execution/year','projects','learn/code','modules']){
  ctx.AppNavigation.open(route);assert.equal(h.query('#pageEyebrow').hidden,false,route+': eyebrow restored');assert.equal(h.query('#pageSubtitle').hidden,false,route+': subtitle restored');
  if(route==='execution/research')assert.equal(h.all('#taskGroups [data-id]').length,23);
  if(route==='execution/year')assert.equal(h.all('#taskGroups [data-id]').length,47);
 }
 ctx.AppNavigation.open('execution/current');assert.equal(h.document.body.getAttribute('data-task-view'),'current');assert.equal(h.query('#pageSubtitle').hidden,true);assert.equal(h.all('#currentTaskList [data-milestone-form]').length,4);
 assert.equal(JSON.stringify({tasks:ctx.AppProgress.sync().snapshot(),career:ctx.phdCareerProgress.read(),lessons:ctx.AppProgress.sync().lessonSnapshot()}),before,'density and navigation never change progress');
 h.destroy();console.log('PASS density delta: current-only compact header, scoped card CSS, accurate WA4 count, exact safe brief links without arrows, unchanged detailed external links, restored old/non-task headers, research23/all47 and no progress writes. No pixel/layout claim.');
})().catch(e=>{console.error(e);process.exitCode=1});
