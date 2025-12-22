// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("GET /api/test called - fetching all rows");

    // fetch all rows (you can change select to specific columns)
    const { data, error, status } = await supabase
      .from("bookings")
      .select("*");

    console.log("Supabase GET result:", { status, error });

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json({ error: "Failed to fetch bookings", details: error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, rows: data }, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Unhandled GET /api/bookings error:", msg);
    return NextResponse.json({ error: "Internal server error", details: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        name: body.name,
        email: body.email,
        service: body.service ?? null,
        plan: body.plan ?? null,
        message: body.message ?? null,
        utm: body.utm ?? null
      })
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json({ error: "Failed to save booking", details: error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("API POST error:", msg);
    return NextResponse.json({ error: "Internal server error", details: msg }, { status: 500 });
  }
}
