import { Reveal } from '../Reveal'
import { ContactForm } from './ContactForm'
import { SITE } from '@/data/site'
import type { Dictionary } from '@/i18n/dictionaries'

export function ContactBand({
  dict,
  form,
}: {
  dict: Dictionary['contactBand']
  form: Dictionary['contactForm']
}) {
  return (
    <section id="contact" className="px-4 py-20">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/60 px-7 py-16 shadow-[0_50px_100px_-60px_rgba(18,37,36,0.55)] sm:px-14"
        style={{ background: 'linear-gradient(155deg,#0e1f1e 0%,#143a3c 58%,#1d5a5e 100%)' }}
      >
        <div
          aria-hidden
          className="absolute -right-20 -top-24 size-80 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(52,194,212,0.65), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="text-paper">
              <h2 className="font-display text-4xl font-light tracking-tight sm:text-5xl">
                {dict.titleLead} <span className="italic text-sky">{dict.titleHighlight}</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-paper/70">{dict.body}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-8 inline-block text-sm font-semibold text-sky transition-colors hover:text-white"
              >
                {SITE.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <ContactForm dict={form} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
