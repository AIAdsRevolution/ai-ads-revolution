export async function POST(req: Request) {
  try {
    const body = await req.json();

    const coreUrl =
      process.env.NEXT_PUBLIC_AI_CORE_URL ??
      "https://aiadsrevolution-ai-core.onrender.com";

    const res = await fetch(coreUrl + "/ai/generate-ad", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: body.product,
        audience: body.audience,
        budget: body.budget,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Errore API /api/generate-ad:", e);
    return new Response(
      JSON.stringify({ ok: false, error: "Errore interno AI" }),
      { status: 500 }
    );
  }
}
