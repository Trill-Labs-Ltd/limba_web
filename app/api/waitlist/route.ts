import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      !process.env.TURNSTILE_SECRET_KEY
    ) {
      console.error('Supabase environment variables not configured')
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, source, referredByCode, captchaToken } = body

    if (!captchaToken || typeof captchaToken !== 'string') {
      return NextResponse.json({ error: 'Captcha validation failed.' }, { status: 400 })
    }

    // Verify Turnstile captcha server-side
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('cf-connecting-ip') ||
      undefined

    const params = new URLSearchParams()
    params.append('secret', process.env.TURNSTILE_SECRET_KEY)
    params.append('response', captchaToken)
    if (ip) params.append('remoteip', ip)

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params,
    })

    const verifyData = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] }

    if (!verifyData?.success) {
      console.error('Turnstile verification failed', verifyData?.['error-codes'])
      return NextResponse.json({ error: 'Captcha validation failed.' }, { status: 400 })
    }

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      )
    }

    // Insert into waitlist_signups table (admin client bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('waitlist_signups')
      .insert([
        {
          email: email.toLowerCase().trim(),
          source: source || 'Landing page - Unknown',
          referred_by_code: referredByCode || null,
          status: 'waiting',
        },
      ])

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { success: true, message: 'You are on the waiting list.' },
          { status: 200 }
        )
      }

      console.error('Supabase error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })
      return NextResponse.json(
        { error: 'Failed to add to the waiting list.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully added to waiting list!',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing waitlist signup:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
