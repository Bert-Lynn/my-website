-- Non-destructive correction: omitted legacy and new keys are retained.
-- Only explicit values (including false undo tombstones) replace same-named keys.
-- Changes future CAS-guarded RPC writes only; no existing rows are rewritten here.
-- No Auth, grants, policies, owner predicates, or credentials are changed.

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
