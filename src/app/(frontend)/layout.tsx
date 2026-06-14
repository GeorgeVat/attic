import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Fraunces, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google'

import { CallbackProvider } from '@/components/callback/CallbackProvider'
import { LenisProvider } from '@/components/LenisProvider'
import { SiteNav } from '@/components/nav/SiteNav'
import { Footer } from '@/components/footer/Footer'
import { StructuredData } from '@/components/StructuredData'
import { ogDefaults } from '@/lib/og'
import { SITE } from '@/data/site'
import './styles.css'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display-face',
  axes: ['opsz', 'SOFT'],
})
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })
const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono-face',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: { ...ogDefaults, url: '/' },
  twitter: { card: 'summary_large_image' },
}

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${jakarta.variable} ${mono.variable}`}>
      <body>
        <div aria-hidden className="site-bg" />
        <div aria-hidden className="site-grid" />
        <div aria-hidden className="site-grain" />
        <StructuredData />
        <CallbackProvider>
          <LenisProvider>
            <SiteNav />
            {children}
            <Footer />
          </LenisProvider>
        </CallbackProvider>
      </body>
    </html>
  )
}
