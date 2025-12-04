import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

# Inizializza FastAPI
app = FastAPI()

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
