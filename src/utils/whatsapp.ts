export interface LeadFormValues {
  name: string;
  businessType: string;
  whatsappNumber: string;
}

export interface LeadValidationErrors {
  name?: string;
  businessType?: string;
  whatsappNumber?: string;
}

export const WHATSAPP_TARGET_PHONE = "919845881387";

export function validateLeadForm(values: LeadFormValues): LeadValidationErrors {
  const errors: LeadValidationErrors = {};
  const trimmedName = values.name.trim();
  const trimmedType = values.businessType.trim();
  const digits = values.whatsappNumber.replace(/\D/g, "");

  if (trimmedName.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!trimmedType) {
    errors.businessType = "Please choose your business type.";
  }

  if (digits.length < 8 || digits.length > 15) {
    errors.whatsappNumber = "Please enter a valid WhatsApp number with country or area code.";
  }

  return errors;
}

export function buildWhatsAppMessage(values: LeadFormValues): string {
  const name = values.name.trim();
  const businessType = values.businessType.trim();
  const whatsappNumber = values.whatsappNumber.trim();

  return `Hi! I'm ${name}. I run a ${businessType} business and I want to build my Smart Biz Profile. My WhatsApp number is ${whatsappNumber}. Please share the next steps.`;
}

export function buildWhatsAppUrl(values: LeadFormValues): string {
  const message = buildWhatsAppMessage(values);
  return `https://wa.me/${WHATSAPP_TARGET_PHONE}?text=${encodeURIComponent(message)}`;
}
