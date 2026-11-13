import { useState, type FormEvent } from "react";
import {
  Briefcase,
  Check,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  Headset,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Wrench,
} from "lucide-react";
import { useGoogleSheets } from "../../context/GoogleSheetsContext";
import {
  CONTACT_SUBJECT_OPTIONS,
  buildContactMessage,
  buildContactWhatsAppUrl,
  validateContactForm,
  type ContactFormErrors,
} from "../../utils/contactForm";
import type { AppRoute } from "../../utils/routing";
import { triggerWhatsAppRedirect } from "../../utils/whatsapp";
import { LegalPageLayout } from "../LegalPageLayout";
import { Button } from "../ui/Button";

interface ContactUsPageProps {
  onNavigate: (route: AppRoute) => void;
}

const ENQUIRY_CHANNELS = [
  {
    title: "Customer Support",
    description: "Profile setup help, content updates, and general platform guidance.",
    icon: Headset,
    subject: "Customer Support",
  },
  {
    title: "Sales Enquiries",
    description: "Learn how Smart Biz Profile fits your services, products, or business.",
    icon: Briefcase,
    subject: "Sales Enquiries",
  },
  {
    title: "Technical Assistance",
    description: "Help with links, gallery uploads, PWA access, or display questions.",
    icon: Wrench,
    subject: "Technical Assistance",
  },
  {
    title: "Billing & Subscription Enquiries",
    description: "Questions about invoices, plan renewals, cancellations, or refunds.",
    icon: CreditCard,
    subject: "Billing & Subscription Enquiries",
  },
  {
    title: "General Questions",
    description: "Anything else you would like to ask before getting started.",
    icon: HelpCircle,
    subject: "General Questions",
  },
] as const;

export function ContactUsPage({ onNavigate }: ContactUsPageProps) {
  const { syncFormSubmission } = useGoogleSheets();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<string>(CONTACT_SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = { name, email, phone, subject, message };
    const nextErrors = validateContactForm(payload);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const customMessage = buildContactMessage(payload);
    const whatsappUrl = buildContactWhatsAppUrl(payload);

    setIsSubmitting(true);
    await syncFormSubmission({
      formType: "Contact Us Enquiry",
      name: payload.name,
      email: payload.email,
      categoryOrSubject: payload.subject,
      phone: payload.phone,
      notesOrMessage: payload.message,
      whatsappMessage: customMessage,
    });
    setIsSubmitting(false);

    setSubmittedUrl(whatsappUrl);
    setSubmittedMessage(customMessage);
    triggerWhatsAppRedirect(whatsappUrl);
  };

  const handleCopy = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleReset = () => {
    setSubmittedUrl(null);
    setSubmittedMessage("");
    setCopied(false);
    setErrors({});
  };

  const selectChannel = (nextSubject: string) => {
    setSubject(nextSubject);
    if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
    const formEl = document.getElementById("contact-form-section");
    formEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <LegalPageLayout
      eyebrow="Contact & Support"
      title="Contact Us"
      subtitle="Reach our team for customer support, sales questions, technical assistance, billing enquiries, or general help."
      lastUpdatedNote="Support Hours: 10:00 - 20:00 · Email: support@smartbizprofile.in"
      hideSupportFooter
      onNavigate={onNavigate}
    >
      {/* 5 Enquiry Category Cards */}
      <div>
        <h2 className="font-display text-lg font-bold text-[var(--foreground)] sm:text-xl">
          How can we help you today?
        </h2>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Select an enquiry category below to pre-fill the contact form subject.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ENQUIRY_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            const isSelected = subject === channel.subject;
            return (
              <button
                key={channel.title}
                type="button"
                onClick={() => selectChannel(channel.subject)}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[var(--primary)] bg-[oklch(96.5%_0.02_252)] shadow-xs"
                    : "border-[var(--border)] bg-[oklch(99%_0.005_255)] hover:border-[var(--primary)]/40 hover:bg-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isSelected
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--primary)]/10 text-[var(--primary)]"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="mt-3 font-display text-sm font-bold text-[var(--foreground)]">
                  {channel.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)]">
                  {channel.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form + Direct Contact Info Split */}
      <div
        id="contact-form-section"
        className="mt-8 grid gap-8 border-t border-[var(--border)] pt-8 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div>
          <h2 className="font-display text-lg font-bold text-[var(--foreground)] sm:text-xl">
            Send us a message
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-[var(--muted-foreground)] sm:text-sm">
            Fill out the form below to prepare your enquiry and send it directly to our team on
            WhatsApp.
          </p>

          {!submittedUrl ? (
            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-[var(--foreground)]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Nisha Sharma"
                    className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-[var(--foreground)]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="you@business.com"
                    className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold text-[var(--foreground)]"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="e.g. +91 98765 43210"
                    className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {errors.phone && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[var(--foreground)]"
                  >
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[var(--input)] bg-white px-3.5 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  >
                    {CONTACT_SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                      {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-[var(--foreground)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  placeholder="Tell us how we can assist you..."
                  className="mt-1.5 w-full rounded-xl border border-[var(--input)] bg-white p-3.5 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/65 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs font-medium text-[var(--destructive)]">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {isSubmitting ? "Opening WhatsApp..." : "Submit Enquiry"}
              </Button>
            </form>
          ) : (
            <div className="mt-5 space-y-4 rounded-2xl border border-[var(--border)] bg-[oklch(97.5%_0.015_252)] p-5">
              <div>
                <p className="font-display text-sm font-bold text-[var(--foreground)]">
                  Your enquiry message is ready to send
                </p>
                <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Click below to open WhatsApp directly with your pre-filled message, or copy the
                  enquiry summary.
                </p>
              </div>

              <pre className="whitespace-pre-wrap rounded-xl border border-[var(--border)] bg-white p-3.5 font-sans text-xs leading-relaxed text-[var(--foreground)]">
                {submittedMessage}
              </pre>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--success)] px-5 text-xs font-bold text-[var(--success-foreground)] shadow-xs transition-all hover:brightness-95"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Send via WhatsApp
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-11 items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-white px-4 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[var(--success)]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy Message
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-11 items-center px-3 text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
                >
                  Edit Enquiry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Direct Contact Details Card */}
        <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[oklch(98%_0.012_252)] p-5">
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">
            Direct Contact Details
          </h3>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#15803D]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold text-[var(--foreground)]">WhatsApp Support</p>
              <a
                href="https://wa.me/918329410074"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-0.5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                +91 8329410074
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold text-[var(--foreground)]">Business Email</p>
              <a
                href="mailto:support@smartbizprofile.in"
                className="mt-0.5 inline-block text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                support@smartbizprofile.in
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <Clock className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold text-[var(--foreground)]">Support Hours</p>
              <p className="mt-0.5 text-xs font-medium text-[var(--muted-foreground)]">
                10:00 - 20:00
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold text-[var(--foreground)]">Registered Office</p>
              <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted-foreground)]">
                Pulamol, Sao Jose De Areal, Margao, Goa - 403709
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalPageLayout>
  );
}
