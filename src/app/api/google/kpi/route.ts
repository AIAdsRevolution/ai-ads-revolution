import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get("days") || "28";

  const base =
    process.env.AI_CORE_URL ||
    process.env.NEXT_PUBLIC_AIADS_API_BASE_URL ||
    "https://aiadsrevolution-ai-core.onrender.com";

  const url = `${base.replace(/\/$/, "")}/google/kpi?days=${encodeURIComponent(days)}`;

  try {
    const r = await fetch(url, { cache: "no-store" });
    const text = await r.text();
    return new NextResponse(text, {
      status: r.status,
      headers: { "content-type": r.headers.get("content-type") || "application/json" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "proxy_error", message: String(e?.message || e) },
      { status: 500 }
    );
  }
}
