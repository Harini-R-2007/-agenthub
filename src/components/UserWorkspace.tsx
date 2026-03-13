import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, History, Layout, CreditCard, Settings, Plus } from 'lucide-react';

export const UserWorkspace = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors mb-6">
              <Plus size={20} />
              New Workflow
            </button>
            
            <nav className="space-y-1">
              {[
                { icon: Layout, label: 'Dashboard', active: true },
                { icon: Bookmark, label: 'Saved Agents', active: false },
                { icon: History, label: 'Usage History', active: false },
                { icon: CreditCard, label: 'Billing', active: false },
                { icon: Settings, label: 'Settings', active: false },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    item.active 
                      ? 'bg-white/10 text-white' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            <header>
              <h1 className="text-3xl font-bold text-white font-display">User Workspace</h1>
              <p className="text-slate-400">Manage your AI agents and collaborative workflows.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Active Agents', value: '12' },
                { label: 'Tasks Completed', value: '1,240' },
                { label: 'Credits Remaining', value: '450' },
              ].map((stat) => (
                <div key={stat.label} className="glass p-6 rounded-2xl border border-white/10">
                  <p className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent Workflows */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Recent Workflows</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Financial Analysis Pipeline', status: 'Completed', time: '2h ago' },
                  { name: 'Content Strategy Generator', status: 'Running', time: 'Just now' },
                  { name: 'Code Security Audit', status: 'Failed', time: '1d ago' },
                ].map((workflow) => (
                  <div key={workflow.name} className="glass p-4 rounded-xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Layout size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{workflow.name}</p>
                        <p className="text-sm text-slate-400">{workflow.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      workflow.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      workflow.status === 'Running' ? 'bg-indigo-500/20 text-indigo-400' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};
