import { Resend } from 'resend'

// Where contact-form submissions land, and the verified sender they come from.
// `FROM` must stay on a domain verified in Resend or the send is rejected.
const TO = 'brendancopley@protonmail.com'
const FROM = 'Brendan Copley <contact@brendancopley.com>'

interface ContactSubmission {
  fullname: string
  email: string
  phone: string
  subject: string
  message: string
}

/**
 * Mirrors the zod schema in app/components/content/Contact.vue. The client
 * schema is a convenience; this is the one that actually guards the mailer,
 * because anything can POST to this route.
 */
function validate(body: unknown): ContactSubmission | null {
  if (typeof body !== 'object' || body === null)
    return null

  const { fullname, email, phone, subject, message } = body as Record<string, unknown>

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const candidate = {
    fullname: str(fullname),
    email: str(email),
    phone: str(phone),
    subject: str(subject),
    message: str(message),
  }

  const valid
    = candidate.fullname.length >= 3 && candidate.fullname.length <= 100
      && candidate.email.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)
      && candidate.phone.length <= 50
      && candidate.subject.length >= 5 && candidate.subject.length <= 200
      && candidate.message.length >= 10 && candidate.message.length <= 5000

  return valid ? candidate : null
}

/** Submissions are attacker-controlled and land in an HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default defineEventHandler(async (event) => {
  const apiKey = useRuntimeConfig(event).private?.resendApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Contact form is not configured',
    })
  }

  const submission = validate(await readBody(event))

  if (!submission) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid submission',
    })
  }

  const { fullname, email, phone, subject, message } = submission

  const { error } = await new Resend(apiKey).emails.send({
    from: FROM,
    to: [TO],
    // So a reply from the inbox goes back to the sender, not to contact@.
    replyTo: email,
    subject: `brendancopley.com — ${subject}`,
    html: `
      <p>New message from the contact form on brendancopley.com.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(fullname)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Phone:</strong> ${phone ? escapeHtml(phone) : '—'}</li>
        <li><strong>Subject:</strong> ${escapeHtml(subject)}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
    `,
  })

  // The previous handler swallowed failures into a 200 with an { error } body,
  // so the client's catch never fired and every send looked successful.
  if (error) {
    console.error('[contact] resend rejected the send:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Could not send message',
    })
  }

  return { ok: true }
})
