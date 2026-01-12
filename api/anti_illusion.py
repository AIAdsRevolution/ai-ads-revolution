from dataclasses import dataclass
from typing import List, Optional, Literal

Decision = Literal["CONTINUA", "MIGLIORA", "FERMA"]

@dataclass
class AntiIllusion:
    triggered: bool
    title: Optional[str]
    message: Optional[str]
    tags: List[str]

def check_anti_illusion(tags_from_engine: List[str]) -> AntiIllusion:
    """
    Se il cervello rileva pattern di rumore/bias, mostra un alert forte in UI.
    """
    if "ANTI_ILLUSION_RUMORE" in tags_from_engine or "NOISE_SALE" in tags_from_engine:
        return AntiIllusion(
            triggered=True,
            title="Avviso Anti-Illusione",
            message="Possibile rumore statistico: non usare un segnale isolato come scusa per continuare. Serve conferma o correzione funnel.",
            tags=["RUMORE_STATISTICO"]
        )
    return AntiIllusion(triggered=False, title=None, message=None, tags=[])
