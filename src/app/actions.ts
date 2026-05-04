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
  const quantity = parseInt(formData.get('quantity') as string || '1', 10);
  const bundlePriceStr = formData.get('bundlePrice') as string;
  const itemSelectionsStr = formData.get('itemSelections') as string;
  const shippingMethod = formData.get('shippingMethod') as string;
  const shippingCost = formData.get('shippingCost') as string || '600';

  if (!productId || !name || !phone || !wilaya || !commune) {
    return { error: 'Please fill in all required fields.' };
  }

  // Parse multi-item variations
  let parsedSelections: any[] = [];
  try {
    if (itemSelectionsStr) parsedSelections = JSON.parse(itemSelectionsStr);
  } catch (e) {}

  let customerNote = '';
  if (parsedSelections.length > 0) {
    customerNote = parsedSelections
      .map((sel, i) => `القطعة ${i + 1} - اللون: ${sel.color || 'غير محدد'} | المقاس: ${sel.size || 'غير محدد'}`)
      .join('\n');
  }
  
  // Append shipping info to note
  customerNote += `\n\nطريقة التوصيل: ${shippingMethod === 'home' ? 'للمنزل' : 'للمكتب (Stopdesk)'}`;

  // Construct WooCommerce Order Payload
  const orderData: any = {
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
        quantity: quantity,
      },
    ],
    // Dynamic shipping rate
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: (shippingMethod === 'home' ? 'توصيل للمنزل' : 'توصيل للمكتب') + ' - ' + wilaya,
        total: shippingCost,
      },
    ],
    customer_note: customerNote,
  };

  // If a specific bundle price was sent, override the line item total
  if (bundlePriceStr) {
    orderData.line_items[0].subtotal = bundlePriceStr;
    orderData.line_items[0].total = bundlePriceStr;
  }

  let createdOrder;
  try {
    createdOrder = await createOrder(orderData);
    if (!createdOrder || !createdOrder.id) {
      return { error: 'Failed to create order on the server.' };
    }
  } catch (err: any) {
    return { error: err.message || 'An unexpected error occurred.' };
  }

  // Redirect to Thank You page with order ID and secure key
  redirect(`/thank-you?order=${createdOrder.id}&key=${createdOrder.order_key}`);
}
