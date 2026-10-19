'use strict';
// Independently maintained recruiting evidence uses semantic protection, not frozen bytes.
const maintainedCatalogs=new Set(['data/internships.json','internship-data.js']);
require('./career-data.test.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {app}=require('./helpers/app-harness.cjs');
const catalog=require('../data/video-learning.json'),baseline=require('./fixtures/video-refresh-preserved-baseline.json');
const root=path.join(__dirname,'..'),sha=value=>crypto.createHash('sha256').update(value).digest('hex');
// Sync compatibility is covered by unified-sync; requested app display changes by paper2-research, which also freezes all47 original tasks and unchanged course catalogs.
for(const [file,hash] of Object.entries(baseline.protectedFiles))if(!['cloud-sync.js','app.js'].includes(file)&&!maintainedCatalogs.has(file))assert.equal(sha(fs.readFileSync(path.join(root,file))),hash,file+' retains its exact previous bytes');
assert.equal(sha(JSON.stringify(catalog.archivedResources)),baseline.archivedResourcesSha256,'all previous video metadata, IDs and URLs remain intact');
assert.deepEqual(catalog.archivedResources.map(resource=>resource.id),baseline.archivedResourceIds);
const archiveIDs=new Set(baseline.archivedResourceIds),archiveURLs=new Set(catalog.archivedResources.map(resource=>resource.url));
assert(catalog.resources.length>=4,'each current WA task has at least one useful recent video');
assert(catalog.editionLabel.includes('2025')&&catalog.editionLabel.includes('2026'));
for(const resource of catalog.resources){
 assert(!archiveIDs.has(resource.id),'new videos must not reuse previous resource IDs');
 assert(!archiveURLs.has(resource.url),'new IDs must not disguise unchanged videos');
 assert(/^202[56]-\d{2}(?:-\d{2})?$/.test(resource.publishedAt));assert(resource.publishedAt<=catalog.checkedAt);
 assert(['course','video'].includes(resource.publicationScope));
 assert(resource.verification.publicationDateVerified);assert(resource.verification.publicationEvidenceUrl);
 assert(resource.verification.exactEpisodeUrlVerified);assert(resource.technologySummary.length<=80,'version summary stays readable');
 assert(resource.practice&&resource.check&&resource.skillIds.length&&resource.taskId);
}
const h=app({hash:'#resources'});
assert.equal(h.query('.video-resource-archive').open,false);
assert.deepEqual(h.all('[data-archived-video-resource]').map(node=>node.dataset.archivedVideoResource),baseline.archivedResourceIds);
for(const stage of catalog.stages){
 h.ctx.AppNavigation.open('learn/'+stage.moduleIds[0]);
 const resources=catalog.resources.filter(resource=>resource.taskId===stage.taskId),cards=h.all('.video-course-card');
 assert.equal(cards.length,resources.length);
 for(const [i,card] of cards.entries()){
  const metadata=card.querySelector('.video-release-meta'),resource=resources[i];
  assert(metadata&&metadata.closest('details')===null,'date and applicable technology are visible without opening warnings');
  assert(metadata.textContent.includes(resource.publishedAt));assert(metadata.textContent.includes(resource.technologySummary));
  assert(metadata.textContent.includes(resource.publicationScope==='course'?'课程发布':'发布'));
 }
}
// New metadata is untrusted text, just like titles and exercise descriptions.
const resource=h.ctx.VIDEO_LEARNING.resources[0];resource.publishedAt='<img src=x onerror=alert(1)>';resource.technologySummary='<script>alert(1)</script>';
h.ctx.AppNavigation.open('learn/code');assert.equal(h.all('.video-release-meta img,.video-release-meta script').length,0);
h.destroy();
console.log('PASS video freshness: verifiable 2025–26 dates, compact technology summaries, true replacement URLs and new IDs, exact archived resources, unchanged original progress/data, visible escaped metadata.');
