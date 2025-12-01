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
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f6f9fc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f9fc; padding: 40px 0;">
                <tr>
                  <td align="center">
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                      
                      <tr>
                        <td style="background-color: #000000; padding: 30px; text-align: center;">
                          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ELEVEN X SOLUTIONS</h1>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 40px 30px;">
                          <h2 style="color: #333333; margin-top: 0; font-size: 20px;">Hi ${name},</h2>
                          
                          <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                            Thank you for reaching out to us. We have successfully received your inquiry.
                          </p>
                          
                          <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                            Our engineering team is currently reviewing your requirements. We aim to respond to all inquiries within 24 hours to discuss how we can help bring your vision to life.
                          </p>

                          <div style="text-align: center; margin: 35px 0;">
                            <a href="https://elevenxsolutions.com" style="background-color: #000000; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px;">Visit Our Website</a>
                          </div>

                          <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                          <p style="color: #888888; font-size: 14px; line-height: 1.5;">
                            Best Regards,<br/>
                            <strong>The Eleven X Team</strong>
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #999999; font-size: 12px;">
                          &copy; ${new Date().getFullYear()} Eleven X Solutions. All rights reserved.
                        </td>
                      </tr>

                    </table>
                  </td>
                </tr>
              </table>

            </body>
            </html>
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