'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitCodOrder } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { algeriaCities } from '@/lib/algeriaCities';
import { useProductSelection } from './ProductSelectionContext';

const colorMap: Record<string, string> = {
  'white': '#ffffff',
  'أبيض': '#ffffff',
  'blanc': '#ffffff',
  'black': '#000000',
  'أسود': '#000000',
  'noir': '#000000',
  'red': '#ef4444',
  'أحمر': '#ef4444',
  'rouge': '#ef4444',
  'blue': '#3b82f6',
  'أزرق': '#3b82f6',
  'bleu': '#3b82f6',
  'green': '#22c55e',
  'أخضر': '#22c55e',
  'vert': '#22c55e',
  'yellow': '#eab308',
  'أصفر': '#eab308',
  'jaune': '#eab308',
  'gray': '#6b7280',
  'رمادي': '#6b7280',
  'gris': '#6b7280',
  'pink': '#ec4899',
  'وردي': '#ec4899',
  'rose': '#ec4899',
  'purple': '#a855f7',
  'بنفسجي': '#a855f7',
  'violet': '#a855f7',
  'orange': '#f97316',
  'برتقالي': '#f97316',
  'brown': '#8B4513',
  'بني': '#8B4513',
  'marron': '#8B4513',
  'navy': '#1e3a8a',
  'كحلي': '#1e3a8a',
  'beige': '#f5f5dc',
  'بيج': '#f5f5dc',
};

