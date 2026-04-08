import numpy as np
import pandas as pd

def generate_insights(df, hmm_probs, trans_matrix, hybrid_prediction, current_regime, feature_importance):
    """
    Generates human-readable insights for the current market state.
    """
    insights = []
    
    # 1. Feature-Based Rules (Trend Analysis)
    # Look at last 5 days
    last_5 = df.iloc[-5:]
    avg_return = last_5['log_return'].mean()
    avg_vol = last_5['volatility'].mean()
    
    if avg_return > 0.001:
        insights.append("📈 Positive return momentum detected over the last 5 sessions.")
    elif avg_return < -0.001:
        insights.append("📉 Negative price momentum building in recent sessions.")
    else:
        insights.append("↔️ Price action remains relatively flat and range-bound.")
        
    if avg_vol > df['volatility'].mean() * 1.2:
        insights.append("⚠️ Elevated volatility suggesting increased market uncertainty.")
    elif avg_vol < df['volatility'].mean() * 0.8:
        insights.append("🛡️ Low-to-moderate volatility indicating stable market conditions.")

    # 2. HMM-Based Insights (Persistence & Shift Risk)
    # State mapping: Bull=0, Sideways=1, Bear=2 (based on previous labeling logic)
    regime_to_idx = {"Bull": 0, "Sideways": 1, "Bear": 2}
    curr_idx = regime_to_idx.get(current_regime, 0)
    
    persistence = trans_matrix[curr_idx][curr_idx]
    if persistence > 0.8:
        insights.append(f"🔄 Strong persistence in the current {current_regime} regime.")
    
    # Check for shift risk
    for target_regime, target_idx in regime_to_idx.items():
        if target_regime != current_regime:
            shift_prob = trans_matrix[curr_idx][target_idx]
            if shift_prob > 0.15:
                insights.append(f"⚡ Increasing mathematical probability of a shift to {target_regime}.")

    # 3. Probability Trend Analysis
    if len(hmm_probs) >= 5:
        probs_last_5 = hmm_probs[-5:, curr_idx]
        if probs_last_5[-1] > probs_last_5[0] + 0.1:
            insights.append(f"💪 {current_regime} sentiment is strengthening significantly.")
        elif probs_last_5[-1] < probs_last_5[0] - 0.1:
            insights.append(f"🔌 {current_regime} probability is starting to decay.")

    # 4. ML Explainability (XGBoost Feature Importance)
    if feature_importance:
        # Sort by importance
        sorted_features = sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)
        top_feature = sorted_features[0][0]
        insights.append(f"🧠 Prediction driven primarily by shifts in {top_feature.replace('_', ' ')}.")

    # Risk Signal logic
    risk_signal = "Low"
    if current_regime == "Bear":
        risk_signal = "High"
    elif current_regime == "Sideways" or avg_vol > df['volatility'].mean():
        risk_signal = "Moderate"
        
    return {
        "regime": current_regime,
        "confidence": float(hybrid_prediction['confidence']),
        "insights": insights,
        "risk_signal": risk_signal
    }
