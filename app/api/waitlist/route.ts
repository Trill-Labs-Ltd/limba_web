import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/app/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase environment variables not configured')
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { email, source, referredByCode } = body

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
          source: source || 'landing_page',
          referred_by_code: referredByCode || null,
          status: 'waiting',
        },
      ])
      .select()

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waiting list.' },
          { status: 409 }
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
        data: data[0],
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
