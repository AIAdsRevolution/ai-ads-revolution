import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const basicPriceId = process.env.STRIPE_BASIC_PRICE_ID;

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY mancante nelle env");
}
if (!basicPriceId) {
  console.error("❌ STRIPE_BASIC_PRICE_ID mancante nelle env");
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20",
    })
  : null;

export async function POST(request: Request) {
  try {
    if (!stripe || !basicPriceId) {
      return NextResponse.json(
        { error: "Stripe non configurato correttamente" },
        { status: 500 }
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const priceId = body.priceId || basicPriceId;

    const originHeader = request.headers.get("origin");
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ||
      originHeader ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?subscription=success`,
      cancel_url: `${origin}/pricing?subscription=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Errore Stripe checkout:", error);
    return NextResponse.json(
      { error: "Errore nella creazione della sessione di pagamento" },
      { status: 500 }
    );
  }
}
