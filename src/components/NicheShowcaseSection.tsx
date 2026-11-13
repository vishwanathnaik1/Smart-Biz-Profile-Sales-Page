import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { NICHES_DATA, type NicheId } from "../data/nichesData";
import { DEFAULT_NICHE_ID, getNicheById } from "../utils/nicheSelection";
import { NicheHeroVisual, NicheIcon, NichePhoneMockup } from "./NicheVisuals";
import { Button } from "./ui/Button";

interface NicheShowcaseSectionProps {
  onOpenModal: () => void;
}

export function NicheShowcaseSection({ onOpenModal }: NicheShowcaseSectionProps) {
  const [selectedNicheId, setSelectedNicheId] = useState<NicheId>(DEFAULT_NICHE_ID);
  const activeNiche = getNicheById(selectedNicheId);

  return (
    <section id="niches" className="bg-[oklch(97%_0.018_248)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Interactive Category Selector Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
            Built for service-based businesses
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            Your digital storefront, whatever you sell.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
            Select your business category below to preview how Smart Biz Profile works for you.
          </p>
        </div>

        {/* 9 Interactive Niche Pill Buttons */}
        <div
          role="tablist"
          aria-label="Select business category"
          className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-3"
        >
          {NICHES_DATA.map((niche) => {
            const isSelected = niche.id === activeNiche.id;
            return (
              <button
                key={niche.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="niche-showcase-panel"
                onClick={() => setSelectedNicheId(niche.id)}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] cursor-pointer sm:px-5 sm:text-[13px] ${
                  isSelected
                    ? "gradient-primary-cyan border border-transparent text-white shadow-[0_12px_26px_-10px_oklch(50%_0.2_255/0.6)]"
                    : "border border-[var(--border)] bg-white text-[var(--foreground)] shadow-2xs hover:border-[var(--primary)]/45 hover:text-[var(--primary)]"
                }`}
              >
                {niche.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Niche Showcase Panel */}
        <div
          id="niche-showcase-panel"
          role="tabpanel"
          key={activeNiche.id}
          className="mt-10 space-y-8 transition-opacity duration-200 motion-reduce:transition-none sm:space-y-10"
        >
          {/* SECTION A: Niche Hero */}
          <div className="grid items-center gap-8 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-[0_20px_50px_-28px_oklch(40%_0.08_260/0.2)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
                For {activeNiche.label}
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-3xl">
                {activeNiche.headline}
              </h3>
              <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
                {activeNiche.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#niche-how-it-works"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-white shadow-[0_14px_30px_-10px_oklch(56%_0.22_260/0.55)] transition-all duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                >
                  See How It Works
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="mx-auto aspect-[18/11] w-full max-w-[420px] overflow-hidden rounded-2xl border border-[oklch(92%_0.02_250)] bg-[oklch(97%_0.015_250)]">
              <NicheHeroVisual id={activeNiche.id} />
            </div>
          </div>

          {/* SECTION B & SECTION C: Mobile Profile Preview + What You Can Showcase */}
          <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            {/* SECTION B: Smart Biz Profile Preview */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-8">
              <div className="text-center lg:text-left">
                <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
                  Live profile preview
                </p>
                <h4 className="mt-1.5 font-display text-xl font-bold text-[var(--foreground)]">
                  Example for {activeNiche.label}
                </h4>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  One shareable mobile destination tailored to how your clients enquire.
                </p>
              </div>

              <div className="mt-6">
                <NichePhoneMockup niche={activeNiche} />
              </div>
            </div>

            {/* SECTION C: What You Can Showcase */}
            <div className="rounded-3xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-8">
              <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
                What you can showcase
              </p>
              <h4 className="mt-1.5 font-display text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                {activeNiche.showcaseTitle}
              </h4>

              <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {activeNiche.showcaseItems.map((item, idx) => {
                  const isOddLast =
                    idx === activeNiche.showcaseItems.length - 1 &&
                    activeNiche.showcaseItems.length % 2 === 1;
                  return (
                    <div
                      key={item.title}
                      className={`group flex items-start gap-3.5 rounded-2xl border border-[oklch(91%_0.02_250)] bg-[oklch(98.5%_0.008_250)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)]/35 hover:bg-white hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:transform-none ${
                        isOddLast ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xs">
                        <NicheIcon icon={item.icon} className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-[var(--foreground)]">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-snug text-[var(--muted-foreground)]">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION D: How It Works (Niche Customer Journey) */}
          <div
            id="niche-how-it-works"
            className="scroll-mt-24 rounded-3xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
                  How it works
                </p>
                <h4 className="mt-1 font-display text-xl font-bold text-[var(--foreground)] sm:text-2xl">
                  Customer journey for {activeNiche.label}
                </h4>
              </div>
              <span className="text-xs font-medium text-[var(--muted-foreground)]">
                5 simple steps to WhatsApp
              </span>
            </div>

            {/* Desktop horizontal journey */}
            <div className="mt-6 hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-2">
              {activeNiche.journeySteps.map((step, idx) => (
                <div key={step.title} className="contents">
                  <div className="flex h-full flex-col items-center rounded-2xl border border-[oklch(91%_0.025_250)] bg-[oklch(98%_0.012_250)] p-4 text-center transition-colors hover:border-[var(--primary)]/40 hover:bg-white">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xs">
                      <NicheIcon icon={step.icon} className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-[11px] font-bold text-[var(--primary)] tabular-nums">
                      0{idx + 1}
                    </p>
                    <p className="mt-0.5 font-display text-xs font-bold leading-snug text-[var(--foreground)] lg:text-sm">
                      {step.title}
                    </p>
                  </div>

                  {idx < activeNiche.journeySteps.length - 1 && (
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-[var(--primary)]/60"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical journey */}
            <div className="mt-5 flex flex-col gap-1.5 md:hidden">
              {activeNiche.journeySteps.map((step, idx) => (
                <div key={step.title}>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-[oklch(91%_0.025_250)] bg-[oklch(98%_0.012_250)] p-3.5">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <NicheIcon icon={step.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-[var(--primary)] tabular-nums">
                        Step 0{idx + 1}
                      </p>
                      <p className="font-display text-sm font-bold text-[var(--foreground)]">
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {idx < activeNiche.journeySteps.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-[var(--primary)]/65" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION E: Call to Action */}
          <div className="gradient-primary-cyan flex flex-col items-center justify-between gap-6 rounded-3xl p-7 text-center text-white shadow-[0_24px_52px_-20px_oklch(50%_0.2_255/0.55)] sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h4 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your Business Deserves One Professional Link.
              </h4>
              <p className="mt-2 text-sm text-white/90 sm:text-[15px]">
                Showcase your business. Share one link. Connect with customers.
              </p>
            </div>
            <Button variant="white" size="lg" onClick={onOpenModal} className="shrink-0">
              Get Your Smart Biz Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
