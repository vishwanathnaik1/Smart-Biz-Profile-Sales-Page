export const BUSINESS_TYPES = [
  "Tarot Readers",
  "Healers",
  "Astrologers",
  "Coaches",
  "Wellness Professionals",
  "Small Businesses",
  "Product Sellers",
  "Freelancers & Consultants",
  "Resorts & Local Businesses",
  "Other",
] as const;

export const CLIENT_QUESTIONS = [
  "“Aapka website hai?”",
  "“Services kaha dekh sakte hain?”",
  "“Aapko contact kaise karein?”",
  "“Payment or booking kaise karun?”",
] as const;

export const FEATURES = [
  {
    id: "profile",
    title: "Your Business Profile",
    description: "Tell people who you are and what you do.",
  },
  {
    id: "services",
    title: "Services & Packages",
    description: "Showcase services clearly with descriptions and pricing.",
  },
  {
    id: "store",
    title: "Products / Store",
    description: "Display products in an easy-to-browse online store.",
  },
  {
    id: "whatsapp",
    title: "WhatsApp Integration",
    description: "Let customers connect with you directly.",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Build trust with real customer experiences.",
  },
  {
    id: "gallery",
    title: "Photo & Video Gallery",
    description: "Show your work, results and brand professionally.",
  },
  {
    id: "info",
    title: "Business Information",
    description: "Keep hours, location and contact details together.",
  },
  {
    id: "link",
    title: "One Shareable Link",
    description: "Share it on Instagram, WhatsApp, Facebook and cards.",
  },
] as const;

export const AUDIENCE_CATEGORIES = [
  "Tarot Readers",
  "Healers",
  "Astrologers",
  "Coaches",
  "Wellness Professionals",
  "Small Businesses",
  "Product Sellers",
  "Freelancers & Consultants",
  "Resorts & Local Businesses",
] as const;

export const STOREFRONT_HIGHLIGHTS = [
  "Product images",
  "Product names",
  "Descriptions",
  "Prices",
  "Product categories",
  "WhatsApp ordering",
] as const;

export const TRUST_BADGES = [
  { id: "testimonials", label: "Testimonials" },
  { id: "gallery", label: "Gallery" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "feedback", label: "Customer feedback" },
  { id: "social", label: "Social links" },
] as const;

export const COMPARISON_ROWS = [
  { traditional: "Expensive website", smart: "Affordable digital presence" },
  { traditional: "Developer required", smart: "No coding required" },
  { traditional: "Multiple links", smart: "One powerful link" },
  { traditional: "Complicated setup", smart: "Easy setup" },
  { traditional: "Separate product pages", smart: "Profile + Store" },
  { traditional: "Information scattered", smart: "Everything organized" },
  { traditional: "Difficult to update", smart: "Easy to manage" },
] as const;

export const WHATS_INCLUDED = [
  "Professional Smart Business Profile",
  "Services / Packages Section",
  "Product / Store Section",
  "WhatsApp Contact",
  "Business Information",
  "Testimonials",
  "Gallery",
  "Social Media Links",
  "Shareable Business URL",
  "Mobile-Friendly Design",
] as const;

export const FAQ_ITEMS = [
  {
    id: "technical",
    question: "Do I need technical knowledge?",
    answer: "No. Smart Biz Profile is designed to be simple and easy to use without coding.",
  },
  {
    id: "instagram",
    question: "Can I use it with Instagram?",
    answer:
      "Yes. Add your Smart Biz Profile link to your Instagram bio and direct your audience to one central destination.",
  },
  {
    id: "services",
    question: "Can I showcase my services?",
    answer: "Yes. You can create sections for your services, packages and other business information.",
  },
  {
    id: "products",
    question: "Can I showcase products?",
    answer:
      "Yes. Use the store functionality to showcase products and let customers connect through WhatsApp.",
  },
  {
    id: "whatsapp",
    question: "Can I use WhatsApp?",
    answer:
      "Yes. Your profile makes it easy for visitors to connect with your business through WhatsApp.",
  },
  {
    id: "website",
    question: "Do I need a traditional website?",
    answer:
      "No. Smart Biz Profile gives you a professional online business presence without building a traditional website from scratch.",
  },
] as const;

export const HERO_PREVIEW_TABS = {
  Services: [
    { label: "Signature Package", action: "View →" },
    { label: "1-on-1 Consultation", action: "Book →" },
  ],
  Store: [
    { label: "Signature Package", action: "View →" },
    { label: "Browse Products", action: "Shop →" },
  ],
  Reviews: [
    { label: "4.9 ★ Client Rating", action: "Read →" },
    { label: "48+ Verified Reviews", action: "View →" },
  ],
} as const;
