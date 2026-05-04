import { Suspense } from 'react';
import ThankYouClientContent from './ThankYouClientContent';
import { getOrder } from '@/lib/woocommerce';

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.order as string;
  const orderKey = resolvedParams.key as string;
  
  let orderData = null;
  
  if (orderId) {
    orderData = await getOrder(parseInt(orderId, 10), orderKey);
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-950 px-4 py-12">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <Suspense fallback={<div className="text-emerald-500 z-10">Loading order details...</div>}>
        <ThankYouClientContent order={orderData} />
      </Suspense>
    </main>
  );
}
