'use strict';
const assert = require('node:assert/strict');
const { app } = require('./helpers/app-harness.cjs');
const { backend } = require('./helpers/synthetic-progress-backend.cjs');
const plain = value => JSON.parse(JSON.stringify(value));
const click = node => { assert(node, 'bound click target exists'); assert.equal(typeof node.onclick, 'function'); return node.onclick({ preventDefault() {}, currentTarget: node }); };
const delay = () => new Promise(resolve => setTimeout(resolve, 25));
const now = '2026-11-10T00:00:00.000Z', old = '2026-10-01T08:00:00.000Z';
const keys = { tasks:'lin-ai-phd-roadmap-progress-v1', lessons:'lin-ai-phd-roadmap-lessons-v1', career:'lin-ai-phd-roadmap-career-v1', dates:'lin-ai-phd-roadmap-completion-dates-v1' };
const careerRecord = { selectedRole:'agent_engineering', ...Object.fromEntries(Array.from({length:7}, (_,i) => ['milestone:demand-decision-lab:ddl-m'+i, {status:'done', evidenceUrl:'https://example.com/synthetic-legacy-'+i, completedAt:old}])) };
const memory = {
  [keys.tasks]:JSON.stringify({'sep-python':true, 'sep-a-data':true, 'sep-apply':true, 'sep-git':false, imaginary:true}),
  [keys.lessons]:JSON.stringify({'python-basics':'done', 'u-api':'done', 'u-sql-select':'done', 'u-or-mip':'skipped'}),
  [keys.career]:JSON.stringify(careerRecord),
  [keys.dates]:JSON.stringify({'task:sep-python':old, 'lesson:u-api':old}), unrelated:'preserve'
};
const records = h => plain({tasks:h.ctx.AppProgress.sync().snapshot(),lessons:h.ctx.AppProgress.sync().lessonSnapshot(),career:h.ctx.phdCareerProgress.read(),taskDates:h.ctx.AppProgress.sync().taskCompletedAtSnapshot(),lessonDates:h.ctx.AppProgress.sync().lessonCompletedAtSnapshot()});
function verify(h, expected) {
  const snapshot = plain(h.ctx.ModuleHub.snapshot());
  for (const [name, values] of Object.entries(expected)) {
    if (name === 'source') { assert.equal(snapshot.source, values); continue; }
    assert.equal(snapshot[name].done, values[0], name+' uses only its own completed records');
    assert.equal(snapshot[name].total, values[1], name+' denominator comes from its actual catalog');
    assert.equal(snapshot[name].pct, Math.round(values[0]/values[1]*100));
    if (name === 'total') {
      assert.equal(h.query('#hubOverallCount').textContent, values[0]+' / '+values[1]+' 项已完成');
      assert.equal(h.query('#hubOverallPercent').textContent, snapshot[name].pct+'%');
    } else {
      const metric = h.query('[data-hub-metric="'+name+'"]'); assert(metric);
      const bar = metric.querySelector('[role="progressbar"]');
      assert.equal(bar.getAttribute('aria-valuenow'), String(values[0]), name+' rendered header stays current');
      assert.equal(bar.getAttribute('aria-valuemax'), String(values[1]));
      assert(metric.textContent.includes(values[0]+' / '+values[1]), name+' visible count matches accessible count');
    }
  }
  assert.equal(snapshot.buckets.reduce((sum,bucket)=>sum+bucket.total,0),47);
  assert.equal(snapshot.buckets.reduce((sum,bucket)=>sum+bucket.done,0),snapshot.total.done);
  for (const bucket of snapshot.buckets) {
    const bar = h.query('[data-hub-bucket="'+bucket.id+'"] [role="progressbar"]');
    assert.equal(bar.getAttribute('aria-valuenow'),String(bucket.done));
    assert.equal(bar.getAttribute('aria-valuemax'),String(bucket.total));
  }
  return snapshot;
}

