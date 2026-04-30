'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitCodOrder } from '@/app/actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 mt-6 text-lg font-bold text-white transition-all rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
    >
      {pending ? 'Processing Order...' : 'Confirm Order - Cash on Delivery'}
    </button>
  );
}

interface CodFormProps {
  productId: number;
  productPrice: string;
  attributes: { name: string; options: string[] }[];
}

export default function CodForm({ productId, productPrice, attributes }: CodFormProps) {
  const [state, formAction] = useActionState(submitCodOrder, null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const shippingCost = 600; // Flat rate for now

  useEffect(() => {
    const price = parseFloat(productPrice || '0');
    setTotalPrice(price + shippingCost);
  }, [productPrice]);

  const colors = attributes.find((attr) => attr.name.toLowerCase() === 'color')?.options || [];
  const sizes = attributes.find((attr) => attr.name.toLowerCase() === 'size')?.options || [];

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
        Order Now - Pay on Delivery
      </h2>

      <form action={formAction} className="space-y-4 relative z-10">
        <input type="hidden" name="productId" value={productId} />

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="05xxxxxx / 07xxxxxx / 06xxxxxx"
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Wilaya</label>
            <input
              type="text"
              name="wilaya"
              required
              placeholder="E.g. Algiers"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Commune</label>
            <input
              type="text"
              name="commune"
              required
              placeholder="E.g. Bab Ezzouar"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        {(colors.length > 0 || sizes.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {colors.length > 0 && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Color</label>
                <select
                  name="color"
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 text-white appearance-none"
                >
                  <option value="" disabled selected>Select Color</option>
                  {colors.map((color) => (
                    <option key={color} value={color} className="bg-neutral-900 text-white">
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {sizes.length > 0 && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300">Size</label>
                <select
                  name="size"
                  required
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-500 text-white appearance-none"
                >
                  <option value="" disabled selected>Select Size</option>
                  {sizes.map((size) => (
                    <option key={size} value={size} className="bg-neutral-900 text-white">
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="mt-6 p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Product Price</span>
            <span>{productPrice} DZD</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>Shipping Cost</span>
            <span>{shippingCost} DZD</span>
          </div>
          <div className="w-full h-px bg-white/10 my-2" />
          <div className="flex justify-between text-lg font-bold text-white">
            <span>Total to Pay</span>
            <span className="text-emerald-400">{totalPrice} DZD</span>
          </div>
        </div>

        {state?.error && (
          <div className="p-3 mt-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
