import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Row = {
  created_at: string;
  vertical: string | null;
  spend_eur: number | null;
  clicks: number | null;
  days_active: number | null;
  add_to_cart: number | null;
  sales: number | null;
  decision: "FERMA" | "MIGLIORA" | "CONTINUA" | string | null;
  confidence: number | null;
  reason: string | null;
};

function Badge({ d }: { d: Row["decision"] }) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold";
  if (d === "CONTINUA") return <span className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`}>CONTINUA</span>;
  if (d === "MIGLIORA") return <span className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-200`}>MIGLIORA</span>;
  if (d === "FERMA") return <span className={`${base} border-rose-500/40 bg-rose-500/10 text-rose-200`}>FERMA</span>;
  return <span className={`${base} border-white/20 bg-white/5 text-white/80`}>{d ?? "-"}</span>;
}

function StatCard({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
      {sub && <div className="mt-1 text-xs text-white/50">{sub}</div>}
    </div>
  );
}

export default async function CEODashboard() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRole);

  const { data, error } = await supabase
    .from("ai_decision_log")
    .select("created_at, vertical, spend_eur, clicks, days_active, add_to_cart, sales, decision, confidence, reason")
    .order("created_at", { ascending: false })
    .limit(200);

  const rows: Row[] = (data as any) || [];

  const last50 = rows.slice(0, 50);
  const count = (d: string) => last50.filter(r => r.decision === d).length;

  const ferma = last50.filter(r => r.decision === "FERMA").slice(0, 5);
  const migliora = last50.filter(r => r.decision === "MIGLIORA").slice(0, 5);
  const continua = last50.filter(r => r.decision === "CONTINUA").slice(0, 5);

  const total = Math.max(1, last50.length);
  const pFerma = Math.round((count("FERMA") / total) * 100);
  const pMigliora = Math.round((count("MIGLIORA") / total) * 100);
  const pContinua = Math.round((count("CONTINUA") / total) * 100);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">CEO Panel</h1>
          <p className="mt-1 text-sm text-white/70">Cosa spegnere / migliorare / continuare oggi (ultimi log).</p>
        </div>
        <div className="text-xs text-white/50">
          Percorso: <span className="font-mono text-white/70">/dashboard/ceo</span>
        </div>
      </div>

      {error && <div className="mt-4 text-rose-300 text-sm">{error.message}</div>}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Ultimi 50 → FERMA" value={`${pFerma}%`} sub={`${count("FERMA")} / ${total}`} />
        <StatCard title="Ultimi 50 → MIGLIORA" value={`${pMigliora}%`} sub={`${count("MIGLIORA")} / ${total}`} />
        <StatCard title="Ultimi 50 → CONTINUA" value={`${pContinua}%`} sub={`${count("CONTINUA")} / ${total}`} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-semibold text-white">Top 5 da FERMARE</h2>
          <p className="mt-1 text-xs text-white/60">Priorità: stop budget / fix funnel / stop sprechi.</p>
          <div className="mt-3 space-y-3">
            {ferma.map((r, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge d={r.decision} />
                  <div className="text-xs text-white/50">{new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-white/70">
                  <span className="font-semibold text-white">{r.vertical ?? "-"}</span>{" "}
                  • €{r.spend_eur ?? "-"} • Click {r.clicks ?? "-"} • Giorni {r.days_active ?? "-"}
                </div>
                <div className="mt-2 text-sm text-white/80">{r.reason ?? "-"}</div>
                <div className="mt-2 text-xs text-white/50">Conf: {r.confidence ?? "-"}</div>
              </div>
            ))}
            {ferma.length === 0 && <div className="text-xs text-white/50">Nessun FERMA negli ultimi 50.</div>}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-semibold text-white">Top 5 da MIGLIORARE</h2>
          <p className="mt-1 text-xs text-white/60">Ottimizza targeting / creatività / offerta.</p>
          <div className="mt-3 space-y-3">
            {migliora.map((r, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge d={r.decision} />
                  <div className="text-xs text-white/50">{new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-white/70">
                  <span className="font-semibold text-white">{r.vertical ?? "-"}</span>{" "}
                  • €{r.spend_eur ?? "-"} • Click {r.clicks ?? "-"} • Giorni {r.days_active ?? "-"}
                </div>
                <div className="mt-2 text-sm text-white/80">{r.reason ?? "-"}</div>
                <div className="mt-2 text-xs text-white/50">Conf: {r.confidence ?? "-"}</div>
              </div>
            ))}
            {migliora.length === 0 && <div className="text-xs text-white/50">Nessun MIGLIORA negli ultimi 50.</div>}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-semibold text-white">Top 5 da CONTINUARE</h2>
          <p className="mt-1 text-xs text-white/60">Segnali buoni: continua senza scalare troppo presto.</p>
          <div className="mt-3 space-y-3">
            {continua.map((r, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge d={r.decision} />
                  <div className="text-xs text-white/50">{new Date(r.created_at).toLocaleString()}</div>
                </div>
                <div className="mt-2 text-xs text-white/70">
                  <span className="font-semibold text-white">{r.vertical ?? "-"}</span>{" "}
                  • €{r.spend_eur ?? "-"} • Click {r.clicks ?? "-"} • Giorni {r.days_active ?? "-"}
                </div>
                <div className="mt-2 text-sm text-white/80">{r.reason ?? "-"}</div>
                <div className="mt-2 text-xs text-white/50">Conf: {r.confidence ?? "-"}</div>
              </div>
            ))}
            {continua.length === 0 && <div className="text-xs text-white/50">Nessun CONTINUA negli ultimi 50.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
