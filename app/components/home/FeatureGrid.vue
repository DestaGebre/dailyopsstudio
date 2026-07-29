<script setup lang="ts">
const features = [
  {
    title: 'Professional Design',
    description: 'Cleanly structured layouts that are easy to understand and immediately usable.'
  },
  {
    title: 'Instant Download',
    description: 'Get access quickly and start applying templates to real workflows right away.'
  },
  {
    title: 'Reusable Templates',
    description: 'Adapt once, then reuse across projects, routines and recurring tasks.'
  },
  {
    title: 'Save Time Every Day',
    description: 'Reduce setup and decision fatigue with systems that support consistent execution.'
  }
]
</script>

<template>
  <section class="site-section" aria-labelledby="why-title">
    <div class="section-heading stack">
      <h2 id="why-title">Why DailyOpsStudio</h2>
      <p class="text-muted">Built for people who value clarity, consistency and practical outcomes.</p>
    </div>

    <div class="site-grid site-grid--2">
      <article v-for="feature in features" :key="feature.title" class="card stack">
        <h3>{{ feature.title }}</h3>
        <p class="text-muted">{{ feature.description }}</p>
      </article>
    </div>
  </section>
</template>
