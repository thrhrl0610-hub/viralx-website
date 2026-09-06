import { Resend } from 'resend'
import { NextResponse } from 'next/server'

/** Built per request: constructing this at import time throws when the key
 *  is absent, which fails the whole production build. */
function client() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: Request) {
  const { firstName, lastName, email, service, message } = await req.json()

  try {
    await client().emails.send({
      from: 'ViralX <connect@viralx.co.nz>',
      to: 'connect@viralx.co.nz',
      subject: `New enquiry from ${firstName} ${lastName}`,
      html: `
        <h2>New project enquiry</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}