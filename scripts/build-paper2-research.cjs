'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'data/paper2-research.json'),'utf8'));
assert.equal(data.id,'paper2');assert.equal(data.legacyStream,'paperB');
assert.equal(data.steps.length,3);assert.equal(data.references.length,6);
const ids=new Set(data.references.map(x=>x.id));assert.equal(ids.size,6);
for(const paper of data.references){const url=new URL(paper.url);assert.equal(url.protocol,'https:');assert(['www.nature.com','doi.org'].includes(url.hostname));assert(paper.journal&&paper.year&&paper.focus);}
assert.equal(new Set(data.steps.map(x=>x.id)).size,3);
for(const step of data.steps){assert(step.id.startsWith('paper2-'));assert(step.title&&step.summary&&step.deliverable&&step.check);for(const id of [...step.read,...(step.optionalRead||[])])assert(ids.has(id));}
fs.writeFileSync(path.join(root,'paper2-research.js'),'// Generated public research plan. Edit data/paper2-research.json and run node scripts/build-paper2-research.cjs.\nwindow.PAPER2_RESEARCH = '+JSON.stringify(data,null,2)+';\n');
console.log('PASS paper2 public research data: 3 read-only steps and 6 journal references. Generated paper2-research.js.');
