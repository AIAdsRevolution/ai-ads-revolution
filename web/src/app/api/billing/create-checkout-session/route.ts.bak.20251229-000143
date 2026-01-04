import Stripe from "stripe";
import { NextResponse } from "next/server";
import { plans } from "../plans";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("[STRIPE] STRIPE_SECRET_KEY mancante nelle env");
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const planId = body?.planId;

    console.log("[CHECKOUT] Request body:", body);

    if (!planId) {
      console.error("[CHECKOUT] Nessun planId ricevuto");
      return NextResponse.json(
        { error: "Piano non specificato" },
        { status: 400 }
      );
    }

    const plan = (plans as any)[planId];
    if (!plan) {
      console.error("[CHECKOUT] Piano non valido:", planId);
      return NextResponse.json(
        { error: "Piano non valido" },
        { status: 400 }
      );
    }

    if (!stripe) {
      console.error("[CHECKOUT] Stripe non inizializzato (manca STRIPE_SECRET_KEY)");
      return NextResponse.json(
        { error: "Configurazione Stripe mancante" },
        { status: 500 }
      );
    }

    if (!plan.stripe_price_id) {
      console.error("[CHECKOUT] Manca STRIPE_PRICE_ID per il piano:", planId, plan);
      return NextResponse.json(
        { error: "Configurazione prezzo Stripe mancante" },
        { status: 500 }
      );
    }

    const successUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/dashboard?success=1`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/piani`;

    console.log("[CHECKOUT] ENV CHECK:", {
      NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
      STRIPE_PRICE_BASIC: process.env.STRIPE_PRICE_BASIC,
      STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO,
      STRIPE_PRICE_ENTERPRISE: process.env.STRIPE_PRICE_ENTERPRISE,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: plan.stripe_price_id,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    console.log("[CHECKOUT] Session creata:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[CHECKOUT] Errore durante il checkout:", err?.message, err);

    return NextResponse.json(
      {
        error: "Errore durante il checkout",
        detail: err?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
