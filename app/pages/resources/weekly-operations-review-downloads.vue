<script setup lang="ts">
usePageSeo({
  title: 'Weekly Operations Review Downloads',
  description: 'Download the DailyOpsStudio Restaurant Weekly Operations Review in your preferred format.',
  robots: 'noindex, nofollow'
})

const downloads = [
  {
    title: 'Printable A4',
    description: 'For standard A4 paper used in most countries.',
    href: '/downloads/weekly-operations-review/restaurant-weekly-operations-review-printable-a4.pdf',
    format: 'PDF'
  },
  {
    title: 'Printable US Letter',
    description: 'Sized for US Letter paper and office printers.',
    href: '/downloads/weekly-operations-review/restaurant-weekly-operations-review-printable-us-letter.pdf',
    format: 'PDF'
  },
  {
    title: 'Fillable A4',
    description: 'Type directly into the worksheet, then save or print it.',
    href: '/downloads/weekly-operations-review/restaurant-weekly-operations-review-fillable-a4.pdf',
    format: 'Editable PDF'
  },
  {
    title: 'Fillable US Letter',
    description: 'Editable on screen and formatted for US Letter pages.',
    href: '/downloads/weekly-operations-review/restaurant-weekly-operations-review-fillable-us-letter.pdf',
    format: 'Editable PDF'
  }
]
</script>

<template>
  <section class="site-section stack" aria-labelledby="downloads-title">
    <LayoutPageBreadcrumbs
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Resources', to: '/resources' },
        { label: 'Weekly Operations Review downloads' }
      ]"
    />
    <div class="section-heading stack">
      <p class="resource-eyebrow">Your free resource</p>
      <h1 id="downloads-title">Restaurant Weekly Operations Review</h1>
      <p>Thank you. Download the complete package or choose the individual format that fits how you work.</p>
      <div class="home-hero__actions">
        <a
          class="button button--primary"
          href="/downloads/weekly-operations-review/restaurant-weekly-operations-review-complete-package.zip"
          download
        >
          Download the complete package
        </a>
      </div>
    </div>

    <div class="download-grid">
      <article v-for="item in downloads" :key="item.href" class="card download-card stack">
        <span class="download-card__format">{{ item.format }}</span>
        <h2>{{ item.title }}</h2>
        <p class="text-muted">{{ item.description }}</p>
        <a class="button button--secondary" :href="item.href" download>Download {{ item.title }}</a>
      </article>
    </div>

    <div class="card stack">
      <h2>How to use it</h2>
      <p>
        Set aside a regular time each week, complete the review, and keep previous worksheets so repeated operational
        issues become easier to identify.
      </p>
      <NuxtLink class="blog-back-link" to="/resources">Return to the worksheet overview</NuxtLink>
    </div>
  </section>
</template>
