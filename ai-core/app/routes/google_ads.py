import os
from fastapi import APIRouter, Header, HTTPException
from pydantic import BaseModel
from supabase import create_client
from app.integrations.google_ads import sync_last_n_days

router = APIRouter(prefix="/integrations/google-ads", tags=["google-ads"])

class SyncReq(BaseModel):
    source: str | None = None

def sb_admin():
    return create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

@router.post("/sync")
def sync(req: SyncReq, x_sync_key: str = Header(default="")):
    expected = os.environ.get("AI_CORE_SYNC_KEY", "")
    if not expected or x_sync_key != expected:
        raise HTTPException(status_code=401, detail="unauthorized")

    customer_id = os.environ.get("GOOGLE_ADS_CUSTOMER_ID")
    if not customer_id:
        sb = sb_admin()
        row = sb.table("google_ads_connections").select("customer_id").eq("id","singleton").execute()
        if row.data and row.data[0].get("customer_id"):
            customer_id = row.data[0]["customer_id"]

    if not customer_id:
        raise HTTPException(status_code=400, detail="missing_customer_id")

    inserted = sync_last_n_days(customer_id=customer_id, n_days=int(os.environ.get("GOOGLE_ADS_SYNC_DAYS","30")))
    return {"ok": True, "inserted": inserted, "customer_id": customer_id}
