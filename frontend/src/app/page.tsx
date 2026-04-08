"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, ShieldCheck, Zap, ArrowRight, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">RegimeSense</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#technology" className="hover:text-white transition-colors">Technology</a>
            <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent -z-10 blur-[120px]" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 inline-block">
              Uncover the Hidden DNA of Markets
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              Market Regime <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Intelligence.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Detect latent Bull, Bear, and Sideways states using Hidden Markov Models. 
              Quantify transitions and stay ahead of structural shifts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/dashboard"
                className="group w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all text-lg"
              >
                Start Analyzing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg">
                View Methodology
              </button>
            </div>
          </motion.div>

          {/* Abstract Grid Image/Graphic Placeholder */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative px-4"
          >
            <div className="max-w-4xl mx-auto aspect-video glass-card border-white/10 p-4 shadow-2xl shadow-blue-500/10 relative">
               {/* Simulating a dashboard UI snippet */}
               <div className="w-full h-full bg-[#0a0a0c] rounded-xl overflow-hidden flex flex-col p-6 text-left">
                  <div className="flex justify-between items-center mb-8">
                     <div className="h-6 w-32 bg-white/10 rounded-full animate-pulse" />
                     <div className="h-6 w-16 bg-blue-600/20 rounded-full" />
                  </div>
                  <div className="flex-1 flex items-end gap-2">
                     {[40, 70, 45, 90, 65, 80, 50, 60, 85, 40].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                          className={`flex-1 rounded-t-lg ${i % 3 === 0 ? 'bg-red-500/40' : i % 3 === 1 ? 'bg-emerald-500/40' : 'bg-amber-500/40'}`} 
                        />
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                <BarChart3 className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">Unsupervised Detection</h3>
              <p className="text-slate-400 leading-relaxed">
                Hidden Markov Models automatically cluster market behavior into Bull, Bear, and Sideways states without manual labels.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                <Zap className="w-7 h-7 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold">Hybrid Predictions</h3>
              <p className="text-slate-400 leading-relaxed">
                We combine latent state probabilities with XGBoost gradient boosting to forecast upcoming regime transitions with high precision.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                <ShieldCheck className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold">Verified Strategies</h3>
              <p className="text-slate-400 leading-relaxed">
                Battle-test your regime-based strategies against historical data and compare performance vs Buy & Hold across any asset class.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">
          © 2026 RegimeSense Platform. Built for Institutional-Grade Intelligence.
        </p>
      </footer>
    </div>
  );
}
