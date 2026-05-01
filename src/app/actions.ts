'use server';

import { createOrder } from '@/lib/woocommerce';
import { redirect } from 'next/navigation';

export async function submitCodOrder(prevState: any, formData: FormData) {
  // Extract fields from FormData
  const productId = formData.get('productId');
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const wilaya = formData.get('wilaya') as string;
  const commune = formData.get('commune') as string;
  const color = formData.get('color') as string;
  const size = formData.get('size') as string;

  if (!productId || !name || !phone || !wilaya || !commune) {
    return { error: 'Please fill in all required fields.' };
  }

  // Construct WooCommerce Order Payload
  const orderData = {
    payment_method: 'cod',
    payment_method_title: 'Cash on Delivery',
    set_paid: false,
    billing: {
      first_name: name,
      last_name: '',
      address_1: commune,
      city: wilaya,
      state: wilaya,
      country: 'DZ',
      phone: phone,
    },
    shipping: {
      first_name: name,
      last_name: '',
      address_1: commune,
      city: wilaya,
      state: wilaya,
      country: 'DZ',
    },
    line_items: [
      {
        product_id: parseInt(productId as string, 10),
        quantity: 1,
      },
    ],
    // Flat rate shipping of 600 DZD
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Delivery to ' + wilaya,
        total: '600',
      },
    ],
    customer_note: `Color: ${color || 'N/A'}, Size: ${size || 'N/A'}`,
  };

  let createdOrder;
  try {
    createdOrder = await createOrder(orderData);
    if (!createdOrder || !createdOrder.id) {
      return { error: 'Failed to create order on the server.' };
    }
  } catch (err: any) {
    return { error: err.message || 'An unexpected error occurred.' };
  }

  // Redirect to Thank You page with order ID
  redirect(`/thank-you?order=${createdOrder.id}`);
}
