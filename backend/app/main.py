from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import MessageInput, AnalysisResult

app = FastAPI(title="Meiyaa API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "Meiyaa API is running"}

@app.post("/analyze", response_model=AnalysisResult)
def analyze(input: MessageInput):
    text = input.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Message text cannot be empty.")
    if len(text) > 2000:
        raise HTTPException(status_code=400, detail="Message too long (max 2000 characters).")

    # --- STUB: replace this once Member 1's detection.py is ready ---
    return AnalysisResult(
        risk_score=0.5,
        flagged_phrases=["urgent", "click here"],
        explanation="This is a placeholder response for frontend testing."
    )
