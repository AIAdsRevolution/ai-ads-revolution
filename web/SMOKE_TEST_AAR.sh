#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "== 0) Node / NPM =="
node -v
npm -v

echo "== 1) Lint =="
npm run lint || true

echo "== 2) Build (verifica che NON rompiamo produzione) =="
npm run build

echo "== 3) Start in prod mode e ping pagine chiave =="
PIDS="$(lsof -ti :3000 2>/dev/null || true)"; [ -n "$PIDS" ] && kill -9 $PIDS || true
npm run start -- -p 3000 &
sleep 2

echo "== 4) Curl pages =="
for p in "/" "/pricing" "/status" "/dashboard" "/dashboard/campaigns" "/dashboard/settings"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$p" || true)
  echo "$p -> $code"
done

echo "== OK: smoke test done. Apri browser su http://localhost:3000 =="
