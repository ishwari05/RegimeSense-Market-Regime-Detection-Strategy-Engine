"use client";

import React, { useState } from 'react';
import { Search, Info, Settings, BarChart2 } from 'lucide-react';

interface SidebarProps {
  onAnalyze: (ticker: string) => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onAnalyze, isLoading }) => {
  const [ticker, setTicker] = useState('SPY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker) onAnalyze(ticker.toUpperCase());
  };

  return (
    <div className="w-80 h-screen border-r border-white/5 p-6 flex flex-col gap-8 bg-[#0a0a0c]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <BarChart2 className="text-white w-6 h-6" />
        </div>
        <div>
            <h1 className="text-xl font-bold text-white tracking-tight">RegimeSense</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Intelligence</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-xs font-semibold text-slate-500 uppercase">Market Asset</label>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
                type="text" 
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Ticker (e.g. RELIANCE.NS)"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
        </div>
        <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
        >
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </form>

      {/* Indian Markets Quick Select */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase">Indian Markets</h3>
        <div className="grid grid-cols-2 gap-2">
            {[
                { label: 'Nifty 50', symbol: '^NSEI' },
                { label: 'Bank Nifty', symbol: '^NSEBANK' },
                { label: 'Reliance', symbol: 'RELIANCE.NS' },
                { label: 'TCS', symbol: 'TCS.NS' },
            ].map((market) => (
                <button
                    key={market.symbol}
                    onClick={() => {
                        setTicker(market.symbol);
                        onAnalyze(market.symbol);
                    }}
                    className="p-2 bg-white/5 border border-white/5 rounded-lg text-[10px] text-slate-300 hover:bg-white/10 hover:border-blue-500/30 transition-all text-left"
                >
                    {market.label}
                </button>
            ))}
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-4">Core Model</h3>
            <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-white/5">
                    <span className="text-sm text-slate-300">Gaussian HMM</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Active</span>
                </div>
                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between border border-white/5">
                    <span className="text-sm text-slate-300">Hybrid XGBoost</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Optimized</span>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase mb-4">Settings</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Confidence Threshold</span>
                    <span className="text-xs text-white">75%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
            </div>
        </div>
      </div>

      <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
        <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-200/60 leading-relaxed">
                Regime detection uses a latent state approach to identify shifts in volatility and mean-return clusters.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
