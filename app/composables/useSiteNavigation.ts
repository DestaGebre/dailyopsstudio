export interface SiteNavItem {
  label: string
  to: string
}

export const useSiteNavigation = (): SiteNavItem[] => {
  return [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Categories', to: '/categories' },
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' }
  ]
}
