import type { Content } from '@/data/types'
import { Reveal } from '../Reveal'
import { ContactForm } from './ContactForm'
import { SITE } from '@/data/site'

export function ContactBand({ contactTypes }: { contactTypes: Content['contactTypes'] }) {
  const types = (contactTypes ?? []).map((row) => row.type)

  return (
    <section id="contact" className="px-4 py-20">
      <div
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/60 px-7 py-16 shadow-[0_50px_100px_-60px_rgba(11,26,48,0.55)] sm:px-14"
        style={{ background: 'linear-gradient(155deg,#0b1a30 0%,#16335f 60%,#1e4fa6 100%)' }}
      >
        <div
          aria-hidden
          className="absolute -right-20 -top-24 size-80 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(52,194,240,0.7), transparent 70%)' }}
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
                Tell us what&rsquo;s <span className="italic text-sky">missing.</span>
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-paper/70">
                A rough idea is enough. We&rsquo;ll come back with questions, a shape, and an honest
                estimate.
              </p>
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
              <ContactForm challengeTypes={types} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
