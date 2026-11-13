import { ArrowRight } from "lucide-react";
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
      <section id="faq" className="bg-[var(--surface-ice)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
                FAQ
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
                Everything you need to know before creating your profile.
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--muted-foreground)]">
                Questions, answered.
              </p>
            </div>

            <div>
              <Accordion items={FAQ_ITEMS} />
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-[var(--border)] bg-white px-6 py-8 text-center shadow-[0_16px_40px_-24px_oklch(40%_0.08_260/0.18)] sm:px-10">
            <p className="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-[var(--foreground)] sm:text-base">
              Still have questions? Your business deserves a complete Smart Business Profile.
              Let&apos;s get your Smart Biz Profile ready!
            </p>
            <div className="mt-5">
              <Button variant="primary" size="lg" onClick={onOpenModal}>
                Build My Smart Biz Profile
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Bottom Dark CTA Banner */}
      <section className="bg-[var(--background)] px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8">
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
    </>
  );
}
