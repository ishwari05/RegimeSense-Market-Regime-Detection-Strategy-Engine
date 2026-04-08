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
} from 'recharts';

interface ChartData {
  date: string;
  prob_bull: number;
  prob_bear: number;
  prob_sideways: number;
}

interface ProbabilityStreamProps {
  data: ChartData[];
}

const ProbabilityStream: React.FC<ProbabilityStreamProps> = ({ data }) => {
  return (
    <div className="w-full h-[300px] glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Regime Probabilities</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
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
            domain={[0, 1]}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#141417', border: '1px solid #1e293b', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
          />
          <Area
            type="monotone"
            dataKey="prob_bull"
            stackId="1"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.4}
            name="Bull Prob"
          />
          <Area
            type="monotone"
            dataKey="prob_sideways"
            stackId="1"
            stroke="#f59e0b"
            fill="#f59e0b"
            fillOpacity={0.4}
            name="Sideways Prob"
          />
          <Area
            type="monotone"
            dataKey="prob_bear"
            stackId="1"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.4}
            name="Bear Prob"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProbabilityStream;
