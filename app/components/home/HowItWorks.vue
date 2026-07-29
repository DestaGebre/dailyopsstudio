<script setup lang="ts">
const steps = [
  {
    title: 'Browse',
    description: 'Choose the template set that matches your workflow or personal routine.'
  },
  {
    title: 'Download',
    description: 'Access your files instantly after purchase and keep them available anytime.'
  },
  {
    title: 'Print or Use Digitally',
    description: 'Use on paper or in your preferred digital tools with flexible, reusable formats.'
  }
]
</script>

<template>
  <section class="site-section" aria-labelledby="how-title">
    <div class="section-heading stack">
      <h2 id="how-title">How It Works</h2>
      <p class="text-muted">A simple process from discovery to daily use.</p>
    </div>

    <ol class="site-grid site-grid--3 how-grid">
      <li v-for="step in steps" :key="step.title" class="card stack">
        <p class="how-grid__step">Step</p>
        <h3>{{ step.title }}</h3>
        <p class="text-muted">{{ step.description }}</p>
      </li>
    </ol>
  </section>
</template>
