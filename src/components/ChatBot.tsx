import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User, Shield, Zap, Terminal, CheckCircle, Copy, GripVertical } from 'lucide-react';
import { Agent } from '../types';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalMode, setIsModalMode] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string; suggestions?: string[] }[]>([
    { role: 'assistant', content: 'Hello! I am your AgentHub assistant. Tell me about a problem you are trying to solve, and I will recommend the best agents for you.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    Prism.highlightAll();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleTryAgent = (e: any) => {
      const agent = e.detail as Agent;
      setActiveAgent(agent);
      setIsModalMode(true);
      setIsOpen(true);
      setMessages([
        { role: 'assistant', content: `Welcome to the ${agent.name} sandbox. I am ready to assist you with your ${agent.category.toLowerCase()} tasks. How can I help you today?` }
      ]);
    };

    window.addEventListener('try-agent', handleTryAgent);
    return () => window.removeEventListener('try-agent', handleTryAgent);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat(userMsg).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: activeAgent 
            ? `You are simulating the ${activeAgent.name} AI agent. Your category is ${activeAgent.category}. 
               Act as a professional SaaS tool. Your description is: ${activeAgent.description}.
               If the user asks for code, provide high-quality, production-ready code blocks using markdown.
               Always respond in the persona of ${activeAgent.name}.`
            : "You are the AgentHub assistant. Help users find agents and explain the platform features. Use markdown for formatting.",
        }
      });

      const response = await model;
      const assistantMsg = { 
        role: 'assistant', 
        content: response.text || "I'm sorry, I couldn't process that request.",
        suggestions: !activeAgent ? ['Summarize Report', 'Generate React Component', 'Analyze Market Data'] : undefined
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to the agent. Please check your API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsModalMode(false);
      setActiveAgent(null);
      setMessages([
        { role: 'assistant', content: 'Hello! I am your AgentHub assistant. Tell me about a problem you are trying to solve, and I will recommend the best agents for you.' }
      ]);
    }, 300);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center neon-glow z-50 text-white shadow-2xl"
        >
          <MessageSquare size={28} />
        </motion.button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: -300, bottom: 300 }}
              dragElastic={0.1}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full glass rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl border border-white/10 ${
                isModalMode ? 'max-w-[1000px] h-[90vh]' : 'max-w-[450px] h-[650px] md:absolute md:bottom-8 md:right-8'
              }`}
            >
              {/* Drag Handle (Right Side) */}
              <div 
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-32 cursor-ns-resize group z-50 flex items-center justify-center bg-white/5 hover:bg-indigo-500/20 border-l border-y border-white/10 rounded-l-2xl transition-all shadow-xl backdrop-blur-sm"
                title="Drag to move up/down"
              >
                <div className="flex flex-col gap-1 items-center">
                  <GripVertical size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                  <span className="[writing-mode:vertical-lr] text-[8px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-indigo-300 transition-colors">Drag</span>
                </div>
              </div>

              {/* Header */}
              <div className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between relative">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center neon-glow overflow-hidden ${activeAgent ? 'bg-white/5' : 'bg-indigo-600 text-white'}`}>
                    {activeAgent ? (
                      <img src={activeAgent.logoUrl} alt={activeAgent.name} className="w-full h-full object-contain p-2" referrerPolicy="no-referrer" />
                    ) : (
                      <Bot size={24} />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg tracking-tight">
                      {activeAgent ? `${activeAgent.name} Sandbox` : 'AgentHub Assistant'}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-emerald-400">Live Session</span>
                      {activeAgent && (
                        <>
                          <span className="text-slate-500 px-2">•</span>
                          <span className="text-indigo-400 flex items-center gap-1">
                            <Shield size={10} /> A2A Protocol Active
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={closeChat} 
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 rounded-xl transition-all text-slate-400 hover:text-red-400 group"
                    title="Exit Chat"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Exit</span>
                    <X size={20} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-scroll p-6 md:p-10 space-y-8 scroll-smooth custom-scrollbar bg-slate-950/30"
              >
                <div className="max-w-4xl mx-auto space-y-8">
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                          msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-slate-400'
                        }`}>
                          {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-6 rounded-[2rem] text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg neon-glow' 
                            : 'bg-white/5 border border-white/10 rounded-tl-none'
                        }`}>
                          <div className="markdown-body prose prose-invert max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                          {msg.suggestions && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {msg.suggestions.map((s, j) => (
                                <button 
                                  key={j} 
                                  onClick={() => { setInput(s); handleSend(); }}
                                  className="text-[10px] bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-full border border-indigo-500/20 transition-all"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <Bot size={16} className="text-slate-400" />
                        </div>
                        <div className="bg-white/5 border border-white/10 p-4 rounded-[2rem] rounded-tl-none flex gap-1.5">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150" />
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-300" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-6 md:p-8 border-t border-white/10 bg-white/5">
                <div className="max-w-4xl mx-auto relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={activeAgent ? `Message ${activeAgent.name}...` : "Ask me anything..."}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-indigo-500/50 transition-all text-sm shadow-inner"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isTyping || !input.trim()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all neon-glow text-white"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-500 mt-4 font-medium">
                  {activeAgent ? `You are interacting with a simulated instance of ${activeAgent.name}.` : "AgentHub Assistant can help you discover and orchestrate AI tools."}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          background-clip: padding-box;
          transition: all 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.6);
          cursor: pointer;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: rgba(99, 102, 241, 0.8);
        }
        .markdown-body {
          font-family: var(--font-sans);
          line-height: 1.6;
        }
        .markdown-body pre {
          background: #0d1117 !important;
          padding: 1.25rem !important;
          border-radius: 0.75rem !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          margin: 1.25rem 0 !important;
          position: relative;
          overflow-x: auto !important;
        }
        .markdown-body code {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 0.9rem !important;
          color: #e6edf3;
        }
        .markdown-body p {
          margin-bottom: 1.25rem !important;
        }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          margin-top: 1.5rem !important;
          margin-bottom: 1rem !important;
          font-weight: 700 !important;
          color: #fff !important;
        }
        .markdown-body ul, .markdown-body ol {
          margin-left: 1.5rem !important;
          margin-bottom: 1.25rem !important;
          list-style-type: disc !important;
        }
        .markdown-body li {
          margin-bottom: 0.5rem !important;
        }
        .markdown-body a {
          color: #4f46e5 !important;
          text-decoration: underline !important;
        }
        .markdown-body blockquote {
          border-left: 4px solid rgba(255, 255, 255, 0.2) !important;
          padding-left: 1rem !important;
          margin-left: 0 !important;
          color: #94a3b8 !important;
          font-style: italic !important;
        }
      `}</style>
    </>
  );
};
