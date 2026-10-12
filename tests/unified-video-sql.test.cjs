const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const files = fs.readdirSync(path.join(root, 'supabase')).filter(name => /^(?:draft|\d+)_phd_unified_video_progress\.sql$/.test(name));
assert.equal(files.length, 1, 'keep one reviewed migration source');
const migration = read('supabase/' + files[0]);
const previous = read('supabase/20261010111945_phd_career_learning_units.sql');
const context = { window: {} };
vm.runInNewContext(read('unified-tasks.js'), context);
const progressIds = Array.from(context.window.UnifiedTasks.progressIds);
const constraint = (sql, column) => sql.match(new RegExp('add constraint phd_' + column + '_shape check \\(([\\s\\S]*?)\\n  \\);'))[1];
const keys = expression => Array.from(expression.match(/- array\[([^\]]+)\]/)[1].matchAll(/'([^']+)'/g), match => match[1]);

test('adds only the exact 14 independent UI watch/practice keys', () => {
  assert.equal(progressIds.length, 14);
  assert.equal(new Set(progressIds).size, 14);
  for (const [column, oldCount, expectedCount] of [['lessons', 83, 97], ['completion_dates', 130, 144]]) {
    const before = constraint(previous, column);
    const after = constraint(migration, column);
    const oldKeys = keys(before), newKeys = keys(after);
    const appended = column === 'lessons' ? progressIds : progressIds.map(id => 'lesson:' + id);
    assert.equal(oldKeys.length, oldCount);
    assert.equal(newKeys.length, expectedCount);
    assert.equal(new Set(newKeys).size, expectedCount);
    assert.deepEqual(newKeys, oldKeys.concat(appended));
    assert.equal(after.replace(/array\[[^\]]+\]/, 'array[KEYS]'), before.replace(/array\[[^\]]+\]/, 'array[KEYS]'), 'all shape/type/size rules remain unchanged');
  }
});

test('migration changes only the two existing CHECK constraints', () => {
  const executable = migration.replace(/^--.*$/gm, '');
  assert.equal((executable.match(/alter table public\.phd_roadmap_progress/gi) || []).length, 2);
  assert.equal((executable.match(/drop constraint /gi) || []).length, 2);
  assert.equal((executable.match(/add constraint /gi) || []).length, 2);
  assert.doesNotMatch(executable, /\b(?:create|grant|revoke|insert|update|delete|truncate|policy|function)\b/i);
  assert.match(executable, /begin;[\s\S]*commit;/);
  assert.match(executable, /set local lock_timeout = '5s'/);
});

test('integration verification is rollback-only and confined to random synthetic owners', () => {
  const verification = read('supabase/verify_unified_video_progress.sql');
  assert.match(verification, /begin;/);
  assert.match(verification, /rollback;\s*$/);
  assert.doesNotMatch(verification.replace(/^--.*$/gm, ''), /\bcommit\s*;/i);
  assert.equal((verification.match(/gen_random_uuid\(\)/g) || []).length, 2);
  assert.match(verification, /cross-owner read allowed/);
  assert.match(verification, /stale lesson CAS overwrote undo/);
  assert.match(verification, /stale date CAS overwrote undo/);
  assert.match(verification, /watch re-completion inferred practice completion/);
  assert.match(verification, /other streams/);
});
