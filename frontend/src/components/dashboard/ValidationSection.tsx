'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  FlaskConical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';

interface ValidationData {
    walk_forward: {
        folds: any[];
        avg_accuracy: number;
        fold_count: number;
    };
    stability: {
        report: any[];
        is_consistent: boolean;
    };
    feature_importance: any[];
}

const ValidationSection: React.FC<{ data: ValidationData }> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!data) return null;

    return (
        <div className="mt-12">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 glass-card border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-all group"
            >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Research & Validation Deep-Dive</h2>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Scientific Rigor & Backtest Stability Metrics</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span className="text-[10px] text-emerald-500 font-bold uppercase">Validated</span>
                    </div>
                    {isOpen ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 space-y-8">
                            {/* Top Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Avg Walk-Forward Acc</p>
                                    <h3 className="text-3xl font-black text-white">{(data.walk_forward.avg_accuracy * 100).toFixed(1)}%</h3>
                                    <div className="mt-2 text-[10px] text-blue-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Across {data.walk_forward.fold_count} expanding folds
                                    </div>
                                </div>
                                <div className="glass-card p-6 border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Regime Consistency</p>
                                    <h3 className={`text-3xl font-black ${data.stability.is_consistent ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {data.stability.is_consistent ? 'High' : 'Partial'}
                                    </h3>
                                    <div className="mt-2 text-[10px] text-slate-400">Stable characteristics over time</div>
                                </div>
                                <div className="glass-card p-6 border-white/5">
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Primary Driver</p>
                                    <h3 className="text-xl font-black text-blue-400 truncate">{data.feature_importance[0]?.feature}</h3>
                                    <div className="mt-2 text-[10px] text-slate-400">Most significant ML feature</div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Walk-Forward Chart */}
                                <div className="glass-card p-6 border-white/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Walk-Forward Performance</h4>
                                        <span className="text-[10px] text-slate-500 font-bold bg-white/5 px-2 py-0.5 rounded">Expanding Window</span>
                                    </div>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={data.walk_forward.folds}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                                <XAxis dataKey="fold" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                                                <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} domain={[0, 1]} />
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#3b82f6', fontSize: '12px' }}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="accuracy" 
                                                    stroke="#3b82f6" 
                                                    strokeWidth={3} 
                                                    dot={{ r: 4, fill: '#3b82f6' }}
                                                    activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Feature Importance Chart */}
                                <div className="glass-card p-6 border-white/5">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Hybrid Feature Contribution</h4>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data.feature_importance.slice(0, 6)} layout="vertical">
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                                <XAxis type="number" hide />
                                                <YAxis 
                                                    dataKey="feature" 
                                                    type="category" 
                                                    stroke="#ffffff60" 
                                                    fontSize={9} 
                                                    axisLine={false} 
                                                    tickLine={false}
                                                    width={100}
                                                />
                                                <Tooltip 
                                                    cursor={{ fill: '#ffffff05' }}
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#60a5fa', fontSize: '11px' }}
                                                />
                                                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                                                    {data.feature_importance.map((_, i) => (
                                                        <Cell key={`cell-${i}`} fill={i === 0 ? '#3b82f6' : '#3b82f640'} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>

                            {/* Regime Stability Analysis */}
                            <div className="glass-card p-6 border-white/5">
                                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 text-center">Cross-Epoch Regime Stability Analysis</h4>
                               <div className="overflow-x-auto">
                                   <table className="w-full text-left">
                                       <thead>
                                           <tr className="border-b border-white/5">
                                               <th className="pb-3 text-[10px] uppercase text-slate-500 font-bold">Epoch Period</th>
                                               <th className="pb-3 text-[10px] uppercase text-emerald-500 font-bold">Bull Mean Ret</th>
                                               <th className="pb-3 text-[10px] uppercase text-emerald-500 font-bold">Bull Volatility</th>
                                               <th className="pb-3 text-[10px] uppercase text-rose-500 font-bold">Bear Mean Ret</th>
                                               <th className="pb-3 text-[10px] uppercase text-rose-500 font-bold">Bear Volatility</th>
                                           </tr>
                                       </thead>
                                       <tbody className="divide-y divide-white/5">
                                           {data.stability.report.map((epoch, idx) => {
                                               const bull = epoch.stats.find((s: any) => s.regime === 'Bull');
                                               const bear = epoch.stats.find((s: any) => s.regime === 'Bear');
                                               return (
                                                   <tr key={idx} className="group hover:bg-white/5 transition-colors">
                                                       <td className="py-4 text-xs font-bold text-white">{epoch.epoch} Window</td>
                                                       <td className="py-4 text-xs font-mono text-emerald-400">{(bull?.mean_return * 100).toFixed(3)}%</td>
                                                       <td className="py-4 text-xs font-mono text-emerald-400">{(bull?.volatility * 100).toFixed(2)}%</td>
                                                       <td className="py-4 text-xs font-mono text-rose-400">{(bear?.mean_return * 100).toFixed(3)}%</td>
                                                       <td className="py-4 text-xs font-mono text-rose-400">{(bear?.volatility * 100).toFixed(2)}%</td>
                                                   </tr>
                                               );
                                           })}
                                       </tbody>
                                   </table>
                               </div>
                               <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-4">
                                   <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
                                   <p className="text-xs text-slate-400 leading-relaxed">
                                       <span className="text-emerald-500 font-bold">Conclusion:</span> The {data.stability.is_consistent ? 'high level' : 'moderate level'} of characteristic stability indicates that the HMM latent states successfully capture invariant structural market properties across time, justifying the use of these states as features for the predictive hybrid model.
                                   </p>
                               </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValidationSection;
