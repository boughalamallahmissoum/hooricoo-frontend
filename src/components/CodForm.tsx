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

  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || '');

  return (
    <div className="glass w-full p-6 sm:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
        Order Now - Pay on Delivery
      </h2>

      <form action={formAction} className="space-y-4 relative z-10">
        <input type="hidden" name="productId" value={productId} />
        {colors.length > 0 && <input type="hidden" name="color" value={selectedColor} />}
        {sizes.length > 0 && <input type="hidden" name="size" value={selectedSize} />}

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="05xxxxxx / 07xxxxxx / 06xxxxxx"
            className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">Wilaya</label>
            <input
              type="text"
              name="wilaya"
              required
              placeholder="E.g. Algiers"
              className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">Commune</label>
            <input
              type="text"
              name="commune"
              required
              placeholder="E.g. Bab Ezzouar"
              className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] transition-all"
            />
          </div>
        </div>

        {(colors.length > 0 || sizes.length > 0) && (
          <div className="space-y-4 pt-2">
            {colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-muted)]">Color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-emerald-500 bg-emerald-500/10 text-[var(--color-text-main)]'
                          : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] text-[var(--color-text-muted)] hover:border-emerald-500/50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--color-text-muted)]">Size</label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-cyan-500 bg-cyan-500/10 text-[var(--color-text-main)]'
                          : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] text-[var(--color-text-muted)] hover:border-cyan-500/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="mt-6 p-4 rounded-xl bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] space-y-3">
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>Product Price</span>
            <span>{productPrice} DZD</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>Shipping Cost</span>
            <span>{shippingCost} DZD</span>
          </div>
          <div className="w-full h-px bg-[var(--color-glass-border)] my-2" />
          <div className="flex justify-between text-lg font-bold text-[var(--color-text-main)]">
            <span>Total to Pay</span>
            <span className="text-emerald-500">{totalPrice} DZD</span>
          </div>
        </div>

        {state?.error && (
          <div className="p-3 mt-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
