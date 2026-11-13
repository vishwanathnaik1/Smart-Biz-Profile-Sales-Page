/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_GOOGLE_SHEET_TAB?: string;
  readonly VITE_GOOGLE_SPREADSHEET_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
