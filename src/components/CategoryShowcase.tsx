'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
}

interface CategoryShowcaseProps {
  categories: Category[];
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  const genderCategories = useMemo(() => {
    const men = categories.find(c => c.name.toLowerCase() === 'men');
    const women = categories.find(c => c.name.toLowerCase() === 'women');

    return [
      {
        id: men?.id || 1,
        name: 'للرجال',
        englishName: 'MEN',
        slug: men?.slug || 'men',
        image: '/images/banner-men.png',
        color: 'from-emerald-500/20',
        count: '150+ منتج'
      },
      {
        id: women?.id || 2,
        name: 'للنساء',
        englishName: 'WOMEN',
        slug: women?.slug || 'women',
        image: '/images/banner-women.png',
        color: 'from-amber-500/20',
        count: '200+ منتج'
      }
    ];
  }, [categories]);

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">التشكيلات الرئيسية</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-main tracking-tighter">تسوّق حسب <span className="text-emerald-500">الفئة</span></h2>
          </div>
          <p className="text-muted max-w-md text-lg font-medium leading-relaxed">
            اكتشف أحدث صيحات الموضة المختارة بعناية لتناسب ذوقك الرفيع. تشكيلات حصرية تجمع بين الأناقة والراحة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {genderCategories.map((category, i) => (
            <motion.a
              key={category.id}
              href={`/search?category=${category.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group relative aspect-[4/5] md:aspect-[16/10] rounded-[3rem] overflow-hidden border border-glass-border shadow-2xl"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-90`} />
              <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-emerald-500" />
                    <span className="text-xs font-black tracking-[0.4em] text-emerald-500 uppercase">{category.englishName}</span>
                  </div>
                  <h3 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 font-medium">{category.count}</span>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:scale-110 transition-all duration-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
