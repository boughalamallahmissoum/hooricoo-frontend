'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Watch, Briefcase, Shirt, Footprints, ArrowRight } from 'lucide-react';

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description: string;
}

const getCategoryAssets = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('watch')) return { 
    icon: Watch, 
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    label: 'Exclusive Watches'
  };
  if (n.includes('shoe') || n.includes('footwear')) return { 
    icon: Footprints, 
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
    label: 'Premium Footwear'
  };
  if (n.includes('cloth')) return { 
    icon: Shirt, 
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1974&auto=format&fit=crop',
    label: 'Designer Apparel'
  };
  return { 
    icon: Briefcase, 
    image: 'https://images.unsplash.com/photo-1559562784-9c203fb49938?q=80&w=2070&auto=format&fit=crop',
    label: 'Elite Accessories'
  };
};

interface SubCategoryShowcaseProps {
  parentName: string;
  subcategories: SubCategory[];
}

export default function SubCategoryShowcase({ parentName, subcategories }: SubCategoryShowcaseProps) {
  return (
    <section className="py-24 px-4 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            Explore Collection
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            عالم <span className="text-emerald-500">{parentName}</span>
          </motion.h2>
          <div className="w-24 h-1.5 bg-emerald-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subcategories.map((sub, index) => {
            const assets = getCategoryAssets(sub.name);
            const Icon = assets.icon;
            
            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link 
                  href={`/category/${sub.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-bg-card border border-glass-border hover:border-emerald-500/30 transition-all duration-700 shadow-2xl hover:shadow-emerald-500/10"
                >
                  {/* Background Image with Zoom Effect */}
                  <Image 
                    src={assets.image}
                    alt={sub.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Luxury Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/20 via-transparent to-bg-dark opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Floating Icon Badge */}
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 group-hover:rotate-12">
                    <Icon size={22} />
                  </div>
                  
                  {/* Content Container */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-2 block">
                        {assets.label}
                      </span>
                      <h3 className="text-3xl font-black text-white mb-3">
                        {sub.name}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {sub.description || `انغمس في عالم من الأناقة مع تشكيلة ${sub.name} الحصرية.`}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-white group-hover:text-emerald-400 transition-colors">
                      <span className="border-b border-white/20 group-hover:border-emerald-500/50 pb-1">عرض المجموعة</span>
                      <ArrowRight size={14} className="group-hover:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
