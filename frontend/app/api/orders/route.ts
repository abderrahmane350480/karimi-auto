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

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `KARIMI-${ts}-${rand}`;
}

async function pushToGoogleSheets(payload: {
  orderNumber: string;
  orderId: string;
  name: string;
  phone: string;
  products: string;
  sku: string;
  quantity: number;
  totalPrice: number;
  currency: string;
  status: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return; // skip silently if not configured

  const body = {
    data: new Date().toISOString().slice(0, 10),
    order_id: payload.orderNumber,
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
      redirect: "follow", // Google Apps Script always redirects — must follow
    });
    if (!res.ok) {
      console.error(`[orders] Google Sheets webhook returned ${res.status}`);
    } else {
      console.log("[orders] ✅ Google Sheets webhook success");
    }
  } catch (err) {
    console.error("[orders] ❌ Failed to push to Google Sheets:", err);
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
    const orderNumber = generateOrderNumber();
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

    await pushToGoogleSheets({
      orderNumber,
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
