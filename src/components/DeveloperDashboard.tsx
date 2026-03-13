import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Award, Zap, Shield, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DeployAgentModal } from './DeployAgentModal';
import { Agent } from '../types';

const MOCK_ANALYTICS = [
  { name: 'Mon', usage: 4000, revenue: 2400 },
  { name: 'Tue', usage: 3000, revenue: 1398 },
  { name: 'Wed', usage: 2000, revenue: 9800 },
  { name: 'Thu', usage: 2780, revenue: 3908 },
  { name: 'Fri', usage: 1890, revenue: 4800 },
  { name: 'Sat', usage: 2390, revenue: 3800 },
  { name: 'Sun', usage: 3490, revenue: 4300 },
];

const LEADERBOARD = [
  { id: 1, name: 'ChatGPT-4o', score: 98.5, growth: '+12%', category: 'LLM' },
  { id: 2, name: 'Claude 3.5 Sonnet', score: 97.2, growth: '+8%', category: 'LLM' },
  { id: 3, name: 'Midjourney v6', score: 95.8, growth: '+15%', category: 'Image' },
  { id: 4, name: 'Perplexity Pro', score: 94.1, growth: '+5%', category: 'Search' },
  { id: 5, name: 'Gamma AI', score: 92.4, growth: '+20%', category: 'Presentation' },
];

export const DeveloperDashboard = ({ onBack, onAddAgent }: { onBack: () => void, onAddAgent: (agent: Partial<Agent>) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeploy = (agentData: Partial<Agent>) => {
    onAddAgent(agentData);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Developer Dashboard</h1>
            <p className="text-slate-400">Monitor your agents, track performance, and climb the leaderboard.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition-all neon-glow"
            >
              Deploy New Agent
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total API Calls', value: '1.2M', icon: Zap, color: 'text-amber-400' },
            { label: 'Active Users', value: '45.2K', icon: Users, color: 'text-indigo-400' },
            { label: 'Avg. Latency', value: '142ms', icon: TrendingUp, color: 'text-emerald-400' },
            { label: 'Platform Rank', value: '#12', icon: Award, color: 'text-rose-400' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <span className="text-xs font-bold text-emerald-400">+12.5%</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Analytics Chart */}
          <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BarChart3 size={20} className="text-indigo-400" />
                Usage Analytics
              </h2>
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_ANALYTICS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Bar dataKey="usage" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="glass p-8 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
              <Award size={20} className="text-amber-400" />
              Global Leaderboard
            </h2>
            <div className="space-y-6">
              {LEADERBOARD.map((item, i) => (
                <div key={item.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${i < 3 ? 'text-amber-400' : 'text-slate-500'}`}>
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-bold group-hover:text-indigo-400 transition-colors">{item.name}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{item.score}%</div>
                    <div className="text-[10px] text-emerald-400">{item.growth}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-white/10 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors">
              View Full Rankings
            </button>
          </div>
        </div>

        {/* Security & Compliance */}
        <div className="mt-8 glass p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold">Security Compliance</h3>
              <p className="text-sm text-slate-400">Your agents are currently meeting all platform security standards.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase">Verified</div>
            <div className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold rounded-full uppercase">SOC2 Type II</div>
          </div>
        </div>
      </div>
      <DeployAgentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onDeploy={handleDeploy} 
      />
    </div>
  );
};
