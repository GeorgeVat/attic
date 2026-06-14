import type { Content } from './types'
import type { ProjectRowData } from '@/components/sections/selected-work/projectRowData'

// ---------------------------------------------------------------------------
// Selected work — invented projects for the studio's portfolio. No client
// imagery: each card renders a generated gradient panel keyed by `tint`.
// ---------------------------------------------------------------------------
export const PROJECTS: ProjectRowData[] = [
  {
    slug: 'lumiere-atelier',
    title: 'Lumière Atelier',
    type: 'Commerce',
    year: '2024',
    client: 'Fashion retailer',
    impact: 'Unified POS + storefront into one source of truth — zero oversells, +38% orders/day.',
    imageUrl: '/work/lumiere-atelier.jpg',
    imageAlt: 'Boutique clothing rack at Lumière Atelier',
    tint: 'linear-gradient(135deg, #31696d 0%, #34c2d4 100%)',
  },
  {
    slug: 'cadence-festival',
    title: 'Cadence Festival',
    type: 'Ticketing',
    year: '2024',
    client: 'Music festival',
    impact: 'Owned ticketing platform — 2,400 tickets on launch night, 0% third-party fees.',
    imageUrl: '/work/cadence-festival.jpg',
    imageAlt: 'Crowd under stage lights at Cadence Festival',
    tint: 'linear-gradient(135deg, #123a3c 0%, #31696d 100%)',
  },
  {
    slug: 'northwind-ops',
    title: 'Northwind Ops',
    type: 'AI automation',
    year: '2024',
    client: 'Logistics firm',
    impact: 'AI triage + sync layer over the existing stack — 31 hours/week of manual work gone.',
    imageUrl: '/work/northwind-ops.jpg',
    imageAlt: 'Logistics warehouse with stacked pallets',
    tint: 'linear-gradient(135deg, #0e1f1e 0%, #2f7d82 100%)',
  },
  {
    slug: 'aerie-hotels',
    title: 'Aerie Hotels',
    type: 'Custom system',
    year: '2023',
    client: 'Boutique hotel group',
    impact: 'One calendar across six OTAs — double-bookings eliminated, direct revenue +24%.',
    imageUrl: '/work/aerie-hotels.jpg',
    imageAlt: 'Warm wood-panelled boutique hotel lounge',
    tint: 'linear-gradient(135deg, #1d5a5e 0%, #5bbfc9 100%)',
  },
  {
    slug: 'stillwater-studio',
    title: 'Stillwater Studio',
    type: 'Website',
    year: '2023',
    client: 'Architecture practice',
    impact: 'Editorial site engineered for speed — 98 Lighthouse, +52% qualified inquiries.',
    imageUrl: '/work/stillwater-studio.jpg',
    imageAlt: 'Minimalist architectural interior with an arch',
    tint: 'linear-gradient(135deg, #34c2d4 0%, #8fe0e6 100%)',
  },
]

// Client / partner names for the trust marquee.
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

// Impact numbers (animated counters).
export const STATS: { value: number; suffix?: string; prefix?: string; label: string }[] = [
  { value: 40, suffix: '+', label: 'Products shipped' },
  { value: 9, label: 'Years building' },
  { value: 12, label: 'Sectors served' },
  { value: 96, label: 'Avg. Lighthouse score' },
]

// How we work — numbered approach steps.
export const PROCESS: { title: string; body: string }[] = [
  {
    title: 'Discover',
    body: 'We dig into how your business actually runs — goals, constraints, the messy reality — and pin down scope and timeline before a line of code.',
  },
  {
    title: 'Design',
    body: 'Interface and architecture, drawn together. You see real, clickable direction early, not a deck — so decisions are made on substance.',
  },
  {
    title: 'Build',
    body: 'Senior engineers ship in short loops. Working software every week, clean code you own outright, no black box that only opens at the end.',
  },
  {
    title: 'Launch & evolve',
    body: 'We go live with you, then stay — monitoring, iterating and scaling the system as the business grows.',
  },
]

