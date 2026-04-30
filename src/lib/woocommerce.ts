const ck = process.env.WC_CONSUMER_KEY;
const cs = process.env.WC_CONSUMER_SECRET;
const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getProducts(params = {}) {
  const url = new URL(`${baseUrl}/wp-json/wc/v3/products`);
  
  // Add standard params
  url.searchParams.append('consumer_key', ck!);
  url.searchParams.append('consumer_secret', cs!);
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour (ISR)
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WooCommerce API Error:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts({ slug });
  return products[0] || null;
}

export async function createOrder(orderData: any) {
  const url = new URL(`${baseUrl}/wp-json/wc/v3/orders`);
  
  // Add auth params
  url.searchParams.append('consumer_key', ck!);
  url.searchParams.append('consumer_secret', cs!);

  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Failed to create order. Response:', errorData);
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('WooCommerce API Error (createOrder):', error);
    throw error;
  }
}
