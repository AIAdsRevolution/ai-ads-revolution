from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional, Literal, Any, Dict

app = FastAPI(title="AIAdsRevolution Brain API", version="1.0.0")

Vertical = Literal["LOCALE", "ECOMMERCE", "TICKET_ALTO", "B2B"]
Decision = Literal["CONTINUA", "MIGLIORA", "FERMA"]

class PredictRequest(BaseModel):
    vertical: Optional[Vertical] = "ECOMMERCE"
    spend_eur: float = Field(0.0, ge=0)
    clicks: int = Field(0, ge=0)
    days_active: int = Field(1, ge=1)
    add_to_cart: Optional[int] = Field(None, ge=0)
    sales: Optional[int] = Field(None, ge=0)
    leads: Optional[int] = Field(None, ge=0)
    qualified_leads: Optional[int] = Field(None, ge=0)
    unqualified_leads: Optional[int] = Field(None, ge=0)
    margin_good: Optional[bool] = None
    random_single_sale_after_dry: Optional[bool] = None

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/predict")
def predict(payload: PredictRequest) -> Dict[str, Any]:
    v = (payload.vertical or "ECOMMERCE").upper()
    spend = payload.spend_eur
    clicks = payload.clicks
    days = payload.days_active
    sales = int(payload.sales or 0)
    atc = int(payload.add_to_cart or 0)

    decision: Decision = "MIGLIORA"
    reason = "Scenario da ottimizzare."
    action = "Migliora offerta/targeting e verifica funnel."
    safety_limit = "Non scalare budget finché non hai segnali stabili."

    if v == "ECOMMERCE":
        if sales >= 1 and days <= 2:
            decision = "CONTINUA"
            reason = "Segnale reale (vendita) in fase iniziale."
            action = "Continua e monitora 48h mantenendo budget stabile."
            safety_limit = "Non aumentare budget prima di 2 vendite totali."
        elif clicks >= 200 and atc >= 8 and sales == 0 and days >= 2:
            decision = "FERMA"
            reason = "Add-to-cart alto ma zero vendite: probabile blocco funnel/checkout/fiducia."
            action = "Controlla checkout, pagamenti, spedizioni, trust e pagina prodotto."
            safety_limit = "Non aumentare budget."
        elif sales >= 1 and payload.margin_good is False:
            decision = "FERMA"
            reason = "Vendite con margine negativo: stai aumentando perdite."
            action = "Rivedi prezzo/costi/offerta prima di riattivare."
            safety_limit = "Non aumentare budget."

    anti_trigger = bool(payload.random_single_sale_after_dry)
    anti_title = "Avviso Anti-Illusione" if anti_trigger else None
    anti_msg = "Possibile rumore statistico: non usare 1 vendita come scusa per continuare." if anti_trigger else None
    anti_tags = ["RUMORE_STATISTICO"] if anti_trigger else []

    return {
        "final": {
            "decision": decision,
            "reason": reason,
            "action": action,
            "safety_limit": safety_limit,
            "vertical_used": v,
            "confidence_rule": 75,
            "confidence_ml": 0,
            "fusion_reason": "Rule-only (brain base).",
            "anti_illusion": {
                "triggered": anti_trigger,
                "title": anti_title,
                "message": anti_msg,
                "tags": anti_tags,
            },
        }
    }
