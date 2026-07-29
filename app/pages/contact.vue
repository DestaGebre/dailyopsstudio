<script setup lang="ts">
import { useSiteLinks } from '~/composables/useSiteLinks'

const { contactEmail, contactEmailHref, etsyUrl, socialLinks, websiteUrl } = useSiteLinks()

useSeoMeta({
  title: 'Contact',
  description: 'Get in touch with DailyOpsStudio for support and general questions.'
})
</script>

<template>
  <section class="site-section stack">
    <h1>Contact</h1>
    <p>
      For support or product questions, please contact DailyOpsStudio through our Etsy storefront.
    </p>
    <div class="card stack">
      <h2>Contact options</h2>
      <p class="text-muted" v-if="contactEmail">
        Email:
        <a :href="contactEmailHref">{{ contactEmail }}</a>
      </p>
      <p class="text-muted" v-if="websiteUrl">
        Website:
        <a :href="websiteUrl" target="_blank" rel="noopener noreferrer">Visit website</a>
      </p>
      <p class="text-muted" v-if="etsyUrl">
        Etsy:
        <a :href="etsyUrl" target="_blank" rel="noopener noreferrer">Open Etsy shop</a>
      </p>
      <div v-if="socialLinks.length" class="stack">
        <h3>Social media</h3>
        <ul class="contact-social">
          <li v-for="socialLink in socialLinks" :key="socialLink.label">
            <a :href="socialLink.url" target="_blank" rel="noopener noreferrer">
              {{ socialLink.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
