# DailyOps authenticated dashboard

DailyOps uses its own Supabase project. Do not connect it to Parenting Virtue or another product database.

## Local setup

1. Install Docker and the Supabase CLI, then run `npx supabase start`.
2. Copy the local API URL and publishable key into `.env` as `NUXT_PUBLIC_SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Run `npx supabase db reset` to apply migrations.
4. Configure Supabase Auth redirect URLs for `/auth/callback` and `/auth/callback?next=/reset-password`.

## Production setup

Create a dedicated DailyOps Supabase project, link the CLI, and push the migrations. Configure the two public values in the site host. Configure `OPENAI_API_KEY`, `OPENAI_MODEL`, and a random `SUPABASE_CRON_SECRET` only as Edge Function secrets.

In Supabase Auth URL Configuration, set the production Site URL and allow these exact DailyOps redirects:

- `https://dailyopsstudio.com/auth/callback`
- `https://dailyopsstudio.com/auth/callback?next=/reset-password`

Email confirmation and password recovery use PKCE. Both return through the callback page, which exchanges the one-time code before opening the dashboard or password form.

Deploy `process-research-tasks` and invoke it from Supabase Cron with an `Authorization: Bearer <SUPABASE_CRON_SECRET>` header. Never expose the service-role key, cron secret, or OpenAI key to Nuxt public runtime configuration.

The dashboard page shell is statically generated, but all business tables use row-level security. Static route protection is a UX boundary; RLS is the security boundary.
