"use client";

import React from 'react';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';

interface ChartData {
  date: string;
  price: number;
  regime: string;
}

interface RegimeOverlayProps {
  data: ChartData[];
}

const RegimeOverlay: React.FC<RegimeOverlayProps> = ({ data }) => {
  // Group data into contiguous regime blocks for ReferenceArea
  const regimeBlocks: { start: string; end: string; regime: string }[] = [];
  
  if (data.length > 0) {
    let currentBlock = {
      start: data[0].date,
      end: data[0].date,
      regime: data[0].regime,
    };

    for (let i = 1; i < data.length; i++) {
        if (data[i].regime === currentBlock.regime) {
            currentBlock.end = data[i].date;
        } else {
            regimeBlocks.push(currentBlock);
            currentBlock = {
                start: data[i].date,
                end: data[i].date,
                regime: data[i].regime,
            };
        }
    }
    regimeBlocks.push(currentBlock);
  }

  const getRegimeColor = (regime: string) => {
    switch (regime) {
      case 'Bull': return 'rgba(16, 185, 129, 0.15)';
      case 'Bear': return 'rgba(239, 68, 68, 0.15)';
      case 'Sideways': return 'rgba(245, 158, 11, 0.15)';
      default: return 'transparent';
    }
  };

  return (
    <div className="w-full h-[400px] glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Price & Regime Overlay</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500 rounded"></div>
            <span>Bull</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500/20 border border-amber-500 rounded"></div>
            <span>Sideways</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded"></div>
            <span>Bear</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141417', border: '1px solid #1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          {regimeBlocks.map((block, idx) => (
            <ReferenceArea
              key={idx}
              x1={block.start}
              x2={block.end}
              fill={getRegimeColor(block.regime)}
              strokeOpacity={0}
            />
          ))}
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2} 
            dot={false}
            animationDuration={1500}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegimeOverlay;
