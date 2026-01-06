# 🧮 Crypto Market Cap Reality Tool

A simple, opinionated web tool that helps users understand what market cap is required for a crypto token to reach a given price.

This project exists to replace vague price predictions with clear, math-based reality checks.

---

## 🧠 What This Tool Does

Given:

- a crypto token (e.g. SUI)
- a target price (e.g. $10)

The tool calculates:

- the required market cap to reach that price
- the current market cap
- the growth multiple needed from current levels

Core formula used:

    Required Market Cap = Target Price × Circulating Supply

The math is intentionally simple, transparent, and easy to reason about.

---

## 🎯 Why This Exists

Most crypto conversations revolve around questions like:

“Can this token reach $10?”

That question is meaningless without understanding supply and market cap.

This tool exists to:

- ground expectations in reality
- help users think in market caps, not hype
- provide fast, shareable scenario checks

No charts.  
No trading.  
No predictions.  
No financial advice.

---

## 🧱 Tech Stack

This project is intentionally minimal.

- Nuxt 3

  - Vue 3 + Composition API
  - Server-side rendering (SEO-friendly)
  - Built-in backend via Nitro

- CoinGecko API

  - Circulating supply
  - Market cap
  - Price data
  - No API key required

- Vercel / Netlify / Cloudflare
  - Zero-config deployment
  - Global edge delivery

No database.  
No authentication.  
No background workers.

---

## 🏗️ Architecture Overview

    User Browser
       ↓
    Nuxt Page (SSR)
       ↓
    Nitro API Route (/api/market-cap)
       ↓
    CoinGecko API

All calculations happen server-side to ensure:

- consistent results
- SEO-friendly rendering
- easy sharing via URLs

---

## 📁 Project Structure

    /
    ├─ pages/
    │  └─ index.vue          # Main UI
    ├─ server/
    │  └─ api/
    │     └─ market-cap.ts   # Core calculation logic
    ├─ app.vue
    └─ nuxt.config.ts

UI concerns live in /pages.  
Business logic lives in /server/api.

---

## 🚀 Getting Started

1. Install dependencies

   npm install

2. Run locally

   npm run dev

Then visit:

    http://localhost:3000

---

## 🔌 API Endpoint

GET /api/market-cap

Query parameters:

- token — CoinGecko token ID (e.g. sui, solana, ethereum)
- price — Target price in USD

Example request:

    /api/market-cap?token=sui&price=10

Example response:

    {
      "token": "sui",
      "targetPrice": 10,
      "requiredMarketCap": 25000000000,
      "currentMarketCap": 4200000000,
      "multiplier": "5.95"
    }

---

## 🔗 Shareable URLs

The app is designed to support URLs like:

    /?token=sui&price=10

This allows:

- sharing on X / Telegram / Discord
- instant scenario recreation
- SEO indexing

---

## ⏱️ Data Freshness

- Data is near-real-time
- Prices and market caps update every few minutes
- No second-by-second streaming (by design)

This keeps the tool:

- stable
- predictable
- inexpensive to operate

---

## ❌ What This Tool Is NOT

- Not a trading platform
- Not a price prediction engine
- Not a charting tool
- Not financial advice

This is a thinking tool, not a casino.

---

## 🔮 Planned Enhancements

These features are intentionally not included in v1:

- Circulating vs Fully Diluted (FDV) toggle
- “Price at X market cap” comparisons
- Supply inflation simulations
- Saved scenarios (accounts)
- Alerts and notifications
- Public API access

They will be added only when real usage demands them.

---

## 🧠 Design Philosophy

- Ship fast
- Keep the math explicit
- Avoid unnecessary complexity
- Add features only after real demand

Simplicity is a feature, not a limitation.

---

## ⚠️ Disclaimer

All data is sourced from third-party APIs and may be delayed or inaccurate.

This tool is for educational purposes only and does not constitute financial advice.

Always do your own research.

---

## 📬 Feedback

This project is intentionally small and focused.

If you have feedback, ideas, or critiques — they are welcome.

---

### 🧩 One-Line Summary

A simple Nuxt-based tool that replaces crypto price hype with market-cap reality.
