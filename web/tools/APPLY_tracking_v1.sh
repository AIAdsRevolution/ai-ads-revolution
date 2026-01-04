#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== Tracking v1: API + helper client =="

# API route
mkdir -p src/app/api/track
cat > src/app/api/track/route.ts <<'TS'
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
TS

# client helper
mkdir -p src/lib
cat > src/lib/track.ts <<'TS'
type TrackPayload = Record<string, any>;

function getParam(name: string) {
  if (typeof window === "undefined") return null;
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function getUtm(name: string) {
  const v = getParam(name);
  return v ? v : null;
}

export async function track(event_name: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;

  const session_id =
    window.localStorage.getItem("aar_session_id") ||
    (() => {
      const id = crypto.randomUUID();
      window.localStorage.setItem("aar_session_id", id);
      return id;
    })();

  const body = {
    event_name,
    session_id,
    page: window.location.pathname,
    referrer: document.referrer || null,
    utm_source: getUtm("utm_source"),
    utm_medium: getUtm("utm_medium"),
    utm_campaign: getUtm("utm_campaign"),
    gclid: getParam("gclid"),
    payload,
  };

  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // silenzioso
  }
}
TS

echo ""
echo "✅ Creato /api/track + src/lib/track.ts"
echo ""
echo "⚠️ ORA devi creare tabella in Supabase (SQL sotto)."
echo "   Copia questo SQL in Supabase -> SQL Editor:"
cat <<'SQL'

-- TRACKING EVENTS (minimo)
create table if not exists public.tracking_events (
  id bigserial primary key,
  event_name text not null,
  user_id text null,
  session_id text null,
  page text null,
  referrer text null,
  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  gclid text null,
  payload jsonb null,
  ts timestamptz not null default now(),
  date date not null default current_date
);

-- Indici utili
create index if not exists tracking_events_date_idx on public.tracking_events(date);
create index if not exists tracking_events_event_idx on public.tracking_events(event_name);
create index if not exists tracking_events_gclid_idx on public.tracking_events(gclid);

SQL
