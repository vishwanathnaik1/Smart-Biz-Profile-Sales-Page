import assert from "node:assert/strict";
import test from "node:test";
import {
  SHEET_HEADER_ROW,
  buildSheetSubmissionRow,
  buildWebhookRequest,
  escapeSheetTitle,
  extractSpreadsheetId,
  formatAsiaKolkataTimestamp,
  submitFormToBackend,
} from "./googleSheets";

test("extractSpreadsheetId parses full Google Sheets URLs and raw IDs", () => {
  assert.equal(
    extractSpreadsheetId(
      "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit#gid=0",
    ),
    "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  assert.equal(
    extractSpreadsheetId("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"),
    "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  );
  assert.equal(extractSpreadsheetId("https://example.com/not-a-sheet"), null);
  assert.equal(extractSpreadsheetId("   "), null);
});

test("escapeSheetTitle safely quotes tab names with spaces and apostrophes", () => {
  assert.equal(escapeSheetTitle("Form Submissions"), "'Form Submissions'");
  assert.equal(escapeSheetTitle("Vishu's Leads"), "'Vishu''s Leads'");
});

test("formatAsiaKolkataTimestamp converts UTC dates to Asia/Kolkata (+05:30)", () => {
  assert.equal(
    formatAsiaKolkataTimestamp("2026-11-13T14:15:00.000Z"),
    "13/11/2026, 07:45:00 PM IST",
  );
  assert.equal(
    formatAsiaKolkataTimestamp("2026-11-13T19:00:00.000Z"),
    "14/11/2026, 12:30:00 AM IST",
  );
  assert.equal(
    formatAsiaKolkataTimestamp("13/11/2026, 07:45:00 PM IST"),
    "13/11/2026, 07:45:00 PM IST",
  );
});

test("buildSheetSubmissionRow formats Claim Smart Biz Profile submissions cleanly in Asia/Kolkata", () => {
  const row = buildSheetSubmissionRow({
    formType: "Claim Smart Biz Profile",
    name: " Vishwanath Naik ",
    email: " vishunaik1229@gmail.com ",
    categoryOrSubject: "Freelancers & Consultants",
    phone: "7507384721",
    notesOrMessage: "Profile Setup Request",
    whatsappMessage:
      "Hi! I'm Vishwanath Naik. I run a Freelancers & Consultants business and I want to build my Smart Biz Profile. My WhatsApp number is 7507384721. Please share the next steps.",
    submittedAt: "2026-11-13T14:15:00.000Z",
  });

  assert.equal(row.length, SHEET_HEADER_ROW.length);
  assert.deepEqual(row, [
    "13/11/2026, 07:45:00 PM IST",
    "Claim Smart Biz Profile",
    "Vishwanath Naik",
    "vishunaik1229@gmail.com",
    "Freelancers & Consultants",
    "7507384721",
    "Profile Setup Request",
    "Hi! I'm Vishwanath Naik. I run a Freelancers & Consultants business and I want to build my Smart Biz Profile. My WhatsApp number is 7507384721. Please share the next steps.",
  ]);
});

test("buildWebhookRequest preserves existing query params and populates JSON + parameter fields", () => {
  const req = buildWebhookRequest(
    "https://script.google.com/macros/s/abc123/exec?gid=0",
    {
      formType: "Contact Us Enquiry",
      name: " Vishwanath Naik ",
      email: " vishunaik1229@gmail.com ",
      categoryOrSubject: "Sales Enquiries",
      phone: "7507384721",
      notesOrMessage: "Want a profile",
      whatsappMessage: "Smart Biz Profile Enquiry",
      submittedAt: "2026-11-13T14:15:00.000Z",
    },
    {
      spreadsheetId: "sheet-123",
      sheetTitle: "Sheet1",
    },
  );

  const parsedUrl = new URL(req.url);
  assert.equal(parsedUrl.searchParams.get("gid"), "0");
  assert.equal(parsedUrl.searchParams.get("submittedAt"), "13/11/2026, 07:45:00 PM IST");
  assert.equal(parsedUrl.searchParams.get("name"), "Vishwanath Naik");
  assert.equal(parsedUrl.searchParams.get("email"), "vishunaik1229@gmail.com");
  assert.equal(parsedUrl.searchParams.get("sheetTitle"), "Sheet1");
  assert.equal(parsedUrl.searchParams.get("spreadsheetId"), "sheet-123");
  assert.equal(req.payload.row[0], "13/11/2026, 07:45:00 PM IST");
  assert.equal(req.payload.row[4], "Sales Enquiries");
});

test("submitFormToBackend falls back to Apps Script webhook when /api/submissions returns 404", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === "/api/submissions") {
      return new Response("<html>404</html>", {
        status: 404,
        headers: { "content-type": "text/html" },
      });
    }
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const res = await submitFormToBackend(
      {
        formType: "Claim Smart Biz Profile",
        name: "Vishwanath Naik",
        email: "vishunaik1229@gmail.com",
        categoryOrSubject: "Freelancers & Consultants",
        phone: "7507384721",
        notesOrMessage: "Smart Biz Profile setup request",
        whatsappMessage: "Hi!",
        submittedAt: "2026-11-13T14:15:00.000Z",
      },
      {
        webhookUrl: "https://script.google.com/macros/s/test/exec?gid=0",
      },
    );

    assert.equal(res.ok, true);
    assert.equal(res.syncedToSheet, true);
    assert.equal(calls.length, 2);
    assert.equal(calls[0].url, "/api/submissions");
    assert.match(calls[1].url, /^https:\/\/script\.google\.com\/macros\/s\/test\/exec\?gid=0&/);
    assert.equal(calls[1].init?.mode, "no-cors");
    assert.equal(calls[1].init?.keepalive, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("submitFormToBackend dispatches webhook directly when skipBackendProbe is true", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push({ url: String(input), init });
    return new Response(null, { status: 200 });
  }) as typeof fetch;

  try {
    const res = await submitFormToBackend(
      {
        formType: "Contact Us Enquiry",
        name: "Vishwanath Naik",
        email: "vishunaik1229@gmail.com",
        categoryOrSubject: "Sales Enquiries",
        phone: "7507384721",
        notesOrMessage: "Testing direct dispatch",
        whatsappMessage: "Enquiry",
        submittedAt: "2026-11-13T14:15:00.000Z",
      },
      {
        webhookUrl: "https://script.google.com/macros/s/test/exec?gid=0",
        skipBackendProbe: true,
      },
    );

    assert.equal(res.ok, true);
    assert.equal(res.syncedToSheet, true);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /^https:\/\/script\.google\.com\/macros\/s\/test\/exec\?gid=0&/);
    assert.equal(calls[0].init?.keepalive, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
