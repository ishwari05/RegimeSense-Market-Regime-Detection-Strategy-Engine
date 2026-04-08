import sys
import os
# Add the current directory to sys.path to allow imports from app.
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

import pandas as pd
import numpy as np
from app.services.data_engine import fetch_market_data, compute_features
from app.core.validation_module import run_walk_forward_validation, analyze_regime_stability

def test_validation():
    print("Fetching data...")
    try:
        df = fetch_market_data("SPY", "2y")
        df = compute_features(df)
        
        print("Running Walk-Forward...")
        wf = run_walk_forward_validation(df)
        print("Walk-Forward Success!")
        
        print("Running Stability Analysis...")
        stab = analyze_regime_stability(df)
        print("Stability Success!")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_validation()
