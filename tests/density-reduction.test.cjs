'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs');
const {app}=require('./helpers/app-harness.cjs');
(async()=>{
 const h=app({hash:'#execution',now:'2026-10-19T05:00:00Z'}),c=h.ctx;await c.AppProgress.sync().start();
 for(const e of h.document.walk())e.addEventListener=(type,fn)=>{e['on'+type]=fn};
 h.evaluate(fs.readFileSync('castle-theme.js','utf8'));
 const before=JSON.stringify(h.memory),first=c.VIDEO_LEARNING.resources[0],all=c.UnifiedTasks.registry();
 assert.equal(all.length,177);assert.equal(new Set(all.map(x=>x.id)).size,177);
 const hero=h.query('#castleNext');assert.equal(hero.querySelectorAll('a,button').length,1);
 assert.equal(hero.querySelector('a').getAttribute('href'),first.url);assert(hero.textContent.includes(first.durationLabel));
 assert.equal(hero.querySelector('.future-practice'),null);assert.equal(h.query('.future-task-aside'),null);
 assert.equal(h.all('[data-unified-row]').length,5);
 for(const row of h.all('[data-unified-row]')){
  assert.equal(row.open,false);assert.equal(row.querySelector('summary .unified-brief'),null);
  const brief=row.querySelector('.unified-row-body .unified-brief');assert(brief);assert(brief.textContent.includes('现在做'));assert(brief.textContent.includes('验收'));
 }
 const tools=h.query('.unified-tools');assert.equal(tools.open,false);tools.open=true;tools.ontoggle();
 h.query('[data-unified-filter="all"]').onclick();assert(h.query('.unified-tools').open);assert.equal(h.all('[data-unified-row]').length,177);
 const search=h.query('#unifiedSearch');search.value='AutoModSAT';search.onchange();assert(h.query('.unified-tools').open);assert(h.all('[data-unified-row]').length>0);assert(h.all('[data-unified-row]').length<177);
 c.AppNavigation.open('execution/research');assert(h.all('[data-unified-row]').some(x=>x.textContent.includes('AutoModSAT')));
 c.AppNavigation.open('resources');assert.equal(h.query('.course-practice-detail').open,false);assert(h.query('.course-practice-detail').textContent.includes(first.practice));assert(h.query('.course-next a').getAttribute('href')===first.url);
 assert.equal(h.all('[data-course-overview]').length,7);
 c.AppNavigation.open('projects');assert.equal(h.query('.project-preview-detail').open,false);assert.equal(h.query('.project-brief-detail').open,false);assert(h.query('.project-next-delivery [data-open-task]'));
 assert.equal(JSON.stringify(h.memory),before,'all disclosure and navigation actions are read-only');
 const html=fs.readFileSync('index.html','utf8');assert(html.includes('task-actions.css?v=20261019-density1'));
 h.destroy();console.log('PASS density reduction: one next CTA; five short rows; full expandable instructions; secondary tools persist; 177 records searchable; research/course/project access; independent state unchanged.');
})().catch(e=>{console.error(e);process.exitCode=1});
