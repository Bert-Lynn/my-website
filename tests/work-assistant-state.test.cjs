'use strict';
// Synthetic data and an in-memory backend only. No live account or service is used.
const assert = require('node:assert/strict');
const state = require('../career-state.js');
const { create } = require('../cloud-sync.js');
const { backend } = require('./helpers/synthetic-progress-backend.cjs');
const copy = value => JSON.parse(JSON.stringify(value));
const pause = () => new Promise(resolve => setTimeout(resolve, 30));
const key = 'lin-ai-phd-roadmap-career-v1';
const memory = initial => { const values = new Map(Object.entries(initial || {})); return { values, getItem:k=>values.get(k)||null, setItem:(k,v)=>values.set(k,v) }; };
const record = (path, at='2026-10-01T08:00:00.000Z') => ({status:'done',evidenceUrl:'https://example.com/synthetic-'+path,completedAt:at});
const oldFlat = Object.fromEntries([
  ...Array.from({length:7},(_,i)=>['milestone:demand-decision-lab:ddl-m'+i,record('ddl-'+i)]),
  ...Array.from({length:6},(_,i)=>['milestone:ai-choice-assistant:aca-m'+i,record('aca-'+i)])
]);
(async()=>{
  assert.equal(state.mainProject,'work-assistant');
  assert.deepEqual(Object.keys(state.projects).sort(),['ai-choice-assistant','demand-decision-lab','work-assistant'],'future learning layers do not acquire editable project identities');
  assert.equal(state.ids.length,31,'only role,13skills,DDL7,ACA6 andWA4 are persistable');
  assert.deepEqual(state.projects['work-assistant'],['wa-m0','wa-m1','wa-m2','wa-m3']);
  assert.deepEqual(state.projects['ai-choice-assistant'],Array.from({length:6},(_,i)=>'aca-m'+i));
  assert.deepEqual(state.projects['demand-decision-lab'],Array.from({length:7},(_,i)=>'ddl-m'+i));
  assert.equal(new Set(state.ids).size,state.ids.length);
  assert.deepEqual(state.clean(oldFlat),oldFlat,'old records remain byte-equivalent as data');
  let now='2026-10-11T08:00:00.000Z';
  const storage=memory({[key]:JSON.stringify(oldFlat)}),b=backend();
  let api=state.create({now:()=>now});
  let sync=create({ids:['task'],lessonIds:['lesson'],careerApi:api,storage,client:b.client});
  await sync.start();
  assert.equal(api.read().milestones['work-assistant'],undefined,'all thirteen old completed stages do not create any new stage');
  for(const project of Object.keys(state.projects)) for(const id of state.projects[project]) {
    for(const other of Object.keys(state.projects).filter(p=>p!==project)) assert.equal(api.setMilestone(other,id,{status:'doing'}),false,'cannot relabel '+project+':'+id+' as '+other);
  }
  for(const bad of ['wa-m4','wa-m00','wa-m-1','aca-m0']) assert.equal(api.setMilestone('work-assistant',bad,{status:'doing'}),false);
  for(const url of ['javascript:alert(1)','file:///tmp/result','https://user:password@example.com']) assert.equal(api.setMilestone('work-assistant','wa-m0',{status:'done',evidenceUrl:url}),false);
  assert.equal(api.setMilestone('work-assistant','wa-m0',{status:'doing'}),true);
  assert.equal(api.read().milestones['work-assistant']['wa-m0'].completedAt,'','in-progress work never has a completion date');
  api.setMilestone('work-assistant','wa-m0',{status:'done',evidenceUrl:'https://example.com/synthetic-feedback-run'});
  const firstDate=api.read().milestones['work-assistant']['wa-m0'].completedAt;
  assert.equal(firstDate,now);
  now='2026-10-12T08:00:00.000Z';api.setMilestone('work-assistant','wa-m0',{status:'done'});
  assert.equal(api.read().milestones['work-assistant']['wa-m0'].completedAt,firstDate);
  assert.deepEqual(sync.snapshot(),{});assert.deepEqual(sync.lessonSnapshot(),{});assert.deepEqual(api.read().skills,{});
  api.setMilestone('work-assistant','wa-m0',{status:'todo'});
  assert.equal(api.read().milestones['work-assistant']['wa-m0'].completedAt,'');
  for(const [flatKey,value] of Object.entries(oldFlat)) { const [,project,id]=flatKey.split(':');assert.deepEqual(api.read().milestones[project][id],value); }
  api.setMilestone('work-assistant','wa-m0',{status:'done'});
  assert.equal(api.read().milestones['work-assistant']['wa-m0'].completedAt,now,'redo receives its actual date');
  const guest=copy(api.read());
  await sync.signIn('work-qa-A','synthetic-password');await pause();await sync.syncNow();
  assert.deepEqual(api.read().milestones,{});assert.equal(b.rows.size,0,'login never automatically imports any of the three projects');
  sync.importGuest();await sync.syncNow();
  assert.deepEqual(api.read(),guest);
  const stored=copy(b.rows.get('work-qa-A').career_state);
  const priorClient=Object.fromEntries(Object.entries(stored).filter(([k])=>!k.startsWith('milestone:work-assistant:')));
  const result=await b.client.rpc('phd_save_career_state',{expected_version:b.rows.get('work-qa-A').career_state_version,next_career_state:priorClient});
  assert.equal(result.data[0].applied,true);
  assert.deepEqual(b.rows.get('work-qa-A').career_state['milestone:work-assistant:wa-m0'],stored['milestone:work-assistant:wa-m0'],'old payload omission preserves new progress');
  await sync.syncNow();
  b.failures.add('career_state');api.setMilestone('work-assistant','wa-m1',{status:'doing',evidenceUrl:'https://example.com/synthetic-offline'});await sync.syncNow();
  assert.equal(sync.status().mode,'error');
  sync.destroy();api=state.create({now:()=>now});sync=create({ids:['task'],lessonIds:['lesson'],careerApi:api,storage,client:b.client});await sync.start();await pause();
  assert.equal(api.read().milestones['work-assistant']['wa-m1'].status,'doing','offline work state survives reload');
  b.failures.clear();await sync.syncNow();
  api.setMilestone('work-assistant','wa-m2',{status:'doing'});
  const row=b.rows.get('work-qa-A');row.career_state['milestone:work-assistant:wa-m2']=record('other-tab',now);row.career_state_version++;
  const version=row.career_state_version;await sync.syncNow();
  assert.equal(sync.status().mode,'conflict');assert.equal(row.career_state_version,version,'stale local changes cannot overwrite remote state');
  sync.resolveConflict('cloud');assert.equal(api.read().milestones['work-assistant']['wa-m2'].status,'done');
  await sync.signOut();assert.deepEqual(api.read(),guest);
  await sync.signIn('work-qa-B','synthetic-password');await pause();await sync.syncNow();
  assert.deepEqual(api.read().milestones,{});assert.deepEqual(api.read().skills,{});
  await sync.signOut();await sync.signIn('work-qa-A','synthetic-password');await pause();await sync.syncNow();
  const hold=b.hold('career_state');api.setMilestone('work-assistant','wa-m3',{status:'doing'});const request=sync.syncNow();await hold.entered;
  await sync.signOut();await sync.signIn('work-qa-B','synthetic-password');await pause();const bState=copy(api.read());hold.release();await request;await sync.syncNow();
  assert.deepEqual(api.read(),bState,'late response cannot carry work progress across accounts');
  assert.equal(b.rows.get('work-qa-B')?.career_state?.['milestone:work-assistant:wa-m3'],undefined,'in-flight write remains bound to original account');
  sync.destroy();
  console.log('PASS work-assistant synthetic state: three namespaces, old completion preservation, strict IDs/evidence, explicit done/undo/date/redo, independent counts, opt-in import, logout/account separation, offline reload, old-client merge, CAS conflict and late-response isolation.');
})().catch(error=>{console.error(error);process.exitCode=1});
