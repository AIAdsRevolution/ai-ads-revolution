import os
from datetime import date, timedelta
from google.ads.googleads.client import GoogleAdsClient
from supabase import create_client

def sb_admin():
    return create_client(os.environ["SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

def get_connection():
    sb = sb_admin()
    res = sb.table("google_ads_connections").select("*").eq("id", "singleton").execute()
    return res.data[0] if res.data else None

def build_client(refresh_token: str) -> GoogleAdsClient:
    cfg = {
        "developer_token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "client_id": os.environ["GOOGLE_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_CLIENT_SECRET"],
        "refresh_token": refresh_token,
        "use_proto_plus": True,
    }
    return GoogleAdsClient.load_from_dict(cfg)

def sync_last_n_days(customer_id: str, n_days: int = 30) -> int:
    conn = get_connection()
    if not conn or not conn.get("refresh_token"):
        raise RuntimeError("No refresh_token in google_ads_connections")

    client = build_client(conn["refresh_token"])
    service = client.get_service("GoogleAdsService")

    start = date.today() - timedelta(days=n_days)
    end = date.today() - timedelta(days=1)

    query = f"""
    SELECT
      segments.date,
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE segments.date BETWEEN '{start.isoformat()}' AND '{end.isoformat()}'
    """

    rows = []
    stream = service.search_stream(customer_id=customer_id, query=query)
    for batch in stream:
        for r in batch.results:
            rows.append({
                "customer_id": customer_id,
                "date": str(r.segments.date),
                "campaign_id": str(r.campaign.id),
                "campaign_name": r.campaign.name,
                "impressions": int(r.metrics.impressions or 0),
                "clicks": int(r.metrics.clicks or 0),
                "cost_micros": int(r.metrics.cost_micros or 0),
                "conversions": float(r.metrics.conversions or 0),
                "conversion_value": float(r.metrics.conversions_value or 0),
            })

    if not rows:
        return 0

    sb = sb_admin()
    sb.table("google_ads_metrics_daily").upsert(rows).execute()
    return len(rows)
