import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Shield, Globe, Code, BarChart, Megaphone, Palette, FileSearch, CheckCircle2 } from 'lucide-react';
import { Agent } from '../types';

interface DeployAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agent: Partial<Agent>) => void;
}

const CATEGORIES = [
  { name: 'Development', icon: Code },
  { name: 'Finance', icon: BarChart },
  { name: 'Marketing', icon: Megaphone },
  { name: 'Creative', icon: Palette },
  { name: 'Analysis', icon: FileSearch },
  { name: 'Language', icon: Globe },
];

export const DeployAgentModal = ({ isOpen, onClose, onDeploy }: DeployAgentModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: '',
    description: '',
    category: 'Language',
    pricingModel: 'free',
    capabilities: [],
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onDeploy(formData);
    setIsDeploying(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      onClose();
      setStep(1);
      setIsSuccess(false);
      setFormData({
        name: '',
        description: '',
        category: 'Language',
        pricingModel: 'free',
        capabilities: [],
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
          >
            {isSuccess ? (
              <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2 tracking-tighter">Agent Deployed!</h2>
                <p className="text-slate-400">Your agent is now live on the marketplace and ready for users.</p>
              </div>
            ) : (
              <>
                <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tighter">Deploy New Agent</h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Step {step} of 3</p>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold mb-2 text-slate-300">Agent Name</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. CodeWizard AI"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2 text-slate-300">Description</label>
                          <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="What does your agent do?"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-indigo-500/50 transition-all resize-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <label className="block text-sm font-bold mb-4 text-slate-300">Select Category</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {CATEGORIES.map(cat => (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.name as any })}
                            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${
                              formData.category === cat.name
                                ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                            }`}
                          >
                            <cat.icon size={20} />
                            <span className="text-xs font-bold">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold mb-4 text-slate-300">Pricing Model</label>
                          <div className="grid grid-cols-3 gap-4">
                            {['free', 'freemium', 'subscription'].map(model => (
                              <button
                                key={model}
                                type="button"
                                onClick={() => setFormData({ ...formData, pricingModel: model as any })}
                                className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all ${
                                  formData.pricingModel === model
                                    ? 'bg-indigo-600 border-indigo-500 text-white'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                                }`}
                              >
                                {model}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="p-6 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                          <div className="flex items-center gap-3 text-indigo-400 mb-2">
                            <Shield size={20} />
                            <h4 className="font-bold">Security Verification</h4>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            By deploying, you agree to our A2A Security Protocol. Your agent will undergo automated testing for reliability and safety before being fully listed.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-2 text-slate-400 hover:text-white transition-colors font-bold"
                      >
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!formData.name || !formData.description}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl font-bold transition-all neon-glow"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isDeploying}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-xl font-bold transition-all neon-glow flex items-center gap-2"
                      >
                        {isDeploying ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Deploying...
                          </>
                        ) : (
                          <>
                            <Zap size={18} />
                            Deploy Agent
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
