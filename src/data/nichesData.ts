export type NicheId =
  | "tarot"
  | "healers"
  | "astrologers"
  | "coaches"
  | "wellness"
  | "small-businesses"
  | "product-sellers"
  | "freelancers"
  | "resorts";

export type NicheIconKey =
  | "sparkles"
  | "heart"
  | "briefcase"
  | "compass"
  | "users"
  | "sun"
  | "shield"
  | "star"
  | "rocket"
  | "leaf"
  | "store"
  | "tag"
  | "package"
  | "camera"
  | "clock"
  | "mapPin"
  | "messageCircle"
  | "palette"
  | "globe"
  | "home"
  | "bed"
  | "checkCircle";

export interface NicheShowcaseItem {
  title: string;
  subtitle: string;
  icon: NicheIconKey;
}

export interface NicheJourneyStep {
  title: string;
  icon: NicheIconKey;
}

export interface NicheMockupPackage {
  name: string;
  detail: string;
  price: string;
}

export interface NicheData {
  id: NicheId;
  label: string;
  headline: string;
  description: string;
  showcaseTitle: string;
  showcaseItems: readonly NicheShowcaseItem[];
  journeySteps: readonly NicheJourneyStep[];
  mockup: {
    brandName: string;
    initials: string;
    tagline: string;
    badge: string;
    accentTheme: "violet" | "teal" | "indigo" | "blue" | "emerald" | "sky" | "cyan";
    packages: readonly NicheMockupPackage[];
    proofLine: string;
    ctaLabel: string;
    highlights: readonly string[];
  };
}

