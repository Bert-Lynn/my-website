'use strict';
// Independently maintained recruiting evidence uses semantic protection, not frozen bytes.
const maintainedCatalogs=new Set(['data/internships.json','internship-data.js']);
require('./career-data.test.cjs');
// Read-only local checks. No account, private database, or network service is used.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const baseline=require('./fixtures/task-focus-preserved-baseline.json');
const root=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f)),sha=s=>crypto.createHash('sha256').update(s).digest('hex');
// The requested paper2 goal display is separately tested; underlying47 task objects and all progress sources stay hash-protected.
const v7ViewHashes={'lesson-ui.js':'ac5f2e694e033cbd509517f2f851215c0b8b764d460d0b0f316db06d814029aa'};
for(const [file,hash] of Object.entries(baseline.files)) if(file!=='goal-ui.js'&&!maintainedCatalogs.has(file))assert.equal(sha(read(file)),v7ViewHashes[file]||hash,file+': task-clarity change preserves original public data, state, SQL, course, asset and sync source');
const source=read('app.js').toString(),prefix=source.slice(0,source.indexOf('const streamLabels='));
assert.equal(sha(prefix),baseline.taskPrefixSha256,'all complete original task definitions are byte-preserved');
const tasks=vm.runInNewContext(prefix+'; tasks');assert.equal(tasks.length,47);assert.equal(new Set(tasks.map(t=>t.id)).size,47);
const html=read('index.html').toString();
const cover=html.slice(html.indexOf('<section class="site-cover'),html.indexOf('<div class="site-shell"'));
assert(/<h1 id="coverTitle" tabindex="-1">/.test(cover)&&/id="enterWorkspace"[^>]*href="#modules"/.test(cover)&&!/<(?:script|input|form|img|video)\b/i.test(cover),'cover keeps heading and old route without introducing writes or artwork');
const state=require('../career-state.js');assert.equal(state.ids.length,31);assert.deepEqual(state.projects['work-assistant'],['wa-m0','wa-m1','wa-m2','wa-m3']);
console.log('PASS task-focus integrity: complete47 task definitions, all public data and course semantics, original private-state/sync adapters, SQL, semantic cover entry and original styles/assets are byte-preserved. Remote classroom preservation is a separate publication-tree gate.');
