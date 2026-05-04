'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface ThankYouClientContentProps {
  order: any;
}

export default function ThankYouClientContent({ order }: ThankYouClientContentProps) {
  useEffect(() => {
    // Trigger confetti animation on mount
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    // Pixel Tracking
    if (order && typeof window !== 'undefined') {
      // Facebook Purchase
      if (window.fbq) {
        window.fbq('track', 'Purchase', {
          value: parseFloat(order.total),
          currency: order.currency,
          content_ids: order.line_items?.map((item: any) => item.product_id),
          content_type: 'product',
        });
      }
      // TikTok Purchase
      if (window.ttq) {
        window.ttq.track('CompletePayment', {
          value: parseFloat(order.total),
          currency: order.currency,
          content_id: order.line_items?.[0]?.product_id?.toString(),
        });
      }
    }

    return () => clearInterval(interval);
  }, [order]);

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-center overflow-hidden">
      {/* Decorative gradient orb inside the card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
      >
        <svg
          className="w-12 h-12 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2"
      >
        تم تأكيد الطلب!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-[var(--color-text-muted)] mb-8 text-lg"
      >
        شكراً لتسوقك معنا، {order?.billing?.first_name || 'عميلنا العزيز'}. لقد استلمنا طلبك وسنتواصل معك قريباً لترتيب التوصيل.
      </motion.p>

      {/* Order Details Summary */}
      {order && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-left bg-black/40 rounded-2xl p-6 mb-8 border border-white/5"
        >
          <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-4">تفاصيل الطلب</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>رقم الطلب:</span>
              <span className="font-mono text-emerald-400">#{order.id}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>طريقة الدفع:</span>
              <span>{order.payment_method_title}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>الحالة:</span>
              <span className="capitalize px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-md text-xs font-semibold">
                {order.status}
              </span>
            </div>
            
            <div className="w-full h-px bg-white/10 my-4" />
            
            <div className="space-y-2">
              {order.line_items?.map((item: any) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span className="truncate pr-4">{item.quantity}x {item.name}</span>
                  <span className="shrink-0">{item.total} {order.currency}</span>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-white/10 my-4" />

            <div className="flex justify-between text-[var(--color-text-main)] font-bold text-lg">
              <span>الإجمالي:</span>
              <span className="text-emerald-400">{order.total} {order.currency}</span>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          مواصلة التسوق
        </Link>
      </motion.div>
    </div>
  );
}
