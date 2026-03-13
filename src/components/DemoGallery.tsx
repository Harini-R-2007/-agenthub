import React from 'react';
import { motion } from 'framer-motion';
import { Play, Code, FileText, BarChart, Globe, Image as ImageIcon } from 'lucide-react';

export const DemoGallery = () => {
  const demos = [
    { title: "Financial Summarization", icon: BarChart, category: "Business", color: "text-emerald-400" },
    { title: "React Component Gen", icon: Code, category: "Development", color: "text-indigo-400" },
    { title: "Market Sentiment", icon: FileText, category: "Analysis", color: "text-amber-400" },
    { title: "Global Translation", icon: Globe, category: "Language", color: "text-purple-400" },
    { title: "AI Image Enhancement", icon: ImageIcon, category: "Creative", color: "text-pink-400" }
  ];

  return (
    <section className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Ready-to-Use Demos</h2>
            <p className="text-slate-400 max-w-xl">
              Experience the power of our agents instantly with pre-computed sample outputs across various domains.
            </p>
          </div>
          <button className="text-indigo-400 font-bold flex items-center gap-2 hover:underline">
            View All Demos <Play size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {demos.map((demo, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-6 rounded-3xl group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <demo.icon size={80} />
              </div>
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 ${demo.color}`}>
                <demo.icon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                {demo.category}
              </span>
              <h4 className="font-bold text-lg mb-4 group-hover:text-indigo-400 transition-colors">
                {demo.title}
              </h4>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Try Demo <Play size={12} fill="currentColor" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
