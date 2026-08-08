import { NextRequest, NextResponse } from "next/server";

// Product name lookup for Google Sheets display
const PRODUCT_NAMES: Record<string, string> = {
  "umbrella-sunshade-titanium": "واقي الشمس المظلة",
  "nano-ceramic-coating-spray": "سبراي السيراميك نانو",
  "gps-tracker-4g-anti-theft": "جهاز GPS ضد السرقة 4G",
};

function generateOrderId(): string {
  return crypto.randomUUID();
}

// Fallback order number used only if Google Sheets webhook is unavailable
function generateFallbackOrderNumber(): string {
  const num = String(Math.floor(Math.random() * 90000) + 10000);
  return `KARIMI-${num}`;
}

// Returns the sequential order ID assigned by Google Sheets (e.g. "KARIMI-00001"), or null on failure
async function pushToGoogleSheets(payload: {
  orderId: string;
  name: string;
  phone: string;
  products: string;
  sku: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  status: string;
}): Promise<string | null> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return null;

  const body = {
    data: new Date().toISOString().slice(0, 10),
    order_id: payload.orderId,
    country: "Morocco",
    name: payload.name,
    phone: payload.phone,
    products: payload.products,
    sku: payload.sku,
    quantiy: payload.quantity,
    totalprice: payload.totalPrice,
    currency: payload.currency,
    status: payload.status,
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    if (!res.ok) {
      console.error(`[orders] Google Sheets webhook returned ${res.status}`);
      return null;
    }
    const json = await res.json();
    console.log("[orders] ✅ Google Sheets webhook success, order_id:", json.order_id);
    return json.order_id ?? null;
  } catch (err) {
    console.error("[orders] ❌ Failed to push to Google Sheets:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { customer, cart, totals } = body as {
      customer: { name: string; phoneRaw: string; phoneE164: string };
      cart: { slug: string; bundlePieces: number; quantity: number; source: string }[];
      totals: { subtotal: number; upsellTotal: number; grandTotal: number; currency: string };
    };

    if (!customer?.name || !customer?.phoneE164 || !cart?.length) {
      return NextResponse.json({ detail: "بيانات الطلب غير مكتملة" }, { status: 400 });
    }

    const orderId = generateOrderId();
    const grandTotal = totals.grandTotal;

    // Build response items
    const items = cart.map((item) => {
      const nameAr = PRODUCT_NAMES[item.slug] ?? item.slug;
      const unitPrice =
        item.source === "upsell" ? 199 :
        item.source === "cross_sell_addon" ? (item.bundlePieces === 1 ? 150 : 200) :
        item.bundlePieces === 1 ? 299 : item.bundlePieces === 2 ? 379 : 449;

      return {
        slug: item.slug,
        nameAr,
        bundlePieces: item.bundlePieces,
        source: item.source,
        unitPriceMad: unitPrice,
        lineTotalMad: unitPrice,
      };
    });

    // Build readable product/sku strings for Google Sheets
    const productStr = items.map((i) => `${i.nameAr} ×${i.bundlePieces}`).join(" | ");
    const skuStr = cart.map((i) => `${i.slug}:${i.bundlePieces}`).join(",");
    const totalQty = cart.reduce((s, i) => s + i.bundlePieces, 0);

    // Google Sheets assigns the sequential order number (KARIMI-00001, etc.)
    const sheetOrderNumber = await pushToGoogleSheets({
      orderId,
      name: customer.name,
      phone: customer.phoneE164,
      products: productStr,
      sku: skuStr,
      quantity: totalQty,
      totalPrice: grandTotal,
      currency: totals.currency || "MAD",
      status: "pending",
    });

    const orderNumber = sheetOrderNumber ?? generateFallbackOrderNumber();

    return NextResponse.json({
      orderId,
      orderNumber,
      status: "pending",
      grandTotalMad: grandTotal,
      currency: totals.currency || "MAD",
      items,
    });
  } catch (err) {
    console.error("[orders] Unexpected error:", err);
    return NextResponse.json({ detail: "خطأ في معالجة الطلب" }, { status: 500 });
  }
}
