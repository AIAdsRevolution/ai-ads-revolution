#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

npm install next-intl

# middleware per locale
cat > src/middleware.ts <<'TS'
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["it", "en"],
  defaultLocale: "it"
});

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
TS

# messages
mkdir -p messages
cat > messages/it.json <<'JSON'
{
  "nav": {
    "login": "Accedi",
    "signup": "Registrati"
  },
  "hero": {
    "title": "Crea campagne che migliorano da sole.",
    "subtitle": "Un motore neurale che rialloca budget, ottimizza creatività e bid in tempo reale."
  }
}
JSON

cat > messages/en.json <<'JSON'
{
  "nav": {
    "login": "Login",
    "signup": "Sign up"
  },
  "hero": {
    "title": "Create campaigns that improve by themselves.",
    "subtitle": "A neural engine that reallocates budget, optimizes creatives and bids in real time."
  }
}
JSON

echo "✅ i18n scaffolding pronto (middleware + messages it/en)"
echo "⚠️ Prossimo step: collegare i testi in page.tsx (lo facciamo dopo senza rompere UI)."
