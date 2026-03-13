import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, Code, BarChart } from 'lucide-react';

export const Hero = ({ onExplore, onDeveloperStart }: { onExplore?: () => void, onDeveloperStart?: () => void }) => {
  const [text, setText] = useState('');
  const fullText = "The Future of AI Collaboration is Here.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50) as any;
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Particles Simulation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} />
          <span>Next-Gen Agent Marketplace</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Discover & Deploy <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Intelligent AI Agents
          </span>
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 h-8">
          {text}<span className="animate-pulse">|</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all neon-glow group"
          >
            Explore Marketplace
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onDeveloperStart}
            className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-xl font-bold text-lg transition-all"
          >
            Get Started as Developer
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { icon: Bot, label: "750+ Agents", color: "text-indigo-400" },
            { icon: Code, label: "API Ready", color: "text-emerald-400" },
            { icon: Shield, label: "Verified Devs", color: "text-amber-400" },
            { icon: BarChart, label: "Live Metrics", color: "text-purple-400" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass p-4 rounded-2xl flex flex-col items-center gap-2"
            >
              <item.icon className={item.color} size={24} />
              <span className="text-sm font-medium text-slate-300">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Shield = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
