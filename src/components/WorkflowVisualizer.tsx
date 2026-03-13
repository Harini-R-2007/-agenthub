import React from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export const WorkflowVisualizer = () => {
  const steps = [
    { icon: Search, label: "Intent Detection", desc: "Analyzing natural language input", color: "bg-indigo-500" },
    { icon: Zap, label: "Agent Selection", desc: "Matching best agents for the task", color: "bg-purple-500" },
    { icon: Shield, label: "Security Audit", desc: "Real-time runtime protection", color: "bg-amber-500" },
    { icon: CheckCircle, label: "Final Solution", desc: "Unified multi-agent output", color: "bg-emerald-500" }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Multi-Agent Orchestration</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our platform automatically coordinates multiple specialized agents to solve complex problems in a single workflow.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 neon-glow shadow-lg`}>
                  <step.icon size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-xl mb-2">{step.label}</h4>
                <p className="text-sm text-slate-400">{step.desc}</p>
                
                {i < steps.length - 1 && (
                  <div className="lg:hidden my-4">
                    <ArrowRight className="text-slate-600 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
