'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Info
} from 'lucide-react';

interface InsightPanelProps {
    insights: {
        regime: string;
        confidence: number;
        insights: string[];
        risk_signal: string;
    };
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insights }) => {
    if (!insights || !insights.insights) {
        return (
            <div className="glass-card p-6 h-full flex items-center justify-center text-slate-500 text-sm italic">
                Awaiting model insights...
            </div>
        );
    }

    const getRegimeColor = (regime: string) => {
        switch (regime) {
            case 'Bull': return 'text-emerald-400';
            case 'Bear': return 'text-rose-400';
            default: return 'text-amber-400';
        }
    };

    const getRiskBadge = (risk: string) => {
        switch (risk) {
            case 'High': return 'bg-rose-500/20 text-rose-400 border-rose-500/20';
            case 'Moderate': return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
            default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20';
        }
    };

    return (
        <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Model Insights</h3>
                </div>
                <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border ${getRiskBadge(insights.risk_signal)}`}>
                    Risk: {insights.risk_signal}
                </div>
            </div>

            <div className="mb-5 p-3 bg-white/5 rounded-xl border border-white/5 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Current Analysis</span>
                    <span className="text-[9px] text-slate-400">{(insights.confidence * 100).toFixed(0)}% confidence</span>
                </div>
                <p className="text-lg font-black flex items-center gap-2 tracking-tight">
                    <span className={getRegimeColor(insights.regime)}>{insights.regime}</span>
                    <span className="text-slate-500 text-[10px] font-bold uppercase">Regime</span>
                </p>
            </div>

            <div className="space-y-3">
                {insights.insights.map((insight, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-2 group"
                    >
                        <div className="mt-1">
                            <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal group-hover:text-slate-200 transition-colors">
                            {insight}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex gap-2 items-start opacity-60">
                    <Info className="w-3 h-3 text-slate-500 mt-0.5 shrink-0" />
                    <p className="text-[9px] text-slate-500 leading-tight italic">
                        Insights are derived from multi-state momentum features and transitional probability matrices.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InsightPanel;
