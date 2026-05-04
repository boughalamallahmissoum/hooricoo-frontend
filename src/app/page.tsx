import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import ThemeToggle from '@/components/ThemeToggle';
import PromotionalSlider from '@/components/PromotionalSlider';
import CategoryShowcase from '@/components/CategoryShowcase';

export default async function Home() {
  const products = await getProducts({ per_page: 8 });
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass px-8 py-4 pointer-events-auto">
          <div className="text-2xl font-black gradient-text">Z-COMMERCE</div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button className="btn-premium">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* Promotional Slider */}
      <PromotionalSlider />

      {/* Category Showcase */}
      <CategoryShowcase categories={categories} />

      {/* Products Section */}
      <section className="py-24 px-6 bg-[rgba(var(--color-bg-card-rgb),0.5)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-left gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">Trending Now</h2>
              <p className="text-[var(--text-muted)] text-lg">The most popular items in the DZ market right now.</p>
            </div>
            <button className="btn-premium-outline">
              Explore Collection &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Empty State / Placeholder
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass aspect-square rounded-xl animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[var(--glass-border)] mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black gradient-text">LP5 PREMIUM</div>
          <div className="text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Boughalamallah Missoum. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--primary-color)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--primary-color)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--primary-color)] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
