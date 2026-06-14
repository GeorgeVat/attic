import { isValidPhoneNumber, parsePhoneNumber, type CountryCode } from 'libphonenumber-js'

export type CountryOption = { code: CountryCode; dial: string; label: string; flag: string }

// Curated dial codes for the studio's likeliest markets. Greece is first so it
// is the default selection.
export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'GR', dial: '+30', label: 'Greece', flag: '🇬🇷' },
  { code: 'CY', dial: '+357', label: 'Cyprus', flag: '🇨🇾' },
  { code: 'GB', dial: '+44', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', dial: '+49', label: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dial: '+33', label: 'France', flag: '🇫🇷' },
  { code: 'NL', dial: '+31', label: 'Netherlands', flag: '🇳🇱' },
  { code: 'US', dial: '+1', label: 'United States', flag: '🇺🇸' },
]

export const DEFAULT_COUNTRY = COUNTRY_OPTIONS[0]

// Combine a selected country (ISO code) + a locally-typed number into a single
// validated E.164 string. Returns the E.164 string, or null if invalid.
export function toValidE164(countryCode: string, rawNumber: string): string | null {
  const trimmed = rawNumber.trim()
  if (!trimmed) return null
  try {
    if (!isValidPhoneNumber(trimmed, countryCode as CountryCode)) return null
    return parsePhoneNumber(trimmed, countryCode as CountryCode)?.number ?? null
  } catch {
    return null
  }
}
