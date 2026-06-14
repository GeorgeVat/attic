import { ImageResponse } from 'next/og'
import { SITE } from '@/data/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded social card, generated at build/request time so there is no static
// asset to keep in sync with the palette.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #0e1f1e 0%, #143a3c 52%, #1d5a5e 100%)',
          color: '#f4eee2',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em' }}>
          {SITE.wordmark}
          <span style={{ color: '#34c2d4' }}>.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            {SITE.tagline}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: '#9fc4c2' }}>
            {`Software studio — ${SITE.city}`}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
