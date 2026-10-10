# Lesson and completion-date extension

Status: Applied and verified on 2026-10-10 after renewed authorization. Migration version: `20261010104000`, name: `phd_private_lessons_and_completion_dates`. The earlier cancelled attempt was confirmed not to have added columns before this migration ran.

## Compatibility and privacy

The existing `phd_roadmap_progress.progress`, `version`, `phd_save_progress`, RLS policies and Auth configuration remain unchanged. Two independently versioned payloads are added to the same private owner row:

- `lessons`: 53 stable catalog keys, values `"done"`, `"skipped"`, or `false` (undo tombstone); `lessons_version` starts at zero.
- `completion_dates`: `task:<legacy ID>` or `lesson:<lesson ID>`, canonical UTC ISO timestamp string or `false`; `completion_dates_version` starts at zero.

Both new RPCs use SECURITY INVOKER, empty search_path, auth.uid ownership, and compare-and-swap. Only authenticated users can execute them. No broader row access or other app tables are involved. Old clients cannot erase lesson/date payloads, and no old completion is mapped to a new lesson or fabricated date.

The applied SQL is `20261010104000_phd_private_lessons_and_completion_dates.sql`. `verify_lessons.sql` passed against the live database using isolated synthetic accounts and ended in ROLLBACK. No real user progress was read or altered by these tests.

## Browser API

`PhdCloud.create` keeps the old task API and adds:

- `lessonSnapshot()` → `{lessonId: "done" | "skipped" | false}`
- `setLesson(id, "done" | "skipped" | null)`; null is persisted as false.
- `taskCompletedAtSnapshot()` / `lessonCompletedAtSnapshot()` → `{id: ISOString}`. Missing is unknown.
- `onLessons(values)` and `onCompletionDates({tasks, lessons})` callbacks.
- `lessonIds` option; defaults to the loaded COURSE_LESSONS catalog.
- `now()` test option for deterministic completion timestamps.

A transition from incomplete to complete records browser time. Repeating completion never manufactures dates for historical records. Undo and skip revoke the timestamp; completing again records a new time.

All three streams share a single Auth client. Each has a separate namespaced local outbox and account cache. Guest records are imported only by the explicit import action, after remote reads have completed. Existing cloud values, including false and completions with unknown dates, win imports. Date imports are limited to IDs whose states are actually newly imported.

Status reports the highest-severity state of all three streams; a task-ready status cannot conceal a pending lesson or date write. Completion dates wait until state streams are synchronized. These are independently versioned writes, not a single atomic multi-payload transaction; interruption leaves the outbox pending rather than claiming full sync. Conflicts require an explicit choice; accepting cloud state restores corresponding unsynced date edits.

## Local verification

`node --test tests/cloud-sync.test.cjs tests/lesson-sync.test.cjs`

Covers existing storage compatibility, no implicit import, true/false updates, pending reload, lesson statuses, account isolation, logout, conflicts, aggregate failures, historic unknown dates, and timestamp undo. Database transaction tests passed for old-client compatibility, lesson/date CAS, false/skip/undo, malformed payload rejection, cross-account isolation and anonymous denial. Security Advisor reported no findings on the doctoral progress table or functions; unrelated existing research-radar INFO findings and the shared Auth leaked-password-protection warning were left unchanged.
