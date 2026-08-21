from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models import MessageInput, AnalysisResult
from app.detection import analyze_message

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

    result = analyze_message(text)
    return AnalysisResult(**result)
