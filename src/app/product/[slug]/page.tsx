import { getProductBySlug, getProductVariations } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import ProductCarousel from '@/components/ProductCarousel';
import CodForm from '@/components/CodForm';
import StickyBuyButton from '@/components/StickyBuyButton';
import CustomCursor from '@/components/CustomCursor';
import TrustNotification from '@/components/TrustNotification';
import { ProductSelectionProvider } from '@/components/ProductSelectionContext';
import * as motion from 'framer-motion/client';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch variations if it's a variable product
  let variationImages: Record<string, string> = {};
  if (product.type === 'variable') {
    const variations = await getProductVariations(product.id);
    
    // Build a map of Color Option -> Image Source
    variations.forEach((variation: any) => {
      const colorAttribute = variation.attributes.find((attr: any) => ['color', 'couleur', 'اللون'].includes(attr.name.toLowerCase()));
      if (colorAttribute && variation.image && variation.image.src) {
        variationImages[colorAttribute.option] = variation.image.src;
      }
    });
  }

  // Format main images for the carousel
  const images = product.images?.map((img: any) => ({
    id: img.id,
    src: img.src,
    alt: img.alt || product.name,
  })) || [];

  return (
    <main className="min-h-screen relative overflow-hidden bg-[var(--color-bg-dark)] selection:bg-emerald-500/30 text-[var(--color-text-main)]">
      <CustomCursor />
      
      {/* Background Abstract Gradients - Deeper & More Sophisticated */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-[-5%] left-[-10%] w-[50rem] h-[50rem] bg-emerald-500/5 rounded-full blur-[150px]" 
        />
        <div className="absolute bottom-[20%] right-[-10%] w-[40rem] h-[40rem] bg-emerald-400/5 rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[30rem] h-[30rem] bg-cyan-400/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 sm:pt-40 pb-32 lg:pb-24 px-4 sm:px-6 lg:px-8">
        <ProductSelectionProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Product Images & Details */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCarousel images={images} variationImages={variationImages} />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50, filter: 'blur(20px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="glass-premium p-8 sm:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group border-glass-border"
              >
                {/* Premium Accent */}
                <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[100px] -mr-24 -mt-24 group-hover:bg-emerald-500/10 transition-all duration-1000" />
                
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400">إصدار محدود • Premium Quality</span>
                  </motion.div>

                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[var(--color-text-main)] leading-[1.1] tracking-tighter">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-end gap-5">
                    <div className="text-6xl font-black text-[var(--color-text-main)] tracking-tighter">
                      {product.price || product.regular_price} <span className="text-2xl text-emerald-500 font-bold ml-1 uppercase">DZD</span>
                    </div>
                    {product.regular_price && product.price && product.regular_price !== product.price && (
                      <div className="text-2xl text-[var(--color-text-muted)] line-through opacity-50 mb-2 font-bold">
                        {product.regular_price} DZD
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full h-px bg-gradient-to-r from-emerald-500/30 via-black/5 dark:via-white/5 to-transparent" />
                  
                  <div 
                    className="prose prose-emerald max-w-none text-[var(--color-text-muted)] leading-relaxed text-xl font-medium"
                    dangerouslySetInnerHTML={{ __html: product.description || product.short_description }}
                  />
                  
                  {/* Premium Trust Badges */}
                  <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-glass-border">
                    {[
                      { icon: <path d="M5 13l4 4L19 7" />, text: "جودة أصلية", color: "emerald", label: "Certified" },
                      { icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />, text: "توصيل سريع", color: "cyan", label: "Express" },
                      { icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, text: "دفع عند الاستلام", color: "amber", label: "COD" }
                    ].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-4 group/badge">
                        <div className={`w-16 h-16 rounded-2xl bg-${badge.color}-500/5 flex items-center justify-center text-${badge.color}-400 border border-${badge.color}-500/10 group-hover/badge:scale-110 group-hover/badge:bg-${badge.color}-500/10 group-hover/badge:border-${badge.color}-500/30 transition-all duration-700 shadow-xl shadow-transparent group-hover/badge:shadow-${badge.color}-500/5`}>
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{badge.icon}</svg>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500/50">{badge.label}</span>
                          <span className="block text-[11px] font-black uppercase tracking-widest text-muted group-hover/badge:text-main transition-colors">{badge.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: COD Form */}
            <motion.div 
              initial={{ opacity: 0, x: 40, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:pl-12"
            >
              <div className="sticky top-40">
                <CodForm 
                  productId={product.id} 
                  productPrice={product.price || product.regular_price || '0'} 
                  attributes={product.attributes || []}
                />
              </div>
            </motion.div>

          </div>
        </ProductSelectionProvider>
      </div>

      <footer className="relative z-10 py-20 px-6 border-t border-glass-border bg-card/40 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <div className="text-xl font-black tracking-tighter text-main">
                Z-COMMERCE <span className="text-emerald-500">PREMIUM</span>
              </div>
            </div>
            <div className="flex gap-8">
              {['سياسة الخصوصية', 'شروط الاستخدام', 'سياسة الاسترجاع'].map((link) => (
                <a key={link} href="#" className="text-[11px] font-bold uppercase tracking-widest text-muted hover:text-emerald-400 transition-colors">{link}</a>
              ))}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted/50">
              &copy; {new Date().getFullYear()} LUXURY EXPERIENCE • ALGIERS, DZ
            </div>
          </div>
        </div>
      </footer>

      <StickyBuyButton price={product.price || product.regular_price || '0'} />
      <TrustNotification />
    </main>
  );
}
