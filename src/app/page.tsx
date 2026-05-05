import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import PromotionalSlider from '@/components/PromotionalSlider';
import CategoryShowcase from '@/components/CategoryShowcase';
import Navbar from '@/components/Navbar';
import BrandSection from '@/components/BrandSection';

export default async function Home() {
  const products = await getProducts({ per_page: 8 });
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-bg-main overflow-x-hidden">
      <Navbar />

      <main>
        {/* Promotional Slider */}
        <PromotionalSlider />

        {/* Brand Trust Section */}
        <BrandSection />

        {/* Category Showcase */}
        <CategoryShowcase categories={categories} />

        {/* Trending Products */}
        <section className="py-32 px-6 relative">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-emerald-500">
                  <div className="h-px w-8 bg-current" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">المجموعة الأكثر طلباً</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-main tracking-tighter">
                  المنتجات <span className="text-emerald-500">الرائجة</span>
                </h2>
              </div>
              <p className="text-muted max-w-sm text-lg font-medium">
                اكتشف المنتجات التي نالت إعجاب الآلاف. جودة لا تضاهى وتصاميم عصرية تناسب كل الأذواق.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] rounded-[2rem] bg-bg-card animate-pulse border border-glass-border" />
                ))
              )}
            </div>

            <div className="mt-20 text-center">
              <button className="group relative px-12 py-5 bg-transparent text-main font-black rounded-full overflow-hidden border border-glass-border transition-all hover:border-emerald-500/50">
                <span className="relative z-10">تصفح جميع المنتجات</span>
                <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 z-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 relative bg-bg-card/50 backdrop-blur-xl border-t border-glass-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2 space-y-8">
              <div className="text-3xl font-black text-main tracking-tighter">HOORICOO<span className="text-emerald-500">.</span></div>
              <p className="text-muted text-lg leading-relaxed max-w-md">
                وجهتكم الأولى للأناقة والفخامة في الجزائر. نحن نسعى دائماً لتقديم الأفضل لعملائنا من حيث الجودة والسعر وسرعة التوصيل.
              </p>
              <div className="flex gap-4">
                {['fb', 'ig', 'tt'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-2xl border border-glass-border flex items-center justify-center text-muted hover:text-emerald-500 hover:border-emerald-500 transition-all cursor-pointer">
                    <span className="font-bold uppercase text-xs">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-main font-black uppercase tracking-widest text-sm">روابط سريعة</h4>
              <ul className="space-y-4 text-muted font-medium">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">الرئيسية</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">المتجر</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">تتبع الطلب</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">اتصل بنا</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-main font-black uppercase tracking-widest text-sm">خدمة العملاء</h4>
              <ul className="space-y-4 text-muted font-medium">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">سياسة الخصوصية</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">الشروط والأحكام</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">سياسة الإسترجاع</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted text-sm font-medium">
              &copy; {new Date().getFullYear()} HOORICOO DZ. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-muted uppercase tracking-widest">Powered by</span>
              <span className="text-sm font-black text-main">ANTIGRAVITY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
