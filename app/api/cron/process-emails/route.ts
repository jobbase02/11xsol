import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import sgMail from '@sendgrid/mail';

// 1. Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Force this route to be dynamic so it doesn't cache the DB result
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // Optional security check
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return new NextResponse('Unauthorized', { status: 401 });
    // }

    // 2. Query Supabase for unprocessed bookings
    // UPDATED LOGIC: Checks if 'seen' is FALSE *OR* NULL (to catch old rows if default wasn't applied)
    const { data: leads, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .or('seen.eq.false,seen.is.null') // <--- ROBUST CHECK HERE
      .limit(10); // Process 10 at a time to prevent timeout

    if (fetchError) {
      throw new Error(`DB Fetch Error: ${fetchError.message}`);
    }

    if (!leads || leads.length === 0) {
      return NextResponse.json({ message: 'No new leads to process.' });
    }

    console.log(`Found ${leads.length} new leads. Processing...`);

    const results = [];

    // 3. Loop through each lead and send emails
    for (const lead of leads) {
      const { id, name, email, service, message } = lead;

      try {
        // --- EMAIL 1: Notification to YOU (Admin) ---
        const adminMsg = {
          to: 'info@elevenxsolutions.com',
          from: 'info@elevenxsolutions.com', 
          subject: `🔔 New Lead: ${name} (${service || 'General'})`,
          html: `
            <h2>New Website Lead</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong><br/>${message}</p>
            <br/>
            <p><em>Check Supabase for full details.</em></p>
          `,
        };

        // --- EMAIL 2: Thank You to the LEAD ---
        const userMsg = {
          to: email, 
          from: 'info@elevenxsolutions.com', 
          subject: 'Thank you for contacting Eleven X Solutions',
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h1>Hi ${name},</h1>
              <p>Thank you for showing interest in <strong>Eleven X Solutions</strong>.</p>
              <p>We have received your inquiry regarding <strong>${service || 'our services'}</strong>. Our engineering team is already reviewing your requirements and will get back to you shortly.</p>
              <br/>
              <p>Best Regards,</p>
              <p><strong>The Eleven X Team</strong></p>
            </div>
          `,
        };

        // Send both emails in parallel
        await Promise.all([
          sgMail.send(adminMsg),
          sgMail.send(userMsg)
        ]);

        // 4. Update Database: Mark as seen
        // THIS IS THE UPDATE YOU REQUESTED
        // It only runs if the emails above sent successfully (didn't throw error)!
        const { error: updateError } = await supabase
          .from('bookings')
          .update({ seen: true }) // <--- MARKS AS TRUE
          .eq('id', id);

        if (updateError) {
          console.error(`Failed to update status for ID ${id}:`, updateError);
          results.push({ id, status: 'failed_update', error: updateError.message });
        } else {
          results.push({ id, status: 'success' });
        }

      } catch (emailError: any) {
        console.error(`Failed to email ID ${id}:`, emailError);
        // Important: We do NOT update 'seen' here, so the script will try again next time.
        results.push({ id, status: 'failed_email', error: emailError.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      processed: results.length, 
      details: results 
    });

  } catch (err: any) {
    console.error('Cron Job Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}