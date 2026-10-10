-- Add private self-assessments and project milestones to the existing owner-only row.
-- Independent CAS; existing progress, lesson/date RPCs, grants, RLS and Auth are unchanged.
create function public.phd_career_state_valid(value jsonb)
returns boolean language plpgsql immutable security invoker set search_path = '' as $$
declare
  item record; a jsonb; item_key text; skill_id text; score_sum numeric; criterion record;
  skill_ids text[] := array['ai-code','reproducible-workflow','sql-data','statistics-metrics','ml-validation','time-forecast','optimization-modeling','decision-evaluation','software-testing','api-delivery','agent-evaluation','technical-interview','pytorch-training'];
  date_value text; url_value text;
begin
  if value is null or jsonb_typeof(value) <> 'object' or octet_length(value::text) > 524288 then return false; end if;
  for item in select * from jsonb_each(value) loop
    item_key := item.key;
    if item_key = 'selectedRole' then
      if jsonb_typeof(item.value) <> 'string' or item.value #>> '{}' not in ('decision_optimization','forecasting_ml','agent_engineering','search_recommendation','foundation_model_research') then return false; end if;
    elsif left(item_key,6) = 'skill:' and substr(item_key,7) = any(skill_ids) then
      skill_id := substr(item_key,7);
      if jsonb_typeof(item.value) <> 'object' or not item.value ?& array['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification','history']
        or item.value - array['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification','history'] <> '{}'::jsonb
        or jsonb_typeof(item.value -> 'history') <> 'array' then return false; end if;
      if jsonb_array_length(item.value -> 'history') > 5 then return false; end if;
      for a in select item.value - 'history' union all select * from jsonb_array_elements(item.value -> 'history') loop
        if jsonb_typeof(a) <> 'object' or not a ?& array['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification']
          or a - array['level','score','rubric','evidenceUrl','evidenceNote','assessedAt','verification'] <> '{}'::jsonb
          or jsonb_typeof(a->'level') <> 'string' or a->>'level' not in ('untested','learning','practicing','passed')
          or a->>'verification' <> 'self_assessed' or jsonb_typeof(a->'verification') <> 'string'
          or jsonb_typeof(a->'rubric') <> 'object' or jsonb_typeof(a->'score') <> 'number'
          or jsonb_typeof(a->'evidenceUrl') <> 'string' or length(a->>'evidenceUrl') > 2048
          or jsonb_typeof(a->'evidenceNote') <> 'string' or length(a->>'evidenceNote') > 2000
          or jsonb_typeof(a->'assessedAt') <> 'string' then return false; end if;
        if not (a->'rubric') ?& array[skill_id||'-c1',skill_id||'-c2',skill_id||'-c3',skill_id||'-c4']
          or (a->'rubric') - array[skill_id||'-c1',skill_id||'-c2',skill_id||'-c3',skill_id||'-c4'] <> '{}'::jsonb then return false; end if;
        score_sum := 0;
        for criterion in select * from jsonb_each(a->'rubric') loop
          if jsonb_typeof(criterion.value) <> 'number' or criterion.value::text !~ '^[0-4]$' then return false; end if;
          score_sum := score_sum + (criterion.value::text)::numeric;
        end loop;
        if (a->>'score')::numeric <> round(score_sum/16*100) then return false; end if;
        if a->>'level' = 'passed' and (score_sum <> 16 or (btrim(a->>'evidenceUrl') = '' and btrim(a->>'evidenceNote') = '')) then return false; end if;
        date_value := a->>'assessedAt'; url_value := a->>'evidenceUrl';
        if date_value <> '' and (date_value !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}Z$'
          or to_char(date_value::timestamptz at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') <> date_value) then return false; end if;
        if url_value <> '' and url_value !~* '^https?://[^/?#[:space:]@]+([/?#][^[:space:]]*)?$' then return false; end if;
      end loop;
    elsif item_key = any(array['milestone:demand-decision-lab:ddl-m0','milestone:demand-decision-lab:ddl-m1','milestone:demand-decision-lab:ddl-m2','milestone:demand-decision-lab:ddl-m3','milestone:demand-decision-lab:ddl-m4','milestone:demand-decision-lab:ddl-m5','milestone:demand-decision-lab:ddl-m6']) then
      a := item.value;
      if jsonb_typeof(a) <> 'object' or not a ?& array['status','evidenceUrl','completedAt'] or a - array['status','evidenceUrl','completedAt'] <> '{}'::jsonb
        or jsonb_typeof(a->'status') <> 'string' or a->>'status' not in ('todo','doing','done')
        or jsonb_typeof(a->'evidenceUrl') <> 'string' or length(a->>'evidenceUrl') > 2048 or jsonb_typeof(a->'completedAt') <> 'string' then return false; end if;
      date_value := a->>'completedAt'; url_value := a->>'evidenceUrl';
      if a->>'status' <> 'done' and date_value <> '' then return false; end if;
      if date_value <> '' and (date_value !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}[.][0-9]{3}Z$'
        or to_char(date_value::timestamptz at time zone 'UTC','YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') <> date_value) then return false; end if;
      if url_value <> '' and url_value !~* '^https?://[^/?#[:space:]@]+([/?#][^[:space:]]*)?$' then return false; end if;
    else return false;
    end if;
  end loop;
  return true;
exception when others then return false;
end;
$$;
revoke all on function public.phd_career_state_valid(jsonb) from public, anon;
grant execute on function public.phd_career_state_valid(jsonb) to authenticated;
alter table public.phd_roadmap_progress
  add column career_state jsonb not null default '{}'::jsonb,
  add column career_state_version bigint not null default 0 check(career_state_version >= 0),
  add constraint phd_career_state_shape check(public.phd_career_state_valid(career_state));
create function public.phd_save_career_state(expected_version bigint, next_career_state jsonb)
returns table(applied boolean, career_state jsonb, career_state_version bigint)
language plpgsql security invoker set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  current_row public.phd_roadmap_progress%rowtype;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_version is null or expected_version < 0 or next_career_state is null then
    raise exception 'Invalid career progress request' using errcode = '22023';
  end if;
  if expected_version = 0 then
    insert into public.phd_roadmap_progress(user_id, career_state, career_state_version)
      values(owner_id, next_career_state, 1) on conflict (user_id) do nothing returning * into current_row;
    if found then return query select true, current_row.career_state, current_row.career_state_version; return; end if;
  end if;
  select p.* into current_row from public.phd_roadmap_progress p where p.user_id = owner_id for update;
  if not found then return query select false, '{}'::jsonb, 0::bigint; return; end if;
  if current_row.career_state_version <> expected_version then
    return query select false, current_row.career_state, current_row.career_state_version; return;
  end if;
  update public.phd_roadmap_progress p set career_state=next_career_state, career_state_version=p.career_state_version+1, updated_at=now()
    where p.user_id=owner_id returning p.* into current_row;
  return query select true, current_row.career_state, current_row.career_state_version;
end;
$$;
revoke all on function public.phd_save_career_state(bigint,jsonb) from public, anon;
grant execute on function public.phd_save_career_state(bigint,jsonb) to authenticated;
