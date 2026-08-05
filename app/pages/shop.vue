<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

interface ProductItem {
  path?: string
  title?: string
  description?: string
  image?: string
  category?: string
  collection?: string
  price?: string
  currency?: string
}

const { etsyUrl } = useSiteLinks()

const { data } = await useAsyncData('shop-products', async () => {
  const items = await queryCollection('content').all()

  return (items as ProductItem[])
    .filter((item) => (item.path || '').startsWith('/products/'))
    .filter((item) => Boolean(item.title || item.description))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
})

const products = computed(() => data.value ?? [])

usePageSeo({
  title: 'Shop',
  description: 'Browse practical digital templates across work, business and everyday life.'
})
</script>

<template>
  <section class="site-section stack">
    <div class="section-heading stack">
      <h1>Shop</h1>
      <p>
        Browse practical templates designed for restaurant operations and everyday business workflows.
      </p>
    </div>

    <div v-if="products.length" class="site-grid site-grid--3">
      <article v-for="product in products" :key="product.path || product.title" class="card card--product stack">
        <NuxtImg
          class="product-card__image"
          :src="product.image || '/images/dailyops/etsy-shop-banner.png'"
          :alt="`${product.title || 'DailyOpsStudio template'} preview`"
          width="720"
          height="420"
          loading="lazy"
          format="webp"
          quality="82"
        />
        <p class="product-card__category">{{ product.category || product.collection || 'Digital Template' }}</p>
        <h2>{{ product.title || 'Template product' }}</h2>
        <p class="text-muted">{{ product.description || 'Professional template designed for practical everyday use.' }}</p>
        <p v-if="product.price" class="product-card__price">From {{ product.price }} {{ product.currency || 'EUR' }}</p>
        <NuxtLink class="button button--secondary" :to="product.path || '/shop'">View Product</NuxtLink>
      </article>
    </div>

    <div v-else class="card stack">
      <p class="text-muted">Product catalogue is still being prepared.</p>
      <a v-if="etsyUrl" class="button button--primary" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
        Open Etsy Shop
      </a>
    </div>
  </section>
</template>
