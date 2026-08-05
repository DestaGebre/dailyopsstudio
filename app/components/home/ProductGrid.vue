<script setup lang="ts">
interface ProductItem {
  path?: string
  title?: string
  description?: string
  image?: string
  category?: string
}

const { data } = await useAsyncData('home-featured-products', async () => {
  const items = await queryCollection('content').all()
  return (items as ProductItem[])
    .filter((item) => (item.path || '').startsWith('/products/'))
    .filter((item) => Boolean(item.title || item.description))
    .slice(0, 6)
})

const featuredProducts = computed(() => data.value ?? [])
</script>

<template>
  <section class="site-section" aria-labelledby="products-title">
    <div class="section-heading stack">
      <h2 id="products-title">Featured Products</h2>
      <p class="text-muted">A quick look at practical templates ready for immediate use.</p>
    </div>

    <div v-if="featuredProducts.length" class="site-grid site-grid--3">
      <article v-for="product in featuredProducts" :key="product.path || product.title" class="card card--product stack">
        <NuxtImg
          class="product-card__image"
          :src="product.image || '/images/dailyops/etsy-shop-banner.png'"
          :alt="`${product.title || 'DailyOpsStudio template'} preview`"
          width="640"
          height="420"
          loading="lazy"
          format="webp"
          quality="82"
        />
        <p class="product-card__category">{{ product.category || 'Digital Template' }}</p>
        <h3>{{ product.title || 'Template product' }}</h3>
        <p class="text-muted">{{ product.description || 'Professional template designed for practical everyday use.' }}</p>
        <NuxtLink class="button button--secondary" :to="product.path || '/shop'">View Product</NuxtLink>
      </article>
    </div>

    <div v-else class="card stack">
      <h3>Featured products are being prepared</h3>
      <p class="text-muted">
        Product entries will appear here automatically as soon as Markdown files are added to
        the products collection.
      </p>
      <NuxtLink class="button button--primary" to="/shop">Browse Shop</NuxtLink>
    </div>
  </section>
</template>
