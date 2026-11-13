import {
  Briefcase,
  CalendarCheck,
  Images,
  MapPin,
  MessageCircle,
  Share2,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";
import { FEATURES } from "../data/landingData";
import { FeatureVisualPreview } from "./FeatureVisualPreviews";

const FEATURE_ICON_MAP = {
  profile: User,
  services: Briefcase,
  store: ShoppingBag,
  booking: CalendarCheck,
  whatsapp: MessageCircle,
  testimonials: Star,
  gallery: Images,
  info: MapPin,
  link: Share2,
} as const;

export function FeaturesShowcaseSection() {
  return (
    <section
      id="features"
      className="bg-gradient-to-b from-[oklch(97.5%_0.015_248)] via-white to-[var(--background)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[var(--primary)] uppercase">
            Meet Smart Biz Profile
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl">
            Everything your business needs — in one link.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[15px]">
            A complete Smart Business Profile without the cost and complexity of building a
            traditional website.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICON_MAP[feature.id];
            const isLastOddTablet = index === FEATURES.length - 1 && FEATURES.length % 2 === 1;
            return (
              <article
                key={feature.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-[oklch(90%_0.025_250)] bg-white shadow-[0_14px_34px_-22px_oklch(40%_0.08_255/0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/35 hover:shadow-[0_24px_48px_-22px_oklch(50%_0.18_255/0.25)] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                  isLastOddTablet ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex h-[210px] w-full items-center justify-center overflow-hidden border-b border-[oklch(92%_0.02_250)] bg-gradient-to-br from-[oklch(95.5%_0.026_246)] via-[oklch(97.5%_0.014_235)] to-white p-4 sm:h-[228px] sm:p-5">
                  <FeatureVisualPreview id={feature.id} />
                </div>

                <div className="flex flex-1 items-start gap-3.5 p-5 sm:p-7">
                  <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] transition-colors duration-200 group-hover:bg-[var(--primary)] group-hover:text-white motion-reduce:transition-none">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted-foreground)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
