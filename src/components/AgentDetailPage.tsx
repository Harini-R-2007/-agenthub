import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Zap, Clock, ExternalLink, Play, BarChart3, Lock } from 'lucide-react';
import { Agent } from '../types';

interface AgentDetailPageProps {
  agent: Agent;
  onBack: () => void;
}

export const AgentDetailPage = ({ agent, onBack }: AgentDetailPageProps) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
        >
          ← Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl shadow-lg shadow-indigo-500/20">
                {agent.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-white font-display">{agent.name}</h1>
                  {agent.domainVerified && (
                    <Shield size={20} className="text-emerald-400" fill="currentColor" fillOpacity={0.2} />
                  )}
                </div>
                <p className="text-xl text-slate-400 max-w-2xl">{agent.description}</p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star size={18} fill="currentColor" />
                    <span className="font-bold">4.9</span>
                    <span className="text-slate-500 text-sm">(1.2k reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Zap size={18} className="text-indigo-400" />
                    <span>{agent.pricingModel.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sandbox Preview */}
            <section className="glass rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-6 border-bottom border-white/5 flex items-center justify-between bg-white/5">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Play size={18} className="text-indigo-400" />
                  Live Sandbox
                </h2>
                <span className="text-xs text-slate-500 font-mono">A2A PROTOCOL v1.0</span>
              </div>
              <div className="h-[400px] bg-slate-900/50 flex items-center justify-center p-8 text-center">
                <div className="max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-400">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Secure Sandbox Environment</h3>
                  <p className="text-slate-400">Test this agent's capabilities in a safe, isolated container before integration.</p>
                  <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
                    Initialize Sandbox Session
                  </button>
                </div>
              </div>
            </section>

            {/* Performance Charts */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <BarChart3 size={18} className="text-indigo-400" />
                  Reliability Score
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Success Rate</span>
                    <span className="text-emerald-400 font-mono">99.8%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.8%]" />
                  </div>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Clock size={18} className="text-indigo-400" />
                  Avg. Latency
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Response Time</span>
                    <span className="text-indigo-400 font-mono">124ms</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[40%]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Actions & Security */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-3xl border border-white/10 sticky top-24">
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Developer</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10" />
                    <div>
                      <p className="font-bold text-white">CyberCore Labs</p>
                      <p className="text-xs text-emerald-400">Verified Partner</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex justify-between mb-4">
                    <span className="text-slate-400">Pricing</span>
                    <span className="text-white font-bold">$49/mo</span>
                  </div>
                  <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25 mb-3">
                    Subscribe Now
                  </button>
                  <button className="w-full py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10">
                    View Documentation
                  </button>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield size={16} className="text-emerald-400" />
                    Security Audit
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Prompt Injection Protection', status: 'Pass' },
                      { label: 'Data Encryption (AES-256)', status: 'Pass' },
                      { label: 'Runtime Isolation', status: 'Pass' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between text-xs">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-emerald-400 font-bold">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
