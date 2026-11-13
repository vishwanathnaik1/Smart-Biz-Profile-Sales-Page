import type { AppRoute } from "../../utils/routing";
import { LegalPageLayout, LegalSection } from "../LegalPageLayout";

interface LegalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function DisclaimerPage({ onNavigate }: LegalPageProps) {
  return (
    <LegalPageLayout
      eyebrow="Legal Documentation"
      title="Disclaimer"
      subtitle="Important clarifications regarding the role of the Smart Biz Profile platform, business-provided listings, and direct customer interactions."
      lastUpdatedNote="Last Updated: 2026"
      onNavigate={onNavigate}
    >
      <LegalSection number={1} title="Platform Role">
        <p>
          Smart Biz Profile is a digital business profile and storefront platform that enables
          businesses, independent professionals, and sellers to organize and share their services,
          product catalogues, galleries, testimonials, and contact links in a single web profile.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Responsibility for Business Information, Services & Pricing">
        <p>
          Each business using Smart Biz Profile is solely responsible for the accuracy, legality,
          completeness, availability, and pricing of the business details, service packages,
          products, photos, testimonials, and offers displayed on its profile. Smart Biz Profile
          does not independently verify, endorse, or audit third-party business claims unless
          explicitly stated.
        </p>
      </LegalSection>

      <LegalSection number={3} title="No Guarantee of Sales, Enquiries, Leads or Growth">
        <p>
          While Smart Biz Profile is designed to help businesses present themselves clearly and
          direct visitors toward WhatsApp enquiries,{" "}
          <strong>
            we do not guarantee specific sales volume, customer leads, bookings, enquiries, or
            business revenue growth
          </strong>
          . Business results depend on each business&apos;s own offerings, pricing, marketing, and
          customer service.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Direct Communication & Transactions Between Customers & Businesses">
        <p>
          Visitors and customers communicate, enquire, and transact directly with the individual
          business listed on a Smart Biz Profile. Smart Biz Profile is not a party to any service
          agreement, consultation, booking, or purchase between a business and its customers.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Storefront Orders & Payment Arrangements">
        <p>
          Product orders initiated through a business&apos;s storefront are sent as order enquiries
          directly to the business via WhatsApp.{" "}
          <strong>
            Integrated online payment processing is not currently available in the WhatsApp store.
          </strong>{" "}
          All payment methods, invoicing, refunds, shipping, and fulfillment terms are handled
          directly between the customer and the respective business.
        </p>
      </LegalSection>

      <LegalSection number={6} title="External Links & Third-Party Platforms">
        <p>
          Smart Biz Profile pages and this website may include links to external platforms such as
          WhatsApp, Instagram, Facebook, Google Maps, or external portals. Such third-party
          websites and apps operate outside our control, and we assume no responsibility for their
          content, uptime, security, or policies.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Subject to Applicable Terms & Limitations">
        <p>
          All information, feature previews, and example business profiles shown on this website are
          provided for general informational and demonstration purposes and remain subject to our{" "}
          <a
            href="/terms-and-conditions"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/terms-and-conditions");
            }}
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Terms &amp; Conditions
          </a>{" "}
          and applicable legal limitations.
        </p>
        <p>
          <strong>Business / Legal Entity Name:</strong> DigiTech Growth Media
          <br />
          <strong>Operating Brand:</strong> Smart Biz Profile
        </p>
        <p>
          Nothing in this website or its demonstrations creates any contractual obligation,
          warranty, or guarantee beyond those expressly set out in our Terms &amp; Conditions and
          applicable service agreements.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
