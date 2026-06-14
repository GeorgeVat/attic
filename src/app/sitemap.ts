import type { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.domain, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.domain}/work`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.domain}/contact`, changeFrequency: 'yearly', priority: 0.7 },
  ]
}
