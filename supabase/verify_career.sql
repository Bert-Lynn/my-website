-- Only synthetic random user IDs, created and removed inside this rolled-back transaction.
begin;
select set_config('phd.career.test.a',gen_random_uuid()::text,true);
select set_config('phd.career.test.b',gen_random_uuid()::text,true);
insert into auth.users(id) values(current_setting('phd.career.test.a')::uuid),(current_setting('phd.career.test.b')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('phd.career.test.a'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.career.test.a'),'role','authenticated')::text,true);
do $$
declare r record; p record; bad jsonb; sample jsonb;
begin
  select * into r from public.phd_save_progress(0,'{"sep-python":true}');
  assert r.applied and r.version=1,'legacy create failed';
  select * into r from public.phd_save_lessons(0,'{"python-basics":"skipped"}');
  assert r.applied and r.lessons_version=1,'lesson compatibility failed';
  select * into p from public.phd_roadmap_progress where user_id=current_setting('phd.career.test.a')::uuid;
  assert p.career_state='{}' and p.career_state_version=0,'task/lesson completion invented mastery';
  sample := '{"selectedRole":"decision_optimization","skill:ai-code":{"level":"passed","score":100,"rubric":{"ai-code-c1":4,"ai-code-c2":4,"ai-code-c3":4,"ai-code-c4":4},"evidenceUrl":"https://example.test/synthetic-evidence","evidenceNote":"Synthetic test only","assessedAt":"2026-10-10T11:00:00.000Z","verification":"self_assessed","history":[]},"milestone:demand-decision-lab:ddl-m0":{"status":"done","evidenceUrl":"","completedAt":"2026-10-10T11:00:00.000Z"}}';
  assert public.phd_career_state_valid(sample),'valid self-assessment rejected';
  select * into r from public.phd_save_career_state(0,sample);
  assert r.applied and r.career_state_version=1,'career write failed';
  select * into r from public.phd_save_progress(1,'{"sep-python":false}');
  assert r.applied and r.version=2,'old-client task CAS broken';
  select * into r from public.phd_save_lessons(1,'{"python-basics":"done"}');
  assert r.applied and r.lessons_version=2,'old-client lesson CAS broken';
  select * into r from public.phd_save_completion_dates(0,'{"task:sep-python":false}');
  assert r.applied and r.completion_dates_version=1,'date stream compatibility failed';
  select * into p from public.phd_roadmap_progress where user_id=current_setting('phd.career.test.a')::uuid;
  assert p.career_state=sample and p.career_state_version=1,'old streams overwrote career evidence';
  select * into r from public.phd_save_career_state(0,'{}');
  assert not r.applied and r.career_state_version=1 and r.career_state=sample,'stale CAS overwrote evidence';
  foreach bad in array array[
    '{"unknown":true}'::jsonb,
    '{"selectedRole":"officially_hired"}'::jsonb,
    jsonb_set(sample,'{skill:ai-code,verification}','"official_verified"'),
    jsonb_set(sample,'{skill:ai-code,evidenceUrl}','"javascript:alert(1)"'),
    jsonb_set(sample,'{skill:ai-code,evidenceUrl}','"https://user:secret@example.test"'),
    jsonb_set(sample,'{skill:ai-code,rubric,ai-code-c1}','3'),
    jsonb_set(sample,'{skill:ai-code,rubric,ai-code-c1}','"4"'),
    jsonb_set(sample,'{skill:ai-code,rubric,ai-code-c5}','4'),
    jsonb_set(sample,'{skill:ai-code,score}','99'),
    jsonb_set(sample,'{skill:ai-code,assessedAt}','"2026-02-30T11:00:00.000Z"'),
    jsonb_set(sample,'{skill:ai-code,history}','[null]'),
    jsonb_set(jsonb_set(sample,'{skill:ai-code,evidenceUrl}','""'),'{skill:ai-code,evidenceNote}','""'),
    jsonb_set(sample,'{milestone:demand-decision-lab:ddl-m0,status}','"approved"')
  ] loop
    assert not public.phd_career_state_valid(bad),'validator accepted invalid payload';
    begin
      perform public.phd_save_career_state(1,bad);
      raise exception 'invalid career payload accepted';
    exception when check_violation then null;
    end;
  end loop;
  select * into r from public.phd_save_career_state(1,'{"selectedRole":"forecasting_ml","milestone:demand-decision-lab:ddl-m0":{"status":"todo","evidenceUrl":"","completedAt":""}}');
  assert r.applied and r.career_state_version=2 and not r.career_state ? 'skill:ai-code','career reset failed';
  select * into p from public.phd_roadmap_progress where user_id=current_setting('phd.career.test.a')::uuid;
  assert p.progress='{"sep-python":false}' and p.version=2 and p.lessons='{"python-basics":"done"}' and p.lessons_version=2 and p.completion_dates_version=1,'career reset changed legacy data';
  begin
    insert into public.phd_roadmap_progress(user_id,career_state) values(current_setting('phd.career.test.b')::uuid,'{}');
    raise exception 'cross-user insert accepted';
  exception when insufficient_privilege then null;
  end;
end $$;
select set_config('request.jwt.claim.sub',current_setting('phd.career.test.b'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.career.test.b'),'role','authenticated')::text,true);
do $$
declare r record; n integer;
begin
  assert not exists(select 1 from public.phd_roadmap_progress where user_id=current_setting('phd.career.test.a')::uuid),'cross-user read accepted';
  update public.phd_roadmap_progress set career_state='{}' where user_id=current_setting('phd.career.test.a')::uuid;
  get diagnostics n=row_count;
  assert n=0,'cross-user update accepted';
  select * into r from public.phd_save_career_state(0,'{"selectedRole":"agent_engineering"}');
  assert r.applied and r.career_state_version=1,'new account initial career-only write failed';
  select * into r from public.phd_save_progress(1,'{"sep-python":true}');
  assert r.applied and r.version=2,'legacy task save after career-created row failed';
end $$;
set local role anon;
select set_config('request.jwt.claim.sub','',true);
select set_config('request.jwt.claims','{"role":"anon"}',true);
do $$
begin
  begin
    perform career_state from public.phd_roadmap_progress where user_id=current_setting('phd.career.test.a')::uuid;
    raise exception 'anonymous evidence read accepted';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_career_state(0,'{}');
    raise exception 'anonymous career write accepted';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
select 'PASS: career independent CAS; legacy task/lesson/date compatibility; self-assessed-only validated rubric/evidence; invalid payload denial; per-user isolation; anonymous denial; all synthetic data rolled back' as result;
rollback;
