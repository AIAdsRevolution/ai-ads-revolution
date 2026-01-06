import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e password sono obbligatorie." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Configurazione Supabase mancante." },
        { status: 500 }
      );
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://aiadsrevolution.com";

    const res = await fetch(`${supabaseUrl}/auth/v1/signup`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        email_redirect_to: `${origin}/auth/login`,
        data: {
          created_with: "aiads-platform",
        },
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const msg =
        (data && (data.message || data.error_description || data.error)) ||
        "Errore durante la registrazione.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Registrazione inviata. Controlla l’email e clicca sul link per confermare l'account.",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Errore imprevisto." },
      { status: 500 }
    );
  }
}
