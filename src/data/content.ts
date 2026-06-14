import type { ProjectRowData } from '@/components/sections/selected-work/projectRowData'
import type { Dictionary } from '@/i18n/dictionaries'

// ---------------------------------------------------------------------------
// Locale-agnostic data lives here (brand names, years, images, gradients,
// numbers). All translatable copy lives in src/i18n/dictionaries and is merged
// in via the helpers below.
// ---------------------------------------------------------------------------

type ProjectSlug = keyof Dictionary['projects']

const PROJECT_BASE: {
  slug: ProjectSlug
  title: string
  year: string
  imageUrl: string
  tint: string
}[] = [
  {
    slug: 'lumiere-atelier',
    title: 'Lumière Atelier',
    year: '2024',
    imageUrl: '/work/lumiere-atelier.jpg',
    tint: 'linear-gradient(135deg, #31696d 0%, #34c2d4 100%)',
  },
  {
    slug: 'cadence-festival',
    title: 'Cadence Festival',
    year: '2024',
    imageUrl: '/work/cadence-festival.jpg',
    tint: 'linear-gradient(135deg, #123a3c 0%, #31696d 100%)',
  },
  {
    slug: 'northwind-ops',
    title: 'Northwind Ops',
    year: '2024',
    imageUrl: '/work/northwind-ops.jpg',
    tint: 'linear-gradient(135deg, #0e1f1e 0%, #2f7d82 100%)',
  },
  {
    slug: 'aerie-hotels',
    title: 'Aerie Hotels',
    year: '2023',
    imageUrl: '/work/aerie-hotels.jpg',
    tint: 'linear-gradient(135deg, #1d5a5e 0%, #5bbfc9 100%)',
  },
  {
    slug: 'stillwater-studio',
    title: 'Stillwater Studio',
    year: '2023',
    imageUrl: '/work/stillwater-studio.jpg',
    tint: 'linear-gradient(135deg, #34c2d4 0%, #8fe0e6 100%)',
  },
]

/** Merge project base data with the translated fields for the given locale. */
export function getProjects(dict: Dictionary): ProjectRowData[] {
  return PROJECT_BASE.map((p) => {
    const t = dict.projects[p.slug]
    return {
      slug: p.slug,
      title: p.title,
      year: p.year,
      imageUrl: p.imageUrl,
      tint: p.tint,
      type: t.type,
      client: t.client,
      impact: t.impact,
      imageAlt: t.imageAlt,
    }
  })
}

// Client / partner names for the trust marquee (proper nouns — not translated).
export const TRUST: string[] = [
  'Lumière',
  'Cadence',
  'Northwind',
  'Aerie',
  'Stillwater',
  'Meridian',
  'Halcyon',
  'Vela',
  'Orso',
  'Bluewave',
]

// Impact numbers (animated counters); labels come from the dictionary.
const STAT_VALUES: { value: number; suffix?: string; prefix?: string }[] = [
  { value: 40, suffix: '+' },
  { value: 9 },
  { value: 12 },
  { value: 96 },
]

export function getStats(dict: Dictionary) {
  return STAT_VALUES.map((s, i) => ({ ...s, label: dict.stats.items[i].label }))
}
