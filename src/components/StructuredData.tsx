import { SITE } from '@/data/site'
import type { Locale } from '@/i18n/config'

export function StructuredData({
  description,
  locale,
}: {
  description: string
  locale: Locale
}) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.domain,
    description,
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressCountry: 'GR', addressLocality: SITE.city },
    sameAs: [SITE.linkedin],
    knowsAbout: [
      'Custom Software Development',
      'E-commerce Platforms',
      'Ticketing Systems',
      'AI Automation',
      'Web Development',
      'Software Studio Athens',
    ],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.domain,
    inLanguage: locale,
  }

  return (
    <>
      {[organization, website].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
