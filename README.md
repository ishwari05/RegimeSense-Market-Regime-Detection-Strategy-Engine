# 📈 RegimeSense — Market Regime Detection & Strategy Engine

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Machine Learning](https://img.shields.io/badge/ML-HMM%20%2B%20XGBoost-FF6F00?style=for-the-badge&logo=scikitlearn&logoColor=white)](https://github.com/topics/machine-learning)
[![Quant Finance](https://img.shields.io/badge/Fin-Quantitative-success?style=for-the-badge)](https://github.com/topics/quantitative-finance)

> **Uncovering the hidden DNA of markets.** A production-grade intelligence platform that detects latent market states and predicts structural shifts using unsupervised learning and gradient boosting.

---

## 📊 Problem Statement
Financial markets are not stationary; they transition between distinct **regimes** (Bull, Bear, and Sideways). Traditional statistical models often fail because they assume a single, consistent market personality. 

Ignoring these regime shifts leads to:
- **Inaccurate risk assessment** during high-volatility periods.
- **Strategically blind portfolios** that don't adapt to changing market dynamics.
- **Significant drawdowns** that could have been mitigated by "Risk-Off" detection.

## 🧠 The Solution
**RegimeSense** solves this by treating market data as a **Hidden Markov Process**. It identifies the latent "mood" of the market and uses a hybrid ML approach to forecast upcoming structural changes.

### 1. Unsupervised Detection (HMM)
The system uses a **Gaussian Hidden Markov Model (HMM)** to cluster historical price and volatility data into N-states. This allows the model to "discover" Bull and Bear markets without manual labeling.

### 2. Hybrid Forecasting (XGBoost)
By feeding HMM state probabilities into an **XGBoost Classifier**, the platform predicts the transition probability for the next trading day, providing a quantitative "Market Weather Forecast."

### 3. Regime-Based Strategy
A custom backtesting engine evaluates if a regime-following strategy (e.g., *Long in Bull, Cash in Bear*) outperforms a standard Buy & Hold approach across different historical windows.

---

## ⚙️ Key Features
- ✅ **Latent State Detection**: Automatic classification of Bull, Bear, and Sideways regimes.
- 📈 **Real-Time Analysis**: Fetch and analyze any global ticker (Stocks, Crypto, Indices) via Yahoo Finance.
- 🔮 **Next-Regime Forecast**: Hybrid ML providing confidence scores for the next market shift.
- 🛡️ **Risk-Adjusted Backtesting**: Comparison of regime-based switching vs. baseline benchmarks.
- 📐 **Interactive Visuals**: Premium D3.js and Recharts dashboard for deep-dive insights.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python, FastAPI, Uvicorn |
| **ML/Quant** | hmmlearn, XGBoost, Pandas, Scikit-Learn |
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Visuals** | Recharts, D3.js, Framer Motion |
| **Data** | yfinance (Yahoo Finance API) |

---

## 🎨 Visualizations & UX

### 📽️ Killer Visuals
- **Regime Overlay Chart**: Price history shaded by detected regime (Green = Bull, Red = Bear).
- **Probability Stream**: Stacked area chart showing how certainty in each state fluctuates.
- **Transition Matrix**: Heatmap quantifying the mathematical odds of switching states.
- **Equity Curves**: Strategy performance vs. Buy & Hold benchmark.

### 🍱 Premium UI
The platform features a sleek, **Glassmorphism Dark Theme** designed for institutional-grade visual clarity and a premium "Quant Cockpit" feel.

---

## 📂 Project Structure
```text
RegimeSense/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI Routes
│   │   ├── core/         # Backtesting Engine
│   │   ├── models/        # HMM & XGBoost Logic
│   │   └── services/      # Data Fetching & Processing
│   └── requirements.txt   # Python Dependencies
├── frontend/
│   ├── src/
│   │   ├── app/           # Next.js Pages
│   │   ├── components/    # Reusable UI & Advanced Charts
│   │   └── lib/           # API Client & Utils
│   └── package.json       # Node Dependencies
└── README.md
```

---

## ⚡ Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` to launch the platform.

---

## 🧪 Methodology
1. **Ingest**: Fetch raw OHLCV data via `yfinance`.
2. **Feature Engineering**: Compute Log-Returns, Rolling Volatility, RSI, and MACD.
3. **Clustering**: Train Gaussian HMM to identify 3 hidden market states.
4. **Ensemble Training**: Feed HMM probabilities + indicators into XGBoost for transition prediction.
5. **Backtest**: Apply "Long-Only Bull" rules and calculate CAGR, Sharpe, and Max DD.

---

## 📌 Key Learnings
- **Time-Series Latency**: Working with non-stationary financial data requires robust normalization.
- **Unsupervised Insights**: HMMs are powerful at identifying structural breaks that simple moving averages miss.
- **Production Guardrails**: Implementing data-cleaning (Inf/NaN trapping) is critical for stable ML in production.

## 🔮 Future Improvements
- [ ] **Multi-Asset Portfolio**: Combined regime signal for diverse asset buckets.
- [ ] **Transformer Models**: Exploring Time-Series Transformers (TST) for better sequential forecasting.
- [ ] **Live WebSockets**: Real-time ticker updates and regime shift alerts.

---

*Built by a Quant Engineer with a focus on blending complex ML with premium Product Design.*
