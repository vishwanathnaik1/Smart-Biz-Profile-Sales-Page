import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const webhookUrl = (
    env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
    env.GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    ''
  ).trim();
  const sheetTab = (
    env.VITE_GOOGLE_SHEET_TAB ||
    env.GOOGLE_SHEET_TAB ||
    process.env.VITE_GOOGLE_SHEET_TAB ||
    process.env.GOOGLE_SHEET_TAB ||
    ''
  ).trim();
  const spreadsheetId = (
    env.VITE_GOOGLE_SPREADSHEET_ID ||
    env.GOOGLE_SPREADSHEET_ID ||
    process.env.VITE_GOOGLE_SPREADSHEET_ID ||
    process.env.GOOGLE_SPREADSHEET_ID ||
    ''
  ).trim();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL': JSON.stringify(webhookUrl),
      'import.meta.env.VITE_GOOGLE_SHEET_TAB': JSON.stringify(sheetTab),
      'import.meta.env.VITE_GOOGLE_SPREADSHEET_ID': JSON.stringify(spreadsheetId),
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
