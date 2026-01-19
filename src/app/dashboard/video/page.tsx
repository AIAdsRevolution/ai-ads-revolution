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

type UploadResp = { ok: boolean; bucket?: string; key?: string; url?: string; error?: string };
type RenderResp = {
  ok: boolean;
  input?: { bucket: string; key: string; url: string };
  output?: { bucket: string; key: string; url: string };
  plan?: any;
  applied?: any;
  error?: string;
};

export default function VideoDashboard() {
  const [seconds, setSeconds] = useState(25);
  const [data, setData] = useState<AnalyzeResp | null>(null);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState<{ bucket: string; key: string; url: string } | null>(null);

  const [rendering, setRendering] = useState(false);
  const [rendered, setRendered] = useState<{ bucket: string; key: string; url: string } | null>(null);

  const chartData = useMemo(() => {
    const att = data?.analysis?.attention ?? [];
    return att.map((v, i) => ({ second: i, attention: v }));
  }, [data]);

  async function analyze() {
    setLoading(true);
    const res = await fetch("/api/video/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seconds })
    });
    const json: AnalyzeResp = await res.json();
    setData(json);
    setLoading(false);
  }

  async function uploadVideo() {
    if (!file) return;
    setUploading(true);
    setRendered(null);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/video/upload", { method: "POST", body: form });
    const json: UploadResp = await res.json();

    if (json.ok && json.bucket && json.key && json.url) {
      setUploaded({ bucket: json.bucket, key: json.key, url: json.url });
      alert("Upload OK (Supabase)");
    } else {
      alert(json.error ?? "Upload failed");
    }
    setUploading(false);
  }

  async function renderVideo() {
    if (!uploaded) return alert("Carica prima un video.");
    setRendering(true);

    const res = await fetch("/api/video/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seconds, bucket: uploaded.bucket, key: uploaded.key })
    });
    const json: RenderResp = await res.json();

    if (json.ok && json.output?.url) {
      setRendered({ bucket: json.output.bucket, key: json.output.key, url: json.output.url });
      alert("Render OK (Supabase)");
    } else {
      alert(json.error ?? "Render failed");
    }
    setRendering(false);
  }

  const ctaTime = data?.plan?.ctaTime ?? null;
  const hookScore = data?.analysis?.hook_score ?? null;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Neural Video Editing</h1>
          <p className="text-sm text-gray-600">
            Upload su Supabase Storage -> Render FFmpeg su server -> Output su Supabase Storage (stabile su Render).
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
        </div>
      </div>

      <div className="p-4 border rounded bg-white space-y-3">
        <div className="font-semibold">Upload video (Supabase)</div>
        <div className="flex items-center gap-3 flex-wrap">
          <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <button onClick={uploadVideo} className="px-4 py-2 border rounded" disabled={!file || uploading}>
            {uploading ? "Upload..." : "Carica"}
          </button>
          <button onClick={renderVideo} className="px-4 py-2 bg-black text-white rounded" disabled={!uploaded || rendering}>
            {rendering ? "Rendering..." : "Render (FFmpeg)"}
          </button>
        </div>

        {uploaded?.url && (
          <div className="text-sm">
            Uploaded: <a className="underline" href={uploaded.url} target="_blank" rel="noreferrer">{uploaded.url}</a>
          </div>
        )}
        {rendered?.url && (
          <div className="text-sm">
            Output: <a className="underline" href={rendered.url} target="_blank" rel="noreferrer">{rendered.url}</a>
          </div>
        )}
      </div>

      {data?.ok && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Hook score</div>
              <div className="text-3xl font-bold">{hookScore}</div>
            </div>
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">CTA time</div>
              <div className="text-3xl font-bold">{ctaTime}</div>
            </div>
            <div className="p-4 border rounded bg-white">
              <div className="text-sm text-gray-500">Cuts</div>
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
              <h2 className="font-semibold mb-2">Decisioni</h2>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-72">
{JSON.stringify(data.plan, null, 2)}
              </pre>
            </div>
            <div className="p-4 border rounded bg-white">
              <h2 className="font-semibold mb-2">FFmpeg guide</h2>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-72">
{JSON.stringify(data.ffmpeg, null, 2)}
              </pre>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
