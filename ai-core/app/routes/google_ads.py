import os
from fastapi import APIRouter, Header, HTTPException
from google.ads.googleads.client import GoogleAdsClient

router = APIRouter(prefix="/google-ads", tags=["google-ads"])

def _require_key(x_api_key: str | None):
    expected = os.getenv("AI_CORE_API_KEY")
    if expected and x_api_key != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")

def _client() -> GoogleAdsClient:
    cfg = {
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
        "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
        "use_proto_plus": True,
    }
    login_cust = os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID")
    if login_cust:
        cfg["login_customer_id"] = login_cust
    return GoogleAdsClient.load_from_dict(cfg)

@router.get("/overview")
def overview(x_api_key: str | None = Header(default=None)):
    _require_key(x_api_key)

    customer_id = (os.getenv("GOOGLE_ADS_CUSTOMER_ID") or "").replace("-", "").strip()
    if not customer_id:
        raise HTTPException(status_code=500, detail="Missing GOOGLE_ADS_CUSTOMER_ID")

    ga = _client().get_service("GoogleAdsService")
    query = """
      SELECT metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.average_cpc
      FROM customer
      WHERE segments.date DURING TODAY
    """
    try:
        resp = ga.search(customer_id=customer_id, query=query)
        row = next(iter(resp), None)
        if not row:
            return {"dateRange":"TODAY","impressions":0,"clicks":0,"cost":0.0,"avgCpc":0.0}
        m = row.metrics
        return {
            "dateRange":"TODAY",
            "impressions": int(m.impressions or 0),
            "clicks": int(m.clicks or 0),
            "cost": float((m.cost_micros or 0)/1_000_000),
            "avgCpc": float((m.average_cpc or 0)/1_000_000),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
