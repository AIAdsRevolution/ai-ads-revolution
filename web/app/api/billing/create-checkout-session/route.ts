import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_BASIC;

    if (!secretKey || !priceId) {
      return NextResponse.json(
        {
          error:
            "Stripe non è ancora configurato. Aggiungi STRIPE_SECRET_KEY e STRIPE_PRICE_BASIC in .env.local.",
        },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const body = await req.json().catch(() => ({}));
    const { successUrl, cancelUrl } = body ?? {};

    const form = new URLSearchParams();
    form.append("mode", "subscription");
    form.append("payment_method_types[]", "card");
    form.append("line_items[0][price]", priceId);
    form.append("line_items[0][quantity]", "1");
    form.append("success_url", successUrl || `${origin}/dashboard`);
    form.append("cancel_url", cancelUrl || `${origin}?canceled=1`);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Stripe error:", errorText);
      return NextResponse.json(
        { error: "Errore durante la creazione della sessione di pagamento." },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Errore interno durante la creazione della sessione." },
      { status: 500 }
    );
  }
}
