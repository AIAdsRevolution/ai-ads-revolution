import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const basicPriceIdEnv =
  process.env.STRIPE_BASIC_PRICE_ID || process.env.STRIPE_PRICE_BASIC;

if (!stripeSecretKey) {
  console.error("❌ STRIPE_SECRET_KEY mancante nelle env");
}
if (!basicPriceIdEnv) {
  console.error(
    "❌ STRIPE_BASIC_PRICE_ID / STRIPE_PRICE_BASIC mancante nelle env"
  );
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(req: Request) {
  try {
    if (!stripe || !basicPriceIdEnv) {
      return NextResponse.json(
        { error: "Stripe non configurato correttamente" },
        { status: 500 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const priceId = body.priceId || basicPriceIdEnv;

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
  } catch (error) {
    console.error("❌ Errore Stripe checkout:", error);
    return NextResponse.json(
      { error: "Errore nella creazione della sessione di pagamento" },
      { status: 500 }
    );
  }
}
