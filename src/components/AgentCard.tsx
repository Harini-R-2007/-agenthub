import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Zap, BarChart3, ExternalLink } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[400px] w-full perspective-1000 cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass rounded-3xl p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center overflow-hidden border border-white/10">
              {agent.logoUrl ? (
                <img src={agent.logoUrl} alt={agent.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
              ) : (
                <Zap className="text-indigo-400" size={24} />
              )}
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg text-xs font-bold">
              <ShieldCheck size={14} />
              <span>Verified</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
          <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
            {agent.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {agent.capabilities.slice(0, 3).map((cap, i) => (
              <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-white/5 px-2 py-1 rounded border border-white/10">
                {cap}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-1">
              <Star className="text-amber-400 fill-amber-400" size={14} />
              <span className="text-sm font-bold">4.9</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('try-agent', { detail: agent }));
              }}
              className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-indigo-500/30"
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden glass rounded-3xl p-6 flex flex-col rotate-y-180 bg-slate-900/90">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-indigo-400" />
            Performance Metrics
          </h3>

          <div className="space-y-4 flex-1">
            {[
              { label: "Accuracy", value: agent.performance.accuracy * 100, color: "bg-emerald-500" },
              { label: "Reliability", value: agent.performance.reliability * 100, color: "bg-indigo-500" },
              { label: "Security", value: agent.securityScore * 100, color: "bg-amber-500" },
              { label: "Latency", value: agent.performance.latency, unit: "ms", color: "bg-purple-500", max: 1000 }
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{metric.label}</span>
                  <span className="font-bold">{metric.value}{metric.unit || '%'}</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.unit === 'ms' ? (1 - metric.value / metric.max) * 100 : metric.value}%` }}
                    className={`h-full ${metric.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(new CustomEvent('try-agent', { detail: agent }));
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-4 neon-glow"
          >
            Try Now <ExternalLink size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
