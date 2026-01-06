"use client";

import Link from "next/link";
import GoogleAdsLive from "../settings/GoogleAdsLive";

export default function GoogleAdsPage() {
  return (
    <main className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Google Ads</h1>
          <p className="mt-1 text-sm opacity-70">
            KPI live, campagne e stato connettore.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/settings"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Impostazioni
          </Link>
          <a
            href="/api/googleads/summary"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
          >
            Apri JSON
          </a>
        </div>
      </div>

      <GoogleAdsLive />
    </main>
  );
}
