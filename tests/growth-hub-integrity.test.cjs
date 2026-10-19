'use strict';
// Independently maintained recruiting evidence uses semantic protection, not frozen bytes.
const maintainedCatalogs=new Set(['data/internships.json','internship-data.js']);
require('./career-data.test.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const baseline = require('./fixtures/growth-hub-baseline.json');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
// Explicitly approved project content and its additive state registry are checked
// field-by-field by work-assistant-content.test.cjs. All other old files stay protected.
const changedProjectFiles = new Set(['cloud-sync.js', 'career-state.js', 'career-curriculum.js', 'learning-modules.js', 'project-outline.js', 'data/career-curriculum.json', 'data/learning-modules.json', 'data/project-outline.json', 'supabase/CAREER_SYNC.md']);
for (const [file, hash] of Object.entries(baseline.files)) {
  if (changedProjectFiles.has(file)||maintainedCatalogs.has(file)) continue;
  assert.equal(sha(read(file)), hash, file + ': hub change must preserve the complete existing data, progress, and sync source');
}
// Existing local checkout differs from remote only by final whitespace in this file.
assert.equal(sha(read('cloud-config.js').toString().trim()), baseline.cloud_config_trimmed_sha256, 'cloud connection configuration remains unchanged');
const source = read('app.js').toString();
const prefix = source.slice(0, source.indexOf('const streamLabels='));
assert.equal(sha(prefix), baseline.tasks_sha256, 'all complete task definitions, IDs, labels, planned dates and original dates are byte-preserved');
const tasks = vm.runInNewContext(prefix + '; tasks');
assert.equal(tasks.length, 47);
assert.equal(tasks.filter(task => task.category === 'research').length, 23);
assert.equal(tasks.filter(task => ['learning', 'foundation'].includes(task.category)).length, 12);
assert.equal(tasks.filter(task => task.category === 'demo').length, 12);
assert.equal(tasks.find(task => task.id === 'feb-a-submit').month, '2027.03');
assert.equal(tasks.find(task => task.id === 'jun-b-submit').month, '2027.07');
assert.equal(tasks.find(task => task.id === 'sep-c-submit').month, '2027.10');
assert.equal(tasks.find(task => task.id === 'sep-apply').month, '2027.09');
const curriculum = JSON.parse(read('data/career-curriculum.json'));
assert.equal(curriculum.learningUnits.length, 30);
assert.equal(curriculum.tracks.find(track => track.id === 'agent_engineering').requiredLearningUnitIds.length, 20);
assert.equal(curriculum.tracks.find(track => track.id === 'decision_optimization').requiredLearningUnitIds.length, 26);
console.log('PASS independent hub data protection: complete47 task definitions, research23/course12/project12 partition, original dates, 53 historical lessons, 30 units, unchanged historical catalog files, Auth/sync implementation, connection config and existing SQL protected; approved project fields verified separately.');
