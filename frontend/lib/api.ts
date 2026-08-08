// Empty string → uses relative path /api/orders (Next.js built-in API route)
// Set NEXT_PUBLIC_API_BASE_URL to point at an external backend if needed
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export interface CartItemPayload {
  slug: string;
  bundlePieces: number;
  quantity: number;
  source: "product_page" | "cart_cross_sell" | "upsell" | "cross_sell_addon";
}

export interface CreateOrderPayload {
  customer: {
    name: string;
    phoneRaw: string;
    phoneE164: string;
  };
  cart: CartItemPayload[];
  totals: {
    subtotal: number;
    upsellTotal: number;
    grandTotal: number;
    currency: "MAD";
  };
  attribution: {
    landingPage?: string;
    referrer?: string;
    fbclid?: string;
    ttclid?: string;
    sc_click_id?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  };
  tracking: {
    checkoutEventId?: string;
    purchaseEventId: string;
    fbp?: string;
    fbc?: string;
    ttp?: string;
    scid?: string;
  };
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
  status: string;
  grandTotalMad: number;
  currency: string;
  items: {
    slug: string;
    nameAr: string;
    bundlePieces: number;
    source: string;
    unitPriceMad: number;
    lineTotalMad: number;
  }[];
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<OrderResponse> {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "خطأ غير متوقع" }));
    throw new Error(err.detail ?? "فشل إرسال الطلب");
  }
  return res.json();
}
