<script setup lang="ts">
const route = useRoute()

interface BlogPost {
  title?: string
  description?: string
  date?: string
  category?: string
  image?: string
}

const { data: post } = await useAsyncData(`blog-post-${route.path}`, async () => {
  return queryCollection('blog').path(route.path).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

const blogPost = post.value as BlogPost

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

usePageSeo({
  title: blogPost.title || 'Blog Post',
  description: blogPost.description || 'Practical guidance from DailyOpsStudio.',
  image: blogPost.image || '/images/dailyops/social-banner.png',
  type: 'article'
})
</script>

<template>
  <article class="site-section stack blog-article">
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
      class="blog-card__image"
      :src="blogPost.image || '/images/dailyops/social-banner.png'"
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
  </article>
</template>