'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useProductSelection } from './ProductSelectionContext';

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export default function ProductCarousel({ 
  images, 
  variationImages = {} 
}: { 
  images: ProductImage[];
  variationImages?: Record<string, string>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { selectedColor } = useProductSelection();

  // Watch for selectedColor changes and update the carousel if we have a matching image
  useEffect(() => {
    if (selectedColor && variationImages[selectedColor]) {
      const targetSrc = variationImages[selectedColor];
      const targetIndex = images.findIndex(img => img.src === targetSrc);
      
      if (targetIndex !== -1) {
        setCurrentIndex(targetIndex);
      }
    }
  }, [selectedColor, variationImages, images]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-card rounded-[2rem] flex items-center justify-center border border-glass-border backdrop-blur-md">
        <span className="text-muted font-bold uppercase tracking-widest text-xs">لا توجد صور متاحة</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Main Image Viewer */}
      <div 
        className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden bg-card border border-glass-border shadow-2xl group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full relative"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || 'Product Image'}
              fill
              className="object-contain p-6 sm:p-10 transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Glare Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            background: isHovering 
              ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
              : ''
          }}
        />

        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 dark:from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Arrows - Premium Style */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-card/40 backdrop-blur-xl text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 hover:text-black hover:scale-110 border border-glass-border z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-card/40 backdrop-blur-xl text-main flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 hover:text-black hover:scale-110 border border-glass-border z-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Badge Overlay */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">High Resolution</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-card/50 border border-glass-border backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted/60 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
              Tap to Zoom
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnails - Luxury Scrollbar */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-premium snap-x">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-500 snap-start ${
                idx === currentIndex 
                  ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105 z-10' 
                  : 'border-glass-border opacity-40 hover:opacity-100 hover:border-emerald-500/30'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
              {idx === currentIndex && (
                <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      <style jsx global>{`
        .scrollbar-premium::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-premium::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .scrollbar-premium::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent);
          border-radius: 10px;
        }
        .scrollbar-premium {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.4) transparent;
        }
      `}</style>
    </div>
  );
}
