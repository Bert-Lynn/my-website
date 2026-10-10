-- Add 30 new career learning exercises without changing the original 53 lesson identities.
-- Related lesson IDs are references only. No progress is backfilled or promoted.
-- Omitted keys are retained for both legacy and new exercises; false is the explicit undo tombstone.
-- This unpublished source was made safe before publication. A follow-up remote migration
-- 20261010113029 applies the same merge-preserving RPC definitions; see CAREER_SYNC.md.

alter table public.phd_roadmap_progress drop constraint phd_lessons_shape,
  add constraint phd_lessons_shape check (
    jsonb_typeof(lessons) = 'object'
    and octet_length(lessons::text) < 65536
    and lessons - array['python-basics', 'python-control', 'python-containers', 'python-modules', 'python-files', 'python-exceptions', 'python-classes', 'python-venv', 'missing-shell', 'missing-git', 'missing-debug', 'algo-complexity', 'algo-array', 'algo-hash', 'd2l-tensor', 'd2l-pandas', 'd2l-autograd', 'd2l-linear', 'd2l-train-loop', 'd2l-torch', 'd2l-mlp', 'd2l-overfit', 'd2l-save', 'd2l-lenet', 'd2l-sequence', 'd2l-lstm', 'd2l-attention', 'd2l-position', 'd2l-transformer', 'genai-prompt', 'genai-api', 'genai-tools', 'genai-responsible', 'genai-rag', 'genai-security', 'hf-agents-concept', 'hf-agents-tools', 'hf-agents-cycle', 'hf-agents-dummy', 'hf-agents-blocks', 'hf-agents-graph', 'fastapi-first', 'fastapi-body', 'fastapi-errors', 'fastapi-security', 'fastapi-testing', 'docker-dockerfile', 'docker-compose', 'evals-observe', 'evals-regression', 'cs50p-functions', 'cs50p-conditionals', 'cs50p-loops', 'u-ai-spec', 'u-python-diagnostic', 'u-git', 'u-debug', 'u-data-card', 'u-pandas', 'u-sql-select', 'u-sql-join', 'u-sql-window', 'u-metrics', 'u-uncertainty', 'u-leakage', 'u-baselines', 'u-lagged', 'u-tscv', 'u-or-mip', 'u-or-scheduling', 'u-decision-eval', 'u-pytest', 'u-test-param', 'u-api', 'u-api-testing', 'u-docker', 'u-ci', 'u-agent-tools', 'u-agent-loop', 'u-agent-evals', 'u-algo', 'u-interview', 'u-torch']::text[] = '{}'::jsonb
    and not jsonb_path_exists(lessons, 'strict $.* ? ((@.type() != "boolean" && @.type() != "string") || (@.type() == "boolean" && @ != false) || (@.type() == "string" && @ != "done" && @ != "skipped"))')
  );

create or replace function public.phd_save_lessons(expected_version bigint, next_lessons jsonb)
returns table(applied boolean, lessons jsonb, lessons_version bigint)
language plpgsql security invoker set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  current_row public.phd_roadmap_progress%rowtype;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_version is null or expected_version < 0 or next_lessons is null then
    raise exception 'Invalid lesson request' using errcode = '22023';
  end if;
  if expected_version = 0 then
    insert into public.phd_roadmap_progress(user_id, lessons, lessons_version)
      values(owner_id, next_lessons, 1) on conflict (user_id) do nothing
      returning * into current_row;
    if found then
      return query select true, current_row.lessons, current_row.lessons_version; return;
    end if;
  end if;
  select p.* into current_row from public.phd_roadmap_progress p where p.user_id = owner_id for update;
  if not found then return query select false, '{}'::jsonb, 0::bigint; return; end if;
  if current_row.lessons_version <> expected_version then
    return query select false, current_row.lessons, current_row.lessons_version; return;
  end if;
  update public.phd_roadmap_progress p
    set lessons = p.lessons || next_lessons, lessons_version = p.lessons_version + 1, updated_at = now()
    where p.user_id = owner_id returning p.* into current_row;
  return query select true, current_row.lessons, current_row.lessons_version;
end;
$$;

