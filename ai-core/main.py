import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

# Client OpenAI - usa OPENAI_API_KEY da Render
client = OpenAI()

app = FastAPI()

class AdRequest(BaseModel):
    product: str
    audience: str
    budget: float

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "ai-core",
        "version": "0.4.0",
    }

@app.post("/ai/generate-ad")
async def generate_ad(req: AdRequest):
    prompt = f"""
Sei il motore neurale di advertising di AI Ads Revolution.
Crea una proposta di campagna pubblicitaria in italiano con:
- Titolo annuncio
- Testo principale
- Call to action
- Suggerimento immagine
- Strategia di budget su {req.budget} €/mese
- Target: {req.audience}
- Prodotto/servizio: {req.product}
Rispondi in JSON compatto con chiavi: titolo, testo, cta, immagine, strategia.
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    text = response.output[0].content[0].text
    return {"ok": True, "result": text}

# Avvio locale (Render userà comunque uvicorn main:app)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8001")),
    )
