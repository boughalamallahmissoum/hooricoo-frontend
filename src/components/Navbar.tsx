'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 sm:p-6 transition-all duration-500">
      <div 
        className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 sm:px-8 sm:py-4 rounded-2xl sm:rounded-3xl border transition-all duration-500 ${
          scrolled 
            ? 'glass-premium border-emerald-500/20 bg-emerald-950/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20"
          >
            <svg className="w-5 h-5 sm:w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </motion.div>
          <div className="text-lg sm:text-xl font-black tracking-tighter text-white">
            Z-COMMERCE <span className="text-emerald-500">PREMIUM</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">تسوق آمن 100%</span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="btn-premium py-2 sm:py-3 px-6 sm:px-8 text-[10px] sm:text-xs tracking-widest uppercase font-black"
          >
            اطلب الآن
          </motion.button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
