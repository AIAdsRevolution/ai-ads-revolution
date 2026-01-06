#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== STEP A: Business Events Tracking (AAR) =="

################################################################################
# 1) Event wrapper: src/lib/aarEvents.ts
################################################################################
mkdir -p src/lib
cat > src/lib/aarEvents.ts <<'TS'
import { track } from "@/lib/track";

type Payload = Record<string, any>;

export const AAR_EVENTS = {
  // Auth funnel
  signup_start: (p: Payload = {}) => track("signup_start", p),
  signup_complete: (p: Payload = {}) => track("signup_complete", p),
  login_start: (p: Payload = {}) => track("login_start", p),
  login_success: (p: Payload = {}) => track("login_success", p),

  // Campaigns
  campaign_create_attempt: (p: Payload = {}) => track("campaign_create_attempt", p),
  campaign_created: (p: Payload = {}) => track("campaign_created", p),

  // Budget
  budget_view: (p: Payload = {}) => track("budget_view", p),
  budget_changed: (p: Payload = {}) => track("budget_changed", p),

  // AI Ops
  ai_optimize_request: (p: Payload = {}) => track("ai_optimize_request", p),
  ai_optimization_applied: (p: Payload = {}) => track("ai_optimization_applied", p),

  // Generic
  cta_click: (p: Payload = {}) => track("cta_click", p),
};
TS

################################################################################
# 2) Patch LOGIN page: login_start + login_success
################################################################################
LOGIN="src/app/login/page.tsx"
if [ -f "$LOGIN" ]; then
  cp "$LOGIN" "$LOGIN.bak.stepA.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q 'AAR_EVENTS' "$LOGIN"; then
    perl -0777 -i -pe 's/("use client";\s*\n)/$1import { AAR_EVENTS } from "@\/lib\/aarEvents";\n/s' "$LOGIN"
  fi
  # on mount -> login_start
  if ! grep -q 'AAR_EVENTS\.login_start' "$LOGIN"; then
    perl -0777 -i -pe 's/(useEffect\(\(\)\s*=>\s*{\s*)/$1\n    AAR_EVENTS.login_start();\n/s' "$LOGIN" || true
  fi
  # after successful login response -> login_success (best-effort)
  if ! grep -q 'AAR_EVENTS\.login_success' "$LOGIN"; then
    perl -0777 -i -pe 's/(setSuccess\([^\)]*\);\s*)/$1\n        AAR_EVENTS.login_success();\n/s' "$LOGIN" || true
    perl -0777 -i -pe 's/(router\.push\([^\)]*\);\s*)/$1\n        AAR_EVENTS.login_success();\n/s' "$LOGIN" || true
  fi
  echo "✅ Patched: $LOGIN"
else
  echo "⚠️ Skip: $LOGIN not found"
fi

################################################################################
# 3) Patch REGISTER page: signup_start + signup_complete
################################################################################
REG="src/app/register/page.tsx"
if [ -f "$REG" ]; then
  cp "$REG" "$REG.bak.stepA.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q 'AAR_EVENTS' "$REG"; then
    perl -0777 -i -pe 's/("use client";\s*\n)/$1import { AAR_EVENTS } from "@\/lib\/aarEvents";\n/s' "$REG"
  fi
  # on mount -> signup_start
  if ! grep -q 'AAR_EVENTS\.signup_start' "$REG"; then
    perl -0777 -i -pe 's/(useEffect\(\(\)\s*=>\s*{\s*)/$1\n    AAR_EVENTS.signup_start();\n/s' "$REG" || true
  fi
  # after successful register -> signup_complete (best-effort)
  if ! grep -q 'AAR_EVENTS\.signup_complete' "$REG"; then
    perl -0777 -i -pe 's/(setSuccess\([^\)]*\);\s*)/$1\n        AAR_EVENTS.signup_complete();\n/s' "$REG" || true
    perl -0777 -i -pe 's/(router\.push\([^\)]*\);\s*)/$1\n        AAR_EVENTS.signup_complete();\n/s' "$REG" || true
  fi
  echo "✅ Patched: $REG"
else
  echo "⚠️ Skip: $REG not found"
fi

