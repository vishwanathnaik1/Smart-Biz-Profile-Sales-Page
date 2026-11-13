import {
  ArrowRight,
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  HeartHandshake,
  Images,
  Link2,
  MapPin,
  MessageCircle,
  Package,
  Quote,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  User,
  XCircle,
} from "lucide-react";
import {
  AUDIENCE_CATEGORIES,
  CLIENT_QUESTIONS,
  COMPARISON_ROWS,
  FEATURES,
  STOREFRONT_HIGHLIGHTS,
  TRUST_BADGES,
  WHATS_INCLUDED,
} from "../data/landingData";
import { Button } from "./ui/Button";

interface OfferAndComparisonSectionsProps {
  onOpenModal: () => void;
}

const FEATURE_ICON_MAP = {
  profile: User,
  services: Briefcase,
  store: ShoppingBag,
  whatsapp: MessageCircle,
  testimonials: Star,
  gallery: Images,
  info: MapPin,
  link: Share2,
} as const;

const TRUST_ICON_MAP = {
  testimonials: Star,
  gallery: Images,
  experience: Award,
  services: Briefcase,
  feedback: HeartHandshake,
  social: Link2,
} as const;

export function OfferAndComparisonSections({ onOpenModal }: OfferAndComparisonSectionsProps) {
  return (
    <>
      {/* 2. Dark Navy Client Questions Band */}
      <section className="bg-[var(--surface-dark)] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
              Your clients are searching
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              What happens when someone asks…
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[oklch(75%_0.02_255)] sm:text-[15px]">
              If your answer is scattered across old posts and WhatsApp messages, you may be losing
              potential clients.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {CLIENT_QUESTIONS.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-white/10 bg-[var(--surface-dark-card)] p-5 shadow-xs"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                  <Quote className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-[15px] font-semibold text-white">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Meet Smart Biz Profile (8 Feature Cards) */}
      <section id="features" className="bg-[var(--background)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
              Meet Smart Biz Profile
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              Everything your business needs — in one link.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
              A professional online presence without the cost and complexity of building a
              traditional website.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => {
              const Icon = FEATURE_ICON_MAP[feature.id];
              return (
                <article
                  key={feature.id}
                  className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-[var(--foreground)]">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Detour Comparison (Without vs With Smart Biz Profile) */}
      <section className="bg-[var(--surface-ice)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
              Imagine this
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              From discovery to conversation, without the detour.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-[var(--border)] bg-white p-7 shadow-xs">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[var(--destructive)]">
                <XCircle className="h-4 w-4" aria-hidden="true" />
                Without Smart Biz Profile
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-1.5 sm:flex-nowrap">
                {["Instagram", "DM", "Ask services", "Wait", "Ask price"].map((step, idx, arr) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted-foreground)]">
                      {step}
                    </span>
                    {idx < arr.length - 1 && (
                      <ArrowRight
                        className="h-3 w-3 shrink-0 text-[var(--muted-foreground)]"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm text-[var(--muted-foreground)]">
                Too many steps can mean lost opportunities.
              </p>
            </article>

            <article className="gradient-primary-cyan rounded-2xl p-7 text-white shadow-[0_22px_48px_-18px_oklch(50%_0.2_255/0.55)]">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-white">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                With Smart Biz Profile
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {["One link", "Profile", "Services", "Proof", "WhatsApp"].map((step, idx, arr) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg bg-white/18 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xs">
                      {step}
                    </span>
                    {idx < arr.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-white/80" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm font-medium text-white">
                Simple. Professional. Convenient.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 5. Built for service-based businesses + Storefront checklist */}
      <section className="bg-[var(--background)] py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
              Built for service-based businesses
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
              Your digital storefront, whatever you sell.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
              If you sell a service or product online, Smart Biz Profile can become your
              professional destination.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {AUDIENCE_CATEGORIES.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--foreground)] shadow-2xs"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[0_24px_50px_-24px_oklch(35%_0.06_260/0.18)]">
            <div className="flex items-start gap-3.5">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[oklch(93%_0.12_127/0.55)] text-[var(--accent-foreground)]">
                <Store className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-[var(--foreground)]">
                  Sell without a complex website
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted-foreground)]">
                  An easy-to-browse digital storefront.
                </p>
              </div>
            </div>

            <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
              {STOREFRONT_HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-[var(--foreground)]"
                >
                  <Check className="h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Dark Navy Trust Band */}
      <section className="bg-[var(--surface-dark)] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:px-8">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
              Build trust before the first call
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Look professional. Make the next step obvious.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[oklch(75%_0.02_255)] sm:text-[15px]">
              People make quick decisions online. Show who you are, what you offer, why they should
              trust you and how to contact you.
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {TRUST_BADGES.map((badge) => {
              const Icon = TRUST_ICON_MAP[badge.id];
              return (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-[var(--surface-dark-card)] px-4 py-3.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Traditional Approach vs Smart Biz Profile Comparison Table */}
      <section id="difference" className="bg-[var(--surface-ice)] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
              Your digital business presence — simplified
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              A simpler way to show up online.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_20px_50px_-24px_oklch(40%_0.08_260/0.2)]">
            <div className="grid grid-cols-2 border-b border-[var(--border)] bg-[oklch(97.5%_0.01_255)] px-6 py-4 text-xs font-bold sm:px-8 sm:text-sm">
              <div className="text-[var(--muted-foreground)]">Traditional approach</div>
              <div className="text-[var(--primary)]">Smart Biz Profile</div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.traditional}
                  className="grid grid-cols-2 items-center px-6 py-4 text-xs sm:px-8 sm:text-sm"
                >
                  <div className="pr-4 text-[var(--muted-foreground)]">{row.traditional}</div>
                  <div className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
                    <Check
                      className="h-4 w-4 shrink-0 text-[var(--success)]"
                      aria-hidden="true"
                    />
                    <span>{row.smart}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Vibrant Blue-Cyan Offer Card */}
      <section className="bg-[var(--background)] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="gradient-primary-cyan mx-auto grid max-w-6xl items-center gap-10 rounded-3xl p-8 text-white shadow-[0_26px_60px_-24px_oklch(48%_0.2_255/0.55)] sm:p-12 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-white/85 uppercase">
              Get your Smart Biz Profile
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Everything you need to present your business professionally.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-[15px]">
              Plus professional setup assistance. We&apos;ll help you get your profile ready so you
              can start sharing it with customers.
            </p>
            <div className="mt-7">
              <Button variant="white" size="lg" onClick={onOpenModal}>
                Create My Smart Biz Profile
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/12 p-6 backdrop-blur-sm sm:p-7">
            <p className="font-display text-sm font-bold text-white">What&apos;s included</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {WHATS_INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs font-medium text-white sm:text-[13px]">
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
