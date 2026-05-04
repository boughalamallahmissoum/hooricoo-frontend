'use client';

import React from 'react';

interface StickyBuyButtonProps {
  price: string;
}

const StickyBuyButton: React.FC<StickyBuyButtonProps> = ({ price }) => {
  const scrollToForm = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 lg:hidden">
      <div className="glass flex items-center justify-between p-4 rounded-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.3)] border-t border-[var(--color-glass-border)]">
        <div className="flex flex-col">
          <span className="text-[var(--color-text-muted)] text-[10px] font-bold uppercase tracking-wider mb-0.5">السعر الإجمالي</span>
          <span className="text-xl font-black text-emerald-500 leading-none">{price} د.ج</span>
        </div>
        
        <button
          onClick={scrollToForm}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/20 transform active:scale-95 transition-all duration-200 text-sm"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
};

export default StickyBuyButton;
