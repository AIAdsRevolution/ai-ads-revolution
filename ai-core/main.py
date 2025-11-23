from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI(
    title="AI Ads Revolution - AI Core",
    version="0.1.0",
    description="Motore neurale di advertising (demo V1).",
)


class CampaignContext(BaseModel):
    daily_budget: float
    vertical: Optional[str] = None
    past_ctr: Optional[float] = None  # es. 0.18 = 18%
    past_roas: Optional[float] = None  # es. 3.2 = 3.2x
    risk_level: Optional[str] = "normal"  # "low", "normal", "aggressive"


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-core", "version": "0.1.0"}


@app.get("/metrics/demo")
def metrics_demo():
    """
    Demo del motore neurale:
    restituisce CTR, CPC, ROAS e stato AI sulla base di logica semplice.
    """
    base_ctr = 0.32
    base_cpc = 0.21
    base_roas = 4.7

    jitter_ctr = base_ctr + random.uniform(-0.02, 0.02)
    jitter_cpc = base_cpc + random.uniform(-0.03, 0.03)
    jitter_roas = base_roas + random.uniform(-0.4, 0.4)

    ctr = max(0.05, min(jitter_ctr, 0.6))
    cpc = max(0.05, min(jitter_cpc, 2.0))
    roas = max(1.0, min(jitter_roas, 10.0))

    if roas >= 5 and ctr >= 0.3:
        intent = "altissimo"
    elif roas >= 4:
        intent = "alto"
    elif roas >= 3:
        intent = "medio"
    else:
        intent = "basso"

    return {
        "ai_on": True,
        "intent": intent,
        "ctr": ctr,
        "cpc": cpc,
        "roas": roas,
        "window_days": 28,
    }


@app.post("/optimize")
def optimize(ctx: CampaignContext):
    """
    Finta ottimizzazione bid + allocazione budget,
    da sostituire più avanti con vera rete neurale.
    """
    score = 1.0

    if ctx.past_ctr and ctx.past_ctr > 0:
        score *= 1.0 + (ctx.past_ctr - 0.15) * 2

    if ctx.past_roas and ctx.past_roas > 0:
        score *= 1.0 + (ctx.past_roas - 3.0) * 0.3

    if ctx.risk_level == "low":
        score *= 0.8
    elif ctx.risk_level == "aggressive":
        score *= 1.2

    score = max(0.4, min(score, 1.8))

    base_bid = 0.25
    recommended_bid = base_bid * score

    daily_budget = ctx.daily_budget
    prospecting_budget = daily_budget * min(0.6, 0.2 * score + 0.3)
    retargeting_budget = daily_budget - prospecting_budget

    return {
        "recommended_bid": round(recommended_bid, 3),
        "prospecting_budget": round(prospecting_budget, 2),
        "retargeting_budget": round(retargeting_budget, 2),
        "score": round(score, 2),
        "notes": [
            "Modello V1 basato su regole.",
            "In futuro sostituibile con rete neurale addestrata.",
        ],
    }

