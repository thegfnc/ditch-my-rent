import { newsletterSignUpSchema } from '@/data/schemas'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  try {
    newsletterSignUpSchema.parse(body)
  } catch (error) {
    return Response.json(
      { error },
      {
        status: 400,
      }
    )
  }

  const { error } = await resend.contacts.create({
    email: body.email,
    unsubscribed: false,
    audienceId: 'c7e3f0e0-29c7-4554-ab4e-eeaa7bc4a827',
  })

  if (error) {
    return Response.json(
      { error },
      {
        status: 400,
      }
    )
  }

  resend.emails.send({
    from: `Ditch My Rent - Newsletter Sign Up Form <no-reply@updates.thegoodfornothings.club>`,
    to: ['hello@thegoodfornothings.club'],
    subject: 'Newsletter Sign up @ https://www.thegoodfornothings.club/',
    text: `You just got a new mailing list sign up!\n\nEmail: ${body.email}`,
  })

  return Response.json({ success: true })
}
