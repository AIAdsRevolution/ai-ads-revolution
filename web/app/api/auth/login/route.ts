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

    const res = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg =
        data?.error_description ||
        data?.error ||
        "Credenziali non valide.";

      if (
        errorMsg.toLowerCase().includes("confirm") ||
        errorMsg.toLowerCase().includes("email")
      ) {
        return NextResponse.json(
          {
            error:
              "Email non confermata. Controlla la posta e clicca sul link di attivazione.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json({ error: errorMsg }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Login effettuato.",
        session: data,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Errore inatteso." },
      { status: 500 }
    );
  }
}
