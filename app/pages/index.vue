<script setup lang="ts">
import BlogPreview from '~/components/home/BlogPreview.vue'
import CallToAction from '~/components/home/CallToAction.vue'
import CategoryGrid from '~/components/home/CategoryGrid.vue'
import FeatureGrid from '~/components/home/FeatureGrid.vue'
import FreeResourceFeature from '~/components/home/FreeResourceFeature.vue'
import HeroSection from '~/components/home/HeroSection.vue'
import HowItWorks from '~/components/home/HowItWorks.vue'
import ProductGrid from '~/components/home/ProductGrid.vue'
import { organizationSchema, schemaGraph, websiteSchema } from '~/utils/schema'

const { socialLinks } = useSiteLinks()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl

usePageSeo({
  title: 'Practical Digital Templates',
  description: 'Professional digital templates for operations, organization, planning and everyday life.'
})

useHead({
  script: [
    {
      key: 'homepage-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        schemaGraph(
          organizationSchema(
            siteUrl,
            socialLinks.map((link) => link.url)
          ),
          websiteSchema(siteUrl)
        )
      )
    }
  ]
})
</script>

<template>
  <HeroSection />
  <FreeResourceFeature />
  <CategoryGrid />
  <ProductGrid />
  <FeatureGrid />
  <HowItWorks />
  <BlogPreview />
  <CallToAction />
</template>
