// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type BookingPayload = {
  name?: string;
  email?: string;
  service?: string;
  plan?: string;
  message?: string;
  utm?: Record<string, any>;
  submittedAt?: string;
};

const REQUIRED = ["name", "email", "message"];

function logEnvDebug() {
  console.log("ENV CHECK:", {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}

function escapeHtml(unsafe?: string) {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildRecordFromBody(body: BookingPayload, req: Request) {
  const ua = req.headers.get("user-agent") || null;
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || null;

  return {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    service: body.service ? String(body.service).trim() : null,
    plan: body.plan ? String(body.plan).trim() : null,
    message: String(body.message || "").trim(),
    utm: body.utm || null,
    meta: {
      user_agent: ua,
      ip,
    },
    submitted_at: body.submittedAt || new Date().toISOString(),
  };
}

/**
 * Create a server-side Supabase client using service role key.
 * This is intentionally created inside the handler to avoid build-time errors.
 */
function makeSupabaseClient(): SupabaseClient {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

export async function POST(req: Request) {
  logEnvDebug();

  try {
    const body: BookingPayload = await req.json();

    // Basic validation
    for (const f of REQUIRED) {
      if (!body[f as keyof BookingPayload] || String(body[f as keyof BookingPayload]).trim() === "") {
        return NextResponse.json({ error: `Missing required field: ${f}` }, { status: 400 });
      }
    }

    // create supabase client at runtime
    let supabase: SupabaseClient;
    try {
      supabase = makeSupabaseClient();
    } catch (err: any) {
      console.error("Supabase client creation error:", err?.message || err);
      return NextResponse.json({ error: "Server misconfiguration: missing Supabase env vars" }, { status: 500 });
    }

    const record = buildRecordFromBody(body, req);

    // Insert record
    const { data, error } = await supabase
      .from("bookings")
      .insert(record)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: (data as any)?.id, created_at: (data as any)?.created_at });
  } catch (err: any) {
    console.error("Unhandled /api/bookings error:", err?.stack || err?.message || err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
