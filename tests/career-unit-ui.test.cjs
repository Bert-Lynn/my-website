const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const dir=path.join(__dirname,'..'),memory={};
function app(){
 const nodes={},listeners={};
 const node=()=>({innerHTML:'',textContent:'',dataset:{},style:{setProperty(){}},classList:{toggle(){}},setAttribute(){},focus(){},scrollIntoView(){}});
 const get=s=>nodes[s]||=node();
 let unitInputs=[];
 const ctx={window:null,URL,Intl,Date,console,localStorage:{getItem:k=>memory[k]||null,setItem:(k,v)=>memory[k]=v},document:{querySelector:get,getElementById:s=>get('#'+s),querySelectorAll(selector){
   if(selector==='[data-unit-check]') {unitInputs=[...get('#careerLearning').innerHTML.matchAll(/<input[^>]*data-unit-check="([^"]+)"[^>]*>/g)].map(m=>({dataset:{unitCheck:m[1]},checked:/\schecked(?:\s|>)/.test(m[0])})); return unitInputs;}
   return [];
 },addEventListener(){}},addEventListener(name,fn){(listeners[name]||=[]).push(fn)},dispatchEvent(event){for(const fn of listeners[event.type]||[])fn(event)},CustomEvent:class{constructor(type,{detail}={}){this.type=type;this.detail=detail}},setInterval(){},confirm:()=>true,clearTimeout,setTimeout,PHD_CLOUD_CONFIG:{enabled:false},location:{hash:''},history:{pushState(){}}};
 ctx.window=ctx;vm.createContext(ctx);
 for(const file of ['course-lessons.js','career-curriculum.js','learning-modules.js','project-outline.js','internship-data.js','career-state.js','goal-ui.js','lesson-ui.js','cloud-sync.js','career-ui.js','app.js'])vm.runInContext(fs.readFileSync(path.join(dir,file),'utf8'),ctx);
 ctx.AppNavigation.open('learn/data');
 return {ctx,nodes,unit(id){return unitInputs.find(b=>b.dataset.unitCheck===id)},evaluate:s=>vm.runInContext(s,ctx)};
}
(async()=>{
 let a=app();await a.ctx.AppProgress.sync().start();
 assert.equal(a.ctx.CAREER_CURRICULUM.learningUnits.length,30);
 assert.equal(a.ctx.LessonUI.ids.length,53);
 const unit=a.unit('u-sql-select');assert(unit,'new SQL unit is a real rendered checkbox');assert.equal(typeof unit.onchange,'function','unit checkbox is bound to app progress');
 unit.checked=true;unit.onchange();
 assert.equal(a.ctx.AppProgress.sync().lessonSnapshot()['u-sql-select'],'done');
 const at=a.ctx.AppProgress.sync().lessonCompletedAtSnapshot()['u-sql-select'];assert(at);
 assert.equal(a.ctx.phdCareerProgress.read().skills['sql-data'],undefined,'reading does not grant skill mastery');
 assert.equal(a.ctx.LessonUI.stats().done,0,'new exercise does not complete legacy lessons');
 assert.equal(a.evaluate('tally(tasks).done'),0,'new exercise does not complete roadmap task');
 a.ctx.phdCareerProgress.setRole('agent_engineering');assert.equal(a.ctx.AppProgress.sync().lessonSnapshot()['u-sql-select'],'done','role change retains hidden unit progress');
 a.ctx.phdCareerProgress.setRole('decision_optimization');assert.equal(a.unit('u-sql-select').checked,true);
 a.ctx.AppProgress.sync().destroy();
 a=app();await a.ctx.AppProgress.sync().start();
 assert.equal(a.unit('u-sql-select').checked,true,'full reload paints saved unit checked');
 assert.equal(a.ctx.AppProgress.sync().lessonCompletedAtSnapshot()['u-sql-select'],at,'reload keeps actual completion date');
 const undo=a.unit('u-sql-select');undo.checked=false;undo.onchange();
 assert.equal(a.ctx.AppProgress.sync().lessonSnapshot()['u-sql-select'],false);
 assert.equal(a.ctx.AppProgress.sync().lessonCompletedAtSnapshot()['u-sql-select'],undefined);
 assert.equal(a.ctx.phdCareerProgress.read().skills['sql-data'],undefined);
 a.ctx.AppProgress.sync().destroy();a=app();await a.ctx.AppProgress.sync().start();
 assert.equal(a.unit('u-sql-select').checked,false,'undo survives full reload');
 assert.equal(a.ctx.AppProgress.sync().lessonSnapshot()['u-sql-select'],false,'false tombstone survives full reload');
 a.ctx.AppProgress.sync().destroy();
 console.log('PASS full-app career unit UI: real bound checkbox, complete, timestamp, role-switch retention, reload, undo, and zero automatic old-lesson/task/skill completion.');
})().catch(e=>{console.error(e);process.exitCode=1});
