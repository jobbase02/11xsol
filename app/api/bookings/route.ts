// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Booking payload type
 */
type BookingPayload = {
  name?: string;
  email?: string;
  service?: string;
  plan?: string;
  message?: string;
  submittedAt?: string;
};

const REQUIRED_FIELDS: Array<keyof BookingPayload> = ["name", "email", "message"];

/**
 * Escape unsafe characters in HTML contexts.
 */
function escapeHtml(unsafe?: string) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Build a professional-looking HTML email for the lead (thank you).
 */
function buildLeadHtml(payload: BookingPayload, siteName: string) {
  const submittedAt = escapeHtml(payload.submittedAt || new Date().toISOString());
  return `
  <div style="font-family: Inter,system-ui,Segoe UI,Roboto,Arial; color: #111;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:24px; background:#ffffff; border-radius:12px;">
          <h2 style="margin:0 0 8px 0; font-size:20px; color:#111;">Thanks ${escapeHtml(payload.name)}</h2>
          <p style="margin:0 0 16px 0; color:#333;">We received your request for <strong>${escapeHtml(payload.service || "Consultation")}</strong>. Our team will review the details and reach out within 24 hours.</p>

          <h4 style="margin:0 0 8px 0; font-size:14px; color:#111;">Request summary</h4>
          <table cellpadding="6" cellspacing="0" style="width:100%; border-collapse:collapse; margin-bottom:16px;">
            <tr>
              <td style="font-size:13px; color:#555; width:120px;">Plan</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.plan || "Not specified")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Email</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.email || "")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Submitted</td>
              <td style="font-size:13px; color:#111;">${submittedAt}</td>
            </tr>
          </table>

          <div style="background:#f7f7fb; padding:12px; border-radius:8px; color:#333; font-size:13px;">
            ${escapeHtml(payload.message || "")}
          </div>

          <p style="margin-top:18px; color:#666; font-size:13px;">If you need to update your request, reply to this email and we'll pick it up.</p>

          <p style="margin-top:20px; margin-bottom:0; color:#111; font-weight:600;">${escapeHtml(siteName)}</p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

/**
 * Build owner notification email HTML
 */
function buildOwnerHtml(payload: BookingPayload, siteName: string) {
  const submittedAt = escapeHtml(payload.submittedAt || new Date().toISOString());
  return `
  <div style="font-family: Inter,system-ui,Segoe UI,Roboto,Arial; color: #111;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:24px; background:#fff; border-radius:12px;">
          <h2 style="margin:0 0 8px 0; font-size:18px; color:#111;">New lead received</h2>
          <p style="margin:0 0 16px 0; color:#333;">A new booking lead has been submitted on <strong>${escapeHtml(siteName)}</strong>. Details below.</p>

          <table cellpadding="6" cellspacing="0" style="width:100%; border-collapse:collapse; margin-bottom:12px;">
            <tr>
              <td style="font-size:13px; color:#555; width:120px;">Name</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.name || "")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Email</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.email || "")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Service</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.service || "Not specified")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Plan</td>
              <td style="font-size:13px; color:#111;">${escapeHtml(payload.plan || "Not specified")}</td>
            </tr>
            <tr>
              <td style="font-size:13px; color:#555;">Submitted</td>
              <td style="font-size:13px; color:#111;">${submittedAt}</td>
            </tr>
          </table>

          <h4 style="margin:0 0 8px 0; font-size:14px; color:#111;">Message</h4>
          <div style="background:#f7f7fb; padding:12px; border-radius:8px; color:#333; font-size:13px;">
            ${escapeHtml(payload.message || "")}
          </div>

          <p style="margin-top:16px; color:#666; font-size:12px;">This is an automated notification. Reply to ${escapeHtml(payload.email || "")} to contact the lead.</p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

/**
 * POST handler for the bookings API
 */
export async function POST(req: Request) {
  try {
    const body: BookingPayload = await req.json();

    // Validate required fields
    for (const f of REQUIRED_FIELDS) {
      if (!body[f] || String(body[f]).trim() === "") {
        return NextResponse.json({ error: `Missing required field: ${f}` }, { status: 400 });
      }
    }

    // Env
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      FROM_EMAIL,
      FROM_NAME,
      SITE_OWNER_EMAIL,
      SITE_NAME,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !SITE_OWNER_EMAIL) {
      console.error("Missing SMTP or email configuration in environment variables.");
      return NextResponse.json({ error: "Email configuration is not set" }, { status: 500 });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Compose messages
    const siteName = SITE_NAME || "Website";
    const nowIso = new Date().toISOString();
    const payloadWithTime: BookingPayload = {
      ...body,
      submittedAt: body.submittedAt || nowIso,
    };

    const leadMail = {
      from: `"${FROM_NAME || siteName}" <${FROM_EMAIL}>`,
      to: String(body.email),
      subject: `Thank you — we received your request (${siteName})`,
      html: buildLeadHtml(payloadWithTime, siteName),
      replyTo: SITE_OWNER_EMAIL, // reply goes to owner so owner can respond quickly
    };

    const ownerMail = {
      from: `"${FROM_NAME || siteName}" <${FROM_EMAIL}>`,
      to: SITE_OWNER_EMAIL,
      subject: `New lead: ${body.name} — ${body.email}`,
      html: buildOwnerHtml(payloadWithTime, siteName),
      replyTo: String(body.email),
    };

    // Send both emails in parallel
    const [leadResult, ownerResult] = await Promise.all([
      transporter.sendMail(leadMail),
      transporter.sendMail(ownerMail),
    ]);

    console.log("Booking emails sent:", {
      leadMessageId: (leadResult as any)?.messageId,
      ownerMessageId: (ownerResult as any)?.messageId,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error in /api/bookings:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
