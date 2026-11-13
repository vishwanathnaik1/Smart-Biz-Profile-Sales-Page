export const CONTACT_WHATSAPP_PHONE = "918329410074";

export const CONTACT_SUBJECT_OPTIONS = [
  "Customer Support",
  "Sales Enquiries",
  "Technical Assistance",
  "Billing & Subscription Enquiries",
  "General Questions",
] as const;

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const phoneDigits = values.phone.replace(/\D/g, "");
  const trimmedSubject = values.subject.trim();
  const trimmedMessage = values.message.trim();

  if (trimmedName.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }

  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = "Please enter a valid phone number with country or area code.";
  }

  if (!trimmedSubject) {
    errors.subject = "Please select or enter a subject.";
  }

  if (trimmedMessage.length < 10) {
    errors.message = "Please enter a brief message (at least 10 characters).";
  }

  return errors;
}

export function buildContactMessage(values: ContactFormValues): string {
  return [
    `Smart Biz Profile Enquiry — ${values.subject.trim()}`,
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Message: ${values.message.trim()}`,
  ].join("\n");
}

export function buildContactWhatsAppUrl(values: ContactFormValues): string {
  const message = buildContactMessage(values);
  return `https://wa.me/${CONTACT_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
