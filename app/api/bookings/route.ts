// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type BookingPayload = {
  name?: string;
  email?: string;
  service?: string;
  plan?: string;
  message?: string;
  submittedAt?: string;
};

const REQUIRED_FIELDS: Array<keyof BookingPayload> = ["name", "email", "message"];

function escapeHtml(unsafe?: string) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildLeadHtml(payload: BookingPayload, siteName: string) {
  const submittedAt = escapeHtml(payload.submittedAt || new Date().toISOString());
  return `...`; // keep your existing HTML template body (omitted here for brevity)
}

function buildOwnerHtml(payload: BookingPayload, siteName: string) {
  const submittedAt = escapeHtml(payload.submittedAt || new Date().toISOString());
  return `...`; // keep your existing HTML template body (omitted here for brevity)
}

export async function POST(req: Request) {
  try {
    const body: BookingPayload = await req.json();

    for (const f of REQUIRED_FIELDS) {
      if (!body[f] || String(body[f]).trim() === "") {
        return NextResponse.json({ error: `Missing required field: ${f}` }, { status: 400 });
      }
    }

    // Load env
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
      console.error("Missing SMTP env var(s).");
      return NextResponse.json({ error: "Email configuration not set (check SMTP env vars)" }, { status: 500 });
    }

    // Build transporter (use STARTTLS on 587). If you MUST use 465 then set secure: true.
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        // recommended TLS options
        rejectUnauthorized: true,
      },
    });

    // verify transporter connectivity
    try {
      await transporter.verify();
      console.log("SMTP connection verified.");
    } catch (verifyErr) {
      console.error("SMTP verification failed:", verifyErr);
      return NextResponse.json({ error: "SMTP verification failed. Check SMTP credentials and network." }, { status: 500 });
    }

    const siteName = SITE_NAME || "Website";
    const nowIso = new Date().toISOString();
    const payloadWithTime: BookingPayload = { ...body, submittedAt: body.submittedAt || nowIso };

    const leadMail = {
      from: `"${FROM_NAME || siteName}" <${FROM_EMAIL}>`,
      to: String(body.email),
      subject: `Thank you — we received your request (${siteName})`,
      html: buildLeadHtml(payloadWithTime, siteName),
      replyTo: SITE_OWNER_EMAIL,
    };

    const ownerMail = {
      from: `"${FROM_NAME || siteName}" <${FROM_EMAIL}>`,
      to: SITE_OWNER_EMAIL,
      subject: `New lead: ${body.name} — ${body.email}`,
      html: buildOwnerHtml(payloadWithTime, siteName),
      replyTo: String(body.email),
    };

    // send
    const [leadResult, ownerResult] = await Promise.all([
      transporter.sendMail(leadMail),
      transporter.sendMail(ownerMail),
    ]);

    console.log("Emails sent:", {
      leadMessageId: (leadResult as any)?.messageId,
      ownerMessageId: (ownerResult as any)?.messageId,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    // log the real error for debugging
    console.error("Error in /api/bookings:", err && (err.stack || err.message || err));
    // Return a safe message to client but log full error on server
    return NextResponse.json({ error: "Internal server error while sending email" }, { status: 500 });
  }
}
