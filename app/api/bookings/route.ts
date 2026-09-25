import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(request: Request) {
  try {
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

    // 3. Optional Database persistence with Supabase (if configured)
    let savedToDb = false;
    let dbRecordId: string | number | null = null;

    if (supabase) {
      try {
        const bookingData = {
          name,
          email,
          service: service || null,
          plan: plan || null,
          message,
          utm: utm || null,
          seen: false,
        };

        const { data, error } = await supabase
          .from('bookings')
          .insert([bookingData])
          .select();

        if (error) {
          console.warn('Supabase Insertion Warning (proceeding with email):', error.message);
        } else if (data && data.length > 0) {
          savedToDb = true;
          dbRecordId = data[0].id;
        }
      } catch (dbErr) {
        console.warn('Supabase DB error (proceeding with email):', dbErr);
      }
    }

    // 4. Send Email via Resend
    let emailSent = false;
    const adminRecipient = process.env.CONTACT_EMAIL || 'info@elevenxsolutions.com';
    const fromAddress = process.env.RESEND_FROM_EMAIL || 'Eleven X Solutions <onboarding@resend.dev>';

    if (resend) {
      try {
        // --- EMAIL 1: Detailed notification to Admin / You ---
        const formattedMessage = String(message).replace(/\n/g, '<br/>');

        const adminEmailResult = await resend.emails.send({
          from: fromAddress,
          to: adminRecipient,
          replyTo: `${name} <${email}>`,
          subject: `🔔 New Booking Inquiry: ${name} (${service || 'General'})`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 30px 15px; }
                .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                .header { background: #090C12; padding: 24px 30px; border-bottom: 2px solid #1757EE; }
                .header h1 { margin: 0; color: #ffffff; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
                .header p { margin: 6px 0 0 0; color: #94a3b8; font-size: 13px; }
                .content { padding: 30px; }
                .field-group { margin-bottom: 20px; }
                .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px; }
                .value { font-size: 15px; color: #0f172a; font-weight: 500; }
                .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px; font-size: 14px; line-height: 1.6; color: #334155; }
                .badge { display: inline-block; background: #eff6ff; color: #1757EE; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
                .footer { background: #f8fafc; padding: 18px 30px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8; }
                .reply-btn { display: inline-block; background: #1757EE; color: #ffffff !important; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600; margin-top: 16px; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="header">
                  <h1>New Consultation Booking</h1>
                  <p>Received via 11xsol /book contact form</p>
                </div>
                <div class="content">
                  <div class="field-group">
                    <div class="label">Lead Name</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field-group">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${email}" style="color: #1757EE; text-decoration: none;">${email}</a></div>
                  </div>
                  <div style="display: flex; gap: 20px;" class="field-group">
                    <div>
                      <div class="label">Service Focus</div>
                      <span class="badge">${service || 'Strategy Call'}</span>
                    </div>
                    ${plan ? `
                    <div style="margin-left: 20px;">
                      <div class="label">Sprint Plan</div>
                      <div class="value" style="font-size: 14px;">${plan}</div>
                    </div>` : ''}
                  </div>
                  <div class="field-group">
                    <div class="label">Inquiry & Organization Details</div>
                    <div class="message-box">${formattedMessage}</div>
                  </div>
                  <div style="text-align: center;">
                    <a href="mailto:${email}?subject=Re: Your inquiry with Eleven X Solutions" class="reply-btn">
                      Reply Directly to ${name} &rarr;
                    </a>
                  </div>
                </div>
                <div class="footer">
                  Eleven X Solutions Lead Notification &bull; Hit Reply to respond directly to this client.
                </div>
              </div>
            </body>
            </html>
          `,
        });

        if (adminEmailResult.error) {
          console.error('Resend Admin Email Error:', adminEmailResult.error);
        } else {
          emailSent = true;
        }

        // --- EMAIL 2 (Optional client confirmation): Send Thank You to lead ---
        // Wrapped in safe try-catch (Free Resend tier only allows sending to verified domain/test email)
        try {
          await resend.emails.send({
            from: fromAddress,
            to: email,
            subject: 'We have received your inquiry — Eleven X Solutions',
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f6f9fc; margin: 0; padding: 40px 15px; }
                  .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #eaeaea; }
                  .brand { background: #090C12; padding: 26px 30px; text-align: center; }
                  .brand h2 { color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px; }
                  .body-content { padding: 36px 32px; color: #333333; line-height: 1.6; }
                  .btn { display: inline-block; background: #1757EE; color: #ffffff !important; padding: 12px 26px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 20px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="brand">
                    <h2>ELEVEN X SOLUTIONS</h2>
                  </div>
                  <div class="body-content">
                    <p style="font-size: 18px; font-weight: 600; margin-top: 0;">Hi ${name},</p>
                    <p>Thank you for reaching out to us. We have received your inquiry regarding <strong>${service || 'engineering & design strategy'}</strong>.</p>
                    <p>Our technical team is reviewing your project roadmap. We respond to all qualified inquiries within 24 business hours to coordinate an introductory discovery sprint.</p>
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="https://elevenxsolutions.com" class="btn">Explore Our Work</a>
                    </div>
                    <p style="color: #666; font-size: 13px; border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                      Best Regards,<br/>
                      <strong>The Eleven X Solutions Team</strong>
                    </p>
                  </div>
                </div>
              </body>
              </html>
            `,
          });
        } catch (leadEmailErr) {
          // Non-blocking (often restricted on Resend free test accounts until custom domain is verified)
          console.log('Client auto-reply skipped or pending domain verification:', leadEmailErr);
        }

        // Mark Supabase record as seen if email was successfully dispatched
        if (savedToDb && dbRecordId && supabase) {
          await supabase.from('bookings').update({ seen: true }).eq('id', dbRecordId);
        }
      } catch (resendErr) {
        console.error('Resend Dispatch Exception:', resendErr);
      }
    } else {
      console.warn('RESEND_API_KEY is not set. In local dev, configure RESEND_API_KEY in .env.local to send live emails.');
    }

    // 5. Success Response back to the frontend
    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry received successfully',
        emailDispatched: emailSent,
        savedToDatabase: savedToDb,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('API Route Error in /api/bookings:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}