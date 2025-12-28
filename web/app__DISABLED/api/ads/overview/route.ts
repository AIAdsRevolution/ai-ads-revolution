import { NextResponse } from "next/server";

export async function GET() {
  const coreUrl = process.env.AI_CORE_URL;
  const apiKey = process.env.AI_CORE_API_KEY;

  if (!coreUrl) {
    return NextResponse.json({ error: "Missing AI_CORE_URL" }, { status: 500 });
  }

  const r = await fetch(`${coreUrl}/google-ads/overview`, {
    headers: apiKey ? { "x-api-key": apiKey } : {},
    cache: "no-store",
  });

  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}
