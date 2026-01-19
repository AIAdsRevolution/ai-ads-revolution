import { NextResponse } from "next/server";
import { analyzeAttention } from "../../../../../video-engine/core/attention_analyzer";
import { hookScore } from "../../../../../video-engine/core/hook_detector";
import { decideEdits } from "../../../../../video-engine/core/decision_engine";
import { buildFfmpegGuide } from "../../../../../video-engine/editor/ffmpeg_builder";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seconds = Number(body?.seconds ?? 20);

    if (!Number.isFinite(seconds) || seconds < 6 || seconds > 180) {
      return NextResponse.json({ ok: false, error: "seconds must be 6..180" }, { status: 400 });
    }

    const attention = analyzeAttention(seconds);
    const hook = hookScore(attention);
    const plan = decideEdits(attention);
    const ffmpeg = buildFfmpegGuide(body?.input ?? "input.mp4", body?.output ?? "output.mp4", plan);

    return NextResponse.json({
      ok: true,
      analysis: { seconds, hook_score: hook, attention },
      plan,
      ffmpeg
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
