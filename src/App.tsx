/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from "react";
import { ClaimProfileModal } from "./components/ClaimProfileModal";
import { FaqAndFooter } from "./components/FaqAndFooter";
import { Footer } from "./components/Footer";
import { GoogleSheetsModal } from "./components/GoogleSheetsModal";
import { Header } from "./components/Header";
import { GoogleSheetsProvider } from "./context/GoogleSheetsContext";
import { HeroSection } from "./components/HeroSection";
import { MobileStickyCta } from "./components/MobileStickyCta";
import { OfferAndComparisonSections } from "./components/OfferAndComparisonSections";
import { ContactUsPage } from "./components/pages/ContactUsPage";
import { DisclaimerPage } from "./components/pages/DisclaimerPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { RefundPolicyPage } from "./components/pages/RefundPolicyPage";
import { TermsPage } from "./components/pages/TermsPage";
import { getPageMeta, normalizePathname, type AppRoute } from "./utils/routing";
import {
  SEO_BRAND_IMAGE_PATH,
  buildCanonicalUrl,
  buildRouteStructuredData,
} from "./utils/seo";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    normalizePathname(window.location.pathname),
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const navigate = useCallback((route: AppRoute, sectionHash?: string) => {
    const targetUrl = sectionHash ? `${route}${sectionHash}` : route;
    if (window.location.pathname !== route || sectionHash) {
      window.history.pushState({}, "", targetUrl);
    }
    setCurrentRoute(route);

    if (sectionHash) {
      const id = sectionHash.replace(/^#/, "");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePathname(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = getPageMeta(currentRoute);
    const origin = window.location.origin;
    const canonicalUrl = buildCanonicalUrl(origin, currentRoute);
    const absoluteImageUrl = `${origin}${SEO_BRAND_IMAGE_PATH}`;

    document.title = meta.title;

    const setMetaTag = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute("content", content);
      }
    };

    setMetaTag('meta[name="description"]', meta.description);
    setMetaTag('meta[property="og:title"]', meta.title);
    setMetaTag('meta[property="og:description"]', meta.description);
    setMetaTag('meta[property="og:url"]', canonicalUrl);
    setMetaTag('meta[property="og:image"]', absoluteImageUrl);
    setMetaTag('meta[name="twitter:title"]', meta.title);
    setMetaTag('meta[name="twitter:description"]', meta.description);
    setMetaTag('meta[name="twitter:image"]', absoluteImageUrl);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute("href", canonicalUrl);
    }

    let ldScript = document.getElementById("route-json-ld") as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement("script");
      ldScript.id = "route-json-ld";
      ldScript.type = "application/ld+json";
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(buildRouteStructuredData(origin, currentRoute));
  }, [currentRoute]);

  const renderMainContent = () => {
    switch (currentRoute) {
      case "/terms-and-conditions":
        return <TermsPage onNavigate={navigate} />;
      case "/privacy-policy":
        return <PrivacyPage onNavigate={navigate} />;
      case "/disclaimer":
        return <DisclaimerPage onNavigate={navigate} />;
      case "/refund-policy":
        return <RefundPolicyPage onNavigate={navigate} />;
      case "/contact-us":
        return <ContactUsPage onNavigate={navigate} />;
      case "/":
      default:
        return (
          <>
            <HeroSection onOpenModal={openModal} />
            <OfferAndComparisonSections onOpenModal={openModal} />
            <FaqAndFooter onOpenModal={openModal} />
          </>
        );
    }
  };

  return (
    <GoogleSheetsProvider>
      <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header
          onOpenModal={openModal}
          currentRoute={currentRoute}
          onNavigate={navigate}
        />

        <main className="flex-1">{renderMainContent()}</main>

        <Footer currentRoute={currentRoute} onNavigate={navigate} />

        <MobileStickyCta onOpenModal={openModal} />
        <ClaimProfileModal open={modalOpen} onClose={closeModal} />
        <GoogleSheetsModal />
      </div>
    </GoogleSheetsProvider>
  );
}