################################################################################
# 4) Patch Campaign NEW page: campaign_create_attempt + campaign_created
################################################################################
CNEW="src/app/dashboard/campaigns/new/page.tsx"
if [ -f "$CNEW" ]; then
  cp "$CNEW" "$CNEW.bak.stepA.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q 'AAR_EVENTS' "$CNEW"; then
    perl -0777 -i -pe 's/("use client";\s*\n)/$1import { AAR_EVENTS } from "@\/lib\/aarEvents";\n/s' "$CNEW"
  fi
  # attempt right before fetch/create call (best-effort: before first fetch("/api/campaigns"))
  if ! grep -q 'campaign_create_attempt' "$CNEW"; then
    perl -0777 -i -pe 's/(fetch\(\s*["\x27]\/api\/campaigns[^;]*;\s*)/AAR_EVENTS.campaign_create_attempt();\n    $1/s' "$CNEW" || true
  fi
  # created after ok response (best-effort)
  if ! grep -q 'campaign_created' "$CNEW"; then
    perl -0777 -i -pe 's/(if\s*\(\s*res\.ok\s*\)\s*{\s*)/$1\n      AAR_EVENTS.campaign_created();\n/s' "$CNEW" || true
  fi
  echo "✅ Patched: $CNEW"
else
  echo "⚠️ Skip: $CNEW not found"
fi

################################################################################
# 5) Patch Budget page: budget_view + budget_changed
################################################################################
BUD="src/app/dashboard/budget/page.tsx"
if [ -f "$BUD" ]; then
  cp "$BUD" "$BUD.bak.stepA.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q 'AAR_EVENTS' "$BUD"; then
    perl -0777 -i -pe 's/("use client";\s*\n)/$1import { AAR_EVENTS } from "@\/lib\/aarEvents";\n/s' "$BUD"
  fi
  # on mount -> budget_view (best-effort)
  if ! grep -q 'AAR_EVENTS\.budget_view' "$BUD"; then
    perl -0777 -i -pe 's/(useEffect\(\(\)\s*=>\s*{\s*)/$1\n    AAR_EVENTS.budget_view();\n/s' "$BUD" || true
  fi
  # on change handler -> budget_changed (best-effort on first setBudget or onChange)
  if ! grep -q 'AAR_EVENTS\.budget_changed' "$BUD"; then
    perl -0777 -i -pe 's/(setBudget\([^\)]*\);\s*)/$1\n    AAR_EVENTS.budget_changed();\n/s' "$BUD" || true
  fi
  echo "✅ Patched: $BUD"
else
  echo "⚠️ Skip: $BUD not found"
fi

################################################################################
# 6) Patch AI Optimize page: ai_optimize_request + ai_optimization_applied
################################################################################
AIO="src/app/dashboard/ai/page.tsx"
if [ -f "$AIO" ]; then
  cp "$AIO" "$AIO.bak.stepA.$(date +%Y%m%d-%H%M%S)"
  if ! grep -q 'AAR_EVENTS' "$AIO"; then
    perl -0777 -i -pe 's/("use client";\s*\n)/$1import { AAR_EVENTS } from "@\/lib\/aarEvents";\n/s' "$AIO"
  fi
  # request before optimize call (best-effort: before fetch("/api/ai/optimize"))
  if ! grep -q 'ai_optimize_request' "$AIO"; then
    perl -0777 -i -pe 's/(fetch\(\s*["\x27]\/api\/ai\/optimize[^;]*;\s*)/AAR_EVENTS.ai_optimize_request();\n    $1/s' "$AIO" || true
  fi
  # applied when res.ok
  if ! grep -q 'ai_optimization_applied' "$AIO"; then
    perl -0777 -i -pe 's/(if\s*\(\s*res\.ok\s*\)\s*{\s*)/$1\n      AAR_EVENTS.ai_optimization_applied();\n/s' "$AIO" || true
  fi
  echo "✅ Patched: $AIO"
else
  echo "⚠️ Skip: $AIO not found"
fi

echo ""
echo "✅ STEP A completato."
echo "👉 Ora fai: npm run dev"
echo "👉 Poi apri /login /register /dashboard/budget /dashboard/campaigns/new /dashboard/ai"
echo "👉 E controlla in Supabase -> tracking_events"
