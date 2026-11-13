import { useEffect, useState, type FormEvent } from "react";
import { Clock, MessageCircle, X } from "lucide-react";
import { useGoogleSheets } from "../context/GoogleSheetsContext";
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
  const { syncFormSubmission } = useGoogleSheets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [errors, setErrors] = useState<LeadValidationErrors>({});

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload = { name, email, businessType, whatsappNumber };
    const nextErrors = validateLeadForm(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const message = buildWhatsAppMessage(payload);
    const whatsappUrl = buildWhatsAppUrl(payload);

    void syncFormSubmission({
      formType: "Claim Smart Biz Profile",
      name: payload.name,
      email: payload.email,
      categoryOrSubject: payload.businessType,
      phone: payload.whatsappNumber,
      notesOrMessage: "Smart Biz Profile setup request",
      whatsappMessage: message,
    });

    triggerWhatsAppRedirect(whatsappUrl);

    setName("");
    setEmail("");
    setBusinessType("");
    setWhatsappNumber("");
    setErrors({});
    onClose();
  };

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

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
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

          <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Continue on WhatsApp
          </Button>

          <p className="text-center text-xs text-[var(--muted-foreground)]">
            No spam — we&apos;ll only reply about your profile setup.
          </p>
        </form>
      </div>
    </div>
  );
}
