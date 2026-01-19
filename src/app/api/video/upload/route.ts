import { NextResponse } from "next/server";
import { supabaseServer, publicObjectUrl } from "@/lib/supabase_server";

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });

    const maxBytes = 200 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, error: `File too large (${file.size} bytes). Max 200MB.` }, { status: 400 });
    }

    const bucket = "video-uploads";
    const ext = (file.name?.split(".").pop() || "mp4").toLowerCase();
    const key = `u/${Date.now()}_${safeName(file.name || "upload.mp4")}`.replace(/\.+/g, ".");

    const buf = Buffer.from(await file.arrayBuffer());
    const sb = supabaseServer();

    const { error } = await sb.storage.from(bucket).upload(key, buf, {
      contentType: file.type || `video/${ext}`,
      upsert: true
    });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({
      ok: true,
      bucket,
      key,
      url: publicObjectUrl(bucket, key)
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}
