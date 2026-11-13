export const SHEET_HEADER_ROW = [
  "Submitted At",
  "Form Type",
  "Name",
  "Email",
  "Business Type / Subject",
  "WhatsApp / Phone",
  "Message",
  "Generated WhatsApp Message",
] as const;

export type FormSubmissionType = "Claim Smart Biz Profile" | "Contact Us Enquiry";

export interface FormSubmissionEntry {
  formType: FormSubmissionType;
  name: string;
  email: string;
  categoryOrSubject: string;
  phone: string;
  notesOrMessage: string;
  whatsappMessage: string;
  submittedAt?: string;
}

export interface SheetTabInfo {
  sheetId: number;
  title: string;
}

export interface SpreadsheetMetadata {
  spreadsheetId: string;
  title: string;
  spreadsheetUrl: string;
  sheets: SheetTabInfo[];
}

export interface ConnectedSheetConfig {
  spreadsheetId: string;
  spreadsheetTitle: string;
  sheetTitle: string;
  spreadsheetUrl: string;
}

const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

export function extractSpreadsheetId(rawInput: string): string | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  const urlMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (urlMatch?.[1]) {
    return urlMatch[1];
  }

  if (/^[a-zA-Z0-9-_]{15,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function escapeSheetTitle(sheetTitle: string): string {
  const cleaned = sheetTitle.trim() || "Form Submissions";
  return `'${cleaned.replace(/'/g, "''")}'`;
}

export function buildSheetSubmissionRow(entry: FormSubmissionEntry): string[] {
  const timestamp = entry.submittedAt ?? new Date().toISOString();
  return [
    timestamp,
    entry.formType,
    entry.name.trim(),
    entry.email.trim(),
    entry.categoryOrSubject.trim(),
    entry.phone.trim(),
    entry.notesOrMessage.trim(),
    entry.whatsappMessage.trim(),
  ];
}

export class SheetsApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SheetsApiError";
    this.status = status;
  }
}

async function parseSheetsResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const apiMessage =
      data?.error?.message || `Google Sheets request failed with status ${res.status}.`;
    throw new SheetsApiError(apiMessage, res.status);
  }
  return data as T;
}

export async function fetchSpreadsheetInfo(
  accessToken: string,
  spreadsheetId: string,
): Promise<SpreadsheetMetadata> {
  const url = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets.properties(sheetId,title)`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await parseSheetsResponse<{
    spreadsheetId: string;
    spreadsheetUrl: string;
    properties?: { title?: string };
    sheets?: Array<{ properties?: { sheetId?: number; title?: string } }>;
  }>(res);

  const sheets: SheetTabInfo[] = (data.sheets ?? [])
    .map((s) => ({
      sheetId: s.properties?.sheetId ?? 0,
      title: s.properties?.title ?? "Sheet1",
    }))
    .filter((s) => Boolean(s.title));

  return {
    spreadsheetId: data.spreadsheetId,
    title: data.properties?.title || "Connected Spreadsheet",
    spreadsheetUrl:
      data.spreadsheetUrl ||
      `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/edit`,
    sheets,
  };
}

export async function readSheetPreviewRows(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<string[][]> {
  const range = `${escapeSheetTitle(sheetTitle)}!A1:H11`;
  const url = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await parseSheetsResponse<{ values?: string[][] }>(res);
  return data.values ?? [];
}

export async function initializeSheetHeaders(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<void> {
  const range = `${escapeSheetTitle(sheetTitle)}!A1:H1`;
  const url = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range,
      majorDimension: "ROWS",
      values: [[...SHEET_HEADER_ROW]],
    }),
  });
  await parseSheetsResponse(res);
}

export async function createLeadsSpreadsheet(
  accessToken: string,
  title = "Smart Biz Profile — Form Submissions",
): Promise<ConnectedSheetConfig> {
  const tabTitle = "Form Submissions";
  const res = await fetch(SHEETS_API_BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: { title },
      sheets: [
        {
          properties: {
            title: tabTitle,
            gridProperties: { frozenRowCount: 1 },
          },
        },
      ],
    }),
  });

  const created = await parseSheetsResponse<{
    spreadsheetId: string;
    spreadsheetUrl: string;
    properties?: { title?: string };
  }>(res);

  await initializeSheetHeaders(accessToken, created.spreadsheetId, tabTitle);

  return {
    spreadsheetId: created.spreadsheetId,
    spreadsheetTitle: created.properties?.title || title,
    sheetTitle: tabTitle,
    spreadsheetUrl: created.spreadsheetUrl,
  };
}

export async function appendFormSubmission(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
  entry: FormSubmissionEntry,
): Promise<void> {
  const range = `${escapeSheetTitle(sheetTitle)}!A:H`;
  const url = `${SHEETS_API_BASE}/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const row = buildSheetSubmissionRow(entry);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      majorDimension: "ROWS",
      values: [row],
    }),
  });

  await parseSheetsResponse(res);
}
