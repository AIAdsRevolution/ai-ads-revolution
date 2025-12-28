import { NextResponse } from "next/server";

function ymd(d: Date) {
  const z = new Date(d);
  const yyyy = z.getFullYear();
  const mm = String(z.getMonth() + 1).padStart(2, "0");
  const dd = String(z.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export async function GET(req: Request) {
  const {
    GOOGLE_ADS_CLIENT_ID,
    GOOGLE_ADS_CLIENT_SECRET,
    GOOGLE_ADS_DEVELOPER_TOKEN,
    GOOGLE_ADS_CUSTOMER_ID,
    GOOGLE_ADS_REFRESH_TOKEN,
    GOOGLE_ADS_LOGIN_CUSTOMER_ID,
  } = process.env;

  if (
    !GOOGLE_ADS_CLIENT_ID ||
    !GOOGLE_ADS_CLIENT_SECRET ||
    !GOOGLE_ADS_DEVELOPER_TOKEN ||
    !GOOGLE_ADS_CUSTOMER_ID ||
    !GOOGLE_ADS_REFRESH_TOKEN
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing Google Ads env vars",
        missing: {
          GOOGLE_ADS_CLIENT_ID: !GOOGLE_ADS_CLIENT_ID,
          GOOGLE_ADS_CLIENT_SECRET: !GOOGLE_ADS_CLIENT_SECRET,
          GOOGLE_ADS_DEVELOPER_TOKEN: !GOOGLE_ADS_DEVELOPER_TOKEN,
          GOOGLE_ADS_CUSTOMER_ID: !GOOGLE_ADS_CUSTOMER_ID,
          GOOGLE_ADS_REFRESH_TOKEN: !GOOGLE_ADS_REFRESH_TOKEN,
          GOOGLE_ADS_LOGIN_CUSTOMER_ID: !GOOGLE_ADS_LOGIN_CUSTOMER_ID,
        },
      },
      { status: 500 }
    );
  }

  // range: default 28 giorni, supporta ?days=7|14|28|90
  const url = new URL(req.url);
  const daysRaw = Number(url.searchParams.get("days") || "28");
  const days = [7, 14, 28, 90].includes(daysRaw) ? daysRaw : 28;
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));

  // 1) refresh_token -> access_token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_ADS_CLIENT_ID,
      client_secret: GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });

  const tokenJson: any = await tokenRes.json();
  if (!tokenRes.ok) {
    return NextResponse.json(
      { ok: false, step: "oauth_token", tokenJson },
      { status: 500 }
    );
  }
  const accessToken = tokenJson.access_token as string;

  const CUSTOMER_ID = String(GOOGLE_ADS_CUSTOMER_ID).replace(/-/g, "");
  const LOGIN_CUSTOMER_ID = (GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/-/g, "");

  const apiUrl = `https://googleads.googleapis.com/v22/customers/${CUSTOMER_ID}/googleAds:searchStream`;

  async function gaql(query: string) {
    const r = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": GOOGLE_ADS_DEVELOPER_TOKEN,
        ...(LOGIN_CUSTOMER_ID ? { "login-customer-id": LOGIN_CUSTOMER_ID } : {}),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const t = await r.text();
    if (!r.ok) {
      return { ok: false as const, status: r.status, body: t };
    }
    let parsed: any = null;
    try {
      parsed = JSON.parse(t);
    } catch {
      parsed = t;
    }
    const rows =
      Array.isArray(parsed)
        ? parsed.flatMap((chunk: any) => chunk.results ?? [])
        : [];
    return { ok: true as const, rows };
  }

  const startYMD = ymd(start);
  const endYMD = ymd(end);

  // Totali + per-campagna (last N days)
  const qSummary = `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date BETWEEN '${startYMD}' AND '${endYMD}'
    ORDER BY metrics.impressions DESC
    LIMIT 50
  `;

  const res = await gaql(qSummary);
  if (!res.ok) {
    return NextResponse.json(
      { ok: false, step: "googleads_api", status: res.status, body: res.body },
      { status: 500 }
    );
  }

  const campaigns = res.rows.map((r: any) => {
    const imp = Number(r.metrics?.impressions ?? 0);
    const clk = Number(r.metrics?.clicks ?? 0);
    const costEUR = Number(r.metrics?.costMicros ?? 0) / 1_000_000;
    const conv = Number(r.metrics?.conversions ?? 0);
    const convValue = Number(r.metrics?.conversionsValue ?? 0);

    const ctr = imp > 0 ? (clk / imp) * 100 : 0;
    const cpc = clk > 0 ? costEUR / clk : 0;
    const roas = costEUR > 0 ? convValue / costEUR : 0;

    return {
      id: r.campaign?.id,
      name: r.campaign?.name,
      status: r.campaign?.status,
      impressions: imp,
      clicks: clk,
      costEUR,
      ctr,
      cpc,
      conversions: conv,
      convValue,
      roas,
    };
  });

  const totals = campaigns.reduce(
    (a: any, c: any) => {
      a.impressions += c.impressions;
      a.clicks += c.clicks;
      a.costEUR += c.costEUR;
      a.conversions += c.conversions;
      a.convValue += c.convValue;
      return a;
    },
    { impressions: 0, clicks: 0, costEUR: 0, conversions: 0, convValue: 0 }
  );

  totals.ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  totals.cpc = totals.clicks > 0 ? totals.costEUR / totals.clicks : 0;
  totals.roas = totals.costEUR > 0 ? totals.convValue / totals.costEUR : 0;

  // Diagnostica: quante ads/adgroups esistono (se 0 -> “campagna non eroga”)
  const qCounts = `
    SELECT
      (SELECT COUNT(*) FROM ad_group_ad) AS ads_count,
      (SELECT COUNT(*) FROM ad_group) AS adgroups_count
    FROM customer
    LIMIT 1
  `;
  const res2 = await gaql(qCounts);
  let diagnostics: any = { adsCount: null, adGroupsCount: null, issues: [] as string[] };

  if (res2.ok && res2.rows?.[0]) {
    const adsCount = Number(res2.rows[0].adsCount ?? 0);
    const adGroupsCount = Number(res2.rows[0].adgroupsCount ?? 0);
    diagnostics.adsCount = adsCount;
    diagnostics.adGroupsCount = adGroupsCount;

    if (adGroupsCount === 0) diagnostics.issues.push("Nessun gruppo di annunci: crea almeno 1 Ad Group.");
    if (adsCount === 0) diagnostics.issues.push("Nessun annuncio: la campagna non può erogare finché non crei almeno 1 annuncio.");
  } else {
    diagnostics.issues.push("Diagnostica non disponibile (permessi/GAQL).");
  }

  return NextResponse.json({
    ok: true,
    apiVersion: "v22",
    customerId: CUSTOMER_ID,
    loginCustomerId: LOGIN_CUSTOMER_ID || null,
    range: { days, start: startYMD, end: endYMD },
    totals,
    campaignsCount: campaigns.length,
    campaigns,
    diagnostics,
  });
}
