<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { etsyUrl } = useSiteLinks()
</script>

<template>
  <section class="site-section cta-section" aria-labelledby="cta-title">
    <div class="card card--cta stack">
      <h2 id="cta-title">Ready to simplify your workflow?</h2>
      <p class="text-muted">
        Explore the full DailyOpsStudio collection and choose templates that support your work and daily life.
      </p>
      <div class="home-hero__actions cta-section__actions">
        <NuxtLink class="button button--primary" to="/shop">Browse Full Collection</NuxtLink>
        <a v-if="etsyUrl" class="button button--secondary" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
          Visit Etsy
        </a>
      </div>
    </div>
  </section>
</template>
