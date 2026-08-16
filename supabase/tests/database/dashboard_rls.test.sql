begin;
select plan(13);

insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-000000000001', 'owner@example.com'),
  ('00000000-0000-0000-0000-000000000002', 'other@example.com');

set local role authenticated;
set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';

select lives_ok($$insert into public.market_opportunities (id, user_id, title) values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Owned')$$, 'owner creates opportunity');
select throws_ok($$update public.market_opportunities set decision = 'GO', decision_reason = 'Unsupported', next_action = 'Build' where id = '10000000-0000-0000-0000-000000000001'$$, '23514', 'A market decision requires supporting evidence', 'decision without evidence is rejected');
select is((select count(*) from public.market_opportunities), 1::bigint, 'owner reads own opportunity');
select lives_ok($$insert into public.market_evidence (opportunity_id, user_id, claim, source, direction) values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Claim', 'Interview', 'positive')$$, 'owner creates evidence');
select lives_ok($$update public.market_opportunities set decision = 'VALIDATE', decision_reason = 'Evidence is early.', next_action = 'Run five offer tests' where id = '10000000-0000-0000-0000-000000000001'$$, 'evidence-backed decision is accepted');
select lives_ok($$insert into public.market_research_records (opportunity_id, user_id, question, summary, assumptions, economics, risks, recommended_action) values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Is it viable?', 'Customers report the problem.', '["Price sensitivity"]', 'Price 20, cost 5', '["Crowded market"]', 'Run five offer tests')$$, 'owner preserves research history');
select lives_ok($$insert into public.market_decision_records (opportunity_id, user_id, decision, score, reason, next_action) values ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'VALIDATE', 6.5, 'Evidence exists but confidence is limited.', 'Run five offer tests')$$, 'owner preserves decision history');
select lives_ok($$insert into public.background_tasks (user_id, opportunity_id, task_type) values ('00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'research_brief')$$, 'owner queues task');
select throws_ok($$update public.background_tasks set status = 'succeeded'$$, '42501', null, 'browser user cannot complete tasks');

set local request.jwt.claims = '{"sub":"00000000-0000-0000-0000-000000000002","role":"authenticated"}';
select is((select count(*) from public.market_opportunities), 0::bigint, 'other user cannot read owner opportunity');
select is((select count(*) from public.background_tasks), 0::bigint, 'other user cannot read owner task');
select is((select count(*) from public.market_research_records), 0::bigint, 'other user cannot read owner research history');
select is((select count(*) from public.market_decision_records), 0::bigint, 'other user cannot read owner decision history');

select * from finish();
rollback;