export const NICHES_DATA: readonly NicheData[] = [
  {
    id: "tarot",
    label: "Tarot Readers",
    headline: "Turn Your Tarot Expertise Into a Professional Digital Experience.",
    description:
      "Showcase your tarot readings, consultation packages and spiritual guidance services in one beautiful shareable link.",
    showcaseTitle: "Readings & Packages You Can Showcase",
    showcaseItems: [
      { title: "Love & Relationship Reading", subtitle: "Clarity on love & connections", icon: "heart" },
      { title: "Career & Business Reading", subtitle: "Guidance for work decisions", icon: "briefcase" },
      { title: "General Tarot Reading", subtitle: "Full intuitive life spread", icon: "sparkles" },
      { title: "Yes/No Tarot Reading", subtitle: "Fast focused question spread", icon: "checkCircle" },
      { title: "Personal Consultation Packages", subtitle: "1-on-1 call & WhatsApp sessions", icon: "users" },
    ],
    journeySteps: [
      { title: "Discover Tarot Reader", icon: "compass" },
      { title: "Explore Readings", icon: "sparkles" },
      { title: "View Packages", icon: "tag" },
      { title: "Read Testimonials", icon: "star" },
      { title: "WhatsApp Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Mystic Moon Tarot",
      initials: "MM",
      tagline: "Tarot & Intuitive Guidance · Delhi",
      badge: "4.9 ★ Readings",
      accentTheme: "violet",
      packages: [
        { name: "Love & Relationship Reading", detail: "30-min call + voice summary", price: "₹1,199" },
        { name: "Career & Business Reading", detail: "Detailed 6-month spread", price: "₹1,499" },
        { name: "Yes/No Tarot Reading", detail: "Same-day WhatsApp answer", price: "₹499" },
      ],
      proofLine: "“Accurate, gentle guidance that helped me decide clearly.” — Pooja K.",
      ctaLabel: "Book Reading on WhatsApp",
      highlights: ["Love Spreads", "Career Guidance", "Client Reviews"],
    },
  },
  {
    id: "healers",
    label: "Healers",
    headline: "Let More People Discover Your Healing Services.",
    description:
      "Present your healing services, transformation programs and consultation options through one professional business profile.",
    showcaseTitle: "Healing Sessions & Programs to Showcase",
    showcaseItems: [
      { title: "Reiki Healing", subtitle: "Restorative energy sessions", icon: "sun" },
      { title: "Chakra Balancing", subtitle: "Full 7-chakra alignment care", icon: "sparkles" },
      { title: "Distance Healing", subtitle: "Remote guided healing support", icon: "globe" },
      { title: "Energy Healing", subtitle: "Stress & emotional release", icon: "leaf" },
      { title: "Spiritual Transformation Programs", subtitle: "Multi-week guided journeys", icon: "heart" },
    ],
    journeySteps: [
      { title: "Discover Healer", icon: "compass" },
      { title: "Explore Healing Services", icon: "leaf" },
      { title: "View Packages", icon: "tag" },
      { title: "Build Trust", icon: "shield" },
      { title: "WhatsApp Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Prana Soul Healing",
      initials: "PS",
      tagline: "Reiki & Chakra Specialist · Bengaluru",
      badge: "Certified Healer",
      accentTheme: "teal",
      packages: [
        { name: "Reiki Healing Session", detail: "45-min calming alignment", price: "₹1,800" },
        { name: "Chakra Balancing Pack", detail: "3-session holistic reset", price: "₹4,500" },
        { name: "Distance Healing", detail: "Guided remote energy session", price: "₹1,200" },
      ],
      proofLine: "“I felt lighter and deeply peaceful after just two sessions.” — Neha S.",
      ctaLabel: "Enquire for Session on WhatsApp",
      highlights: ["Reiki Sessions", "Remote Healing", "Client Stories"],
    },
  },
  {
    id: "astrologers",
    label: "Astrologers",
    headline: "Make Your Astrology Services Easy to Discover and Book.",
    description:
      "Showcase your astrology expertise, consultation services and personalized guidance packages.",
    showcaseTitle: "Consultations & Readings to Showcase",
    showcaseItems: [
      { title: "Birth Chart Reading", subtitle: "Detailed Janam Patrika review", icon: "sun" },
      { title: "Kundli Consultation", subtitle: "Life, timing & remedy insights", icon: "compass" },
      { title: "Career Astrology", subtitle: "Job, business & growth periods", icon: "briefcase" },
      { title: "Relationship Astrology", subtitle: "Compatibility & partner match", icon: "heart" },
      { title: "Numerology Consultation", subtitle: "Name & life path analysis", icon: "sparkles" },
    ],
    journeySteps: [
      { title: "Discover Astrologer", icon: "compass" },
      { title: "Explore Services", icon: "sun" },
      { title: "View Consultation Packages", icon: "tag" },
      { title: "Read Reviews", icon: "star" },
      { title: "WhatsApp Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Acharya Vedant Jyotish",
      initials: "AV",
      tagline: "Vedic Astrology & Kundli · Jaipur",
      badge: "12+ Yrs Exp",
      accentTheme: "indigo",
      packages: [
        { name: "Birth Chart Reading", detail: "Complete planetary report + call", price: "₹2,100" },
        { name: "Kundli Consultation", detail: "45-min live video/audio session", price: "₹2,500" },
        { name: "Numerology Audit", detail: "Name & career number guide", price: "₹1,500" },
      ],
      proofLine: "“Clear remedies and practical timelines without confusion.” — Vikram R.",
      ctaLabel: "Book Kundli Call on WhatsApp",
      highlights: ["Birth Charts", "Kundli Match", "Verified Reviews"],
    },
  },
  {
    id: "coaches",
    label: "Coaches",
    headline: "Turn Your Coaching Expertise Into a Digital Client Magnet.",
    description:
      "Showcase your coaching programs, transformation journeys, consultation packages and client success stories.",
    showcaseTitle: "Programs & Offers You Can Showcase",
    showcaseItems: [
      { title: "1-to-1 Coaching", subtitle: "Tailored private mentorship", icon: "users" },
      { title: "Group Coaching", subtitle: "Weekly cohort accountability", icon: "sparkles" },
      { title: "Online Coaching Programs", subtitle: "Structured milestone tracks", icon: "globe" },
      { title: "Personal Transformation Programs", subtitle: "90-day clarity & growth plans", icon: "rocket" },
      { title: "Discovery Calls", subtitle: "Quick intro call booking link", icon: "messageCircle" },
    ],
    journeySteps: [
      { title: "Discover Coach", icon: "compass" },
      { title: "Explore Programs", icon: "rocket" },
      { title: "View Results", icon: "star" },
      { title: "Read Testimonials", icon: "shield" },
      { title: "Book Consultation", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Elevate With Kabir",
      initials: "EK",
      tagline: "Executive & Mindset Coach · Mumbai",
      badge: "60+ Mentored",
      accentTheme: "blue",
      packages: [
        { name: "1-to-1 Coaching", detail: "4 weekly strategy & mindset calls", price: "₹6,500" },
        { name: "90-Day Transformation", detail: "Full roadmap + WhatsApp check-ins", price: "₹14,999" },
        { name: "Discovery Call", detail: "15-min goal assessment intro", price: "Free Intro" },
      ],
      proofLine: "“Switched into a leadership role within 8 weeks of starting.” — Rohan M.",
      ctaLabel: "Book Discovery Call on WhatsApp",
      highlights: ["1-on-1 Plans", "Case Results", "Direct Booking"],
    },
  },
  {
    id: "wellness",
    label: "Wellness Professionals",
    headline: "Showcase Your Wellness Services in One Beautiful Link.",
    description:
      "Help potential clients explore your wellness programs, services, sessions and packages.",
    showcaseTitle: "Wellness Offerings You Can Showcase",
    showcaseItems: [
      { title: "Yoga Sessions", subtitle: "Morning & evening guided batches", icon: "sun" },
      { title: "Meditation Programs", subtitle: "Breathwork & calm routines", icon: "leaf" },
      { title: "Nutrition Consultation", subtitle: "Personalized meal & habit plan", icon: "heart" },
      { title: "Weight Management Programs", subtitle: "Sustainable weekly coaching", icon: "rocket" },
      { title: "Wellness Coaching", subtitle: "Mind-body lifestyle support", icon: "users" },
    ],
    journeySteps: [
      { title: "Discover Professional", icon: "compass" },
      { title: "Explore Wellness Services", icon: "leaf" },
      { title: "View Programs", icon: "tag" },
      { title: "Read Reviews", icon: "star" },
      { title: "Contact on WhatsApp", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Prakriti Wellness Studio",
      initials: "PW",
      tagline: "Yoga, Nutrition & Mindfulness · Pune",
      badge: "4.9 ★ Studio",
      accentTheme: "emerald",
      packages: [
        { name: "Live Yoga Sessions", detail: "Mon–Fri online or studio batch", price: "₹2,400/mo" },
        { name: "Nutrition Consultation", detail: "Custom plan + 14-day follow-up", price: "₹1,600" },
        { name: "Weight Balance Program", detail: "8-week guided wellness track", price: "₹5,999" },
      ],
      proofLine: "“Consistent energy and zero crash diets—truly life changing.” — Divya T.",
      ctaLabel: "Join Wellness Plan on WhatsApp",
      highlights: ["Yoga Batches", "Diet Plans", "Client Results"],
    },
  },
  {
    id: "small-businesses",
    label: "Small Businesses",
    headline: "Give Your Local Business a Professional Online Presence.",
    description:
      "Showcase your business information, services, products, working hours and customer reviews without building an expensive traditional website.",
    showcaseTitle: "Local Business Features to Showcase",
    showcaseItems: [
      { title: "Business Profile", subtitle: "Clear brand story & overview", icon: "store" },
      { title: "Services & Pricing", subtitle: "Transparent rates up front", icon: "tag" },
      { title: "Product Catalogue", subtitle: "Organized items & categories", icon: "package" },
      { title: "Photo Gallery", subtitle: "Showcase work & shop interior", icon: "camera" },
      { title: "Business Hours and Location", subtitle: "Address, timings & map pin", icon: "clock" },
      { title: "WhatsApp Enquiries", subtitle: "Instant customer messages", icon: "messageCircle" },
    ],
    journeySteps: [
      { title: "Discover Business", icon: "compass" },
      { title: "Explore Profile", icon: "store" },
      { title: "View Services", icon: "tag" },
      { title: "Check Reviews", icon: "star" },
      { title: "WhatsApp Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Aura Craft & Decor",
      initials: "AC",
      tagline: "Custom Gifts & Studio · Ahmedabad",
      badge: "Open · 10–8 PM",
      accentTheme: "sky",
      packages: [
        { name: "Festive Gift Hampers", detail: "Curated local artisan boxes", price: "₹999+" },
        { name: "Custom Home Decor", detail: "Made-to-order wall & table art", price: "₹1,850" },
        { name: "Store Visit & Pickup", detail: "Navrangpura · Mon–Sat", price: "Location Pin" },
      ],
      proofLine: "“Found timings, photos, and ordered our gift boxes immediately.” — Sneha P.",
      ctaLabel: "Message Store on WhatsApp",
      highlights: ["Shop Hours", "Catalog + Gallery", "Location Pin"],
    },
  },
  {
    id: "product-sellers",
    label: "Product Sellers",
    headline: "Turn Your Product Collection Into a Digital Storefront.",
    description:
      "Display your products, descriptions, prices and categories in a convenient mobile-friendly catalogue.",
    showcaseTitle: "Storefront Features to Showcase",
    showcaseItems: [
      { title: "Product Images", subtitle: "Crisp photos for every item", icon: "camera" },
      { title: "Product Names", subtitle: "Scannable titles & variants", icon: "tag" },
      { title: "Descriptions", subtitle: "Key specs, sizing & details", icon: "checkCircle" },
      { title: "Prices", subtitle: "Clear pricing without DMs", icon: "sparkles" },
      { title: "Product Categories", subtitle: "Easy browsing by collection", icon: "package" },
      { title: "WhatsApp Ordering", subtitle: "Direct order messages to you", icon: "messageCircle" },
    ],
    journeySteps: [
      { title: "Discover Store", icon: "compass" },
      { title: "Browse Products", icon: "store" },
      { title: "Explore Details", icon: "package" },
      { title: "Select Product", icon: "checkCircle" },
      { title: "WhatsApp Order", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Veda Botanicals Store",
      initials: "VB",
      tagline: "Skincare & Herbal Combos · Kochi",
      badge: "WhatsApp Store",
      accentTheme: "cyan",
      packages: [
        { name: "Saffron Glow Serum", detail: "30ml · Category: Skincare", price: "₹899" },
        { name: "Herbal Ritual Gift Box", detail: "4-piece combo · Bestseller", price: "₹1,499" },
        { name: "Rose Clay Face Pack", detail: "100g · Category: Masks", price: "₹649" },
      ],
      proofLine: "Customers browse categories & send product enquiries directly on WhatsApp.",
      ctaLabel: "Order Product on WhatsApp",
      highlights: ["Categories", "Product Cards", "WhatsApp Order"],
    },
  },
  {
    id: "freelancers",
    label: "Freelancers & Consultants",
    headline: "Showcase Your Expertise. Build Trust. Get More Enquiries.",
    description:
      "Create a professional digital presence that displays your services, portfolio, experience and client feedback.",
    showcaseTitle: "Expertise & Portfolio Elements to Showcase",
    showcaseItems: [
      { title: "Consulting Services", subtitle: "Strategy calls & retainers", icon: "briefcase" },
      { title: "Graphic Design", subtitle: "Branding, logos & social kits", icon: "palette" },
      { title: "Digital Marketing", subtitle: "Funnels, ads & growth audits", icon: "rocket" },
      { title: "Web Development", subtitle: "Landing pages & business sites", icon: "globe" },
      { title: "Professional Services", subtitle: "Portfolio & client testimonials", icon: "shield" },
    ],
    journeySteps: [
      { title: "Discover Expert", icon: "compass" },
      { title: "Explore Portfolio", icon: "camera" },
      { title: "View Services", icon: "briefcase" },
      { title: "Check Testimonials", icon: "star" },
      { title: "WhatsApp Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Meera Nair Studio",
      initials: "MN",
      tagline: "Brand Designer & Consultant · Remote",
      badge: "5.0 ★ Rated",
      accentTheme: "blue",
      packages: [
        { name: "Brand Identity Suite", detail: "Logo, palette & brand guidelines", price: "₹12,000" },
        { name: "1-on-1 Growth Audit", detail: "60-min conversion review", price: "₹3,500" },
        { name: "Portfolio Gallery", detail: "18 recent client case studies", price: "View Work" },
      ],
      proofLine: "“Sent one link on LinkedIn—closed the project in 48 hours.” — Arjun D.",
      ctaLabel: "Discuss Project on WhatsApp",
      highlights: ["Case Gallery", "Service Rates", "Client Proof"],
    },
  },
  {
    id: "resorts",
    label: "Resorts & Local Businesses",
    headline: "Turn Property Visitors Into Direct Booking Enquiries.",
    description:
      "Showcase your rooms, property photographs, facilities, location and accommodation options through one professional link.",
    showcaseTitle: "Property & Stay Highlights to Showcase",
    showcaseItems: [
      { title: "Room Photographs", subtitle: "Crisp gallery of every stay", icon: "camera" },
      { title: "Room Types and Pricing", subtitle: "Villas, suites & nightly rates", icon: "bed" },
      { title: "Property Gallery", subtitle: "Pool, dining & scenic views", icon: "home" },
      { title: "Amenities and Facilities", subtitle: "Wi-Fi, breakfast, pool & parking", icon: "checkCircle" },
      { title: "Location and Contact Details", subtitle: "Directions & reception phone", icon: "mapPin" },
      { title: "WhatsApp Booking Enquiries", subtitle: "Direct date availability chat", icon: "messageCircle" },
    ],
    journeySteps: [
      { title: "Discover Property", icon: "compass" },
      { title: "Explore Rooms", icon: "bed" },
      { title: "View Facilities", icon: "home" },
      { title: "Check Location", icon: "mapPin" },
      { title: "WhatsApp Booking Enquiry", icon: "messageCircle" },
    ],
    mockup: {
      brandName: "Whispering Pines Retreat",
      initials: "WP",
      tagline: "Boutique Stay & Café · Coorg",
      badge: "Direct Booking",
      accentTheme: "emerald",
      packages: [
        { name: "Deluxe Forest Villa", detail: "Breakfast included · Mountain view", price: "₹5,400/nt" },
        { name: "Garden Courtyard Room", detail: "Queen bed · Patio · Wi-Fi", price: "₹3,800/nt" },
        { name: "Amenities & Location", detail: "Pool · Bonfire · Map Directions", price: "Coorg Pin" },
      ],
      proofLine: "“Guests view room photos & ask available dates on WhatsApp directly.”",
      ctaLabel: "Check Availability on WhatsApp",
      highlights: ["Room Gallery", "Amenities", "Direct Enquiry"],
    },
  },
] as const;
