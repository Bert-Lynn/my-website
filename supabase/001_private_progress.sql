-- Apply only to the separately approved project. This migration touches no existing application tables/auth settings.
begin;
create table public.phd_roadmap_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  version bigint not null default 1 check (version > 0),
  updated_at timestamptz not null default now(),
  constraint phd_progress_shape check (
    jsonb_typeof(progress) = 'object'
    and octet_length(progress::text) < 8192
    and progress - array['sep-python', 'sep-git', 'sep-paper0', 'sep-a-data', 'oct-a-base', 'oct-algo', 'oct-repo', 'nov-d2l', 'nov-a-models', 'nov-a-horizon', 'dec-a-shift', 'dec-air-v01', 'dec-vision-mini', 'jan-seq', 'jan-a-write', 'jan-b-base', 'feb-a-submit', 'feb-air-v1', 'feb-b-metric', 'mar-cs231n', 'mar-b-dfl', 'mar-vision-repro', 'apr-b-robust', 'apr-c-scope', 'apr-vision-v01', 'may-multimodal', 'may-b-write', 'may-c-pilot', 'jun-b-submit', 'jun-vision-v05', 'jun-c-rq', 'jul-special', 'jul-c-main', 'jul-c-ablation', 'aug-c-full', 'aug-vision-v1', 'aug-c-draft', 'sep-interview', 'sep-c-submit', 'sep-revision', 'sep-apply']::text[] = '{}'::jsonb
    and not jsonb_path_exists(progress, '$.* ? (@.type() != "boolean")')
  )
);
alter table public.phd_roadmap_progress enable row level security;
alter table public.phd_roadmap_progress force row level security;
revoke all on public.phd_roadmap_progress from anon, public, authenticated;
grant select, insert, update on public.phd_roadmap_progress to authenticated;
create policy phd_select_own on public.phd_roadmap_progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy phd_insert_own on public.phd_roadmap_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy phd_update_own on public.phd_roadmap_progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Atomic compare-and-swap. A stale snapshot is returned as a conflict, never overwritten.
create function public.phd_save_progress(expected_version bigint, next_progress jsonb)
returns table(applied boolean, progress jsonb, version bigint)
language plpgsql security invoker set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  current_row public.phd_roadmap_progress%rowtype;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if expected_version is null or expected_version < 0 or next_progress is null then
    raise exception 'Invalid progress request' using errcode = '22023';
  end if;
  if expected_version = 0 then
    insert into public.phd_roadmap_progress(user_id, progress, version)
      values(owner_id, next_progress, 1) on conflict (user_id) do nothing
      returning * into current_row;
    if found then
      return query select true, current_row.progress, current_row.version; return;
    end if;
  end if;
  select p.* into current_row from public.phd_roadmap_progress p where p.user_id = owner_id for update;
  if not found then return query select false, '{}'::jsonb, 0::bigint; return; end if;
  if current_row.version <> expected_version then
    return query select false, current_row.progress, current_row.version; return;
  end if;
  update public.phd_roadmap_progress p
    set progress = next_progress, version = p.version + 1, updated_at = now()
    where p.user_id = owner_id returning p.* into current_row;
  return query select true, current_row.progress, current_row.version;
end;
$$;
revoke all on function public.phd_save_progress(bigint, jsonb) from public, anon, authenticated;
grant execute on function public.phd_save_progress(bigint, jsonb) to authenticated;
commit;
