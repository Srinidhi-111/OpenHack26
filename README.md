# Meiyaa 🛡️
A scam and misinformation detector for code-mixed regional-language messages (Tamil-English WhatsApp forwards and SMS) using open-source NLP.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Built at OpenHack '26](https://img.shields.io/badge/Built%20at-OpenHack%20'26-blueviolet)]()
[![Status: Prototype](https://img.shields.io/badge/Status-Hackathon%20Prototype-orange)]()

> **மெய்யா** (*Meiyaa*) means "is it true?" in Tamil — the question this tool is built to help answer.

---

## Table of Contents

- [The Problem](#the-problem)
- [What Meiyaa Does](#what-meiyaa-does)
- [Why This Is Different](#why-this-is-different)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Run Instructions](#setup--run-instructions)
- [How It Works](#how-it-works)
- [Dataset](#dataset)
- [Known Limitations](#known-limitations)
- [What We'd Build Next](#what-wed-build-next)
- [Team](#team)
- [License](#license)

---

## The Problem

Scam and misinformation messages circulating over WhatsApp and SMS in India are rarely written in clean, plain English. They mix Tamil and English in the same sentence — "**ungaluku** loan **approve** aayiduchu, **processing fee** anுppunga" — switch scripts mid-message, and lean on colloquial phrasing that formal-language detectors are never trained on.

Most existing spam/fraud filters are English-first: they catch obvious keyword patterns ("you have won", "click here") but miss the code-mixed, culturally-specific phrasing that real Tamil-English WhatsApp forwards actually use. That gap matters — job scams, fake loan offers, OTP phishing, and health hoaxes spread fastest in exactly this kind of message, and the people most likely to receive them are often the least equipped to independently fact-check a claim written in their own mixed-language vernacular.

**Meiyaa exists to close that gap**: a detector built from the ground up on Tamil-English code-mixed examples, not retrofitted from an English-only dataset.

## What Meiyaa Does

A user pastes a WhatsApp or SMS message into Meiyaa and gets back three things:

1. **A risk score** — how likely the message is to be a scam or piece of misinformation
2. **Flagged phrases** — the specific words/phrases in *their* message that triggered the score (e.g. "processing fee", "click pannunga", "OTP sollunga")
3. **A plain-language explanation** — a short, human-readable reason *why* the message looks suspicious, not just a bare number

The goal is a tool that doesn't just say "risky" but shows its work — so a user can learn to spot the pattern themselves next time.

## Why This Is Different

- **Code-mixed first, not English-first.** Trained and tested on Tamil script, Tanglish (Latin-script code-mixed), and English examples side by side.
- **Explains, doesn't just classify.** Flagged phrases + plain-language reasoning, so the output is actionable for a non-technical user, not just a confidence score.
- **Covers both scams and misinformation.** Financial fraud (job/loan/OTP/lottery scams) *and* health misinformation hoaxes, which behave differently but both spread via the same forward-culture mechanics.
- **Tested against real "don't over-flag" cases.** The seed dataset explicitly includes safe, ordinary messages (bank alerts, casual chat) so the tool is checked for false positives, not just true positives.


## Screenshots

<img width="1600" height="863" alt="WhatsApp Image 2026-08-21 at 13 53 22" src="https://github.com/user-attachments/assets/df728bb8-4042-4b95-aa1b-86bfe091c2fb" />

<img width="1600" height="873" alt="WhatsApp Image 2026-08-21 at 13 54 18" src="https://github.com/user-attachments/assets/d3664bb5-a6bf-44be-a42b-34b0eb0f5a7d" />



| Stage | Screenshot |
|---|---|
| Early UI (first render) | `screenshots/01_early_ui.png` |
| First working result | `screenshots/02_first_result.png` |
| Scam message flagged | `screenshots/03_scam_result.png` |
| Safe message correctly passed | `screenshots/04_safe_result.png` |
| Final polished UI | `screenshots/05_final.png` |

```markdown
![Early UI](screenshots/01_early_ui.png)
![Scam flagged](screenshots/03_scam_result.png)
![Safe message passed](screenshots/04_safe_result.png)
```

## Tech Stack

**All tools below are free and open-source — no paid APIs or services are used anywhere in this project.**

| Layer | Tool/Library | Purpose |
|---|---|---|
| Language / runtime  | Core application logic |
| NLP / detection | | Risk scoring, phrase flagging |
| Backend / API |  | Serves the `/analyze` endpoint |
| Frontend |  | Paste-message UI, results display |
| Data format | JSON (`data/seed_dataset.json`) | Seed dataset of scam/misinformation/safe examples |
| Version control | Git + GitHub | Source control, team collaboration |

*(Update this table the moment a library choice is finalized — don't wait until the end of the day.)*

## Project Structure

```
OpenHack26/
├── README.md
├── LICENSE
├── data/
│   └── seed_dataset.json       # 75 curated scam/misinfo/safe example messages
├── screenshots/                # Prototype screenshots, captured throughout the day
├── demo/
│   └── demo_video.mp4          # (or a link to hosted video)
├── [backend folder]/           #  app.py, /api
└── [frontend folder]/          #  /frontend, index.html
```

*(Update this tree to match what actually exists in the repo — run `ls -R` or check VS Code's file explorer and adjust.)*

## Setup & Run Instructions

### Prerequisites
Python 3.10+]
js 18+, if there's a JS frontend]`
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Srinidhi-111/OpenHack26.git
cd OpenHack26
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the backend
```bash
python app.py
```
Server should start on `http://localhost:[PORT]`.

### 4. Run the frontend (if separate from backend)
```bash
cd frontend
npm install
npm start
```

### 5. Try it out
Open `http://localhost:[PORT]` in your browser, paste a sample message (see `data/seed_dataset.json` for examples), and click **Analyze**.

## How It Works

1. **Input: User pastes a raw WhatsApp/SMS message (any mix of Tamil script, Tanglish, or English).
2. **Preprocessing: text normalization, script detection]`
3. **Detection: keyword/pattern matching against red-flag phrase list derived from the seed dataset, or a trained classifier]`
4. **Scoring: how the risk score 0-100 (or however it's scaled) is calculated]`
5. **Output: Risk score + the exact substrings that matched known scam/misinformation patterns + a template-generated plain-language explanation.

*(This section should be filled in by whoever built the detection logic — Member 4, coordinate with Member 1 to get this accurate before final submission.)*

## Dataset

`data/seed_dataset.json` contains **75 hand-curated example messages** across 6 categories, in English, Tanglish, and Tamil script:

| Category | Count | Examples of patterns covered |
|---|---|---|
| Job scams | 13 | Fake WFH/data-entry offers, upfront "registration fees", brand impersonation |
| Loan fraud | 11 | "No CIBIL check" loans, fake loan-app APK links, advance processing fees |
| OTP phishing | 13 | Fake KYC/SIM-block urgency, bank/telecom impersonation, refund pretexts |
| Health misinformation | 13 | Miracle cures, fake WHO/doctor attribution, "stop your medicine" claims |
| Lottery/prize scams | 9 | Unsolicited prize wins, brand impersonation, advance "GST/processing fees" |
| Safe/clean (control) | 12 | Genuine bank alerts, delivery confirmations, casual family chat |

Each entry includes the message text, category, label (`scam` / `misinformation` / `not_scam`), language type, the specific red flags present, and a note on the real-world reported pattern it's based on.

**Sourcing note:** examples are reconstructed from publicly documented scam/misinformation patterns (cybercrime advisories, CERT-In/RBI/TRAI alerts, and fact-checking organizations such as BOOM Live and Check4Spam) rather than copied from any individual's private messages — realistic in phrasing while respecting privacy.

## Known Limitations

*(Be upfront about these — judges respect honesty about hackathon-scope constraints more than overclaiming)*

- Seed dataset covers 5 scam/misinformation categories; real-world scam patterns are far broader.
- Currently scoped to Tamil-English code-mixing; not tested on other regional language pairs.


## What We'd Build Next

- Expand the seed dataset with a larger, community-sourced set of real-world reported examples.
- Extend code-mixing support to other Indian language pairs (Hindi-English, Telugu-English, etc.).
- Move from pattern-based detection toward a properly trained/fine-tuned classifier.
- Add a feedback loop so flagged/unflagged results can be corrected by users over time.

## Team

| Role | Member |
|---|---|
| ML Lead | Member 1 — `[Abinaya S]` |
| Backend | Member 2 — `[Srinidhi R]` |
| Frontend| Member 3 — `[Dharun R]` |
| Data Curation + Documentation/Demo Lead | Member 4 — `[Panbarasi S]` |

## License

This project is licensed under the MIT License — see [`LICENSE`](./LICENSE) for details.
