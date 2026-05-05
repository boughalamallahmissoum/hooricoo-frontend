'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  productName?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ productName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+213555555555';
  const defaultMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "مرحباً، أنا مهتم بطلب هذا المنتج: ";
  const fullMessage = encodeURIComponent(`${defaultMessage}${productName || ''}`);
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${fullMessage}`;

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
      // Fake typing effect
      setTimeout(() => setIsTyping(true), 500);
      setTimeout(() => setIsTyping(false), 2500);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 lg:bottom-10 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="glass-premium p-5 rounded-[2rem] max-w-[280px] relative mb-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10"
          >
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-[3px] border-[#020617] rounded-full shadow-lg shadow-emerald-500/50" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500">مباشر</span>
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">فريق الدعم</h4>
                
                {isTyping ? (
                  <div className="flex gap-1 py-1">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 h-1 rounded-full bg-emerald-500/60" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 rounded-full bg-emerald-500/60" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 h-1 rounded-full bg-emerald-500/60" />
                  </div>
                ) : (
                  <p className="text-xs text-white/70 leading-relaxed font-medium">
                    مرحباً! هل لديك أي استفسار حول <span className="text-emerald-400 font-bold">{productName}</span>؟ نحن هنا للمساعدة.
                  </p>
                )}
              </div>
            </div>

            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[11px] font-black text-center rounded-xl hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)] transition-all uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.823 11.823 0 001.592 5.911L0 24l6.193-1.624a11.782 11.782 0 005.852 1.549h.005c6.637 0 12.046-5.411 12.049-12.048 0-3.218-1.251-6.242-3.513-8.505z" />
              </svg>
              تحدث معنا الآن
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group block"
          title="WhatsApp Support"
        >
          {/* Floating Ring Effects */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-[ping_3s_infinite] opacity-20" />
          <span className="absolute -inset-2 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-all duration-700" />
          
          {/* Button Content */}
          <div className="relative glass-premium p-4.5 rounded-full shadow-[0_15px_40px_rgba(16,185,129,0.4)] border-emerald-500/30 group-hover:border-emerald-500/60 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 bg-emerald-500/5">
            <svg 
              viewBox="0 0 24 24" 
              className="w-9 h-9 fill-emerald-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.001 12.049a11.823 11.823 0 001.592 5.911L0 24l6.193-1.624a11.782 11.782 0 005.852 1.549h.005c6.637 0 12.046-5.411 12.049-12.048 0-3.218-1.251-6.242-3.513-8.505z" />
            </svg>
          </div>
        </a>
      </motion.div>
    </div>
  );
};

export default WhatsAppButton;

