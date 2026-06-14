export interface ContactFormData {
  challenge?: string
  name: string
  email: string
  company?: string
  message: string
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const escapeData = (data: ContactFormData): ContactFormData => ({
  ...data,
  name: escapeHtml(data.name),
  email: escapeHtml(data.email),
  message: escapeHtml(data.message),
  company: data.company ? escapeHtml(data.company) : data.company,
  challenge: data.challenge ? escapeHtml(data.challenge) : data.challenge,
})

const wrap = (body: string) => `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:32px 16px;background:#f3f6f2;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#10211a;">
  <table role="presentation" style="max-width:560px;margin:0 auto;width:100%;border-collapse:collapse;">
    <tr><td style="padding-bottom:24px;font-size:20px;font-weight:700;letter-spacing:-0.02em;">
      attic<span style="color:#31696d;">.</span>
    </td></tr>
    <tr><td style="background:#ffffff;border:1px solid #dde6dd;border-radius:12px;padding:28px;">
      ${body}
    </td></tr>
    <tr><td style="padding-top:20px;font-size:12px;color:#5d6b62;">
      Software, built to fit. — Athens<br/>© ${new Date().getFullYear()} ATTIC
    </td></tr>
  </table>
</body>
</html>`

const row = (label: string, value: string, extra?: string) =>
  `<p style="margin:6px 0;font-size:14px;color:#5d6b62;${extra ?? ''}"><strong style="color:#10211a;">${label}:</strong> ${value}</p>`

const messageRow = (label: string, value: string) =>
  row(label, value, 'white-space:pre-line;')

export const clientConfirmationEmail = (data: ContactFormData) => {
  const d = escapeData(data)
  return wrap(`
    <h2 style="margin:0 0 14px;font-size:18px;">Thank you, ${d.name}.</h2>
    <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#6e695e;">
      We received your message and will get back to you within 24–48 hours.
    </p>
    <div style="border-left:3px solid #ff6b4a;padding-left:14px;">
      ${d.challenge ? row('Challenge', d.challenge) : ''}
      ${d.company ? row('Company', d.company) : ''}
      ${messageRow('Message', d.message)}
    </div>
  `).trim()
}

export const internalNotificationEmail = (data: ContactFormData) => {
  const d = escapeData(data)
  return wrap(`
    <h2 style="margin:0 0 14px;font-size:18px;">New contact form submission</h2>
    ${row('Name', d.name)}
    ${row('Email', `<a href="mailto:${d.email}" style="color:#ff6b4a;">${d.email}</a>`)}
    ${d.company ? row('Company', d.company) : ''}
    ${d.challenge ? row('Challenge', d.challenge) : ''}
    ${messageRow('Message', d.message)}
  `).trim()
}
