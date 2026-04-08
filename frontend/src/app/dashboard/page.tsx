"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import StatsGrid from '@/components/dashboard/StatsGrid';
import PredictionCard from '@/components/dashboard/PredictionCard';
import RegimeOverlay from '@/components/charts/RegimeOverlay';
import ProbabilityStream from '@/components/charts/ProbabilityStream';
import TransitionMatrix from '@/components/charts/TransitionMatrix';
import EquityCurve from '@/components/charts/EquityCurve';
import { analyzeMarket } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (ticker: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeMarket(ticker);
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to analyze market. Please try another ticker.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze('SPY');
  }, []);

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-white overflow-hidden">
      <Sidebar onAnalyze={handleAnalyze} isLoading={loading} />
      
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              <p className="text-slate-400 font-medium animate-pulse">Computing latent states and regime transitions...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center gap-4 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold">Analysis Failed</h2>
              <p className="text-slate-400 max-w-md">{error}</p>
              <button 
                onClick={() => handleAnalyze('SPY')}
                className="mt-4 px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                Go back to SPY
              </button>
            </motion.div>
          ) : data && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-black tracking-tight">{data.ticker} Dashboard</h1>
                  <p className="text-slate-500 mt-1">Multi-state Market Intelligence Report</p>
                </div>
                <div className="flex gap-2">
                    {Object.entries(data.state_map).map(([index, name]: [string, any]) => (
                        <div key={index} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            State {index}: {name}
                        </div>
                    ))}
                </div>
              </div>

              <StatsGrid strategy={data.backtest.strategy} bh={data.backtest.buy_hold} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <RegimeOverlay data={data.chart_data} />
                  <ProbabilityStream data={data.chart_data} />
                  <EquityCurve data={data.backtest.equity_curve} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <TransitionMatrix 
                      matrix={data.transition_matrix} 
                      stateMap={data.state_map} 
                    />
                    <div className="glass-card p-6 h-full">
                      <h3 className="text-lg font-semibold text-white mb-4">Model Insights</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-1 h-auto bg-blue-500 rounded-full" />
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Currectly in <span className="text-white font-bold">{data.chart_data[data.chart_data.length-1].regime}</span> regime.
                            Expecting volatility to {data.next_prediction.regime === 'Bear' ? 'increase' : 'stabilize'}.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-1 h-auto bg-emerald-500 rounded-full" />
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Transition probability to {data.next_prediction.regime} is {(data.next_prediction.confidence * 100).toFixed(0)}%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <PredictionCard 
                    prediction={data.next_prediction} 
                    accuracy={data.accuracy} 
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
