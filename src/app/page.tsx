import { getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import ThemeToggle from '@/components/ThemeToggle';

export default async function Home() {
  const products = await getProducts({ per_page: 8 });

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass px-8 py-4">
          <div className="text-2xl font-black gradient-text">LP5 PREMIUM</div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button className="btn-premium">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            Elevate Your <br />
            <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-[var(--text-muted)] text-xl max-w-2xl mx-auto mb-12">
            Experience the future of e-commerce with our headless high-performance 
            landing pages powered by Next.js and WooCommerce.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="btn-premium px-12 py-4 text-lg">Shop Now</button>
            <button className="px-12 py-4 rounded-full border border-[var(--glass-border)] hover:bg-[var(--bg-card)] transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-[var(--color-bg-card)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
              <p className="text-[var(--text-muted)]">Handpicked products for your lifestyle.</p>
            </div>
            <button className="text-[var(--primary-color)] font-semibold hover:underline">
              View All Products &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
