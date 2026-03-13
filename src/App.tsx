import React, { useState, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentCard } from './components/AgentCard';
import { DemoGallery } from './components/DemoGallery';
import { WorkflowVisualizer } from './components/WorkflowVisualizer';
import { TryNowSandbox } from './components/TryNowSandbox';
import { ChatBot } from './components/ChatBot';
import { DeveloperDashboard } from './components/DeveloperDashboard';
import { Code, BarChart, Megaphone, Palette, FileSearch, Globe } from 'lucide-react';
import { Agent } from './types';

const MOCK_AGENTS: Agent[] = [
  {
    agentId: 'chatgpt',
    developerId: 'openai',
    name: 'ChatGPT-4o',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Language',
    description: 'The industry-leading conversational AI for reasoning, creativity, and complex problem solving.',
    pricingModel: 'freemium',
    status: 'active',
    capabilities: ['Conversational AI', 'Reasoning', 'Multi-modal'],
    securityScore: 0.99,
    performance: { accuracy: 0.98, latency: 150, reliability: 0.99 }
  },
  {
    agentId: 'claude',
    developerId: 'anthropic',
    name: 'Claude 3.5 Sonnet',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Anthropic_logo.svg/2560px-Anthropic_logo.svg.png',
    category: 'Development',
    description: 'Highly capable model with exceptional coding skills and nuanced reasoning for technical workflows.',
    pricingModel: 'subscription',
    status: 'active',
    capabilities: ['Coding', 'Technical Writing', 'Analysis'],
    securityScore: 0.99,
    performance: { accuracy: 0.97, latency: 180, reliability: 0.98 }
  },
  {
    agentId: 'gamma',
    developerId: 'gamma-ai',
    name: 'Gamma AI',
    logoUrl: 'https://gamma.app/favicon.ico',
    category: 'Creative',
    description: 'Create beautiful presentations, websites, and documents in seconds using generative AI.',
    pricingModel: 'freemium',
    status: 'active',
    capabilities: ['Design', 'Presentations', 'Websites'],
    securityScore: 0.94,
    performance: { accuracy: 0.92, latency: 300, reliability: 0.95 }
  },
  {
    agentId: 'diviai',
    developerId: 'divi',
    name: 'Divi AI',
    logoUrl: 'https://www.elegantthemes.com/favicon.ico',
    category: 'Development',
    description: 'The ultimate AI assistant for web designers using WordPress and Divi, generating layouts and content.',
    pricingModel: 'subscription',
    status: 'active',
    capabilities: ['Web Design', 'WordPress', 'Layout Gen'],
    securityScore: 0.92,
    performance: { accuracy: 0.90, latency: 250, reliability: 0.94 }
  },
  {
    agentId: 'perplex',
    developerId: 'perplexity',
    name: 'Perplexity AI',
    logoUrl: 'https://www.perplexity.ai/favicon.ico',
    category: 'Analysis',
    description: 'AI-powered search engine that provides accurate, cited answers to complex questions in real-time.',
    pricingModel: 'free',
    status: 'active',
    capabilities: ['Search', 'Research', 'Citations'],
    securityScore: 0.96,
    performance: { accuracy: 0.95, latency: 200, reliability: 0.98 }
  },
  {
    agentId: 'midjourney',
    developerId: 'mj',
    name: 'Midjourney v6',
    logoUrl: 'https://www.midjourney.com/favicon.ico',
    category: 'Creative',
    description: 'State-of-the-art image generation for high-fidelity artistic and photorealistic visuals.',
    pricingModel: 'subscription',
    status: 'active',
    capabilities: ['Image Gen', 'Art', 'Design'],
    securityScore: 0.90,
    performance: { accuracy: 0.96, latency: 500, reliability: 0.92 }
  }
];

const CATEGORIES = [
  { name: 'Development', icon: Code, count: 142 },
  { name: 'Finance', icon: BarChart, count: 85 },
  { name: 'Marketing', icon: Megaphone, count: 110 },
  { name: 'Creative', icon: Palette, count: 94 },
  { name: 'Analysis', icon: FileSearch, count: 67 },
  { name: 'Language', icon: Globe, count: 128 },
] as const;

export default function App() {
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'marketplace' | 'developer'>('marketplace');
  const marketplaceRef = useRef<HTMLElement>(null);

  const scrollToMarketplace = () => {
    marketplaceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddAgent = (newAgentData: Partial<Agent>) => {
    const agent: Agent = {
      agentId: `agent-${Date.now()}`,
      developerId: 'dev-user',
      name: newAgentData.name || 'Untitled Agent',
      logoUrl: '',
      category: newAgentData.category || 'Language',
      description: newAgentData.description || '',
      pricingModel: newAgentData.pricingModel || 'free',
      status: 'active',
      capabilities: newAgentData.capabilities || [],
      securityScore: 0.95,
      performance: {
        accuracy: 0.9,
        latency: 200,
        reliability: 0.95
      }
    };
    setAgents(prev => [agent, ...prev]);
  };

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesCategory = !selectedCategory || agent.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [agents, selectedCategory, searchQuery]);

  if (view === 'developer') {
    return <DeveloperDashboard onBack={() => setView('marketplace')} onAddAgent={handleAddAgent} />;
  }

  return (
    <div className="min-h-screen bg-bg-dark selection:bg-indigo-500/30">
      <Navbar onSearch={setSearchQuery} onViewChange={setView} />
      
      <main>
        <Hero 
          onExplore={scrollToMarketplace} 
          onDeveloperStart={() => setView('developer')}
        />
        
        <section ref={marketplaceRef} className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Agents</h2>
              <p className="text-slate-400">Discover top-rated agents verified by our security protocol.</p>
            </div>
            <div className="flex gap-2">
              {selectedCategory && (
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 glass rounded-lg text-sm font-bold text-indigo-400 hover:bg-white/10 transition-all"
                >
                  Clear Filter: {selectedCategory}
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.agentId} agent={agent} />
            ))}
            {filteredAgents.length === 0 && (
              <div className="col-span-full py-20 text-center glass rounded-3xl">
                <p className="text-slate-400">No agents found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-slate-400">Find specialized agents for every domain and workflow.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedCategory(cat.name)}
                className={`glass p-6 rounded-3xl flex flex-col items-center text-center gap-4 transition-all hover:scale-105 group ${
                  selectedCategory === cat.name ? 'border-indigo-500 bg-indigo-500/10' : 'hover:border-white/20'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors ${
                  selectedCategory === cat.name ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400'
                }`}>
                  <cat.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{cat.name}</h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cat.count} Agents</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <DemoGallery />
        <WorkflowVisualizer />
        
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Try It Now</h2>
            <p className="text-slate-400">Test our multi-agent workflow in a live sandbox environment.</p>
          </div>
          <TryNowSandbox />
        </section>
        
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <div className="glass p-12 rounded-[3rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build the Future?</h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join thousands of developers listing their AI agents on AgentHub and reaching millions of users.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setView('developer')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg neon-glow transition-all"
              >
                Get Started as Developer
              </button>
              <button 
                onClick={() => window.open('https://docs.agenthub.io', '_blank')}
                className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-bold text-lg transition-all"
              >
                View Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/10 glass">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold tracking-tighter">AgentHub</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" onClick={() => setView('marketplace')} className="hover:text-white transition-colors">Marketplace</a>
            <a href="#" onClick={() => setView('developer')} className="hover:text-white transition-colors">Developers</a>
            <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
          <p className="text-sm text-slate-500">© 2026 AgentHub. All rights reserved.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
