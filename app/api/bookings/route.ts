// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type BookingPayload = {
  name?: string;
  email?: string;
  service?: string;
  plan?: string;
  message?: string;
  // optionally other metadata
  utm?: Record<string, any>;
};

const REQUIRED = ["name", "email", "message"];

// Create a server-side Supabase client using the SERVICE ROLE KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_ROLE_KEY || "");

export async function POST(req: Request) {
  try {
    const body: BookingPayload = await req.json();

    // Basic validation
    for (const f of REQUIRED) {
      if (!body[f as keyof BookingPayload] || String(body[f as keyof BookingPayload]).trim() === "") {
        return NextResponse.json({ error: `Missing required field: ${f}` }, { status: 400 });
      }
    }

    // Prepare record
    const record = {
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      service: body.service ? String(body.service).trim() : null,
      plan: body.plan ? String(body.plan).trim() : null,
      message: String(body.message).trim(),
      utm: body.utm || null,
    };

    // Insert into Supabase
    const { error } = await supabase
      .from("bookings")
      .insert(record)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error in /api/bookings:", err?.stack || err?.message || err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
