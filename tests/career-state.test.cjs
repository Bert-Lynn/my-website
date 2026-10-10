const assert = require('node:assert/strict');
const state = require('../career-state.js');
const { create: createSync } = require('../cloud-sync.js');
const copy = value => JSON.parse(JSON.stringify(value));
const memory = initial => {
  const values = new Map(Object.entries(initial || {}));
  return { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), values };
};
const delay = () => new Promise(resolve => setTimeout(resolve, 20));
const CAREER = 'lin-ai-phd-roadmap-career-v1';
const TASKS = 'lin-ai-phd-roadmap-progress-v1';
const id = 'ai-code';
const rubric = score => Object.fromEntries([1, 2, 3, 4].map(n => [id + '-c' + n, score]));

function backend() {
  const fields = {
    phd_save_progress: ['progress', 'version', 'next_progress'],
    phd_save_lessons: ['lessons', 'lessons_version', 'next_lessons'],
    phd_save_completion_dates: ['completion_dates', 'completion_dates_version', 'next_completion_dates'],
    phd_save_career_state: ['career_state', 'career_state_version', 'next_career_state']
  };
  const rows = new Map(), listeners = [], failures = new Set(), writes = [];
  let session = null, hold = null;
  const blank = () => Object.fromEntries(Object.values(fields).flatMap(([field, version]) => [[field, {}], [version, 0]]));
  const client = {
    auth: {
      onAuthStateChange(listener) { listeners.push(listener); return { data: { subscription: { unsubscribe() {} } } }; },
      async getSession() { return { data: { session } }; },
      async signInWithPassword({ email }) { session = { user: { id: email, email } }; listeners.forEach(f => f('SIGNED_IN', session)); return { data: { session } }; },
      async signOut() { session = null; listeners.forEach(f => f('SIGNED_OUT', null)); return { error: null }; },
      async signUp() { return { data: { session: null } }; }
    },
    from() { return {
      select(fields) { this.fields = fields; return this; },
      eq(_, user) { this.user = user; return this; },
      async maybeSingle() {
        if ([...failures].some(field => this.fields.split(',').includes(field))) return { error: Error('simulated offline') };
        return { data: copy(rows.get(this.user) || null) };
      }
    }; },
    async rpc(name, args) {
      const [field, version, arg] = fields[name], user = session.user.id;
      if (failures.has(field)) return { error: Error('simulated offline') };
      if (hold?.field === field) { hold.received(); await hold.promise; }
      const row = rows.get(user) || blank();
      if (row[version] !== args.expected_version) return { data: [{ applied: false, ...copy(row) }] };
      // Lesson/date/career RPCs preserve omitted keys. Explicit values express undo/reset.
      const merged = ['lessons', 'completion_dates', 'career_state'].includes(field) ? { ...row[field], ...copy(args[arg]) } : copy(args[arg]);
      const next = { ...row, [field]: merged, [version]: row[version] + 1 };
      rows.set(user, next); writes.push({ user, field, version: next[version] });
      return { data: [{ applied: true, ...copy(next) }] };
    }
  };
  return { client, rows, writes, failures,
    hold(field) {
      let release, received;
      const promise = new Promise(resolve => { release = resolve; });
      const entered = new Promise(resolve => { received = resolve; });
      hold = { field, promise, received };
      return { entered, release() { hold = null; release(); } };
    }
  };
}

