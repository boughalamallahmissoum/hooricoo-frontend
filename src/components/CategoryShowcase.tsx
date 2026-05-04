'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  const organizedCategories = useMemo(() => {
    const menParent = categories.find(c => c.name.toLowerCase() === 'men')?.id;
    const womenParent = categories.find(c => c.name.toLowerCase() === 'women')?.id;

    const getSections = (parentId: number | undefined) => {
      if (!parentId) return [];
      
      // Get first level subcategories (e.g., Clothing, Footwear)
      const sections = categories.filter(c => c.parent === parentId);
      
      return sections.map(section => ({
        id: section.id,
        title: section.name,
        slug: section.slug,
        items: categories.filter(c => c.parent === section.id).map(item => ({
          name: item.name,
          slug: item.slug
        }))
      }));
    };

    return {
      men: {
        label: "👨 Men",
        sections: getSections(menParent)
      },
      women: {
        label: "👩 Women",
        sections: getSections(womenParent)
      }
    };
  }, [categories]);

  // Fallback if no categories are found yet
  if (!organizedCategories.men.sections.length && !organizedCategories.women.sections.length) {
    return (
      <section className="py-24 px-6 text-center">
        <h2 className="text-2xl font-bold opacity-50">Add categories in WooCommerce to see them here.</h2>
      </section>
    );
  }

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Shop by Category</h2>
          <div className="flex justify-center gap-4 p-1 glass w-fit mx-auto rounded-full">
            {(['men', 'women'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-12 py-3 rounded-full font-bold transition-all ${
                  activeTab === tab 
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                  : "hover:bg-white/10 text-[var(--text-muted)]"
                }`}
              >
                {organizedCategories[tab].label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {organizedCategories[activeTab].sections.map((section) => (
              <div key={section.id} className="glass p-8 rounded-3xl hover:border-emerald-500/30 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black group-hover:text-emerald-400 transition-colors">
                    {section.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 opacity-0 group-hover:opacity-100 transition-all">
                    &rarr;
                  </div>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.slug}>
                      <a 
                        href={`/search?category=${item.slug}`}
                        className="text-[var(--text-muted)] hover:text-white hover:translate-x-1 transition-all inline-block"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                  {section.items.length === 0 && (
                    <li className="text-[var(--text-muted)] italic text-sm">No subcategories</li>
                  )}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
