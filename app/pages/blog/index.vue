<script setup lang="ts">
interface BlogItem {
  path?: string
  title?: string
  description?: string
  date?: string
  category?: string
  tags?: string[]
  image?: string
}

const { data } = await useAsyncData('blog-posts', async () => {
  const items = await queryCollection('blog').all()

  return (items as BlogItem[])
    .filter((item) => Boolean(item.title || item.description))
    .sort((a, b) => {
      const aTime = a.date ? new Date(a.date).getTime() : 0
      const bTime = b.date ? new Date(b.date).getTime() : 0
      return bTime - aTime
    })
})

const blogPosts = computed(() => data.value ?? [])
const selectedCategory = ref('All categories')
const selectedTag = ref('All tags')

const featuredPost = computed(() => blogPosts.value[0])

const categories = computed(() => {
  const values = Array.from(new Set(blogPosts.value.map((post) => post.category).filter(Boolean))) as string[]
  return ['All categories', ...values]
})

const tags = computed(() => {
  const values = Array.from(
    new Set(
      blogPosts.value
        .flatMap((post) => post.tags || [])
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  ) as string[]

  return ['All tags', ...values]
})

const filteredPosts = computed(() => {
  return blogPosts.value
    .filter((post) => post.path !== featuredPost.value?.path)
    .filter((post) => {
      if (selectedCategory.value === 'All categories') {
        return true
      }

      return post.category === selectedCategory.value
    })
    .filter((post) => {
      if (selectedTag.value === 'All tags') {
        return true
      }

      return (post.tags || []).includes(selectedTag.value)
    })
})

const formatDate = (value?: string): string => {
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
  title: 'Blog',
  description: 'Read practical tips about templates, workflows and everyday organization.'
})
</script>

<template>
  <section class="site-section">
    <div class="section-heading stack">
      <h1>DailyOps Blog</h1>
      <p>
        Practical ideas for business operations, home organization and everyday planning.
      </p>
    </div>

    <article v-if="featuredPost" class="card blog-featured stack">
      <NuxtImg
        class="blog-card__image"
        :src="featuredPost.image || '/images/dailyops/social-banner.png'"
        :alt="`${featuredPost.title || 'DailyOpsStudio article'} cover image`"
        width="1200"
        height="620"
        loading="eager"
        format="webp"
        quality="82"
      />
      <div class="blog-featured__content stack">
        <p class="blog-featured__label">Featured Post</p>
        <p class="blog-card__meta">
          <span>{{ formatDate(featuredPost.date) }}</span>
          <span v-if="featuredPost.category">{{ featuredPost.category }}</span>
        </p>
        <h2>{{ featuredPost.title || 'Latest article' }}</h2>
        <p class="text-muted">
          {{ featuredPost.description || 'Practical insight from DailyOpsStudio.' }}
        </p>
        <NuxtLink v-if="featuredPost.path" class="button button--primary" :to="featuredPost.path">
          Read Featured Post
        </NuxtLink>
      </div>
    </article>

    <div v-if="blogPosts.length" class="blog-filters stack" aria-label="Blog filters">
      <div class="blog-filter-group">
        <p class="blog-filter-group__label">Category</p>
        <div class="blog-filter-group__chips">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="blog-filter-chip"
            :class="{ 'blog-filter-chip--active': selectedCategory === category }"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <div class="blog-filter-group">
        <p class="blog-filter-group__label">Tag</p>
        <div class="blog-filter-group__chips">
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            class="blog-filter-chip"
            :class="{ 'blog-filter-chip--active': selectedTag === tag }"
            @click="selectedTag = tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="filteredPosts.length" class="site-grid site-grid--2">
      <article v-for="post in filteredPosts" :key="post.path || post.title" class="card stack">
        <NuxtImg
          class="blog-card__image"
          :src="post.image || '/images/dailyops/social-banner.png'"
          :alt="`${post.title || 'DailyOpsStudio article'} cover image`"
          width="720"
          height="420"
          loading="lazy"
          format="webp"
          quality="82"
        />

        <p class="blog-card__meta">
          <span>{{ formatDate(post.date) }}</span>
          <span v-if="post.category">{{ post.category }}</span>
        </p>
        <h2>{{ post.title || 'Article' }}</h2>
        <p class="text-muted">{{ post.description || 'Practical insight from DailyOpsStudio.' }}</p>

        <NuxtLink v-if="post.path" class="button button--secondary" :to="post.path">
          Read Post
        </NuxtLink>
      </article>
    </div>

    <div v-else-if="blogPosts.length" class="card stack">
      <h2>No posts match these filters</h2>
      <p class="text-muted">Try selecting a different category or tag.</p>
    </div>

    <div v-else class="card stack">
      <h2>No posts yet</h2>
      <p class="text-muted">
        Add Markdown files under content/blog and they will automatically appear here.
      </p>
    </div>
  </section>
</template>
