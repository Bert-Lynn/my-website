const assert = require('node:assert/strict');
const { create } = require('../cloud-sync.js');
const KEY='lin-ai-phd-roadmap-progress-v1';
const memory=initial=>{const map=new Map(Object.entries(initial||{})); return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v),map};};
const delay=()=>new Promise(r=>setTimeout(r,10));
function backend() {
  const rows=new Map(); let session=null, listener=()=>{}, fail=false, hold=null;
  const client={
    auth:{onAuthStateChange(fn){listener=fn;return {data:{subscription:{unsubscribe(){}}}}},async getSession(){return {data:{session}}},
      async signInWithPassword({email}) {session={user:{id:email,email}};listener('SIGNED_IN',session);return {data:{session}}},
      async signUp({email}) {return {data:{user:{id:email,email},session:null}}},
      async signOut(){session=null;listener('SIGNED_OUT',null);return {error:null}}},
    from(){return {select(){return this},eq(_,id){this.id=id;return this},async maybeSingle(){if(fail)return {error:new Error('offline')}; return {data:rows.get(this.id)||null}}}},
    async rpc(_,args) {if(fail)return {error:new Error('offline')}; const id=session.user.id, row=rows.get(id);if(hold)await hold;
      if((row?.version||0)!==args.expected_version)return {data:[{applied:false,progress:row?.progress||{},version:row?.version||0}]};
      const next={progress:{...args.next_progress},version:(row?.version||0)+1};rows.set(id,next);return {data:[{applied:true,...next}]};}
  };
  return {client,rows,setFail(v){fail=v},setHold(v){hold=v}};
}
(async()=>{
  const b=backend(),storage=memory({[KEY]:JSON.stringify({a:true,b:false,unknown:true})});
  const s=create({ids:['a','b','c'],storage,client:b.client});
  assert.deepEqual(s.snapshot(),{a:true,b:false},'legacy booleans preserved and unknown keys filtered');
  await s.start();
  const registration=await s.signUp('new@example.test','not-real');
  assert.deepEqual(registration,{needsEmailConfirmation:true,signedIn:false});
  assert.equal(b.rows.size,0,'signup must not import or create progress');
  assert.deepEqual(s.snapshot(),{a:true,b:false},'signup confirmation leaves guest untouched');
  s.set('c',true);assert.equal(JSON.parse(storage.getItem(KEY)).c,true);
  await s.signIn('one@example.test','not-real');await delay();await s.syncNow();
  assert.deepEqual(s.snapshot(),{},'guest progress never auto uploads');assert.equal(b.rows.size,0);
  assert.equal(s.status().canImport,true);s.importGuest();await delay();await s.syncNow();
  assert.deepEqual(b.rows.get('one@example.test').progress,{a:true,b:false,c:true});
  s.set('a',false);await s.syncNow();assert.equal(b.rows.get('one@example.test').progress.a,false,'uncheck sync');
  b.setFail(true);s.set('b',true);await s.syncNow();assert.equal(s.status().mode,'error');
  assert.equal(JSON.parse(storage.getItem(KEY+':account:one@example.test')).dirty,true,'outbox survives failure');
  b.setFail(false);await s.syncNow();assert.equal(b.rows.get('one@example.test').progress.b,true,'retry sync');
  b.rows.set('one@example.test',{progress:{a:true,b:false},version:99});s.set('a',false);await s.syncNow();
  assert.equal(s.status().mode,'conflict');assert.equal(b.rows.get('one@example.test').version,99,'stale device did not overwrite');
  s.resolveConflict('cloud');assert.deepEqual(s.snapshot(),{a:true,b:false});
  await s.signOut();assert.deepEqual(s.snapshot(),{a:true,b:false,c:true},'signout restores separate guest');
  await s.signIn('two@example.test','not-real');await delay();await s.syncNow();assert.deepEqual(s.snapshot(),{},'different account isolated');
  s.set('c',false);await s.syncNow();assert.deepEqual(b.rows.get('two@example.test').progress,{c:false});
  s.importGuest();await s.syncNow();assert.equal(b.rows.get('two@example.test').progress.c,false,'import respects cloud false');
  await s.signOut();await s.signIn('one@example.test','not-real');await delay();await s.syncNow();
  s.set('a',false);b.rows.set('one@example.test',{progress:{a:true,b:true},version:100});await s.syncNow();
  s.resolveConflict('local');await s.syncNow();assert.equal(b.rows.get('one@example.test').version,101,'explicit conflict resolve CAS');
  b.setFail(true);s.set('c',false);await s.syncNow();s.destroy();
  const again=create({ids:['a','b','c'],storage,client:b.client});b.setFail(false);await again.start();await delay();await again.syncNow();
  assert.equal(b.rows.get('one@example.test').progress.c,false,'pending edit survives reload');again.destroy();
  console.log('PASS: legacy, guest import consent, explicit false, offline durable retry, conflict protection/resolution, logout, account isolation, reload.');
})().catch(e=>{console.error(e);process.exit(1)});
