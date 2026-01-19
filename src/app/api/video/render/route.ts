import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

import { analyzeAttention } from "../../../../../video-engine/core/attention_analyzer";
import { decideEdits } from "../../../../../video-engine/core/decision_engine";

const execFileAsync = promisify(execFile);

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seconds = Number(body?.seconds ?? 25);
    const inputRel = String(body?.input ?? "input.mp4");

    if (!Number.isFinite(seconds) || seconds < 6 || seconds > 180) {
      return NextResponse.json({ ok: false, error: "seconds must be 6..180" }, { status: 400 });
    }

    const inputAbs = path.join(process.cwd(), inputRel);
    if (!fs.existsSync(inputAbs)) {
      return NextResponse.json({ ok: false, error: `Input not found: ${inputRel}` }, { status: 404 });
    }

    const attention = analyzeAttention(seconds);
    const plan = decideEdits(attention);

    const cutAt = Array.isArray(plan.cuts) && plan.cuts.length ? Number(plan.cuts[0]) : null;

    const outName = safeName(`render_${Date.now()}.mp4`);
    const outAbs = path.join(process.cwd(), "public", "renders", outName);

    const speedStart = Math.max(0, seconds - 3);
    const endTime = cutAt !== null ? Math.min(cutAt, seconds) : seconds;

    const doSpeed = endTime > speedStart && (plan.speedUps?.length || plan.dropPoints?.length);

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
        "-i", inputAbs,
        "-filter_complex", filter,
        "-map", "[v]",
        "-map", "[a]",
        "-movflags", "+faststart",
        outAbs
      ]);
    } else {
      await execFileAsync("ffmpeg", [
        "-y",
        "-i", inputAbs,
        "-t", String(endTime),
        "-movflags", "+faststart",
        outAbs
      ]);
    }

    return NextResponse.json({
      ok: true,
      input: inputRel,
      output_url: `/renders/${outName}`,
      seconds,
      plan,
      applied: { cutAt, speedUpLastSeconds: doSpeed ? 3 : 0 }
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
