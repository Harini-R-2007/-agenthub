import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code, Terminal, Zap, Shield, BarChart } from 'lucide-react';

export const TryNowSandbox = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    if (!input) return;
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`[AgentHub Runtime] Executing IntentRecognizer...\n[Success] Intent detected: "Code Generation"\n[AgentHub Runtime] Executing CodeArchitect...\n[Success] Output generated: const App = () => <div>Hello World</div>`);
      setIsRunning(false);
    }, 2000);
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-indigo-500/20">
      <div className="p-4 bg-indigo-600/10 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-indigo-400" />
          <span className="text-sm font-bold uppercase tracking-widest">Live Sandbox</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 h-[400px]">
        {/* Input Area */}
        <div className="p-6 border-r border-white/10 flex flex-col">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2">Input Prompt</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your task here..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none text-sm font-mono text-slate-300"
          />
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all neon-glow"
          >
            {isRunning ? <Zap className="animate-spin" size={18} /> : <Play size={18} fill="currentColor" />}
            {isRunning ? 'Executing...' : 'Run Agent'}
          </button>
        </div>

        {/* Output Area */}
        <div className="p-6 bg-slate-950/50 flex flex-col">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2">Runtime Output</label>
          <div className="flex-1 font-mono text-xs text-emerald-400 overflow-y-auto whitespace-pre-wrap">
            {output || '> Waiting for execution...'}
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] font-bold text-slate-500">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Shield size={10} /> Secure</span>
              <span className="flex items-center gap-1"><BarChart size={10} /> Latency: 120ms</span>
            </div>
            <span>v1.0.4-stable</span>
          </div>
        </div>
      </div>
    </div>
  );
};
