import { NextResponse } from "next/server";

type Body = {
  adGroupId: string;     // es: "193858476227"
  finalUrl: string;      // es: "https://www.aiadsrevolution.com/"
  headlines?: string[];  // max 15
  descriptions?: string[]; // max 4
  path1?: string;
  path2?: string;
};

export async function POST(req: Request) {
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
      { ok: false, error: "Missing Google Ads env vars" },
      { status: 500 }
    );
  }

  const body = (await req.json()) as Body;

  const adGroupId = String(body.adGroupId || "").trim();
  const finalUrl = String(body.finalUrl || "").trim();

  if (!/^\d+$/.test(adGroupId)) {
    return NextResponse.json({ ok: false, error: "Invalid adGroupId" }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(finalUrl)) {
    return NextResponse.json({ ok: false, error: "Invalid finalUrl" }, { status: 400 });
  }

  const defaultHeadlines = [
    "AI Ads Revolution",
    "Crea campagne in pochi minuti",
    "Ottimizza con l’AI",
    "Dashboard professionale",
    "Piani flessibili",
    "Supporto e setup guidato",
    "Migliora le performance",
    "Dati e report chiari",
  ];

  const defaultDescriptions = [
    "Crea e ottimizza campagne con strumenti AI e dashboard moderna. Parti subito.",
    "Automazione, analisi e report: tutto in un’unica piattaforma. Provala ora.",
    "Semplifica la gestione Ads e monitora i risultati in tempo reale.",
    "Setup rapido e strumenti pro per far crescere le tue campagne.",
  ];

  const headlines = (body.headlines?.filter(Boolean).slice(0, 15) ?? defaultHeadlines).slice(0, 15);
  const descriptions = (body.descriptions?.filter(Boolean).slice(0, 4) ?? defaultDescriptions).slice(0, 4);

  const path1 = (body.path1 || "ads").slice(0, 15);
  const path2 = (body.path2 || "ai").slice(0, 15);

  // refresh_token -> access_token
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

  const mutateUrl = `https://googleads.googleapis.com/v22/customers/${CUSTOMER_ID}/adGroupAds:mutate`;

  const payload = {
    operations: [
      {
        create: {
          adGroup: `customers/${CUSTOMER_ID}/adGroups/${adGroupId}`,
          status: "PAUSED", // creiamo in PAUSED per sicurezza, poi lo attivi da UI quando vuoi
          ad: {
            finalUrls: [finalUrl],
            responsiveSearchAd: {
              headlines: headlines.map((t) => ({ text: t })),
              descriptions: descriptions.map((t) => ({ text: t })),
              path1,
              path2,
            },
          },
        },
      },
    ],
  };

  const r = await fetch(mutateUrl, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${accessToken}`,
      "developer-token": String(GOOGLE_ADS_DEVELOPER_TOKEN ?? ""),
      ...(LOGIN_CUSTOMER_ID ? { "login-customer-id": LOGIN_CUSTOMER_ID } : {}),
      "Content-Type": "application/json",
    }) as any,
    body: JSON.stringify(payload),
  });

  const t = await r.text();
  if (!r.ok) {
    return NextResponse.json(
      { ok: false, step: "mutate", status: r.status, body: t },
      { status: 500 }
    );
  }

  let parsed: any = null;
  try { parsed = JSON.parse(t); } catch { parsed = t; }

  return NextResponse.json({
    ok: true,
    customerId: CUSTOMER_ID,
    loginCustomerId: LOGIN_CUSTOMER_ID || null,
    created: parsed,
    note: "Annuncio creato in PAUSED per sicurezza. Attivalo in Google Ads UI quando sei pronto.",
  });
}
