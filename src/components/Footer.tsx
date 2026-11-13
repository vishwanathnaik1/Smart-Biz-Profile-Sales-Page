import { ArrowUpRight, FileSpreadsheet, MessageCircle } from "lucide-react";
import { useGoogleSheets } from "../context/GoogleSheetsContext";
import { FOOTER_NAV_LINKS, type AppRoute } from "../utils/routing";

interface FooterProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

export function Footer({ currentRoute, onNavigate }: FooterProps) {
  const { connection, accessToken, needsAuth, openSheetsModal } = useGoogleSheets();
  const isSheetConnected = Boolean(connection && accessToken && !needsAuth);

  return (
    <footer className="border-t border-white/10 bg-[var(--surface-dark)] pt-12 pb-24 text-white md:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.15fr_1.45fr] lg:items-start">
          {/* Brand column */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("/");
              }}
              aria-label="Smart Biz Profile home"
              className="inline-flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ring)]"
            >
              <span className="inline-flex rounded-xl bg-white px-2.5 py-1.5 shadow-xs">
                <img
                  src="/assets/aistudio/smart_biz_profile_dark_logo__1__e55fd659.png"
                  alt="Smart Biz Profile logo"
                  className="h-8 w-auto object-contain"
                />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                Smart Biz Profile
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[oklch(76%_0.02_255)]">
              Everything your business needs, in one professional link.
            </p>
          </div>

          {/* Navigation & Support column */}
          <div className="grid gap-8 sm:grid-cols-[1.35fr_0.95fr]">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-[oklch(75%_0.11_240)] uppercase">
                Legal &amp; Support
              </p>
              <nav
                aria-label="Footer navigation"
                className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-2"
              >
                {FOOTER_NAV_LINKS.map((link) => {
                  const isActive = currentRoute === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.href);
                      }}
                      aria-current={isActive ? "page" : undefined}
                      className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] ${
                        isActive
                          ? "text-white underline decoration-[var(--primary)] decoration-2 underline-offset-4"
                          : "text-[oklch(78%_0.11_240)] hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-[oklch(75%_0.11_240)] uppercase">
                Quick Access
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="https://wa.me/918329410074"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-[oklch(78%_0.11_240)] transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-[var(--success)]" aria-hidden="true" />
                  <span>+91 8329410074</span>
                </a>
                <button
                  type="button"
                  onClick={openSheetsModal}
                  className="inline-flex items-center gap-2 text-left font-medium text-[oklch(78%_0.11_240)] transition-colors hover:text-white cursor-pointer"
                >
                  <FileSpreadsheet className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>{isSheetConnected ? "Google Sheets Connected" : "Google Sheets Sync"}</span>
                </button>
                <a
                  href="https://smartbizprofile.in/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[oklch(76%_0.02_255)] transition-colors hover:text-white"
                >
                  <span>Log in</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href="https://smartbizprofile.in/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-[oklch(76%_0.02_255)] transition-colors hover:text-white"
                >
                  <span>Create free account</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-[oklch(70%_0.02_255)]">
            Copyright © 2026 Smart Biz Profile. All Rights Reserved.
          </p>
          <p className="text-xs text-[oklch(68%_0.02_255)]">
            One Link. All Your Business.
          </p>
        </div>
      </div>
    </footer>
  );
}
