'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeShort } from '@/i18n/config'
import { localeFromPathname, localePath, stripLocale } from '@/i18n/routing'

/**
 * Footer language switcher. Links each locale to the equivalent path in that
 * language, preserving the current route (e.g. /work <-> /en/work).
 */
export function LanguageSwitcher({ label }: { label: string }) {
  const pathname = usePathname() || '/'
  const current = localeFromPathname(pathname)
  const basePath = stripLocale(pathname)

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-hairline bg-card/60 p-1"
      role="group"
      aria-label={label}
    >
      {locales.map((l) => {
        const active = l === current
        return (
          <Link
            key={l}
            href={localePath(l, basePath)}
            hrefLang={l}
            aria-current={active ? 'true' : undefined}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
              active ? 'bg-accent text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {localeShort[l]}
          </Link>
        )
      })}
    </div>
  )
}
