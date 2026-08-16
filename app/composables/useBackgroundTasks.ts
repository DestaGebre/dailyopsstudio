import type { Json } from '~/types/database'

interface BackgroundTask {
  id: string
  opportunity_id: string | null
  task_type: string
  status: string
  payload: unknown
  result: unknown
  error: string | null
  attempts: number
  created_at: string
  started_at: string | null
  completed_at: string | null
}
const tasks = ref<BackgroundTask[]>([])

export const useBackgroundTasks = () => {
  const client = useSupabase()
  const { user, initialize } = useAuth()

  const loadTasks = async () => {
    await initialize()
    if (!client || !user.value) return
    const { data, error } = await client.from('background_tasks').select('*').order('created_at', { ascending: false })
    if (error) throw error
    tasks.value = (data ?? []) as BackgroundTask[]
  }

  const queueResearchBrief = async (opportunityId: string, title: string, researchQuestion: string) => {
    await initialize()
    if (!client || !user.value) throw new Error('Sign in to queue background work.')
    const payload: Json = { title, researchQuestion }
    const { error } = await client
      .from('background_tasks')
      .insert({ user_id: user.value.id, opportunity_id: opportunityId, task_type: 'research_brief', payload })
    if (error) throw error
    await loadTasks()
  }

  return { tasks, loadTasks, queueResearchBrief }
}
