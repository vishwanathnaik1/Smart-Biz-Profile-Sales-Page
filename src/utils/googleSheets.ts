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

async function parseBackendResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const apiMessage =
      data?.error || `Backend Sheets request failed with status ${res.status}.`;
    throw new SheetsApiError(apiMessage, res.status);
  }
  return data as T;
}

export async function fetchBackendSheetConfig(): Promise<ConnectedSheetConfig | null> {
  const res = await fetch("/api/sheets/config");
  const data = await parseBackendResponse<{ config: ConnectedSheetConfig | null }>(res);
  return data.config;
}

export async function saveBackendSheetConfig(
  config: ConnectedSheetConfig | null,
): Promise<void> {
  const res = await fetch("/api/sheets/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ config }),
  });
  await parseBackendResponse(res);
}

export async function fetchSpreadsheetInfo(
  accessToken: string,
  spreadsheetId: string,
): Promise<SpreadsheetMetadata> {
  const res = await fetch("/api/sheets/inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ spreadsheetId }),
  });
  return parseBackendResponse<SpreadsheetMetadata>(res);
}

export async function readSheetPreviewRows(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<string[][]> {
  const params = new URLSearchParams({ spreadsheetId, sheetTitle });
  const res = await fetch(`/api/sheets/preview?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await parseBackendResponse<{ values: string[][] }>(res);
  return data.values ?? [];
}

export async function initializeSheetHeaders(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
): Promise<void> {
  const res = await fetch("/api/sheets/headers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ spreadsheetId, sheetTitle }),
  });
  await parseBackendResponse(res);
}

export async function createLeadsSpreadsheet(
  accessToken: string,
  title = "Smart Biz Profile — Form Submissions",
): Promise<ConnectedSheetConfig> {
  const res = await fetch("/api/sheets/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return parseBackendResponse<ConnectedSheetConfig>(res);
}

export async function submitFormToBackend(
  entry: FormSubmissionEntry,
  options?: {
    accessToken?: string | null;
    sheetConfig?: ConnectedSheetConfig | null;
  },
): Promise<{ ok: boolean; syncedToSheet: boolean; submittedAt: string }> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options?.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  const res = await fetch("/api/submissions", {
    method: "POST",
    headers,
    body: JSON.stringify({
      ...entry,
      spreadsheetId: options?.sheetConfig?.spreadsheetId,
      sheetTitle: options?.sheetConfig?.sheetTitle,
    }),
  });

  return parseBackendResponse<{ ok: boolean; syncedToSheet: boolean; submittedAt: string }>(res);
}
