export type AppRoute =
  | "/"
  | "/terms-and-conditions"
  | "/privacy-policy"
  | "/disclaimer"
  | "/refund-policy"
  | "/contact-us";

export interface FooterNavLink {
  label: string;
  href: Exclude<AppRoute, "/">;
}

export const FOOTER_NAV_LINKS: readonly FooterNavLink[] = [
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

export interface PageMeta {
  title: string;
  description: string;
}

const ROUTE_META_MAP: Record<AppRoute, PageMeta> = {
  "/": {
    title: "Smart Business Profile | Smart Biz Profile & WhatsApp Store",
    description:
      "Create a Smart Business Profile to showcase your services, products, gallery, testimonials, and WhatsApp contact in one shareable link.",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions — Smart Biz Profile",
    description:
      "Read the Terms and Conditions governing your use of the Smart Biz Profile Smart Business Profile platform, plans, and WhatsApp storefront tools.",
  },
  "/privacy-policy": {
    title: "Privacy Policy — Smart Biz Profile",
    description:
      "Learn how Smart Biz Profile collects, protects, retains, and manages personal and business information on your Smart Business Profile.",
  },
  "/disclaimer": {
    title: "Disclaimer — Smart Biz Profile",
    description:
      "Review important platform disclaimers covering Smart Business Profile listings, direct WhatsApp enquiries, and third-party external links.",
  },
  "/refund-policy": {
    title: "Refund Policy — Smart Biz Profile",
    description:
      "Understand subscription billing, setup assistance, cancellation rules, and refund timelines for your Smart Biz Profile Smart Business Profile.",
  },
  "/contact-us": {
    title: "Contact Us — Smart Biz Profile",
    description:
      "Contact the Smart Biz Profile team via WhatsApp or email for Smart Business Profile support, onboarding help, sales, and billing enquiries.",
  },
};

const VALID_ROUTES = new Set<string>(Object.keys(ROUTE_META_MAP));

export function normalizePathname(pathname: string): AppRoute {
  const cleaned = pathname.trim().toLowerCase().replace(/\/+$/, "") || "/";
  if (VALID_ROUTES.has(cleaned)) {
    return cleaned as AppRoute;
  }
  return "/";
}

export function getPageMeta(route: AppRoute): PageMeta {
  return ROUTE_META_MAP[route];
}
