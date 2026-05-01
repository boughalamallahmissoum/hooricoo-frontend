'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  images: { src: string; alt: string }[];
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -10 }}
        className="glass p-4 group cursor-pointer h-full"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl mb-4 bg-white/5">
          {product.images && product.images[0] && (
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-semibold">View Details</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-[var(--primary-color)] font-bold text-2xl">{product.price} DZD</span>
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
