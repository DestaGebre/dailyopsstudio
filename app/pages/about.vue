<script setup lang="ts">
usePageSeo({
  title: 'About',
  description: 'Learn about DailyOpsStudio and the mission behind practical templates.'
})
</script>

<template>
  <section class="site-section stack">
    <div class="section-heading stack">
      <p class="legal-page__eyebrow">About DailyOpsStudio</p>
      <h1>Practical structure for real routines</h1>
      <p>DailyOpsStudio creates focused digital templates that help people run recurring work with less guesswork.</p>
    </div>

    <div class="site-grid site-grid--2">
      <article class="card stack">
        <h2>Why we build templates</h2>
        <p class="text-muted">
          Important routines often live in memory, scattered notes, or documents that are harder to use than the work
          itself. We turn those routines into clear checklists, logs, trackers, and planning tools.
        </p>
      </article>
      <article class="card stack">
        <h2>How we approach design</h2>
        <p class="text-muted">
          Every template starts with the workflow: what needs to be recorded, who needs to use it, and what must be easy
          to review later. The result should feel calm, practical, and ready to use.
        </p>
      </article>
    </div>

    <div class="card stack">
      <h2>One brand, several parts of everyday life</h2>
      <p>
        Restaurant operations are our first available collection. Future collections will extend the same practical
        approach to home organization, personal planning, vehicle management, events, and everyday administration.
      </p>
      <div class="home-hero__actions">
        <NuxtLink class="button button--primary" to="/shop">Browse Available Templates</NuxtLink>
        <NuxtLink class="button button--secondary" to="/contact">Contact DailyOpsStudio</NuxtLink>
      </div>
    </div>
  </section>
</template>
