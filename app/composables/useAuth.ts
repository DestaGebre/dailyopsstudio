import type { User } from '@supabase/supabase-js'

const authUser = ref<User | null>(null)
const authReady = ref(false)

export const useAuth = () => {
  const client = useSupabase()

  const initialize = async () => {
    if (authReady.value) return
    if (!client) {
      authReady.value = true
      return
    }
    const { data } = await client.auth.getUser()
    authUser.value = data.user
    client.auth.onAuthStateChange((_event, session) => {
      authUser.value = session?.user ?? null
    })
    authReady.value = true
  }

  const signOut = async () => {
    if (client) await client.auth.signOut()
    authUser.value = null
    await navigateTo('/login')
  }

  return { user: readonly(authUser), ready: readonly(authReady), initialize, signOut }
}
