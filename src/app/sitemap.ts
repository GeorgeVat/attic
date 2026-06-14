import type { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

// Greek (default) is unprefixed; English lives under /en. Each entry advertises
// both language alternates via hreflang for cleaner international indexing.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: 'monthly' | 'yearly'; priority: number }[] = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/work', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.7 },
  ]

  return routes.flatMap(({ path, changeFrequency, priority }) => {
    const elUrl = `${SITE.domain}${path}`
    const enUrl = `${SITE.domain}/en${path}`
    const languages = { el: elUrl, en: enUrl }
    return [
      { url: elUrl, changeFrequency, priority, alternates: { languages } },
      { url: enUrl, changeFrequency, priority: priority * 0.9, alternates: { languages } },
    ]
  })
}
