import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // evento minimo
    const event_name = String(body.event_name || "event");
    const user_id = body.user_id ? String(body.user_id) : null;
    const session_id = body.session_id ? String(body.session_id) : null;
    const page = body.page ? String(body.page) : null;
    const referrer = body.referrer ? String(body.referrer) : null;

    // UTM / click ids
    const utm_source = body.utm_source ? String(body.utm_source) : null;
    const utm_medium = body.utm_medium ? String(body.utm_medium) : null;
    const utm_campaign = body.utm_campaign ? String(body.utm_campaign) : null;
    const gclid = body.gclid ? String(body.gclid) : null;

    // payload extra (json)
    const payload = body.payload ?? null;

    const { error } = await supabase.from("tracking_events").insert({
      event_name,
      user_id,
      session_id,
      page,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      gclid,
      payload,
      ts: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
    });

    if (error) {
      console.error("❌ tracking insert error:", error);
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ /api/track error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
