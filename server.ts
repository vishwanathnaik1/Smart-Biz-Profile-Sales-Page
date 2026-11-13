import "dotenv/config";
import express, { type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  ASIA_KOLKATA_TIME_ZONE,
  SHEET_HEADER_ROW,
  buildSheetSubmissionRow,
  escapeSheetTitle,
  formatAsiaKolkataTimestamp,
  type ConnectedSheetConfig,
  type FormSubmissionEntry,
} from "./src/utils/googleSheets.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets";

interface StoredSubmission extends FormSubmissionEntry {
  id: string;
  submittedAt: string;
  syncedToSheet: boolean;
}

const envDefaultConfig: ConnectedSheetConfig | null = process.env.GOOGLE_SPREADSHEET_ID?.trim()
  ? {
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID.trim(),
      spreadsheetTitle: "Configured Backend Sheet",
      sheetTitle: process.env.GOOGLE_SHEET_TAB?.trim() || "Form Submissions",
      spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${encodeURIComponent(
        process.env.GOOGLE_SPREADSHEET_ID.trim(),
      )}/edit`,
    }
  : null;

let activeSheetConfig: ConnectedSheetConfig | null = envDefaultConfig;
const recentSubmissions: StoredSubmission[] = [];

function getBearerToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.slice("Bearer ".length).trim();
  return token || null;
}

async function callGoogleSheetsApi<T>(
  url: string,
  accessToken: string,
  init?: RequestInit,
): Promise<{ ok: true; data: T } | { ok: false; status: number; error: string }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return {
      ok: false,
      status: res.status,
      error: data?.error?.message || `Google Sheets API error (${res.status}).`,
    };
  }
  return { ok: true, data: data as T };
}

async function appendRowViaSheetsApi(
  accessToken: string,
  spreadsheetId: string,
  sheetTitle: string,
  entry: FormSubmissionEntry,
): Promise<{ synced: boolean; status?: number; error?: string }> {
  const range = `${escapeSheetTitle(sheetTitle)}!A:H`;
  const url = `${SHEETS_API_BASE}/${encodeURIComponent(
    spreadsheetId,
  )}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const result = await callGoogleSheetsApi(url, accessToken, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      majorDimension: "ROWS",
      values: [buildSheetSubmissionRow(entry)],
    }),
  });

  if (!result.ok) {
    return { synced: false, status: result.status, error: result.error };
  }
  return { synced: true };
}

