import type { Scenario } from './types'

export const SCENARIOS: Scenario[] = [
  {
    id: 'ecommerce',
    label: 'Commerce',
    frames: [
      {
        delay: 700,
        frame: { kind: 'user', text: 'Our e-shop oversells — stock never matches our POS.' },
      },
      {
        delay: 1200,
        frame: {
          kind: 'ai',
          text: 'We build a synced commerce backend: one source of truth between your POS and storefront.',
        },
      },
      {
        delay: 1400,
        frame: {
          kind: 'card',
          card: {
            type: 'flow',
            title: 'Proposed system',
            nodes: ['POS', 'Sync engine', 'Storefront'],
            caption: 'Stock reconciles in real time, both directions.',
          },
        },
      },
      {
        delay: 1600,
        frame: {
          kind: 'card',
          card: {
            type: 'metrics',
            title: 'After launch',
            bars: [18, 26, 24, 34, 41, 38, 52, 61],
            stats: [
              { value: '0', label: 'oversells' },
              { value: '99.9%', label: 'sync accuracy' },
              { value: '+38%', label: 'orders/day' },
            ],
          },
        },
      },
      {
        delay: 1500,
        frame: {
          kind: 'ai',
          text: 'Designed, built and monitored by one team — no plugin stack held together with tape.',
          cta: { label: 'start your project', href: '/contact' },
        },
      },
    ],
  },
  {
    id: 'ticketing',
    label: 'Ticketing',
    frames: [
      {
        delay: 700,
        frame: { kind: 'user', text: 'We sell out every event, but ticketing fees are eating us alive.' },
      },
      {
        delay: 1200,
        frame: { kind: 'ai', text: 'Then stop renting one — own your ticketing platform.' },
      },
      {
        delay: 1400,
        frame: {
          kind: 'card',
          card: {
            type: 'timeline',
            title: 'Build plan',
            steps: [
              { label: 'Discover', detail: 'flows, seating, pricing' },
              { label: 'Build', detail: 'checkout, QR validation, door app' },
              { label: 'Launch', detail: 'first on-sale, live support' },
            ],
            caption: '8 weeks, discovery to first on-sale.',
          },
        },
      },
      {
        delay: 1600,
        frame: {
          kind: 'card',
          card: {
            type: 'sparkline',
            title: 'Launch night',
            points: [4, 9, 7, 14, 18, 16, 24, 31, 28, 39, 46, 58],
            stats: [
              { value: '2,400', label: 'tickets sold' },
              { value: '0%', label: 'third-party fees' },
            ],
          },
        },
      },
      {
        delay: 1500,
        frame: {
          kind: 'ai',
          text: 'Every ticket, every fee, every attendee — yours.',
          cta: { label: 'start your project', href: '/contact' },
        },
      },
    ],
  },
  {
    id: 'automation',
    label: 'AI automation',
    frames: [
      {
        delay: 700,
        frame: {
          kind: 'user',
          text: 'My team loses hours answering the same emails and copying data between tools.',
        },
      },
      {
        delay: 1200,
        frame: {
          kind: 'ai',
          text: 'We wire an AI layer into the stack you already use — triage, extract, sync.',
        },
      },
      {
        delay: 1400,
        frame: {
          kind: 'card',
          card: {
            type: 'flow',
            pulse: true,
            title: 'Automation flow',
            nodes: ['Inbox', 'AI triage', 'CRM'],
            caption: 'Drafts answers, files records, flags edge cases for humans.',
          },
        },
      },
      {
        delay: 1600,
        frame: {
          kind: 'card',
          card: {
            type: 'savings',
            title: 'First month',
            headline: '−31 hrs/week',
            before: { label: 'manual handling', value: 100 },
            after: { label: 'with automation', value: 28 },
          },
        },
      },
      {
        delay: 1500,
        frame: {
          kind: 'ai',
          text: 'Your team keeps the judgment calls. The copy-paste is gone.',
          cta: { label: 'start your project', href: '/contact' },
        },
      },
    ],
  },
]
