<script setup lang="ts">
interface BlogItem {
  path?: string
  title?: string
  description?: string
  image?: string
  date?: string
}

const { data } = await useAsyncData('home-latest-articles', async () => {
  const items = await queryCollection('blog').all()
  return (items as BlogItem[])
    .filter((item) => Boolean(item.title || item.description))
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })
    .slice(0, 3)
})

const latestArticles = computed(() => data.value ?? [])
</script>

<template>
  <section v-if="latestArticles.length" class="site-section" aria-labelledby="articles-title">
    <div class="section-heading stack">
      <h2 id="articles-title">Latest Articles</h2>
      <p class="text-muted">Ideas, workflows and practical guidance from DailyOpsStudio.</p>
    </div>

    <div class="site-grid site-grid--3">
      <article v-for="article in latestArticles" :key="article.path || article.title" class="card stack">
        <NuxtImg
          class="blog-card__image"
          :src="article.image || '/images/dailyops/social-banner.png'"
          :alt="`${article.title || 'DailyOpsStudio article'} cover image`"
          width="640"
          height="380"
          loading="lazy"
          format="webp"
          quality="80"
        />
        <h3>{{ article.title || 'Article' }}</h3>
        <p class="text-muted">{{ article.description || 'New practical article from DailyOpsStudio.' }}</p>
        <NuxtLink class="button button--secondary" :to="article.path || '/blog'">Read Article</NuxtLink>
      </article>
    </div>
  </section>
</template>
