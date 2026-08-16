<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth-client' })
usePageSeo({ title: 'Market Research Dashboard', description: 'Manage private market opportunity investigations.' })
</script>
<template>
  <section class="stack">
    <div>
      <p class="resource-eyebrow">Decision engine</p>
      <h1>Market Research</h1>
      <p>Evidence should end in a decision and a bounded next action.</p>
    </div>
    <MarketResearchWorkspace />
  </section>
</template>
