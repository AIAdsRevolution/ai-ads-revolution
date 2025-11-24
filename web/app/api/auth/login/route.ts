import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase URL o ANON KEY mancanti nelle env");
      return NextResponse.json(
        { error: "Configurazione Supabase non valida lato server." },
        { status: 500 }
      );
    }

    const headers: Record<string, string> = {
      apikey: supabaseAnonKey,
      "Content-Type": "application/json",
    };

    const response = await fetch(
      `${supabaseUrl}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const message =
        (data && (data.error_description || data.error)) ||
        "Login con Supabase fallito";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    // Qui puoi restituire i dati che vuoi usare nella dashboard
    return NextResponse.json(
      {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore nella route /api/auth/login:", error);
    return NextResponse.json(
      { error: "Errore inatteso durante il login." },
      { status: 500 }
    );
  }
}
