import { NextResponse } from "next/server";

function fetchWithTimeout(url: string, ms = 8000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  return fetch(url, { cache: "no-store", signal: controller.signal }).finally(() => clearTimeout(t));
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    // supporta ?days=7|14|28|90 (solo per coerenza dell’output)
    const daysRaw = Number(url.searchParams.get("days") || "28");
    const days = [7, 14, 28, 90].includes(daysRaw) ? daysRaw : 28;

    // Fonte unica: /api/googleads/metrics (già ok online+local)
    const url = new URL(req.url);

    // ✅ In produzione su Render evita Cloudflare: chiama localhost interno
    const isLocal = url.host.includes("localhost") || url.host.includes("127.0.0.1");
    const port = process.env.PORT || "10000";
    const origin = isLocal ? `${url.protocol}//${url.host}` : `http://127.0.0.1:${port}`;

    let r: Response;
    try {
      r = await fetchWithTimeout(`${origin}/api/googleads/metrics`, 8000);
      if (!r.ok) throw new Error(`metrics_status_${r.status}`);
    } catch (e) {
      // retry breve
      r = await fetchWithTimeout(`${origin}/api/googleads/metrics`, 12000);
    }
    const j: any = await r.json().catch(() => null);

    if (!r.ok || !j?.ok) {
      return NextResponse.json(
        { ok: false, step: "fetch_metrics", status: r.status, upstream: j },
        { status: 200 }
      );
    }

    const campaigns = Array.isArray(j.campaigns) ? j.campaigns : [];

    const totals = campaigns.reduce(
      (acc: any, c: any) => {
        acc.impressions += Number(c.impressions || 0);
        acc.clicks += Number(c.clicks || 0);
        acc.costEUR += Number(c.costEUR || 0);
        acc.conversions += Number(c.conversions || 0);
        acc.convValue += Number(c.convValue || 0);
        return acc;
      },
      { impressions: 0, clicks: 0, costEUR: 0, conversions: 0, convValue: 0 }
    );

    const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
    const cpc = totals.clicks > 0 ? totals.costEUR / totals.clicks : 0;
    const roas = totals.costEUR > 0 ? totals.convValue / totals.costEUR : 0;

    const end = new Date();
    const start = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000);

    const issues: string[] = [];
    const removed = campaigns.filter((c: any) => String(c.status || "").toUpperCase() === "REMOVED");
    if (removed.length > 0) issues.push(`Ci sono ${removed.length} campagne in stato REMOVED (non attive).`);

    return NextResponse.json({
      ok: true,
      source: "metrics",
      apiVersion: j.apiVersion || "v22",
      customerId: j.customerId,
      loginCustomerId: j.loginCustomerId,
      range: { days, start: isoDate(start), end: isoDate(end) },
      totals: {
        impressions: totals.impressions,
        clicks: totals.clicks,
        costEUR: Number(totals.costEUR.toFixed(6)),
        ctr,
        cpc,
        conversions: totals.conversions,
        convValue: totals.convValue,
        roas,
      },
      campaignsCount: campaigns.length,
      campaigns,
      diagnostics: { issues },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, step: "exception", error: e?.message ?? String(e) }, { status: 200 });
  }
}
