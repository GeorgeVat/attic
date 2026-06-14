'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { COUNTRY_OPTIONS, DEFAULT_COUNTRY, toValidE164 } from '@/lib/phone'
import { getCallbackPromise } from '@/config/businessHours'
import type { Dictionary } from '@/i18n/dictionaries'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass = 'field-glass mt-1.5 w-full px-3 py-2.5 text-sm text-ink'
const labelClass = 'block font-mono text-xs text-muted'

// The fields + submit/success/error flow for the callback modal. Validates the
// phone to E.164 client-side before posting to /api/callback.
export function CallbackForm({ onDone, dict }: { onDone: () => void; dict: Dictionary['callback'] }) {
  const timeOptions = dict.timeOptions
  const [name, setName] = useState('')
  const [country, setCountry] = useState<string>(DEFAULT_COUNTRY.code)
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState<string>(timeOptions[0])
  const [consent, setConsent] = useState(false)
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const doneRef = useRef<HTMLButtonElement>(null)

  // On success the form is replaced by the confirmation; move focus to the
  // Done button so keyboard/screen-reader users aren't dropped to <body>.
  useEffect(() => {
    if (status === 'success') doneRef.current?.focus()
  }, [status])

  // Promise text is fixed for the life of this open modal.
  const promise = useMemo(
    () => (getCallbackPromise().open ? dict.promiseOpen : dict.promiseClosed),
    [dict],
  )

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError(dict.errName)
      return
    }
    const e164 = toValidE164(country, phone)
    if (!e164) {
      setError(dict.errPhone)
      return
    }
    if (!consent) {
      setError(dict.errConsent)
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: e164,
          preferredTime: time,
          consent,
          website,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || dict.errGeneric)
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : dict.errGeneric)
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="py-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{dict.successEyebrow}</p>
        <h2 id="callback-title" className="mt-3 font-display text-2xl text-ink">
          {dict.successTitle}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">{promise}</p>
        <button
          ref={doneRef}
          type="button"
          onClick={onDone}
          className="btn-primary mt-6 inline-flex items-center px-7 py-2.5 text-sm"
        >
          {dict.done}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">{dict.eyebrow}</p>
      <h2 id="callback-title" className="mt-2 font-display text-2xl text-ink">
        {dict.title}
      </h2>
      <p className="mt-2 text-sm text-muted">{promise}</p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="cb-name" className={labelClass}>
            {dict.name}
          </label>
          <input
            id="cb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="cb-phone" className={labelClass}>
            {dict.phone}
          </label>
          <div className="mt-1.5 flex gap-2">
            <select
              aria-label={dict.countryAria}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="field-glass px-2 py-2.5 text-sm text-ink"
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.dial}
                </option>
              ))}
            </select>
            <input
              id="cb-phone"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
              placeholder={dict.phonePlaceholder}
              className="field-glass flex-1 px-3 py-2.5 text-sm text-ink placeholder:text-muted/60"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cb-time" className={labelClass}>
            {dict.bestTime}
          </label>
          <select
            id="cb-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={fieldClass}
          >
            {timeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Honeypot — off-screen; bots fill it, humans never see it. */}
        <div aria-hidden className="absolute -left-[9999px] top-0">
          <label htmlFor="cb-website">Website</label>
          <input
            id="cb-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-accent"
          />
          <span className="text-xs leading-relaxed text-muted">{dict.consent}</span>
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary mt-6 inline-flex w-full items-center justify-center px-6 py-3 text-sm disabled:opacity-60"
      >
        {status === 'submitting' ? dict.sending : dict.submit}
      </button>
    </form>
  )
}
