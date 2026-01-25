import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();
    const source = String(body?.source || "").trim();
    const ts = new Date().toISOString();

    if (!email) {
      return NextResponse.json({ ok: false, error: "missing_email" }, { status: 400 });
    }

    // Per ora: log (su Render lo vedi nei logs).
    console.log("[LEAD]", { ts, email, message, source });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: "exception", details: String(e?.message || e) }, { status: 500 });
  }
}
