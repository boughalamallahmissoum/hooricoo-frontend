'use client';

import { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');

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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 max-w-lg mx-auto p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-center overflow-hidden">
      {/* Decorative gradient orb inside the card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
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
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4"
      >
        Payment Successful!
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-400 mb-8 text-lg"
      >
        Thank you for your purchase. {orderId ? `Your order #${orderId} is being processed.` : 'Your order is being processed.'} We'll send you an email with the details shortly.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-950 px-4">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <Suspense fallback={<div className="text-emerald-500">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
