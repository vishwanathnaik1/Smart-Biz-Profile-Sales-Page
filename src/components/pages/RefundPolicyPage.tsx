import type { AppRoute } from "../../utils/routing";
import { LegalPageLayout, LegalSection } from "../LegalPageLayout";

interface LegalPageProps {
  onNavigate: (route: AppRoute) => void;
}

export function RefundPolicyPage({ onNavigate }: LegalPageProps) {
  return (
    <LegalPageLayout
      eyebrow="Legal Documentation"
      title="Refund Policy"
      subtitle="Transparent guidelines covering Smart Biz Profile plan purchases, setup assistance, cancellations, and refund enquiries."
      lastUpdatedNote="Last Updated: 2026"
      onNavigate={onNavigate}
    >
      <LegalSection number={1} title="Subscription & Plan Purchases">
        <p>
          This Refund Policy applies to paid Smart Biz Profile subscriptions, add-ons, and optional
          setup services purchased directly from DigiTech Growth Media / Smart Biz Profile.
          Applicable plan pricing (in Indian Rupees, INR), billing cycles (monthly or yearly), and
          included features are clearly displayed on the official website or communicated during
          onboarding prior to purchase.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Payment Confirmation">
        <p>
          Once a payment is successfully processed through an authorized payment gateway or official
          payment channel, confirmation is issued via email, WhatsApp, or your account billing
          record. Please retain your transaction reference ID or invoice details for any billing,
          cancellation, or refund enquiry.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Setup Assistance">
        <p>
          Where setup assistance is included in your selected offer or plan, our team begins
          organizing and configuring your Smart Biz Profile once the required business details,
          service information, product details, and images are received.
        </p>
      </LegalSection>

      <LegalSection number={4} title="Service Delivery">
        <p>
          Delivery of your Smart Biz Profile digital storefront and any included setup assistance is
          considered initiated once onboarding begins or account access is provisioned, and
          completed once your profile link or configured business page is made active and ready for
          use.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Cancellation Requests">
        <p>
          You may request cancellation of a recurring or upcoming subscription renewal by contacting
          our support team before your next billing date. Cancellation prevents future billing
          cycles from being charged while allowing access to continue until the end of the current
          paid period, unless otherwise agreed.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Refund Eligibility">
        <p>
          Refund requests are evaluated fairly based on the nature of the purchase and service
          delivery status at the time the request is received:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>
            <strong>Duplicate or Accidental Double Charges:</strong> Verified duplicate payments
            for the same plan or invoice are eligible for a full refund of the duplicate amount.
          </li>
          <li>
            <strong>Technical Payment Failure:</strong> Amounts debited due to a payment gateway
            error where subscription activation did not occur are eligible for a full refund upon
            verification.
          </li>
          <li>
            <strong>Pre-Activation Cancellation:</strong> If a cancellation request is submitted
            before profile activation or setup work has begun, a refund may be considered after
            deducting any non-recoverable payment gateway charges, if applicable.
          </li>
          <li>
            <strong>Service Not Delivered:</strong> Where a paid plan or setup service cannot be
            provisioned due to an issue on our end within the communicated onboarding timeline, a
            full refund will be issued.
          </li>
          <li>
            <strong>Active &amp; Delivered Subscriptions:</strong> Once a subscription period is
            active or custom setup assistance has been delivered, fees paid for the current billing
            cycle are generally non-refundable.
          </li>
          <li>
            <strong>Review Discretion:</strong> Every refund request is reviewed individually on a
            case-by-case basis to ensure fair resolution.
          </li>
        </ol>
        <p>
          Nothing in this Refund Policy limits any non-waivable statutory rights available to
          customers under applicable Indian consumer protection laws.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Completed Work & Plan-Specific Exceptions">
        <p>
          Certain services, third-party costs, and completed deliverables cannot be reversed once
          fulfilled and are subject to the following exceptions:
        </p>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>
            <strong>Completed Setup Assistance:</strong> One-time setup or profile configuration
            work that has already been completed using customer-submitted materials is
            non-refundable.
          </li>
          <li>
            <strong>Custom Domain &amp; Third-Party Purchases:</strong> Fees paid toward custom
            domain registrations, SSL/DNS provisioning, or external third-party add-ons purchased on
            your behalf are strictly non-refundable once registered.
          </li>
          <li>
            <strong>Partial-Period Usage:</strong> Unused days remaining within an active monthly or
            yearly billing cycle are not automatically prorated upon mid-cycle cancellation unless
            required by law.
          </li>
          <li>
            <strong>Promotional &amp; Discounted Offers:</strong> Plans or add-ons purchased under
            special promotional discounts or bundled offers follow the specific eligibility terms
            communicated with the offer.
          </li>
          <li>
            <strong>Violation of Terms:</strong> Accounts suspended or terminated due to violations
            of our Terms &amp; Conditions or acceptable use standards are not eligible for a refund.
          </li>
          <li>
            <strong>Delayed Material Submission:</strong> Delays caused by incomplete business
            information, missing product details, or unsubmitted media from the customer do not
            constitute non-delivery by Smart Biz Profile.
          </li>
        </ol>
      </LegalSection>

      <LegalSection number={8} title="Refund Request Procedure">
        <p>To submit a cancellation or refund enquiry, please share the following details:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Your registered name and business name.</li>
          <li>Payment date and transaction or invoice reference number.</li>
          <li>The registered email address or WhatsApp number used for the purchase.</li>
          <li>A brief reason for the cancellation or refund request.</li>
        </ul>
      </LegalSection>

      <LegalSection number={9} title="Refund Processing Timelines">
        <p>
          Our support team reviews submitted refund enquiries within{" "}
          <strong>3 to 5 business days</strong>. Once a refund request is approved, the approved
          amount is initiated back to the original payment method and typically settles within{" "}
          <strong>5 to 7 business days</strong>, depending on your bank or payment gateway
          processing timelines.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Contact Details for Refund Enquiries">
        <p>
          Please send billing, cancellation, or refund-related enquiries through our{" "}
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
          page, message us on WhatsApp at <strong>+91 8329410074</strong>, or email{" "}
          <a
            href="mailto:support@smartbizprofile.in"
            className="font-semibold text-[var(--primary)] underline-offset-2 hover:underline"
          >
            support@smartbizprofile.in
          </a>{" "}
          during support hours (10:00 - 20:00).
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
