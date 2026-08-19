<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'
import { absoluteSiteUrl } from '~/config/seo'
import { breadcrumbSchema, productSchema, schemaGraph } from '~/utils/schema'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const { etsyUrl } = useSiteLinks()

interface ProductPost {
  path?: string
  title?: string
  description?: string
  image?: string
  category?: string
  collection?: string
  documentType?: string
  price?: string
  currency?: string
  audience?: string[]
  frequency?: string
  status?: 'draft' | 'published' | 'archived'
  etsyUrl?: string
}

const { data: product } = await useAsyncData(`product-${route.path}`, async () => {
  return queryCollection('products').path(route.path).first()
})

if (!product.value || product.value.status !== 'published') {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found'
  })
}

const productPost = product.value as ProductPost

const { data: relatedProductsData } = await useAsyncData(`related-products-${route.path}`, async () => {
  const items = await queryCollection('products').all()

  return (items as ProductPost[])
    .filter((item) => item.status === 'published')
    .filter((item) => item.path && item.path !== route.path)
})

const relatedProducts = computed(() => {
  const items = relatedProductsData.value ?? []
  const sameCollection = items.filter((item) => item.collection && item.collection === productPost.collection)
  const fallback = items.filter((item) => item.collection !== productPost.collection)

  return [...sameCollection, ...fallback].slice(0, 4)
})

const productUrl = computed(() => absoluteSiteUrl(route.path, runtimeConfig.public.siteUrl))

usePageSeo({
  title: productPost.title || 'Product',
  description: productPost.description || 'Practical template from DailyOpsStudio.',
  image: productPost.image || '/images/dailyops/etsy-shop-banner.png'
})

useHead({
  script: [
    {
      key: 'product-schema',
      type: 'application/ld+json' as never,
      textContent: JSON.stringify(
        schemaGraph(
          productSchema({
            name: productPost.title || 'Product',
            description: productPost.description || 'Practical template from DailyOpsStudio.',
            url: productUrl.value,
            offerUrl: productPost.etsyUrl || etsyUrl || productUrl.value,
            image: absoluteSiteUrl(
              productPost.image || '/images/dailyops/etsy-shop-banner.png',
              runtimeConfig.public.siteUrl
            ),
            price: productPost.price || '0',
            currency: productPost.currency || 'EUR'
          }),
          breadcrumbSchema([
            { name: 'Home', url: absoluteSiteUrl('/', runtimeConfig.public.siteUrl) },
            { name: 'Shop', url: absoluteSiteUrl('/shop', runtimeConfig.public.siteUrl) },
            { name: productPost.title || 'Product', url: productUrl.value }
          ])
        )
      )
    }
  ]
})
</script>

<template>
  <section class="site-section product-layout">
    <article class="stack product-article">
      <LayoutPageBreadcrumbs
        :items="[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: productPost.title || 'Product' }]"
      />

      <div class="stack">
        <p class="product-card__category">{{ productPost.category || productPost.collection || 'Digital Template' }}</p>
        <h1>{{ productPost.title }}</h1>
        <p class="text-muted">{{ productPost.description }}</p>
      </div>

      <NuxtImg
        v-if="productPost.image"
        class="product-card__image"
        :src="productPost.image"
        :alt="`${productPost.title || 'DailyOpsStudio template'} preview`"
        width="1200"
        height="760"
        loading="eager"
        format="webp"
        quality="82"
      />

      <div class="card product-article__content">
        <ContentRenderer v-if="product" :value="product" />
      </div>
    </article>

    <aside class="product-sidebar stack">
      <div class="card product-sidebar__section stack">
        <p v-if="productPost.price" class="product-sidebar__price">
          {{ productPost.price }} {{ productPost.currency || 'EUR' }}
        </p>
        <p v-if="productPost.documentType" class="text-muted">{{ productPost.documentType }}</p>
        <p v-if="productPost.frequency" class="text-muted">Use: {{ productPost.frequency }}</p>
        <a
          v-if="productPost.etsyUrl || etsyUrl"
          class="button button--primary"
          :href="productPost.etsyUrl || etsyUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ productPost.etsyUrl ? 'Buy on Etsy' : 'Find on Etsy' }}
        </a>
      </div>

      <div v-if="productPost.audience?.length" class="card product-sidebar__section stack">
        <h2>Best For</h2>
        <ul class="product-sidebar__list">
          <li v-for="audience in productPost.audience" :key="audience">{{ audience }}</li>
        </ul>
      </div>

      <div v-if="relatedProducts.length" class="card product-sidebar__section stack">
        <h2>Related Products</h2>
        <ul class="product-sidebar__related-list">
          <li v-for="relatedProduct in relatedProducts" :key="relatedProduct.path">
            <NuxtLink class="product-sidebar__related-link" :to="relatedProduct.path || '/shop'">
              <NuxtImg
                v-if="relatedProduct.image"
                class="product-sidebar__thumb"
                :src="relatedProduct.image"
                :alt="`${relatedProduct.title || 'DailyOpsStudio template'} preview`"
                width="240"
                height="160"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <span class="product-sidebar__related-body">
                <span class="product-sidebar__related-category">{{
                  relatedProduct.collection || relatedProduct.category || 'Product'
                }}</span>
                <span class="product-sidebar__related-title">{{ relatedProduct.title || 'View product' }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </section>
</template>
