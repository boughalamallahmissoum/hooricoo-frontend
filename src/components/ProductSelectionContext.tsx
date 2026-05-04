'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ProductSelectionContextType = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const ProductSelectionContext = createContext<ProductSelectionContextType | undefined>(undefined);

export function ProductSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <ProductSelectionContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ProductSelectionContext.Provider>
  );
}

export function useProductSelection() {
  const context = useContext(ProductSelectionContext);
  if (context === undefined) {
    throw new Error('useProductSelection must be used within a ProductSelectionProvider');
  }
  return context;
}
