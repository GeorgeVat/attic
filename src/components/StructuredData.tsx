import { SITE } from '@/data/site'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.domain,
  description: SITE.description,
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
}

export function StructuredData() {
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