const getColorHex = (colorName: string) => {
  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || '#cccccc';
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 mt-6 text-lg font-bold text-white transition-all rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
    >
      {pending ? 'جاري معالجة الطلب...' : 'تأكيد الطلب - الدفع عند الاستلام'}
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
  const [shippingMethod, setShippingMethod] = useState<'home' | 'stopdesk'>('home');
  const [pixelInitiated, setPixelInitiated] = useState(false);

  const handleFocus = () => {
    if (!pixelInitiated && typeof window !== 'undefined') {
      if (window.fbq) window.fbq('track', 'InitiateCheckout');
      if (window.ttq) window.ttq.track('InitiateCheckout');
      setPixelInitiated(true);
    }
  };
  const shippingCost = shippingMethod === 'home' ? 600 : 400;

  useEffect(() => {
    const price = parseFloat(productPrice || '0');
    setTotalPrice(price + shippingCost);
  }, [productPrice, shippingCost]);

  const normalizeAttrName = (name: string) => name.toLowerCase().trim().replace('pa_', '');
  
  const colors = attributes.find((attr) => {
    const name = normalizeAttrName(attr.name);
    return ['color', 'couleur', 'اللون', 'لون'].some(k => name.includes(k));
  })?.options || [];
  
  const sizes = attributes.find((attr) => {
    const name = normalizeAttrName(attr.name);
    return ['size', 'taille', 'المقاس', 'القياس', 'pointure'].some(k => name.includes(k));
  })?.options || [];

  // Bundle pricing configuration
  const basePrice = parseFloat(productPrice || '0');
  const bundleOffers = [
    { quantity: 1, title: 'قطعة واحدة', price: basePrice },
    { quantity: 2, title: 'قطعتين (عرض خاص)', price: 4000 },
  ];

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  
  // Track selections for up to the max bundle quantity
  const [itemSelections, setItemSelections] = useState(
    Array(3).fill(null).map(() => ({ color: colors[0] || '', size: sizes[0] || '' }))
  );

  const { selectedColor, setSelectedColor } = useProductSelection();
  
  // Set default color if not set and colors are available
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor, setSelectedColor]);

  // Update total price based on selected quantity
  useEffect(() => {
    const offer = bundleOffers.find(o => o.quantity === selectedQuantity) || bundleOffers[0];
    setTotalPrice(offer.price + shippingCost);
  }, [selectedQuantity, productPrice, shippingCost]);

  const handleColorSelect = (index: number, color: string) => {
    const newSelections = [...itemSelections];
    newSelections[index].color = color;
    setItemSelections(newSelections);
    // Sync with global context so the carousel image changes
    setSelectedColor(color);
  };

  const handleSizeSelect = (index: number, size: string) => {
    const newSelections = [...itemSelections];
    newSelections[index].size = size;
    setItemSelections(newSelections);
  };

  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [availableCommunes, setAvailableCommunes] = useState<string[]>([]);
  const [selectedCommune, setSelectedCommune] = useState<string>('');

  const handleWilayaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const wilayaName = e.target.value;
    setSelectedWilaya(wilayaName);
    const wilaya = algeriaCities.find((w) => w.name === wilayaName);
    setAvailableCommunes(wilaya?.baladiyas || []);
    setSelectedCommune(''); // reset commune when wilaya changes
  };

  return (
    <div id="order-form" className="glass w-full p-6 sm:p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
        اطلب الآن - الدفع عند الاستلام
      </h2>

      <form action={formAction} onFocus={handleFocus} className="space-y-4 relative z-10">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={selectedQuantity} />
        <input type="hidden" name="itemSelections" value={JSON.stringify(itemSelections.slice(0, selectedQuantity))} />
        <input type="hidden" name="bundlePrice" value={bundleOffers.find(o => o.quantity === selectedQuantity)?.price || basePrice} />
        <input type="hidden" name="shippingMethod" value={shippingMethod} />
        <input type="hidden" name="shippingCost" value={shippingCost} />

        {/* Bundle Selector */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">اختر العرض</label>
          <div className="grid grid-cols-2 gap-3">
            {bundleOffers.map((offer) => (
              <button
                key={offer.quantity}
                type="button"
                onClick={() => setSelectedQuantity(offer.quantity)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  selectedQuantity === offer.quantity
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] text-[var(--color-text-muted)] hover:border-emerald-500/50'
                }`}
              >
                <div className="font-bold">{offer.title}</div>
                <div className={`text-sm font-bold ${selectedQuantity === offer.quantity ? 'text-emerald-300' : 'text-emerald-500'}`}>
                  {offer.price} DZD
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">الاسم الكامل</label>
          <input
            type="text"
            name="name"
            required
            placeholder="أدخل اسمك الكامل"
            className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] placeholder:text-[var(--color-text-muted)] transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">رقم الهاتف</label>
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
            <label className="text-sm font-medium text-[var(--color-text-muted)]">الولاية</label>
            <div className="relative">
              <select
                name="wilaya"
                required
                value={selectedWilaya}
                onChange={handleWilayaChange}
                className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] appearance-none transition-all"
              >
                <option value="" disabled>اختر الولاية</option>
                {algeriaCities.map((wilaya) => (
                  <option key={wilaya.id} value={wilaya.name} className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)]">
                    {wilaya.id} - {wilaya.name}
                  </option>
                ))}
              </select>
              {/* Custom Dropdown Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-[var(--color-text-muted)]">البلدية</label>
            <div className="relative">
              <select
                name="commune"
                required
                value={selectedCommune}
                onChange={(e) => setSelectedCommune(e.target.value)}
                disabled={!selectedWilaya}
                className="w-full px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-[var(--color-text-main)] appearance-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="" disabled>اختر البلدية</option>
                {availableCommunes.map((commune, index) => (
                  <option key={`${commune}-${index}`} value={commune} className="bg-[var(--color-bg-dark)] text-[var(--color-text-main)]">
                    {commune}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--color-text-muted)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {(colors.length > 0 || sizes.length > 0) && (
          <div className="space-y-6 pt-2">
            {Array.from({ length: selectedQuantity }).map((_, index) => (
              <div key={index} className="p-4 rounded-xl bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] space-y-4">
                {selectedQuantity > 1 && (
                  <h3 className="font-bold text-emerald-400 border-b border-[var(--color-glass-border)] pb-2">
                    خيارات القطعة رقم {index + 1}
                  </h3>
                )}
                
                {colors.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-muted)]">اللون</label>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorSelect(index, color)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                            itemSelections[index].color === color
                              ? 'border-emerald-500 bg-emerald-500/10 text-[var(--color-text-main)]'
                              : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] text-[var(--color-text-muted)] hover:border-emerald-500/50'
                          }`}
                        >
                          <span 
                            className="w-6 h-6 rounded-full border border-[var(--color-glass-border)] shadow-inner transform transition-transform group-hover:scale-110"
                            style={{ backgroundColor: getColorHex(color) }}
                          />
                          <span className="font-bold">{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {sizes.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[var(--color-text-muted)]">المقاس</label>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(index, size)}
                          className={`px-5 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                            itemSelections[index].size === size
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
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
            ))}
          </div>
        )}

        {/* Shipping Method Selector */}
        <div className="space-y-3 mt-6">
          <label className="text-sm font-medium text-[var(--color-text-muted)]">طريقة التوصيل</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShippingMethod('home')}
              className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between ${
                shippingMethod === 'home'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className={`font-bold ${shippingMethod === 'home' ? 'text-emerald-400' : 'text-[var(--color-text-main)]'}`}>
                  توصيل للمنزل
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">600 DZD</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                shippingMethod === 'home' ? 'border-emerald-500' : 'border-[var(--color-glass-border)]'
              }`}>
                {shippingMethod === 'home' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setShippingMethod('stopdesk')}
              className={`p-4 rounded-xl border-2 text-right transition-all flex items-center justify-between ${
                shippingMethod === 'stopdesk'
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-[var(--color-glass-border)] bg-[var(--color-bg-dark)] hover:border-emerald-500/50'
              }`}
            >
              <div>
                <div className={`font-bold ${shippingMethod === 'stopdesk' ? 'text-emerald-400' : 'text-[var(--color-text-main)]'}`}>
                  توصيل للمكتب (Stopdesk)
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">400 DZD</div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                shippingMethod === 'stopdesk' ? 'border-emerald-500' : 'border-[var(--color-glass-border)]'
              }`}>
                {shippingMethod === 'stopdesk' && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
              </div>
            </button>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 p-4 rounded-xl bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] space-y-3">
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>سعر المنتج</span>
            <span>{bundleOffers.find(o => o.quantity === selectedQuantity)?.price || basePrice} DZD</span>
          </div>
          <div className="flex justify-between text-sm text-[var(--color-text-muted)]">
            <span>تكلفة الشحن</span>
            <span>{shippingCost} DZD</span>
          </div>
          <div className="w-full h-px bg-[var(--color-glass-border)] my-2" />
          <div className="flex justify-between text-lg font-bold text-[var(--color-text-main)]">
            <span>الإجمالي للدفع</span>
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
