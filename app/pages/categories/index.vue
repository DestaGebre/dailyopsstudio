<script setup lang="ts">
const categories = [
  {
    title: 'Business Operations',
    description: 'Checklists, logs and repeatable systems for clearer day-to-day operations.',
    available: true
  },
  {
    title: 'Home Organization',
    description: 'Practical routines, trackers and household organization tools.',
    available: false
  },
  {
    title: 'Personal Planning',
    description: 'Simple weekly and monthly planning systems for everyday priorities.',
    available: false
  },
  {
    title: 'Vehicle Management',
    description: 'Maintenance, expense and vehicle-record templates.',
    available: false
  }
]

usePageSeo({
  title: 'Categories',
  description: 'Explore template categories for operations, organization, planning and everyday life.'
})
</script>

<template>
  <section class="site-section stack">
    <h1>Categories</h1>
    <p>Browse broad categories designed for business operations, home organization and personal planning.</p>
    <div class="site-grid site-grid--2">
      <article v-for="category in categories" :key="category.title" class="card card--category stack">
        <p class="category-card__status">{{ category.available ? 'Available now' : 'Coming soon' }}</p>
        <h2>{{ category.title }}</h2>
        <p class="text-muted">{{ category.description }}</p>
        <NuxtLink
          v-if="category.available"
          class="button button--secondary"
          :to="{ path: '/shop', query: { category: category.title } }"
        >
          Browse Templates
        </NuxtLink>
      </article>
    </div>
  </section>
</template>
