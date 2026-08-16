alter table public.market_opportunities alter column decision drop not null;
alter table public.market_opportunities alter column decision drop default;
alter table public.market_opportunities add column decision_reason text not null default '';

create table public.market_research_records (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.market_opportunities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  question text not null check (char_length(question) between 1 and 1000),
  summary text not null check (char_length(summary) between 1 and 5000),
  assumptions jsonb not null default '[]'::jsonb check (jsonb_typeof(assumptions) = 'array'),
  economics text not null default '',
  risks jsonb not null default '[]'::jsonb check (jsonb_typeof(risks) = 'array'),
  recommended_action text not null default '',
  created_at timestamptz not null default now()
);
create index market_research_records_opportunity_idx on public.market_research_records (opportunity_id, created_at desc);

create table public.market_decision_records (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.market_opportunities (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  decision text not null check (decision in ('GO', 'VALIDATE', 'HOLD', 'REJECT')),
  score numeric(3,1) not null check (score between 0 and 10),
  reason text not null check (char_length(reason) between 1 and 2000),
  next_action text not null check (char_length(next_action) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index market_decision_records_opportunity_idx on public.market_decision_records (opportunity_id, created_at desc);

alter table public.market_research_records enable row level security;
alter table public.market_decision_records enable row level security;
create policy "research_records_own_select" on public.market_research_records for select to authenticated using ((select auth.uid()) = user_id);
create policy "research_records_own_insert" on public.market_research_records for insert to authenticated with check ((select auth.uid()) = user_id and exists (select 1 from public.market_opportunities o where o.id = opportunity_id and o.user_id = (select auth.uid())));
create policy "decision_records_own_select" on public.market_decision_records for select to authenticated using ((select auth.uid()) = user_id);
create policy "decision_records_own_insert" on public.market_decision_records for insert to authenticated with check (
  (select auth.uid()) = user_id
  and exists (select 1 from public.market_opportunities o where o.id = opportunity_id and o.user_id = (select auth.uid()))
  and exists (select 1 from public.market_evidence e where e.opportunity_id = opportunity_id and e.user_id = (select auth.uid()))
);
grant select, insert on public.market_research_records, public.market_decision_records to authenticated;

-- Existing unevidenced recommendations were provisional, not defensible decisions.
update public.market_opportunities o set decision = null, decision_reason = ''
where not exists (select 1 from public.market_evidence e where e.opportunity_id = o.id);

update public.market_opportunities
set decision_reason = 'Migrated recommendation; review and record a new decision reason.'
where decision is not null and trim(decision_reason) = '';

alter table public.market_opportunities add constraint market_opportunities_decision_contract check (
  decision is null or (char_length(trim(decision_reason)) > 0 and char_length(trim(next_action)) > 0)
);

create function public.enforce_opportunity_decision_evidence() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if new.decision is not null and not exists (
    select 1 from public.market_evidence e
    where e.opportunity_id = new.id and e.user_id = new.user_id
  ) then
    raise exception 'A market decision requires supporting evidence' using errcode = '23514';
  end if;
  return new;
end; $$;
revoke execute on function public.enforce_opportunity_decision_evidence() from public, anon, authenticated;
create trigger opportunities_require_decision_evidence
before insert or update of decision on public.market_opportunities
for each row execute function public.enforce_opportunity_decision_evidence();
