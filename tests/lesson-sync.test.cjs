const assert = require('node:assert/strict');
const {create}=require('../cloud-sync.js');
const KEY='lin-ai-phd-roadmap-lessons-v1', OLD='lin-ai-phd-roadmap-progress-v1';
const memory=initial=>{const m=new Map(Object.entries(initial||{}));return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)}};
const delay=()=>new Promise(r=>setTimeout(r,15));
function backend(){
 const rows=new Map(), listeners=[];let session=null,failLessons=false;
 const client={auth:{onAuthStateChange(fn){listeners.push(fn)},async getSession(){return {data:{session}}},async signInWithPassword({email}){session={user:{id:email,email}};listeners.forEach(f=>f('SIGNED_IN',session));return {data:{session}}},async signOut(){session=null;listeners.forEach(f=>f('SIGNED_OUT',null));return {error:null}},async signUp(){return {data:{session:null}}}},
 from(){return {select(fields){this.fields=fields;return this},eq(_,id){this.id=id;return this},async maybeSingle(){if(failLessons&&this.fields.includes('lessons'))return {error:Error('offline')};return {data:rows.get(this.id)||null}}}},
 async rpc(name,args){const lesson=name==='phd_save_lessons',dates=name==='phd_save_completion_dates',field=dates?'completion_dates':lesson?'lessons':'progress',version=dates?'completion_dates_version':lesson?'lessons_version':'version';if(lesson&&failLessons)return {error:Error('offline')};const id=session.user.id;const row=rows.get(id)||{progress:{},version:0,lessons:{},lessons_version:0,completion_dates:{},completion_dates_version:0};if(row[version]!==args.expected_version)return {data:[{applied:false,...row}]};const next={...row,[field]:args[dates?'next_completion_dates':lesson?'next_lessons':'next_progress'],[version]:row[version]+1};rows.set(id,next);return {data:[{applied:true,...next}]}}};
 return {client,rows,fail:v=>failLessons=v};
}
(async()=>{
 const storage=memory({[OLD]:JSON.stringify({a:true})}),b=backend();const opts={ids:['a'],lessonIds:['l1','l2'],storage,client:b.client};
 let s=create(opts);await s.start();assert.deepEqual(s.snapshot(),{a:true});assert.deepEqual(s.lessonSnapshot(),{},'old milestones never mark lessons');assert.deepEqual(s.taskCompletedAtSnapshot(),{},'old true timestamp unknown');s.set('a',true);assert.deepEqual(s.taskCompletedAtSnapshot(),{},'repeated true does not invent date');
 assert.equal(s.setLesson('malicious','done'),false);assert.equal(s.setLesson('l1',true),false);s.setLesson('l1','done');s.setLesson('l2','skipped');
 assert.deepEqual(s.lessonSnapshot(),{l1:'done',l2:'skipped'});
 await s.signIn('A','fake');await delay();await s.syncNow();assert.deepEqual(s.lessonSnapshot(),{});assert.equal(b.rows.size,0,'no implicit guest upload');
 assert.equal(s.status().canImport,true);s.importGuest();await delay();await s.syncNow();assert.equal(b.rows.get('A').lessons.l1,'done');assert.equal(b.rows.get('A').progress.a,true);assert.ok(b.rows.get('A').completion_dates['lesson:l1']);assert.equal(s.taskCompletedAtSnapshot().a,undefined);
 s.setLesson('l1',null);await s.syncNow();assert.equal(b.rows.get('A').lessons.l1,false,'false tombstone');assert.equal(b.rows.get('A').completion_dates['lesson:l1'],false);assert.equal(s.lessonCompletedAtSnapshot().l1,undefined);
 b.fail(true);s.setLesson('l2','done');await s.syncNow();assert.equal(s.status().mode,'error','task-ready cannot hide lesson failure');assert.equal(JSON.parse(storage.getItem(KEY+':account:A')).dirty,true);s.destroy();
 s=create(opts);await s.start();await delay();assert.equal(s.lessonSnapshot().l2,'done','reload retains offline edit');b.fail(false);await s.syncNow();assert.equal(b.rows.get('A').lessons.l2,'done');assert.ok(s.lessonCompletedAtSnapshot().l2);
 // Old client task updates cannot erase independent lesson fields.
 b.rows.get('A').progress={a:false};b.rows.get('A').version+=1;await s.syncNow();assert.equal(s.lessonSnapshot().l2,'done');
 s.setLesson('l1','done');b.rows.get('A').lessons={l1:false,l2:'skipped'};b.rows.get('A').lessons_version+=1;await s.syncNow();assert.equal(s.status().mode,'conflict');assert.equal(b.rows.get('A').lessons.l1,false);s.resolveConflict('cloud');assert.equal(s.lessonSnapshot().l1,false);
 await s.signOut();assert.deepEqual(s.lessonSnapshot(),{l1:'done',l2:'skipped'},'guest separate');await s.signIn('B','fake');await delay();await s.syncNow();assert.deepEqual(s.lessonSnapshot(),{},'account switch isolated');assert.deepEqual(s.lessonCompletedAtSnapshot(),{},'completion dates account isolated');s.setLesson('l2',null);await s.syncNow();s.importGuest();await s.syncNow();assert.equal(b.rows.get('B').lessons.l2,false,'import never overrides explicit cloud false');s.destroy();
 const local=create({ids:['a'],lessonIds:['l1'],storage:memory(),config:{enabled:false}});await local.start();local.setLesson('l1','done');assert.deepEqual(local.lessonSnapshot(),{l1:'done'});local.destroy();
 console.log('PASS: lesson whitelist/statuses, no legacy completion mapping, consent import, false tombstone, offline reload, independent CAS, conflict, aggregated error, account/logout isolation, unconfigured local-first.');
})().catch(e=>{console.error(e);process.exit(1)});
