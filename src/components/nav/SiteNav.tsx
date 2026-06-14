'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Magnetic } from '@/components/motion/Magnetic'
import { AtticLogo } from '@/components/brand/AtticLogo'
import { SITE } from '@/data/site'

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#approach', label: 'Approach' },
  { href: '/#studio', label: 'Studio' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <nav className="liquid-glass mx-auto flex max-w-5xl items-center justify-between rounded-full py-2.5 pl-6 pr-2.5">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className="text-accent transition-colors hover:text-ink"
          onClick={() => setOpen(false)}
        >
          <AtticLogo className="h-5 w-auto" />
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-flex" strength={0.4}>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center px-5 py-2.5 text-sm"
            >
              Start a project
            </Link>
          </Magnetic>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-full border border-hairline bg-white/70 text-ink md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="liquid-glass mx-auto mt-3 max-w-5xl overflow-hidden rounded-3xl p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-accent/10"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 flex w-full justify-center px-5 py-3 text-sm"
            >
              Start a project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
