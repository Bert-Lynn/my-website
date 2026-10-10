/* Private, self-assessed career evidence. Public curriculum never contains a user's records. */
(function (root) {
  'use strict';
  const SKILLS = ['ai-code','reproducible-workflow','sql-data','statistics-metrics','ml-validation','time-forecast','optimization-modeling','decision-evaluation','software-testing','api-delivery','agent-evaluation','technical-interview','pytorch-training'];
  const ROLES = ['decision_optimization','forecasting_ml','agent_engineering','search_recommendation','foundation_model_research'];
  const PROJECT = 'demand-decision-lab', MILESTONES = Array.from({length:7},(_,i)=>'ddl-m'+i);
  const LEVELS = ['untested','learning','practicing','passed'];
  const copy = v => JSON.parse(JSON.stringify(v));
  const object = v => !!v && typeof v === 'object' && !Array.isArray(v);
  const only = (v, keys) => Object.keys(v).every(k => keys.includes(k));
  const text = (v,max) => typeof v === 'string' && v.length <= max;
  const date = v => v === '' || (text(v,24) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString() === v);
  function url(v) {
    if (v === '') return true;
    if (!text(v,2048) || /\s/.test(v) || !/^https?:\/\//i.test(v)) return false;
    try { const u = new URL(v); return ['http:','https:'].includes(u.protocol) && !!u.hostname && !u.username && !u.password; } catch { return false; }
  }
  function attempt(id,value) {
    if (!object(value) || !only(value,['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification'])) return null;
    if (!LEVELS.includes(value.level) || !object(value.rubric) || !only(value.rubric,[1,2,3,4].map(n=>id+'-c'+n))) return null;
    if (!Object.values(value.rubric).every(n=>Number.isInteger(n)&&n>=0&&n<=4) || !url(value.evidenceUrl) || !text(value.evidenceNote,2000) || !date(value.assessedAt) || value.verification !== 'self_assessed') return null;
    const rubric = Object.fromEntries([1,2,3,4].map(n=>[id+'-c'+n,value.rubric[id+'-c'+n]||0]));
    const score = Math.round(Object.values(rubric).reduce((a,b)=>a+b,0)/16*100);
    const demonstrated = Object.values(rubric).every(n=>n===4) && !!(value.evidenceUrl.trim() || value.evidenceNote.trim());
    return {level:value.level==='passed'&&!demonstrated?'practicing':value.level,score,rubric,evidenceUrl:value.evidenceUrl,evidenceNote:value.evidenceNote,assessedAt:value.assessedAt,verification:'self_assessed'};
  }
  function cleanValue(key,value) {
    if(key==='selectedRole') return ROLES.includes(value)?value:null;
    if(key.startsWith('skill:') && SKILLS.includes(key.slice(6))) {
      const id=key.slice(6);
      if(!object(value)||!only(value,['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification','history'])||!Array.isArray(value.history)||value.history.length>5) return null;
      const {history,...current}=value, result=attempt(id,current);
      if(!result) return null;
      const past=history.map(v=>attempt(id,v));
      if(past.some(v=>!v)) return null;
      return {...result,history:past};
    }
    if(key.startsWith('milestone:'+PROJECT+':') && MILESTONES.includes(key.split(':')[2])) {
      if(!object(value)||!only(value,['status','evidenceUrl','completedAt'])||!['todo','doing','done'].includes(value.status)||!url(value.evidenceUrl)||!date(value.completedAt)) return null;
      return {status:value.status,evidenceUrl:value.evidenceUrl,completedAt:value.status==='done'?value.completedAt:''};
    }
    return null;
  }
  const ids=['selectedRole',...SKILLS.map(id=>'skill:'+id),...MILESTONES.map(id=>'milestone:'+PROJECT+':'+id)];
  function clean(value) {
    if(!object(value)) return {};
    const result={};
    for(const key of ids) if(Object.hasOwn(value,key)) { const v=cleanValue(key,value[key]); if(v!==null) result[key]=v; }
    return result;
  }
  function blankSkill(id) { return {level:'untested',score:0,rubric:Object.fromEntries([1,2,3,4].map(n=>[id+'-c'+n,0])),evidenceUrl:'',evidenceNote:'',assessedAt:'',verification:'self_assessed',history:[]}; }
  function create(options={}) {
    let store=null;
    const now=()=>new Date(options.now?options.now():Date.now()).toISOString();
    const read=()=>{
      const flat=clean(store?.snapshot()||{}),skills={},milestones={};
      for(const id of SKILLS) if(flat['skill:'+id]) skills[id]=flat['skill:'+id];
      for(const id of MILESTONES) if(flat['milestone:'+PROJECT+':'+id]) (milestones[PROJECT]||={})[id]=flat['milestone:'+PROJECT+':'+id];
      return {selectedRole:flat.selectedRole||ROLES[0],skills,milestones};
    };
    const notify=()=>{options.onChange?.(read()); if(root.dispatchEvent&&root.CustomEvent)root.dispatchEvent(new root.CustomEvent('careerprogresschange',{detail:read()}));};
    return {
      read, ids:[...ids], clean, valid:(v,key)=>cleanValue(key,v)!==null, notify,
      attach(value){store=value;notify();},
      setRole(id){return !!store && ROLES.includes(id) && store.set('selectedRole',id);},
      setSkill(id,assessment){
        if(!store||!SKILLS.includes(id)||!object(assessment)||!only(assessment,['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification','history']))return false;
        const old=read().skills[id]||blankSkill(id);
        const candidate={...old,...assessment,verification:'self_assessed',history:old.history};
        if(assessment.rubric)candidate.rubric={...old.rubric,...assessment.rubric};
        let next=cleanValue('skill:'+id,candidate); if(!next)return false;
        const {history:oldHistory,assessedAt:oldAt,...oldWork}=old;
        const {history:newHistory,assessedAt:newAt,...newWork}=next;
        const changed=JSON.stringify(oldWork)!==JSON.stringify(newWork);
        if(changed && ['practicing','passed'].includes(next.level)) {
          next.assessedAt=assessment.assessedAt||now();
          if(old.assessedAt) { const {history,...previous}=old; next.history=[...oldHistory,previous].slice(-5); }
        } else if(!changed)next.assessedAt=oldAt;
        return store.set('skill:'+id,copy(next));
      },
      setMilestone(project,id,value){
        if(!store||project!==PROJECT||!MILESTONES.includes(id)||!object(value)||!only(value,['status','evidenceUrl','completedAt']))return false;
        const old=read().milestones[project]?.[id]||{status:'todo',evidenceUrl:'',completedAt:''};
        const candidate={...old,...value};
        if(candidate.status==='done'&&old.status!=='done')candidate.completedAt=value.completedAt||now();
        if(candidate.status==='done'&&old.status==='done'&&!value.completedAt)candidate.completedAt=old.completedAt;
        const next=cleanValue('milestone:'+project+':'+id,candidate);
        return !!next&&store.set('milestone:'+project+':'+id,copy(next));
      }
    };
  }
  root.PhdCareerState={create,clean,ids,skills:SKILLS,roles:ROLES,project:PROJECT,milestones:MILESTONES};
  if(root.document)root.phdCareerProgress=create();
  if(typeof module!=='undefined')module.exports=root.PhdCareerState;
})(typeof window==='undefined'?globalThis:window);
