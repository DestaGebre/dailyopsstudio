<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth-client' })
usePageSeo({ title: 'Dashboard', description: 'DailyOps business operations dashboard.' })
</script>
<template>
  <section class="stack">
    <p class="resource-eyebrow">Private workspace</p>
    <h1>Dashboard</h1>
    <p>Manage research decisions and the work running in the background.</p>
    <div class="site-grid site-grid--2">
      <NuxtLink class="card stack" to="/dashboard/market-research"
        ><h2>Market Research</h2>
        <p>Turn evidence into a scored decision and next action.</p></NuxtLink
      ><NuxtLink class="card stack" to="/dashboard/tasks"
        ><h2>Background Tasks</h2>
        <p>Monitor queued, running, completed, and failed work.</p></NuxtLink
      >
    </div>
  </section>
</template>
