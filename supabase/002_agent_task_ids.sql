-- Add six AI-agent milestones without changing any saved progress.
begin;
alter table public.phd_roadmap_progress drop constraint phd_progress_shape;
alter table public.phd_roadmap_progress add constraint phd_progress_shape check (
    jsonb_typeof(progress) = 'object'
    and octet_length(progress::text) < 8192
    and progress - array['sep-python', 'sep-git', 'sep-paper0', 'sep-a-data', 'oct-a-base', 'oct-algo', 'oct-repo', 'nov-d2l', 'nov-a-models', 'nov-a-horizon', 'dec-a-shift', 'dec-air-v01', 'dec-vision-mini', 'jan-seq', 'jan-a-write', 'jan-b-base', 'feb-a-submit', 'feb-air-v1', 'feb-b-metric', 'mar-cs231n', 'mar-b-dfl', 'mar-vision-repro', 'apr-b-robust', 'apr-c-scope', 'apr-vision-v01', 'may-multimodal', 'may-b-write', 'may-c-pilot', 'jun-b-submit', 'jun-vision-v05', 'jun-c-rq', 'jul-special', 'jul-c-main', 'jul-c-ablation', 'aug-c-full', 'aug-vision-v1', 'aug-c-draft', 'sep-interview', 'sep-c-submit', 'sep-revision', 'sep-apply', 'nov-agent-api', 'jan-agent-workflow', 'feb-agent-rag', 'apr-agent-service', 'jun-agent-evals', 'aug-agent-v1']::text[] = '{}'::jsonb
    and not jsonb_path_exists(progress, '$.* ? (@.type() != "boolean")')
  );
commit;
