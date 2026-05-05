'use client';

import { useActionState, useEffect, useState } from 'react';
import { submitCodOrder } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { algeriaCities } from '@/lib/algeriaCities';
import { useProductSelection } from './ProductSelectionContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="space-y-4">
      <button
        type="submit"
        disabled={pending}
        className="w-full py-6 text-xl font-black text-white transition-all rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 bg-[length:200%_auto] hover:bg-right active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_-10px_rgba(16,185,129,0.4)] relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        <span className="relative z-10 flex items-center justify-center gap-3 tracking-tighter">
          {pending ? (
            <>
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              جاري معالجة طلبك...
            </>
          ) : (
            'تأكيد الشراء الآن'
          )}
        </span>
      </button>
      
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500/60 group">
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.9L10 1.554 17.834 4.9c.428.181.744.415.948.708.204.293.218.646.218 1.059v3.181c0 4.673-2.813 8.874-7.143 10.11a.4.4 0 01-.214 0c-4.33-1.236-7.143-5.437-7.143-10.11V6.667c0-.413.014-.766.218-1.059.204-.293.52-.527.948-.708zM10 3.303L4 5.867v3.985c0 3.812 2.193 7.24 6 8.445 3.807-1.205 6-4.633 6-8.445V5.867l-6-2.564z" clipRule="evenodd"></path></svg>
          تشفير 256-بت
        </div>
        <div className="w-1 h-1 rounded-full bg-white/10" />
        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-500/60 group">
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          ضمان الجودة
        </div>
      </div>
    </div>
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

  const basePrice = parseFloat(productPrice || '0');
  const bundleOffers = [
    { quantity: 1, title: 'قطعة واحدة', price: basePrice, tag: 'أساسي' },
    { quantity: 2, title: 'قطعتين', price: basePrice * 1.8, tag: 'الأكثر مبيعاً', discount: '20% خصم' },
  ];

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [itemSelections, setItemSelections] = useState(
    Array(3).fill(null).map(() => ({ color: colors[0] || '', size: sizes[0] || '' }))
  );

  const { selectedColor, setSelectedColor } = useProductSelection();
  
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0]);
    }
  }, [colors, selectedColor, setSelectedColor]);

  useEffect(() => {
    const offer = bundleOffers.find(o => o.quantity === selectedQuantity) || bundleOffers[0];
    setTotalPrice(offer.price + shippingCost);
  }, [selectedQuantity, productPrice, shippingCost]);

  const handleColorSelect = (index: number, color: string) => {
    const newSelections = [...itemSelections];
    newSelections[index].color = color;
    setItemSelections(newSelections);
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
    setSelectedCommune('');
  };

  return (
    <div id="order-form" className="glass-premium w-full p-6 sm:p-10 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden border-emerald-500/10">
      {/* Scarcity Marquee - Improved Integration */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md flex items-center overflow-hidden border-b border-white/5">
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap flex gap-12 items-center pr-12"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                متبقي 7 قطع فقط
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <span className="flex items-center gap-2 text-[9px] font-black text-amber-500 uppercase tracking-[0.25em]">
                طلب مؤكد منذ 2 دقيقة
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <span className="flex items-center gap-2 text-[9px] font-black text-cyan-400 uppercase tracking-[0.25em]">
                توصيل سريع مجاني
              </span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 pt-10">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">تأكيد الطلب</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm text-emerald-400/80 font-bold uppercase tracking-widest">الدفع عند الاستلام</p>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
        </div>

        <form action={formAction} onFocus={handleFocus} className="space-y-8">
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="quantity" value={selectedQuantity} />
          <input type="hidden" name="itemSelections" value={JSON.stringify(itemSelections.slice(0, selectedQuantity))} />
          <input type="hidden" name="bundlePrice" value={bundleOffers.find(o => o.quantity === selectedQuantity)?.price || basePrice} />
          <input type="hidden" name="shippingMethod" value={shippingMethod} />
          <input type="hidden" name="shippingCost" value={shippingCost} />

          {/* Bundle Selector - Enhanced */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1">اختر باقة التوفير</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bundleOffers.map((offer) => (
                <button
                  key={offer.quantity}
                  type="button"
                  onClick={() => setSelectedQuantity(offer.quantity)}
                  className={`relative p-5 rounded-[2rem] border-2 text-right transition-all duration-500 group overflow-hidden ${
                    selectedQuantity === offer.quantity
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.2)]'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      selectedQuantity === offer.quantity ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-400'
                    }`}>
                      {offer.tag}
                    </span>
                    {offer.discount && (
                      <span className="text-amber-500 text-[10px] font-black">{offer.discount}</span>
                    )}
                  </div>
                  <div className={`text-sm font-bold mb-1 transition-colors ${selectedQuantity === offer.quantity ? 'text-emerald-400' : 'text-slate-500'}`}>{offer.title}</div>
                  <div className={`text-2xl font-black transition-colors ${selectedQuantity === offer.quantity ? 'text-white' : 'text-slate-300'}`}>
                    {Math.round(offer.price)} <span className="text-xs text-emerald-500 ml-1 font-bold">DZD</span>
                  </div>
                  {selectedQuantity === offer.quantity && (
                    <motion.div 
                      layoutId="bundle-active"
                      className="absolute inset-0 border-2 border-emerald-500 pointer-events-none rounded-[2rem]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: 'الاسم الكامل', name: 'name', type: 'text', placeholder: 'أدخل اسمك الكامل هنا...', icon: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
              { label: 'رقم الهاتف', name: 'phone', type: 'tel', placeholder: '05 / 06 / 07 xxxxxxxx', icon: <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> }
            ].map((field) => (
              <div key={field.name} className="group space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1 group-focus-within:text-amber-500 transition-colors">{field.label}</label>
                <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-6 py-5 bg-white/[0.02] border-2 border-white/5 rounded-2xl focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.02] focus:ring-4 focus:ring-amber-500/5 text-white placeholder:text-slate-700 transition-all text-lg font-bold"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{field.icon}</svg>
                    </div>
                  </div>
                </div>
              ))}
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'الولاية', name: 'wilaya', value: selectedWilaya, onChange: handleWilayaChange, options: algeriaCities.map(w => ({ id: w.id, name: w.name })), placeholder: 'اختر الولاية' },
                  { label: 'البلدية', name: 'commune', value: selectedCommune, onChange: (e: any) => setSelectedCommune(e.target.value), options: availableCommunes.map(c => ({ id: c, name: c })), placeholder: 'اختر البلدية', disabled: !selectedWilaya }
                ].map((select) => (
                  <div key={select.name} className="group space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-1 group-focus-within:text-amber-500 transition-colors">{select.label}</label>
                    <div className="relative">
                      <select
                        name={select.name}
                        required
                        value={select.value}
                        onChange={select.onChange}
                        disabled={select.disabled}
                        className="w-full px-6 py-5 bg-white/[0.02] border-2 border-white/5 rounded-2xl focus:outline-none focus:border-amber-500/50 focus:bg-amber-500/[0.02] focus:ring-4 focus:ring-amber-500/5 text-white appearance-none transition-all font-bold disabled:opacity-20"
                      >
                        <option value="" disabled className="bg-[#020617]">{select.placeholder}</option>
                        {select.options.map((opt) => (
                          <option key={opt.id} value={opt.name} className="bg-[#020617]">
                            {opt.id && !isNaN(Number(opt.id)) ? `${opt.id} - ` : ''}{opt.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Item Options - Premium Treatment */}
          {(colors.length > 0 || sizes.length > 0) && (
            <div className="space-y-6 pt-4">
              <AnimatePresence mode="popLayout">
                {Array.from({ length: selectedQuantity }).map((_, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6 shadow-inner"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-500/30">{index + 1}</div>
                      <div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">تخصيص المنتج</h3>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">اختر اللون والمقاس المفضل</p>
                      </div>
                    </div>
                    
                    {colors.length > 0 && (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">اللون المفضل</label>
                        <div className="flex flex-wrap gap-3">
                          {colors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => handleColorSelect(index, color)}
                              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border-2 transition-all duration-500 ${
                                itemSelections[index].color === color
                                  ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg shadow-emerald-500/10'
                                  : 'border-white/5 bg-white/[0.01] text-slate-600 hover:border-white/10'
                              }`}
                            >
                              <span 
                                className="w-5 h-5 rounded-full border-2 border-white/10 shadow-sm"
                                style={{ backgroundColor: getColorHex(color) }}
                              />
                              <span className="text-sm font-black tracking-tight">{color}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {sizes.length > 0 && (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">المقاس المناسب</label>
                        <div className="flex flex-wrap gap-3">
                          {sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeSelect(index, size)}
                              className={`min-w-[60px] h-12 flex items-center justify-center rounded-2xl border-2 text-sm font-black transition-all duration-500 ${
                                itemSelections[index].size === size
                                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10'
                                  : 'border-white/5 bg-white/[0.01] text-slate-600 hover:border-white/10'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Shipping Methods - Premium Grid */}
          <div className="space-y-4 pt-6 border-t border-white/5">
            <div className="flex items-center justify-between px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">خيار الشحن</label>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">الدفع عند الاستلام</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'home', label: 'توصيل للمنزل', price: 600, icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> },
                { id: 'stopdesk', label: 'استلام من المكتب', price: 400, icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> }
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setShippingMethod(method.id as any)}
                  className={`p-6 rounded-3xl border-2 text-right transition-all duration-500 group relative overflow-hidden ${
                    shippingMethod === method.id
                      ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                      : 'border-white/5 bg-white/[0.02] hover:border-white/10'
                  }`}
                >
                  <div className={`mb-3 transition-colors ${shippingMethod === method.id ? 'text-emerald-400' : 'text-slate-700'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{method.icon}</svg>
                  </div>
                  <div className={`text-xs font-black uppercase tracking-widest mb-1 ${shippingMethod === method.id ? 'text-white' : 'text-slate-600'}`}>{method.label}</div>
                  <div className={`text-lg font-black ${shippingMethod === method.id ? 'text-emerald-400' : 'text-slate-400'}`}>{method.price} DZD</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Summary - Ultra Premium */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-neutral-900 to-black border-2 border-white/5 space-y-5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-700" />
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span className="uppercase tracking-widest">سعر الطلبية</span>
                <span className="text-white">{Math.round(bundleOffers.find(o => o.quantity === selectedQuantity)?.price || basePrice)} DZD</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span className="uppercase tracking-widest">تكلفة الشحن</span>
                <span className="text-white">{shippingCost} DZD</span>
              </div>
            </div>
            
            <div className="h-px bg-white/5" />
            
            <div className="flex justify-between items-end pt-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-1 block">المبلغ الإجمالي</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">{Math.round(totalPrice)}</span>
                  <span className="text-sm font-black text-emerald-500 uppercase">DZD</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter">شامل الضريبة</div>
                <div className="text-[8px] font-black text-slate-700 uppercase tracking-widest">No hidden fees</div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {state?.error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="p-5 text-sm font-black text-red-400 bg-red-500/10 border-2 border-red-500/20 rounded-2xl flex items-center gap-4 shadow-lg shadow-red-500/10"
              >
                <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </div>
                {state.error}
              </motion.div>
            )}
          </AnimatePresence>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

