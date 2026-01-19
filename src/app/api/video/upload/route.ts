import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });

    const maxBytes = 200 * 1024 * 1024; // 200MB
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, error: `File too large (${file.size} bytes). Max 200MB.` }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const fname = safeName(`${Date.now()}_${file.name || "upload.mp4"}`);
    const outAbs = path.join(process.cwd(), "public", "uploads", fname);

    await fs.writeFile(outAbs, bytes);

    return NextResponse.json({
      ok: true,
      filename: fname,
      url: `/uploads/${fname}`,
      relpath: `public/uploads/${fname}`
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
