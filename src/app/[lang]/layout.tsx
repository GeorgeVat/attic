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
import { locales, defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)
  const base = locale === defaultLocale ? '/' : `/${locale}`

  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: `${SITE.name} — ${dict.meta.tagline}`,
      template: `%s — ${SITE.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: base,
      languages: { el: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      ...ogDefaults,
      url: base,
      locale: locale === 'el' ? 'el_GR' : 'en_US',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = isLocale(lang) ? lang : defaultLocale
  const dict = getDictionary(locale)

  return (
    <html lang={locale} className={`${display.variable} ${jakarta.variable} ${mono.variable}`}>
      <body>
        <div aria-hidden className="site-bg" />
        <div aria-hidden className="site-grid" />
        <div aria-hidden className="site-grain" />
        <StructuredData description={dict.meta.description} locale={locale} />
        <CallbackProvider dict={dict.callback}>
          <LenisProvider>
            <SiteNav dict={dict.nav} locale={locale} />
            {children}
            <Footer dict={dict.footer} nav={dict.nav} locale={locale} />
          </LenisProvider>
        </CallbackProvider>
      </body>
    </html>
  )
}
