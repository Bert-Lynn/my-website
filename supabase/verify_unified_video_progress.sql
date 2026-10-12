-- Post-migration integration verification. Run only with explicit execution approval.
-- Uses two random synthetic identities and their records in one rolled-back transaction.
-- No existing user record is read or updated. No Auth settings, RLS or grants change.
-- Result rows contain only assertions and generated synthetic IDs, never private progress.
begin;
set local statement_timeout = '30s';
select set_config('phd.unified.test.a',gen_random_uuid()::text,true);
select set_config('phd.unified.test.b',gen_random_uuid()::text,true);
insert into auth.users(id) values(current_setting('phd.unified.test.a')::uuid),(current_setting('phd.unified.test.b')::uuid);
set local role authenticated;
select set_config('request.jwt.claim.sub',current_setting('phd.unified.test.a'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.unified.test.a'),'role','authenticated')::text,true);
do $$
declare
  r record; d record; snapshot record; bad jsonb; id text; n integer;
  legacy_lessons jsonb := '{}'; legacy_dates jsonb := '{}';
  fresh_lessons jsonb := '{}'; fresh_dates jsonb := '{}';
  expected_lessons jsonb; expected_dates jsonb;
  stamp text := '2026-10-12T16:00:00.000Z';
  old_lessons text[] := array['python-basics', 'python-control', 'python-containers', 'python-modules', 'python-files', 'python-exceptions', 'python-classes', 'python-venv', 'missing-shell', 'missing-git', 'missing-debug', 'algo-complexity', 'algo-array', 'algo-hash', 'd2l-tensor', 'd2l-pandas', 'd2l-autograd', 'd2l-linear', 'd2l-train-loop', 'd2l-torch', 'd2l-mlp', 'd2l-overfit', 'd2l-save', 'd2l-lenet', 'd2l-sequence', 'd2l-lstm', 'd2l-attention', 'd2l-position', 'd2l-transformer', 'genai-prompt', 'genai-api', 'genai-tools', 'genai-responsible', 'genai-rag', 'genai-security', 'hf-agents-concept', 'hf-agents-tools', 'hf-agents-cycle', 'hf-agents-dummy', 'hf-agents-blocks', 'hf-agents-graph', 'fastapi-first', 'fastapi-body', 'fastapi-errors', 'fastapi-security', 'fastapi-testing', 'docker-dockerfile', 'docker-compose', 'evals-observe', 'evals-regression', 'cs50p-functions', 'cs50p-conditionals', 'cs50p-loops', 'u-ai-spec', 'u-python-diagnostic', 'u-git', 'u-debug', 'u-data-card', 'u-pandas', 'u-sql-select', 'u-sql-join', 'u-sql-window', 'u-metrics', 'u-uncertainty', 'u-leakage', 'u-baselines', 'u-lagged', 'u-tscv', 'u-or-mip', 'u-or-scheduling', 'u-decision-eval', 'u-pytest', 'u-test-param', 'u-api', 'u-api-testing', 'u-docker', 'u-ci', 'u-agent-tools', 'u-agent-loop', 'u-agent-evals', 'u-algo', 'u-interview', 'u-torch']::text[];
  old_dates text[] := array['task:sep-python', 'task:sep-git', 'task:sep-paper0', 'task:sep-a-data', 'task:oct-a-base', 'task:oct-algo', 'task:oct-repo', 'task:nov-d2l', 'task:nov-a-models', 'task:nov-a-horizon', 'task:dec-a-shift', 'task:dec-air-v01', 'task:dec-vision-mini', 'task:jan-seq', 'task:jan-a-write', 'task:jan-b-base', 'task:feb-a-submit', 'task:feb-air-v1', 'task:feb-b-metric', 'task:mar-cs231n', 'task:mar-b-dfl', 'task:mar-vision-repro', 'task:apr-b-robust', 'task:apr-c-scope', 'task:apr-vision-v01', 'task:may-multimodal', 'task:may-b-write', 'task:may-c-pilot', 'task:jun-b-submit', 'task:jun-vision-v05', 'task:jun-c-rq', 'task:jul-special', 'task:jul-c-main', 'task:jul-c-ablation', 'task:aug-c-full', 'task:aug-vision-v1', 'task:aug-c-draft', 'task:sep-interview', 'task:sep-c-submit', 'task:sep-revision', 'task:sep-apply', 'task:nov-agent-api', 'task:jan-agent-workflow', 'task:feb-agent-rag', 'task:apr-agent-service', 'task:jun-agent-evals', 'task:aug-agent-v1', 'lesson:python-basics', 'lesson:python-control', 'lesson:python-containers', 'lesson:python-modules', 'lesson:python-files', 'lesson:python-exceptions', 'lesson:python-classes', 'lesson:python-venv', 'lesson:missing-shell', 'lesson:missing-git', 'lesson:missing-debug', 'lesson:algo-complexity', 'lesson:algo-array', 'lesson:algo-hash', 'lesson:d2l-tensor', 'lesson:d2l-pandas', 'lesson:d2l-autograd', 'lesson:d2l-linear', 'lesson:d2l-train-loop', 'lesson:d2l-torch', 'lesson:d2l-mlp', 'lesson:d2l-overfit', 'lesson:d2l-save', 'lesson:d2l-lenet', 'lesson:d2l-sequence', 'lesson:d2l-lstm', 'lesson:d2l-attention', 'lesson:d2l-position', 'lesson:d2l-transformer', 'lesson:genai-prompt', 'lesson:genai-api', 'lesson:genai-tools', 'lesson:genai-responsible', 'lesson:genai-rag', 'lesson:genai-security', 'lesson:hf-agents-concept', 'lesson:hf-agents-tools', 'lesson:hf-agents-cycle', 'lesson:hf-agents-dummy', 'lesson:hf-agents-blocks', 'lesson:hf-agents-graph', 'lesson:fastapi-first', 'lesson:fastapi-body', 'lesson:fastapi-errors', 'lesson:fastapi-security', 'lesson:fastapi-testing', 'lesson:docker-dockerfile', 'lesson:docker-compose', 'lesson:evals-observe', 'lesson:evals-regression', 'lesson:cs50p-functions', 'lesson:cs50p-conditionals', 'lesson:cs50p-loops', 'lesson:u-ai-spec', 'lesson:u-python-diagnostic', 'lesson:u-git', 'lesson:u-debug', 'lesson:u-data-card', 'lesson:u-pandas', 'lesson:u-sql-select', 'lesson:u-sql-join', 'lesson:u-sql-window', 'lesson:u-metrics', 'lesson:u-uncertainty', 'lesson:u-leakage', 'lesson:u-baselines', 'lesson:u-lagged', 'lesson:u-tscv', 'lesson:u-or-mip', 'lesson:u-or-scheduling', 'lesson:u-decision-eval', 'lesson:u-pytest', 'lesson:u-test-param', 'lesson:u-api', 'lesson:u-api-testing', 'lesson:u-docker', 'lesson:u-ci', 'lesson:u-agent-tools', 'lesson:u-agent-loop', 'lesson:u-agent-evals', 'lesson:u-algo', 'lesson:u-interview', 'lesson:u-torch']::text[];
  new_lessons text[] := array['watch-wa-video-2025-heima-pandas-io', 'practice-wa-video-2025-heima-pandas-io', 'watch-wa-video-2025-heima-pandas-filter', 'practice-wa-video-2025-heima-pandas-filter', 'watch-wa-video-2026-nange-langchain-quickstart', 'practice-wa-video-2026-nange-langchain-quickstart', 'watch-wa-video-2025-heima-assertions', 'practice-wa-video-2025-heima-assertions', 'watch-wa-video-2025-heima-pytest', 'practice-wa-video-2025-heima-pytest', 'watch-wa-video-2026-manxue-agent-graders', 'practice-wa-video-2026-manxue-agent-graders', 'watch-wa-video-2026-manxue-evaluation-suite', 'practice-wa-video-2026-manxue-evaluation-suite']::text[];
begin
  assert cardinality(old_lessons)=83 and cardinality(old_dates)=130 and cardinality(new_lessons)=14,'fixture allowlist counts changed';
  foreach id in array old_lessons loop legacy_lessons:=legacy_lessons||jsonb_build_object(id,'done'); end loop;
  foreach id in array old_dates loop legacy_dates:=legacy_dates||jsonb_build_object(id,stamp); end loop;
  foreach id in array new_lessons loop
    fresh_lessons:=fresh_lessons||jsonb_build_object(id,'done');
    fresh_dates:=fresh_dates||jsonb_build_object('lesson:'||id,stamp);
  end loop;
  select * into r from public.phd_save_lessons(0,legacy_lessons);
  select * into d from public.phd_save_completion_dates(0,legacy_dates);
  assert r.applied and r.lessons_version=1 and r.lessons=legacy_lessons,'83 legacy lessons rejected or changed';
  assert d.applied and d.completion_dates_version=1 and d.completion_dates=legacy_dates,'130 legacy dates rejected or changed';
  assert not r.lessons ?| new_lessons,'legacy completions inferred new lesson completion';

  expected_lessons:=legacy_lessons||fresh_lessons; expected_dates:=legacy_dates||fresh_dates;
  select * into r from public.phd_save_lessons(1,fresh_lessons);
  select * into d from public.phd_save_completion_dates(1,fresh_dates);
  assert r.applied and r.lessons_version=2 and r.lessons=expected_lessons,'new lessons rejected or old keys erased';
  assert d.applied and d.completion_dates_version=2 and d.completion_dates=expected_dates,'new dates rejected or old keys erased';
  select * into r from public.phd_save_lessons(2,legacy_lessons);
  select * into d from public.phd_save_completion_dates(2,legacy_dates);
  assert r.applied and r.lessons_version=3 and r.lessons=expected_lessons,'old client erased new lessons';
  assert d.applied and d.completion_dates_version=3 and d.completion_dates=expected_dates,'old client erased new dates';
  select * into r from public.phd_save_lessons(3,'{}');
  select * into d from public.phd_save_completion_dates(3,'{}');
  assert r.applied and r.lessons_version=4 and r.lessons=expected_lessons,'empty save erased lessons';
  assert d.applied and d.completion_dates_version=4 and d.completion_dates=expected_dates,'empty save erased dates';

  -- Undo only watch; practice must remain independently done.
  expected_lessons:=expected_lessons||jsonb_build_object(new_lessons[1],false);
  expected_dates:=expected_dates||jsonb_build_object('lesson:'||new_lessons[1],false);
  select * into r from public.phd_save_lessons(4,jsonb_build_object(new_lessons[1],false));
  select * into d from public.phd_save_completion_dates(4,jsonb_build_object('lesson:'||new_lessons[1],false));
  assert r.applied and r.lessons_version=5 and r.lessons=expected_lessons and r.lessons->>new_lessons[2]='done','watch undo changed practice or legacy progress';
  assert d.applied and d.completion_dates_version=5 and d.completion_dates=expected_dates,'watch date undo changed other timestamps';
  select * into r from public.phd_save_lessons(4,fresh_lessons);
  select * into d from public.phd_save_completion_dates(4,fresh_dates);
  assert not r.applied and r.lessons_version=5 and r.lessons=expected_lessons,'stale lesson CAS overwrote undo';
  assert not d.applied and d.completion_dates_version=5 and d.completion_dates=expected_dates,'stale date CAS overwrote undo';
  select * into r from public.phd_save_lessons(5,legacy_lessons);
  select * into d from public.phd_save_completion_dates(5,legacy_dates);
  assert r.applied and r.lessons_version=6 and r.lessons=expected_lessons,'older save erased watch tombstone';
  assert d.applied and d.completion_dates_version=6 and d.completion_dates=expected_dates,'older save erased date tombstone';

  -- All 97 IDs accept skipped and explicit false; all 144 dates accept false.
  for id in select jsonb_object_keys(expected_lessons) loop expected_lessons:=expected_lessons||jsonb_build_object(id,'skipped'); end loop;
  select * into r from public.phd_save_lessons(6,expected_lessons);
  assert r.applied and r.lessons_version=7 and r.lessons=expected_lessons,'skipped status rejected';
  for id in select jsonb_object_keys(expected_lessons) loop expected_lessons:=expected_lessons||jsonb_build_object(id,false); end loop;
  for id in select jsonb_object_keys(expected_dates) loop expected_dates:=expected_dates||jsonb_build_object(id,false); end loop;
  select * into r from public.phd_save_lessons(7,expected_lessons);
  select * into d from public.phd_save_completion_dates(6,expected_dates);
  assert r.applied and r.lessons_version=8 and r.lessons=expected_lessons,'explicit lesson reset rejected';
  assert d.applied and d.completion_dates_version=7 and d.completion_dates=expected_dates,'explicit date reset rejected';

  foreach bad in array array[
    '{"unknown-key":"done"}'::jsonb,
    jsonb_build_object(new_lessons[1]||'-extra','done'),
    jsonb_build_object(replace(new_lessons[1],'watch-','watched-'),'done'),
    jsonb_build_object(replace(new_lessons[1],'wa-video-','video-'),'done'),
    jsonb_build_object('lesson:'||new_lessons[1],'done'),
    jsonb_build_object(new_lessons[1],true),
    jsonb_build_object(new_lessons[1],'null'::jsonb),
    jsonb_build_object(new_lessons[1],0),
    jsonb_build_object(new_lessons[1],'[]'::jsonb),
    jsonb_build_object(new_lessons[1],'{}'::jsonb),
    jsonb_build_object(new_lessons[1],'todo'),
    jsonb_build_object(new_lessons[1],'false'),
    jsonb_build_object(new_lessons[1],repeat('x',65536)),
    '[]'::jsonb, 'null'::jsonb, 'true'::jsonb, '0'::jsonb, '"string"'::jsonb
  ] loop
    begin
      perform public.phd_save_lessons(8,bad);
      raise exception 'invalid lesson write accepted';
    exception when check_violation or invalid_parameter_value then null;
    end;
  end loop;
  foreach bad in array array[
    '{"lesson:unknown-key":false}'::jsonb,
    jsonb_build_object('lesson:'||new_lessons[1]||'-extra',stamp),
    jsonb_build_object(new_lessons[1],stamp),
    jsonb_build_object('task:'||new_lessons[1],stamp),
    jsonb_build_object('lesson:'||new_lessons[1],true),
    jsonb_build_object('lesson:'||new_lessons[1],'null'::jsonb),
    jsonb_build_object('lesson:'||new_lessons[1],0),
    jsonb_build_object('lesson:'||new_lessons[1],'[]'::jsonb),
    jsonb_build_object('lesson:'||new_lessons[1],'{}'::jsonb),
    jsonb_build_object('lesson:'||new_lessons[1],'2026-10-12'),
    jsonb_build_object('lesson:'||new_lessons[1],'2026-10-12T16:00:00Z'),
    jsonb_build_object('lesson:'||new_lessons[1],repeat('x',65536)),
    '[]'::jsonb, 'null'::jsonb, 'true'::jsonb, '0'::jsonb, '"string"'::jsonb
  ] loop
    begin
      perform public.phd_save_completion_dates(7,bad);
      raise exception 'invalid date write accepted';
    exception when check_violation or invalid_parameter_value then null;
    end;
  end loop;
  select * into snapshot from public.phd_roadmap_progress where user_id=current_setting('phd.unified.test.a')::uuid;
  assert snapshot.lessons=expected_lessons and snapshot.lessons_version=8,'rejected lesson writes changed data/version';
  assert snapshot.completion_dates=expected_dates and snapshot.completion_dates_version=7,'rejected date writes changed data/version';
  assert snapshot.progress='{}'::jsonb and snapshot.version=1 and snapshot.career_state='{}'::jsonb and snapshot.career_state_version=0,'lesson/date writes changed other streams';

  -- Re-completion is explicit, restores only watch and gives it its own timestamp.
  expected_lessons:=expected_lessons||jsonb_build_object(new_lessons[1],'done');
  expected_dates:=expected_dates||jsonb_build_object('lesson:'||new_lessons[1],'2026-10-12T16:01:00.000Z');
  select * into r from public.phd_save_lessons(8,jsonb_build_object(new_lessons[1],'done'));
  select * into d from public.phd_save_completion_dates(7,jsonb_build_object('lesson:'||new_lessons[1],'2026-10-12T16:01:00.000Z'));
  assert r.applied and r.lessons_version=9 and r.lessons=expected_lessons and r.lessons->new_lessons[2]='false'::jsonb,'watch re-completion inferred practice completion';
  assert d.applied and d.completion_dates_version=8 and d.completion_dates=expected_dates,'re-completion timestamp changed other dates';
end $$;

-- Existing owner isolation is verified against only the generated synthetic IDs.
select set_config('request.jwt.claim.sub',current_setting('phd.unified.test.b'),true);
select set_config('request.jwt.claims',json_build_object('sub',current_setting('phd.unified.test.b'),'role','authenticated')::text,true);
do $$
declare r record; n integer;
begin
  assert not exists(select 1 from public.phd_roadmap_progress where user_id=current_setting('phd.unified.test.a')::uuid),'cross-owner read allowed';
  update public.phd_roadmap_progress set lessons='{}' where user_id=current_setting('phd.unified.test.a')::uuid;
  get diagnostics n=row_count;
  assert n=0,'cross-owner update allowed';
  select * into r from public.phd_save_lessons(0,'{}');
  assert r.applied and r.lessons_version=1 and r.lessons='{}'::jsonb,'new synthetic owner inherited progress';
end $$;
set local role anon;
select set_config('request.jwt.claim.sub','',true);
select set_config('request.jwt.claims','{"role":"anon"}',true);
do $$
begin
  begin
    perform public.phd_save_lessons(0,'{}');
    raise exception 'anonymous lesson write allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    perform public.phd_save_completion_dates(0,'{}');
    raise exception 'anonymous date write allowed';
  exception when insufficient_privilege then null;
  end;
end $$;
reset role;
select 'PASS: 97 lesson IDs and 144 date IDs; all old IDs retained; all new watch/practice IDs independent; types and invalid IDs rejected; old/empty saves preserve keys and tombstones; undo, re-completion and stale CAS; other streams unchanged; existing owner isolation and anonymous denial; all synthetic records rolled back' as result,
  current_setting('phd.unified.test.a') as synthetic_a,
  current_setting('phd.unified.test.b') as synthetic_b;
rollback;
