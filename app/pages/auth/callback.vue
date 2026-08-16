<script setup lang="ts">
definePageMeta({ layout: false })
const message = ref('Confirming your account…')
onMounted(async () => {
  const client = useSupabase()
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const requestedNext = url.searchParams.get('next')
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//') ? requestedNext : '/dashboard'
  if (!client || !code) {
    message.value = 'This confirmation link is invalid or expired.'
    return
  }
  const { error } = await client.auth.exchangeCodeForSession(code)
  if (error) {
    message.value = error.message
    return
  }
  await navigateTo(next)
})
</script>
<template>
  <main class="auth-shell">
    <p role="status">{{ message }}</p>
  </main>
</template>
