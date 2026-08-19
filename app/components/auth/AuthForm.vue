<script setup lang="ts">
const props = defineProps<{ mode: 'login' | 'register' | 'forgot' | 'reset' }>()
const client = useSupabase()
const route = useRoute()
const email = ref('')
const password = ref('')
const displayName = ref('')
const busy = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const title = computed(
  () =>
    ({
      login: 'Welcome back',
      register: 'Create your account',
      forgot: 'Reset your password',
      reset: 'Choose a new password'
    })[props.mode]
)

const submit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  if (!client) {
    errorMessage.value = 'Supabase is not configured for this environment.'
    return
  }
  busy.value = true
  try {
    if (props.mode === 'login') {
      const { error } = await client.auth.signInWithPassword({ email: email.value, password: password.value })
      if (error) throw error
      const redirect =
        typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
          ? route.query.redirect
          : '/dashboard'
      await navigateTo(redirect)
    } else if (props.mode === 'register') {
      const redirectTo = `${window.location.origin}/auth/callback`
      const { error } = await client.auth.signUp({
        email: email.value,
        password: password.value,
        options: { emailRedirectTo: redirectTo, data: { display_name: displayName.value } }
      })
      if (error) throw error
      successMessage.value = 'Check your email and follow the confirmation link.'
    } else if (props.mode === 'forgot') {
      const { error } = await client.auth.resetPasswordForEmail(email.value, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`
      })
      if (error) throw error
      successMessage.value = 'If an account exists, a recovery link is on its way.'
    } else {
      const { error } = await client.auth.updateUser({ password: password.value })
      if (error) throw error
      successMessage.value = 'Password updated. You can now open your dashboard.'
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'The request could not be completed.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section class="auth-shell" :aria-labelledby="`auth-${mode}-title`">
    <div class="auth-card stack">
      <LayoutPageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: title }]" />
      <form class="card stack" @submit.prevent="submit">
        <p class="resource-eyebrow">DailyOps dashboard</p>
        <h1 :id="`auth-${mode}-title`">{{ title }}</h1>
        <p v-if="errorMessage" class="auth-message auth-message--error" role="alert">{{ errorMessage }}</p>
        <p v-if="successMessage" class="auth-message auth-message--success" role="status">{{ successMessage }}</p>
        <label v-if="mode === 'register'"
          >Display name<input v-model.trim="displayName" autocomplete="name" maxlength="100" required
        /></label>
        <label v-if="mode !== 'reset'"
          >Email address<input v-model.trim="email" type="email" autocomplete="email" required
        /></label>
        <label v-if="mode === 'login' || mode === 'register' || mode === 'reset'"
          >Password<input
            v-model="password"
            type="password"
            :autocomplete="mode === 'login' ? 'current-password' : 'new-password'"
            minlength="8"
            required
        /></label>
        <button class="button button--primary" type="submit" :disabled="busy">
          {{
            busy
              ? 'Working…'
              : mode === 'login'
                ? 'Sign in'
                : mode === 'register'
                  ? 'Create account'
                  : mode === 'forgot'
                    ? 'Send recovery link'
                    : 'Save password'
          }}
        </button>
        <div class="auth-links">
          <NuxtLink v-if="mode !== 'login'" to="/login">Sign in</NuxtLink>
          <NuxtLink v-if="mode === 'login'" to="/forgot-password">Forgot password?</NuxtLink>
          <NuxtLink v-if="mode !== 'register'" to="/register">Create account</NuxtLink>
        </div>
      </form>
    </div>
  </section>
</template>
