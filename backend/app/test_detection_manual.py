from app.detection import analyze_message

test_cases = [
    "Ungal bank account block aagum, click pannunga immediately",
    "Hey are we still meeting for lunch tomorrow?",
    "URGENT: send your OTP now to claim your prize of Rs 10000",
]

for msg in test_cases:
    result = analyze_message(msg)
    print(f"\nInput: {msg}")
    print(f"  risk_score: {result['risk_score']}")
    print(f"  flagged_phrases: {result['flagged_phrases']}")
    print(f"  explanation: {result['explanation']}")
