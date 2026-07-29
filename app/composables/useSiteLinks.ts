interface SocialLink {
  label: string
  url: string
}

export const useSiteLinks = () => {
  const config = useRuntimeConfig()

  const websiteUrl = config.public.siteUrl?.trim() || ''
  const etsyUrl = config.public.etsyUrl?.trim() || ''
  const instagramUrl = config.public.instagramUrl?.trim() || ''
  const tiktokUrl = config.public.tiktokUrl?.trim() || ''
  const pinterestUrl = config.public.pinterestUrl?.trim() || ''
  const youtubeUrl = config.public.youtubeUrl?.trim() || ''
  const contactEmail = config.public.contactEmail?.trim() || ''

  const socialLinks: SocialLink[] = [
    { label: 'Instagram', url: instagramUrl },
    { label: 'TikTok', url: tiktokUrl },
    { label: 'Pinterest', url: pinterestUrl },
    { label: 'YouTube', url: youtubeUrl }
  ].filter((item) => Boolean(item.url))

  return {
    websiteUrl,
    etsyUrl,
    instagramUrl,
    tiktokUrl,
    pinterestUrl,
    youtubeUrl,
    contactEmail,
    contactEmailHref: contactEmail ? `mailto:${contactEmail}` : '',
    socialLinks
  }
}
