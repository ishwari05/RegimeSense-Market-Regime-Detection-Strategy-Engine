from hmmlearn.hmm import GaussianHMM
import numpy as np
import pandas as pd

class MarketsHMMEngine:
    def __init__(self, n_states=3):
        self.n_states = n_states
        self.model = GaussianHMM(
            n_components=n_states, 
            covariance_type="full", 
            n_iter=1000, 
            random_state=42
        )
        self.state_map = {} # Maps state index to regime name

    def train(self, features_df: pd.DataFrame):
        """
        Train HMM on feature set.
        Expected features: log_return, volatility.
        """
        X = features_df.values
        self.model.fit(X)
        
        # Predict states
        states = self.model.predict(X)
        return states

    def label_regimes(self, df: pd.DataFrame, states: np.ndarray):
        """
        Heuristic to map states to regimes.
        Bull: High return, Low vol
        Bear: Low (negative) return, High vol
        Sideways: Return near 0, Moderate vol
        """
        temp_df = pd.DataFrame({'state': states, 'return': df['log_return'], 'vol': df['volatility']})
        stats = temp_df.groupby('state').agg({'return': 'mean', 'vol': 'mean'}).reset_index()
        
        # Sort states by return
        stats = stats.sort_values('return', ascending=False).reset_index(drop=True)
        
        # Mapping based on sorted returns
        # 0: Bull (Highest return)
        # 1: Sideways (Middle)
        # 2: Bear (Lowest return)
        self.state_map = {
            stats.iloc[0]['state']: "Bull",
            stats.iloc[1]['state']: "Sideways",
            stats.iloc[2]['state']: "Bear"
        }
        
        regimes = [self.state_map[s] for s in states]
        return regimes

    def get_probabilities(self, features_df: pd.DataFrame):
        """
        Get posterior probabilities for each state.
        """
        X = features_df.values
        probs = self.model.predict_proba(X)
        return probs

    def get_transition_matrix(self):
        """
        Get the transition probability matrix.
        """
        return self.model.transmat_

    def get_state_stats(self):
        """
        Get mean/covar for each state for visualization.
        """
        return {
            "means": self.model.means_.tolist(),
            "covars": self.model.covars_.tolist()
        }
