import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import fsp from "node:fs/promises";

import { analyzeAttention } from "../../../../../video-engine/core/attention_analyzer";
import { decideEdits } from "../../../../../video-engine/core/decision_engine";
import { supabaseServer, publicObjectUrl } from "@/lib/supabase_server";

const execFileAsync = promisify(execFile);

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function writeTmp(filePath: string, data: ArrayBuffer) {
  const buf = Buffer.from(data);
  await fsp.writeFile(filePath, buf);
  return buf.length;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seconds = Number(body?.seconds ?? 25);

    // input from Supabase
    const inBucket = String(body?.bucket ?? "video-uploads");
    const inKey = String(body?.key ?? "");

    if (!inKey) {
      return NextResponse.json({ ok: false, error: "Missing key (Supabase object path)" }, { status: 400 });
    }
    if (!Number.isFinite(seconds) || seconds < 6 || seconds > 180) {
      return NextResponse.json({ ok: false, error: "seconds must be 6..180" }, { status: 400 });
    }

    const sb = supabaseServer();

    // download input to /tmp
    const { data: blob, error: dlErr } = await sb.storage.from(inBucket).download(inKey);
    if (dlErr || !blob) return NextResponse.json({ ok: false, error: dlErr?.message ?? "Download failed" }, { status: 500 });

    const tmpIn = path.join("/tmp", `in_${Date.now()}_${safeName(path.basename(inKey))}`);
    const tmpOut = path.join("/tmp", `out_${Date.now()}.mp4`);

    const ab = await blob.arrayBuffer();
    const bytes = await writeTmp(tmpIn, ab);
    if (bytes < 1024 * 512) {
      return NextResponse.json({ ok: false, error: `Input too small (${bytes} bytes)` }, { status: 400 });
    }

    // neural plan
    const attention = analyzeAttention(seconds);
    const plan = decideEdits(attention);

    const cutAt = Array.isArray(plan.cuts) && plan.cuts.length ? Number(plan.cuts[0]) : null;
    const speedStart = Math.max(0, seconds - 3);
    const endTime = cutAt !== null ? Math.min(cutAt, seconds) : seconds;
    const doSpeed = endTime > speedStart && (plan.speedUps?.length || plan.dropPoints?.length);

    // ffmpeg run
    if (doSpeed) {
      const filter = [
        `[0:v]trim=0:${speedStart},setpts=PTS-STARTPTS[v0]`,
        `[0:a]atrim=0:${speedStart},asetpts=PTS-STARTPTS[a0]`,
        `[0:v]trim=${speedStart}:${endTime},setpts=(PTS-STARTPTS)/1.25[v1]`,
        `[0:a]atrim=${speedStart}:${endTime},asetpts=PTS-STARTPTS,atempo=1.25[a1]`,
        `[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]`
      ].join(";");

      await execFileAsync("ffmpeg", [
        "-y",
        "-i", tmpIn,
        "-filter_complex", filter,
        "-map", "[v]",
        "-map", "[a]",
        "-movflags", "+faststart",
        tmpOut
      ]);
    } else {
      await execFileAsync("ffmpeg", [
        "-y",
        "-i", tmpIn,
        "-t", String(endTime),
        "-movflags", "+faststart",
        tmpOut
      ]);
    }

    // upload output to Supabase
    const outBucket = "video-renders";
    const outKey = `r/${Date.now()}_${safeName(path.basename(inKey).replace(/\.[^.]+$/, ""))}.mp4`;

    const outBuf = await fsp.readFile(tmpOut);
    const { error: upErr } = await sb.storage.from(outBucket).upload(outKey, outBuf, {
      contentType: "video/mp4",
      upsert: true
    });
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message }, { status: 500 });

    // cleanup tmp
    try { fs.unlinkSync(tmpIn); } catch {}
    try { fs.unlinkSync(tmpOut); } catch {}

    return NextResponse.json({
      ok: true,
      input: { bucket: inBucket, key: inKey, url: publicObjectUrl(inBucket, inKey) },
      output: { bucket: outBucket, key: outKey, url: publicObjectUrl(outBucket, outKey) },
      seconds,
      plan,
      applied: { cutAt, speedUpLastSeconds: doSpeed ? 3 : 0 }
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
