import type { AppRoute } from "../../utils/routing";
import { LegalPageLayout, LegalSection } from "../LegalPageLayout";

interface LegalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function TermsPage({ onNavigate }: LegalPageProps) {
  return (
    <LegalPageLayout
      eyebrow="Legal Documentation"
      title="Terms & Conditions"
      subtitle="Please read these Terms & Conditions carefully before registering for or using Smart Biz Profile."
      lastUpdatedNote="Last Updated: 2026"
      onNavigate={onNavigate}
    >
      <LegalSection number={1} title="Introduction & Acceptance of Terms">
        <p>
          These Terms &amp; Conditions govern your access to and use of the{" "}
          <strong>Smart Biz Profile</strong> website, digital business profile tools, and related
          setup services operated by <strong>DigiTech Growth Media</strong> (&ldquo;we&rdquo;,
          &ldquo;our&rdquo;, or &ldquo;us&rdquo;).
        </p>
        <p>
          By accessing this website, submitting an onboarding enquiry, registering an account, or
          using Smart Biz Profile, you agree to be bound by these Terms &amp; Conditions. If you do
          not agree with any part of these terms, please discontinue use of the platform.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Description of Smart Biz Profile Services">
        <p>
          Smart Biz Profile provides a digital business profile and storefront platform designed to
          help service professionals, freelancers, product sellers, and small businesses share a
          single link containing their business identity, services and packages, product catalogue,
          photo and video gallery, testimonials, business hours, location details, and direct
          WhatsApp contact options.
        </p>
        <p>
          <strong>Important Storefront Clarification:</strong> Customers can browse showcased
          products and send order enquiries directly via WhatsApp.{" "}
          <strong>
            Integrated online payment processing is not currently available inside the WhatsApp
            store.
          </strong>{" "}
          Any payment arrangements, invoices, or order fulfillment occur directly between the
          business and its customers outside the platform.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Account Registration & User Responsibilities">
        <p>
          Certain Smart Biz Profile account creation and login features are hosted through our
          account portal (<code>smartbizprofile.in/register</code> and{" "}
          <code>smartbizprofile.in/login</code>). When creating an account, you agree to provide
          accurate, current, and complete information and to maintain the confidentiality of your
          login credentials.
        </p>
        <p>
          You are responsible for all activities conducted under your account and must notify us
          promptly if you suspect unauthorized access.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Business Information & Content Uploaded by Users">
        <p>
          You retain ownership of the business names, logos, service descriptions, pricing,
          product details, photographs, videos, testimonials, and contact details you provide or
          upload to your Smart Biz Profile.
        </p>
        <p>
          By submitting content for display or setup assistance, you represent and warrant that you
          have all necessary rights, licenses, and permissions to publish that content and that it
          is truthful, accurate, and compliant with applicable laws.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Acceptable Use of the Platform">
        <p>You agree not to use Smart Biz Profile to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Publish unlawful, misleading, fraudulent, defamatory, or infringing content.</li>
          <li>Impersonate another individual, brand, or business entity.</li>
          <li>Distribute malware, spam, unsolicited bulk messages, or malicious links.</li>
          <li>
            Attempt to disrupt, scrape, reverse-engineer, or bypass security controls of the
            website or platform.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={6} title="Subscription & Payment Terms">
        <p>
          Access to paid Smart Biz Profile plans, add-ons, or optional setup services is subject to
          the pricing and billing terms communicated during registration or onboarding.
        </p>

        <div className="space-y-3 pt-1">
          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.1 Subscription Pricing
            </h3>
            <p className="mt-1">
              The applicable subscription fees, available plans, add-ons, and promotional offers
              will be displayed on the official website or communicated to customers before
              purchase. All prices are in Indian Rupees (INR), unless otherwise specified.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.2 Billing Cycle
            </h3>
            <p className="mt-1">
              Subscriptions may be offered on a monthly or yearly basis, depending on the selected
              plan. The subscription duration and validity will be communicated at the time of
              purchase.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.3 Accepted Payment Methods
            </h3>
            <p className="mt-1">
              Payments may be made through the available payment gateway or officially communicated
              payment channels, including UPI, debit cards, credit cards, and net banking, wherever
              supported.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.4 Payment Confirmation
            </h3>
            <p className="mt-1">
              Paid services and subscription access will be activated after successful payment
              confirmation, subject to the applicable plan and service conditions.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.5 Subscription Renewal
            </h3>
            <p className="mt-1">
              Customers are responsible for renewing their subscriptions before expiry to ensure
              uninterrupted service, unless an automatic renewal option is explicitly selected.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.6 Price Changes
            </h3>
            <p className="mt-1">
              We reserve the right to update or modify our subscription pricing, plans, or add-on
              charges at any time. Any price changes will apply only to new subscriptions or future
              renewals and will not affect active paid periods.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.7 Taxes
            </h3>
            <p className="mt-1">
              Applicable taxes, including GST or other statutory levies, may be charged in addition
              to the listed prices, wherever applicable.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.8 Add-ons and Optional Services
            </h3>
            <p className="mt-1">
              Optional add-ons, custom domain support, setup services, or additional features may
              carry separate charges, which will be clearly communicated before purchase.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-[var(--foreground)] sm:text-[15px]">
              6.9 Customer Responsibility
            </h3>
            <p className="mt-1">
              Customers must ensure that accurate billing details and authorized payment methods are
              used while making payments.
            </p>
          </div>
        </div>

        <p className="pt-1">
          All billing and refund requests are governed by our{" "}
          <a
            href="/refund-policy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/refund-policy");
            }}
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Refund Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection number={7} title="Setup Assistance & Service Delivery">
        <p>
          Where setup assistance is included with an offer or plan, our team assists in organizing
          your business profile details, services, products, and links based on the content and
          images you provide. Setup timelines depend on receipt of complete business materials from
          you.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Intellectual Property Rights">
        <p>
          All website design, layout, visual graphics, software code, trademarks, and Smart Biz
          Profile branding remain the intellectual property of DigiTech Growth Media / Smart Biz
          Profile or its licensors. You may not copy, resell, or redistribute platform materials
          without prior written permission.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Third-Party Services & External Links">
        <p>
          Smart Biz Profile links to or interacts with external third-party platforms such as
          WhatsApp (<code>wa.me</code>), Instagram, Facebook, Google Maps, or external websites
          added by users. We do not control and are not responsible for the availability, policies,
          or practices of third-party services.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Service Availability & Limitations">
        <p>
          While we aim to keep Smart Biz Profile reliable and accessible across mobile and desktop
          devices, uninterrupted availability cannot be guaranteed. Temporary downtime may occur due
          to maintenance, updates, or external network disruptions.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Limitation of Liability">
        <p>
          To the fullest extent permitted by applicable law, DigiTech Growth Media, Smart Biz
          Profile, and its operators shall not be liable for any indirect, incidental, special, or
          consequential damages, loss of profits, lost leads, or disputes arising between a business
          user and its end customers in connection with use of the platform.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Suspension & Termination">
        <p>
          We reserve the right to suspend or terminate access to any Smart Biz Profile account or
          profile page that violates these Terms &amp; Conditions, engages in fraudulent or harmful
          conduct, or remains unpaid under an active billing arrangement.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Changes to Terms">
        <p>
          We may update these Terms &amp; Conditions from time to time to reflect service updates or
          legal requirements. Updated terms take effect upon publication on this page.
        </p>
      </LegalSection>

      <LegalSection number={14} title="Governing Law & Jurisdiction">
        <p>
          These Terms &amp; Conditions shall be governed by and construed in accordance with the
          laws of India, without regard to conflict of law principles. Any disputes arising out of
          or relating to the use of Smart Biz Profile or these Terms &amp; Conditions shall be
          subject to the exclusive jurisdiction of the competent courts in Goa, India.
        </p>
      </LegalSection>

      <LegalSection number={15} title="Contact Information">
        <p>
          For questions regarding these Terms &amp; Conditions, reach us via our{" "}
          <a
            href="/contact-us"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/contact-us");
            }}
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            Contact Us
          </a>{" "}
          page, on WhatsApp at <strong>+91 8329410074</strong>, or by email at{" "}
          <a
            href="mailto:support@smartbizprofile.in"
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            support@smartbizprofile.in
          </a>
          . Our support team aims to review and respond to enquiries within support hours (10:00 -
          20:00).
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
