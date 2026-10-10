-- Synthetic-only regression for granular career-unit progress and cached old clients.
begin;
select set_config('phd.unit.test.id',gen_random_uuid()::text,true);
insert into auth.users(id) values(current_setting('phd.unit.test.id')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('phd.unit.test.id'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.unit.test.id'),'role','authenticated')::text,true);
do $$
declare r record; d record; p record; all_units jsonb; all_dates jsonb;
begin
  select * into r from public.phd_save_lessons(0,'{"u-sql-select":"done"}');
  assert r.applied and r.lessons_version=1 and r.lessons->>'u-sql-select'='done','new SQL unit did not save';
  select * into d from public.phd_save_completion_dates(0,'{"lesson:u-sql-select":"2026-10-10T11:00:00.000Z"}');
  assert d.applied and d.completion_dates_version=1,'new unit date did not save';
  -- An old cached browser knows only the original 53 IDs and drops new keys from its outgoing map.
  select * into r from public.phd_save_lessons(1,'{"python-basics":"done"}');
  assert r.applied and r.lessons_version=2 and r.lessons->>'u-sql-select'='done' and r.lessons->>'python-basics'='done','old client erased new unit';
  select * into d from public.phd_save_completion_dates(1,'{"lesson:python-basics":"2026-10-10T11:01:00.000Z"}');
  assert d.applied and d.completion_dates_version=2 and d.completion_dates->>'lesson:u-sql-select'='2026-10-10T11:00:00.000Z','old client erased new unit timestamp';
  select * into r from public.phd_save_lessons(1,'{}');
  assert not r.applied and r.lessons_version=2 and r.lessons->>'u-sql-select'='done','stale caller overwrote new unit';
  -- An explicit new-client uncheck clears completion and its timestamp with durable false tombstones.
  select * into r from public.phd_save_lessons(2,'{"python-basics":"done","u-sql-select":false}');
  assert r.applied and r.lessons_version=3 and r.lessons->'u-sql-select'='false'::jsonb,'new unit undo failed';
  select * into d from public.phd_save_completion_dates(2,'{"lesson:python-basics":"2026-10-10T11:01:00.000Z","lesson:u-sql-select":false}');
  assert d.applied and d.completion_dates_version=3 and d.completion_dates->'lesson:u-sql-select'='false'::jsonb,'new unit date undo failed';
  select * into r from public.phd_save_lessons(3,'{"python-basics":false}');
  assert r.applied and r.lessons_version=4 and r.lessons->'u-sql-select'='false'::jsonb,'old client removed new unit tombstone';
  select * into d from public.phd_save_completion_dates(3,'{"lesson:python-basics":false}');
  assert d.applied and d.completion_dates_version=4 and d.completion_dates->'lesson:u-sql-select'='false'::jsonb,'old client removed date tombstone';
  select * into r from public.phd_save_lessons(4,'{"python-basics":false,"u-python-diagnostic":"done"}');
  assert r.applied and r.lessons_version=5 and r.lessons->'python-basics'='false'::jsonb and not r.lessons ? 'python-control','diagnostic falsely completed related old lessons';
  select * into p from public.phd_roadmap_progress where user_id=current_setting('phd.unit.test.id')::uuid;
  assert p.career_state='{}'::jsonb and p.career_state_version=0 and p.progress='{}'::jsonb,'unit completion promoted skill mastery or task progress';
  begin
    perform public.phd_save_lessons(5,'{"u-unknown":"done"}');
    raise exception 'unknown unit accepted';
  exception when check_violation then null;
  end;
  select jsonb_object_agg(id,'done'::text),jsonb_object_agg('lesson:'||id,false) into all_units,all_dates
    from unnest(array['u-ai-spec','u-python-diagnostic','u-git','u-debug','u-data-card','u-pandas','u-sql-select','u-sql-join','u-sql-window','u-metrics','u-uncertainty','u-leakage','u-baselines','u-lagged','u-tscv','u-or-mip','u-or-scheduling','u-decision-eval','u-pytest','u-test-param','u-api','u-api-testing','u-docker','u-ci','u-agent-tools','u-agent-loop','u-agent-evals','u-algo','u-interview','u-torch']) as id;
  select * into r from public.phd_save_lessons(5,all_units);
  assert r.applied and r.lessons_version=6,'full 30-unit whitelist rejected';
  select * into d from public.phd_save_completion_dates(4,all_dates);
  assert d.applied and d.completion_dates_version=5,'full 30-unit date whitelist rejected';
end $$;
reset role;
select 'PASS: 30 new unit IDs and timestamps; cached old client retention; stale CAS; explicit false undo/timestamps; diagnostic independence; zero fabricated mastery; synthetic data rolled back' as result;
rollback;
