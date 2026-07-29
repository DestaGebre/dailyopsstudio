<script setup lang="ts">
import SiteContainer from '~/components/layout/SiteContainer.vue'
import { useSiteLinks } from '~/composables/useSiteLinks'

const year = new Date().getFullYear()
const { contactEmail, contactEmailHref, etsyUrl, socialLinks, websiteUrl } = useSiteLinks()

function socialPlatform(label: string) {
  const key = label.toLowerCase()
  if (key.includes('instagram')) {
    return 'instagram'
  }
  if (key.includes('tiktok')) {
    return 'tiktok'
  }
  if (key.includes('pinterest')) {
    return 'pinterest'
  }
  if (key.includes('youtube')) {
    return 'youtube'
  }
  return 'generic'
}
</script>

<template>
  <footer class="site-footer">
    <SiteContainer>
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <NuxtImg
            class="site-footer__logo"
            src="/images/dailyops/logo-mark.png"
            alt="DailyOpsStudio logo mark"
            width="64"
            height="64"
          />
          <p class="site-footer__tagline">Practical templates for work, business and everyday life.</p>
        </div>
        <ul v-if="socialLinks.length" class="site-footer__social" aria-label="Social media links">
          <li v-for="socialLink in socialLinks" :key="socialLink.label">
            <a :href="socialLink.url" target="_blank" rel="noopener noreferrer">
              <span class="site-footer__social-icon" aria-hidden="true">
                <svg
                  v-if="socialPlatform(socialLink.label) === 'instagram'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
                <svg
                  v-else-if="socialPlatform(socialLink.label) === 'tiktok'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 4v9.5a3.5 3.5 0 1 1-2.5-3.35" />
                  <path d="M14 4c1.3 2.2 3.1 3.5 5 3.9" />
                </svg>
                <svg
                  v-else-if="socialPlatform(socialLink.label) === 'pinterest'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M10.2 20.2l1.1-4.3" />
                  <path d="M10.7 12.3c0 1.8 1.1 2.7 2.6 2.7 2.2 0 3.7-1.8 3.7-4.1 0-2.1-1.5-3.6-3.8-3.6-2.6 0-4.1 1.9-4.1 3.9 0 .8.3 1.7.8 2.1" />
                </svg>
                <svg
                  v-else-if="socialPlatform(socialLink.label) === 'youtube'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="6.5" width="18" height="11" rx="3" />
                  <path d="M10 10l5 2-5 2z" fill="currentColor" stroke="none" />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3.5 12h17" />
                  <path d="M12 3c2.5 2.5 2.5 15.5 0 18" />
                  <path d="M12 3c-2.5 2.5-2.5 15.5 0 18" />
                </svg>
              </span>
              <span>{{ socialLink.label }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="site-footer__grid">
        <section class="site-footer__column" aria-labelledby="footer-products">
          <h2 id="footer-products" class="site-footer__heading">Products</h2>
          <ul class="site-footer__list" aria-label="Product links">
            <li><NuxtLink to="/shop">All Templates</NuxtLink></li>
            <li><NuxtLink to="/shop">Featured Products</NuxtLink></li>
          </ul>
        </section>

        <section class="site-footer__column" aria-labelledby="footer-categories">
          <h2 id="footer-categories" class="site-footer__heading">Categories</h2>
          <ul class="site-footer__list" aria-label="Category links">
            <li><NuxtLink to="/categories">Business Operations</NuxtLink></li>
            <li><NuxtLink to="/categories">Home Organization</NuxtLink></li>
            <li><NuxtLink to="/categories">Personal Planning</NuxtLink></li>
            <li><NuxtLink to="/categories">Vehicle Management</NuxtLink></li>
          </ul>
        </section>

        <section class="site-footer__column" aria-labelledby="footer-resources">
          <h2 id="footer-resources" class="site-footer__heading">Resources</h2>
          <ul class="site-footer__list" aria-label="Resource links">
            <li><NuxtLink to="/blog">Blog</NuxtLink></li>
            <li><NuxtLink to="/about">About</NuxtLink></li>
          </ul>
        </section>

        <section class="site-footer__column" aria-labelledby="footer-company">
          <h2 id="footer-company" class="site-footer__heading">Company</h2>
          <ul class="site-footer__list" aria-label="Company links">
            <li><NuxtLink to="/about">About Us</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact</NuxtLink></li>
            <li>
              <a v-if="websiteUrl" :href="websiteUrl" target="_blank" rel="noopener noreferrer">Website</a>
            </li>
          </ul>
        </section>

        <section class="site-footer__column" aria-labelledby="footer-legal">
          <h2 id="footer-legal" class="site-footer__heading">Legal</h2>
          <ul class="site-footer__list" aria-label="Legal links">
            <li><NuxtLink to="/privacy">Privacy</NuxtLink></li>
            <li><NuxtLink to="/terms">Terms</NuxtLink></li>
          </ul>
        </section>

        <section class="site-footer__column" aria-labelledby="footer-connect">
          <h2 id="footer-connect" class="site-footer__heading">Connect</h2>
          <ul class="site-footer__list" aria-label="Connect links">
            <li><a v-if="etsyUrl" :href="etsyUrl" target="_blank" rel="noopener noreferrer">Etsy Shop</a></li>
            <li><a v-if="contactEmail" :href="contactEmailHref">{{ contactEmail }}</a></li>
          </ul>
        </section>
      </div>

      <div class="site-footer__bottom stack">
        <p class="text-muted">Copyright {{ year }} DailyOpsStudio. All rights reserved.</p>
      </div>
    </SiteContainer>
  </footer>
</template>
