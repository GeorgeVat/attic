'use client'

import { useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'field-glass w-full px-4 py-3 text-sm text-ink placeholder:text-muted/60'

export function ContactForm({ challengeTypes }: { challengeTypes: string[] }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setStatus('submitting')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const json = (await res.json()) as { success?: boolean; error?: string }
      if (!res.ok || !json.success) {
        setError(json.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setError('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-hairline bg-card p-8">
        <p className="font-display text-2xl text-ink">Thank you.</p>
        <p className="mt-2 text-sm text-muted">
          We received your message and will get back to you within 24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          name *
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className={inputClass}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          email *
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="contact-company" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          company
        </label>
        <input id="contact-company" name="company" className={inputClass} placeholder="Optional" />
      </div>
      <div>
        <label htmlFor="contact-challenge" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          challenge
        </label>
        <select id="contact-challenge" name="challenge" className={inputClass} defaultValue="">
          <option value="" disabled>
            What are we building?
          </option>
          {challengeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={inputClass}
          placeholder="Tell us what's missing."
        />
      </div>
      {status === 'error' && <p className="text-sm text-accent sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary inline-flex items-center px-7 py-3.5 text-sm disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
