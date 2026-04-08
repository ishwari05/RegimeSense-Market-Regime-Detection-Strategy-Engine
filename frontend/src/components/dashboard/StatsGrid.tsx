"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Activity, Target } from 'lucide-react';

interface Metric {
  label: string;
  strategy: number;
  bh: number;
  icon: React.ReactNode;
  format: (v: number) => string;
}

interface StatsGridProps {
  strategy: any;
  bh: any;
}

const StatsGrid: React.FC<StatsGridProps> = ({ strategy, bh }) => {
  const metrics: Metric[] = [
    {
      label: 'CAGR',
      strategy: strategy.cagr,
      bh: bh.cagr,
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      format: (v) => `${(v * 100).toFixed(2)}%`,
    },
    {
      label: 'Sharpe Ratio',
      strategy: strategy.sharpe,
      bh: bh.sharpe,
      icon: <Activity className="w-5 h-5 text-emerald-500" />,
      format: (v) => v.toFixed(2),
    },
    {
      label: 'Max Drawdown',
      strategy: strategy.max_drawdown,
      bh: bh.max_drawdown,
      icon: <Shield className="w-5 h-5 text-red-500" />,
      format: (v) => `${(v * 100).toFixed(2)}%`,
    },
    {
      label: 'Win Rate',
      strategy: strategy.win_rate,
      bh: bh.win_rate,
      icon: <Target className="w-5 h-5 text-amber-500" />,
      format: (v) => `${(v * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/5 rounded-lg">{m.icon}</div>
            <span className="text-sm font-medium text-slate-400">{m.label}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-500 mb-1">Strategy</div>
              <div className="text-2xl font-bold text-white">{m.format(m.strategy)}</div>
            </div>
            <div className="pt-3 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Buy & Hold</span>
                <span className={m.strategy > m.bh ? 'text-emerald-500' : 'text-slate-400'}>
                    {m.format(m.bh)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;
