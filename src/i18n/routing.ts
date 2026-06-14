import { defaultLocale, locales, type Locale } from './config'

/**
 * Build a locale-aware href. The default locale (Greek) is unprefixed; other
 * locales get an `/<locale>` prefix. Works with hash links too (`/#services`).
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}

/** Read the active locale from a browser pathname (e.g. `/en/work` -> `en`). */
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split('/')[1]
  return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale
}

/** Strip the locale prefix from a pathname, returning the locale-agnostic path. */
export function stripLocale(pathname: string): string {
  const seg = pathname.split('/')[1]
  if (locales.includes(seg as Locale) && seg !== defaultLocale) {
    const rest = pathname.slice(`/${seg}`.length)
    return rest === '' ? '/' : rest
  }
  return pathname || '/'
}
