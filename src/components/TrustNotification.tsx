'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALGERIA_CITIES = ['الجزائر', 'وهران', 'قسنطينة', 'عنابة', 'بليدة', 'سطيف', 'تلمسان', 'بشار', 'سكيكدة', 'جيجل'];
const NAMES = ['محمد', 'أحمد', 'ياسين', 'عبد القادر', 'كريم', 'ليلى', 'سارة', 'مريم', 'أمين', 'عمر'];

const TrustNotification = () => {
  const [notification, setNotification] = useState<{ name: string; city: string; time: string } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      const randomCity = ALGERIA_CITIES[Math.floor(Math.random() * ALGERIA_CITIES.length)];
      const randomTime = Math.floor(Math.random() * 50) + 2;

      setNotification({
        name: randomName,
        city: randomCity,
        time: `${randomTime} دقيقة`,
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        showNotification();
      }
    }, 15000);

    // Initial delay
    const initialTimer = setTimeout(showNotification, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
            className="glass-premium p-4 rounded-2xl flex items-center gap-4 shadow-2xl border-glass-border max-w-[280px]"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-0.5">طلب جديد</p>
              <p className="text-xs text-main font-bold truncate">
                {notification.name} من {notification.city}
              </p>
              <p className="text-[10px] text-muted font-medium">اشترى هذا المنتج منذ {notification.time}</p>
            </div>
            <div className="absolute -top-1 -right-1 flex">
               <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrustNotification;
