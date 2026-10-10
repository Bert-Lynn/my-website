-- Run only after approval, on the selected project's database, as an administrative test session.
-- Synthetic users/rows exist only within this transaction. No real user's data is read or altered.
begin;
select set_config('phd.test.a', gen_random_uuid()::text, true);
select set_config('phd.test.b', gen_random_uuid()::text, true);
insert into auth.users(id) values (current_setting('phd.test.a')::uuid), (current_setting('phd.test.b')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub', current_setting('phd.test.a'), true);
select set_config('request.jwt.claims', json_build_object('sub', current_setting('phd.test.a'), 'role', 'authenticated')::text, true);
do $$
declare r record; n integer;
begin
  select * into r from public.phd_save_progress(0, '{"sep-python":true}');
  assert r.applied and r.version = 1, 'initial CAS failed';
  select * into r from public.phd_save_progress(1, '{"sep-python":false}');
  assert r.applied and r.version = 2 and r.progress = '{"sep-python":false}'::jsonb, 'uncheck failed';
  select * into r from public.phd_save_progress(1, '{"sep-python":true}');
  assert not r.applied and r.version = 2 and r.progress = '{"sep-python":false}'::jsonb, 'stale CAS overwrote data';
  begin
    insert into public.phd_roadmap_progress(user_id, progress) values (current_setting('phd.test.b')::uuid, '{}');
    raise exception 'cross-user INSERT was allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_progress(2, '{"sep-python":"yes"}');
    raise exception 'invalid progress type allowed';
  exception when check_violation then null;
  end;
  begin
    perform public.phd_save_progress(2, '{"unknown-task":true}');
    raise exception 'unknown task ID allowed';
  exception when check_violation then null;
  end;
end $$;
select set_config('request.jwt.claim.sub', current_setting('phd.test.b'), true);
select set_config('request.jwt.claims', json_build_object('sub', current_setting('phd.test.b'), 'role', 'authenticated')::text, true);
do $$
declare n integer; r record;
begin
  select count(*) into n from public.phd_roadmap_progress where user_id = current_setting('phd.test.a')::uuid;
  assert n = 0, 'cross-user SELECT was allowed';
  update public.phd_roadmap_progress set progress = '{}' where user_id = current_setting('phd.test.a')::uuid;
  get diagnostics n = row_count;
  assert n = 0, 'cross-user UPDATE was allowed';
  select * into r from public.phd_save_progress(0, '{"sep-git":true}');
  assert r.applied and r.version = 1, 'independent user CAS failed';
  select * into r from public.phd_save_progress(1, '{"nov-agent-api":true,"jan-agent-workflow":false,"feb-agent-rag":true,"apr-agent-service":false,"jun-agent-evals":true,"aug-agent-v1":false}');
  assert r.applied and r.version = 2, 'six new agent milestone IDs rejected';
end $$;
set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$
begin
  begin
    perform * from public.phd_roadmap_progress;
    raise exception 'anonymous SELECT was allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_progress(0, '{}');
    raise exception 'anonymous RPC was allowed';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
select 'PASS: own-user CAS, false updates, stale conflict, schema validation, cross-user and anonymous denial; all synthetic data rolled back' as result;
rollback;
