import { NextResponse, type NextRequest } from 'next/server'
import {
  clientConfirmationEmail,
  internalNotificationEmail,
  type ContactFormData,
} from '@/lib/contactEmails'
import { createRateLimiter } from '@/lib/rateLimit'

// 5 requests / 10 min / IP (best-effort, per warm instance — see lib/rateLimit).
const rateLimited = createRateLimiter()

export async function POST(request: NextRequest) {
  let body: Partial<ContactFormData> & { website?: string }
  try {
    body = (await request.json()) as Partial<ContactFormData> & { website?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    // Honeypot: real users never fill this hidden field.
    if (body.website) return NextResponse.json({ success: true }, { status: 200 })

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const fieldLengths: { field: keyof typeof body; max: number }[] = [
      { field: 'name', max: 200 },
      { field: 'company', max: 200 },
      { field: 'challenge', max: 200 },
      { field: 'email', max: 320 },
      { field: 'message', max: 5000 },
    ]
    for (const { field, max } of fieldLengths) {
      const val = body[field]
      if (typeof val === 'string' && val.length > max) {
        return NextResponse.json({ error: 'Field too long' }, { status: 400 })
      }
    }

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 },
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const data = body as ContactFormData

    // No CMS/email provider is wired in this static build. We validate, log, and
    // acknowledge. To deliver mail, send `clientConfirmationEmail(data)` /
    // `internalNotificationEmail(data)` via your provider (e.g. Resend) here.
    void clientConfirmationEmail
    void internalNotificationEmail
    console.info('[contact] submission', {
      name: data.name,
      email: data.email,
      company: data.company,
      challenge: data.challenge,
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Error processing contact form:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
