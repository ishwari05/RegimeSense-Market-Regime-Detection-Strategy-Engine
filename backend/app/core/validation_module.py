import numpy as np
import pandas as pd
from app.models.hmm_engine import MarketsHMMEngine
from app.models.hybrid_engine import HybridRegimeModel
from app.services.data_engine import normalize_features

def run_walk_forward_validation(df, n_folds=5, initial_train_pct=0.6):
    """
    Implements expanding window walk-forward validation.
    """
    total_len = len(df)
    train_size = int(total_len * initial_train_pct)
    test_step = (total_len - train_size) // n_folds
    
    folds_results = []
    hmm_features = ['log_return', 'volatility']
    
    for i in range(n_folds):
        current_train_end = train_size + (i * test_step)
        current_test_end = current_train_end + test_step
        
        # Ensure we don't go out of bounds
        if current_train_end >= total_len:
            break
            
        train_df = df.iloc[:current_train_end].copy()
        test_df = df.iloc[current_train_end:min(current_test_end, total_len)].copy()
        
        if len(test_df) < 5: # Not enough data to test
            continue
            
        # 1. Train HMM on training window
        train_norm, _ = normalize_features(train_df, hmm_features)
        
        # Ensure we have enough data to train 3 states
        if len(train_norm) < 50:
            continue
            
        try:
            hmm_engine = MarketsHMMEngine(n_states=3)
            train_states = hmm_engine.train(train_norm[hmm_features])
            train_regimes = hmm_engine.label_regimes(train_df, train_states)
            train_probs = hmm_engine.get_probabilities(train_norm[hmm_features])
            
            # 2. Train Hybrid ML on training window
            hybrid_model = HybridRegimeModel()
            X_train, y_train = hybrid_model.prepare_data(train_df, train_probs, train_regimes)
            hybrid_model.train(X_train, y_train)
            
            # 3. Test on unseen data
            test_norm, _ = normalize_features(test_df, hmm_features)
            test_probs = hmm_engine.get_probabilities(test_norm[hmm_features])
            
            # Feature extraction for test set
            X_test = []
            for j in range(len(test_df)):
                row = test_df.iloc[j]
                
                # Guard against HMM returning fewer than 3 states
                prob_feats = [0.0, 0.0, 0.0]
                for k in range(min(test_probs.shape[1], 3)):
                    prob_feats[k] = float(test_probs[j, k])
                    
                feat = [
                    float(row['rsi'] / 100.0),
                    float(row['macd']),
                    float(row['volatility']),
                    float(row['volume_change']),
                    prob_feats[0],
                    prob_feats[1],
                    prob_feats[2]
                ]
                X_test.append(feat)
            
            # Ground truth for test set (using same HMM)
            test_states = hmm_engine.model.predict(test_norm[hmm_features].values)
            test_regimes_names = hmm_engine.label_regimes(test_df, test_states)
            y_test = np.array([hybrid_model.regime_to_labels.get(r, 0) for r in test_regimes_names])
            
            X_test_arr = np.array(X_test, dtype=np.float32)
            y_pred = hybrid_model.model.predict(X_test_arr)
            
            # Metrics
            acc = np.mean(y_pred == y_test)
            
            folds_results.append({
                "fold": i + 1,
                "train_end": str(train_df.index[-1].date()),
                "test_end": str(test_df.index[-1].date()),
                "accuracy": float(acc),
                "sample_size": len(test_df)
            })
        except Exception as e:
            print(f"Skipping fold {i+1} due to error: {e}")
            continue
        
    return {
        "folds": folds_results,
        "avg_accuracy": float(np.mean([f['accuracy'] for f in folds_results])) if folds_results else 0.0,
        "fold_count": len(folds_results)
    }

def analyze_regime_stability(df):
    """
    Compares HMM state characteristics across different time epochs.
    """
    n = len(df)
    # Ensure epochs have significant data
    if n < 300:
        return {"report": [], "is_consistent": False}
        
    epochs = [
        ("Past", df.iloc[:n//3]),
        ("Interim", df.iloc[n//3 : 2*n//3]),
        ("Current", df.iloc[2*n//3 :])
    ]
    
    stability_data = []
    
    for name, subset in epochs:
        hmm_features = ['log_return', 'volatility']
        subset_norm, _ = normalize_features(subset, hmm_features)
        
        try:
            engine = MarketsHMMEngine(n_states=3)
            # Use fixed random seed for reproducibility in stability check
            engine.model.random_state = 42
            states = engine.train(subset_norm[hmm_features])
            
            # Map states to statistics
            temp_df = pd.DataFrame({
                'state': states, 
                'return': subset['log_return'].values, 
                'vol': subset['volatility'].values
            })
            epoch_stats = temp_df.groupby('state').agg({'return': 'mean', 'vol': 'mean'}).reset_index()
            
            # Label based on these specific epoch stats
            # Bull = Highest Return, Bear = Lowest Return
            epoch_stats = epoch_stats.sort_values('return', ascending=False).reset_index(drop=True)
            
            labels = ["Bull", "Sideways", "Bear"]
            formatted_stats = []
            for k in range(len(epoch_stats)):
                formatted_stats.append({
                    "regime": labels[k],
                    "mean_return": float(epoch_stats.iloc[k]['return']),
                    "volatility": float(epoch_stats.iloc[k]['vol'])
                })
            
            stability_data.append({
                "epoch": name,
                "stats": formatted_stats
            })
        except:
            continue
            
    # Consistency check: Bull mean > Bear mean in all epochs
    consistent = len(stability_data) == 3
    for data in stability_data:
        bull = next((s for s in data['stats'] if s['regime'] == 'Bull'), None)
        bear = next((s for s in data['stats'] if s['regime'] == 'Bear'), None)
        if not bull or not bear or bull['mean_return'] <= bear['mean_return']:
            consistent = False
            break
            
    return {
        "report": stability_data,
        "is_consistent": consistent
    }

def get_detailed_feature_importance(hybrid_model):
    """
    Returns formatted feature importance for charting.
    """
    importance = hybrid_model.get_feature_importance()
    if not importance:
        return []
        
    formatted = []
    for name, score in importance.items():
        formatted.append({
            "feature": name.replace('_', ' ').upper(),
            "score": float(score)
        })
        
    return sorted(formatted, key=lambda x: x['score'], reverse=True)
