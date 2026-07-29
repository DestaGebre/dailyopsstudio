export const seoConfig = {
  siteName: 'DailyOpsStudio',
  siteUrl: 'https://dailyopsstudio.com',
  defaultTitle: 'Practical Templates for Work, Business and Everyday Life',
  titleTemplate: '%s | DailyOpsStudio',
  defaultDescription:
    'Practical digital templates for business operations, home organization, personal planning and everyday life.',
  defaultImage: '/images/dailyops/social-banner.png',
  author: 'DailyOpsStudio',
  language: 'en',
  locale: 'en_US',
  themeColor: '#2F5D50',
  keywords:
    'digital templates, business operations templates, home organization, personal planning, vehicle management, printable planners'
} as const

export function absoluteSiteUrl(path = '/', baseUrl: string = seoConfig.siteUrl): string {
  return new URL(path, `${baseUrl.replace(/\/+$/, '')}/`).toString()
}