(async () => {
  let timestamp = '2026-10-10T09:00:00.000Z';
  const api = state.create({ now: () => timestamp });
  const storage = memory({ [TASKS]: JSON.stringify({ a: true, b: false }) });
  const b = backend();
  let sync = createSync({ ids: ['a', 'b'], lessonIds: ['l1', 'l2', 'u-sql-select'], careerApi: api, storage, client: b.client });
  await sync.start();
  assert.deepEqual(api.read(), { selectedRole: 'agent_engineering', skills: {}, milestones: {} });
  assert.deepEqual(sync.snapshot(), { a: true, b: false });
  assert.deepEqual(sync.taskCompletedAtSnapshot(), {}, 'legacy true dates stay unknown');
  assert.equal(api.setRole('invalid'), false);
  assert.equal(api.setSkill('unknown', { level: 'passed' }), false);
  assert.equal(api.setSkill(id, { level: 'mastered' }), false);
  assert.equal(api.setSkill(id, { rubric: { [id + '-c1']: 4.5 } }), false);
  assert.equal(api.setSkill(id, { rubric: { invented: 4 } }), false);
  assert.equal(api.setSkill(id, { evidenceNote: 'x'.repeat(2001) }), false);
  for (const evidenceUrl of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'file:///tmp/test', '//example.com', 'https://user:password@example.com']) {
    assert.equal(api.setSkill(id, { evidenceUrl }), false, 'reject dangerous/private-credential URL ' + evidenceUrl);
  }
  assert.equal(api.setSkill(id, { level: 'passed', score: 100 }), true);
  assert.equal(api.read().skills[id].level, 'practicing', 'a chosen level or score alone never creates a pass');
  assert.equal(api.read().skills[id].score, 0, 'score is recomputed from rubric');
  assert.equal(api.setSkill(id, { level: 'passed', rubric: rubric(4) }), true);
  assert.equal(api.read().skills[id].level, 'practicing', 'complete rubric without evidence does not pass');
  const note = '<img src=x onerror=alert(1)> independent run log';
  assert.equal(api.setSkill(id, { level: 'passed', rubric: rubric(4), evidenceNote: note, verification: 'externally_certified' }), true);
  assert.equal(api.read().skills[id].level, 'passed');
  assert.equal(api.read().skills[id].score, 100);
  assert.equal(api.read().skills[id].verification, 'self_assessed', 'cannot forge external certification');
  assert.equal(api.read().skills[id].evidenceNote, note, 'state retains text for UI escaping rather than interpreting markup');
  assert.deepEqual(sync.lessonSnapshot(), {}, 'passing a diagnostic never completes a lesson');
  assert.deepEqual(sync.snapshot(), { a: true, b: false }, 'skill pass never completes execution tasks');
  const passedAt = api.read().skills[id].assessedAt;
  timestamp = '2026-10-11T09:00:00.000Z';
  api.setSkill(id, { level: 'passed' });
  assert.equal(api.read().skills[id].assessedAt, passedAt, 'repeat save preserves the original assessment date');
  sync.setLesson('l1', 'done'); sync.setLesson('l2', 'skipped');
  sync.setLesson('u-sql-select', 'done');
  assert.equal(sync.lessonSnapshot()['u-sql-select'], 'done', 'new curated units use real independent learning progress');
  assert.equal(api.read().skills[id].level, 'passed');
  assert.equal(Object.keys(api.read().skills).length, 1, 'lessons never create another assessment');
  api.setSkill(id, { level: 'untested' });
  assert.equal(api.read().skills[id].level, 'untested', 'self-assessed pass can be revoked');
  assert.equal(api.setRole('forecasting_ml'), true);
  api.setMilestone('demand-decision-lab', 'ddl-m0', { status: 'done', evidenceUrl: 'https://example.com/public-repo' });
  const completedAt = api.read().milestones['demand-decision-lab']['ddl-m0'].completedAt;
  timestamp = '2026-10-12T09:00:00.000Z';
  api.setMilestone('demand-decision-lab', 'ddl-m0', { status: 'done' });
  assert.equal(api.read().milestones['demand-decision-lab']['ddl-m0'].completedAt, completedAt);
  api.setMilestone('demand-decision-lab', 'ddl-m0', { status: 'todo' });
  assert.equal(api.read().milestones['demand-decision-lab']['ddl-m0'].completedAt, '', 'milestone undo clears actual date');
  assert.equal(api.setMilestone('wrong-project', 'ddl-m0', { status: 'done' }), false);
  assert.equal(api.setMilestone('demand-decision-lab', 'ddl-m7', { status: 'done' }), false);
  assert.equal(api.setMilestone('demand-decision-lab', 'ddl-m0', { evidenceUrl: 'javascript:alert(1)' }), false);
  assert.equal(state.mainProject, 'ai-choice-assistant');
  assert.deepEqual(state.projects['demand-decision-lab'], state.milestones, 'legacy registry fields keep their original meaning');
  assert.deepEqual(state.projects['ai-choice-assistant'], Array.from({ length: 6 }, (_, i) => 'aca-m' + i));
  assert.equal(api.setMilestone('ai-choice-assistant', 'ddl-m0', { status: 'doing' }), false, 'old IDs cannot be relabelled as new achievements');
  assert.equal(api.setMilestone('demand-decision-lab', 'aca-m0', { status: 'doing' }), false, 'project namespace is enforced both ways');
  assert.equal(api.setMilestone('ai-choice-assistant', 'aca-m6', { status: 'doing' }), false);
  assert.equal(api.setMilestone('ai-choice-assistant', 'aca-m0', { status: 'doing' }), true);
  assert.equal(api.read().milestones['demand-decision-lab']['ddl-m0'].status, 'todo');
  assert.equal(api.read().milestones['ai-choice-assistant']['aca-m0'].status, 'doing');
  assert.equal(api.setMilestone('ai-choice-assistant', 'aca-m0', { status: 'done', evidenceUrl: 'https://example.com/new-assistant-evidence' }), true);
  const newProjectDate = api.read().milestones['ai-choice-assistant']['aca-m0'].completedAt;
  assert(newProjectDate);
  api.setMilestone('demand-decision-lab', 'ddl-m0', { status: 'done', evidenceUrl: 'https://example.com/old-lab-evidence' });
  const oldProjectDate = api.read().milestones['demand-decision-lab']['ddl-m0'].completedAt;
  timestamp = '2026-10-12T10:00:00.000Z';
  api.setMilestone('ai-choice-assistant', 'aca-m0', { status: 'done' });
  assert.equal(api.read().milestones['ai-choice-assistant']['aca-m0'].completedAt, newProjectDate, 'repeat save preserves the new project actual date');
  api.setMilestone('ai-choice-assistant', 'aca-m0', { status: 'todo' });
  assert.equal(api.read().milestones['ai-choice-assistant']['aca-m0'].completedAt, '');
  assert.equal(api.read().milestones['demand-decision-lab']['ddl-m0'].completedAt, oldProjectDate, 'new-project undo leaves old-project completion intact');
  api.setMilestone('ai-choice-assistant', 'aca-m0', { status: 'done', evidenceUrl: 'https://example.com/new-assistant-evidence' });
  assert.notEqual(api.read().milestones['ai-choice-assistant']['aca-m0'].completedAt, newProjectDate, 'redo records its new actual completion time');
  assert.equal(api.read().skills[id].level, 'untested', 'new project completion never grants skill mastery');
  const guest = copy(api.read());
  await sync.signIn('A', 'test-only'); await delay(); await sync.syncNow();
  assert.deepEqual(api.read().skills, {}, 'login starts with account state, not guest skills');
  assert.equal(api.read().selectedRole, 'agent_engineering', 'new account uses the Agent default without leaking the guest selected role');
  assert.equal(b.rows.size, 0, 'login does not upload guest progress');
  assert.equal(sync.status().canImport, true);
  assert.equal(sync.importGuest(), true); await delay(); await sync.syncNow();
  assert.deepEqual(api.read(), guest, 'explicit import preserves role, skill and milestone records');
  assert.equal(b.rows.get('A').career_state['skill:' + id].level, 'untested');
  assert.equal(b.rows.get('A').career_state['milestone:ai-choice-assistant:aca-m0'].status, 'done');
  assert.equal(b.rows.get('A').career_state['milestone:demand-decision-lab:ddl-m0'].status, 'done');
  const newRemoteRecord = copy(b.rows.get('A').career_state['milestone:ai-choice-assistant:aca-m0']);
  const oldClientPayload = Object.fromEntries(Object.entries(b.rows.get('A').career_state).filter(([key]) => !key.startsWith('milestone:ai-choice-assistant:')));
  const oldClientResponse = await b.client.rpc('phd_save_career_state', { expected_version: b.rows.get('A').career_state_version, next_career_state: oldClientPayload });
  assert.equal(oldClientResponse.data[0].applied, true);
  assert.deepEqual(b.rows.get('A').career_state['milestone:ai-choice-assistant:aca-m0'], newRemoteRecord, 'omission by an older client cannot delete new-project evidence');
  await sync.syncNow();
  assert.equal(b.rows.get('A').progress.a, true);
  assert.equal(b.rows.get('A').lessons['u-sql-select'], 'done', 'new unit progress imports through the existing private lesson stream');
  sync.setLesson('u-sql-select', null); await sync.syncNow();
  assert.equal(b.rows.get('A').lessons['u-sql-select'], false, 'new unit undo uses a durable false tombstone');
  assert.equal(api.read().skills[id].level, 'untested', 'new unit completion or undo never passes a skill');
  assert.equal(b.rows.get('A').completion_dates['task:a'], undefined, 'guest import does not fabricate historical dates');
  b.failures.add('career_state');
  api.setSkill(id, { level: 'practicing', rubric: rubric(2), evidenceNote: 'offline edit' });
  api.setMilestone('ai-choice-assistant', 'aca-m1', { status: 'done', evidenceUrl: 'https://example.com/offline-new-project' });
  await sync.syncNow();
  assert.equal(sync.status().mode, 'error', 'successful task/lesson streams cannot hide career failure');
  assert.equal(JSON.parse(storage.getItem(CAREER + ':account:A')).dirty, true);
  sync.destroy();
  const reloadedApi = state.create({ now: () => timestamp });
  sync = createSync({ ids: ['a', 'b'], lessonIds: ['l1', 'l2', 'u-sql-select'], careerApi: reloadedApi, storage, client: b.client });
  await sync.start(); await delay();
  assert.equal(reloadedApi.read().skills[id].evidenceNote, 'offline edit', 'offline private record survives reload');
  assert.equal(reloadedApi.read().milestones['ai-choice-assistant']['aca-m1'].status, 'done', 'new-project offline evidence survives reload');
  b.failures.clear(); await sync.syncNow();
  assert.equal(b.rows.get('A').career_state['skill:' + id].evidenceNote, 'offline edit');
  assert.equal(b.rows.get('A').career_state['milestone:ai-choice-assistant:aca-m1'].status, 'done');
  const originalLessons = copy(b.rows.get('A').lessons);
  const originalCareer = copy(b.rows.get('A').career_state);
  b.rows.get('A').progress = { a: false }; b.rows.get('A').version += 1;
  await sync.syncNow();
  assert.deepEqual(b.rows.get('A').career_state, originalCareer, 'old task clients cannot overwrite career stream');
  assert.deepEqual(b.rows.get('A').lessons, originalLessons);
  reloadedApi.setRole('agent_engineering');
  b.rows.get('A').career_state.selectedRole = 'search_recommendation'; b.rows.get('A').career_state_version += 1;
  const remoteVersion = b.rows.get('A').career_state_version;
  await sync.syncNow();
  assert.equal(sync.status().mode, 'conflict');
  assert.equal(b.rows.get('A').career_state_version, remoteVersion, 'stale client cannot overwrite remote career changes');
  sync.resolveConflict('cloud');
  assert.equal(reloadedApi.read().selectedRole, 'search_recommendation');
  await sync.signOut();
  assert.deepEqual(reloadedApi.read(), guest, 'logout restores isolated guest career records');
  await sync.signIn('B', 'test-only'); await delay(); await sync.syncNow();
  assert.deepEqual(reloadedApi.read().skills, {}, 'second account does not inherit first account or guest skills');
  assert.deepEqual(reloadedApi.read().milestones, {}, 'second account never inherits either project from the first account or guest');
  reloadedApi.setSkill(id, { level: 'untested' }); await sync.syncNow();
  sync.importGuest(); await sync.syncNow();
  assert.equal(reloadedApi.read().skills[id].level, 'untested', 'explicit account reset wins over imported guest skill');
  await sync.signOut(); await sync.signIn('A', 'test-only'); await delay(); await sync.syncNow();
  reloadedApi.setRole('forecasting_ml');
  b.rows.get('A').career_state.selectedRole = 'foundation_model_research'; b.rows.get('A').career_state_version += 1;
  await sync.syncNow(); assert.equal(sync.status().mode, 'conflict');
  const version = b.rows.get('A').career_state_version;
  sync.resolveConflict('local'); await sync.syncNow();
  assert.equal(b.rows.get('A').career_state_version, version + 1, 'explicit local resolution uses newest CAS version');
  assert.equal(b.rows.get('A').career_state.selectedRole, 'forecasting_ml');
  const hold = b.hold('career_state');
  reloadedApi.setRole('agent_engineering');
  const inFlight = sync.syncNow();
  await hold.entered;
  await sync.signOut(); await sync.signIn('B', 'test-only'); await delay();
  const accountB = copy(reloadedApi.read());
  hold.release(); await inFlight; await sync.syncNow();
  assert.deepEqual(reloadedApi.read(), accountB, 'late first-account response cannot overwrite newly selected account');
  assert.notEqual(b.rows.get('B').career_state.selectedRole, 'agent_engineering', 'in-flight write stays bound to originating account');
  sync.destroy();

  const unknownDate = copy(guest.skills[id]); unknownDate.assessedAt = '';
  const importedApi = state.create({ now: () => timestamp });
  const importedSync = createSync({ ids: ['a'], lessonIds: ['l1'], careerApi: importedApi, storage: memory({ [CAREER]: JSON.stringify({ ['skill:' + id]: unknownDate }) }), config: { enabled: false } });
  await importedSync.start(); importedApi.setSkill(id, { level: unknownDate.level });
  assert.equal(importedApi.read().skills[id].assessedAt, '', 'unknown historical assessment time remains unknown on unchanged save');
  for (let n = 0; n < 8; n++) {
    timestamp = `2026-10-${String(13 + n).padStart(2, '0')}T09:00:00.000Z`;
    importedApi.setSkill(id, { level: 'practicing', evidenceNote: 'attempt ' + n, rubric: rubric(n % 5) });
  }
  assert.equal(importedApi.read().skills[id].history.length, 5, 'assessment history is bounded to five prior attempts');
  assert(importedApi.read().skills[id].history.every(record => record.verification === 'self_assessed'));
  const forged = copy(importedApi.read().skills[id]); forged.verification = 'external';
  assert.deepEqual(state.clean({ ['skill:' + id]: forged, 'skill:invented': forged }), {}, 'remote forged/unknown records are dropped');
  importedSync.destroy();
  console.log('PASS career API and fourth-stream integration: whitelist/security, rubric+evidence pass gate, explicit self-assessment, independent lesson/task counts, preserved dates, bounded history, consent import, offline reload/retry, account isolation, CAS conflict resolution and in-flight account switch.');
})().catch(error => { console.error(error); process.exit(1); });
