import { useState } from "react";
import { ArrowRight, Check, ExternalLink, MessageCircle, Sparkles } from "lucide-react";
import { HERO_PREVIEW_TABS } from "../data/landingData";
import { Button } from "./ui/Button";

interface HeroSectionProps {
  onOpenModal: () => void;
}

type PreviewTab = keyof typeof HERO_PREVIEW_TABS;

export function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("Store");

  const activeRows = HERO_PREVIEW_TABS[activeTab];

  return (
    <section id="top" className="hero-mesh relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[oklch(70%_0.15_148/0.75)] bg-white/90 px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-[oklch(45%_0.17_148)] uppercase shadow-xs backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Turn Your Instagram Visitors Into Paying Customers
          </p>

          <h1 className="font-montserrat mt-5 text-center text-3xl font-extrabold leading-[1.12] tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[50px]">
            <span className="text-[oklch(53%_0.22_22)]">Stop Losing</span>{" "}
            <span className="text-[var(--primary)]">Interested Customers</span>{" "}
            Between Your{" "}
            <span className="bg-gradient-to-r from-[#D62976] via-[#E1306C] to-[#F56040] bg-clip-text text-transparent">
              Instagram Profile
            </span>{" "}
            and <span className="text-[oklch(52%_0.18_148)]">WhatsApp.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-[var(--muted-foreground)] sm:text-[17px]">
            Give potential customers one professional place to explore your services, products,
            photos, testimonials and business information before connecting with you directly on
            WhatsApp.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Button variant="primary" size="lg" onClick={onOpenModal}>
              Build My Smart Biz Profile
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>

            <a
              href="#how-it-works"
              onClick={(e) => {
                const target = document.getElementById("how-it-works");
                if (target) {
                  e.preventDefault();
                  window.history.pushState({}, "", "#how-it-works");
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/80 px-6 text-sm font-semibold text-[var(--foreground)] shadow-xs transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
            >
              See how it works
              <ExternalLink className="h-3.5 w-3.5 text-[var(--muted-foreground)]" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-[var(--muted-foreground)]">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" />
              No coding
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" />
              No technical skills
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" />
              Easy setup
            </span>
          </div>
        </div>

        {/* Tilted Profile Card Preview */}
        <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
          <div className="rounded-[28px] border border-[oklch(82%_0.06_258/0.7)] bg-[oklch(88%_0.05_258/0.55)] p-3.5 shadow-[0_30px_60px_-24px_oklch(45%_0.12_260/0.35)] backdrop-blur-sm transition-transform duration-300 lg:rotate-[1.5deg] hover:rotate-0">
            <div className="rounded-[20px] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/smart-biz-owner.jpg"
                    alt="Small business owner showcasing services on Smart Business Profile"
                    className="h-12 w-12 rounded-full border-2 border-[var(--secondary)] object-cover"
                  />
                  <div>
                    <p className="font-display text-sm font-bold text-[var(--foreground)]">
                      Nisha&apos;s Creative Studio
                    </p>
                    <p className="text-[11px] text-[var(--muted-foreground)]">
                      Services · Products · Mumbai
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-[oklch(93%_0.12_127/0.6)] px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[var(--accent-foreground)] uppercase">
                  Smart
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Profile preview sections"
                className="mt-4 grid grid-cols-3 gap-2"
              >
                {(Object.keys(HERO_PREVIEW_TABS) as PreviewTab[]).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab)}
                      className={`rounded-xl py-2 text-center text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? "bg-[var(--primary)]/12 text-[var(--primary)]"
                          : "bg-[var(--secondary)]/70 text-[var(--foreground)] hover:bg-[var(--secondary)]"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3.5 space-y-2.5">
                {activeRows.map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    onClick={onOpenModal}
                    className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] bg-[oklch(98.5%_0.006_255)] px-4 py-3 text-left transition-colors hover:border-[var(--primary)]/40 hover:bg-white cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-[var(--foreground)] sm:text-[13px]">
                      {row.label}
                    </span>
                    <span className="text-xs font-semibold text-[var(--primary)]">{row.action}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onOpenModal}
                className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--success)] py-3 text-xs font-bold text-[var(--success-foreground)] shadow-xs transition-all hover:brightness-95 cursor-pointer sm:text-[13px]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </button>
            </div>
          </div>

          <div className="mt-4 inline-flex flex-col rounded-2xl border border-[var(--border)] bg-white/95 px-4 py-2.5 shadow-lg backdrop-blur-sm sm:absolute sm:-bottom-5 sm:-left-6 sm:mt-0">
            <p className="text-[11px] text-[var(--muted-foreground)]">Everything in one place</p>
            <p className="text-xs font-bold text-[var(--foreground)]">
              Profile → Store → WhatsApp
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