(async()=>{
  let h=app({memory,now,hash:'#modules'}), ctx=h.ctx;
  await ctx.AppProgress.sync().start();
  assert.equal(ctx.AppNavigation.current(),'modules');
  assert.equal(h.query('#modules').hidden,false);
  assert.equal(h.query('#workspace').hidden,true);
  assert.equal(h.query('#cover').hidden,true);
  const initial=verify(h,{total:[3,47],lessons:[2,20],project:[0,4],skills:[0,7],source:'此浏览器的本机记录'});
  assert.deepEqual(initial.buckets.map(b=>[b.id,b.done,b.total]),[['research',1,23],['learning',1,12],['demo',1,12]]);
  assert(h.query('.hub-progress-note').textContent.includes('自查通过不代表已投递或已录用'));
  assert(h.query('.hub-data-note').textContent.includes('不会自动发布或向外投递'));
  const hub=h.query('#moduleHub');
  assert(hub.children.indexOf(h.query('.hub-plan-progress'))<hub.children.indexOf(h.query('.hub-module-section')),'actual progress is above module choices');
  assert.equal(hub.querySelectorAll('form,input,textarea,select').length,0,'the chooser does not create pretend completion controls');
  assert.equal(h.all('[data-hub-route]').length,5);
  assert.deepEqual(h.all('[data-hub-route]').map(node=>node.dataset.hubRoute),['execution/month','resources','projects','execution/research','roles']);
  const original=records(h), saved=plain(memory);
  for (const [route,page] of [['execution/month','execution'],['resources','resources'],['projects','projects'],['execution/research','execution'],['roles','roles']]) {
    click(h.query('[data-hub-route="'+route+'"]'));
    assert.equal(ctx.AppNavigation.route(),route);
    assert.equal(ctx.AppNavigation.current(),page);
    assert.equal(h.query('#modules').hidden,true);
    assert.equal(h.query('#cover').hidden,true,'selecting a module never loops back through the cover');
    if(route==='execution/research') {
      assert.equal(h.query('#pageTitle').textContent,'科研与论文');
      assert.equal(h.all('#taskGroups [data-id]').length,23);
      assert(h.all('#taskGroups [data-id]').every(node=>h.evaluate('tasks.find(t=>t.id==='+JSON.stringify(node.dataset.id)+').category')==='research'));
      assert.equal(h.query('#researchTaskLinks').hidden,false);
    }
    click(h.query('#returnToModules')); assert.equal(ctx.AppNavigation.current(),'modules');
  }
  click(h.query('[data-hub-route="execution/month"]'));
  assert.equal(h.evaluate('view'),'month','the task card resets a previous research-only filter');
  click(h.query('#homeBtn')); assert.equal(ctx.AppNavigation.current(),'modules');
  const historyLength=ctx.history.entries.length; click(h.query('#homeBtn'));
  assert.equal(ctx.history.entries.length,historyLength,'repeated return does not duplicate history');
  assert.deepEqual(records(h),original,'all five entries are navigation-only');
  assert.deepEqual(plain(memory),saved,'hub navigation introduces no progress writes');

  // New hub return links share the existing unsaved-form guard and history restoration.
  ctx.AppNavigation.open('learn/code');
  const draft=h.query('.module-project-output [data-milestone-form="wa-m0"]');assert(draft);
  draft.querySelector('[name="milestoneEvidence"]').value='https://example.com/synthetic-unsaved-hub-draft';draft.oninput();
  h.setConfirmation(false);
  for(const selector of ['#returnToModules','#homeBtn']) {
    click(h.query(selector));
    assert.equal(ctx.location.hash,'#learn/code');
    assert.equal(h.query('.module-project-output [data-milestone-form="wa-m0"]'),draft,'cancel keeps exact unsaved form');
  }
  ctx.location.hash='#modules';ctx.dispatchEvent({type:'hashchange'});
  assert.equal(ctx.location.hash,'#learn/code');
  ctx.history.back();assert.equal(ctx.location.hash,'#learn/code');
  const asks=h.confirmations.length;ctx.dispatchEvent({type:'hashchange'});assert.equal(h.confirmations.length,asks,'restored history hash does not prompt twice');
  h.setConfirmation(true);click(h.query('#returnToModules'));
  assert.equal(ctx.AppNavigation.current(),'modules');
  assert.deepEqual(records(h),original,'discard to hub never saves unfinished evidence');
  assert.deepEqual(plain(memory),saved);
  click(h.query('[data-hub-route="execution/research"]'));
  click(h.query('#showAllBtn'));
  assert.equal(ctx.location.hash,'#execution/year','show all must not retain a research-only hash');
  assert.equal(h.evaluate('view'),'year');
  assert.equal(h.all('#taskGroups [data-id]').length,47);
  click(h.query('#backlogJump'));
  assert.equal(ctx.location.hash,'#execution/month','backlog jump must not retain the all-year hash');
  assert.equal(h.evaluate('view'),'month');
  ctx.history.back();assert.equal(ctx.location.hash,'#execution/year');assert.equal(h.evaluate('view'),'year');
  ctx.history.back();assert.equal(ctx.location.hash,'#execution/research');assert.equal(h.evaluate('view'),'research');
  ctx.history.forward();assert.equal(h.evaluate('view'),'year');
  click(h.query('#homeBtn'));

  // Real handlers and callbacks, synthetic data only: each independent stream updates the visible hub.
  ctx.AppProgress.sync().setLesson('u-agent-evals','done');
  verify(h,{total:[3,47],lessons:[3,20],project:[0,4],skills:[0,7]});
  const lessonDate=ctx.AppProgress.sync().lessonCompletedAtSnapshot()['u-agent-evals']; assert(lessonDate);
  ctx.AppProgress.sync().setLesson('u-agent-evals',null);
  verify(h,{total:[3,47],lessons:[2,20],project:[0,4],skills:[0,7]});
  assert.equal(ctx.AppProgress.sync().lessonCompletedAtSnapshot()['u-agent-evals'],undefined);
  ctx.AppProgress.sync().set('sep-git',true);
  verify(h,{total:[4,47],lessons:[2,20],project:[0,4]});
  ctx.AppProgress.sync().set('sep-git',false);
  verify(h,{total:[3,47],lessons:[2,20],project:[0,4]});
  assert.equal(ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'doing',evidenceUrl:'https://example.com/synthetic-new-demo'}),true);
  verify(h,{project:[0,4]});
  ctx.phdCareerProgress.setMilestone('work-assistant','wa-m0',{status:'done'});
  verify(h,{total:[3,47],lessons:[2,20],project:[1,4]});
  const projectDate=ctx.phdCareerProgress.read().milestones['work-assistant']['wa-m0'].completedAt;
  ctx.phdCareerProgress.setSkill('ai-code',{level:'passed',rubric:Object.fromEntries([1,2,3,4].map(n=>['ai-code-c'+n,4])),evidenceNote:'Synthetic test proof only.'});
  verify(h,{total:[3,47],lessons:[2,20],project:[1,4],skills:[1,7]});
  const beforeRole=records(h);
  ctx.phdCareerProgress.setRole('decision_optimization');
  verify(h,{total:[3,47],lessons:[2,26],project:[1,4],skills:[1,11]});
  assert.deepEqual(records(h).lessons,beforeRole.lessons,'changing the denominator does not clear any lessons');
  assert.deepEqual(records(h).career.milestones,beforeRole.career.milestones,'WA remains separate from the seven old DDL stages under the other role');
  ctx.phdCareerProgress.setRole('agent_engineering');
  verify(h,{lessons:[2,20],project:[1,4],skills:[1,7]});
  // Other-tab storage events use the same source; they must redraw even when no task checkbox changed.
  const guestLessons=JSON.parse(memory[keys.lessons+':guest']);guestLessons['u-agent-evals']='done';
  memory[keys.lessons+':guest']=JSON.stringify(guestLessons);
  ctx.dispatchEvent({type:'storage',key:keys.lessons+':guest',newValue:memory[keys.lessons+':guest']});
  verify(h,{total:[3,47],lessons:[3,20],project:[1,4]});
  const finalRecords=records(h);h.destroy();
  h=app({memory,now,hash:'#modules'});ctx=h.ctx;await ctx.AppProgress.sync().start();
  verify(h,{total:[3,47],lessons:[3,20],project:[1,4],skills:[1,7]});
  assert.deepEqual(records(h),finalRecords,'all independent values and actual dates survive reload');
  assert.equal(ctx.phdCareerProgress.read().milestones['work-assistant']['wa-m0'].completedAt,projectDate);
  assert.equal(ctx.AppProgress.sync().taskCompletedAtSnapshot()['sep-a-data'],undefined,'opening the hub never invents historical completion dates');
  h.destroy();

  // Exercise the real sync adapter against in-memory fake accounts. This never signs in to a real service.
  const b=backend();
  const row=(lessons,career)=>({progress:{},version:1,lessons,lessons_version:1,career_state:career,career_state_version:1,completion_dates:{},completion_dates_version:1});
  b.rows.set('account-a@example.invalid',row({'u-api':'done'},{selectedRole:'agent_engineering','milestone:work-assistant:wa-m0':{status:'done',evidenceUrl:'https://example.com/synthetic-account-a',completedAt:old}}));
  b.rows.set('account-b@example.invalid',row({'u-sql-select':'done','u-or-mip':'done'},{selectedRole:'decision_optimization'}));
  h=app({memory,now,hash:'#modules',cloudClient:b.client});ctx=h.ctx;
  const sync=ctx.AppProgress.sync();await sync.start();
  const login=async email=>{await sync.signIn(email,'synthetic-placeholder');await delay();await sync.syncNow();};
  await login('account-a@example.invalid');
  verify(h,{total:[0,47],lessons:[1,20],project:[1,4],skills:[0,7],source:'当前账号的私有记录'});
  assert.equal(b.writes.length,0,'viewing the hub never uploads guest records automatically');
  await login('account-b@example.invalid');
  verify(h,{total:[0,47],lessons:[2,26],project:[0,4],skills:[0,11],source:'当前账号的私有记录'});
  assert(!h.query('#moduleHub').textContent.includes('account-a'),'account A identity/evidence never appears in account B hub');
  assert.equal(b.writes.length,0);
  await sync.signOut();await delay();
  verify(h,{total:[3,47],lessons:[3,20],project:[1,4],skills:[1,7],source:'此浏览器的本机记录'});
  assert.deepEqual(records(h),finalRecords,'logout restores the isolated original guest records, including dates');
  await login('account-b@example.invalid');
  assert.equal(sync.importGuest(),true,'explicit synthetic import remains available');
  await sync.syncNow();await delay();await sync.syncNow();
  verify(h,{total:[3,47],lessons:[3,26],project:[1,4],skills:[1,11]});
  assert.equal(ctx.phdCareerProgress.read().selectedRole,'decision_optimization','import preserves an existing account choice');
  h.destroy();
  console.log('PASS independent hub integration: five real bound destinations, original47 vs independent20/26 lessons and4 WA outcomes, oldDDL separation, truthful self-assessment, no navigation writes, real stream/storage callbacks, done/undo/date/reload, role retention, and synthetic account A/B/logout/explicit import without private-record leakage.');
})().catch(error=>{console.error(error);process.exit(1);});
