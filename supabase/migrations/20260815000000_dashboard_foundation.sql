create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 100),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.market_opportunities (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160), business_model text not null default '',
  target_customer text not null default '', research_question text not null default '', notes text not null default '',
  blockers jsonb not null default '[]'::jsonb check (jsonb_typeof(blockers) = 'array'),
  scores jsonb not null default '{}'::jsonb check (jsonb_typeof(scores) = 'object'),
  decision text not null default 'VALIDATE' check (decision in ('GO', 'VALIDATE', 'HOLD', 'REJECT')),
  score numeric(3,1) not null default 0 check (score between 0 and 10), next_action text not null default '',
  success_criteria text not null default '', stop_criteria text not null default '',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index market_opportunities_user_updated_idx on public.market_opportunities (user_id, updated_at desc);

create table public.market_evidence (
  id uuid primary key default gen_random_uuid(), opportunity_id uuid not null references public.market_opportunities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade, claim text not null check (char_length(claim) between 1 and 2000),
  source text not null, source_url text, direction text not null check (direction in ('positive', 'neutral', 'negative')),
  created_at timestamptz not null default now()
);
create index market_evidence_opportunity_idx on public.market_evidence (opportunity_id, created_at);

create table public.market_suppliers (
  id uuid primary key default gen_random_uuid(), opportunity_id uuid not null references public.market_opportunities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade, name text not null, url text,
  requirements text not null default '', notes text not null default '', created_at timestamptz not null default now()
);
create index market_suppliers_opportunity_idx on public.market_suppliers (opportunity_id, created_at);

create table public.background_tasks (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_id uuid references public.market_opportunities (id) on delete cascade,
  task_type text not null check (task_type in ('research_brief')),
  status text not null default 'queued' check (status in ('queued', 'running', 'succeeded', 'failed')),
  payload jsonb not null default '{}'::jsonb, result jsonb, error text, attempts integer not null default 0 check (attempts between 0 and 5),
  created_at timestamptz not null default now(), started_at timestamptz, completed_at timestamptz
);
create index background_tasks_queue_idx on public.background_tasks (status, created_at) where status = 'queued';
create index background_tasks_user_idx on public.background_tasks (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.market_opportunities enable row level security;
alter table public.market_evidence enable row level security;
alter table public.market_suppliers enable row level security;
alter table public.background_tasks enable row level security;

create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "opportunities_own_all" on public.market_opportunities for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "evidence_own_select" on public.market_evidence for select to authenticated using ((select auth.uid()) = user_id);
create policy "evidence_own_insert" on public.market_evidence for insert to authenticated with check ((select auth.uid()) = user_id and exists (select 1 from public.market_opportunities o where o.id = opportunity_id and o.user_id = (select auth.uid())));
create policy "evidence_own_delete" on public.market_evidence for delete to authenticated using ((select auth.uid()) = user_id);
create policy "suppliers_own_select" on public.market_suppliers for select to authenticated using ((select auth.uid()) = user_id);
create policy "suppliers_own_insert" on public.market_suppliers for insert to authenticated with check ((select auth.uid()) = user_id and exists (select 1 from public.market_opportunities o where o.id = opportunity_id and o.user_id = (select auth.uid())));
create policy "suppliers_own_delete" on public.market_suppliers for delete to authenticated using ((select auth.uid()) = user_id);
create policy "tasks_own_select" on public.background_tasks for select to authenticated using ((select auth.uid()) = user_id);
create policy "tasks_own_insert" on public.background_tasks for insert to authenticated with check (
  (select auth.uid()) = user_id and status = 'queued' and attempts = 0 and result is null and error is null
  and (opportunity_id is null or exists (select 1 from public.market_opportunities o where o.id = opportunity_id and o.user_id = (select auth.uid())))
);

grant select, update (display_name) on public.profiles to authenticated;
grant select, insert, update, delete on public.market_opportunities to authenticated;
grant select, insert, delete on public.market_evidence, public.market_suppliers to authenticated;
grant select, insert on public.background_tasks to authenticated;

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name) values (new.id, nullif(left(trim(new.raw_user_meta_data ->> 'display_name'), 100), ''));
  return new;
end; $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create function public.set_updated_at() returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
create trigger opportunities_set_updated_at before update on public.market_opportunities for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
