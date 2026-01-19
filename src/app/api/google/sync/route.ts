import { NextResponse } from "next/server";

export async function POST() {
  const aiCore = process.env.NEXT_PUBLIC_AI_CORE_URL;
  const syncKey = process.env.AI_CORE_SYNC_KEY;
  if (!aiCore) return NextResponse.json({ ok: false, error: "Missing NEXT_PUBLIC_AI_CORE_URL" }, { status: 500 });
  if (!syncKey) return NextResponse.json({ ok: false, error: "Missing AI_CORE_SYNC_KEY" }, { status: 500 });

  const r = await fetch(`${aiCore}/integrations/google-ads/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-sync-key": syncKey },
    body: JSON.stringify({ source: "web" }),
  });

  const j = await r.json().catch(() => ({}));
  if (!r.ok) return NextResponse.json({ ok: false, error: j?.detail || j?.error || "sync_failed" }, { status: 500 });

  return NextResponse.json({ ok: true, ...j });
}
