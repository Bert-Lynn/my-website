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
for(const r of roles){assert(r.skillMapping,'Missing job-specific mapping: '+r.id);const m=r.skillMapping;for(const id of [...m.directRequiredSkillIds,...m.supportingSkillIds])assert(sid.has(id));assert(m.directRequiredSkillIds.every(id=>!m.supportingSkillIds.includes(id)));assert(m.uncoveredRequirements.length&&m.mappingNote);}
assert(fs.existsSync(path.join(root,'data/career-challenge-starters.zip')),'Assessment fixtures required');
console.log('PASS public catalog: ten companies, cited role evidence, 13 skills, 30 independent learning units, closed prerequisite graphs, fixture archive.');

// Public video resources intentionally have no completion identities or sync schema.
const videos=read('data/video-learning.json'),outline=read('data/project-outline.json');
assert.equal(videos.schemaVersion,1);assert(videos.checkedAt&&Number.isFinite(Date.parse(videos.checkedAt)));
unique([...videos.resources,...(videos.archivedResources||[])].map(x=>x.id),'Current and archived video resource');unique(videos.stages.map(x=>x.id),'Video stage');
assert.deepEqual(videos.stages.map(x=>x.taskId),outline.milestones.map(x=>x.id),'Video stages map to the existing WA4 only');
for(const stage of videos.stages){assert(stage.title&&stage.goal&&stage.moduleIds.length);const milestone=outline.milestones.find(x=>x.id===stage.taskId);assert.deepEqual(stage.moduleIds,milestone.moduleIds);assert(videos.resources.some(x=>x.taskId===stage.taskId),'Every current task has verified video resources');assert.deepEqual(stage.resourceIds,videos.resources.filter(x=>x.taskId===stage.taskId).map(x=>x.id),'Stage resource order matches its exact videos');}
for(const resource of videos.resources){
  assert(/^wa-video-/.test(resource.id),'Video IDs cannot be mistaken for old lesson IDs');
  for(const field of ['title','provider','language','url','episodeLabel','watchScope','skillLabel','practice','check','checkedAt','publishedAt','technologySummary'])assert(typeof resource[field]==='string'&&resource[field].trim(),resource.id+' needs '+field);
  safe(resource.url);assert(['www.bilibili.com','bilibili.com','www.youtube.com','youtube.com','youtu.be'].includes(new URL(resource.url).hostname),'Video-only playback destinations');
  assert(Number.isFinite(Date.parse(resource.checkedAt)));assert(resource.sourceVerification,'Video metadata needs traceable verification');
  assert(/^202[56]-\d{2}(?:-\d{2})?$/.test(resource.publishedAt)&&Number.isFinite(Date.parse(resource.publishedAt)),'Current videos need a verified 2025–26 publication date');
  assert(resource.publishedAt<=resource.checkedAt,'A future release cannot be represented as available');
  assert(['day','month'].includes(resource.publicationPrecision)&&resource.publishedAt.length===(resource.publicationPrecision==='month'?7:10),'Publication precision must match observed evidence');
  assert(['course','video'].includes(resource.publicationScope),'Album release dates must not be presented as individual-episode update dates');
  assert(resource.verification?.publicationDateVerified&&resource.verification?.publicationEvidenceUrl,'Publication dates need a traceable source');safe(resource.verification.publicationEvidenceUrl);
  assert(resource.verification?.exactEpisodeUrlVerified,'Verify the exact video or episode');
  for(const url of resource.verification.technologyEvidenceUrls||[])safe(url);
  assert(resource.skillIds.length&&resource.skillIds.every(id=>sid.has(id)),'Skills use existing registry IDs');
  assert(outline.milestones.some(x=>x.id===resource.taskId),'Unknown task association');
  assert(!['canonicalProgressId','progressId','completed','done','status'].some(key=>key in resource),'Read-only videos cannot inherit or fabricate completion');
}
for(const resource of videos.archivedResources||[]){assert(!['canonicalProgressId','progressId','completed','done','status'].some(key=>key in resource));safe(resource.url)}
console.log('PASS verified video sources: dated 2025–26 resources, distinct archived IDs, exact episode evidence, four existing WA task mappings, known skill IDs and no completion keys.');
