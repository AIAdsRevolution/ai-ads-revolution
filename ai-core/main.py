import os
from datetime import datetime, date
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
import httpx

app = FastAPI(
    title="AI Ads Revolution – AI Core",
    version="0.1.0",
)


class MetricsUpdateRequest(BaseModel):
    campaign_id: str
    impressions: int
    clicks: int
    cost: float
    revenue: float


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "ai-core",
        "version": "0.1.0",
    }


@app.get("/metrics/demo")
def metrics_demo():
    """
    Endpoint DEMO: genera numeri casuali/di esempio.
    Rimane per compatibilità, ma non usa il database.
    """
    # valori demo fissi per ora
    ctr = 31.0
    cpc = 0.21
    roas = 4.7

    return {
        "ai_on": True,
        "intent": "alto",
        "ctr": ctr,
        "cpc": cpc,
        "roas": roas,
        "window_days": 28,
        "saved_row": None,
    }


@app.post("/metrics/update")
async def metrics_update(payload: MetricsUpdateRequest):
    """
    Endpoint REALE:
    - calcola CTR, CPC, ROAS dai dati inviati
    - prova a salvare una riga su Supabase (tabella campaign_metrics)
    - anche se il salvataggio fallisce, ritorna comunque i valori calcolati
    """
    impressions = payload.impressions
    clicks = payload.clicks
    cost = payload.cost
    revenue = payload.revenue

    ctr = (clicks / impressions * 100.0) if impressions > 0 else 0.0
    cpc = (cost / clicks) if clicks > 0 else 0.0
    roas = (revenue / cost) if cost > 0 else 0.0

    saved_row: Optional[dict] = None

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    # Se le variabili non ci sono, non tentiamo nemmeno il salvataggio
    if supabase_url and supabase_key:
        try:
            # Endpoint REST di Supabase
            rest_url = supabase_url.rstrip("/") + "/rest/v1/campaign_metrics"

            # Corpo dell'insert
            payload_row = {
                "campaign_id": payload.campaign_id,
                "date": date.today().isoformat(),
                "impressions": impressions,
                "clicks": clicks,
                "cost": cost,
                "revenue": revenue,
            }

            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(
                    rest_url,
                    headers={
                        "apikey": supabase_key,
                        "Authorization": f"Bearer {supabase_key}",
                        "Content-Type": "application/json",
                        "Prefer": "return=representation",
                    },
                    json=payload_row,
                )
                resp.raise_for_status()
                data = resp.json()
                if isinstance(data, list) and data:
                    saved_row = data[0]
                else:
                    saved_row = None

        except Exception as e:
            # NON mandiamo più errore 500: logghiamo e basta
            print("Supabase error in /metrics/update:", repr(e))

    return {
        "ai_on": True,
        "intent": "alto",
        "ctr": round(ctr, 1),
        "cpc": round(cpc, 2),
        "roas": round(roas, 1),
        "window_days": 28,
        "saved_row": saved_row,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8001")),
        reload=True,
    )
