from pydantic import BaseModel
from typing import List

class MessageInput(BaseModel):
    text: str

class AnalysisResult(BaseModel):
    risk_score: float          # 0.0 (safe) to 1.0 (high risk)
    flagged_phrases: List[str]
    explanation: str
