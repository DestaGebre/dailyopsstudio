import { absoluteSiteUrl, seoConfig } from '~/config/seo'

interface PageSeoOptions {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  robots?: string
}

export function usePageSeo(options: PageSeoOptions = {}) {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const siteUrl = runtimeConfig.public.siteUrl || seoConfig.siteUrl
  const title = options.title || seoConfig.defaultTitle
  const description = options.description || seoConfig.defaultDescription
  const canonicalUrl = computed(() => absoluteSiteUrl(route.path, siteUrl))
  const imageUrl = absoluteSiteUrl(options.image || seoConfig.defaultImage, siteUrl)

  useSeoMeta({
    title,
    description,
    author: seoConfig.author,
    robots: options.robots || 'index, follow, max-image-preview:large',
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
    ogImageAlt: `${seoConfig.siteName} social sharing image`,
    ogUrl: canonicalUrl,
    ogSiteName: seoConfig.siteName,
    ogType: options.type || 'website',
    ogLocale: seoConfig.locale,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: `${seoConfig.siteName} social sharing image`
  })

  useHead({
    link: [{ key: 'canonical', rel: 'canonical', href: canonicalUrl }]
  })

  return { canonicalUrl, imageUrl }
}
