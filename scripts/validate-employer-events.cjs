'use strict';
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const data = read('data/employer-events.json'), curriculum = read('data/career-curriculum.json');
const skillIds = new Set(curriculum.skills.map(skill => skill.id)), unitIds = new Set(curriculum.learningUnits.map(unit => unit.id));
assert.equal(data.schemaVersion, 1);
assert(Number.isFinite(Date.parse(data.verifiedAt)));
assert.equal(data.items.length, 5);
assert.equal(data.items.filter(item => item.priority === 'first_optional').length, 1);
assert.equal(data.items.find(item => item.priority === 'first_optional').id, 'cozeloop-contribution');
for (const values of [data.items, data.sources]) assert.equal(values.length, new Set(values.map(value => value.id)).size);
for (const source of data.sources) {
  const url = new URL(source.url);
  assert(['http:', 'https:'].includes(url.protocol) && !url.username && !url.password);
  assert(Number.isFinite(Date.parse(source.checkedAt)) && source.evidenceType && source.supports);
}
for (const item of data.items) {
  assert(item.skillIds.every(id => skillIds.has(id)) && item.learningUnitIds.every(id => unitIds.has(id)));
  assert(!['canonicalProgressId', 'progressId', 'completed', 'done'].some(key => key in item), 'Read-only resources have no completion identity');
  assert(item.sourceIds.length && item.sourceIds.every(id => data.sources.some(source => source.id === id)));
  assert(item.employerRecognition?.evidence && item.employerRecognition?.limit);
  assert.equal(item.status.registrationOpenVerified, false, 'Current catalog has no verified open registration');
  assert(['rolling_community', 'closed_historical', 'registration_closed_historical', 'cfp_provisional'].includes(item.status.code));
  for (const field of ['shortTitle', 'tagline', 'participation', 'skills', 'output', 'recognition', 'recognitionLimit', 'primarySourceId', 'primaryLabel', 'dateSummary']) assert(typeof item.presentation[field] === 'string' && item.presentation[field].trim());
  assert(item.sourceIds.includes(item.presentation.primarySourceId));
}
const sigir = data.items.find(item => item.id === 'sigir-2027-research');
assert.equal(sigir.dates.provisional, true);
assert(sigir.presentation.dateSummary.includes('暂定') && sigir.presentation.dateSummary.includes('AoE'));
console.log('PASS optional activities: five sourced choices, one current option, bounded employer evidence, honest dates, known skill IDs and no completion identities.');
