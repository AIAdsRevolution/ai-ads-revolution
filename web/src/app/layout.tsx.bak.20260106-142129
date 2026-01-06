import type { Metadata } from "next";
import "./globals.css";
import AARChatWidget from "@/components/AARChatWidget";

export const metadata: Metadata = {
  title: "AI Ads Revolution",
  description: "AI-powered advertising platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>

        {/* IUBENDA Consent + Autoblocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {
                siteId: 4374914,
                cookiePolicyId: 34512888,
                lang: "it",
                storage: { useSiteId: true }
              };
            `,
          }}
        />
        <script src="https://cs.iubenda.com/autoblocking/4374914.js"></script>
        <script src="//cdn.iubenda.com/cs/gpp/stub.js"></script>
        <script
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          async
          charSet="UTF-8"
        ></script>

        {/* Google Ads tag */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17796040640"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17796040640');
            `,
          }}
        />

      </head>

      <body>
        {children}
        <AARChatWidget />
      </body>
    </html>
  );
}

