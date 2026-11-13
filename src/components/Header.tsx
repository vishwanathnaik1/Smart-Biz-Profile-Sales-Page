import { useState, type MouseEvent } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import type { AppRoute } from "../utils/routing";
import { Button } from "./ui/Button";

interface HeaderProps {
  onOpenModal: () => void;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute, sectionHash?: string) => void;
}

type NavItem =
  | { label: string; type: "section"; hash: string }
  | { label: string; type: "route"; route: AppRoute };

const NAV_LINKS: readonly NavItem[] = [
  { label: "What you get", type: "section", hash: "#features" },
  { label: "How It Works", type: "section", hash: "#how-it-works" },
  { label: "The difference", type: "section", hash: "#difference" },
  { label: "FAQ", type: "section", hash: "#faq" },
  { label: "Contact Us", type: "route", route: "/contact-us" },
] as const;

const AUTH_LINKS = {
  login: "https://smartbizprofile.in/login",
  register: "https://smartbizprofile.in/register",
} as const;

export function Header({ onOpenModal, currentRoute, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeOrSectionClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionHash?: string,
  ) => {
    event.preventDefault();
    if (sectionHash) {
      onNavigate("/", sectionHash);
    } else if (currentRoute !== "/") {
      onNavigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: NavItem,
    closeMobile?: boolean,
  ) => {
    if (closeMobile) {
      setMobileMenuOpen(false);
    }
    if (link.type === "route") {
      event.preventDefault();
      onNavigate(link.route);
    } else {
      handleHomeOrSectionClick(event, link.hash);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          onClick={(e) => handleHomeOrSectionClick(e)}
          aria-label="Smart Biz Profile home"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        >
          <img
            src="/assets/aistudio/smart_biz_profile_dark_logo__1__e55fd659.png"
            alt="Smart Biz Profile"
            className="h-12 w-auto object-contain mix-blend-multiply sm:h-[54px]"
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const href = link.type === "route" ? link.route : `/${link.hash}`;
            const isActive = link.type === "route" && currentRoute === link.route;
            return (
              <a
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => handleNavItemClick(e, link)}
                className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive
                    ? "font-semibold text-[var(--primary)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={AUTH_LINKS.login}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] lg:inline-flex"
          >
            Log in
          </a>

          <a
            href={AUTH_LINKS.register}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[var(--primary)]/35 bg-[var(--primary)]/8 px-3.5 text-xs font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] lg:inline-flex"
          >
            Create free account
          </a>

          <div className="hidden sm:block">
            <Button variant="dark" size="sm" onClick={onOpenModal}>
              Build My Profile
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--foreground)] cursor-pointer lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const href = link.type === "route" ? link.route : `/${link.hash}`;
              const isActive = link.type === "route" && currentRoute === link.route;
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNavItemClick(e, link, true)}
                  className={`rounded-lg px-2 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)]"
                      : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="mt-1 flex flex-col gap-2.5 border-t border-[var(--border)] pt-3">
              <a
                href={AUTH_LINKS.login}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-white px-5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)]"
              >
                Log in
              </a>
              <a
                href={AUTH_LINKS.register}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110"
              >
                Create free account
              </a>
              <Button
                variant="dark"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenModal();
                }}
                className="w-full sm:hidden"
              >
                Build My Profile
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
