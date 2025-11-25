import os
import random
from datetime import date
from typing import Optional

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AI Ads Revolution - AI Core", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in futuro puoi restringere al dominio del sito
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MetricsUpdate(BaseModel):
    campaign_id: str
    impressions: int
    clicks: int
    cost: float
    revenue: float
    date: Optional[date] = None


def get_supabase_config():
    url = os.getenv("SUPABASE_URL")
    service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not url or not service_key:
        raise RuntimeError("SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY mancanti nelle variabili ambiente")

    url = url.rstrip("/")
    return url, service_key


@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-core", "version": "0.1.0"}


@app.get("/metrics/demo")
def metrics_demo():
    ctr = round(random.uniform(0.28, 0.35), 4)
    cpc = round(random.uniform(0.17, 0.24), 2)
    roas = round(random.uniform(4.2, 5.2), 1)

    return {
        "ai_on": True,
        "intent": "alto",
        "ctr": ctr,
        "cpc": cpc,
        "roas": roas,
        "window_days": 28,
    }


@app.post("/metrics/update")
async def metrics_update(payload: MetricsUpdate):
    supabase_url, service_key = get_supabase_config()

    rest_url = f"{supabase_url}/rest/v1/campaign_metrics"

    metric_date = payload.date or date.today()

    supabase_row = {
        "campaign_id": payload.campaign_id,
        "date": metric_date.isoformat(),
        "impressions": payload.impressions,
        "clicks": payload.clicks,
        "cost": payload.cost,
        "revenue": payload.revenue,
    }

    headers = {
        "apikey": service_key,
        "Authorization": f"Bearer {service_key}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    async with httpx.AsyncClient(timeout=5.0) as client:
        try:
            resp = await client.post(rest_url, headers=headers, json=supabase_row)
        except httpx.RequestError as e:
            raise HTTPException(status_code=502, detail=f"Errore di rete verso Supabase: {str(e)}")

    if resp.status_code >= 400:
        raise HTTPException(
            status_code=resp.status_code,
            detail={"error": "Supabase error", "body": resp.text},
        )

    try:
        data = resp.json()
        row = data[0] if isinstance(data, list) and data else data
    except Exception:
        row = supabase_row

    impressions = payload.impressions
    clicks = payload.clicks
    cost = payload.cost
    revenue = payload.revenue

    ctr = (clicks / impressions) if impressions > 0 else 0.0
    cpc = (cost / clicks) if clicks > 0 else 0.0
    roas = (revenue / cost) if cost > 0 else 0.0

    return {
        "ai_on": True,
        "intent": "alto",
        "ctr": round(ctr * 100, 1),
        "cpc": round(cpc, 2),
        "roas": round(roas, 1),
        "window_days": 28,
        "saved_row": row,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8001")), reload=True)
