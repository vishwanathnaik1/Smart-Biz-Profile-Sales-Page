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

export const ASIA_KOLKATA_TIME_ZONE = "Asia/Kolkata";

export function formatAsiaKolkataTimestamp(input: Date | string = new Date()): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return typeof input === "string" ? input : "";
  }

  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: ASIA_KOLKATA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h12",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const dayPeriod = get("dayPeriod").toUpperCase();

  return `${get("day")}/${get("month")}/${get("year")}, ${get("hour")}:${get("minute")}:${get("second")} ${dayPeriod} IST`;
}

export function buildSheetSubmissionRow(entry: FormSubmissionEntry): string[] {
  const timestamp = formatAsiaKolkataTimestamp(entry.submittedAt ?? new Date());
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

function getViteEnvValue(key: string): string {
  const env = (import.meta as { env?: Record<string, string | undefined> }).env;
  return env?.[key]?.trim() ?? "";
}

export function getConfiguredWebhookUrl(): string {
  return getViteEnvValue("VITE_GOOGLE_SHEETS_WEBHOOK_URL");
}

export function getConfiguredSpreadsheetId(): string {
  return getViteEnvValue("VITE_GOOGLE_SPREADSHEET_ID");
}

export function getConfiguredSheetTab(): string {
  return getViteEnvValue("VITE_GOOGLE_SHEET_TAB") || "Form Submissions";
}

export interface WebhookRequestData {
  url: string;
  payload: {
    formType: FormSubmissionType;
    name: string;
    email: string;
    categoryOrSubject: string;
    phone: string;
    notesOrMessage: string;
    whatsappMessage: string;
    submittedAt: string;
    spreadsheetId: string;
    sheetTitle: string;
    row: string[];
    "Submitted At": string;
    "Form Type": FormSubmissionType;
    Name: string;
    Email: string;
    "Business Type / Subject": string;
    "WhatsApp / Phone": string;
    Message: string;
    "Generated WhatsApp Message": string;
  };
  formBody: string;
}

export function buildWebhookRequest(
  webhookUrl: string,
  entry: FormSubmissionEntry,
  options?: {
    spreadsheetId?: string;
    sheetTitle?: string;
  },
): WebhookRequestData {
  const submittedAt = formatAsiaKolkataTimestamp(entry.submittedAt ?? new Date());
  const spreadsheetId = options?.spreadsheetId?.trim() || "";
  const sheetTitle = options?.sheetTitle?.trim() || "Form Submissions";
  const normalizedEntry: FormSubmissionEntry = {
    formType: entry.formType,
    name: entry.name.trim(),
    email: entry.email.trim(),
    categoryOrSubject: entry.categoryOrSubject.trim(),
    phone: entry.phone.trim(),
    notesOrMessage: entry.notesOrMessage.trim(),
    whatsappMessage: entry.whatsappMessage.trim(),
    submittedAt,
  };
  const row = buildSheetSubmissionRow(normalizedEntry);

  const flatParams: Record<string, string> = {
    submittedAt,
    formType: normalizedEntry.formType,
    name: normalizedEntry.name,
    email: normalizedEntry.email,
    categoryOrSubject: normalizedEntry.categoryOrSubject,
    phone: normalizedEntry.phone,
    notesOrMessage: normalizedEntry.notesOrMessage,
    whatsappMessage: normalizedEntry.whatsappMessage,
  };
  if (spreadsheetId) {
    flatParams.spreadsheetId = spreadsheetId;
  }
  if (sheetTitle) {
    flatParams.sheetTitle = sheetTitle;
  }

  const targetUrl = new URL(webhookUrl);
  for (const [key, value] of Object.entries(flatParams)) {
    if (!targetUrl.searchParams.has(key)) {
      targetUrl.searchParams.set(key, value);
    }
  }

  return {
    url: targetUrl.toString(),
    payload: {
      formType: normalizedEntry.formType,
      name: normalizedEntry.name,
      email: normalizedEntry.email,
      categoryOrSubject: normalizedEntry.categoryOrSubject,
      phone: normalizedEntry.phone,
      notesOrMessage: normalizedEntry.notesOrMessage,
      whatsappMessage: normalizedEntry.whatsappMessage,
      submittedAt,
      spreadsheetId,
      sheetTitle,
      row,
      "Submitted At": submittedAt,
      "Form Type": normalizedEntry.formType,
      Name: normalizedEntry.name,
      Email: normalizedEntry.email,
      "Business Type / Subject": normalizedEntry.categoryOrSubject,
      "WhatsApp / Phone": normalizedEntry.phone,
      Message: normalizedEntry.notesOrMessage,
      "Generated WhatsApp Message": normalizedEntry.whatsappMessage,
    },
    formBody: new URLSearchParams(flatParams).toString(),
  };
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
  const contentType = res.headers.get("content-type") ?? "";
  if (!res.ok || !contentType.includes("application/json")) {
    throw new SheetsApiError("Backend Sheets config unavailable.", res.status);
  }
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
    webhookUrl?: string;
    skipBackendProbe?: boolean;
  },
): Promise<{ ok: boolean; syncedToSheet: boolean; submittedAt: string }> {
  const submittedAt = formatAsiaKolkataTimestamp(entry.submittedAt ?? new Date());
  const normalizedEntry: FormSubmissionEntry = {
    ...entry,
    submittedAt,
  };
  const fallbackWebhookUrl = (options?.webhookUrl ?? getConfiguredWebhookUrl()).trim();
  const targetSpreadsheetId =
    options?.sheetConfig?.spreadsheetId || getConfiguredSpreadsheetId();
  const targetSheetTitle = options?.sheetConfig?.sheetTitle || getConfiguredSheetTab();

  const dispatchClientWebhook = () => {
    const webhookReq = buildWebhookRequest(fallbackWebhookUrl, normalizedEntry, {
      spreadsheetId: targetSpreadsheetId,
      sheetTitle: targetSheetTitle,
    });

    return fetch(webhookReq.url, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(webhookReq.payload),
    });
  };

  if (options?.skipBackendProbe && !options?.accessToken && fallbackWebhookUrl) {
    await dispatchClientWebhook();
    return {
      ok: true,
      syncedToSheet: true,
      submittedAt,
    };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options?.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  let backendError: unknown = null;
  try {
    const res = await fetch("/api/submissions", {
      method: "POST",
      keepalive: true,
      headers,
      body: JSON.stringify({
        ...normalizedEntry,
        spreadsheetId: targetSpreadsheetId,
        sheetTitle: targetSheetTitle,
      }),
    });

    const contentType = res.headers.get("content-type") ?? "";
    if (res.ok && contentType.includes("application/json")) {
      const data = await res.json().catch(() => null);
      if (data && typeof data === "object" && data.ok === true) {
        return data as { ok: boolean; syncedToSheet: boolean; submittedAt: string };
      }
    }

    if (res.status === 401) {
      throw new SheetsApiError("Google OAuth session expired.", 401);
    }

    backendError = new SheetsApiError(
      `Backend submission unavailable (${res.status}).`,
      res.status,
    );
  } catch (err) {
    if (err instanceof SheetsApiError && err.status === 401) {
      throw err;
    }
    backendError = err;
  }

  if (fallbackWebhookUrl) {
    await dispatchClientWebhook();
    return {
      ok: true,
      syncedToSheet: true,
      submittedAt,
    };
  }

  if (backendError instanceof Error) {
    throw backendError;
  }
  throw new SheetsApiError("Could not submit form.", 500);
}
