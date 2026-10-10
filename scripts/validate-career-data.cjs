'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const jobs=read('data/internships.json'),c=read('data/career-curriculum.json');
const unique=(a,label)=>assert.equal(new Set(a).size,a.length,label+' IDs must be unique');
const safe=u=>{const a=new URL(u);assert(['http:','https:'].includes(a.protocol)&&!a.username&&!a.password,'Unsafe public source URL: '+u)};
assert.equal(jobs.companies.length,10,'Keep all ten requested company results, including no verified result');
const roles=jobs.companies.flatMap(c=>c.roles||[]);unique(roles.map(r=>r.id),'Role');
assert(jobs.verifiedAt&&Number.isFinite(Date.parse(jobs.verifiedAt)),'Catalog needs real checked date');
for(const r of roles){assert(r.id&&r.title&&r.roleFamily&&r.status?.value&&r.salary?.evidenceClass);assert(r.sources?.length,'Every opportunity needs evidence');for(const s of r.sources){safe(s.url);assert(s.checkedAt&&Number.isFinite(Date.parse(s.checkedAt)));}if(r.status.value!=='closed'&&r.salary.evidenceClass==='exact_target')assert(r.status.caveat,'Unconfirmed target pay must retain caveat');}
for(const co of jobs.companies){if(co.officialCareersUrl)safe(co.officialCareersUrl);for(const s of co.sources||[])safe(s.url)}
assert.equal(c.skills.length,13);assert.equal(c.learningUnits.length,30);unique(c.skills.map(s=>s.id),'Skill');unique(c.learningUnits.map(s=>s.id),'Learning unit');
const sid=new Set(c.skills.map(s=>s.id)),uid=new Set(c.learningUnits.map(u=>u.id));
for(const s of c.skills){assert.equal(s.assessment.criteria.length,4);unique(s.assessment.criteria.map(x=>x.id),'Rubric');for(const id of s.prerequisites||[])assert(sid.has(id));for(const id of s.learningUnitIds||[])assert(uid.has(id));}
for(const u of c.learningUnits){safe(u.url);assert.equal(u.canonicalProgressId,u.id,'New exercises keep independent progress');for(const id of u.skillIds)assert(sid.has(id));}
for(const t of c.tracks){assert(t.requiredSkillIds.length>0);for(const id of t.requiredSkillIds)assert(sid.has(id));for(const id of t.requiredSkillIds){const s=c.skills.find(s=>s.id===id);assert(s.prerequisites.every(p=>t.requiredSkillIds.includes(p)),t.id+' missing prerequisite '+id)}}
assert(fs.existsSync(path.join(root,'data/career-challenge-starters.zip')),'Assessment fixtures required');
console.log('PASS public catalog: ten companies, cited role evidence, 13 skills, 30 independent learning units, closed prerequisite graphs, fixture archive.');
