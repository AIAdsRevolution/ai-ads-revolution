import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const email = String(body?.email || "").trim();
    const message = String(body?.message || "").trim();
    const source = String(body?.source || "").trim();
    const lang = String(body?.lang || "auto").trim();
    const ts = new Date().toISOString();

    if (!email) {
      return NextResponse.json({ ok: false, error: "missing_email" }, { status: 400 });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRe.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ ok: false, error: "message_too_long" }, { status: 400 });
    }

    console.log("[LEAD]", { ts, email, message, source, lang });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "exception", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
