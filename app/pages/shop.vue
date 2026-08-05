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
  status?: 'draft' | 'published' | 'archived'
}

const { etsyUrl } = useSiteLinks()
const route = useRoute()

const { data } = await useAsyncData('shop-products', async () => {
  const items = await queryCollection('products').all()

  return (items as ProductItem[])
    .filter((item) => item.status === 'published')
    .filter((item) => Boolean(item.title || item.description))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
})

const products = computed(() => data.value ?? [])
const categories = computed(() => {
  const values = new Set(products.value.map((product) => product.category).filter(Boolean) as string[])
  return ['All templates', ...Array.from(values).sort()]
})
const selectedCategory = computed(() => {
  const queryCategory = typeof route.query.category === 'string' ? route.query.category : ''
  return categories.value.includes(queryCategory) ? queryCategory : 'All templates'
})
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All templates') {
    return products.value
  }

  return products.value.filter((product) => product.category === selectedCategory.value)
})

usePageSeo({
  title: 'Shop',
  description: 'Browse practical digital templates across work, business and everyday life.'
})
</script>

<template>
  <section class="site-section stack">
    <div class="section-heading stack">
      <h1>Shop</h1>
      <p>Browse practical templates designed for restaurant operations and everyday business workflows.</p>
    </div>

    <nav v-if="products.length" class="blog-filter-group" aria-label="Filter templates by category">
      <p class="blog-filter-group__label">Category</p>
      <div class="blog-filter-group__chips">
        <NuxtLink
          v-for="category in categories"
          :key="category"
          class="blog-filter-chip"
          :class="{ 'blog-filter-chip--active': selectedCategory === category }"
          :to="category === 'All templates' ? '/shop' : { path: '/shop', query: { category } }"
          :aria-current="selectedCategory === category ? 'page' : undefined"
        >
          {{ category }}
        </NuxtLink>
      </div>
    </nav>

    <div v-if="filteredProducts.length" class="site-grid site-grid--3">
      <article
        v-for="product in filteredProducts"
        :key="product.path || product.title"
        class="card card--product stack"
      >
        <NuxtImg
          v-if="product.image"
          class="product-card__image"
          :src="product.image"
          :alt="`${product.title || 'DailyOpsStudio template'} preview`"
          width="720"
          height="420"
          loading="lazy"
          format="webp"
          quality="82"
        />
        <p class="product-card__category">{{ product.category || product.collection || 'Digital Template' }}</p>
        <h2>{{ product.title || 'Template product' }}</h2>
        <p class="text-muted">
          {{ product.description || 'Professional template designed for practical everyday use.' }}
        </p>
        <p v-if="product.price" class="product-card__price">From {{ product.price }} {{ product.currency || 'EUR' }}</p>
        <NuxtLink class="button button--secondary" :to="product.path || '/shop'">View Product</NuxtLink>
      </article>
    </div>

    <div v-else class="card stack">
      <h2>
        {{ products.length ? 'No published templates in this category yet' : 'Product catalogue is being prepared' }}
      </h2>
      <p class="text-muted">
        {{
          products.length
            ? 'Browse all templates or check back as this collection grows.'
            : 'New collections will appear here as soon as they are ready.'
        }}
      </p>
      <NuxtLink v-if="products.length" class="button button--secondary" to="/shop">Browse All Templates</NuxtLink>
      <a v-if="etsyUrl" class="button button--primary" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
        Open Etsy Shop
      </a>
    </div>
  </section>
</template>
