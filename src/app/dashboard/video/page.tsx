"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea
} from "recharts";

type AnalyzeResp = {
  ok: boolean;
  analysis?: { seconds: number; hook_score: number; attention: number[] };
  plan?: any;
  ffmpeg?: any;
  error?: string;
};

export default function VideoDashboard() {
  const [seconds, setSeconds] = useState(25);
  const [data, setData] = useState<AnalyzeResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [logging, setLogging] = useState(false);
  const [scriptLoading, setScriptLoading] = useState(false);
  const [script, setScript] = useState<any>(null);

  const chartData = useMemo(() => {
    const att = data?.analysis?.attention ?? [];
    return att.map((v, i) => ({ second: i, attention: v }));
  }, [data]);

  async function analyze() {
    setLoading(true);
    setScript(null);
    const res = await fetch("/api/video/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seconds })
    });
    const json: AnalyzeResp = await res.json();
    setData(json);
    setLoading(false);
  }

  async function logToSupabase() {
    if (!data?.ok) return;
    setLogging(true);
    await fetch("/api/video/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "dashboard-video",
        seconds: data.analysis?.seconds,
        attention: data.analysis?.attention,
        plan: data.plan
      })
    });
    setLogging(false);
  }

  async function exportGuide() {
    if (!data?.ok) return;
    const res = await fetch("/api/video/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ffmpeg: data.ffmpeg, plan: data.plan })
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aiadsrevolution_ffmpeg_guide.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function makeScript() {
    setScriptLoading(true);
    const res = await fetch("/api/video/script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: "AI Ads Revolution",
        target: "chi fa advertising e vuole risultati",
        offer: "Prova 3 giorni + demo",
        platform: "YouTube Shorts"
      })
    });
    const json = await res.json();
    setScript(json?.script ?? null);
    setScriptLoading(false);
  }

  const ctaTime = data?.plan?.ctaTime ?? null;
  const hookScore = data?.analysis?.hook_score ?? null;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">🎥 Neural Video Editing</h1>
          <p className="text-sm text-gray-600">
            Timeline neurale (retention proxy) + CTA timing + log Supabase + export FFmpeg.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Secondi</span>
            <input
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              type="number"
              min={6}
              max={180}
              className="w-24 border rounded px-2 py-1"
            />
          </div>

          <button onClick={analyze} className="px-4 py-2 bg-black text-white rounded" disabled={loading}>
            {loading ? "Analisi..." : "Analizza"}
          </button>

          <button onClick={logToSupabase} className="px-4 py-2 border rounded" disabled={!data?.ok || logging}>
            {logging ? "Salvataggio..." : "Log Supabase"}
          </button>

          <button onClick={exportGuide} className="px-4 py-2 border rounded" disabled={!data?.ok}>
            Export FFmpeg
          </button>

          <button onClick={makeScript} className="px-4 py-2 border rounded" disabled={scriptLoading}>
            {scriptLoading ? "Script..." : "Script Video"}
          </button>
        </div>
      </div>

      {!data && (
        <div className="p-6 border rounded bg-white">
          Premi <b>Analizza</b> per generare curva attention, CTA timing e piano di editing.
        </div>
      )}

      {data && !data.ok && (
        <div className="p-4 border rounded bg-red-50 text-red-700">Errore: {data.error}</div>
      )}

      {data?.ok && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Hook score (0–100)</div>
              <div className="text-3xl font-bold">{hookScore}</div>
            </div>
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">CTA time (sec)</div>
              <div className="text-3xl font-bold">{ctaTime}</div>
            </div>
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Cuts suggeriti</div>
              <div className="text-3xl font-bold">{data?.plan?.cuts?.length ?? 0}</div>
            </div>
          </div>

          <div className="h-72 border rounded bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="second" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="attention" strokeWidth={2} />
                <ReferenceArea x1={0} x2={3} strokeOpacity={0.1} />
                {ctaTime !== null && chartData[ctaTime] && (
                  <ReferenceDot x={ctaTime} y={chartData[ctaTime]?.attention} r={6} fill="red" label="CTA" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 border rounded bg-white">
              <h2 className="font-semibold mb-2">🧠 Decisioni Neurali</h2>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-72">
{JSON.stringify(data.plan, null, 2)}
              </pre>
            </div>
            <div className="p-4 border rounded bg-white">
              <h2 className="font-semibold mb-2">🎬 Guida FFmpeg</h2>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-72">
{JSON.stringify(data.ffmpeg, null, 2)}
              </pre>
            </div>
          </div>

          {script && (
            <div className="p-4 border rounded bg-white">
              <h2 className="font-semibold mb-2">📜 Script Video Ads (v1)</h2>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-72">
{JSON.stringify(script, null, 2)}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
