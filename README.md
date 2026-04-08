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

### 3. AI Insight Layer (Explainability)
> [!IMPORTANT]
> **No more black boxes.** The platform includes an AI logic engine that translates complex model weights and transition probabilities into human-readable narratives, explaining *why* the market is shifting and what the primary risk drivers are.

---

## ⚙️ Key Features
- ✅ **Latent State Detection**: Automatic classification of Bull, Bear, and Sideways regimes.
- 🧪 **Expanding Walk-Forward Validation**: Time-series correct evaluation using rolling windows to ensure model reliability.
- 🧠 **AI-Driven Market Insights**: Human-readable explanations of model reasoning and persistence drivers.
- 📈 **Regime Stability Analysis**: Consistency checks across historical epochs (Past vs. Current) to prove structural robustness.
- 🔮 **Next-Regime Forecast**: Hybrid ML providing confidence scores for the next market shift.
- 🛡️ **Risk-Adjusted Backtesting**: Comparison of regime-based switching vs. baseline benchmarks.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Python, FastAPI, Uvicorn |
| **ML/Quant** | hmmlearn, XGBoost, Pandas, Scikit-Learn |
| **Validation** | Walk-forward cross-validation, Stability Analysis |
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| **Visuals** | Recharts, Framer Motion, D3.js |

---

## 🎨 Visualizations & UX

### 🛡️ Model Credibility & Validation Section
The platform now includes a **"Research Deep-Dive"** module for scientific transparency:
- **Performance Stability Chart**: Line chart showing accuracy across sequential walk-forward folds.
- **Cross-Epoch Stability Table**: Comparing regime mean returns and volatility across different time decades.
- **Feature Contribution Chart**: Horizontal bar chart mapping exactly which indicators are driving the current ML output.

### 📽️ Killer Visuals
- **Regime Overlay Chart**: Price history shaded by detected regime (Green = Bull, Red = Bear).
- **Probability Stream**: Stacked area chart showing how certainty in each state fluctuates.
- **Transition Matrix**: Interactive heatmap for probability-based regime switches.
- **AI Analyst Panel**: Glassmorphism panel narrating the "why" behind the numbers.

---

## 📂 Project Structure
```text
RegimeSense/
├── backend/
│   ├── app/
│   │   ├── core/         # Backtesting & Validation Engines
│   │   ├── models/       # HMM, XGBoost & Explanation Engines
│   │   └── services/     # Data Fetching & Feature Engineering
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Charts, Insights & Validation UI
│   │   └── ...
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
4. **Validation**: Run **Walk-Forward Cross-Validation** to ensure the HMM+ML pipeline generalizes over time.
5. **Inference**: Generate predictions and AI-driven insights describing momentum and persistence.
6. **Backtest**: Evaluate regime-switching Alpha against Buy & Hold benchmarks.

---

## 📌 Key Learnings
- **Scientific Rigor**: Implementing walk-forward validation is the only way to avoid the "look-ahead bias" trap in quant finance.
- **Human-Centric Design**: Complex probabilistic models are only useful if their outputs can be explained clearly to a human decision-maker.
- **Regime Stability**: Proving that a Bull market has consistent characteristics over time is the key to building trust in AI-driven strategies.

---

*Built for institutional-grade quantitative research and premium product experience.*
