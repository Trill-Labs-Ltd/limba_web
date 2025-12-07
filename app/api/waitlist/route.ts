import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabase'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, source, referredByCode } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Insert into waitlist_signups table
    const { data, error } = await supabase
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
          { error: 'This email is already on the waiting list' },
          { status: 409 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add to waiting list' },
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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

