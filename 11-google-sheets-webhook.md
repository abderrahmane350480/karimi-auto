# Google Sheets Webhook

## Purpose

The backend sends every order to a Google Sheet through an Apps Script web app. This gives the operator a simple order operations dashboard while PostgreSQL remains the source of truth.

## Files

- Apps Script: `docs/assets/google_sheet_webhook.gs`
- CSV template: `docs/assets/order_sheet_template.csv`

## Sheet Setup

1. Create a Google Sheet.
2. Add headers from `order_sheet_template.csv`.
3. Open Extensions -> Apps Script.
4. Paste `google_sheet_webhook.gs`.
5. Set script property:
   - `WEBHOOK_SECRET`
6. Deploy as Web App:
   - Execute as: Me.
   - Who has access: Anyone with link.
7. Copy Web App URL into backend env:
   - `GOOGLE_SHEET_WEBHOOK_URL`
8. Set same secret in backend:
   - `GOOGLE_SHEET_WEBHOOK_SECRET`

## Backend Request

Backend sends:

```http
POST {GOOGLE_SHEET_WEBHOOK_URL}?secret={GOOGLE_SHEET_WEBHOOK_SECRET}
Content-Type: application/json
```

Google Apps Script Web Apps do not reliably expose custom request headers, so authenticate with the `secret` query parameter or include `secret` in the JSON body.

Body:

```json
{
  "secret": "same-secret-if-not-using-query-param",
  "order_id": "uuid",
  "order_number": "KA-20260730-000001",
  "status": "needs_confirmation",
  "customer_name": "Name",
  "phone": "+212612345678",
  "items": [
    {
      "slug": "cyclone-vacuum-15000pa",
      "name_ar": "مكنسة سيكلون 15000 باسكال ضد الوسخ فالطوموبيل",
      "quantity": 1,
      "bundle_pieces": 2,
      "source": "product_page",
      "line_total_mad": 379
    }
  ],
  "subtotal_mad": 379,
  "upsell_total_mad": 199,
  "grand_total_mad": 578,
  "currency": "MAD",
  "landing_page": "https://karimiauto.site/products/...",
  "utm_source": "tiktok",
  "utm_campaign": "campaign",
  "purchase_event_id": "uuid",
  "created_at": "2026-07-30T01:00:00Z"
}
```

## Sheet Columns

Use the CSV template exactly, then add extra columns later if needed.

Important operational columns:

- `status`
- `confirmation_notes`
- `delivery_city`
- `address`
- `agent`
- `last_call_at`
- `follow_up_at`

These can be filled manually by operations after order creation.

## Failure Handling

If Apps Script returns non-200:

- Store the order in DB.
- Mark `sheet_sync_status = failed`.
- Log response.
- Return success to user unless DB insert failed.

Add a future retry admin command if needed.
