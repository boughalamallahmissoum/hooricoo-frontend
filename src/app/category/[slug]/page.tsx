import React from 'react';
import { getCategories, getProducts } from '@/lib/woocommerce';
import SubCategoryShowcase from '@/components/SubCategoryShowcase';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === slug);
  
  return {
    title: category ? `${category.name} | HOORICOO` : 'Category | HOORICOO',
    description: category?.description || 'Explore our premium collections.',
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  
  const currentCategory = categories.find((c: any) => c.slug === slug);
  
  if (!currentCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  // Find subcategories
  const subcategories = categories.filter((c: any) => c.parent === currentCategory.id);
  
  // If no subcategories, fetch products for this category
  const products = subcategories.length === 0 
    ? await getProducts({ category: currentCategory.id, per_page: 20 })
    : [];

  return (
    <main className="min-h-screen bg-bg-dark text-text-main">
      <Navbar />
      <CustomCursor />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-black uppercase tracking-widest mb-6">
            HOORICOO Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            {currentCategory.name}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {currentCategory.description || "اكتشف الفخامة والرقي في كل قطعة مختارة بعناية لتناسب ذوقك الرفيع."}
          </p>
        </div>
      </div>

      {subcategories.length > 0 ? (
        <SubCategoryShowcase 
          parentName={currentCategory.name} 
          subcategories={subcategories} 
        />
      ) : (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-emerald-500/20 mb-6 flex justify-center">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">لا توجد منتجات حالياً</h3>
                <p className="text-text-muted">نحن نعمل على إضافة منتجات جديدة لهذه المجموعة قريباً.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer Branding */}
      <footer className="py-20 border-t border-glass-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-black mb-4">
            HOORICOO <span className="text-emerald-500">PREMIUM</span>
          </div>
          <p className="text-sm text-text-muted">© 2024 جميع الحقوق محفوظة لشركة هوريكو الجزائر</p>
        </div>
      </footer>
    </main>
  );
}
