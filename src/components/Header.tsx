import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

interface HeaderProps {
  onOpenModal: () => void;
}

const NAV_LINKS = [
  { label: "What you get", href: "#features" },
  { label: "The difference", href: "#difference" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Header({ onOpenModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface-glass)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Smart Biz Profile home"
          className="flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] rounded-lg"
        >
          <img
            src="/assets/aistudio/smart_biz_profile_dark_logo__1__e55fd659.png"
            alt="Smart Biz Profile"
            className="h-12 w-auto object-contain mix-blend-multiply sm:h-[54px]"
          />
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-[var(--foreground)] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[var(--border)] bg-white px-4 py-4 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="dark"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal();
              }}
              className="mt-1 w-full"
            >
              Build My Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
