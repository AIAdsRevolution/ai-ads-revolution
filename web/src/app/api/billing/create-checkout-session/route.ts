import Stripe from "stripe";
import { NextResponse } from "next/server";
import { plans } from "../plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();

    const plan = plans[planId];
    if (!plan) return NextResponse.json({ error: "Piano non valido" }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/piani`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Errore durante il checkout" }, { status: 500 });
  }
}
