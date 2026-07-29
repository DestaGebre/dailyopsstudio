<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { etsyUrl } = useSiteLinks()

useSeoMeta({
  title: 'Shop',
  description: 'Browse practical digital templates across work, business and everyday life.'
})
</script>

<template>
  <section class="site-section stack">
    <h1>Shop</h1>
    <p>
      This page will list all available template products loaded from Markdown content.
    </p>
    <div class="card stack">
      <p class="text-muted">Product catalogue coming in Task 02.</p>
      <a
        v-if="etsyUrl"
        class="button button--primary"
        :href="etsyUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Etsy Shop
      </a>
    </div>
  </section>
</template>
