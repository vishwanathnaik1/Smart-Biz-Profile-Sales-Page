import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileSpreadsheet,
  Link2,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useGoogleSheets } from "../context/GoogleSheetsContext";
import {
  SHEET_HEADER_ROW,
  createLeadsSpreadsheet,
  extractSpreadsheetId,
  fetchSpreadsheetInfo,
  initializeSheetHeaders,
  readSheetPreviewRows,
  type SpreadsheetMetadata,
} from "../utils/googleSheets";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { Button } from "./ui/Button";

export function GoogleSheetsModal() {
  const {
    user,
    accessToken,
    needsAuth,
    isSigningIn,
    authError,
    connection,
    sheetsModalOpen,
    closeSheetsModal,
    signIn,
    signOut,
    saveConnection,
    clearConnection,
  } = useGoogleSheets();

  const [sheetInput, setSheetInput] = useState("");
  const [sheetTitleInput, setSheetTitleInput] = useState(
    "Smart Biz Profile — Form Submissions",
  );
  const [lookupMeta, setLookupMeta] = useState<SpreadsheetMetadata | null>(null);
  const [selectedTab, setSelectedTab] = useState("");
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmHeaderWrite, setConfirmHeaderWrite] = useState<{
    meta: SpreadsheetMetadata;
    tabTitle: string;
    hasExistingFirstRow: boolean;
    existingFirstRow: string[];
  } | null>(null);
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  useEffect(() => {
    if (!sheetsModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSheetsModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sheetsModalOpen, closeSheetsModal]);

  const loadConnectedPreview = async () => {
    if (!accessToken || !connection) return;
    setBusyAction("preview");
    setErrorMessage(null);
    try {
      const rows = await readSheetPreviewRows(
        accessToken,
        connection.spreadsheetId,
        connection.sheetTitle,
      );
      setPreviewRows(rows);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Could not read preview rows.",
      );
    } finally {
      setBusyAction(null);
    }
  };

  useEffect(() => {
    if (sheetsModalOpen && accessToken && connection) {
      void loadConnectedPreview();
    } else if (!connection) {
      setPreviewRows([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetsModalOpen, accessToken, connection?.spreadsheetId, connection?.sheetTitle]);

  if (!sheetsModalOpen) return null;

  const handleCreateSpreadsheet = async () => {
    if (!accessToken) return;
    setBusyAction("create");
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      const title = sheetTitleInput.trim() || "Smart Biz Profile — Form Submissions";
      const created = await createLeadsSpreadsheet(accessToken, title);
      saveConnection(created);
      setStatusMessage(
        `Created "${created.spreadsheetTitle}" and connected both forms.`,
      );
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Could not create Google Sheet.",
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleInspectExistingSheet = async () => {
    if (!accessToken) return;
    const id = extractSpreadsheetId(sheetInput);
    if (!id) {
      setErrorMessage(
        "Please paste a valid Google Sheets URL or spreadsheet ID.",
      );
      return;
    }

    setBusyAction("lookup");
    setErrorMessage(null);
    setStatusMessage(null);
    setLookupMeta(null);
    try {
      const meta = await fetchSpreadsheetInfo(accessToken, id);
      if (meta.sheets.length === 0) {
        throw new Error("This spreadsheet has no accessible sheet tabs.");
      }
      setLookupMeta(meta);
      setSelectedTab(meta.sheets[0].title);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to read spreadsheet details. Check access permissions and try again.",
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleConnectExistingTab = async () => {
    if (!accessToken || !lookupMeta || !selectedTab) return;
    setBusyAction("connect");
    setErrorMessage(null);
    setStatusMessage(null);
    try {
      const existingRows = await readSheetPreviewRows(
        accessToken,
        lookupMeta.spreadsheetId,
        selectedTab,
      );
      const firstRow = existingRows[0] ?? [];
      const matchesHeaders =
        firstRow.length >= SHEET_HEADER_ROW.length &&
        SHEET_HEADER_ROW.every((h, idx) => firstRow[idx] === h);

      if (matchesHeaders) {
        saveConnection({
          spreadsheetId: lookupMeta.spreadsheetId,
          spreadsheetTitle: lookupMeta.title,
          sheetTitle: selectedTab,
          spreadsheetUrl: lookupMeta.spreadsheetUrl,
        });
        setLookupMeta(null);
        setSheetInput("");
        setStatusMessage(`Connected "${lookupMeta.title}" (${selectedTab}).`);
      } else {
        setConfirmHeaderWrite({
          meta: lookupMeta,
          tabTitle: selectedTab,
          hasExistingFirstRow: firstRow.length > 0,
          existingFirstRow: firstRow,
        });
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Could not inspect selected sheet tab.",
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleConfirmInitializeHeaders = async (writeHeaders: boolean) => {
    if (!accessToken || !confirmHeaderWrite) return;
    setBusyAction("headers");
    setErrorMessage(null);
    try {
      if (writeHeaders) {
        await initializeSheetHeaders(
          accessToken,
          confirmHeaderWrite.meta.spreadsheetId,
          confirmHeaderWrite.tabTitle,
        );
      }
      saveConnection({
        spreadsheetId: confirmHeaderWrite.meta.spreadsheetId,
        spreadsheetTitle: confirmHeaderWrite.meta.title,
        sheetTitle: confirmHeaderWrite.tabTitle,
        spreadsheetUrl: confirmHeaderWrite.meta.spreadsheetUrl,
      });
      setStatusMessage(
        `Connected "${confirmHeaderWrite.meta.title}" (${confirmHeaderWrite.tabTitle}).`,
      );
      setConfirmHeaderWrite(null);
      setLookupMeta(null);
      setSheetInput("");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Could not update spreadsheet headers.",
      );
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSheetsModal();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheets-modal-title"
        className="relative my-8 w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={closeSheetsModal}
          aria-label="Close Google Sheets settings"
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileSpreadsheet className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2
              id="sheets-modal-title"
              className="font-display text-xl font-bold tracking-tight text-[var(--foreground)]"
            >
              Google Sheets Lead Sync
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Automatically log submissions from every form before redirecting to WhatsApp.
            </p>
          </div>
        </div>

        {/* Auth Section */}
        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
          {needsAuth || !accessToken ? (
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold text-[var(--foreground)]">
                  {user
                    ? `Signed in as ${user.email} — reconnect Google Sheets session`
                    : "Connect your Google account"}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                  Sign in with Google to create or link a spreadsheet for your forms.
                </p>
              </div>
              <GoogleSignInButton
                onClick={() => void signIn()}
                loading={isSigningIn}
                label={user ? "Reconnect Google" : "Sign in with Google"}
              />
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-[var(--foreground)]">
                    Google account connected
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    {user?.email || user?.displayName || "Authenticated"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                Sign out
              </button>
            </div>
          )}

          {authError && (
            <p role="alert" className="mt-2.5 text-xs font-medium text-[var(--destructive)]">
              {authError}
            </p>
          )}
        </div>

        {/* Active Connection Banner + Preview */}
        {connection && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Connected Sheet: {connection.spreadsheetTitle}
                </p>
                <p className="mt-0.5 text-xs text-emerald-800">
                  Active tab: <span className="font-semibold">{connection.sheetTitle}</span> ·
                  Syncs Claim Profile &amp; Contact Us forms
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={connection.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Open Sheet
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                {accessToken && (
                  <button
                    type="button"
                    onClick={() => void loadConnectedPreview()}
                    disabled={busyAction === "preview"}
                    className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                  >
                    <RefreshCw
                      className={`h-3 w-3 ${busyAction === "preview" ? "animate-spin" : ""}`}
                      aria-hidden="true"
                    />
                    Refresh
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setConfirmDisconnect(true)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 cursor-pointer"
                >
                  <Trash2 className="h-3 w-3" aria-hidden="true" />
                  Disconnect
                </button>
              </div>
            </div>

            {confirmDisconnect && (
              <div className="mt-3 rounded-lg border border-rose-200 bg-white p-3">
                <p className="text-xs font-semibold text-[var(--foreground)]">
                  Disconnect &ldquo;{connection.spreadsheetTitle}&rdquo; from form sync?
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--muted-foreground)]">
                  Your spreadsheet file in Google Drive will not be deleted; forms will stop appending new rows until you reconnect a sheet.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearConnection();
                      setConfirmDisconnect(false);
                      setStatusMessage("Google Sheet disconnected.");
                    }}
                    className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 cursor-pointer"
                  >
                    Confirm Disconnect
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDisconnect(false)}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {previewRows.length > 0 && (
              <div className="mt-3 overflow-x-auto rounded-lg border border-emerald-200/80 bg-white">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-emerald-50/70 text-[var(--foreground)]">
                    <tr>
                      {previewRows[0].slice(0, 6).map((cell, idx) => (
                        <th key={idx} className="whitespace-nowrap px-2.5 py-1.5 font-semibold">
                          {cell || `Col ${idx + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-[var(--muted-foreground)]">
                    {previewRows.slice(1, 6).map((row, rIdx) => (
                      <tr key={rIdx}>
                        {previewRows[0].slice(0, 6).map((_, cIdx) => (
                          <td key={cIdx} className="max-w-[140px] truncate px-2.5 py-1.5">
                            {row[cIdx] ?? ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewRows.length === 1 && (
                  <p className="px-2.5 py-2 text-[11px] text-[var(--muted-foreground)]">
                    Header row ready — submit any form to see entries appear here.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Confirmation Dialog before modifying an existing sheet's Row 1 */}
        {confirmHeaderWrite && (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-950">
                  {confirmHeaderWrite.hasExistingFirstRow
                    ? `Row 1 of "${confirmHeaderWrite.tabTitle}" already has data`
                    : `Write Smart Biz Profile headers to row 1 of "${confirmHeaderWrite.tabTitle}"?`}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-900">
                  {confirmHeaderWrite.hasExistingFirstRow
                    ? `Existing cells (${confirmHeaderWrite.existingFirstRow.slice(0, 4).join(", ")}) would be overwritten if we write column headers into A1:H1. Choose whether to overwrite row 1 with standard columns or append directly without changing row 1.`
                    : `This will write the 8 column headers (Submitted At, Form Type, Name, Email, Business Type / Subject, WhatsApp / Phone, Message, Generated WhatsApp Message) into ${confirmHeaderWrite.tabTitle}!A1:H1.`}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyAction === "headers"}
                    onClick={() => void handleConfirmInitializeHeaders(true)}
                    className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-semibold text-white hover:brightness-110 cursor-pointer"
                  >
                    {confirmHeaderWrite.hasExistingFirstRow
                      ? "Overwrite Row 1 Headers & Connect"
                      : "Confirm & Write Headers"}
                  </button>
                  {confirmHeaderWrite.hasExistingFirstRow && (
                    <button
                      type="button"
                      disabled={busyAction === "headers"}
                      onClick={() => void handleConfirmInitializeHeaders(false)}
                      className="rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 hover:bg-amber-100 cursor-pointer"
                    >
                      Keep Existing Row 1 &amp; Connect
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setConfirmHeaderWrite(null)}
                    className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Controls (when signed in) */}
        {accessToken && !needsAuth && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Option A: Create New Sheet */}
            <div className="rounded-xl border border-[var(--border)] p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                <Plus className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
                Create New Google Sheet
              </p>
              <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
                Creates a ready-to-use spreadsheet in your Google Drive with pre-formatted columns.
              </p>
              <input
                type="text"
                value={sheetTitleInput}
                onChange={(e) => setSheetTitleInput(e.target.value)}
                aria-label="New spreadsheet title"
                className="mt-3 h-9 w-full rounded-lg border border-[var(--input)] bg-white px-3 text-xs text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
              />
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="mt-3 w-full"
                disabled={busyAction === "create"}
                onClick={() => void handleCreateSpreadsheet()}
              >
                {busyAction === "create" ? "Creating Sheet..." : "Create & Connect Sheet"}
              </Button>
            </div>

            {/* Option B: Link Existing Sheet */}
            <div className="rounded-xl border border-[var(--border)] p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
                <Link2 className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
                Link Existing Google Sheet
              </p>
              <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
                Paste a Google Sheets URL or Spreadsheet ID, then select which tab to append to.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={sheetInput}
                  onChange={(e) => setSheetInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  aria-label="Google Sheets URL or ID"
                  className="h-9 min-w-0 flex-1 rounded-lg border border-[var(--input)] bg-white px-3 text-xs text-[var(--foreground)] outline-none focus:border-[var(--primary)]"
                />
                <button
                  type="button"
                  disabled={busyAction === "lookup"}
                  onClick={() => void handleInspectExistingSheet()}
                  className="shrink-0 rounded-lg border border-[var(--border-strong)] bg-white px-3 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
                >
                  {busyAction === "lookup" ? "Loading..." : "Load"}
                </button>
              </div>

              {lookupMeta && (
                <div className="mt-3 space-y-2 rounded-lg bg-[var(--background)] p-2.5">
                  <p className="truncate text-[11px] font-bold text-[var(--foreground)]">
                    {lookupMeta.title}
                  </p>
                  <select
                    value={selectedTab}
                    onChange={(e) => setSelectedTab(e.target.value)}
                    aria-label="Select spreadsheet tab"
                    className="h-8 w-full rounded-md border border-[var(--input)] bg-white px-2 text-xs text-[var(--foreground)]"
                  >
                    {lookupMeta.sheets.map((tab) => (
                      <option key={tab.sheetId} value={tab.title}>
                        {tab.title}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    variant="dark"
                    size="sm"
                    className="w-full"
                    disabled={busyAction === "connect"}
                    onClick={() => void handleConnectExistingTab()}
                  >
                    {busyAction === "connect" ? "Checking tab..." : "Connect Selected Tab"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {statusMessage && (
          <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
            {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p role="alert" className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
