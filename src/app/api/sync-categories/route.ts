import { NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/woocommerce';

const CATEGORY_STRUCTURE = {
  "Men": {
    "Clothing": ["T-Shirts", "Shirts", "Polo", "Hoodies & Sweatshirts", "Jackets & Coats", "Suits & Blazers", "Jeans", "Pants & Trousers", "Shorts", "Underwear", "Sleepwear"],
    "Footwear": ["Sneakers", "Casual Shoes", "Formal Shoes", "Boots", "Sandals & Slippers"],
    "Accessories": ["Watches", "Belts", "Wallets", "Bags & Backpacks", "Sunglasses", "Hats & Caps"],
    "Grooming": ["Perfumes", "Skincare", "Haircare", "Beard Care"]
  },
  "Women": {
    "Clothing": ["Dresses", "Tops & Blouses", "T-Shirts", "Shirts", "Hoodies & Sweatshirts", "Jackets & Coats", "Jeans", "Pants & Leggings", "Skirts", "Shorts", "Lingerie", "Sleepwear", "Abayas & Modest Wear"],
    "Footwear": ["Heels", "Flats", "Sneakers", "Boots", "Sandals & Slippers"],
    "Accessories": ["Handbags", "Wallets", "Jewelry", "Watches", "Sunglasses", "Scarves & Hijabs"],
    "Beauty": ["Makeup", "Skincare", "Haircare", "Perfumes"]
  }
};

export async function GET() {
  try {
    const existingCategories = await getCategories();
    const results: any[] = [];

    async function findOrCreate(name: string, parentId: number = 0) {
      const existing = existingCategories.find((c: any) => c.name === name && c.parent === parentId);
      if (existing) {
        console.log(`Category exists: ${name}`);
        return existing.id;
      }
      
      console.log(`Creating category: ${name} (Parent: ${parentId})`);
      const newCat = await createCategory({
        name,
        parent: parentId
      });
      return newCat.id;
    }

    for (const [mainCat, subCats] of Object.entries(CATEGORY_STRUCTURE)) {
      const mainId = await findOrCreate(mainCat);
      
      for (const [subCat, items] of Object.entries(subCats)) {
        const subId = await findOrCreate(subCat, mainId);
        
        for (const item of items as string[]) {
          await findOrCreate(item, subId);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Categories synchronized successfully" });
  } catch (error: any) {
    console.error('Sync Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
