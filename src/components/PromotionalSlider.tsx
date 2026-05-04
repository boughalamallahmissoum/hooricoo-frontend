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
    <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={BANNERS[current].image}
            alt={BANNERS[current].title}
            fill
            className="object-cover"
            priority
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${BANNERS[current].color}`} />
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="absolute inset-0 flex items-center px-6 md:px-20">
            <div className="max-w-3xl">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-emerald-400 font-bold tracking-widest uppercase mb-4"
              >
                {BANNERS[current].subtitle}
              </motion.p>
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight"
              >
                {BANNERS[current].title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </motion.h2>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium px-12 py-5 text-xl"
              >
                {BANNERS[current].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 transition-all rounded-full ${
              current === i ? "w-12 bg-emerald-500" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
