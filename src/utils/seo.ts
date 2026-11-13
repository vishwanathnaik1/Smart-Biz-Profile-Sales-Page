import { FAQ_ITEMS } from "../data/landingData";
import { getPageMeta, type AppRoute } from "./routing";

export const SEO_BRAND_IMAGE_PATH = "/assets/aistudio/smart_biz_profile_logo_2101751c.png";

export function buildCanonicalUrl(origin: string, route: AppRoute): string {
  const cleanOrigin = origin.replace(/\/+$/, "");
  return route === "/" ? `${cleanOrigin}/` : `${cleanOrigin}${route}`;
}

export function buildRouteStructuredData(origin: string, route: AppRoute): Record<string, unknown> {
  const canonicalUrl = buildCanonicalUrl(origin, route);
  const meta = getPageMeta(route);

  const webPageNode = {
    "@type": route === "/contact-us" ? "ContactPage" : "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: meta.title,
    description: meta.description,
    isPartOf: {
      "@id": "https://smartbizprofile.in/#website",
    },
    about: {
      "@type": "Thing",
      name: "Smart Business Profile",
    },
  };

  if (route === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        webPageNode,
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Smart Biz Profile",
            item: buildCanonicalUrl(origin, "/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: meta.title.replace(" — Smart Biz Profile", ""),
            item: canonicalUrl,
          },
        ],
      },
    ],
  };
}