// Testimonials — attributed quotes.
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      'They rebuilt our commerce backend in six weeks and the overselling just… stopped. It felt less like hiring an agency and more like gaining a senior team.',
    name: 'Eleni Marsh',
    role: 'COO, Lumière Atelier',
  },
  {
    quote:
      'Owning our ticketing changed the economics of the whole festival. ATTIC understood the stakes of launch night and were in the trenches with us.',
    name: 'Tomas Reyes',
    role: 'Founder, Cadence Festival',
  },
  {
    quote:
      'The automation layer they wired in gave my team back a full day a week. Honest estimates, clean handover, and they actually stuck around after launch.',
    name: 'Priya Nadkarni',
    role: 'Head of Ops, Northwind',
  },
]

// ---------------------------------------------------------------------------
// Homepage content bundle (services / manifesto / faq / contact types).
// ---------------------------------------------------------------------------
export const CONTENT: Content = {
  services: [
    {
      title: 'Signature Websites',
      description: 'Marketing sites & web platforms engineered for speed, story, and scale.',
      icon: 'web',
    },
    {
      title: 'Custom Systems',
      description: 'Bespoke booking, scheduling & business tools built around how you work.',
      icon: 'systems',
    },
    {
      title: 'Agentic & AI',
      description: 'AI agents, assistants & automations that do real work — not demos.',
      icon: 'ai',
    },
    {
      title: 'Commerce',
      description: 'Online stores & checkout experiences built to convert and scale.',
      icon: 'commerce',
    },
    {
      title: 'Product & Brand Design',
      description: 'Interfaces & identity that make the whole thing feel inevitable.',
      icon: 'design',
    },
    {
      title: 'Lasting Partnership',
      description: 'Support, iteration & technical guidance long after launch.',
      icon: 'partnership',
    },
  ],
  manifesto: {
    paragraph1: [
      { line: 'Most software is bought off a shelf and bent until it almost fits.' },
      { line: 'We build the other kind —' },
      { line: 'shaped around how your business actually works.' },
    ],
    paragraph2:
      'ATTIC is a small senior studio in Athens. We take on few projects, build them end to end, and stay long after launch.',
  },
  faq: {
    eyebrow: 'questions',
    heading: 'Frequently Asked',
    items: [
      {
        question: 'What kind of projects does ATTIC take on?',
        answer:
          'We design and build digital products end to end — marketing sites, web apps, e-commerce, and brand-driven experiences. If it lives on the web and needs both serious engineering and real taste, it is in our wheelhouse.',
      },
      {
        question: 'How does a typical project work?',
        answer:
          'Every engagement starts with a discovery conversation to pin down goals, scope, and timeline. From there we move through design, build, and launch in short feedback loops, so you see real progress every week instead of a black box that only opens at the end.',
      },
      {
        question: 'How long does a project take?',
        answer:
          'A focused marketing site usually ships in 3–5 weeks; larger web applications run 2–4 months depending on complexity. You get a concrete timeline after discovery, and we keep it honest as the scope evolves.',
      },
      {
        question: 'How much does a project cost?',
        answer:
          'Pricing is scoped per project based on complexity — not pulled from a rate card. Once we understand what you need, you get a clear, itemized quote with no surprises. Most studio-grade sites start in the low four figures and scale from there.',
      },
      {
        question: 'What technologies do you work with?',
        answer:
          'We build on a modern stack — React, Next.js, and TypeScript — chosen for performance, longevity, and a great editing experience. We pick tools that serve the project, never the other way around.',
      },
      {
        question: 'Do you work with clients outside Greece?',
        answer:
          'Yes. We are based in Greece but work remotely with clients across Europe and beyond. Clear async communication and regular check-ins mean distance is never a bottleneck.',
      },
      {
        question: 'What happens after launch?',
        answer:
          'We do not disappear at go-live. We offer ongoing support, maintenance, and iteration so your product keeps improving — and we are happy to train your team to manage content themselves.',
      },
    ],
  },
  contactTypes: [
    { type: 'Ecommerce' },
    { type: 'Ticketing / bookings' },
    { type: 'AI automation' },
    { type: 'Website' },
    { type: 'Internal tool' },
    { type: 'Something else' },
  ],
}
