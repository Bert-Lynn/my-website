'use strict';
// In-memory test double only. It never reaches a real account or service.
const copy = value => JSON.parse(JSON.stringify(value));
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

module.exports = { backend };
