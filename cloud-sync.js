/* Local-first private progress. No credentials or personal progress ship in this file. */
(function (root) {
  'use strict';

  const equal = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
  function createStore(options) {
    const LEGACY = options.namespace || 'lin-ai-phd-roadmap-progress-v1';
    const GUEST = LEGACY + ':guest', OWNER = LEGACY + ':owner', PREFIX = LEGACY + ':account:';
    const field = options.field || 'progress', versionField = options.versionField || 'version';
    const valid = options.valid || (v => typeof v === 'boolean');
    const ids = new Set(options.ids);
    const storage = options.storage || root.localStorage;
    const config = options.config || root.PHD_CLOUD_CONFIG || {};
    const clean = options.clean || (value => Object.fromEntries(Object.entries(value || {}).filter(([id, v]) => ids.has(id) && valid(v, id))));
    const read = (key, fallback) => { try { return JSON.parse(storage.getItem(key)) || fallback; } catch { return fallback; } };
    const write = (key, value) => storage.setItem(key, JSON.stringify(value));
    // Versioned sidecar protects newly introduced keys from cached old clients that
    // clean and rewrite the shared local namespace. It never imports between owners.
    const protectedIds = new Set(options.preserveIds || []);
    const SIDECAR = LEGACY + ':extended-20261012:';
    const protectedPart = value => Object.fromEntries(Object.entries(clean(value)).filter(([id]) => protectedIds.has(id)));
    const guestValues = () => clean({ ...protectedPart(read(SIDECAR + 'guest', {})), ...read(GUEST, read(OWNER, null) ? {} : read(LEGACY, {})) });
    function protect() {
      if (!protectedIds.size) return;
      if (user) write(SIDECAR + 'account:' + user.id, {base:protectedPart(state.base),values:protectedPart(state.values),version:state.version});
      else write(SIDECAR + 'guest', protectedPart(values));
    }
    let user = null, client = null, makeClient = null, dataClient = null, generation = 0, timer = null, working = false, stopped = false, failure = 0;
    let state = { base: {}, values: {}, version: 0, dirty: false, conflict: null };
    let guest = guestValues();
    let values = { ...guest };
    let status = {};
    let starting = null, memoryOnly = false, remoteKnown = false;
    const configured = !!(config.url && config.key && config.enabled);
    function emit(mode, message) {
      status = { mode, message, email: user?.email || '', userId: user?.id || '', configured,
        canImport: !!user && remoteKnown && Object.keys(guest).some(id => !(id in state.values)),
        dirty: state.dirty, conflict: !!state.conflict };
      options.onStatus?.({ ...status });
    }
    function mirror() {
      write(OWNER, user?.id || null);
      write(LEGACY, values);
    }
    function persist() {
      memoryOnly = true;
      protect();
      if (user) write(PREFIX + user.id, state);
      else { guest = { ...values }; write(GUEST, guest); }
      mirror();
      memoryOnly = false;
    }
    function show() { values = user ? { ...state.values } : { ...guest }; options.onProgress?.({ ...values }); }
    function localError() { emit('error', '浏览器未能保存，请勿关闭页面。'); }
    function schedule(ms = 600) { clearTimeout(timer); if (!stopped && user) timer = setTimeout(() => syncNow(), ms); }
    function loadAccount(id) {
      const saved = read(PREFIX + id, {});
      const backup = protectedIds.size ? read(SIDECAR + 'account:' + id, {}) : {};
      const savedValues = clean(saved.values), restored = Object.fromEntries(Object.entries(protectedPart(backup.values)).filter(([key]) => !Object.hasOwn(savedValues,key)));
      const pending = Object.entries(restored).some(([key,value]) => value !== backup.base?.[key]);
      const version = Number.isSafeInteger(saved.version) ? saved.version : 0;
      // A cached old tab may have advanced CAS while dropping these pending keys.
      // Keep the older version so the normal conflict UI, rather than a blind write,
      // resolves that concurrent change.
      const backupVersion = Number.isSafeInteger(backup.version) ? backup.version : 0;
      return { base:{...protectedPart(backup.base),...clean(saved.base)}, values:{...restored,...savedValues},
        version:pending ? Math.min(version,backupVersion) : version,
        dirty:!!saved.dirty||pending, conflict:saved.conflict||null };
    }
    async function useSession(session) {
      const next = session?.user || null;
      // Bind each data request to one captured identity; a login switch cannot retarget an in-flight write.
      dataClient = next && makeClient ? makeClient(config.url, config.key, { accessToken: async () => session.access_token, global: { fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(15000) }) } }) : client;
      if ((next?.id || null) === (user?.id || null)) return;
      generation++; clearTimeout(timer); user = next; failure = 0; remoteKnown = false;
      state = user ? loadAccount(user.id) : { base: {}, values: {}, version: 0, dirty: false, conflict: null };
      show();
      try { persist(); } catch { localError(); return; }
      emit(user ? 'loading' : 'local', user ? '正在读取这个账号的云端进度…' : '进度已保存在本机，登录后可开启云同步。');
      if (user) schedule(0);
    }
    function setMany(patch) {
      patch = clean(patch);
      if (!Object.keys(patch).length) return true;
      if (user) {
        const saved = loadAccount(user.id);
        if (!memoryOnly && saved.version >= state.version && !state.conflict) state = saved;
        state.values = { ...state.values, ...patch }; state.dirty = true; values = { ...state.values };
      } else { values = { ...values, ...patch }; guest = { ...values }; }
      try { persist(); } catch { options.onProgress?.({ ...values }); localError(); return false; }
      options.onProgress?.({ ...values });
      emit(user ? (state.conflict ? 'conflict' : 'pending') : 'local', user ? '本机已保存，等待同步。' : '进度已保存在本机。');
      if (user && !state.conflict) schedule();
      return true;
    }
    function set(id, value) {
      if (!ids.has(id) || !valid(value, id)) return false;
      return setMany({ [id]: value });
    }
    function resetAll() { return setMany(Object.fromEntries([...ids].map(id => [id, false]))); }
    async function syncNow() {
      if (!client || !user || stopped) return;
      if (options.canSync && !options.canSync()) { schedule(500); return; }
      if (working) { schedule(500); return; }
      working = true;
      const epoch = generation, account = user.id, transport = dataClient || client;
      const current = () => epoch === generation && account === user?.id;
      try {
        emit('syncing', '正在同步…');
        const result = await transport.from('phd_roadmap_progress').select(field + ',' + versionField).eq('user_id', account).maybeSingle();
        if (!current()) return;
        if (result.error) throw result.error;
        const remote = { values: clean(result.data?.[field]), version: Number(result.data?.[versionField] || 0) };
        remoteKnown = true;
        // Re-read local edits made by another tab while the request was in flight.
        const saved = loadAccount(account);
        if (!memoryOnly && saved.version >= state.version && !state.conflict) state = saved;
        if (!state.dirty || equal(state.values, remote.values)) {
          state = { base: remote.values, values: remote.values, version: remote.version, dirty: false, conflict: null };
        } else if (remote.version !== state.version && !(state.version === 0 && Object.keys(remote.values).length === 0)) {
          state.conflict = remote;
        } else {
          // The other payload may have created an otherwise empty row first.
          // Rebase only the empty initial snapshot; any substantive remote edit remains a conflict.
          state.version = remote.version;
          const sent = { ...state.values };
          const response = await transport.rpc(options.rpc || 'phd_save_progress', { expected_version: state.version, [options.argument || 'next_progress']: sent });
          if (!current()) return;
          if (response.error) throw response.error;
          const row = Array.isArray(response.data) ? response.data[0] : response.data;
          if (!row?.applied) {
            state.conflict = { values: clean(row?.[field]), version: Number(row?.[versionField] || 0) };
          } else {
            const latest = loadAccount(account);
            const latestValues = !memoryOnly && latest.version >= state.version ? latest.values : state.values;
            // The server may retain newer lesson keys omitted by a cached older client.
            // Show those returned keys immediately, retaining edits made during this request.
            state.base = clean(row[field]); state.values = { ...state.base, ...latestValues };
            state.version = Number(row[versionField]);
            state.dirty = !equal(state.values, state.base); state.conflict = null;
          }
        }
        persist(); show(); failure = 0;
        if (state.conflict) emit('conflict', '另一台设备更新过进度。请先选择保留哪份，避免覆盖。');
        else if (state.dirty) { emit('pending', '本机已保存，等待同步。'); schedule(300); }
        else { emit('ready', '云端已同步 · 仅此账号可见'); schedule(30000); }
      } catch (error) {
        if (current()) {
          emit('error', '暂未同步成功；本机记录保留。请检查网络或重新登录后重试。');
          schedule(Math.min(60000, 2000 * 2 ** Math.min(++failure, 5)));
        }
      } finally { working = false; }
    }
    function start() {
      if (starting) return starting;
      if (client) return Promise.resolve();
      starting = startInternal().finally(() => { starting = null; });
      return starting;
    }
    async function startInternal() {
      try { if(protectedIds.size)write(SIDECAR+'guest',protectedPart(guest)); write(GUEST, guest); mirror(); } catch { localError(); }
      if (!configured && !options.client) { emit('local', '进度保存在本机；云端同步待启用。'); return; }
      emit('loading', '正在连接云端…');
      try {
        if (options.acquireClient) {
          const shared = await options.acquireClient(); client = shared.client; makeClient = shared.makeClient;
        } else {
          if (!options.client) makeClient = (await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm')).createClient;
          client = options.client || makeClient(config.url, config.key, {
            auth: { storageKey: 'phd-roadmap-auth-v1', persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
          });
        }
        client.auth.onAuthStateChange((_event, session) => { setTimeout(() => useSession(session), 0); });
        const { data, error } = await client.auth.getSession();
        if (error) throw error;
        await useSession(data.session);
        if (!data.session) emit('signin', '登录本站同步账号后可同步；本机旧进度需手动合并。');
      } catch { emit('error', '云端连接未完成，本机进度仍可使用。'); }
    }
    async function signIn(email, password) {
      await start();
      if (!client) throw new Error('云端暂不可用。');
      const { data, error } = await client.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw new Error('登录失败，请检查现有账号和密码。');
      await useSession(data.session);
    }
    async function signUp(email, password) {
      await start();
      if (!client) throw new Error('云端暂不可用。');
      // Called only by the user's explicit registration form submission.
      // Do not modify shared Auth configuration or automatically import guest progress.
      const { data, error } = await client.auth.signUp({ email: email.trim(), password });
      if (error) throw new Error('注册未完成，请检查邮箱、密码要求，或稍后再试。');
      if (data.session) await useSession(data.session);
      return { needsEmailConfirmation: !data.session, signedIn: !!data.session };
    }
    async function signOut() {
      if (!client) return;
      const { error } = await client.auth.signOut({ scope: 'local' });
      if (error) throw new Error('退出失败，请稍后重试。');
      await useSession(null);
    }
    function importGuest(allowedIds) {
      if (!user || !remoteKnown || state.conflict) return false;
      // Existing remote values, including explicit false, always win this one-time import.
      const imported = allowedIds ? Object.fromEntries(Object.entries(guest).filter(([id]) => allowedIds.has(id))) : guest;
      state.values = { ...imported, ...state.values }; state.dirty = !equal(state.values, state.base);
      values = { ...state.values };
      try { persist(); } catch { localError(); return false; }
      show(); emit('pending', '本机旧进度已合并，等待同步。'); schedule(0); return true;
    }
    function resolveConflict(choice) {
      if (!user || !state.conflict || !['cloud', 'local'].includes(choice)) return false;
      const remote = state.conflict;
      state = { base: remote.values, values: choice === 'cloud' ? remote.values : state.values,
        version: remote.version, dirty: choice === 'local', conflict: null };
      values = { ...state.values };
      try { persist(); } catch { localError(); return false; }
      show(); emit(state.dirty ? 'pending' : 'ready', state.dirty ? '本机版本等待同步。' : '已采用云端版本。'); schedule(0); return true;
    }
    root.addEventListener?.('online', () => schedule(0));
    root.addEventListener?.('focus', () => schedule(0));
    root.addEventListener?.('storage', event => {
      if (user && event.key === PREFIX + user.id) { state = loadAccount(user.id); show(); schedule(0); }
      if (!user && event.key === GUEST) { guest = guestValues(); show(); }
    });
    return { start, acceptSession: useSession,
      conflictDetails: () => state.conflict ? { local: { ...state.values }, remote: { ...state.conflict.values } } : null,
      restoreKeys: keys => setMany(Object.fromEntries(keys.map(id => [id, state.base[id] ?? false]))),
      set, setMany, resetAll, signIn, signUp, signOut, syncNow, importGuest, resolveConflict,
      snapshot: () => ({ ...values }), status: () => ({ ...status }),
      destroy() { stopped = true; generation++; clearTimeout(timer); } };
  }
  // Independent payload CAS streams share one auth session. Old clients write only legacy progress.
  function create(options) {
    const config = options.config || root.PHD_CLOUD_CONFIG || {};
    let sharedPromise;
    const acquireClient = () => sharedPromise ||= (async () => {
      if (options.client) return { client: options.client, makeClient: null };
      const makeClient = (await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm')).createClient;
      return { makeClient, client: makeClient(config.url, config.key, {
        auth: { storageKey: 'phd-roadmap-auth-v1', persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
      }) };
    })();
    // Reused source units point to one canonical legacy lesson; new exercises get their own IDs.
    const learningUnits = options.learningUnits || root.CAREER_CURRICULUM?.learningUnits || [];
    const lessonIds = [...new Set([...(options.lessonIds || (root.COURSE_LESSONS?.courses || []).flatMap(c => c.lessons.map(l => l.id))),
      ...learningUnits.map(u => u.canonicalProgressId || u.progressId || u.id).filter(id => typeof id === 'string' && /^[a-z0-9-]+$/.test(id))])];
    const careerApi = options.careerApi || root.phdCareerProgress;
    if (!lessonIds.length && !careerApi) return createStore(options);
    let statuses = [{}, {}, {}], main, lessons, dates;
    const ranks = { error: 8, conflict: 7, pending: 6, syncing: 5, loading: 4, signin: 3, local: 2, ready: 1 };
    const status = () => {
      const highest = statuses.reduce((a, b) => (ranks[b.mode] || 0) > (ranks[a.mode] || 0) ? b : a, {});
      return { ...highest, canImport: statuses.some((s,i) => i !== 2 && s.canImport), dirty: statuses.some(s => s.dirty), conflict: statuses.some(s => s.conflict) };
    };
    const onStatus = index => value => { statuses[index] = value; options.onStatus?.(status()); };
    const datePart = (values, kind) => Object.fromEntries(Object.entries(values).filter(([k,v]) => k.startsWith(kind + ':') && v !== false).map(([k,v]) => [k.slice(kind.length + 1),v]));
    const onDates = values => options.onCompletionDates?.({ tasks: datePart(values,'task'), lessons: datePart(values,'lesson') });
    main = createStore({ ...options, acquireClient, onStatus: onStatus(0) });
    lessons = createStore({ ...options, acquireClient, ids: lessonIds,
      preserveIds: lessonIds.filter(id => /^(watch|practice)-wa-video-/.test(id)),
      namespace: 'lin-ai-phd-roadmap-lessons-v1', field: 'lessons', versionField: 'lessons_version',
      rpc: 'phd_save_lessons', argument: 'next_lessons', valid: v => v === false || v === 'done' || v === 'skipped',
      onProgress: options.onLessons, onStatus: onStatus(1) });
    const dateIds = [...options.ids.map(id => 'task:' + id), ...lessonIds.map(id => 'lesson:' + id)];
    dates = createStore({ ...options, acquireClient, ids: dateIds,
      preserveIds: lessonIds.filter(id => /^(watch|practice)-wa-video-/.test(id)).map(id=>'lesson:'+id),
      namespace: 'lin-ai-phd-roadmap-completion-dates-v1', field: 'completion_dates', versionField: 'completion_dates_version',
      rpc: 'phd_save_completion_dates', argument: 'next_completion_dates',
      valid: v => v === false || (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v) && Number.isFinite(Date.parse(v))),
      onProgress: onDates, onStatus: onStatus(2),
      canSync: () => statuses.slice(0,2).every(s => s.mode === 'ready' && !s.dirty && !s.conflict) });
    const stores = [main, lessons, dates];
    let career;
    if (careerApi) {
      career = createStore({ ...options, acquireClient, ids: careerApi.ids,
        namespace: 'lin-ai-phd-roadmap-career-v1', field: 'career_state', versionField: 'career_state_version',
        rpc: 'phd_save_career_state', argument: 'next_career_state', clean: careerApi.clean, valid: careerApi.valid,
        onProgress: () => { careerApi.notify(); options.onCareer?.(careerApi.read()); }, onStatus: onStatus(3) });
      careerApi.attach(career); stores.push(career);
    }
    const refreshSession = async () => {
      const { client } = await acquireClient();
      const { data, error } = await client.auth.getSession();
      if (error) throw error;
      await Promise.all(stores.map(s => s.acceptSession(data.session)));
    };
    const wrapAuth = method => async (...args) => {
      await Promise.all(stores.map(s => s.start()));
      const result = await main[method](...args); await refreshSession(); return result;
    };
    const now = () => new Date(options.now ? options.now() : Date.now()).toISOString();
    function setTask(id, value) {
      if (!options.ids.includes(id) || typeof value !== 'boolean') return false;
      const before = main.snapshot()[id];
      // Historical true values without a recorded date remain unknown. Never backfill today.
      const savedDate = value ? (before !== true ? dates.set('task:' + id, now()) : true) : dates.set('task:' + id, false);
      return main.set(id, value) && savedDate;
    }
    function setLesson(id, value) {
      if (!lessonIds.includes(id) || ![null, false, 'done', 'skipped'].includes(value)) return false;
      const before = lessons.snapshot()[id];
      const savedDate = value === 'done' ? (before !== 'done' ? dates.set('lesson:' + id, now()) : true) : dates.set('lesson:' + id, false);
      return lessons.set(id, value === null ? false : value) && savedDate;
    }
    return { ...main,
      start: () => { onDates(dates.snapshot()); return Promise.all(stores.map(s => s.start())); },
      signIn: wrapAuth('signIn'), signUp: wrapAuth('signUp'), signOut: wrapAuth('signOut'),
      set: setTask,
      setMany: patch => Object.entries(patch || {}).map(([id,value]) => setTask(id,value)).every(Boolean),
      resetAll: () => options.ids.map(id => setTask(id,false)).every(Boolean),
      lessonSnapshot: lessons.snapshot, setLesson,
      taskCompletedAtSnapshot: () => datePart(dates.snapshot(),'task'),
      lessonCompletedAtSnapshot: () => datePart(dates.snapshot(),'lesson'),
      syncNow: async () => { await Promise.all([main.syncNow(), lessons.syncNow(), ...(career ? [career.syncNow()] : [])]); await dates.syncNow(); },
      careerSnapshot: () => careerApi?.read() || null,
      importGuest: () => {
        if (status().conflict || !status().canImport || statuses.some(s => ['loading','syncing','error'].includes(s.mode))) return false;
        const taskValues = main.snapshot(), lessonValues = lessons.snapshot();
        const allowedDates = new Set([...options.ids.filter(id => !(id in taskValues)).map(id => 'task:' + id),
          ...lessonIds.filter(id => !(id in lessonValues)).map(id => 'lesson:' + id)]);
        // Never attach a guest date to an existing cloud completion whose date is unknown.
        const a = main.importGuest(), b = lessons.importGuest(), c = dates.importGuest(allowedDates);
        const d = career ? career.importGuest() : true;
        return a && b && c && d;
      },
      resolveConflict: choice => {
        const changed = [];
        if (choice === 'cloud') for (const [kind, store] of [['task',main],['lesson',lessons]]) {
          const conflict = store.conflictDetails();
          if (conflict) for (const id of new Set([...Object.keys(conflict.local),...Object.keys(conflict.remote)]))
            if (conflict.local[id] !== conflict.remote[id]) changed.push(kind + ':' + id);
        }
        const dateConflict = dates.conflictDetails();
        const results = stores.map(s => s.resolveConflict(choice));
        if (choice === 'cloud' && !dateConflict && changed.length) dates.restoreKeys(changed);
        return results.some(Boolean);
      },
      status, destroy: () => stores.forEach(s => s.destroy())
    };
  }
  root.PhdCloud = { create };
  if (typeof module !== 'undefined') module.exports = { create };
})(typeof window === 'undefined' ? globalThis : window);

