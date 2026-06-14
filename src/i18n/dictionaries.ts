import type { Locale } from './config'
import { en } from './dictionaries/en'
import { el } from './dictionaries/el'

// The English dictionary defines the canonical shape; every other locale must
// satisfy this type (enforced in each dictionary file).
export type Dictionary = typeof en

const dictionaries: Record<Locale, Dictionary> = { el, en }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
