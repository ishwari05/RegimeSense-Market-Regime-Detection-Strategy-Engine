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
    <div className="glass-card p-5">
      <div className="flex justify-between items-start mb-5">
          <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Next-Day Forecast</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Hybrid ML Signal</p>
          </div>
          <div className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${prediction.confidence > 0.7 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
              Signal: {prediction.confidence > 0.7 ? 'Strong' : 'Mixed'}
          </div>
      </div>

      <div className="flex items-center gap-4 mb-6 p-3 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
              {getRegimeIcon(prediction.regime)}
          </div>
          <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Verdict</p>
              <h2 className={`text-xl font-black tracking-tight ${getRegimeColor(prediction.regime)}`}>
                  {prediction.regime}
              </h2>
          </div>
      </div>

      <div className="space-y-4">
          <div>
              <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wider font-bold">
                  <span className="text-slate-500 text-[9px]">Model Confidence</span>
                  <span className="text-white">{(prediction.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence * 100}%` }}
                      className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
              </div>
          </div>
          <div>
              <div className="flex justify-between text-[10px] mb-1.5 uppercase tracking-wider font-bold">
                  <span className="text-slate-500 text-[9px]">Historical Accuracy</span>
                  <span className="text-white">{(accuracy * 100).toFixed(1)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${accuracy * 100}%` }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
              </div>
          </div>
      </div>

      <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5 opacity-60">
        <AlertCircle className="w-3 h-3 text-slate-500 shrink-0" />
        <p className="text-[8px] text-slate-500 leading-tight italic">
            Predictions contain inherent market risk. Verify with price action.
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
