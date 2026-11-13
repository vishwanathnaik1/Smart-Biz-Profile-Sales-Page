import { ArrowDown, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import {
  WithoutStepGraphic,
  type WithoutStepId,
  WithStepGraphic,
  type WithStepId,
} from "./JourneyStepIllustrations";

interface JourneyStep<T extends string> {
  id: T;
  number: string;
  title: string;
  caption: string;
}

const WITHOUT_STEPS: readonly JourneyStep<WithoutStepId>[] = [
  {
    id: "instagram",
    number: "01",
    title: "Instagram",
    caption: "Scroll cluttered posts",
  },
  {
    id: "dm",
    number: "02",
    title: "DM",
    caption: "Send manual message",
  },
  {
    id: "ask-services",
    number: "03",
    title: "Ask Services",
    caption: "Wonder what you offer",
  },
  {
    id: "wait",
    number: "04",
    title: "Wait",
    caption: "Delayed back-and-forth",
  },
  {
    id: "ask-price",
    number: "05",
    title: "Ask Price",
    caption: "Wait again for rates",
  },
];

const WITH_STEPS: readonly JourneyStep<WithStepId>[] = [
  {
    id: "one-link",
    number: "01",
    title: "One Link",
    caption: "Single bio & share URL",
  },
  {
    id: "profile",
    number: "02",
    title: "Profile",
    caption: "Logo, cover & contacts",
  },
  {
    id: "services",
    number: "03",
    title: "Services",
    caption: "Clear packages & prices",
  },
  {
    id: "proof",
    number: "04",
    title: "Proof",
    caption: "Reviews & trust badges",
  },
  {
    id: "whatsapp",
    number: "05",
    title: "WhatsApp",
    caption: "Ready-to-book enquiry",
  },
];

export function JourneyComparisonSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[var(--surface-ice)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
            Imagine this
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            From discovery to conversation, without the detour.
          </h2>
        </div>

        <div className="mt-10 space-y-6 sm:space-y-8">
          {/* Block 1: Without Smart Biz Profile */}
          <article className="rounded-3xl border border-rose-200/80 bg-white p-5 shadow-[0_14px_38px_-20px_oklch(35%_0.08_15/0.16)] sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[var(--destructive)]">
                <XCircle className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                <span>Without Smart Biz Profile</span>
              </p>
              <span className="text-xs font-medium text-rose-700/80">
                5 disconnected steps
              </span>
            </div>

            {/* Desktop horizontal 5-step visual journey */}
            <div className="mt-6 hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-2 lg:gap-3">
              {WITHOUT_STEPS.map((step, idx) => (
                <div key={step.id} className="contents">
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-rose-200/75 bg-rose-50/45 p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50/80 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:transform-none lg:p-4">
                    <div className="h-20 w-full max-w-[116px] transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                      <WithoutStepGraphic id={step.id} />
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-[var(--foreground)]">
                      <span className="mr-1.5 text-xs font-semibold text-rose-600 tabular-nums">
                        {step.number}
                      </span>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-[var(--muted-foreground)]">
                      {step.caption}
                    </p>
                  </div>

                  {idx < WITHOUT_STEPS.length - 1 && (
                    <div className="flex items-center justify-center" aria-hidden="true">
                      <ArrowRight className="h-4 w-4 shrink-0 text-rose-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical timeline */}
            <div className="mt-5 flex flex-col gap-1.5 md:hidden">
              {WITHOUT_STEPS.map((step, idx) => (
                <div key={step.id}>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-rose-200/80 bg-rose-50/45 p-3">
                    <div className="h-[68px] w-[88px] shrink-0 rounded-xl bg-white/80 p-1">
                      <WithoutStepGraphic id={step.id} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold tracking-wide text-rose-600 tabular-nums">
                        Step {step.number}
                      </p>
                      <p className="mt-0.5 font-display text-[15px] font-bold text-[var(--foreground)]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                        {step.caption}
                      </p>
                    </div>
                  </div>
                  {idx < WITHOUT_STEPS.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-rose-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-medium text-[var(--muted-foreground)]">
              Too many steps can mean lost opportunities.
            </p>
          </article>

          {/* Block 2: With Smart Biz Profile */}
          <article className="gradient-primary-cyan rounded-3xl p-5 text-white shadow-[0_28px_60px_-20px_oklch(50%_0.2_255/0.6)] ring-1 ring-white/25 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-white">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span>With Smart Biz Profile</span>
              </p>
              <span className="text-xs font-medium text-white/85">
                5 guided steps to WhatsApp
              </span>
            </div>

            {/* Desktop horizontal 5-step visual journey */}
            <div className="mt-6 hidden md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center md:gap-2 lg:gap-3">
              {WITH_STEPS.map((step, idx) => (
                <div key={step.id} className="contents">
                  <div className="group flex h-full flex-col items-center rounded-2xl border border-white/25 bg-white/14 p-3.5 text-center backdrop-blur-xs transition-all duration-200 hover:-translate-y-1 hover:border-white/45 hover:bg-white/22 hover:shadow-[0_14px_30px_-14px_rgba(15,23,42,0.35)] motion-reduce:transition-none motion-reduce:hover:transform-none lg:p-4">
                    <div className="h-20 w-full max-w-[116px] transition-transform duration-200 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
                      <WithStepGraphic id={step.id} />
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-white">
                      <span className="mr-1.5 text-xs font-semibold text-white/80 tabular-nums">
                        {step.number}
                      </span>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-white/85">
                      {step.caption}
                    </p>
                  </div>

                  {idx < WITH_STEPS.length - 1 && (
                    <div className="flex items-center justify-center" aria-hidden="true">
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/90" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile vertical timeline */}
            <div className="mt-5 flex flex-col gap-1.5 md:hidden">
              {WITH_STEPS.map((step, idx) => (
                <div key={step.id}>
                  <div className="flex items-center gap-3.5 rounded-2xl border border-white/25 bg-white/14 p-3 backdrop-blur-xs">
                    <div className="h-[68px] w-[88px] shrink-0 rounded-xl bg-white/10 p-1">
                      <WithStepGraphic id={step.id} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold tracking-wide text-white/80 tabular-nums">
                        Step {step.number}
                      </p>
                      <p className="mt-0.5 font-display text-[15px] font-bold text-white">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-white/85">
                        {step.caption}
                      </p>
                    </div>
                  </div>
                  {idx < WITH_STEPS.length - 1 && (
                    <div className="flex justify-center py-1" aria-hidden="true">
                      <ArrowDown className="h-4 w-4 text-white/90" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-semibold text-white">
              Simple. Professional. Convenient.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
