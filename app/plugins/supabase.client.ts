import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const url = config.public.supabaseUrl
  const key = config.public.supabasePublishableKey
  const client =
    url && key
      ? createClient<Database>(url, key, {
          auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
        })
      : null
  return { provide: { supabase: client as SupabaseClient<Database> | null } }
})

declare module '#app' {
  interface NuxtApp {
    $supabase: SupabaseClient<Database> | null
  }
}
