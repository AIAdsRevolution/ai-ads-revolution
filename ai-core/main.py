import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

# Inizializza FastAPI
app = FastAPI()

# Client OpenAI: legge la tua chiave da OPENAI_API_KEY
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Modello dati per la richiesta
class AdRequest(BaseModel):
    product: str
    audience: str
    budget: float

# Health check
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "ai-core",
        "version": "0.6.0",
    }

# Endpoint AI: genera campagna
@app.post("/ai/generate-ad")
async def generate_ad(req: AdRequest):
    prompt = f"""
Sei il motore neurale di advertising di AI Ads Revolution.
Crea una proposta di campagna pubblicitaria in italiano con:
- Titolo annuncio (campo: titolo)
- Testo principale (campo: testo)
- Call to action (campo: cta)
- Suggerimento immagine (campo: immagine)
- Strategia di budget (campo: strategia) su {req.budget} €/mese
- Target: {req.audience}
- Prodotto/servizio: {req.product}
Rispondi SOLO in JSON compatto con chiavi: titolo, testo, cta, immagine, strategia.
"""

    try:
        completion = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Sei il motore neurale di advertising di AI Ads Revolution. "
                        "Rispondi SEMPRE e SOLO in JSON valido."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            response_format={"type": "json_object"},
        )

        text = completion.choices[0].message.content
        return {
            "ok": True,
            "result": text,
        }
    except Exception as e:
        # Log di errore lato server
        print("Errore OpenAI:", e)
        return {
            "ok": False,
            "error": str(e),
        }

# Avvio locale (Render userà comunque: uvicorn main:app)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8001")),
        reload=True,
    )
