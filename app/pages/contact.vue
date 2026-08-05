<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { contactEmail, contactEmailHref, etsyUrl, socialLinks } = useSiteLinks()

usePageSeo({
  title: 'Contact',
  description: 'Get in touch with DailyOpsStudio for support and general questions.'
})
</script>

<template>
  <section class="site-section stack">
    <div class="section-heading stack">
      <p class="legal-page__eyebrow">Contact</p>
      <h1>How can we help?</h1>
      <p>Choose the channel that best matches your question.</p>
    </div>

    <div class="site-grid site-grid--2">
      <article class="card stack">
        <h2>Order and download support</h2>
        <p class="text-muted">
          For an existing Etsy order, send a message through Etsy so the order details stay connected to your request.
        </p>
        <a v-if="etsyUrl" class="button button--primary" :href="etsyUrl" target="_blank" rel="noopener noreferrer">
          Visit Etsy Shop
        </a>
      </article>

      <article class="card stack">
        <h2>General and licensing questions</h2>
        <p class="text-muted">
          Use email for product questions, licensing clarification, accessibility feedback, or website privacy requests.
        </p>
        <a v-if="contactEmail" class="button button--secondary" :href="contactEmailHref"> Email {{ contactEmail }} </a>
      </article>
    </div>

    <div v-if="socialLinks.length" class="card stack">
      <h2>Follow DailyOpsStudio</h2>
      <p class="text-muted">Find product updates and practical workflow ideas on our social profiles.</p>
      <ul class="contact-social">
        <li v-for="socialLink in socialLinks" :key="socialLink.label">
          <a :href="socialLink.url" target="_blank" rel="noopener noreferrer">
            {{ socialLink.label }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
