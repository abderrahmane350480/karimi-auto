/**
 * Google Apps Script — Karimi Auto Order Webhook Receiver
 *
 * SETUP:
 * 1. Open your Google Sheet "orders karimi store"
 * 2. Go to Extensions > Apps Script
 * 3. Delete everything in Code.gs and paste this entire file
 * 4. Click Deploy > New deployment (or Manage deployments > edit existing)
 * 5. Type: Web app | Execute as: Me | Who has access: Anyone
 * 6. Click Deploy and copy the URL
 * 7. Paste the URL in EasyPanel frontend environment as GOOGLE_SHEET_WEBHOOK_URL
 *
 * Sheet columns (row 1 headers):
 * A: data | B: order id | C: country | D: name | E: phone
 * F: products | G: sku | H: quantiy | I: totalprice | J: currency | K: status
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Feuille 1");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    }

    var payload = JSON.parse(e.postData.contents);

    // Generate sequential order number: KARIMI-00001, KARIMI-00002, ...
    // lastRow includes the header row, so data rows = lastRow - 1
    var dataRows = sheet.getLastRow() - 1;
    var nextNum = dataRows + 1;
    var sequentialOrderId = "KARIMI-" + String(nextNum).padStart(5, "0");

    var row = [
      payload.data       || "",
      sequentialOrderId,
      payload.country    || "Morocco",
      payload.name       || "",
      payload.phone      || "",
      payload.products   || "",
      payload.sku        || "",
      payload.quantiy    || "",
      payload.totalprice || 0,
      payload.currency   || "MAD",
      payload.status     || ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", order_id: sequentialOrderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Karimi Auto webhook is active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
