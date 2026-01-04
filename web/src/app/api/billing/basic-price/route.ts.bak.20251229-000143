import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const basicPriceIdEnv =
  process.env.STRIPE_BASIC_PRICE_ID || process.env.STRIPE_PRICE_BASIC;

if (!stripeSecret) {
  console.error("❌ STRIPE_SECRET_KEY mancante nelle env");
}
if (!basicPriceIdEnv) {
  console.error(
    "❌ STRIPE_BASIC_PRICE_ID / STRIPE_PRICE_BASIC mancante nelle env"
  );
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

export async function GET() {
  try {
    if (!stripe || !basicPriceIdEnv) {
      return NextResponse.json(
        { error: "Stripe non configurato correttamente" },
        { status: 500 }
      );
    }

    const price = await stripe.prices.retrieve(basicPriceIdEnv);

    return NextResponse.json(price);
  } catch (error) {
    console.error("❌ Errore nel recupero del prezzo Basic:", error);
    return NextResponse.json(
      { error: "Errore nel recupero del prezzo Basic" },
      { status: 500 }
    );
  }
}
