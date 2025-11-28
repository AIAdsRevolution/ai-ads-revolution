import os
from datetime import date

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")


class MetricsUpdate(BaseModel):
    campaign_id: str
    impressions: int
    clicks: int
    cost: float
    revenue: float


@app.get("/health")
async def health():
    return {"status": "ok", "service": "ai-core", "version": "0.2.0"}


@app.get("/metrics/demo")
async def metrics_demo():
    return {
        "ai_on": True,
        "intent": "alto",
        "ctr": 31.0,
        "cpc": 0.21,
        "roas": 4.7,
        "window_days": 28,
    }


@app.post("/metrics/update")
async def metrics_update(payload: MetricsUpdate):
    """
    Riceve le metriche della campagna e le salva su Supabase
    nella tabella campaign_metrics, poi ritorna i KPI calcolati.
    """
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(
            status_code=500,
            detail="Supabase non è configurato (manca SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY).",
        )

    ctr = (payload.clicks / payload.impressions * 100.0) if payload.impressions > 0 else 0.0
    cpc = (payload.cost / payload.clicks) if payload.clicks > 0 else 0.0
    roas = (payload.revenue / payload.cost) if payload.cost > 0 else 0.0

    supabase_rest_url = f"{SUPABASE_URL}/rest/v1/campaign_metrics"

    row_to_insert = {
        "campaign_id": payload.campaign_id,
        "impressions": payload.impressions,
        "clicks": payload.clicks,
        "cost": payload.cost,
        "revenue": payload.revenue,
        "date": date.today().isoformat(),
    }

    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }

    saved_row = None

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.post(
                supabase_rest_url,
                json=row_to_insert,
                headers=headers,
            )
            if resp.status_code in (200, 201):
                data = resp.json()
                if isinstance(data, list) and data:
                    saved_row = data[0]
                else:
                    saved_row = data
            else:
                print(
                    f"[AI-CORE] Errore Supabase: status={resp.status_code}, body={resp.text}"
                )
                raise HTTPException(
                    status_code=500,
                    detail=f"Errore inserimento Supabase (status {resp.status_code})",
                )
        except HTTPException:
            raise
        except Exception as e:
            print(f"[AI-CORE] Eccezione chiamata Supabase: {e}")
            raise HTTPException(
                status_code=500,
                detail="Errore interno durante la chiamata a Supabase.",
            )

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
