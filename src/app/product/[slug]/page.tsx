import { getProductBySlug, getProductVariations } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import ProductCarousel from '@/components/ProductCarousel';
import CodForm from '@/components/CodForm';
import StickyBuyButton from '@/components/StickyBuyButton';
import { ProductSelectionProvider } from '@/components/ProductSelectionContext';

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
    <main className="min-h-screen relative overflow-hidden pt-12 pb-32 lg:pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background Abstract Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/20 rounded-full blur-[100px] mix-blend-normal" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-cyan-500/20 rounded-full blur-[100px] mix-blend-normal" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <ProductSelectionProvider>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Column: Product Images & Details */}
            <div className="space-y-8">
              <ProductCarousel images={images} variationImages={variationImages} />
              
              <div className="glass p-6 shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
                  {product.name}
                </h1>
                
                <div className="text-3xl font-black text-emerald-500 mb-6">
                  {product.price || product.regular_price} د.ج
                </div>
                
                <div 
                  className="prose prose-emerald max-w-none text-[var(--color-text-muted)]"
                  dangerouslySetInnerHTML={{ __html: product.description || product.short_description }}
                />
                
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.categories?.map((category: any) => (
                    <span key={category.id} className="px-3 py-1 text-sm rounded-full bg-[var(--color-bg-card)] border border-[var(--color-glass-border)] text-[var(--color-text-main)]">
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: COD Form */}
            <div className="lg:pl-8">
              <div className="sticky top-8">
                <CodForm 
                  productId={product.id} 
                  productPrice={product.price || product.regular_price || '0'} 
                  attributes={product.attributes || []}
                />
              </div>
            </div>

          </div>
        </ProductSelectionProvider>
      </div>

      <StickyBuyButton price={product.price || product.regular_price || '0'} />
    </main>
  );
}
