<script setup lang="ts">
const categories = [
  {
    icon: 'Ops',
    title: 'Business Operations',
    description: 'Keep workflows, SOPs and recurring tasks clear across teams and projects.',
    href: '/categories'
  },
  {
    icon: 'Home',
    title: 'Home Organization',
    description: 'Create calmer routines with practical lists, trackers and household systems.',
    href: '/categories'
  },
  {
    icon: 'Plan',
    title: 'Personal Planning',
    description: 'Turn goals into weekly and monthly action plans you can follow consistently.',
    href: '/categories'
  },
  {
    icon: 'Drive',
    title: 'Vehicle Management',
    description: 'Track maintenance, expenses and important vehicle records in one place.',
    href: '/categories'
  }
]
</script>

<template>
  <section class="site-section" aria-labelledby="categories-title">
    <div class="section-heading stack">
      <h2 id="categories-title">Featured Categories</h2>
      <p class="text-muted">Explore focused template collections designed for daily execution.</p>
    </div>

    <div class="site-grid site-grid--2">
      <article v-for="category in categories" :key="category.title" class="card card--category stack">
        <p class="category-card__icon" aria-hidden="true">{{ category.icon }}</p>
        <h3>{{ category.title }}</h3>
        <p class="text-muted">{{ category.description }}</p>
        <NuxtLink class="button button--secondary" :to="category.href">Explore Category</NuxtLink>
      </article>
    </div>
  </section>
</template>