async function forwardViaWebhook(
  webhookUrl: string,
  entry: FormSubmissionEntry,
): Promise<boolean> {
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...entry,
        row: buildSheetSubmissionRow(entry),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  app.get("/api/sheets/config", (_req: Request, res: Response) => {
    res.json({ config: activeSheetConfig });
  });

  app.post("/api/sheets/config", (req: Request, res: Response) => {
    const config = req.body?.config as ConnectedSheetConfig | null | undefined;
    if (config === null) {
      activeSheetConfig = envDefaultConfig;
      res.json({ ok: true, config: activeSheetConfig });
      return;
    }

    if (
      !config ||
      typeof config.spreadsheetId !== "string" ||
      typeof config.sheetTitle !== "string"
    ) {
      res.status(400).json({ error: "Invalid spreadsheet configuration payload." });
      return;
    }

    activeSheetConfig = {
      spreadsheetId: config.spreadsheetId.trim(),
      spreadsheetTitle: config.spreadsheetTitle?.trim() || "Connected Spreadsheet",
      sheetTitle: config.sheetTitle.trim() || "Form Submissions",
      spreadsheetUrl:
        config.spreadsheetUrl?.trim() ||
        `https://docs.google.com/spreadsheets/d/${encodeURIComponent(config.spreadsheetId.trim())}/edit`,
    };
    res.json({ ok: true, config: activeSheetConfig });
  });

  app.post("/api/sheets/inspect", async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Missing Google OAuth bearer token." });
      return;
    }

    const spreadsheetId = String(req.body?.spreadsheetId ?? "").trim();
    if (!spreadsheetId) {
      res.status(400).json({ error: "Spreadsheet ID is required." });
      return;
    }

    const url = `${SHEETS_API_BASE}/${encodeURIComponent(
      spreadsheetId,
    )}?fields=spreadsheetId,spreadsheetUrl,properties.title,sheets.properties(sheetId,title)`;

    const result = await callGoogleSheetsApi<{
      spreadsheetId: string;
      spreadsheetUrl: string;
      properties?: { title?: string };
      sheets?: Array<{ properties?: { sheetId?: number; title?: string } }>;
    }>(url, token);

    if (!result.ok) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    const sheets = (result.data.sheets ?? [])
      .map((s) => ({
        sheetId: s.properties?.sheetId ?? 0,
        title: s.properties?.title ?? "Sheet1",
      }))
      .filter((s) => Boolean(s.title));

    res.json({
      spreadsheetId: result.data.spreadsheetId,
      title: result.data.properties?.title || "Connected Spreadsheet",
      spreadsheetUrl:
        result.data.spreadsheetUrl ||
        `https://docs.google.com/spreadsheets/d/${encodeURIComponent(spreadsheetId)}/edit`,
      sheets,
    });
  });

  app.get("/api/sheets/preview", async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Missing Google OAuth bearer token." });
      return;
    }

    const spreadsheetId = String(req.query.spreadsheetId ?? "").trim();
    const sheetTitle = String(req.query.sheetTitle ?? "").trim();
    if (!spreadsheetId || !sheetTitle) {
      res.status(400).json({ error: "spreadsheetId and sheetTitle are required." });
      return;
    }

    const range = `${escapeSheetTitle(sheetTitle)}!A1:H11`;
    const url = `${SHEETS_API_BASE}/${encodeURIComponent(
      spreadsheetId,
    )}/values/${encodeURIComponent(range)}`;

    const result = await callGoogleSheetsApi<{ values?: string[][] }>(url, token);
    if (!result.ok) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.json({ values: result.data.values ?? [] });
  });

  app.post("/api/sheets/headers", async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Missing Google OAuth bearer token." });
      return;
    }

    const spreadsheetId = String(req.body?.spreadsheetId ?? "").trim();
    const sheetTitle = String(req.body?.sheetTitle ?? "").trim();
    if (!spreadsheetId || !sheetTitle) {
      res.status(400).json({ error: "spreadsheetId and sheetTitle are required." });
      return;
    }

    const range = `${escapeSheetTitle(sheetTitle)}!A1:H1`;
    const url = `${SHEETS_API_BASE}/${encodeURIComponent(
      spreadsheetId,
    )}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;

    const result = await callGoogleSheetsApi(url, token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        range,
        majorDimension: "ROWS",
        values: [[...SHEET_HEADER_ROW]],
      }),
    });

    if (!result.ok) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.json({ ok: true });
  });

  app.post("/api/sheets/create", async (req: Request, res: Response) => {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Missing Google OAuth bearer token." });
      return;
    }

    const title =
      String(req.body?.title ?? "").trim() || "Smart Biz Profile — Form Submissions";
    const tabTitle = "Form Submissions";

    const created = await callGoogleSheetsApi<{
      spreadsheetId: string;
      spreadsheetUrl: string;
      properties?: { title?: string };
    }>(SHEETS_API_BASE, token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        properties: {
          title,
          timeZone: ASIA_KOLKATA_TIME_ZONE,
          locale: "en_IN",
        },
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

    if (!created.ok) {
      res.status(created.status).json({ error: created.error });
      return;
    }

    const headerRange = `${escapeSheetTitle(tabTitle)}!A1:H1`;
    const headerUrl = `${SHEETS_API_BASE}/${encodeURIComponent(
      created.data.spreadsheetId,
    )}/values/${encodeURIComponent(headerRange)}?valueInputOption=USER_ENTERED`;

    const headerRes = await callGoogleSheetsApi(headerUrl, token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        range: headerRange,
        majorDimension: "ROWS",
        values: [[...SHEET_HEADER_ROW]],
      }),
    });

    if (!headerRes.ok) {
      res.status(headerRes.status).json({ error: headerRes.error });
      return;
    }

    const config: ConnectedSheetConfig = {
      spreadsheetId: created.data.spreadsheetId,
      spreadsheetTitle: created.data.properties?.title || title,
      sheetTitle: tabTitle,
      spreadsheetUrl: created.data.spreadsheetUrl,
    };

    activeSheetConfig = config;
    res.json(config);
  });

  app.post("/api/submissions", async (req: Request, res: Response) => {
    const {
      formType,
      name,
      email,
      categoryOrSubject,
      phone,
      notesOrMessage,
      whatsappMessage,
      spreadsheetId,
      sheetTitle,
    } = req.body ?? {};

    if (
      (formType !== "Claim Smart Biz Profile" && formType !== "Contact Us Enquiry") ||
      typeof name !== "string" ||
      name.trim().length < 2 ||
      typeof email !== "string" ||
      !email.includes("@") ||
      typeof phone !== "string" ||
      phone.replace(/\D/g, "").length < 8 ||
      typeof whatsappMessage !== "string" ||
      !whatsappMessage.trim()
    ) {
      res.status(400).json({ error: "Invalid form submission payload." });
      return;
    }

    const submittedAt = formatAsiaKolkataTimestamp(new Date());
    const entry: FormSubmissionEntry = {
      formType,
      name: name.trim(),
      email: email.trim(),
      categoryOrSubject: String(categoryOrSubject ?? "").trim(),
      phone: phone.trim(),
      notesOrMessage: String(notesOrMessage ?? "").trim(),
      whatsappMessage: whatsappMessage.trim(),
      submittedAt,
    };

    let syncedToSheet = false;
    const token = getBearerToken(req);
    const targetSpreadsheetId =
      (typeof spreadsheetId === "string" && spreadsheetId.trim()) ||
      activeSheetConfig?.spreadsheetId ||
      "";
    const targetSheetTitle =
      (typeof sheetTitle === "string" && sheetTitle.trim()) ||
      activeSheetConfig?.sheetTitle ||
      "Form Submissions";

    if (token && targetSpreadsheetId) {
      const sheetAttempt = await appendRowViaSheetsApi(
        token,
        targetSpreadsheetId,
        targetSheetTitle,
        entry,
      );
      syncedToSheet = sheetAttempt.synced;
    }

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
    if (!syncedToSheet && webhookUrl) {
      syncedToSheet = await forwardViaWebhook(webhookUrl, entry);
    }

    const record: StoredSubmission = {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt,
      syncedToSheet,
    };
    recentSubmissions.unshift(record);
    if (recentSubmissions.length > 200) {
      recentSubmissions.length = 200;
    }

    res.json({
      ok: true,
      id: record.id,
      syncedToSheet,
      submittedAt,
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(distDir, "index.html"));
      });
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Biz Profile server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
