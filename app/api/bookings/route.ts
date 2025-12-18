import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Ensure this matches your actual export path

export async function POST(request: Request) {
  try {
    // Check if supabase is configured
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database configuration is missing. Please contact support.' },
        { status: 503 }
      );
    }

    // 1. Parse the incoming JSON body
    const body = await request.json();
    const { name, email, service, plan, message, utm } = body;

    // 2. Server-side Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: Name, Email, and Message are required.' },
        { status: 400 }
      );
    }

    // 3. Prepare data for Supabase
    // We convert empty strings to null for cleaner database entries if the user didn't select options
    const bookingData = {
      name,
      email,
      service: service || null,
      plan: plan || null,
      message,
      utm: utm || null, // Handles the JSONB column if you pass it later
    };

    // 4. Insert into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select(); // .select() returns the inserted row, useful for confirmation

    // 5. Handle Database Errors
    if (error) {
      console.error('Supabase Insertion Error:', error.message);
      return NextResponse.json(
        { error: 'Failed to save booking. Please try again.' },
        { status: 500 }
      );
    }

    // 6. Success Response
    return NextResponse.json(
      { success: true, message: 'Booking created successfully', data },
      { status: 201 }
    );

  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}