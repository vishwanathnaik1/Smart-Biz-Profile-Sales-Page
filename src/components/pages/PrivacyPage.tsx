import type { AppRoute } from "../../utils/routing";
import { LegalPageLayout, LegalSection } from "../LegalPageLayout";

interface LegalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function PrivacyPage({ onNavigate }: LegalPageProps) {
  return (
    <LegalPageLayout
      eyebrow="Legal Documentation"
      title="Privacy Policy"
      subtitle="How Smart Biz Profile collects, uses, stores, and handles information shared through our website and onboarding enquiries."
      lastUpdatedNote="Last Updated: 2026"
      onNavigate={onNavigate}
    >
      <LegalSection number={1} title="Personal Information We Collect">
        <p>
          When you interact with Smart Biz Profile—such as submitting a profile setup request,
          sending a contact enquiry, or registering an account—we may collect personal information
          you voluntarily provide, including your full name, WhatsApp or phone number, email
          address, and enquiry message details.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Business Information Collected During Registration & Setup">
        <p>
          To set up or display your Smart Biz Profile, we collect business-related details you
          provide, such as your business name, category, service descriptions and pricing, product
          catalogue items, gallery images or videos, customer testimonials, business address,
          operating hours, and social media links.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Contact Details & Account Information">
        <p>
          Account registration and sign-in are handled via our account portal (
          <code>smartbizprofile.in/register</code> and <code>smartbizprofile.in/login</code>). Any
          enquiries submitted through the landing page modal or Contact Us form are formatted into
          a direct WhatsApp enquiry message addressed to our team unless otherwise configured.
        </p>
      </LegalSection>

      <LegalSection number={4} title="How Information Is Used">
        <p>We use the information collected to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Respond to profile setup requests, sales questions, and support enquiries.</li>
          <li>Create, configure, and assist with maintaining your Smart Biz Profile.</li>
          <li>Communicate service updates, onboarding steps, and requested support.</li>
          <li>Improve website usability, reliability, and customer experience.</li>
        </ul>
      </LegalSection>

      <LegalSection number={5} title="How Information Is Stored & Protected">
        <p>
          We apply reasonable administrative, technical, and organizational safeguards to protect
          submitted contact details, account records, and business profile information against
          unauthorized access, disclosure, alteration, or misuse.
        </p>
        <p>
          Information collected through Smart Biz Profile is stored on secure hosting and cloud
          infrastructure managed with standard access controls and operational security practices.
        </p>
        <p>
          Access to customer records and setup materials is restricted to authorized personnel and
          trusted service providers who require it to deliver support, onboarding, or platform
          maintenance.
        </p>
        <p>
          While we strive to protect your information using commercially reasonable safeguards, no
          method of internet transmission or electronic storage can be guaranteed to be completely
          risk-free.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Cookies & Similar Technologies">
        <p>
          Smart Biz Profile may use standard browser storage, essential session technologies, and
          basic server logs to keep the website functional, remember interface preferences, and
          maintain reliable navigation.
        </p>
        <p>
          When visitor analytics or performance measurement tools are enabled on your live Smart Biz
          Profile or custom domain, basic usage metrics such as page views, device type, or referral
          sources may be recorded in aggregate to help evaluate profile activity.
        </p>
        <p>
          We do not use cookies to collect unauthorized sensitive personal details or sell visitor
          browsing histories to third-party advertisers.
        </p>
        <p>
          You can control, restrict, or clear cookies and local browser storage at any time through
          your web browser settings, though disabling essential browser features may affect how
          certain parts of the platform behave.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Third-Party Services & Integrations">
        <p>
          Depending on how you interact with Smart Biz Profile, certain third-party services are
          used directly:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>WhatsApp (wa.me):</strong> Enquiries initiated from the modal or Contact Us page
            open WhatsApp with your pre-filled message, subject to WhatsApp&apos;s own privacy
            policy.
          </li>
          <li>
            <strong>Account Portal (smartbizprofile.in):</strong> Login and account creation links
            direct users to the Smart Biz Profile application portal.
          </li>
          <li>
            <strong>External Fonts & User Links:</strong> Static font delivery (Google Fonts) and any
            social media or external URLs displayed on individual business profiles.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={8} title="Data Sharing & Disclosure">
        <p>
          We do not sell your personal information. Information may be disclosed only to team
          members or service providers assisting with profile setup and support, or where required
          by applicable law or legal process.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Data Retention">
        <p>
          We retain personal and business information only for as long as reasonably necessary to
          fulfill the purposes described in this Privacy Policy, support active accounts, and comply
          with legal or accounting obligations:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Active Accounts &amp; Profiles:</strong> Retained for as long as your Smart Biz
            Profile account or subscription remains active.
          </li>
          <li>
            <strong>Enquiry &amp; Support Records:</strong> Retained for as long as needed to
            follow up on setup requests, resolve support issues, and maintain service history.
          </li>
          <li>
            <strong>Billing &amp; Transaction Records:</strong> Retained for the duration required
            by applicable tax, accounting, and financial compliance regulations.
          </li>
          <li>
            <strong>Account Cancellation or Deletion Requests:</strong> Following cancellation or a
            verified deletion request, profile data is removed or anonymized within a reasonable
            operational timeframe unless retention is legally required.
          </li>
          <li>
            <strong>Backups &amp; System Logs:</strong> Temporary security and hosting logs may
            persist briefly in routine backup cycles before automatic overwrite.
          </li>
        </ul>
        <p>
          Once data is no longer needed for active service delivery or statutory retention, we take
          reasonable steps to securely delete or anonymize it.
        </p>
        <p>
          If you wish to request early removal of specific records, you may submit a deletion
          request using the contact details provided below.
        </p>
      </LegalSection>

      <LegalSection number={10} title="User Rights & Privacy Requests">
        <p>
          Subject to applicable law, you may request access to, correction of, or updates to the
          personal or business information you have shared with us by contacting our support team.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Data Deletion Requests">
        <p>
          To request deletion of your Smart Biz Profile content or enquiry details, please contact
          us with your registered name, business name, and phone number via WhatsApp or email. We
          will verify your request and remove applicable records in accordance with our operational
          and legal obligations.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Policy Updates">
        <p>
          We may update this Privacy Policy periodically to reflect changes in our features or
          applicable regulations. Updated versions will be posted on this page.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Contact Information for Privacy Questions">
        <p>
          For privacy-related questions, access requests, or data deletion enquiries, visit our{" "}
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
          page, message us on WhatsApp at <strong>+91 8329410074</strong>, or write to{" "}
          <a
            href="mailto:support@smartbizprofile.in"
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            support@smartbizprofile.in
          </a>
          . Our team will review verified privacy requests and respond promptly during support
          hours (10:00 - 20:00).
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
