/* Local-first private progress. No credentials or personal progress ship in this file. */
(function (root) {
  'use strict';
  const LEGACY = 'lin-ai-phd-roadmap-progress-v1';
  const GUEST = LEGACY + ':guest';
  const OWNER = LEGACY + ':owner';
  const PREFIX = LEGACY + ':account:';
  const equal = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
  function create(options) {
    const ids = new Set(options.ids);
    const storage = options.storage || root.localStorage;
    const config = options.config || root.PHD_CLOUD_CONFIG || {};
    const clean = value => Object.fromEntries(Object.entries(value || {}).filter(([id, v]) => ids.has(id) && typeof v === 'boolean'));
    const read = (key, fallback) => { try { return JSON.parse(storage.getItem(key)) || fallback; } catch { return fallback; } };
    const write = (key, value) => storage.setItem(key, JSON.stringify(value));
    let user = null, client = null, makeClient = null, dataClient = null, generation = 0, timer = null, working = false, stopped = false, failure = 0;
    let state = { base: {}, values: {}, version: 0, dirty: false, conflict: null };
    let guest = clean(read(GUEST, read(OWNER, null) ? {} : read(LEGACY, {})));
    let values = { ...guest };
    let status = {};
    let starting = null, memoryOnly = false;
    const configured = !!(config.url && config.key && config.enabled);
    function emit(mode, message) {
      status = { mode, message, email: user?.email || '', userId: user?.id || '', configured,
        canImport: !!user && Object.keys(guest).some(id => !(id in state.values)),
        dirty: state.dirty, conflict: !!state.conflict };
      options.onStatus?.({ ...status });
    }
    function mirror() {
      write(OWNER, user?.id || null);
      write(LEGACY, values);
    }
    function persist() {
      memoryOnly = true;
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
      return { base: clean(saved.base), values: clean(saved.values), version: Number.isSafeInteger(saved.version) ? saved.version : 0,
        dirty: !!saved.dirty, conflict: saved.conflict || null };
    }
    async function useSession(session) {
      const next = session?.user || null;
      // Bind each data request to one captured identity; a login switch cannot retarget an in-flight write.
      dataClient = next && makeClient ? makeClient(config.url, config.key, { accessToken: async () => session.access_token, global: { fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(15000) }) } }) : client;
      if ((next?.id || null) === (user?.id || null)) return;
      generation++; clearTimeout(timer); user = next; failure = 0;
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
      if (!ids.has(id) || typeof value !== 'boolean') return false;
      return setMany({ [id]: value });
    }
    function resetAll() { return setMany(Object.fromEntries([...ids].map(id => [id, false]))); }
    async function syncNow() {
      if (!client || !user || stopped) return;
      if (working) { schedule(500); return; }
      working = true;
      const epoch = generation, account = user.id, transport = dataClient || client;
      const current = () => epoch === generation && account === user?.id;
      try {
        emit('syncing', '正在同步…');
        const result = await transport.from('phd_roadmap_progress').select('progress,version').eq('user_id', account).maybeSingle();
        if (!current()) return;
        if (result.error) throw result.error;
        const remote = { values: clean(result.data?.progress), version: Number(result.data?.version || 0) };
        // Re-read local edits made by another tab while the request was in flight.
        const saved = loadAccount(account);
        if (!memoryOnly && saved.version >= state.version && !state.conflict) state = saved;
        if (!state.dirty || equal(state.values, remote.values)) {
          state = { base: remote.values, values: remote.values, version: remote.version, dirty: false, conflict: null };
        } else if (remote.version !== state.version) {
          state.conflict = remote;
        } else {
          const sent = { ...state.values };
          const response = await transport.rpc('phd_save_progress', { expected_version: state.version, next_progress: sent });
          if (!current()) return;
          if (response.error) throw response.error;
          const row = Array.isArray(response.data) ? response.data[0] : response.data;
          if (!row?.applied) {
            state.conflict = { values: clean(row?.progress), version: Number(row?.version || 0) };
          } else {
            const latest = loadAccount(account);
            state.values = !memoryOnly && latest.version >= state.version ? latest.values : state.values;
            state.base = clean(row.progress); state.version = Number(row.version);
            state.dirty = !equal(state.values, sent); state.conflict = null;
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
      try { write(GUEST, guest); mirror(); } catch { localError(); }
      if (!configured && !options.client) { emit('local', '进度保存在本机；云端同步待启用。'); return; }
      emit('loading', '正在连接云端…');
      try {
        if (!options.client) makeClient = (await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/+esm')).createClient;
        client = options.client || makeClient(config.url, config.key, {
          auth: { storageKey: 'phd-roadmap-auth-v1', persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
        });
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
    function importGuest() {
      if (!user || state.conflict) return false;
      // Existing remote values, including explicit false, always win this one-time import.
      state.values = { ...guest, ...state.values }; state.dirty = !equal(state.values, state.base);
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
      if (!user && event.key === GUEST) { guest = clean(read(GUEST, {})); show(); }
    });
    return { start, set, setMany, resetAll, signIn, signUp, signOut, syncNow, importGuest, resolveConflict,
      snapshot: () => ({ ...values }), status: () => ({ ...status }),
      destroy() { stopped = true; generation++; clearTimeout(timer); } };
  }
  root.PhdCloud = { create };
  if (typeof module !== 'undefined') module.exports = { create };
})(typeof window === 'undefined' ? globalThis : window);
