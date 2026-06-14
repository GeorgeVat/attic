import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, locales } from '@/i18n/config'

// Locale routing:
//  - Greek (default) is served unprefixed: `/`, `/work`, `/contact`.
//    These are rewritten internally to the `/el/...` segment.
//  - English is served at `/en/...` and passes through untouched.
//  - Explicit `/el/...` URLs are redirected to the unprefixed form so the
//    default locale has a single canonical URL.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasPrefix = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )

  if (hasPrefix) {
    // Canonicalize the default locale to its unprefixed form.
    if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
      const stripped = pathname.slice(`/${defaultLocale}`.length) || '/'
      return NextResponse.redirect(new URL(stripped, req.url))
    }
    return NextResponse.next()
  }

  // No locale prefix -> serve the default locale by rewriting internally.
  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}`, req.url))
}

export const config = {
  // Skip Next internals, the API, metadata image routes, and any file with an
  // extension (assets, robots.txt, sitemap.xml, images, the SVG logo, etc.).
  matcher: ['/((?!_next|api|opengraph-image|twitter-image|icon|apple-icon|.*\\.).*)'],
}
