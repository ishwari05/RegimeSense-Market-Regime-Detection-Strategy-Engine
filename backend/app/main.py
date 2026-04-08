from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import numpy as np

from app.services.data_engine import fetch_market_data, compute_features, normalize_features
from app.models.hmm_engine import MarketsHMMEngine
from app.models.hybrid_engine import HybridRegimeModel
from app.core.backtest import run_backtest

app = FastAPI(title="RegimeSense API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrainRequest(BaseModel):
    ticker: str
    period: str = "5y"

@app.get("/")
async def root():
    return {"message": "RegimeSense API is running"}

@app.post("/analyze")
async def analyze_market(request: TrainRequest):
    try:
        # 1. Fetch and process data
        raw_df = fetch_market_data(request.ticker, request.period)
        df = compute_features(raw_df)
        
        # 2. HMM Pipeline
        hmm_features = ['log_return', 'volatility']
        df_hmm, _ = normalize_features(df, hmm_features)
        
        hmm_engine = MarketsHMMEngine(n_states=3)
        states = hmm_engine.train(df_hmm[hmm_features])
        regimes = hmm_engine.label_regimes(df, states)
        probs = hmm_engine.get_probabilities(df_hmm[hmm_features])
        
        # 3. Hybrid ML (Train on fly for demo)
        hybrid_model = HybridRegimeModel()
        X_hybrid, y_hybrid = hybrid_model.prepare_data(df, probs, regimes)
        accuracy = hybrid_model.train(X_hybrid, y_hybrid)
        next_pred = hybrid_model.predict_next(df, probs)
        
        # 4. Backtest
        backtest_results = run_backtest(df, regimes)
        
        # 5. Prepare chart data
        chart_data = []
        for i in range(len(df)):
            chart_data.append({
                "date": df.index[i].strftime('%Y-%m-%d'),
                "price": float(df['Close'].iloc[i]),
                "regime": regimes[i],
                "prob_bull": float(probs[i, list(hmm_engine.state_map.values()).index("Bull")]),
                "prob_bear": float(probs[i, list(hmm_engine.state_map.values()).index("Bear")]),
                "prob_sideways": float(probs[i, list(hmm_engine.state_map.values()).index("Sideways")]),
            })

        return {
            "ticker": request.ticker,
            "accuracy": accuracy,
            "next_prediction": next_pred,
            "transition_matrix": hmm_engine.get_transition_matrix().tolist(),
            "state_stats": hmm_engine.get_state_stats(),
            "backtest": backtest_results,
            "chart_data": chart_data,
            "state_map": hmm_engine.state_map
        }

    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
