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
    <div className="glass-card p-5">
      <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Stability Matrix</h3>
          <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] text-slate-500 font-bold uppercase">Prob. Density</div>
      </div>

      <div className="grid grid-cols-[38px_1fr] gap-y-2">
        {/* Column Labels */}
        <div />
        <div className="grid grid-cols-3 gap-1.5 mb-1">
          {states.map((state) => (
            <div key={state} className="text-[10px] text-center text-slate-500 font-bold uppercase truncate">
                {state.slice(0, 4)}
            </div>
          ))}
        </div>

        {/* Matrix Body */}
        {states.map((fromState, i) => (
          <React.Fragment key={fromState}>
            {/* Row Label */}
            <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase pr-2 border-r border-white/5">
                {fromState.slice(0, 4)}
            </div>
            {/* Row Cells */}
            <div className="grid grid-cols-3 gap-1.5 h-14">
              {matrix[i].map((value, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (i * 3 + j) * 0.05 }}
                  className="relative flex items-center justify-center rounded-lg border border-white/5 shadow-inner"
                  style={{ backgroundColor: getCellColor(value) }}
                >
                  <span className="relative z-10 text-xs font-black text-white">
                    {(value * 100).toFixed(0)}%
                  </span>
                </motion.div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-white/5">
        <p className="text-[9px] text-slate-500 leading-tight italic">
            Relative probability of regime transitions for the next session. High diagonal values indicate regime persistence.
        </p>
      </div>
    </div>
  );
};

export default TransitionMatrix;
