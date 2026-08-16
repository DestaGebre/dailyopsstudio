<script setup lang="ts">
const { user, initialize, signOut } = useAuth()
onMounted(initialize)
const links = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Market Research', to: '/dashboard/market-research' },
  { label: 'Background Tasks', to: '/dashboard/tasks' }
]
</script>

<template>
  <div class="dashboard-shell">
    <aside class="dashboard-sidebar">
      <NuxtLink class="dashboard-brand" to="/">DailyOpsStudio</NuxtLink>
      <nav aria-label="Dashboard">
        <ul>
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="dashboard-account">
        <small>{{ user?.email }}</small
        ><button type="button" @click="signOut">Sign out</button>
      </div>
    </aside>
    <main class="dashboard-main">
      <div class="dashboard-container"><slot /></div>
    </main>
  </div>
</template>
