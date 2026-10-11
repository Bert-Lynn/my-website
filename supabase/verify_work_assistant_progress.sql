-- Synthetic users and records exist only within this rolled-back transaction.
-- No real user records, authentication configuration, grants or policies are changed.
begin;
select set_config('phd.work.test.a',gen_random_uuid()::text,true);
select set_config('phd.work.test.b',gen_random_uuid()::text,true);
insert into auth.users(id) values(current_setting('phd.work.test.a')::uuid),(current_setting('phd.work.test.b')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('phd.work.test.a'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.work.test.a'),'role','authenticated')::text,true);
do $$
declare
  r record; row_after record; n integer; i integer; bad jsonb;
  legacy jsonb := '{"selectedRole":"forecasting_ml","skill:ai-code":{"level":"learning","score":0,"rubric":{"ai-code-c1":0,"ai-code-c2":0,"ai-code-c3":0,"ai-code-c4":0},"evidenceUrl":"","evidenceNote":"Synthetic retained evidence","assessedAt":"","verification":"self_assessed","history":[]}}';
  mainline jsonb := '{}'; expected jsonb; explicit_undo jsonb;
  done_value jsonb := '{"status":"done","evidenceUrl":"https://example.test/synthetic-artifact","completedAt":"2026-10-10T12:00:00.000Z"}';
begin
  for i in 0..6 loop
    legacy := legacy || jsonb_build_object('milestone:demand-decision-lab:ddl-m'||i,done_value);
  end loop;
  for i in 0..5 loop
    legacy := legacy || jsonb_build_object('milestone:ai-choice-assistant:aca-m'||i,done_value);
  end loop;
  for i in 0..3 loop
    mainline := mainline || jsonb_build_object('milestone:work-assistant:wa-m'||i,done_value);
  end loop;
  assert public.phd_career_state_valid(legacy),'legacy keys no longer valid';
  assert public.phd_career_state_valid(mainline),'new independent milestones rejected';
  select * into r from public.phd_save_career_state(0,legacy);
  assert r.applied and r.career_state_version=1 and r.career_state=legacy,'legacy fixture failed';
  assert not r.career_state ?| array['milestone:work-assistant:wa-m0','milestone:work-assistant:wa-m1','milestone:work-assistant:wa-m2','milestone:work-assistant:wa-m3'],'old milestone invented new completion';
  select * into r from public.phd_save_progress(1,'{"sep-python":true}');
  assert r.applied,'task fixture failed';
  select * into r from public.phd_save_lessons(0,'{"python-basics":"done","u-agent-tools":"skipped"}');
  assert r.applied,'lesson fixture failed';
  select * into r from public.phd_save_completion_dates(0,'{"task:sep-python":"2026-10-10T11:00:00.000Z"}');
  assert r.applied,'date fixture failed';

  select * into row_after from public.phd_roadmap_progress where user_id=current_setting('phd.work.test.a')::uuid;
  assert row_after.career_state=legacy and row_after.career_state_version=1,'task/lesson/date writes inferred new project completion';

  -- New project writes retain both old projects, role and skill evidence.
  expected := legacy || mainline;
  select * into r from public.phd_save_career_state(1,mainline);
  assert r.applied and r.career_state_version=2 and r.career_state=expected,'new project lost legacy evidence';
  -- Cached older client omits all new keys: all four new records must survive.
  select * into r from public.phd_save_career_state(2,legacy);
  assert r.applied and r.career_state_version=3 and r.career_state=expected,'old client erased new milestones';
  select * into r from public.phd_save_career_state(3,'{}');
  assert r.applied and r.career_state_version=4 and r.career_state=expected,'empty save erased omitted keys';

  explicit_undo := '{"milestone:work-assistant:wa-m0":{"status":"todo","evidenceUrl":"","completedAt":""}}';
  expected := expected || explicit_undo;
  select * into r from public.phd_save_career_state(4,explicit_undo);
  assert r.applied and r.career_state_version=5 and r.career_state=expected,'explicit new-project undo failed';
  select * into r from public.phd_save_career_state(4,mainline);
  assert not r.applied and r.career_state_version=5 and r.career_state=expected,'stale write bypassed CAS';
  select * into r from public.phd_save_career_state(5,legacy);
  assert r.applied and r.career_state_version=6 and r.career_state=expected,'old client erased new undo';
  explicit_undo := '{"milestone:demand-decision-lab:ddl-m0":{"status":"doing","evidenceUrl":"","completedAt":""}}';
  expected := expected || explicit_undo;
  select * into r from public.phd_save_career_state(6,explicit_undo);
  assert r.applied and r.career_state_version=7 and r.career_state=expected,'legacy undo lost new project or evidence';
  select * into row_after from public.phd_roadmap_progress where user_id=current_setting('phd.work.test.a')::uuid;
  assert row_after.progress='{"sep-python":true}'::jsonb and row_after.version=2,'career changed task progress';
  assert row_after.lessons='{"python-basics":"done","u-agent-tools":"skipped"}'::jsonb and row_after.lessons_version=1,'career changed lessons';
  assert row_after.completion_dates='{"task:sep-python":"2026-10-10T11:00:00.000Z"}'::jsonb and row_after.completion_dates_version=1,'career changed dates';

  foreach bad in array array[
    jsonb_build_object('milestone:work-assistant:wa-m4',done_value),
    jsonb_build_object('milestone:work-assistant:wa-m-1',done_value),
    jsonb_build_object('milestone:work-assistant:wa-m00',done_value),
    jsonb_build_object('milestone:work-assistant:aca-m0',done_value),
    jsonb_build_object('milestone:ai-choice-assistant:wa-m0',done_value),
    jsonb_build_object('milestone:work-assistant:ddl-m0',done_value),
    jsonb_build_object('milestone:demand-decision-lab:wa-m0',done_value),
    jsonb_build_object('milestone:work-assistant:wa-m0:extra',done_value),
    jsonb_build_object('milestone:work-assistant:wa-m0',done_value-'status'),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{status}','"approved"')),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{status}','"todo"')),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{completedAt}','"2026-02-30T12:00:00.000Z"')),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{evidenceUrl}','"javascript:alert(1)"')),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{evidenceUrl}','"https://user:secret@example.test"')),
    jsonb_build_object('milestone:work-assistant:wa-m0',done_value || '{"secret":"unsupported"}'::jsonb),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{evidenceUrl}',to_jsonb('https://example.test/'||repeat('x',2048)))),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{evidenceUrl}','null'::jsonb)),
    jsonb_build_object('milestone:work-assistant:wa-m0',jsonb_set(done_value,'{completedAt}','false'::jsonb)),
    jsonb_build_object('milestone:work-assistant:wa-m0','null'::jsonb),
    '[]'::jsonb, 'null'::jsonb
  ] loop
    assert not public.phd_career_state_valid(bad),'invalid new milestone accepted';
    begin
      perform public.phd_save_career_state(7,bad);
      raise exception 'invalid write accepted';
    exception when check_violation then null;
    end;
  end loop;
  select * into row_after from public.phd_roadmap_progress where user_id=current_setting('phd.work.test.a')::uuid;
  assert row_after.career_state=expected and row_after.career_state_version=7,'rejected writes altered data/version';

  -- Re-completion is explicit and changes only its named stage.
  explicit_undo := jsonb_build_object('milestone:work-assistant:wa-m0',done_value);
  expected := expected || explicit_undo;
  select * into r from public.phd_save_career_state(7,explicit_undo);
  assert r.applied and r.career_state_version=8 and r.career_state=expected,'explicit re-completion failed or changed other fields';
  -- An ACA-era client likewise cannot remove work-assistant data.
  explicit_undo := jsonb_build_object('milestone:ai-choice-assistant:aca-m1','{"status":"todo","evidenceUrl":"","completedAt":""}'::jsonb);
  expected := expected || explicit_undo;
  select * into r from public.phd_save_career_state(8,explicit_undo);
  assert r.applied and r.career_state_version=9 and r.career_state=expected,'ACA undo erased work-assistant or DDL data';
