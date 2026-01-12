from dataclasses import dataclass, asdict
from typing import Optional, Literal, Dict, Any, List

Vertical = Literal["LOCALE", "ECOMMERCE", "TICKET_ALTO", "B2B"]
Decision = Literal["CONTINUA", "MIGLIORA", "FERMA"]

@dataclass
class InputSignals:
    vertical: Vertical = "ECOMMERCE"
    spend_eur: float = 0.0
    clicks: int = 0
    days_active: int = 1
    add_to_cart: Optional[int] = None
    sales: Optional[int] = None
    leads: Optional[int] = None
    qualified_leads: Optional[int] = None
    unqualified_leads: Optional[int] = None
    margin_good: Optional[bool] = None
    random_single_sale_after_dry: Optional[bool] = None

@dataclass
class DecisionOutput:
    decision: Decision
    reason: str
    action: str
    safety_limit: str
    confidence: int
    tags: List[str]

def clamp(n: int, lo: int = 0, hi: int = 100) -> int:
    return max(lo, min(hi, n))

def decision_engine(signals: InputSignals) -> DecisionOutput:
    """
    CERVELLO AIAdsRevolution (Manual training rules)
    - CONTINUA / MIGLIORA / FERMA
    - confidence + explain
    - rispetta le scelte che hai addestrato in chat
    """
    v = signals.vertical
    spend = float(signals.spend_eur or 0)
    clicks = int(signals.clicks or 0)
    days = int(signals.days_active or 1)
    sales = int(signals.sales or 0)
    atc = int(signals.add_to_cart or 0)

    q = int(signals.qualified_leads or 0)
    u = int(signals.unqualified_leads or 0)
    leads = int(signals.leads or (q + u))

    tags: List[str] = []
    decision: Decision = "MIGLIORA"
    confidence = 65
    reason = "Scenario da ottimizzare."
    action = "Migliora offerta/targeting e verifica funnel."
    safety = "Non scalare budget finché non hai segnali stabili."

    # --- ECOMMERCE: segnale positivo precoce (hai risposto A) ---
    if v == "ECOMMERCE":
        if sales >= 1 and days <= 2:
            decision = "CONTINUA"
            confidence = 72
            reason = "Segnale reale (vendita) in fase iniziale: vale la pena continuare."
            action = "Continua 48h con budget stabile e monitora conversioni."
            safety = "Non aumentare budget prima di 2 vendite totali."
            tags.append("EARLY_SIGNAL")

        # --- ECOMMERCE: vanity metrics / ATC alto e 0 vendite (hai scelto FERMA) ---
        if clicks >= 200 and atc >= 8 and sales == 0 and days >= 2:
            decision = "FERMA"
            confidence = 88
            reason = "Add-to-cart alto ma zero vendite: probabile blocco funnel (checkout/fiducia/offerta)."
            action = "Controlla checkout, pagamenti, spedizioni, recensioni e pagina prodotto."
            safety = "Non aumentare budget."
            tags.append("FUNNEL_BLOCK")

        # --- ECOMMERCE: vendita rumorosa (hai scelto FERMA) ---
        if sales == 1 and days >= 5 and spend >= 60:
            decision = "FERMA"
            confidence = 86
            reason = "Vendita isolata dopo giorni di nulla: spesso è rumore statistico, non conferma."
            action = "Ferma e correggi funnel/creatività; riparti solo con ipotesi chiara."
            safety = "Non scalare basandoti su 1 vendita."
            tags.append("NOISE_SALE")

        # --- ECOMMERCE: vendite ma margine negativo (hai scelto FERMA) ---
        if sales >= 1 and signals.margin_good is False:
            decision = "FERMA"
            confidence = 92
            reason = "Vendite con margine negativo: continuare aumenta le perdite."
            action = "Rivedi prezzo/costi/offerta prima di riattivare."
            safety = "Non aumentare budget."
            tags.append("PROFIT_FIRST")

    # --- LOCALE: contatto singolo può valere (hai scelto CONTINUA nel caso base) ---
    if v == "LOCALE":
        # se almeno 1 contatto (leads) e costo non folle -> continua prudente
        if leads >= 1 and days >= 3:
            decision = "CONTINUA"
            confidence = 70
            reason = "Nel locale anche pochi contatti possono ripagare: c'è segnale minimo."
            action = "Continua e monitora qualità contatti per 72h."
            safety = "Non scalare senza aumento contatti utili."
            tags.append("LOCAL_SIGNAL")

        # contatti deboli (hai scelto MIGLIORA)
        if leads >= 1 and q == 0 and u >= 1:
            decision = "MIGLIORA"
            confidence = 74
            reason = "Ci sono contatti ma qualità bassa: serve migliorare messaggio/filtro."
            action = "Raffina targeting, CTA e domanda di qualificazione (form/WhatsApp)."
            safety = "Non aumentare budget finché la qualità non sale."
            tags.append("LEAD_QUALITY")

    # --- B2B: zero lead dopo 2 giorni (hai scelto FERMA) ---
    if v == "B2B":
        if days >= 2 and leads == 0:
            decision = "FERMA"
            confidence = 84
            reason = "In B2B, 0 lead dopo 2 giorni è segnale forte di mismatch (target/offerta)."
            action = "Ferma e riscrivi offerta + ICP + landing, poi riparti."
            safety = "Non aumentare budget."
            tags.append("B2B_NO_SIGNAL")

        # 1 lead qualificato (hai scelto CONTINUA)
        if q >= 1:
            decision = "CONTINUA"
            confidence = 80
            reason = "In B2B anche 1 lead qualificato è un segnale economico importante."
            action = "Continua e migliora targeting per aumentare continuità."
            safety = "Non scalare finché non ottieni un secondo lead qualificato."
            tags.append("B2B_QUALIFIED")

    # --- TICKET ALTO: lead non qualificati = danno (hai scelto FERMA in caso 0 qualificati) ---
    if v == "TICKET_ALTO":
        if q == 0 and u >= 1:
            decision = "FERMA"
            confidence = 90
            reason = "Nel ticket alto, lead non qualificati = tempo/reputazione bruciati."
            action = "Ferma e cambia targeting + filtro (domande, budget minimo, intent)."
            safety = "Non aumentare budget."
            tags.append("HIGH_TICKET_BAD_LEADS")

        # qualità mista con almeno 1 qualificato (hai scelto CONTINUA)
        if q >= 1:
            decision = "CONTINUA"
            confidence = 82
            reason = "Nel ticket alto, un lead qualificato può giustificare la continuazione del test."
            action = "Continua ma alza subito i filtri per ridurre lead inutili."
            safety = "Non scalare senza conferme."
            tags.append("HIGH_TICKET_SIGNAL")

    # Anti-Illusion flag (segnalato a mano)
    if signals.random_single_sale_after_dry:
        tags.append("ANTI_ILLUSION_RUMORE")

    confidence = clamp(confidence)
    return DecisionOutput(decision, reason, action, safety, confidence, tags)

def to_dict(out: DecisionOutput) -> Dict[str, Any]:
    return asdict(out)
