import { NextRequest, NextResponse } from 'next/server'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { getCallbackPromise } from '@/config/businessHours'
import { createRateLimiter } from '@/lib/rateLimit'

interface CallbackData {
  name: string
  phone: string // already E.164 from the client
  preferredTime?: string
  consent: boolean
  website?: string // honeypot — humans never fill this
}

// 5 requests / 10 min / IP (best-effort, per warm instance — see lib/rateLimit).
const rateLimited = createRateLimiter()

// Escape user-supplied values before interpolating them into the HTML email,
// so a name like `<img onerror=…>` can't inject markup into the team's inbox.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const row = (label: string, value: string) =>
  `<p style="margin:6px 0;font-size:14px;color:#5d6b62;"><strong style="color:#10211a;">${label}:</strong> ${value}</p>`

const internalEmailHtml = (d: CallbackData, openNow: boolean) => {
  const name = escapeHtml(d.name)
  const phone = escapeHtml(d.phone)
  const preferredTime = escapeHtml(d.preferredTime || 'Not specified')
  return `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#f3f6f2;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#10211a;">
  <table role="presentation" style="max-width:560px;margin:0 auto;width:100%;border-collapse:collapse;">
    <tr><td style="padding-bottom:24px;font-size:20px;font-weight:700;letter-spacing:-0.02em;">
      attic<span style="color:#31696d;">.</span>
    </td></tr>
    <tr><td style="background:#ffffff;border:1px solid #dde6dd;border-radius:12px;padding:28px;">
      <h2 style="margin:0 0 14px;font-size:18px;">New callback request</h2>
      <div style="border-left:3px solid #31696d;padding-left:14px;">
        ${row('Name', name)}
        ${row('Phone', `<a href="tel:${phone}" style="color:#31696d;text-decoration:none;">${phone}</a>`)}
        ${row('Best time', preferredTime)}
        ${row('Promised', openNow ? 'Call within 30 minutes' : 'Call next business day')}
      </div>
      <div style="margin-top:22px;">
        <a href="tel:${phone}" style="display:inline-block;background:#10211a;color:#f3f6f2;border-radius:999px;padding:10px 24px;font-size:14px;font-weight:500;text-decoration:none;">Call ${name} now</a>
      </div>
    </td></tr>
    <tr><td style="padding-top:20px;font-size:12px;color:#5d6b62;">
      Software, built to fit. — Athens<br/>© ${new Date().getFullYear()} ATTIC
    </td></tr>
  </table>
</body>
</html>`.trim()
}

export async function POST(request: NextRequest) {
  try {
    const body: CallbackData = await request.json()

    // Honeypot: a filled "website" means a bot. Pretend success, send nothing.
    if (body.website && body.website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (body.name.trim().length > 100) {
      return NextResponse.json({ error: 'Name is too long.' }, { status: 400 })
    }
    if (body.preferredTime && body.preferredTime.length > 100) {
      return NextResponse.json({ error: 'Preferred time is too long.' }, { status: 400 })
    }
    if (!body.phone || !isValidPhoneNumber(body.phone)) {
      return NextResponse.json({ error: 'A valid phone number is required.' }, { status: 400 })
    }
    if (!body.consent) {
      return NextResponse.json({ error: 'Consent is required.' }, { status: 400 })
    }

    const { open } = getCallbackPromise()

    // No email provider is wired in this static build. We validate, log, and
    // acknowledge. To deliver mail, send `internalEmailHtml(body, open)` via your
    // provider (e.g. Resend) here.
    void internalEmailHtml
    console.info('[callback] request', { name: body.name, phone: body.phone, open })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error processing callback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
