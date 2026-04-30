import { getProductBySlug } from '@/lib/woocommerce';
import { notFound } from 'next/navigation';
import ProductCarousel from '@/components/ProductCarousel';
import CodForm from '@/components/CodForm';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Format images for the carousel
  const images = product.images?.map((img: any) => ({
    id: img.id,
    src: img.src,
    alt: img.alt || product.name,
  })) || [];

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Abstract Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Product Images & Details */}
          <div className="space-y-8">
            <ProductCarousel images={images} />
            
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-lg">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                {product.name}
              </h1>
              
              <div 
                className="prose prose-invert prose-emerald max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: product.description || product.short_description }}
              />
              
              <div className="mt-6 flex flex-wrap gap-2">
                {product.categories?.map((category: any) => (
                  <span key={category.id} className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 text-gray-300">
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
      </div>
    </main>
  );
}
