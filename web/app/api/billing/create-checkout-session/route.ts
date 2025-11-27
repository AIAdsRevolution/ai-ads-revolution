import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePriceId = process.env.STRIPE_BASIC_PRICE_ID;

// Controllo configurazione Stripe
if (!stripeSecretKey || !stripePriceId) {
  console.warn("Stripe non è configurato correttamente:", {
    hasSecret: !!stripeSecretKey,
    hasPrice: !!stripePriceId,
  });
}

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2024-06-20" as any,
    })
  : null;

// URL base del sito in produzione
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.aiadsrevolution.com";

export async function POST(_req: NextRequest) {
  try {
    if (!stripe || !stripePriceId) {
      return NextResponse.json(
        {
          error:
            "Stripe non è ancora configurato. Aggiungi STRIPE_SECRET_KEY e STRIPE_BASIC_PRICE_ID nelle variabili d'ambiente.",
        },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/dashboard?checkout=success`,
      cancel_url: `${BASE_URL}?checkout=cancel`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Errore Stripe checkout:", err);
    return NextResponse.json(
      {
        error: "Errore durante la creazione della sessione di pagamento Stripe.",
      },
      { status: 500 }
    );
  }
}
