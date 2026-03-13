import React, { useEffect, useState } from 'react';
import { Search, Shield, Zap, User, Menu, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { auth, signInWithGoogle, logout } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export const Navbar = ({ onSearch, onViewChange }: { onSearch?: (query: string) => void, onViewChange?: (view: 'marketplace' | 'developer') => void }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center neon-glow">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">
            AgentHub
          </span>
        </motion.div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search agents, tasks, or problems..." 
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button 
              onClick={() => onViewChange?.('marketplace')}
              className="hover:text-indigo-400 transition-colors"
            >
              Marketplace
            </button>
            <button 
              onClick={() => onViewChange?.('developer')}
              className="hover:text-indigo-400 transition-colors"
            >
              Developers
            </button>
            <a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <Shield size={20} className="text-emerald-400" />
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={16} className="text-slate-400" />
                  )}
                  <span className="text-xs font-bold text-slate-200 hidden sm:inline">
                    {user.displayName?.split(' ')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/5 rounded-full text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition-all neon-glow text-white disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <User size={18} />
                    <span>Connect</span>
                  </>
                )}
              </button>
            )}

            <button className="md:hidden p-2 hover:bg-white/5 rounded-full">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
