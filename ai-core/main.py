import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from app.routes.google_ads import router as google_ads_router

# Inizializza FastAPI
app = FastAPI()
from fastapi import HTTPException
from google.ads.googleads.client import GoogleAdsClient
import os

@app.get("/google/kpi")
def google_kpi(days: int = 28):
    developer_token = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN", "").strip()
    client_id = os.getenv("GOOGLE_ADS_CLIENT_ID", "").strip()
    client_secret = os.getenv("GOOGLE_ADS_CLIENT_SECRET", "").strip()
    refresh_token = os.getenv("GOOGLE_ADS_REFRESH_TOKEN", "").strip()
    customer_id = (os.getenv("GOOGLE_ADS_CUSTOMER_ID", "") or "").replace("-", "").strip()
    login_customer_id = (os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID", "") or "").replace("-", "").strip() or None

    if not refresh_token:
        raise HTTPException(status_code=401, detail="oauth_token")
    if not (developer_token and client_id and client_secret):
        raise HTTPException(status_code=500, detail="missing_google_ads_env")
    if not customer_id:
        raise HTTPException(status_code=400, detail="missing_customer_id")

    cfg = {
        "developer_token": developer_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "login_customer_id": login_customer_id,
        "use_proto_plus": True,
    }

    client = GoogleAdsClient.load_from_dict(cfg)
    ga_service = client.get_service("GoogleAdsService")

    query = f"""
      SELECT
        metrics.clicks,
        metrics.impressions,
        metrics.cost_micros
      FROM customer
      WHERE segments.date DURING LAST_{days}_DAYS
    """

    resp = ga_service.search(customer_id=customer_id, query=query)
    clicks = impressions = cost_micros = 0

    for row in resp:
        m = row.metrics
        clicks += int(m.clicks or 0)
        impressions += int(m.impressions or 0)
        cost_micros += int(m.cost_micros or 0)

    ctr = (clicks / impressions * 100) if impressions else 0.0
    cpc = ((cost_micros / 1_000_000) / clicks) if clicks else 0.0
    spend = cost_micros / 1_000_000

    return {"ok": True, "days": days, "clicks": clicks, "impressions": impressions, "ctr": ctr, "cpc": cpc, "spend": spend}



app.include_router(google_ads_router)
# Client OpenAI - prende la chiave da OPENAI_API_KEY (Render + locale)
client = OpenAI()

class AdRequest(BaseModel):
    product: str
    audience: str
    budget: float

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "ai-core",
        "version": "0.8.0"
    }

@app.post("/ai/generate-ad")
async def generate_ad(req: AdRequest):
    """
    Endpoint neurale: genera una proposta di campagna
    usando GPT-4.1-mini via chat.completions
    """
    system_msg = (
        "Sei il motore neurale di advertising di AI Ads Revolution. "
        "Rispondi sempre in JSON compatto con le chiavi: "
        "titolo, testo, cta, immagine, strategia."
    )

    user_msg = f"""
Crea una proposta di campagna pubblicitaria in italiano con:
- Titolo annuncio (campo: titolo)
- Testo principale (campo: testo)
- Call to action (campo: cta)
- Suggerimento immagine (campo: immagine)
- Strategia di budget (campo: strategia) su {req.budget} €/mese
- Target: {req.audience}
- Prodotto/servizio: {req.product}
Rispondi SOLO con un JSON valido.
"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_msg},
            ],
            temperature=0.7,
        )

        text = completion.choices[0].message.content
        return {
            "ok": True,
            "result": text,
        }
    except Exception as e:
        print("Errore OpenAI:", e)
        return {
            "ok": False,
            "error": str(e),
        }

# Avvio locale (Render usa: uvicorn main:app ...)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8001")),
        reload=True,
    )
