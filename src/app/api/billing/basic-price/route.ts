import { NextResponse } from "next/server";

export async function GET() {
  try {
    const priceId =
      process.env.STRIPE_BASIC_PRICE_ID || process.env.STRIPE_PRICE_BASIC || "";

    if (!priceId) {
      return NextResponse.json(
        { ok: false, error: "Missing STRIPE_BASIC_PRICE_ID (or STRIPE_PRICE_BASIC)" },
        { status: 500 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      // build-safe / runtime-safe: return at least the priceId
      return NextResponse.json({ ok: true, priceId, note: "STRIPE_SECRET_KEY not set; returning priceId only" });
    }

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" as any });

    const price = await stripe.prices.retrieve(priceId);

    return NextResponse.json({
      ok: true,
      priceId,
      currency: price.currency,
      unit_amount: price.unit_amount,
      recurring: price.recurring ?? null,
      active: price.active,
      product: price.product,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
