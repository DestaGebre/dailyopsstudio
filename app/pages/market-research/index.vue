<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth-client' })
usePageSeo({
  title: 'Market Research',
  description:
    'Evaluate business opportunities with evidence, explicit scoring, decisive recommendations, and bounded next actions.'
})
</script>

<template>
  <section class="site-section stack" aria-labelledby="market-research-title">
    <div class="research-hero stack">
      <p class="resource-eyebrow">DailyOps decision engine</p>
      <h1 id="market-research-title">Market Research</h1>
      <p class="resource-hero__lead">
        Decide what business opportunity to pursue, validate, hold, or reject next. Research is only useful when it
        produces an action.
      </p>
      <p class="research-storage-note">
        V1 saves investigations privately in this browser. It does not sync between devices.
      </p>
    </div>
    <MarketResearchWorkspace />
  </section>
</template>
