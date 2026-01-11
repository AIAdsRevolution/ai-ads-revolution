from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Metrics(BaseModel):
    ctr: float   # click-through-rate
    cpc: float   # costo per clic
    roas: float  # ritorno sulla spesa pubblicitaria


@router.get("/metrics/summary", response_model=Metrics)
async def get_metrics_summary():
    """
    Per ora: dati statici di esempio.
    Più avanti li collegheremo a Supabase / campagne reali.
    """
    impressions = 10000
    clicks = 723
    cost = 123.45
    revenue = 456.78

    ctr = clicks / impressions          # es. 0.0723 → 7.23%
    cpc = cost / clicks                 # es. 0.17 €
    roas = revenue / cost               # es. 3.7x

    return Metrics(ctr=ctr, cpc=cpc, roas=roas)

