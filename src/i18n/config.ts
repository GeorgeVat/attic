// Supported locales. Greek is the default and is served unprefixed (e.g. `/`,
// `/work`); English is served under `/en`. Keep this list in sync with the
// dictionaries in `./dictionaries`.
export const locales = ['el', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'el'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

// Human-readable labels for the language switcher.
export const localeNames: Record<Locale, string> = {
  el: 'Ελληνικά',
  en: 'English',
}

// Short labels (switcher chips).
export const localeShort: Record<Locale, string> = {
  el: 'ΕΛ',
  en: 'EN',
}
