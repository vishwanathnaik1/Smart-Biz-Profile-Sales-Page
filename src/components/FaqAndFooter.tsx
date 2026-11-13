import { ArrowRight, Sparkles } from "lucide-react";
import { FAQ_ITEMS } from "../data/landingData";
import { Accordion } from "./ui/Accordion";
import { Button } from "./ui/Button";

interface FaqAndFooterProps {
  onOpenModal: () => void;
}

export function FaqAndFooter({ onOpenModal }: FaqAndFooterProps) {
  return (
    <>
      {/* 9. FAQ Section */}
      <section id="faq" className="bg-[var(--background)] py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Questions, answered.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
              Everything you need to know before creating your profile.
            </p>
          </div>

          <div>
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* 10. Bottom Dark CTA Banner */}
      <section className="bg-[var(--background)] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[var(--surface-dark)] px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-16">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
            Your business deserves more than a bio link
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Stop sending clients everywhere.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[oklch(75%_0.02_255)] sm:text-[15px]">
            Give them one place to discover your business. One link. All your business.
          </p>
          <div className="mt-7">
            <Button variant="primary" size="lg" onClick={onOpenModal}>
              Build My Smart Biz Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-4 text-xs text-[oklch(68%_0.02_255)]">
            Easy setup · No coding required · Mobile friendly
          </p>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--background)] pt-8 pb-24 md:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <a
            href="#top"
            aria-label="Smart Biz Profile home"
            className="flex shrink-0 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            <img
              src="/assets/aistudio/smart_biz_profile_dark_logo__1__e55fd659.png"
              alt="Smart Biz Profile"
              className="h-12 w-auto object-contain mix-blend-multiply"
            />
          </a>

          <p className="text-xs text-[var(--muted-foreground)]">One Link. All Your Business.</p>

          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
            Professional setup assistance
          </span>
        </div>
      </footer>
    </>
  );
}
