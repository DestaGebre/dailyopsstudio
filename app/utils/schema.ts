import { absoluteSiteUrl, seoConfig } from '~/config/seo'

export interface ProductSchemaInput {
  name: string
  description: string
  url: string
  image: string
  price: string
  currency?: string
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
}

export interface BlogPostingSchemaInput {
  headline: string
  description: string
  url: string
  image: string
  datePublished: string
  dateModified?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export const organizationSchema = (siteUrl: string = seoConfig.siteUrl, sameAs: string[] = []) => ({
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: seoConfig.siteName,
  url: siteUrl,
  logo: absoluteSiteUrl('/images/dailyops/logo-primary.png', siteUrl),
  image: absoluteSiteUrl(seoConfig.defaultImage, siteUrl),
  sameAs
})

export const websiteSchema = (siteUrl: string = seoConfig.siteUrl) => ({
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: seoConfig.siteName,
  description: seoConfig.defaultDescription,
  publisher: { '@id': `${siteUrl}/#organization` },
  inLanguage: seoConfig.language
})

export const productSchema = (product: ProductSchemaInput) => ({
  '@type': 'Product',
  name: product.name,
  description: product.description,
  url: product.url,
  image: product.image,
  brand: { '@type': 'Brand', name: seoConfig.siteName },
  offers: {
    '@type': 'Offer',
    url: product.url,
    price: product.price,
    priceCurrency: product.currency || 'USD',
    availability: `https://schema.org/${product.availability || 'InStock'}`
  }
})

export const blogPostingSchema = (post: BlogPostingSchemaInput) => ({
  '@type': 'BlogPosting',
  headline: post.headline,
  description: post.description,
  mainEntityOfPage: post.url,
  image: post.image,
  datePublished: post.datePublished,
  dateModified: post.dateModified || post.datePublished,
  author: { '@id': `${seoConfig.siteUrl}/#organization` },
  publisher: { '@id': `${seoConfig.siteUrl}/#organization` }
})

export const faqSchema = (items: FaqItem[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
})

export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const schemaGraph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes
})
