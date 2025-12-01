import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

# Client OpenAI che usa la variabile di ambiente OPENAI_API_KEY (quella che hai messo su Render)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AdRequest(BaseModel):
    product: str
    audience: str
    budget: float

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai-core", "version": "0.4.0"}

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
Rispondi in formato JSON.
"""

    # Chiamata a GPT-4.1-mini tramite API "responses"
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    text = response.output[0].content[0].text
    return {"ok": True, "result": text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8001")),
    )
