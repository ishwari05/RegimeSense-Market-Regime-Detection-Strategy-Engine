import yfinance as yf
import pandas as pd
import numpy as np

def fetch_market_data(ticker: str, period: str = "5y", interval: str = "1d"):
    """
    Fetch market data from Yahoo Finance.
    """
    data = yf.download(ticker, period=period, interval=interval)
    if data.empty:
        raise ValueError(f"No data found for ticker {ticker}")
    return data

def compute_features(df: pd.DataFrame):
    """
    Compute features for regime detection:
    - Log returns
    - Rolling volatility
    - RSI
    - MACD
    - Volume changes
    """
    # Use 'Close' column for returns
    df = df.copy()
    
    # Log Returns
    df['log_return'] = np.log(df['Close'] / df['Close'].shift(1))
    
    # Rolling Volatility (20-day)
    df['volatility'] = df['log_return'].rolling(window=20).std() * np.sqrt(252)
    
    # RSI (14-day)
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df['rsi'] = 100 - (100 / (1 + rs))
    
    # MACD
    exp1 = df['Close'].ewm(span=12, adjust=False).mean()
    exp2 = df['Close'].ewm(span=26, adjust=False).mean()
    df['macd'] = exp1 - exp2
    df['macd_signal'] = df['macd'].ewm(span=9, adjust=False).mean()
    
    # Volume changes
    df['volume_change'] = df['Volume'].pct_change()
    
    # Price normalized (for plotting)
    df['price_norm'] = df['Close'] / df['Close'].iloc[0]
    
    # Replace Infinity with NaN and then drop all NaNs
    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    df.dropna(inplace=True)
    
    # Clip extreme values (safety for XGBoost)
    cols_to_clip = ['log_return', 'volatility', 'rsi', 'macd', 'volume_change']
    for col in cols_to_clip:
        if col in df.columns:
            df[col] = np.clip(df[col], -1e9, 1e9)
            
    return df

def normalize_features(df: pd.DataFrame, features: list):
    """
    Standardize features for HMM.
    """
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler()
    df_norm = df.copy()
    df_norm[features] = scaler.fit_transform(df[features])
    return df_norm, scaler
