import {
  AppWindow,
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  BriefcaseBusiness,
  ClipboardList,
  Code,
  CodeXml,
  Files,
  Globe,
  Headset,
  HeartHandshake,
  Images,
  Infinity as InfinityIcon,
  Layers,
  LayoutDashboard,
  Link as LinkIcon,
  Link2,
  MapPin,
  MessageCircle,
  Monitor,
  Quote,
  RefreshCw,
  Rocket,
  Settings,
  Settings2,
  Share2,
  ShoppingBag,
  Smartphone,
  Star,
  Store,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { FeaturesShowcaseSection } from "./FeaturesShowcaseSection";
import { JourneyComparisonSection } from "./JourneyComparisonSection";
import { NicheShowcaseSection } from "./NicheShowcaseSection";
import {
  CLIENT_QUESTIONS,
  COMPARISON_ROWS,
  TRUST_BADGES,
  WHATS_INCLUDED,
} from "../data/landingData";
import { Button } from "./ui/Button";

interface OfferAndComparisonSectionsProps {
  onOpenModal: () => void;
}


const TRUST_ICON_MAP = {
  testimonials: Star,
  gallery: Images,
  experience: Award,
  services: Briefcase,
  feedback: HeartHandshake,
  social: Link2,
} as const;

const WHATS_INCLUDED_ICON_MAP: Record<(typeof WHATS_INCLUDED)[number], LucideIcon> = {
  "Professional Smart Business Profile": UserRound,
  "Services / Packages Section": BriefcaseBusiness,
  "Product / Store Section": ShoppingBag,
  "WhatsApp Contact": MessageCircle,
  "Business Information": MapPin,
  Testimonials: Star,
  Gallery: Images,
  "Social Media Links": Share2,
  "Shareable Business URL": LinkIcon,
  "Mobile-Friendly Design": Smartphone,
  "Contact Form": ClipboardList,
  "Unlimited Enquiries": InfinityIcon,
  "Custom Domain": Globe,
  "Progressive Web App (PWA)": AppWindow,
  "Visitor Analytics": BarChart3,
  "Free Setup": Rocket,
  "Free Support": Headset,
};

const TRADITIONAL_COMPARISON_ICON_MAP: Record<(typeof COMPARISON_ROWS)[number]["traditional"], LucideIcon> = {
  "Expensive website": Monitor,
  "Developer required": Code,
  "Multiple links": Link2,
  "Complicated setup": Settings,
  "Separate product pages": Files,
  "Information scattered": Layers,
  "Difficult to update": RefreshCw,
};

const COMPARISON_ICON_MAP: Record<(typeof COMPARISON_ROWS)[number]["smart"], LucideIcon> = {
  "Affordable digital presence": Wallet,
  "No coding required": CodeXml,
  "One powerful link": LinkIcon,
  "Easy setup": Settings2,
  "Profile + Store": Store,
  "Everything organized": LayoutDashboard,
  "Easy to manage": RefreshCw,
};

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

      {/* 3. Meet Smart Biz Profile (8 Visual Feature Cards) */}
      <FeaturesShowcaseSection />

      {/* 4. Detour Comparison (Without vs With Smart Biz Profile) */}
      <JourneyComparisonSection />

      {/* 5. Interactive Niche-Based Showcase */}
      <NicheShowcaseSection onOpenModal={onOpenModal} />

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
              Your Smart Business Profile — simplified
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
              A simpler way to show up online.
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-white shadow-[0_20px_50px_-24px_oklch(40%_0.08_260/0.2)]">
            <div className="grid grid-cols-2 gap-3 border-b border-[var(--border)] bg-[oklch(97.5%_0.01_255)] px-4 py-4 text-xs font-bold sm:gap-6 sm:px-8 sm:text-sm">
              <div className="text-[var(--muted-foreground)]">Traditional approach</div>
              <div className="text-[#087FE5]">Smart Biz Profile</div>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {COMPARISON_ROWS.map((row) => {
                const TraditionalIcon = TRADITIONAL_COMPARISON_ICON_MAP[row.traditional];
                const SmartIcon = COMPARISON_ICON_MAP[row.smart];
                return (
                  <div
                    key={row.traditional}
                    className="group grid grid-cols-2 items-center gap-3 px-4 py-3.5 text-xs transition-colors duration-200 hover:bg-[oklch(97.5%_0.015_252)] sm:gap-6 sm:px-8 sm:py-4 sm:text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-[var(--muted-foreground)] sm:gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:border-[#FCA5A5] motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:h-8 sm:w-8">
                        <TraditionalIcon
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="leading-snug">{row.traditional}</span>
                    </div>
                    <div className="flex min-w-0 items-center gap-2 font-semibold text-[var(--foreground)] sm:gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#CFE2FF] bg-[#EAF3FF] text-[#087FE5] shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:border-[#087FE5]/40 motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:h-8 sm:w-8">
                        <SmartIcon
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="leading-snug">{row.smart}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Vibrant Blue-Cyan Offer Card */}
      <section className="bg-[var(--background)] px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="gradient-primary-cyan mx-auto grid max-w-6xl items-center gap-10 rounded-3xl p-8 text-white shadow-[0_26px_60px_-24px_oklch(48%_0.2_255/0.55)] sm:p-12 lg:grid-cols-[0.88fr_1.12fr]">
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
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-2">
              {WHATS_INCLUDED.map((item) => {
                const Icon = WHATS_INCLUDED_ICON_MAP[item];
                return (
                  <li
                    key={item}
                    className="group flex items-center gap-3 rounded-xl px-2 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-white/10 sm:text-[13px]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-200/30 bg-sky-100/20 text-white shadow-2xs transition-all duration-200 group-hover:border-sky-100/60 group-hover:bg-sky-100/30">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
