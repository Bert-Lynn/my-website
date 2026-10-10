-- Synthetic users and lesson rows only. Entire transaction is rolled back.
begin;
select set_config('phd.lesson.test.a', gen_random_uuid()::text, true);
select set_config('phd.lesson.test.b', gen_random_uuid()::text, true);
insert into auth.users(id) values (current_setting('phd.lesson.test.a')::uuid), (current_setting('phd.lesson.test.b')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub', current_setting('phd.lesson.test.a'), true);
select set_config('request.jwt.claims', json_build_object('sub', current_setting('phd.lesson.test.a'), 'role', 'authenticated')::text, true);
do $$
declare r record; p record; bad jsonb;
begin
  select * into r from public.phd_save_progress(0, '{"sep-python":true}');
  assert r.applied and r.version = 1, 'legacy task create failed';
  select * into p from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid;
  assert p.lessons = '{}' and p.lessons_version = 0, 'legacy completion leaked into lessons';
  select * into r from public.phd_save_lessons(0, '{"python-basics":"done"}');
  assert r.applied and r.lessons_version = 1, 'lesson write failed';
  select * into p from public.phd_save_progress(1, '{"sep-python":false}');
  assert p.applied and p.version = 2, 'legacy task CAS broken';
  select * into p from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid;
  assert p.lessons = '{"python-basics":"done"}' and p.lessons_version = 1, 'old client overwrote lesson progress';
  select * into r from public.phd_save_lessons(1, '{"python-basics":false}');
  assert r.applied and r.lessons_version = 2 and r.lessons = '{"python-basics":false}', 'lesson uncheck lost';
  select * into r from public.phd_save_lessons(1, '{"python-basics":"done"}');
  assert not r.applied and r.lessons_version = 2 and r.lessons = '{"python-basics":false}', 'stale lesson CAS overwrote';
  foreach bad in array array['{"unknown-lesson":"done"}'::jsonb, '{"python-basics":true}', '{"python-basics":"invalid"}', '{"python-basics":["done"]}', '{"python-basics":null}', '{"python-basics":{}}', '{"python-basics":1}'] loop
    begin
      perform public.phd_save_lessons(2, bad);
      raise exception 'invalid lesson payload accepted: %', bad;
    exception when check_violation then null;
    end;
  end loop;
  select * into r from public.phd_save_lessons(2, '{"python-basics":"skipped"}');
  assert r.applied and r.lessons_version = 3, 'skip status rejected';
  select * into p from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid;
  assert p.progress = '{"sep-python":false}' and p.version = 2, 'lessons overwrote legacy task progress';
  select * into r from public.phd_save_completion_dates(0, '{"task:sep-python":"2026-10-10T10:00:00.000Z","lesson:python-basics":"2026-10-10T10:01:00.000Z"}');
  assert r.applied and r.completion_dates_version = 1, 'completion timestamp save failed';
  select * into r from public.phd_save_completion_dates(1, '{"task:sep-python":false,"lesson:python-basics":false}');
  assert r.applied and r.completion_dates_version = 2 and r.completion_dates -> 'task:sep-python' = 'false'::jsonb, 'completion timestamp revoke failed';
  select * into r from public.phd_save_completion_dates(1, '{}');
  assert not r.applied and r.completion_dates_version = 2, 'stale date CAS overwrote';
  foreach bad in array array['{"task:unknown":"2026-10-10T10:00:00.000Z"}'::jsonb, '{"task:sep-python":true}', '{"task:sep-python":"today"}', '{"task:sep-python":null}', '{"task:sep-python":["2026-10-10T10:00:00.000Z"]}'] loop
    begin
      perform public.phd_save_completion_dates(2, bad);
      raise exception 'invalid completion date accepted: %', bad;
    exception when check_violation then null;
    end;
  end loop;
  select * into p from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid;
  assert p.version = 2 and p.lessons_version = 3, 'completion dates changed other versions';
  begin
    insert into public.phd_roadmap_progress(user_id, lessons) values (current_setting('phd.lesson.test.b')::uuid, '{"python-basics":"done"}');
    raise exception 'cross-account insert allowed';
  exception when insufficient_privilege then null;
  end;
end $$;
select set_config('request.jwt.claim.sub', current_setting('phd.lesson.test.b'), true);
select set_config('request.jwt.claims', json_build_object('sub', current_setting('phd.lesson.test.b'), 'role', 'authenticated')::text, true);
do $$
declare r record; n integer;
begin
  assert not exists(select 1 from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid), 'cross-account lesson read allowed';
  update public.phd_roadmap_progress set lessons = '{}' where user_id = current_setting('phd.lesson.test.a')::uuid;
  get diagnostics n = row_count;
  assert n = 0, 'cross-account lesson update allowed';
  select * into r from public.phd_save_lessons(0, '{"python-basics":"done"}');
  assert r.applied and r.lessons_version = 1, 'independent account initial lesson write failed';
  select * into r from public.phd_save_completion_dates(0, '{"task:sep-python":false}');
  assert r.applied and r.completion_dates_version = 1, 'independent completion date account failed';
end $$;
set local role anon;
select set_config('request.jwt.claim.sub', '', true);
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$
begin
  begin
    perform lessons from public.phd_roadmap_progress where user_id = current_setting('phd.lesson.test.a')::uuid;
    raise exception 'anonymous lesson read allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_lessons(0, '{}');
    raise exception 'anonymous lesson RPC allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_completion_dates(0, '{}');
    raise exception 'anonymous completion date RPC allowed';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
select 'PASS: old-client compatibility, separate lesson CAS/version, false and skipped, invalid payload denial, account isolation, anonymous denial; synthetic data rolled back' as result;
rollback;
