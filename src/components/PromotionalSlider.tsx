'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const BANNERS = [
  {
    id: 1,
    title: "Men's Luxury Collection",
    subtitle: "Define Your Style",
    image: "/images/banner-men.png",
    cta: "Shop Men",
    color: "from-emerald-900/40 to-transparent"
  },
  {
    id: 2,
    title: "Women's Modest Wear",
    subtitle: "Elegance & Grace",
    image: "/images/banner-women.png",
    cta: "Shop Women",
    color: "from-amber-900/40 to-transparent"
  }
];

export default function PromotionalSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-bg-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={BANNERS[current].image}
            alt={BANNERS[current].title}
            fill
            className="object-cover opacity-80"
            priority
          />
          {/* Enhanced Multi-layer Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${BANNERS[current].color} opacity-60`} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent" />
          
          <div className="absolute inset-0 flex items-center px-6 md:px-24">
            <div className="max-w-4xl">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                  {BANNERS[current].subtitle}
                </span>
              </motion.div>

              <motion.h2
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-6xl md:text-9xl font-black text-main mb-12 leading-[0.9] tracking-tighter"
              >
                {BANNERS[current].title.split(' ').map((word, i) => (
                  <span key={i} className="block last:text-emerald-500">{word}</span>
                ))}
              </motion.h2>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6"
              >
                <button className="btn-premium px-12 py-5 text-xl group">
                  <span className="flex items-center gap-3">
                    {BANNERS[current].cta}
                    <motion.span 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      &rarr;
                    </motion.span>
                  </span>
                </button>
                <button className="px-8 py-5 text-main font-bold hover:text-emerald-500 transition-colors hidden sm:block">
                  شاهد التشكيلة كاملة
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-6 md:left-24 right-6 md:right-24 flex justify-between items-end z-20">
        <div className="flex gap-4">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group relative py-4"
            >
              <div className={`h-[2px] transition-all duration-500 rounded-full ${
                current === i ? "w-24 bg-emerald-500" : "w-12 bg-white/20 group-hover:bg-white/40"
              }`} />
              <span className={`absolute top-0 left-0 text-[10px] font-black transition-opacity duration-500 ${
                current === i ? "opacity-100 text-emerald-500" : "opacity-0"
              }`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
        
        {/* Decorative Scroll indicator */}
        <div className="hidden md:flex flex-col items-center gap-4 text-white/20">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] vertical-text">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-emerald-500 to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </div>
  );
}
