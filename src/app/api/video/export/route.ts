import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = {
      exported_at: new Date().toISOString(),
      ffmpeg: body?.ffmpeg ?? null,
      plan: body?.plan ?? null
    };

    const filename = "aiadsrevolution_ffmpeg_guide.json";
    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
