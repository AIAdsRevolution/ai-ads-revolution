import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const basicPriceId = process.env.STRIPE_BASIC_PRICE_ID;

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: "2022-11-15",
    })
  : null;

export async function POST() {
  if (!stripe || !basicPriceId) {
    console.error("Stripe non configurato:", {
      hasSecret: !!stripeSecret,
      hasPrice: !!basicPriceId,
    });

    return NextResponse.json(
      {
        error:
          "Stripe non è configurato correttamente. Contatta il supporto o " +
          "riprova più tardi.",
      },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: basicPriceId,
          quantity: 1,
        },
      ],
      success_url: "https://www.aiadsrevolution.com/?checkout=success",
      cancel_url: "https://www.aiadsrevolution.com/?checkout=cancel",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossibile creare la sessione di pagamento Stripe." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Errore Stripe:", error);
    return NextResponse.json(
      {
        error:
          "Errore durante la creazione della sessione di pagamento Stripe.",
      },
      { status: 500 }
    );
  }
}
