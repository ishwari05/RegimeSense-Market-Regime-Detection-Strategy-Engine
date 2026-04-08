"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus, AlertCircle } from 'lucide-react';

interface Prediction {
  regime: string;
  confidence: number;
}

interface PredictionCardProps {
  prediction: Prediction;
  accuracy: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, accuracy }) => {
  const getRegimeIcon = (regime: string) => {
    switch (regime) {
      case 'Bull': return <ArrowUpRight className="w-8 h-8 text-emerald-500" />;
      case 'Bear': return <ArrowDownRight className="w-8 h-8 text-red-500" />;
      default: return <Minus className="w-8 h-8 text-amber-500" />;
    }
  };

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case 'Bull': return 'text-emerald-500';
      case 'Bear': return 'text-red-500';
      default: return 'text-amber-500';
    }
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-semibold text-white">Next-Day Forecast</h3>
            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                Hybrid Model
            </div>
        </div>

        <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                {getRegimeIcon(prediction.regime)}
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">Predicted Regime</p>
                <h2 className={`text-3xl font-black ${getRegimeColor(prediction.regime)}`}>
                    {prediction.regime}
                </h2>
            </div>
        </div>

        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Model Confidence</span>
                    <span className="text-white font-bold">{(prediction.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence * 100}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500">Historical Accuracy</span>
                    <span className="text-white font-bold">{(accuracy * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${accuracy * 100}%` }}
                        className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-200/50">
            Predictions are based on probabilistic shifts and contain inherent market risk.
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
