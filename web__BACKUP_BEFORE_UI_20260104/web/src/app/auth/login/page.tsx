"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Inserisci email e password per accedere.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data?.message ||
            "Credenziali non valide o account non confermato. Riprova."
        );
        setIsSubmitting(false);
        return;
      }

      // Login OK → redirect a dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setErrorMsg(
        "Si è verificato un errore inatteso. Controlla la connessione e riprova."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      {/* Glow neurale sullo sfondo */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] left-10 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-32 right-10 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo + titolo */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 via-purple-500 to-fuchsia-500 shadow-[0_0_25px_rgba(56,189,248,0.6)]" />
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold tracking-[0.18em] text-slate-100">
              AI
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Accedi al tuo account
          </h1>
          <p className="mt-1 text-xs text-slate-400 text-center max-w-xs">
            Entra nella tua dashboard inserzionista di{" "}
            <span className="text-sky-400 font-semibold">
              AI Ads Revolution
            </span>{" "}
            e continua a lavorare sulle tue campagne AI-first.
          </p>
        </div>

        {/* Card form */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 shadow-[0_18px_60px_rgba(15,23,42,0.9)] p-5 backdrop-blur">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                placeholder="nome@azienda.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                placeholder="La tua password"
              />
            </div>

            {errorMsg && (
              <p className="text-[11px] text-red-400 bg-red-950/40 border border-red-800/60 rounded-lg px-3 py-2">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-sky-800 text-sm font-semibold py-2.5 transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                  Accesso in corso...
                </>
              ) : (
                "Accedi"
              )}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-400 text-center">
            Accedendo confermi di accettare le{" "}
            <Link
              href="/termini"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
            >
              Condizioni d&apos;uso
            </Link>{" "}
            e l&apos;{" "}
            <Link
              href="/privacy"
              className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
            >
              Informativa sulla privacy
            </Link>
            .
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-400 text-center">
          Non hai ancora un account?{" "}
          <Link
            href="/auth/register"
            className="text-sky-400 hover:text-sky-300 font-semibold"
          >
            Registrati
          </Link>
        </p>
      </div>
    </main>
  );
}