end $$;

select set_config('request.jwt.claim.sub',current_setting('phd.work.test.b'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.work.test.b'),'role','authenticated')::text,true);
do $$
declare r record; n integer;
begin
  assert not exists(select 1 from public.phd_roadmap_progress where user_id=current_setting('phd.work.test.a')::uuid),'cross-user read allowed';
  update public.phd_roadmap_progress set career_state='{}' where user_id=current_setting('phd.work.test.a')::uuid;
  get diagnostics n=row_count;
  assert n=0,'cross-user update allowed';
  select * into r from public.phd_save_career_state(0,'{"milestone:work-assistant:wa-m0":{"status":"doing","evidenceUrl":"","completedAt":""}}');
  assert r.applied and r.career_state_version=1 and r.career_state='{"milestone:work-assistant:wa-m0":{"status":"doing","evidenceUrl":"","completedAt":""}}'::jsonb,'new account inherited another account data or fabricated completion';
end $$;
set local role anon;
select set_config('request.jwt.claim.sub','',true);
select set_config('request.jwt.claims','{"role":"anon"}',true);
do $$
begin
  begin
    perform public.phd_save_career_state(0,'{}');
    raise exception 'anonymous write allowed';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
select 'PASS: DDL7 + ACA6 + WA4 exact milestone keys; no inferred completion; omitted/empty saves preserve all projects and evidence; explicit undo/re-completion persists; stale CAS and invalid data rejected; task/lesson/date streams unchanged; private account isolation and anonymous denial; synthetic data rolled back' as result,
  current_setting('phd.work.test.a') as synthetic_a, current_setting('phd.work.test.b') as synthetic_b;
rollback;
