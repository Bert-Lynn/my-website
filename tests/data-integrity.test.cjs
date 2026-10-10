const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const baseline = require('./fixtures/pre-career-baseline.json');
const context = { window: {} };
const run = file => vm.runInNewContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
const plain = value => JSON.parse(JSON.stringify(value));
const uniqueIds = (rows, label) => {
  const ids = rows.map(row => row.id);
  assert(ids.every(id => typeof id === 'string' && id.length), `${label}: every item has a stable ID`);
  assert.equal(new Set(ids).size, ids.length, `${label}: no duplicate IDs`);
  return new Set(ids);
};

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const endTasks = app.indexOf('const streamLabels=');
assert(endTasks > 0, 'task catalog delimiter exists');
const tasks = plain(vm.runInNewContext(app.slice(0, endTasks) + '; tasks'));
const taskIds = uniqueIds(tasks, 'tasks');
assert.equal(tasks.length, 47, 'preserve all 47 execution tasks');
for (const previous of baseline.tasks) {
  assert(taskIds.has(previous.id), `preserve task ${previous.id}`);
  const current = tasks.find(task => task.id === previous.id);
  assert.equal(current.month, previous.month, `preserve planned month for ${previous.id}`);
}

run('course-lessons.js');
const lessons = plain(context.window.COURSE_LESSONS.courses.flatMap(course => course.lessons));
const lessonIds = uniqueIds(lessons, 'lessons');
assert.equal(lessons.length, 53, 'preserve the original 53 individual lesson records');
for (const previous of baseline.lessons) {
  assert(lessonIds.has(previous.id), `preserve lesson ${previous.id}`);
  const current = lessons.find(lesson => lesson.id === previous.id);
  assert.equal(current.url, previous.url, `preserve exact official lesson URL for ${previous.id}`);
  assert.equal(current.taskId, previous.taskId, `preserve task reference for ${previous.id}`);
  assert(taskIds.has(current.taskId), `${current.id}: referenced task exists`);
  assert.equal(new URL(current.url).protocol, 'https:', `${current.id}: secure external lesson link`);
}
assert.equal(context.window.COURSE_LESSONS.timeBudget.normalWeekMinutes, 480);
assert.equal(context.window.COURSE_LESSONS.timeBudget.revisionWeekMinutes, 180);

console.log('PASS data integrity: all 47 stable task IDs/months, 53 stable lesson IDs/exact source links, task references, and 8h/3h weekly budgets retained.');
