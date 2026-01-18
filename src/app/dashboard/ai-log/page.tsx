import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AILogPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const supabase = createClient(supabaseUrl, serviceRole);

  const { data, error } = await supabase
    .from("ai_decision_log")
    .select("created_at, vertical, spend_eur, clicks, days_active, add_to_cart, sales, decision, confidence, reason")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-2xl font-semibold text-white">AI Decision Log</h1>
      <p className="mt-1 text-sm text-white/70">Ultime 50 analisi salvate.</p>

      {error && <div className="mt-4 text-rose-300 text-sm">{error.message}</div>}

      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-white/80">
          <thead className="text-xs text-white/60">
            <tr className="border-b border-white/10">
              <th className="p-3 text-left">Data</th>
              <th className="p-3 text-left">Vertical</th>
              <th className="p-3 text-left">€</th>
              <th className="p-3 text-left">Click</th>
              <th className="p-3 text-left">Giorni</th>
              <th className="p-3 text-left">ATC</th>
              <th className="p-3 text-left">Vendite</th>
              <th className="p-3 text-left">Decisione</th>
              <th className="p-3 text-left">Conf</th>
              <th className="p-3 text-left">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {(data || []).map((r: any, i: number) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-3">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-3">{r.vertical}</td>
                <td className="p-3">{r.spend_eur ?? "-"}</td>
                <td className="p-3">{r.clicks ?? "-"}</td>
                <td className="p-3">{r.days_active ?? "-"}</td>
                <td className="p-3">{r.add_to_cart ?? "-"}</td>
                <td className="p-3">{r.sales ?? "-"}</td>
                <td className="p-3 font-semibold">{r.decision ?? "-"}</td>
                <td className="p-3">{r.confidence ?? "-"}</td>
                <td className="p-3">{r.reason ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-white/50">
        Percorso: <span className="font-mono text-white/70">/dashboard/ai-log</span>
      </div>
    </div>
  );
}
