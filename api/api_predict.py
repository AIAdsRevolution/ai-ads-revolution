from fastapi import FastAPI
from pydantic import BaseModel, Field
from typing import Optional, Literal, Dict, Any

from brain_engine import InputSignals, decision_engine
from anti_illusion import check_anti_illusion

app = FastAPI(title="AIAdsRevolution Brain API", version="1.0.0")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://www.aiadsrevolution.com",
        "https://aiadsrevolution.com",
        "https://aiadsrevolution.onrender.com",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Vertical = Literal["LOCALE", "ECOMMERCE", "TICKET_ALTO", "B2B"]

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
    signals = InputSignals(
        vertical=(payload.vertical or "ECOMMERCE"),
        spend_eur=payload.spend_eur,
        clicks=payload.clicks,
        days_active=payload.days_active,
        add_to_cart=payload.add_to_cart,
        sales=payload.sales,
        leads=payload.leads,
        qualified_leads=payload.qualified_leads,
        unqualified_leads=payload.unqualified_leads,
        margin_good=payload.margin_good,
        random_single_sale_after_dry=payload.random_single_sale_after_dry
    )

    out = decision_engine(signals)
    anti = check_anti_illusion(out.tags)

    return {
        "final": {
            "decision": out.decision,
            "reason": out.reason,
            "action": out.action,
            "safety_limit": out.safety_limit,
            "vertical_used": signals.vertical,
            "confidence_rule": out.confidence,
            "tags": out.tags,
            "confidence_ml": 0,
            "fusion_reason": "Rule-only brain (manual training).",
            "anti_illusion": {
                "triggered": anti.triggered,
                "title": anti.title,
                "message": anti.message,
                "tags": anti.tags
            }
        }
    }
