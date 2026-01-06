// src/app/layout.tsx
import "./globals.css";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ads Revolution",
  description: "AI Neural Campaign Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
        {/* ======================= IUBENDA (AUTOBLOCKING) ======================= */}
        <Script
          id="iubenda-autoblocking"
          src="https://cs.iubenda.com/autoblocking/4374914.js"
          strategy="beforeInteractive"
        />
        <Script
          id="iubenda-gpp-stub"
          src="//cdn.iubenda.com/cs/gpp/stub.js"
          strategy="beforeInteractive"
        />
        <Script id="iubenda-config" strategy="beforeInteractive">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = _iub.csConfiguration || {};
          `}
        </Script>
        <Script
          id="iubenda-cs"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="beforeInteractive"
        />
        {/* ===================================================================== */}

        {/* ======================= GOOGLE ADS TAG (AW) ========================= */}
        <Script
          id="google-ads-src"
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17796040640"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            // Consent Mode (SEE/UE): parte bloccato finché non c'è consenso
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });

            gtag('config', 'AW-17796040640');
          `}
        </Script>
        {/* ===================================================================== */}
      </head>

      <body>{children}</body>
    </html>
  );
}

