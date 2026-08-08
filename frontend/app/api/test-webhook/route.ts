import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      status: "❌ NOT CONFIGURED",
      fix: "Open frontend/.env.local and paste your Apps Script URL as GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/...",
    }, { status: 400 });
  }

  const testPayload = {
    data: new Date().toISOString().slice(0, 10),
    order_id: "KARIMI-TEST-001",
    country: "Morocco",
    name: "اختبار كريمي أوطو",
    phone: "+212600000000",
    products: "واقي الشمس المظلة ×1",
    sku: "umbrella-sunshade-titanium:1",
    quantiy: 1,
    totalprice: 299,
    currency: "MAD",
    status: "test",
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
      redirect: "follow",
    });

    const text = await res.text();
    let json: unknown = null;
    try { json = JSON.parse(text); } catch { /* ignore */ }

    if (res.ok) {
      return NextResponse.json({
        status: "✅ SUCCESS",
        message: "Check your Google Sheet — a test row should have appeared",
        webhookStatus: res.status,
        webhookResponse: json ?? text,
      });
    } else {
      return NextResponse.json({
        status: "❌ WEBHOOK ERROR",
        webhookStatus: res.status,
        webhookResponse: json ?? text,
        fix: "Make sure the Apps Script is deployed as 'Anyone' can access and re-deploy if needed",
      }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({
      status: "❌ FETCH ERROR",
      error: String(err),
      fix: "Check your GOOGLE_SHEET_WEBHOOK_URL is the full deployment URL ending in /exec",
    }, { status: 500 });
  }
}
