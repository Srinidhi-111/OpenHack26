"""
detection.py — Meiyaa detection logic (Member 1)
Combines semantic similarity (sentence-transformers) with rule-based signals.
"""

from sentence_transformers import SentenceTransformer
import numpy as np

# ---------------------------------------------------------------------------
# 1. Load model once at import time (NOT inside the function — reloading the
#    model on every call would be extremely slow and kill your demo).
# ---------------------------------------------------------------------------
_model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
# ^ multilingual model — handles Tamil-English code-mixing much better than
#   an English-only model like all-MiniLM-L6-v2. Still free, Apache 2.0, local.

# ---------------------------------------------------------------------------
# 2. Seed dataset — placeholder for now, swapped later (see section 7)
# ---------------------------------------------------------------------------
SEED_MESSAGES = [
    "Urgent! Your bank account will be blocked. Click here immediately to verify.",
    "Congratulations! You have won Rs 50,000. Send your OTP to claim now.",
    "Ungal account suspend aagum, immediately இந்த link click pannunga",
    "Dear customer your KYC is pending, update now or account will be blocked",
    "Free recharge kedaikkum, click here to get 500 rupees cashback offer",
    "This is IT department, pay pending tax immediately or face arrest",
    "Your parcel is held at customs, pay Rs 199 to release, click link",
    "Vaccine registration free ஆக இருக்கு, ungal Aadhaar number send pannunga",
]

# Precompute seed embeddings once (fast lookups later)
_seed_embeddings = _model.encode(SEED_MESSAGES, normalize_embeddings=True)


def _semantic_score(text: str):
    """Returns (best_similarity_score, most_similar_seed_message)."""
    query_embedding = _model.encode([text], normalize_embeddings=True)
    # cosine similarity == dot product when vectors are normalized
    similarities = np.dot(_seed_embeddings, query_embedding.T).flatten()
    best_idx = int(np.argmax(similarities))
    return float(similarities[best_idx]), SEED_MESSAGES[best_idx]


def analyze_message(text: str) -> dict:
    """
    Returns:
        {
            "risk_score": float,        # 0.0 (safe) to 1.0 (high risk)
            "flagged_phrases": list[str],
            "explanation": str
        }
    """
    semantic_sim, closest_match = _semantic_score(text)

    # Rule-based layer stacks on top — see section 5 for full implementation
    rule_score, flagged_phrases, rule_reasons = _apply_rules(text)

    # Combine: weighted average, semantic carries more weight but rules can
    # push a borderline message over the edge
    risk_score = round(min(1.0, 0.7 * max(semantic_sim, 0) + 0.3 * rule_score), 3)

    explanation_parts = []
    if semantic_sim > 0.5:
        explanation_parts.append(
            f"Message closely resembles a known scam pattern (similarity: {semantic_sim:.2f})."
        )
    if rule_reasons:
        explanation_parts.append("Also flagged for: " + ", ".join(rule_reasons) + ".")
    if not explanation_parts:
        explanation_parts.append("No strong scam indicators detected.")

    return {
        "risk_score": risk_score,
        "flagged_phrases": flagged_phrases,
        "explanation": " ".join(explanation_parts),
    }
