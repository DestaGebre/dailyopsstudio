<script setup lang="ts">
import { absoluteSiteUrl } from '~/config/seo'
import { blogPostingSchema, breadcrumbSchema, schemaGraph } from '~/utils/schema'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

interface BlogPost {
  path?: string
  title?: string
  description?: string
  date?: string
  dateModified?: string
  category?: string
  image?: string
  tags?: string[]
  relatedProductId?: string
  status?: 'draft' | 'published' | 'archived'
  featured?: boolean
}

interface RelatedProduct {
  path?: string
  title?: string
  description?: string
  productId?: string
  status?: 'draft' | 'published' | 'archived'
}

const { data: post } = await useAsyncData(`blog-post-${route.path}`, async () => {
  return queryCollection('blog').path(route.path).first()
})

const { data: relatedPostsData } = await useAsyncData(`blog-related-${route.path}`, async () => {
  const items = await queryCollection('blog').all()

  return (items as BlogPost[])
    .filter((item) => item.status === 'published')
    .filter((item) => item.path && item.path !== route.path)
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })
})

if (!post.value || post.value.status !== 'published') {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

const blogPost = post.value as BlogPost
const { data: relatedProduct } = await useAsyncData(`blog-product-${route.path}`, async () => {
  if (!blogPost.relatedProductId) {
    return null
  }

  const products = await queryCollection('products').all()
  return (
    (products as RelatedProduct[]).find(
      (item) => item.productId === blogPost.relatedProductId && item.status === 'published'
    ) || null
  )
})

const relatedPosts = computed(() => {
  const items = relatedPostsData.value ?? []
  const sameCategory = items.filter((item) => item.category && item.category === blogPost.category)
  const fallback = items.filter((item) => item.category !== blogPost.category)

  return [...sameCategory, ...fallback].slice(0, 6)
})

const formattedDate = computed(() => {
  if (!blogPost.date) {
    return ''
  }

  const parsed = new Date(blogPost.date)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})

const formatSidebarDate = (value?: string): string => {
  if (!value) {
    return 'Recent'
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return 'Recent'
  }

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

usePageSeo({
  title: blogPost.title || 'Blog Post',
  description: blogPost.description || 'Practical guidance from DailyOpsStudio.',
  image: blogPost.image || '/images/dailyops/social-banner.png',
  type: 'article'
})

const postUrl = absoluteSiteUrl(route.path, runtimeConfig.public.siteUrl)
const postImage = absoluteSiteUrl(blogPost.image || '/images/dailyops/social-banner.png', runtimeConfig.public.siteUrl)

useHead({
  script: [
    {
      key: 'blog-post-schema',
      type: 'application/ld+json',
      textContent: JSON.stringify(
        schemaGraph(
          blogPostingSchema({
            headline: blogPost.title || 'DailyOpsStudio article',
            description: blogPost.description || 'Practical guidance from DailyOpsStudio.',
            url: postUrl,
            image: postImage,
            datePublished: blogPost.date || new Date().toISOString(),
            dateModified: blogPost.dateModified
          }),
          breadcrumbSchema([
            { name: 'Home', url: absoluteSiteUrl('/', runtimeConfig.public.siteUrl) },
            { name: 'Blog', url: absoluteSiteUrl('/blog', runtimeConfig.public.siteUrl) },
            { name: blogPost.title || 'Article', url: postUrl }
          ])
        )
      )
    }
  ]
})
</script>

<template>
  <section class="site-section blog-article-layout">
    <article class="stack blog-article">
      <NuxtLink class="blog-back-link" to="/blog">Back to Blog</NuxtLink>

      <header class="stack">
        <p v-if="formattedDate || blogPost.category" class="blog-card__meta">
          <span v-if="formattedDate">{{ formattedDate }}</span>
          <span v-if="blogPost.category">{{ blogPost.category }}</span>
        </p>
        <h1>{{ blogPost.title }}</h1>
        <p class="text-muted">{{ blogPost.description }}</p>
      </header>

      <NuxtImg
        v-if="blogPost.image"
        class="blog-card__image"
        :src="blogPost.image"
        :alt="`${blogPost.title || 'DailyOpsStudio article'} cover image`"
        width="1200"
        height="640"
        loading="lazy"
        format="webp"
        quality="82"
      />

      <div class="card blog-article__content">
        <ContentRenderer v-if="post" :value="post" />
      </div>

      <aside v-if="relatedProduct" class="card blog-product-callout stack" aria-labelledby="related-template-title">
        <p class="blog-sidebar__eyebrow">Related Template</p>
        <h2 id="related-template-title">{{ relatedProduct.title }}</h2>
        <p class="text-muted">{{ relatedProduct.description }}</p>
        <NuxtLink class="button button--primary" :to="relatedProduct.path || '/shop'"> View Template </NuxtLink>
      </aside>
    </article>

    <aside v-if="relatedPosts.length" class="blog-sidebar stack" aria-label="More blog articles">
      <div class="card blog-sidebar__section stack">
        <div class="stack blog-sidebar__header">
          <p class="blog-sidebar__eyebrow">Keep Reading</p>
          <h2>More articles</h2>
        </div>

        <ul class="blog-sidebar__list">
          <li v-for="relatedPost in relatedPosts" :key="relatedPost.path">
            <NuxtLink class="blog-sidebar__link" :to="relatedPost.path || '/blog'">
              <NuxtImg
                v-if="relatedPost.image"
                class="blog-sidebar__thumb"
                :src="relatedPost.image"
                :alt="`${relatedPost.title || 'DailyOpsStudio article'} cover image`"
                width="240"
                height="160"
                loading="lazy"
                format="webp"
                quality="80"
              />
              <span class="blog-sidebar__body">
                <span class="blog-sidebar__meta">
                  <span>{{ formatSidebarDate(relatedPost.date) }}</span>
                  <span v-if="relatedPost.category">{{ relatedPost.category }}</span>
                </span>
                <span class="blog-sidebar__title">{{ relatedPost.title || 'Read article' }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>
  </section>
</template>
