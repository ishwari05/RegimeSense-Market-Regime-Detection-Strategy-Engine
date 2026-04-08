import xgboost as xgb
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

class HybridRegimeModel:
    def __init__(self):
        self.model = xgb.XGBClassifier(
            objective="multi:softprob",
            num_class=3,
            eval_metric="mlogloss",
            use_label_encoder=False,
            random_state=42
        )
        self.regime_to_labels = {"Bull": 0, "Sideways": 1, "Bear": 2}
        self.labels_to_regime = {0: "Bull", 1: "Sideways", 2: "Bear"}

    def prepare_data(self, df: pd.DataFrame, hmm_probs: np.ndarray, regimes: list):
        """
        Combine HMM outputs with original features to predict NEXT regime.
        """
        # Current HMM features
        features = df[['rsi', 'macd', 'volatility', 'volume_change']].copy()
        for i in range(hmm_probs.shape[1]):
            features[f'hmm_prob_{i}'] = hmm_probs[:, i]
        
        # Target: Next day's regime label
        labels = [self.regime_to_labels[r] for r in regimes]
        target = pd.Series(labels).shift(-1) # Predict next day
        
        # Drop last row
        features = features.iloc[:-1]
        target = target.iloc[:-1]
        
        # Final clean-up for XGBoost (remove any potential stray NaNs or Infs)
        mask = ~(features.isna().any(axis=1) | target.isna())
        features = features[mask]
        target = target[mask]
        
        return features, target

    def train(self, X: pd.DataFrame, y: pd.Series):
        """
        Train XGBoost classifier.
        """
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.model.fit(X_train, y_train)
        
        preds = self.model.predict(X_test)
        accuracy = accuracy_score(y_test, preds)
        return accuracy

    def predict_next(self, current_features: pd.DataFrame, current_hmm_probs: np.ndarray):
        """
        Predict next day's regime.
        """
        # Prepare single row feature vector
        row = current_features[['rsi', 'macd', 'volatility', 'volume_change']].iloc[-1:].copy()
        for i in range(current_hmm_probs.shape[1]):
            row[f'hmm_prob_{i}'] = current_hmm_probs[-1, i]
            
        pred_label = self.model.predict(row)[0]
        confidence = np.max(self.model.predict_proba(row))
        
        return {
            "regime": self.labels_to_regime[pred_label],
            "confidence": float(confidence)
        }
