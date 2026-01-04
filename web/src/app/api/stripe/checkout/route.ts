import { NextResponse } from "next/server";

type Body = {
  quantity?: number;
  priceId?: string;
  mode?: "subscription" | "payment";
  successUrl?: string;
  cancelUrl?: string;
};

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const envPriceId =
      process.env.STRIPE_BASIC_PRICE_ID || process.env.STRIPE_PRICE_BASIC || "";

    if (!stripeSecretKey) {
      return NextResponse.json(
        { ok: false, error: "Missing STRIPE_SECRET_KEY" },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as Body;

    const quantity = Math.max(1, Math.min(99, Number(body.quantity ?? 1)));
    const priceId = String(body.priceId || envPriceId).trim();
    if (!priceId) {
      return NextResponse.json(
        { ok: false, error: "Missing priceId (set STRIPE_BASIC_PRICE_ID/STRIPE_PRICE_BASIC or send body.priceId)" },
        { status: 500 }
      );
    }

    const mode: "subscription" | "payment" = body.mode === "payment" ? "payment" : "subscription";

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const successUrl = (body.successUrl && body.successUrl.startsWith("http"))
      ? body.successUrl
      : `${origin}/dashboard?checkout=success`;

    const cancelUrl = (body.cancelUrl && body.cancelUrl.startsWith("http"))
      ? body.cancelUrl
      : `${origin}/pricing?checkout=cancel`;

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" as any });

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ ok: true, id: session.id, url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
