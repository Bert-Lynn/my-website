-- Only one synthetic random user is created inside this rolled-back transaction.
-- Verifies that omitted keys never erase legacy/new values or timestamps.
begin;
select set_config('phd.merge.test.id',gen_random_uuid()::text,true);
insert into auth.users(id) values(current_setting('phd.merge.test.id')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('phd.merge.test.id'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.merge.test.id'),'role','authenticated')::text,true);
do $$
declare r record; d record; expected_lessons jsonb; expected_dates jsonb;
begin
  select * into r from public.phd_save_lessons(0,'{"python-basics":"done","python-control":"skipped","u-sql-select":"done"}');
  assert r.applied and r.lessons_version=1,'fixture lessons failed';
  select * into d from public.phd_save_completion_dates(0,'{"task:sep-python":"2026-10-10T10:00:00.000Z","lesson:python-basics":"2026-10-10T10:01:00.000Z","lesson:python-control":false,"lesson:u-sql-select":"2026-10-10T10:02:00.000Z"}');
  assert d.applied and d.completion_dates_version=1,'fixture dates failed';
  -- A partial caller changes only one legacy key. Other legacy and new keys must survive.
  select * into r from public.phd_save_lessons(1,'{"python-basics":false}');
  expected_lessons := '{"python-basics":false,"python-control":"skipped","u-sql-select":"done"}';
  assert r.applied and r.lessons_version=2 and r.lessons=expected_lessons,'partial legacy update erased omitted lesson keys';
  select * into d from public.phd_save_completion_dates(1,'{"lesson:python-basics":false}');
  expected_dates := '{"task:sep-python":"2026-10-10T10:00:00.000Z","lesson:python-basics":false,"lesson:python-control":false,"lesson:u-sql-select":"2026-10-10T10:02:00.000Z"}';
  assert d.applied and d.completion_dates_version=2 and d.completion_dates=expected_dates,'partial legacy date update erased omitted dates/tombstones';
  -- An empty object no longer means erase. Current and known older UIs send false to undo.
  select * into r from public.phd_save_lessons(2,'{}');
  assert r.applied and r.lessons_version=3 and r.lessons=expected_lessons,'empty map erased lesson keys';
  select * into d from public.phd_save_completion_dates(2,'{}');
  assert d.applied and d.completion_dates_version=3 and d.completion_dates=expected_dates,'empty map erased date keys';
  select * into r from public.phd_save_lessons(3,'{"u-sql-select":false}');
  expected_lessons := jsonb_set(expected_lessons,'{u-sql-select}','false');
  assert r.applied and r.lessons_version=4 and r.lessons=expected_lessons,'new explicit undo lost legacy data';
  select * into d from public.phd_save_completion_dates(3,'{"lesson:u-sql-select":false}');
  expected_dates := jsonb_set(expected_dates,'{lesson:u-sql-select}','false');
  assert d.applied and d.completion_dates_version=4 and d.completion_dates=expected_dates,'new date undo lost legacy data/tombstones';
  -- Merge does not bypass CAS: stale callers cannot re-complete an undone value.
  select * into r from public.phd_save_lessons(3,'{"python-basics":"done","u-sql-select":"done"}');
  assert not r.applied and r.lessons_version=4 and r.lessons=expected_lessons,'stale lesson patch applied';
  select * into d from public.phd_save_completion_dates(3,'{"lesson:u-sql-select":"2026-10-10T10:03:00.000Z"}');
  assert not d.applied and d.completion_dates_version=4 and d.completion_dates=expected_dates,'stale date patch applied';
  select * into r from public.phd_save_lessons(4,'{"python-basics":"done"}');
  expected_lessons := jsonb_set(expected_lessons,'{python-basics}','"done"');
  assert r.applied and r.lessons_version=5 and r.lessons=expected_lessons,'recompletion failed to preserve other keys';
  select * into d from public.phd_save_completion_dates(4,'{"lesson:python-basics":"2026-10-10T10:04:00.000Z"}');
  expected_dates := jsonb_set(expected_dates,'{lesson:python-basics}','"2026-10-10T10:04:00.000Z"');
  assert d.applied and d.completion_dates_version=5 and d.completion_dates=expected_dates,'new timestamp lost unrelated history';
  -- Existing reset conventions send explicit false per key, which still work.
  select * into r from public.phd_save_lessons(5,'{"python-basics":false,"python-control":false,"u-sql-select":false}');
  assert r.applied and r.lessons_version=6 and r.lessons='{"python-basics":false,"python-control":false,"u-sql-select":false}'::jsonb,'explicit reset convention broken';
  select * into d from public.phd_save_completion_dates(5,'{"task:sep-python":false,"lesson:python-basics":false,"lesson:python-control":false,"lesson:u-sql-select":false}');
  assert d.applied and d.completion_dates_version=6 and d.completion_dates='{"task:sep-python":false,"lesson:python-basics":false,"lesson:python-control":false,"lesson:u-sql-select":false}'::jsonb,'explicit date reset broken';
  begin
    perform public.phd_save_lessons(6,'{"unknown-key":"done"}');
    raise exception 'unknown lesson accepted';
  exception when check_violation then null;
  end;
  begin
    perform public.phd_save_completion_dates(6,'{"lesson:unknown-key":false}');
    raise exception 'unknown date accepted';
  exception when check_violation then null;
  end;
end $$;
reset role;
select 'PASS: partial and empty saves retain all omitted legacy/new lessons, task/lesson timestamps and false tombstones; explicit undo/reset and re-completion work; stale CAS and invalid keys rejected; only synthetic data, rolled back' as result;
rollback;
