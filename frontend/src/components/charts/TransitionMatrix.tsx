"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TransitionMatrixProps {
  matrix: number[][];
  stateMap: { [key: string]: string };
}

const TransitionMatrix: React.FC<TransitionMatrixProps> = ({ matrix, stateMap }) => {
  const states = Object.values(stateMap);
  
  const getCellColor = (value: number) => {
    // Return a gradient of blue based on probability
    const opacity = 0.1 + (value * 0.9);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-6">Transition Matrix</h3>
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {/* Empty corner */}
        <div></div>
        {/* Column Labels */}
        <div className="grid grid-cols-3 gap-2">
          {states.map((state) => (
            <div key={state} className="text-center text-xs text-slate-400 font-medium">
              To {state}
            </div>
          ))}
        </div>

        {/* Matrix Body */}
        {states.map((fromState, i) => (
          <React.Fragment key={fromState}>
            {/* Row Label */}
            <div className="flex items-center text-xs text-slate-400 font-medium h-20 w-20">
              From {fromState}
            </div>
            {/* Row Cells */}
            <div className="grid grid-cols-3 gap-2 h-20">
              {matrix[i].map((value, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i * 3 + j) * 0.05 }}
                  className="relative flex items-center justify-center rounded-lg border border-white/5 overflow-hidden"
                  style={{ backgroundColor: getCellColor(value) }}
                >
                  <span className="relative z-10 text-sm font-bold text-white">
                    {(value * 100).toFixed(1)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <p className="mt-6 text-[10px] text-slate-500 italic">
        Probability of transitioning from current regime (rows) to next regime (columns).
      </p>
    </div>
  );
};

export default TransitionMatrix;
