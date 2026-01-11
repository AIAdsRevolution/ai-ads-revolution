#!/bin/zsh
set -e

echo "👉 Spostamento nella cartella web..."
cd "$(dirname "$0")/web"

echo "👉 Rimozione apiVersion dai file Stripe..."
sed -i '' '/apiVersion:/d' app/api/stripe/checkout/route.ts
sed -i '' '/apiVersion:/d' app/api/billing/basic-price/route.ts

echo "👉 Controllo veloce che le righe siano sparite:"
grep -n 'apiVersion' app/api/stripe/checkout/route.ts || echo "✅ Nessuna apiVersion in checkout"
grep -n 'apiVersion' app/api/billing/basic-price/route.ts || echo "✅ Nessuna apiVersion in basic-price"

echo "👉 Build di test in locale..."
pnpm install
pnpm build

echo "✅ Fix completato. Ora fai commit + push e ridistribuisci su Render."
