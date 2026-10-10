# Private career self-assessments

The existing owner-only `public.phd_roadmap_progress` row has a fourth independent payload:

- `career_state jsonb`, empty by default, at most 512 KiB
- `career_state_version bigint`, initially 0
- `phd_save_career_state(expected_version, next_career_state)` returns `applied`, current payload and version

The remote migration `20261010111351_phd_private_career_assessments` was applied and verified on 2026-10-10. This checked-in SQL is the exact migration body; the version comes from the remote migration history. The existing task, lesson and completion-date fields/RPCs, table grants, Auth configuration and owner-only SELECT/INSERT/UPDATE RLS policies were not changed. Only the two new functions have explicit authenticated-only execute permissions. Both functions are security invoker, use an empty search path and have no credential or role-management behavior.

## Browser contract

Load `career-state.js` before `cloud-sync.js`. The adapter exposes `window.phdCareerProgress`; `PhdCloud.create` attaches its local-first store and shares the existing auth session. Node tests can inject `careerApi: require('./career-state.js').create()`.

- `read()` returns `{selectedRole, skills, milestones}`. Missing skill/milestone records mean no recorded self-assessment, not completion.
- `setRole(roleId)` selects one of the five public role families.
- `setSkill(skillId, assessment)` records a user self-assessment. Levels: `untested`, `learning`, `practicing`, `passed`. Four named criteria each score 0–4; the overall score is recomputed. Passed requires all four criteria at 4 plus evidence URL or note. The record is always `self_assessed`, never external verification or a hiring probability.
- `setMilestone(projectId, milestoneId, {status,evidenceUrl,completedAt})` records `todo`, `doing` or `done`. New done transitions get the actual browser timestamp. Existing unknown dates stay unknown.
- `careerprogresschange` emits a new read snapshot after account changes, edits, import or synchronization.

Evidence URLs permit only credential-free HTTP(S); notes are capped at 2,000 characters and URLs at 2,048. Attempt history holds at most the previous five assessments. Actual changed assessment submissions receive a timestamp; repeat saves do not fabricate another attempt/date. UI text must still be escaped before rendering.

Internally, public stable identifiers are flat keys (`selectedRole`, `skill:<id>`, `milestone:demand-decision-lab:<id>`), allowing the same durable CAS/conflict and explicit guest-import behavior as other streams. No personal evidence belongs in curriculum files, source code or public repository commits. Evidence links are saved privately; adding one does not upload, fetch or share the artifact with a third party. Users should not paste passwords, access tokens or other secrets into notes/URLs.

## Compatibility and verification

Lessons, diagnostic skipping and old milestone booleans do not set skills or claim mastery. Career edits do not update lesson/task completion. All streams share one auth session but independent CAS versions; old clients cannot overwrite new evidence. A stale dirty device must explicitly choose cloud or local data before replacing a newer remote payload. Guest data is isolated from accounts and imported only through the existing explicit user action. Offline edits stay in the per-account durable outbox.

Run:

- `node tests/cloud-sync.test.cjs`
- `node tests/lesson-sync.test.cjs`
- `node tests/career-state.test.cjs`

`verify_career.sql` is a live database test with two synthetic random users and an unconditional final transaction rollback. It verifies legacy RPC compatibility, fourth-stream CAS rejection, invalid/forged records, anonymous denial and account isolation. The successful run on 2026-10-10 touched no existing user records and persisted no test users or evidence. These tests do not imply a real user's browser sign-in has been performed.

## New granular learning exercises

Migration `20261010111945_phd_career_learning_units` expands the existing lesson and completion-date validation to 30 new canonical `u-*` exercise IDs. The original 53 lessons remain unchanged, for 83 independent learning-progress keys overall. Curriculum `relatedLessonIds` are contextual links only: their reading scopes and required exercises differ, so neither set marks the other complete. Role/track filtering changes display only and never resets any records.

The lesson store automatically includes `CAREER_CURRICULUM.learningUnits[].canonicalProgressId` (falling back to unit ID), and `setLesson(unitId, 'done' | 'skipped' | false)` uses the existing durable offline, account-isolated, independently versioned lesson stream. Learning completion never changes skill self-assessments. Unchecking sends false for both the unit and its recorded completion timestamp.

Cached older browsers do not know the new IDs. Both lesson and date RPCs now retain ALL existing keys when a caller omits them, including original lessons, new units, task dates, lesson dates and explicit false tombstones. Explicit false values still override normally. CAS checks, signatures, version streams and owner-only permissions remain unchanged. An empty object is now a no-op payload rather than a clear operation. No real-user progress is backfilled.

The live synthetic rollback regression `verify_career_units.sql` passed for all 30 IDs, their dates, old-client round-trips, new-unit undo and persistent false tombstones, stale CAS, diagnostic independence and absence of fabricated mastery. Browser UI interaction verification is a separate integration check.

`node tests/career-unit-ui.test.cjs` also passes through the actual full app script stack: a rendered checkbox's bound handler saves a new SQL unit, role switching retains it, a fresh app reload restores it, undo survives another reload, and original lessons/tasks/skills remain unmodified. This VM integration test verifies UI wiring and persistence; it does not substitute for visual browser QA or claim a real-user cloud login.


## Merge-preserving correction before first publication

Remote migration `20261010113029_phd_preserve_all_progress_keys` replaces only the two lesson/date RPC definitions. Their updates use `p.lessons || next_lessons` and `p.completion_dates || next_completion_dates`: incoming explicitly named keys replace those same keys; every omitted key is retained. It does not issue a standalone UPDATE, DELETE, data migration, Auth change, grant or policy change. Existing records are not rewritten by applying this correction.

The earlier remote migration `20261010111945` preserved only newly added keys when an incoming snapshot omitted data, retaining the prior full-snapshot semantics for original keys. Prepublication review identified the safer partial-payload behavior. Its still-unpublished source file was updated to use the final merge-preserving definitions, and the separate correction above records the actual subsequent remote change. This means the revised source file intentionally reflects the safe first-published state rather than claiming byte-for-byte identity with the initially applied remote body.

Compatibility was checked against both current `cloud-sync.js` and the earlier lesson-enabled preview: lesson undo converts null to explicit false; task reset writes false per task; completion-date undo writes false. No supported UI relies on omitting a key or sending `{}` to clear these streams. Users can still undo/reset through explicit false tombstones.

`verify_merge_preservation.sql` passed live using one random synthetic user inside a rolled-back transaction. It starts with two original lessons and a new unit, changes only one original key, and proves the other original/new records survive. It repeats the checks for original task/lesson timestamps, new unit dates and existing false tombstones; tests empty payloads, explicit undo, full explicit reset, re-completion, stale CAS and unknown-ID rejection. No existing user records or test fixtures are persisted.
