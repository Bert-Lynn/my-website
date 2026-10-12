# Independent video and practice progress

The unified task list adds seven video resources, each with two independent lesson keys:

- `watch-<video resource id>` records explicitly completed viewing.
- `practice-<video resource id>` records explicitly completed practice.
- `lesson:<progress key>` stores that activity's actual completion timestamp in the existing completion-date map.

The fourteen keys are exported as `UnifiedTasks.progressIds`. Watching, practicing, project delivery, old lesson completion and skill assessment never imply one another's completion.

## Minimal database change

The reviewed SQL expands only `phd_lessons_shape` from 83 to 97 allowed keys and `phd_completion_dates_shape` from 130 to 144. Every old identity and all existing value-type and payload-size checks remain unchanged. It does not rewrite user records, backfill completion, modify functions, add tables, or change Auth settings, RLS or grants.

The existing `phd_save_lessons` and `phd_save_completion_dates` functions already provide independent versions, compare-and-swap conflicts and patch merging. Omitted keys survive older clients and empty saves. Explicit `false` values remain undo tombstones. Re-completion is explicit and supplies a new timestamp only for that activity.

## Preparation and verification

The applied migration is `20261012165051_phd_unified_video_progress.sql`, confirmed in the hosted migration history on 2026-10-12. The preparation environment has no Supabase CLI, so the file was initially a clearly named draft; its canonical filename uses the exact version returned by the approved hosted migration, rather than an invented timestamp. The file preserves the exact SQL submitted, including its preparation-time comments.

Apply the schema before publishing a UI that writes the new keys. The change uses a five-second lock timeout and thirty-second statement timeout; failure should roll back the transaction. Do not narrow the allowlists again after users have saved the new keys: retain this additive schema if rolling the UI back.

Checks:

1. `node --test tests/unified-video-sql.test.cjs` verifies exact old/new ID preservation and the narrow SQL scope.
2. `verify_unified_video_expressions.sql` is read-only and evaluates the proposed expressions against synthetic JSON. It passed 622 cases on 2026-10-12 (311 lesson cases and 311 date cases).
3. After migration, `verify_unified_video_progress.sql` exercises the actual RPCs with two randomly generated synthetic identities in a single rolled-back transaction. It passed on 2026-10-12, checking all 97/144 identities, invalid IDs/types, merging, empty saves, undo, re-completion, stale versions, watch/practice independence, other progress streams and existing owner isolation. No existing user's progress was selected or updated.

The integration test completed with `ROLLBACK`. A separate query restricted to the two returned random test IDs confirmed zero remaining rows in both `auth.users` and `phd_roadmap_progress`. Post-migration schema introspection confirmed exactly 97 and 144 allowed keys, both constraints validated, and every other CHECK definition unchanged. Before/after fingerprints of table RLS/ACLs, policies, progress functions and function ACLs matched. Auth configuration was not modified. Security-advisor findings were unchanged from before this migration.

Re-running the rollback-only integration check requires explicit execution approval because it temporarily creates synthetic records. Do not substitute a real user's ID or inspect their progress during verification.
