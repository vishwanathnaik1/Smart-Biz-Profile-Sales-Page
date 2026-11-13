import { type ReactNode } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { AppRoute } from "../utils/routing";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdatedNote: string;
  hasOwnerPlaceholders?: boolean;
  hideSupportFooter?: boolean;
  onNavigate: (route: AppRoute) => void;
  children: ReactNode;
}

export function OwnerPlaceholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-amber-300/90 bg-amber-50 px-2 py-0.5 text-[13px] font-semibold text-amber-950">
      [Business Owner Confirmation Required: {children}]
    </span>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border)] py-6 first:pt-2 last:border-b-0 last:pb-2">
      <h2 className="flex items-start gap-3 font-display text-lg font-bold text-[var(--foreground)] sm:text-xl">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-xs font-extrabold text-[var(--primary)]">
          {String(number).padStart(2, "0")}
        </span>
        <span>{title}</span>
      </h2>
      <div className="mt-3 space-y-3 pl-0 text-sm leading-relaxed text-[var(--muted-foreground)] sm:pl-10 sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export function LegalPageLayout({
  eyebrow,
  title,
  subtitle,
  lastUpdatedNote,
  hasOwnerPlaceholders = false,
  hideSupportFooter = false,
  onNavigate,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="bg-[var(--background)] pb-16">
      {/* Light-blue header band */}
      <div className="border-b border-[var(--border)] bg-[var(--surface-ice)] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-3.5 py-1.5 text-xs font-semibold text-[var(--foreground)] shadow-2xs transition-colors hover:border-[var(--primary)]/50 hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Homepage
          </a>

          <p className="mt-6 text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base">
            {subtitle}
          </p>
          <p className="mt-4 text-xs font-medium text-[var(--muted-foreground)]">
            {lastUpdatedNote}
          </p>

          {hasOwnerPlaceholders && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-amber-300/80 bg-amber-50/90 px-4 py-3 text-xs leading-relaxed text-amber-950">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
              <p>
                <strong>Review Notice:</strong> Sections highlighted in amber indicate business
                entity, contact, or commercial terms that require confirmation from the Smart Biz
                Profile business owner before final publication.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main content container */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_18px_42px_-26px_oklch(40%_0.08_260/0.16)] sm:p-10">
          {children}
        </div>

        {/* Bottom navigation / support bar */}
        {!hideSupportFooter && (
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-sm font-bold text-[var(--foreground)]">
                Have questions about this policy?
              </p>
              <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                Reach our team for clarification or return to the main Smart Biz Profile overview.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/");
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-white px-4 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Homepage
              </a>
              <a
                href="/contact-us"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/contact-us");
                }}
                className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--primary)] px-4 text-xs font-semibold text-white shadow-xs transition-all hover:brightness-110"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Contact Support
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