alter table public.phd_roadmap_progress drop constraint phd_completion_dates_shape,
  add constraint phd_completion_dates_shape check (
    jsonb_typeof(completion_dates) = 'object'
    and octet_length(completion_dates::text) < 65536
    and completion_dates - array['task:sep-python', 'task:sep-git', 'task:sep-paper0', 'task:sep-a-data', 'task:oct-a-base', 'task:oct-algo', 'task:oct-repo', 'task:nov-d2l', 'task:nov-a-models', 'task:nov-a-horizon', 'task:dec-a-shift', 'task:dec-air-v01', 'task:dec-vision-mini', 'task:jan-seq', 'task:jan-a-write', 'task:jan-b-base', 'task:feb-a-submit', 'task:feb-air-v1', 'task:feb-b-metric', 'task:mar-cs231n', 'task:mar-b-dfl', 'task:mar-vision-repro', 'task:apr-b-robust', 'task:apr-c-scope', 'task:apr-vision-v01', 'task:may-multimodal', 'task:may-b-write', 'task:may-c-pilot', 'task:jun-b-submit', 'task:jun-vision-v05', 'task:jun-c-rq', 'task:jul-special', 'task:jul-c-main', 'task:jul-c-ablation', 'task:aug-c-full', 'task:aug-vision-v1', 'task:aug-c-draft', 'task:sep-interview', 'task:sep-c-submit', 'task:sep-revision', 'task:sep-apply', 'task:nov-agent-api', 'task:jan-agent-workflow', 'task:feb-agent-rag', 'task:apr-agent-service', 'task:jun-agent-evals', 'task:aug-agent-v1', 'lesson:python-basics', 'lesson:python-control', 'lesson:python-containers', 'lesson:python-modules', 'lesson:python-files', 'lesson:python-exceptions', 'lesson:python-classes', 'lesson:python-venv', 'lesson:missing-shell', 'lesson:missing-git', 'lesson:missing-debug', 'lesson:algo-complexity', 'lesson:algo-array', 'lesson:algo-hash', 'lesson:d2l-tensor', 'lesson:d2l-pandas', 'lesson:d2l-autograd', 'lesson:d2l-linear', 'lesson:d2l-train-loop', 'lesson:d2l-torch', 'lesson:d2l-mlp', 'lesson:d2l-overfit', 'lesson:d2l-save', 'lesson:d2l-lenet', 'lesson:d2l-sequence', 'lesson:d2l-lstm', 'lesson:d2l-attention', 'lesson:d2l-position', 'lesson:d2l-transformer', 'lesson:genai-prompt', 'lesson:genai-api', 'lesson:genai-tools', 'lesson:genai-responsible', 'lesson:genai-rag', 'lesson:genai-security', 'lesson:hf-agents-concept', 'lesson:hf-agents-tools', 'lesson:hf-agents-cycle', 'lesson:hf-agents-dummy', 'lesson:hf-agents-blocks', 'lesson:hf-agents-graph', 'lesson:fastapi-first', 'lesson:fastapi-body', 'lesson:fastapi-errors', 'lesson:fastapi-security', 'lesson:fastapi-testing', 'lesson:docker-dockerfile', 'lesson:docker-compose', 'lesson:evals-observe', 'lesson:evals-regression', 'lesson:cs50p-functions', 'lesson:cs50p-conditionals', 'lesson:cs50p-loops', 'lesson:u-ai-spec', 'lesson:u-python-diagnostic', 'lesson:u-git', 'lesson:u-debug', 'lesson:u-data-card', 'lesson:u-pandas', 'lesson:u-sql-select', 'lesson:u-sql-join', 'lesson:u-sql-window', 'lesson:u-metrics', 'lesson:u-uncertainty', 'lesson:u-leakage', 'lesson:u-baselines', 'lesson:u-lagged', 'lesson:u-tscv', 'lesson:u-or-mip', 'lesson:u-or-scheduling', 'lesson:u-decision-eval', 'lesson:u-pytest', 'lesson:u-test-param', 'lesson:u-api', 'lesson:u-api-testing', 'lesson:u-docker', 'lesson:u-ci', 'lesson:u-agent-tools', 'lesson:u-agent-loop', 'lesson:u-agent-evals', 'lesson:u-algo', 'lesson:u-interview', 'lesson:u-torch']::text[] = '{}'::jsonb
    and not jsonb_path_exists(completion_dates, 'strict $.* ? ((@.type() != "boolean" && @.type() != "string") || (@.type() == "boolean" && @ != false) || (@.type() == "string" && !(@ like_regex "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}Z$")))')
  );

create or replace function public.phd_save_completion_dates(expected_version bigint, next_completion_dates jsonb)
returns table(applied boolean, completion_dates jsonb, completion_dates_version bigint)
language plpgsql security invoker set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  current_row public.phd_roadmap_progress%rowtype;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_version is null or expected_version < 0 or next_completion_dates is null then
    raise exception 'Invalid completion_date request' using errcode = '22023';
  end if;
  if expected_version = 0 then
    insert into public.phd_roadmap_progress(user_id, completion_dates, completion_dates_version)
      values(owner_id, next_completion_dates, 1) on conflict (user_id) do nothing
      returning * into current_row;
    if found then
      return query select true, current_row.completion_dates, current_row.completion_dates_version; return;
    end if;
  end if;
  select p.* into current_row from public.phd_roadmap_progress p where p.user_id = owner_id for update;
  if not found then return query select false, '{}'::jsonb, 0::bigint; return; end if;
  if current_row.completion_dates_version <> expected_version then
    return query select false, current_row.completion_dates, current_row.completion_dates_version; return;
  end if;
  update public.phd_roadmap_progress p
    set completion_dates = p.completion_dates || next_completion_dates, completion_dates_version = p.completion_dates_version + 1, updated_at = now()
    where p.user_id = owner_id returning p.* into current_row;
  return query select true, current_row.completion_dates, current_row.completion_dates_version;
end;
$$;
