import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

Deno.serve(async (request) => {
  const cronSecret = Deno.env.get('SUPABASE_CRON_SECRET')
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`)
    return json({ error: 'Unauthorized' }, 401)

  const url = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const openAiKey = Deno.env.get('OPENAI_API_KEY')
  if (!url || !serviceKey || !openAiKey) return json({ error: 'Required function secrets are missing.' }, 500)

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } })
  const { data: queued, error: queueError } = await supabase
    .from('background_tasks')
    .select('*')
    .eq('status', 'queued')
    .lt('attempts', 5)
    .order('created_at')
    .limit(1)
    .maybeSingle()
  if (queueError) return json({ error: queueError.message }, 500)
  if (!queued) return json({ processed: 0 })

  const { data: claimed } = await supabase
    .from('background_tasks')
    .update({ status: 'running', started_at: new Date().toISOString(), attempts: queued.attempts + 1 })
    .eq('id', queued.id)
    .eq('status', 'queued')
    .select('id')
    .maybeSingle()
  if (!claimed) return json({ processed: 0, reason: 'Task was claimed elsewhere.' })

  try {
    const prompt = `You are the DailyOps market research employee. Produce a concise research brief for this opportunity. Separate facts to verify, assumptions, contradictory signals, economics, competition, operational and compliance blockers. End with the smallest validation experiment, measurable success criteria, stop criteria, and one recommended next action. Never invent evidence.\n\nOpportunity: ${queued.payload?.title ?? 'Untitled'}\nQuestion: ${queued.payload?.researchQuestion ?? 'What must be validated?'}`
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { authorization: `Bearer ${openAiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: Deno.env.get('OPENAI_MODEL') ?? 'gpt-5-mini', input: prompt })
    })
    if (!response.ok) throw new Error(`OpenAI request failed (${response.status}).`)
    const output = await response.json()
    const brief = output.output
      ?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content ?? [])
      .find((item: { type?: string }) => item.type === 'output_text')?.text
    if (!brief) throw new Error('The research provider returned no brief.')
    await supabase
      .from('background_tasks')
      .update({ status: 'succeeded', result: { brief }, completed_at: new Date().toISOString(), error: null })
      .eq('id', queued.id)
    return json({ processed: 1, taskId: queued.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown task failure.'
    await supabase
      .from('background_tasks')
      .update({ status: 'failed', error: message, completed_at: new Date().toISOString() })
      .eq('id', queued.id)
    return json({ processed: 1, taskId: queued.id, error: message }, 500)
  }
})
