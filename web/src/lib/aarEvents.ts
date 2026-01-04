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
