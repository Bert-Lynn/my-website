# Private roadmap sync

## Schema

- `001_private_progress.sql` defines a private per-user progress table and a SECURITY INVOKER compare-and-swap function.
- `002_agent_task_ids.sql` extends validation to the six EnterpriseAgentLab task IDs. Existing task IDs remain valid.
- Row-level security limits each row to its authenticated owner. Anonymous table and function access is denied.
- `verify_rls.sql` uses synthetic identities within a rolled-back transaction to check owner access, cross-user denial, false values, and stale-version conflict handling.

The public website config must contain only the project URL and publishable key. Never include secret or service-role credentials. Project Auth settings are managed separately.

## Client contract

Load `cloud-config.js`, `cloud-sync.js`, and then `app.js`.

`PhdCloud.create({ids, onProgress, onStatus})` returns:

- `snapshot()`, `status()`, `start()`
- `set(id, bool)`, `setMany(patch)`, `resetAll()`
- `signIn(email, password)`, `signUp(email, password)`, `signOut()`
- `syncNow()`, `importGuest()`, `resolveConflict('cloud' | 'local')`

Local-first writes return a boolean for local persistence success. Sync status separately indicates whether cloud persistence is complete. Pending changes survive refresh and are retried with backoff. Conflicts require an explicit choice rather than silently replacing newer progress.

The original `lin-ai-phd-roadmap-progress-v1` key remains a compatible boolean-map mirror. Guest and account-specific namespaces prevent automatic guest imports or account mixing. First login requires the user to explicitly choose “合并本机已有进度” if desired; existing cloud values, including false, take precedence over imported guest values.

Registration is performed by the user in their own browser. No password is written into progress storage or logs. If email confirmation is required, the user should return to the roadmap and sign in after confirming. This site does not change shared project redirect settings.

## Testing

```sh
node --check cloud-sync.js
node tests/cloud-sync.test.cjs
node tests/app.test.cjs
node tests/auth-ui.test.cjs
```

These client tests use mocks and do not create production accounts or send emails. Live database isolation is verified separately with the transactional SQL script. Browser login and email delivery depend on the configured project's Auth settings.
