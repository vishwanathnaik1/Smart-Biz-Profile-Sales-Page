import assert from "node:assert/strict";
import test from "node:test";
import {
  SHEET_HEADER_ROW,
  buildSheetSubmissionRow,
  escapeSheetTitle,
  extractSpreadsheetId,
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

test("buildSheetSubmissionRow formats Claim Smart Biz Profile submissions cleanly", () => {
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
    "2026-11-13T14:15:00.000Z",
    "Claim Smart Biz Profile",
    "Vishwanath Naik",
    "vishunaik1229@gmail.com",
    "Freelancers & Consultants",
    "7507384721",
    "Profile Setup Request",
    "Hi! I'm Vishwanath Naik. I run a Freelancers & Consultants business and I want to build my Smart Biz Profile. My WhatsApp number is 7507384721. Please share the next steps.",
  ]);
});
