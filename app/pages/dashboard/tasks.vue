<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth-client' })
usePageSeo({ title: 'Background Tasks', description: 'Monitor private DailyOps background work.' })
const { tasks, loadTasks } = useBackgroundTasks()
const errorMessage = ref('')
onMounted(async () => {
  try {
    await loadTasks()
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Tasks could not be loaded.'
  }
})
const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
const resultLabel = (task: { error: string | null; result: unknown }) =>
  task.error || (task.result ? 'Research brief available' : 'Waiting')
const researchBrief = (result: unknown) => {
  if (!result || typeof result !== 'object' || !('brief' in result)) return ''
  return typeof result.brief === 'string' ? result.brief : ''
}
</script>
<template>
  <section class="stack">
    <div>
      <p class="resource-eyebrow">Automation</p>
      <h1>Background Tasks</h1>
      <p>Research requests run outside the browser and preserve their result or failure.</p>
    </div>
    <p v-if="errorMessage" class="auth-message auth-message--error" role="alert">{{ errorMessage }}</p>
    <div v-if="tasks.length" class="research-table-wrap" tabindex="0">
      <table class="research-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Created</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.task_type.replace('_', ' ') }}</td>
            <td>
              <span class="task-status" :data-status="task.status">{{ task.status }}</span>
            </td>
            <td>{{ formatDate(task.created_at) }}</td>
            <td>
              {{ resultLabel(task) }}
              <details v-if="researchBrief(task.result)" class="task-result">
                <summary>Read brief</summary>
                <p>{{ researchBrief(task.result) }}</p>
              </details>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="research-empty">No background tasks yet. Queue one from a Market Research opportunity.</p>
  </section>
</template>
