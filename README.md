# PRD Roast 🔥

> **Upload your PRD. Get roasted. Maybe respected.**

A brutally honest AI-powered PRD reviewer. Paste or upload your Product Requirements Document and get sharp, grounded feedback that references your actual text — not generic platitudes.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔥 **Roast** | Sharp, witty critique referencing exact quotes from your PRD |
| 👏 **Applause** | Genuine praise — only when actually earned |
| 🛠 **Fix This** | Specific, actionable improvements tied to real gaps |
| 📊 **4 Scores** | Clarity · Structure · Product Thinking · Completeness — each with a written justification |
| 📋 **Section Audit** | Visual ✓/✗ strip showing which of the 7 key PRD sections are present |
| 📈 **Improvement Guide** | Step-by-step PM advice when score is below 75 |
| 🎤 **Stakeholder Recorder** | Record a design review session and get AI analysis of what to take vs ignore |
| 🏅 **PM Level Badge** | 5-tier ladder from Beta School 💀 to PM God Mode 👑 |
| 🃏 **Shareable Card** | Download a PNG badge to flex on LinkedIn |

---

## 🚀 Live Demo

**[prdroast.app](https://your-username.github.io/prd-roast)**

---

## 🏗 Tech Stack

- Pure **HTML + CSS + JS** — zero dependencies, zero build step
- [Anthropic Claude API](https://docs.anthropic.com) (`claude-sonnet-4-6`) for analysis
- Web Speech API for stakeholder recording (Chrome / Edge)
- Web Audio API for interactive sounds
- Single file — `index.html` is the entire app

---

## 🛠 Setup & Hosting

### Option 1 — GitHub Pages (recommended, free)

1. Fork this repo
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch → `main` → `/ (root)`**
4. Your app will be live at `https://your-username.github.io/prd-roast`

> **Note:** The app uses the Anthropic API directly from the browser. You do **not** need a backend. The API call is made client-side. This works fine for personal/demo use. For production, proxy the API key through a backend.

### Option 2 — Netlify (one-click)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/prd-roast)

1. Click the button above
2. Connect your GitHub account
3. Deploy — done

### Option 3 — Local

```bash
git clone https://github.com/your-username/prd-roast.git
cd prd-roast
open index.html   # or double-click the file
```

No server required. Open `index.html` directly in Chrome or Edge.

---

## 🔑 API Key

The app calls the Anthropic API from the browser. To use it:

1. Get your API key from [console.anthropic.com](https://console.anthropic.com)
2. The app is pre-configured to call `https://api.anthropic.com/v1/messages` directly

> ⚠️ **For personal use only** — exposing an API key client-side is fine for demos and personal tools. For a public production app, route API calls through a serverless function (Vercel Edge, Cloudflare Workers, etc.) to keep your key secure.

---

## 📐 PRD Scoring Rubric

| Dimension | What it measures | Good PRD has |
|---|---|---|
| **Clarity** | Are statements specific and unambiguous? | Numbers, named components, measurable conditions |
| **Structure** | Is the document logically organized? | Sections in order: Problem → User → Goals → Solution |
| **Product Thinking** | Does it understand user + problem deeply? | Named personas, quantified pain, "why now" |
| **Completeness** | Are all critical sections covered? | Edge cases, success metrics, non-goals |

Feedback is grounded in your actual text — every roast line quotes or references a specific phrase from your PRD.

---

## 🗂 Repo Structure

```
prd-roast/
├── index.html          # The entire app (HTML + CSS + JS)
├── README.md           # This file
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages auto-deploy
```

---

## 🎤 Stakeholder Recorder

During a design review:
1. Click **Stakeholder Review** in the nav bar (appears after analysing a PRD)
2. Hit **Record** — the app captures your meeting audio
3. Live transcript appears in real time (uses browser Speech Recognition)
4. When done, hit **Stop** → **Analyse**
5. Get a categorised breakdown:
   - ✅ **TAKE THIS** — actionable, user-grounded feedback
   - 🚫 **POLITELY IGNORE** — vague, political, or unfounded input
   - 💬 **NOTE** — needs more data before deciding

---

## 🤝 Contributing

PRs welcome. Keep the single-file architecture — it makes hosting trivially easy.

---

## 📄 License

MIT — use it, fork it, roast your own PRDs with it.

---

*Made with excessive honesty and mild Hinglish.*
