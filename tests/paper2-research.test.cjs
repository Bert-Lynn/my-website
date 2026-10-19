'use strict';
// Independently maintained recruiting evidence uses semantic protection, not frozen bytes.
const maintainedCatalogs=new Set(['data/internships.json','internship-data.js']);
require('./career-data.test.cjs');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),vm=require('node:vm');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const baseline=require('./fixtures/paper2-preserved-g4-baseline.json');
// The user-approved B display layer has its own exact hashes; other business/data hashes stay at G4.
const f3=require('./fixtures/f3-display-baseline.json');
// Course presentation now has its own exact reviewed hash; maintained recruiting catalogs have separate semantic protection.
const courseDisplay={"career-ui.js": "b656ae10878009e94e1369d3f1c33a63eddd8da084e1c05ad3a9740611991639", "guide.html": "5153f35e2ff75353bbd64f98e8249726c630c19a54f46af5a8f70e8da98cc6a0"};
for(const [file,digest] of Object.entries(baseline.files))if(!maintainedCatalogs.has(file))assert.equal(hash(fs.readFileSync(path.join(root,file))),courseDisplay[file]||f3.files[file]||digest,'protected source: '+file);
const appSource=read('app.js'),prefix=appSource.split('const streamLabels=')[0];assert.equal(hash(prefix),baseline.taskPrefixSha256,'all 47 full definitions/IDs/dates preserved');
const html=read('index.html');assert.equal(hash(html.slice(html.indexOf('<section class="site-cover"'),html.indexOf('<div class="site-shell"'))),f3.coverMarkupSha256,'approved character-free cover markup unchanged');
const d=JSON.parse(read('data/paper2-research.json')),w={};vm.runInNewContext(read('paper2-research.js'),{window:w});assert.deepEqual(JSON.parse(JSON.stringify(w.PAPER2_RESEARCH)),d,'JSON/browser snapshot identical');
assert.equal(d.steps.length,3);assert.equal(d.references.length,6);assert.equal(d.status,'候选题未定');assert.equal(d.steps[0].read.length,1);assert.equal(d.steps[1].read.length,2);assert(d.steps[1].readingMode.includes('二选一'));assert.equal(d.steps[2].optionalRead.length,3);
assert(d.scope.includes('求解算法内部')&&d.scope.includes('鲁棒性'));assert(d.alternativesNote.includes('CV + OR')&&d.alternativesNote.includes('待补充'));assert(d.steps[2].focus[1].includes('不确定集／风险准则'));assert(d.steps[2].focus[1].includes('建模错误')); assert(d.steps[1].deliverable.includes('1页'));
for(const ref of d.references){assert(ref.journal&&ref.year&&ref.checkedAt);assert.equal(new URL(ref.url).protocol,'https:');assert(!/arxiv|neurips|iclr|icml/i.test(ref.url));}
assert.equal(d.references.find(x=>x.id==='automodsat').title,'Discovering heuristics in a complex SAT solver with large language models');
assert.equal(d.references.find(x=>x.id==='ares').title,'A multi-agent framework powered by large language models for automatic heuristic design');
for(const file of ['paper2-research.js','paper2-ui.js'])assert(!/localStorage|sessionStorage|fetch\(|setLesson\(|\.set\(|supabase|setMilestone|setSkill/.test(read(file)),file+' is read-only');
const {app}=require('./helpers/app-harness.cjs');
const click=node=>{assert(node);return node.onclick({preventDefault(){},currentTarget:node})};
const originalTasks=JSON.parse(prefix.match(/const tasks = (\[[\s\S]*?\n\]);/)[1]),bids=originalTasks.filter(x=>x.stream==='paperB').map(x=>x.id);
const memory={'lin-ai-phd-roadmap-progress-v1':JSON.stringify(Object.fromEntries(bids.map(id=>[id,true])))};
(async()=>{
 const h=app({hash:'#execution/research',now:'2026-10-14T08:00:00Z',memory}),c=h.ctx;await c.AppProgress.sync().start();
 const before=JSON.stringify(h.memory),all=c.UnifiedTasks.registry(),plans=all.filter(x=>x.kind==='researchPlan');
 assert.equal(all.length,177);assert.equal(new Set(all.map(x=>x.id)).size,177);assert.equal(plans.length,3);assert(plans.every(x=>x.readOnly&&!x.done&&!x.progressId&&!x.month));
 assert.equal(h.query('#currentTaskList').hidden,false);assert.equal(h.query('#originalTaskPlan').hidden,true);assert.equal(h.all('[data-unified-row]').length,20);
 for(const x of plans){const row=h.query('[data-unified-row="'+x.id+'"]');assert(row);assert(row.textContent.includes('未接入打卡'));assert.equal(row.querySelectorAll('input,form,textarea,select').length,0);}
 assert(!h.all('[data-unified-row]').some(x=>bids.some(id=>x.dataset.unifiedRow==='task:'+id)),'old B not in current research');
 assert(h.query('[data-unified-total]').textContent.includes('0 / 18'),'read-only research never enters learning completion denominator');
 assert.equal(c.ModuleHub.snapshot().total.total,47);assert.equal(c.ModuleHub.snapshot().total.done,6,'old real records stay in original47 tally');
 const goal=h.query('[data-goal="paperB"]');assert(goal.textContent.includes('候选题未定'));assert.equal(goal.querySelector('summary').querySelectorAll('.progress-line,.goal-completion').length,0,'old completion never appears as new research completion');
 c.AppNavigation.open('outcomes');assert(h.query('.paper2-outcome').textContent.includes('候选题未定'));assert.equal(h.query('.paper2-outcome').querySelectorAll('.progress-line').length,0);click(h.query('.paper2-outcome [data-paper2-route]'));assert.equal(c.AppNavigation.route(),'execution/research');
 click(h.query('[data-unified-filter="original"]'));assert.equal(h.all('[data-unified-row]').length,139);for(const id of bids){const row=h.query('[data-unified-row="task:'+id+'"]');assert(row&&row.classList.contains('is-done'));assert(row.textContent.includes('历史方向'));}
 c.AppNavigation.open('execution');assert.equal(h.all('[data-unified-row]').length,5);assert.equal(h.query('#currentTaskList').hidden,false);
 c.history.back();assert.equal(c.AppNavigation.route(),'execution/research');assert.equal(h.all('[data-unified-row]').length,20);c.history.forward();assert.equal(c.AppNavigation.route(),'execution');
 c.AppNavigation.open('resources');click(h.query('.paper2-reading-entry a'));assert.equal(c.AppNavigation.route(),'execution/research');
 const search=h.query('#unifiedSearch');search.value='ARES';search.onchange();assert(h.all('[data-unified-row]').some(x=>x.dataset.unifiedRow==='research-plan:paper2-compare-journals'));
 assert.equal(JSON.stringify(h.memory),before,'navigation and research guidance never write personal state');
 assert.equal(c.Paper2UI.safeURL('javascript:alert(1)'),null);assert.equal(c.Paper2UI.safeURL('https://user:pw@example.com'),null);
 const hostile={...d.steps[0],summary:'<img src=x onerror=alert(1)>'};assert(c.Paper2UI.taskMarkup(hostile).includes('&lt;img'));assert(!c.Paper2UI.taskMarkup(hostile).includes('<img'));
 c.AppNavigation.open('execution');const form=h.query('[data-milestone-form="wa-m0"]');form.querySelector('[name="milestoneEvidence"]').value='https://example.invalid/synthetic-unsaved';form.oninput();h.setConfirmation(false);assert.equal(c.AppNavigation.open('execution/research'),false);assert.equal(h.query('[data-milestone-form="wa-m0"]'),form);assert.equal(c.AppNavigation.route(),'execution');
 h.setConfirmation(true);c.AppNavigation.open('overview');let archive=h.query('[data-goal-archive="paperB"]');archive.open=true;archive.ontoggle();const oldCheck=archive.querySelector('[data-goal-task="jan-b-base"]');oldCheck.onchange();assert(h.query('[data-goal-archive="paperB"]').open,'undoing old B record preserves expanded archive');oldCheck.onchange();assert(h.query('[data-goal-archive="paperB"]').open);
 h.destroy();console.log('PASS paper2:3 readonly tasks,6 journals,correct metadata,old6 archived,47 definitions and G4 assets/auth/data byte-preserved,no status mapping/extra keys,writable flows intact,search/routes/back/forward/cancel,safe URLs/escaped text. DOM/source checks only; browser visual QA not run.');
})().catch(e=>{console.error(e);process.exitCode=1});
