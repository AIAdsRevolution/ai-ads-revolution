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
  decision: string | null;
  confidence: number | null;
  reason: string | null;
};

function fmt(n: any) {
  return n === null || n === undefined ? "-" : String(n);
}

function badge(decision?: string | null) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold border";
  if (decision === "CONTINUA") return `${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`;
  if (decision === "MIGLIORA") return `${base} border-amber-500/40 bg-amber-500/10 text-amber-200`;
  if (decision === "FERMA") return `${base} border-rose-500/40 bg-rose-500/10 text-rose-200`;
  return `${base} border-white/15 bg-white/5 text-white/80`;
}

function priorityChip(conf?: number | null) {
  const c = Number(conf ?? 0);
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold border";
  if (c >= 90) return `${base} border-rose-400/50 bg-rose-500/15 text-rose-200`;
  if (c >= 85) return `${base} border-amber-400/50 bg-amber-500/15 text-amber-200`;
  return `${base} border-white/10 bg-white/5 text-white/60`;
}

function isPriority(conf?: number | null) {
  return Number(conf ?? 0) >= 85;
}

function rangeToMs(range: string) {
  if (range === "24h") return 24 * 60 * 60 * 1000;
  if (range === "7d") return 7 * 24 * 60 * 60 * 1000;
  if (range === "30d") return 30 * 24 * 60 * 60 * 1000;
  return null; // all
}

export default async function CEOPanel({
  searchParams,
}: {
  searchParams?: { vertical?: string; range?: string };
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, serviceRole);

  const verticalFilter = (searchParams?.vertical || "ALL").toUpperCase();
  const range = (searchParams?.range || "7d").toLowerCase(); // default 7d

  const { data, error } = await supabase
    .from("ai_decision_log")
    .select("created_at, vertical, spend_eur, clicks, days_active, add_to_cart, sales, decision, confidence, reason")
    .order("created_at", { ascending: false })
    .limit(400);

  let rows: Row[] = (data || []) as any;

  // filtro range
  const ms = rangeToMs(range);
  if (ms) {
    const cutoff = Date.now() - ms;
    rows = rows.filter((r) => {
      const t = new Date(r.created_at).getTime();
      return Number.isFinite(t) && t >= cutoff;
    });
  }

  // filtro vertical
  if (verticalFilter !== "ALL") {
    rows = rows.filter((r) => (r.vertical || "").toUpperCase() === verticalFilter);
  }

  const continua = rows
    .filter((r) => r.decision === "CONTINUA")
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 5);

  const migliora = rows
    .filter((r) => r.decision === "MIGLIORA")
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 5);

  const ferma = rows
    .filter((r) => r.decision === "FERMA")
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .slice(0, 5);

  // trend ultimi 7 giorni (sempre 7 giorni, basato sul set filtrato)
  const now = new Date();
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const trend = days.map((day) => {
    const dayRows = rows.filter((r) => (r.created_at || "").slice(0, 10) === day);
    const c = dayRows.filter((r) => r.decision === "CONTINUA").length;
    const m = dayRows.filter((r) => r.decision === "MIGLIORA").length;
    const f = dayRows.filter((r) => r.decision === "FERMA").length;
    return { day, c, m, f, total: dayRows.length };
  });

  const total = rows.length;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">CEO Panel</h1>
          <p className="mt-1 text-sm text-white/70">
            Decisioni operative dalle analisi salvate (filtrate). Priorità assoluta: confidence ≥ 85.
          </p>
          <div className="mt-2 text-xs text-white/60">
            Record nel filtro: <span className="text-white/80 font-semibold">{total}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <form className="flex flex-col gap-3 sm:flex-row sm:items-end" method="GET" action="/dashboard/ceo">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/60">Periodo</label>
              <select
                name="range"
                defaultValue={range}
                className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
              >
                <option value="24h">Ultime 24h</option>
                <option value="7d">Ultimi 7 giorni</option>
                <option value="30d">Ultimi 30 giorni</option>
                <option value="all">Tutto</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-white/60">Vertical</label>
              <select
                name="vertical"
                defaultValue={verticalFilter}
                className="h-10 rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/90 outline-none"
              >
                <option value="ALL">Tutte</option>
                <option value="LOCALE">LOCALE</option>
                <option value="ECOMMERCE">ECOMMERCE</option>
                <option value="TICKET_ALTO">TICKET_ALTO</option>
                <option value="B2B">B2B</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-10 rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15"
            >
              Applica
            </button>
          </form>

          <div className="mt-3 text-[11px] text-white/50">
            Percorso: <span className="font-mono text-white/70">/dashboard/ceo</span>
          </div>
        </div>
      </div>

      {error && <div className="mt-4 text-rose-300 text-sm">{error.message}</div>}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Top 5 da FERMARE oggi" subtitle="Blocca sprechi subito" rows={ferma} />
        <Card title="Top 5 da MIGLIORARE" subtitle="Ottimizza prima di scalare" rows={migliora} />
        <Card title="Top 5 da CONTINUARE" subtitle="Tieni budget stabile" rows={continua} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Trend (ultimi 7 giorni)</h2>
          <div className="text-xs text-white/60">Conteggi per decisione</div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm text-white/80">
            <thead className="text-xs text-white/60">
              <tr className="border-b border-white/10">
                <th className="p-2 text-left">Giorno</th>
                <th className="p-2 text-left">Tot</th>
                <th className="p-2 text-left">CONTINUA</th>
                <th className="p-2 text-left">MIGLIORA</th>
                <th className="p-2 text-left">FERMA</th>
              </tr>
            </thead>
            <tbody>
              {trend.map((t) => (
                <tr key={t.day} className="border-b border-white/5">
                  <td className="p-2">{t.day}</td>
                  <td className="p-2">{t.total}</td>
                  <td className="p-2">{t.c}</td>
                  <td className="p-2">{t.m}</td>
                  <td className="p-2">{t.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-white/50">
          Obiettivo: far scendere FERMA e far crescere CONTINUA con qualità (confidence alta).
        </div>
      </div>
    </div>
  );
}

function Card({ title, subtitle, rows }: { title: string; subtitle: string; rows: Row[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-1 text-xs text-white/60">{subtitle}</p>
        </div>
        <span className="text-xs text-white/50">{rows.length} item</span>
      </div>

      <div className="mt-3 space-y-2">
        {rows.length === 0 && <div className="text-sm text-white/60">Nessun elemento qui (per ora).</div>}

        {rows.map((r, i) => {
          const prio = isPriority(r.confidence);
          return (
            <div
              key={i}
              className={
                "rounded-xl border p-3 " +
                (prio
                  ? "border-amber-400/30 bg-amber-500/10"
                  : "border-white/10 bg-black/20")
              }
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-white/60">
                  {new Date(r.created_at).toLocaleString()} • {r.vertical ?? "-"}
                </div>
                <div className="flex items-center gap-2">
                  <span className={priorityChip(r.confidence)}>{prio ? "PRIORITÀ" : "OK"}</span>
                  <span className={badge(r.decision)}>{r.decision ?? "-"}</span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-white/70">
                <div>€ {fmt(r.spend_eur)}</div>
                <div>Click {fmt(r.clicks)}</div>
                <div>Giorni {fmt(r.days_active)}</div>
                <div>ATC {fmt(r.add_to_cart)}</div>
                <div>Vendite {fmt(r.sales)}</div>
                <div>Conf {fmt(r.confidence)}</div>
              </div>

              <div className="mt-2 text-sm text-white/80">{r.reason ?? "-"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
