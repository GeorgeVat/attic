import Link from 'next/link'
import { AtticLogo } from '@/components/brand/AtticLogo'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { SITE } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { localePath } from '@/i18n/routing'

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary['footer']
  nav?: Dictionary['nav']
  locale: Locale
}) {
  return (
    <footer className="relative mt-10 px-4 pb-6">
      <div className="glass mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-12 sm:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <AtticLogo className="h-8 w-auto text-accent" aria-label={SITE.name} />
            <p className="mt-3 text-sm leading-relaxed text-muted">{dict.tagline}</p>
            <Link
              href={localePath(locale, '/contact')}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-ink"
            >
              {dict.cta}
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm text-muted md:items-end">
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-ink transition-colors hover:text-accent"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.linkedin}
              rel="noopener"
              target="_blank"
              className="transition-colors hover:text-accent"
            >
              {dict.linkedin}
            </a>
            <div className="mt-3">
              <LanguageSwitcher label={dict.langLabel} />
            </div>
            <p className="mt-3 text-xs text-muted/80">
              © {new Date().getFullYear()} {SITE.name}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
