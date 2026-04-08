"use client";

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface EquityCurveProps {
  data: {
    dates: string[];
    strategy: number[];
    buy_hold: number[];
  };
}

const EquityCurve: React.FC<EquityCurveProps> = ({ data }) => {
  const chartData = data.dates.map((date, i) => ({
    date,
    strategy: data.strategy[i],
    buy_hold: data.buy_hold[i],
  }));

  return (
    <div className="w-full h-[400px] glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Performance Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorStrategy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorBH" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            minTickGap={60}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => `${((val - 1) * 100).toFixed(0)}%`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141417', border: '1px solid #1e293b', borderRadius: '8px' }}
            formatter={(value: number) => [`${((value - 1) * 100).toFixed(2)}%`, '']}
          />
          <Legend verticalAlign="top" height={36}/>
          <Area
            type="monotone"
            dataKey="strategy"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorStrategy)"
            name="Regime strategy"
          />
          <Area
            type="monotone"
            dataKey="buy_hold"
            stroke="#94a3b8"
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1}
            fill="url(#colorBH)"
            name="Buy & Hold"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EquityCurve;
