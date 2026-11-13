import { useEffect, useState, type FormEvent } from "react";
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  MessageCircle,
  X,
} from "lucide-react";
import { useGoogleSheets, type SheetSyncResult } from "../context/GoogleSheetsContext";
import { BUSINESS_TYPES } from "../data/landingData";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  triggerWhatsAppRedirect,
  validateLeadForm,
  type LeadValidationErrors,
} from "../utils/whatsapp";
import { Button } from "./ui/Button";

interface ClaimProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function ClaimProfileModal({ open, onClose }: ClaimProfileModalProps) {
  const { connection, accessToken, needsAuth, openSheetsModal, syncFormSubmission } =
    useGoogleSheets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");
  const [sheetResult, setSheetResult] = useState<SheetSyncResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { name, email, businessType, whatsappNumber };
    const nextErrors = validateLeadForm(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const message = buildWhatsAppMessage(payload);
    const whatsappUrl = buildWhatsAppUrl(payload);

    setIsSubmitting(true);
    const syncOutcome = await syncFormSubmission({
      formType: "Claim Smart Biz Profile",
      name: payload.name,
      email: payload.email,
      categoryOrSubject: payload.businessType,
      phone: payload.whatsappNumber,
      notesOrMessage: "Smart Biz Profile setup request",
      whatsappMessage: message,
    });
    setIsSubmitting(false);

    setSheetResult(syncOutcome);
    setSubmittedUrl(whatsappUrl);
    setSubmittedMessage(message);
    triggerWhatsAppRedirect(whatsappUrl);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleReset = () => {
    setSubmittedUrl(null);
    setSubmittedMessage("");
    setSheetResult(null);
    setCopied(false);
    setErrors({});
  };

  const isSheetActive = Boolean(connection && accessToken && !needsAuth);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-modal-title"
        className="relative max-h-[92vh] w-full max-w-[460px] overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)] cursor-pointer"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(95%_0.05_18)] px-3 py-1 text-[11px] font-bold tracking-wide text-[oklch(50%_0.2_18)] uppercase">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          Limited setup slots this week
        </span>

        <h2
          id="claim-modal-title"
          className="mt-3.5 font-display text-2xl font-bold tracking-tight text-[var(--foreground)]"
        >
          Claim your Smart Biz Profile
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
          Fill this in and we&apos;ll continue on WhatsApp — it takes less than 30 seconds.
        </p>

        {/* Compact Google Sheets Sync Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[oklch(98%_0.012_252)] px-3.5 py-2.5 text-xs">
          <div className="flex min-w-0 items-center gap-2">
            <FileSpreadsheet
              className={`h-4 w-4 shrink-0 ${isSheetActive ? "text-emerald-600" : "text-[var(--primary)]"}`}
              aria-hidden="true"
            />
            <span className="truncate font-medium text-[var(--foreground)]">
              {isSheetActive && connection
                ? `Syncing to: ${connection.spreadsheetTitle}`
                : connection
                  ? "Reconnect Google to sync leads"
                  : "Google Sheet not connected"}
            </span>
          </div>
          <button
            type="button"
            onClick={openSheetsModal}
            className="shrink-0 font-semibold text-[var(--primary)] hover:underline cursor-pointer"
          >
            {isSheetActive ? "Manage" : "Connect Sheet"}
          </button>
        </div>

        {!submittedUrl ? (
          <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3.5">
            <div>
              <label
                htmlFor="lead-name"
                className="block text-xs font-semibold text-[var(--foreground)]"
              >
                Your name
              </label>
              <input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Nisha Sharma"
                autoFocus
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lead-email"
                className="block text-xs font-semibold text-[var(--foreground)]"
              >
                Email address
              </label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="you@business.com"
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lead-business-type"
                className="block text-xs font-semibold text-[var(--foreground)]"
              >
                What kind of business do you run?
              </label>
              <select
                id="lead-business-type"
                value={businessType}
                onChange={(e) => {
                  setBusinessType(e.target.value);
                  if (errors.businessType) {
                    setErrors((prev) => ({ ...prev, businessType: undefined }));
                  }
                }}
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              >
                <option value="">Choose your business type</option>
                {BUSINESS_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                  {errors.businessType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lead-whatsapp"
                className="block text-xs font-semibold text-[var(--foreground)]"
              >
                Your WhatsApp number
              </label>
              <input
                id="lead-whatsapp"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  if (errors.whatsappNumber) {
                    setErrors((prev) => ({ ...prev, whatsappNumber: undefined }));
                  }
                }}
                placeholder="e.g. +91 98765 43210"
                className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
              />
              {errors.whatsappNumber && (
                <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                  {errors.whatsappNumber}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {isSubmitting ? "Saving & Opening WhatsApp..." : "Continue on WhatsApp"}
            </Button>

            <p className="text-center text-xs text-[var(--muted-foreground)]">
              No spam — we&apos;ll only reply about your profile setup.
            </p>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            {sheetResult?.synced && (
              <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                Saved to Google Sheet ({connection?.spreadsheetTitle})
              </div>
            )}

            {sheetResult && !sheetResult.synced && sheetResult.reason === "error" && (
              <p className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-medium text-amber-900">
                Sheet sync note: {sheetResult.message}
              </p>
            )}

            <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
              <p className="text-xs font-semibold text-[var(--foreground)]">
                Your customized WhatsApp message (+91 8329410074):
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                {submittedMessage}
              </p>
            </div>

            <a
              href={submittedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--success)] px-6 text-sm font-bold text-[var(--success-foreground)] shadow-sm transition-all hover:brightness-95"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Open WhatsApp Chat
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" />
                    Copied message
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    Copy message
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
              >
                Edit details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
