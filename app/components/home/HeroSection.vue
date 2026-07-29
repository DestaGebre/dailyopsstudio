<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { etsyUrl } = useSiteLinks()

const heroImage = {
  src: '/images/dailyops/hero-banner.jpg',
  alt: 'DailyOpsStudio hero illustration for practical digital templates'
}
</script>

<template>
  <section class="site-section home-hero" aria-labelledby="hero-title">
    <div class="stack">
      <h1 id="hero-title">Practical templates for work, business and everyday life.</h1>
      <p>
        Streamline planning, improve operations, and keep every area of life organized with professionally
        structured template packs from DailyOpsStudio.
      </p>
      <div class="home-hero__actions">
        <NuxtLink class="button button--primary" to="/shop">Browse Shop</NuxtLink>
        <a
          v-if="etsyUrl"
          class="button button--secondary"
          :href="etsyUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Etsy
        </a>
      </div>
    </div>
    <NuxtImg
      class="home-hero__image"
      :src="heroImage.src"
      :alt="heroImage.alt"
      width="1400"
      height="900"
      format="webp"
      quality="82"
      densities="x1 x2"
      loading="eager"
      fetchpriority="high"
    />
  </section>
</template>
