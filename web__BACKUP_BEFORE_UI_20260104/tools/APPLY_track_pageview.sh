#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== Inject page_view tracking su layout client wrapper =="

# Creiamo un piccolo ClientTracker in src/components
mkdir -p src/components
cat > src/components/ClientTracker.tsx <<'TSX'
"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";

export default function ClientTracker() {
  useEffect(() => {
    track("page_view");
  }, []);
  return null;
}
TSX

LAY="src/app/layout.tsx"
cp "$LAY" "$LAY.bak.$(date +%Y%m%d-%H%M%S)"

# importa ClientTracker se manca
if ! grep -q 'ClientTracker' "$LAY"; then
  perl -0777 -i -pe 's/(import[^\n]*\n)/$1import ClientTracker from "@\/components\/ClientTracker";\n/s' "$LAY"
fi

# inserisci <ClientTracker /> dentro body se manca
if ! grep -q "<ClientTracker" "$LAY"; then
  perl -0777 -i -pe 's/(<body[^>]*>)/$1\n  <ClientTracker \/>/s' "$LAY"
fi

echo "✅ page_view tracking attivo"
