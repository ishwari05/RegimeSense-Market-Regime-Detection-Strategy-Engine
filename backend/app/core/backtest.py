import pandas as pd
import numpy as np

def run_backtest(df: pd.DataFrame, regimes: list):
    """
    Simulate a regime-based strategy vs Buy & Hold.
    Strategy:
    - Bull: 100% Long
    - Bear: 0% (Cash) or 100% Short (Let's stick to Cash for safety)
    - Sideways: 0% (Stay out)
    """
    # Clone DF to avoid side effects
    data = df.copy()
    data['regime'] = regimes
    data['returns'] = data['log_return']
    
    # Strategy Returns
    # Map regimes to signal: Bull=1, Sideways=0, Bear=0 (or -1 for short)
    data['signal'] = data['regime'].apply(lambda x: 1 if x == "Bull" else 0)
    
    # Shift signal by 1 day because we enter position on next open
    data['strategy_returns'] = data['signal'].shift(1) * data['returns']
    data['strategy_returns'] = data['strategy_returns'].fillna(0)
    
    # Cumulative returns
    data['cum_bh_returns'] = (1 + data['returns']).cumprod()
    data['cum_strategy_returns'] = (1 + data['strategy_returns']).cumprod()
    
    # Metrics
    metrics = {
        "strategy": calculate_metrics(data['strategy_returns']),
        "buy_hold": calculate_metrics(data['returns']),
        "equity_curve": {
            "dates": data.index.strftime('%Y-%m-%d').tolist(),
            "strategy": data['cum_strategy_returns'].tolist(),
            "buy_hold": data['cum_bh_returns'].tolist()
        }
    }
    
    return metrics

def calculate_metrics(returns: pd.Series):
    """
    Calculate Sharpe, Max DD, Win Rate, CAGR.
    """
    # CAGR
    n_days = len(returns)
    total_return = (1 + returns).prod() - 1
    cagr = (1 + total_return) ** (252 / n_days) - 1
    
    # Sharpe (Risk-free rate assumed 0 for simplicity)
    vol = returns.std() * np.sqrt(252)
    sharpe = (returns.mean() * 252) / vol if vol != 0 else 0
    
    # Max Drawdown
    cum_returns = (1 + returns).cumprod()
    rolling_max = cum_returns.cummax()
    drawdown = (cum_returns - rolling_max) / rolling_max
    max_dd = drawdown.min()
    
    # Win Rate
    win_rate = (returns > 0).sum() / len(returns[returns != 0]) if len(returns[returns != 0]) > 0 else 0
    
    return {
        "cagr": float(cagr),
        "sharpe": float(sharpe),
        "max_drawdown": float(max_dd),
        "win_rate": float(win_rate)
    }
