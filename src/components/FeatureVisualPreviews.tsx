import {
  CalendarCheck,
  Check,
  Clock,
  Copy,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Star,
} from "lucide-react";

export type FeatureId =
  | "profile"
  | "services"
  | "store"
  | "booking"
  | "whatsapp"
  | "testimonials"
  | "gallery"
  | "info"
  | "link";

function ProfilePreview() {
  return (
    <div className="w-[220px] rounded-[22px] border border-[oklch(88%_0.03_250)] bg-white p-2.5 shadow-[0_14px_30px_-14px_oklch(45%_0.12_255/0.28)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      {/* Mini cover banner */}
      <div className="gradient-primary-cyan relative h-11 rounded-xl px-2.5 pt-2">
        <div className="mx-auto h-1 w-8 rounded-full bg-white/40" />
      </div>

      {/* Overlapping business avatar */}
      <div className="relative z-10 -mt-5 px-2">
        <div className="flex items-end justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[oklch(94%_0.04_252)] font-display text-xs font-extrabold text-[var(--primary)] shadow-xs">
            NS
          </div>
          <span className="rounded-md bg-[oklch(94%_0.06_151)] px-1.5 py-0.5 text-[9px] font-bold text-[oklch(40%_0.15_151)]">
            Verified
          </span>
        </div>

        <p className="mt-2 font-display text-xs font-bold text-[var(--foreground)]">
          Nisha&apos;s Creative Studio
        </p>
        <p className="mt-0.5 text-[10px] leading-snug text-[var(--muted-foreground)]">
          Bridal styling, consultations &amp; custom curated kits.
        </p>

        {/* Contact details strip */}
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          <div className="flex items-center justify-center gap-1 rounded-lg bg-[oklch(96%_0.02_252)] py-1.5 text-[9px] font-semibold text-[var(--primary)]">
            <Phone className="h-2.5 w-2.5" aria-hidden="true" />
            <span>Call</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-lg bg-[oklch(94%_0.06_151)] py-1.5 text-[9px] font-semibold text-[oklch(38%_0.14_151)]">
            <MessageCircle className="h-2.5 w-2.5" aria-hidden="true" />
            <span>Chat</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-lg bg-[oklch(96%_0.02_252)] py-1.5 text-[9px] font-semibold text-[var(--primary)]">
            <MapPin className="h-2.5 w-2.5" aria-hidden="true" />
            <span>Visit</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesPreview() {
  return (
    <div className="w-full max-w-[300px] space-y-2 transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      {/* Service card 1 */}
      <div className="flex items-center gap-3 rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-2.5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
          <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
            <rect x="6" y="7" width="20" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
            <path d="M11 13H21M11 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xs font-bold text-[var(--foreground)]">
            Signature Makeover
          </p>
          <p className="truncate text-[10px] text-[var(--muted-foreground)]">
            Trial + full venue styling
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-[oklch(95%_0.03_252)] px-2 py-1 text-[11px] font-bold text-[var(--primary)] transition-colors duration-200 group-hover:bg-[var(--primary)] group-hover:text-white motion-reduce:transition-none">
          ₹12,500
        </span>
      </div>

      {/* Service card 2 */}
      <div className="flex items-center gap-3 rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-2.5 shadow-xs">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
          <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden="true">
            <circle cx="16" cy="13" r="4.5" stroke="currentColor" strokeWidth="2" />
            <path d="M9 24C10.5 20.5 13 19 16 19C19 19 21.5 20.5 23 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xs font-bold text-[var(--foreground)]">
            1-on-1 Consultation
          </p>
          <p className="truncate text-[10px] text-[var(--muted-foreground)]">
            60-min personal guidance
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-[oklch(95%_0.03_252)] px-2 py-1 text-[11px] font-bold text-[var(--primary)]">
          ₹1,999
        </span>
      </div>
    </div>
  );
}

function StorePreview() {
  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-3 shadow-[0_14px_30px_-16px_oklch(45%_0.12_255/0.22)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-[var(--muted-foreground)]">
        <span className="text-[var(--foreground)]">Featured Store</span>
        <span>2 items</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {/* Product 1 */}
        <div className="rounded-xl border border-[oklch(93%_0.015_250)] bg-[oklch(98.5%_0.008_250)] p-2">
          <div className="flex h-14 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-100/80">
            <svg viewBox="0 0 44 36" className="h-9 w-11" fill="none" aria-hidden="true">
              <rect x="15" y="7" width="14" height="5" rx="2" fill="#2563EB" />
              <rect x="12" y="12" width="20" height="19" rx="5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.8" />
              <circle cx="22" cy="21.5" r="4" fill="#DBEAFE" />
            </svg>
          </div>
          <p className="mt-1.5 truncate text-[11px] font-bold text-[var(--foreground)]">Glow Care Kit</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--primary)]">₹1,499</span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-[#22C55E] px-1.5 py-0.5 text-[9px] font-bold text-white">
              <MessageCircle className="h-2.5 w-2.5" aria-hidden="true" />
              Order
            </span>
          </div>
        </div>

        {/* Product 2 */}
        <div className="rounded-xl border border-[oklch(93%_0.015_250)] bg-[oklch(98.5%_0.008_250)] p-2">
          <div className="flex h-14 items-center justify-center rounded-lg bg-gradient-to-br from-sky-50 to-indigo-100/80">
            <svg viewBox="0 0 44 36" className="h-9 w-11" fill="none" aria-hidden="true">
              <rect x="11" y="13" width="22" height="18" rx="4" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="1.8" />
              <path d="M10 13H34V17H10V13Z" fill="#0EA5E9" />
              <path d="M22 13V31" stroke="#BAE6FD" strokeWidth="2" />
            </svg>
          </div>
          <p className="mt-1.5 truncate text-[11px] font-bold text-[var(--foreground)]">Aroma Combo</p>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[var(--primary)]">₹899</span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-[#22C55E] px-1.5 py-0.5 text-[9px] font-bold text-white">
              <MessageCircle className="h-2.5 w-2.5" aria-hidden="true" />
              Order
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppointmentBookingPreview() {
  const days = [
    { day: "Thu", date: "14", active: false },
    { day: "Fri", date: "15", active: true },
    { day: "Sat", date: "16", active: false },
    { day: "Mon", date: "18", active: false },
  ];
  const slots = [
    { label: "10:30 AM", active: false },
    { label: "02:00 PM", active: true },
    { label: "05:30 PM", active: false },
  ];

  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-3 shadow-[0_14px_30px_-16px_oklch(45%_0.12_255/0.22)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      <div className="flex items-center justify-between">
        <span className="font-display text-[11px] font-bold text-[var(--foreground)]">
          Book Consultation
        </span>
        <span className="rounded-md bg-[oklch(95%_0.03_252)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--primary)]">
          30 min
        </span>
      </div>

      {/* Mini date strip */}
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {days.map((item) => (
          <div
            key={item.date}
            className={`rounded-lg py-1 text-center ${
              item.active
                ? "bg-[var(--primary)] text-white shadow-xs"
                : "border border-[oklch(93%_0.015_250)] bg-[oklch(98.5%_0.008_250)] text-[var(--foreground)]"
            }`}
          >
            <p className={`text-[8px] font-medium ${item.active ? "text-white/80" : "text-[var(--muted-foreground)]"}`}>
              {item.day}
            </p>
            <p className="text-[11px] font-bold leading-tight">{item.date}</p>
          </div>
        ))}
      </div>

      {/* Time slots */}
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {slots.map((slot) => (
          <div
            key={slot.label}
            className={`rounded-lg py-1 text-center text-[9px] font-semibold ${
              slot.active
                ? "border border-[var(--primary)]/40 bg-[var(--primary)]/10 font-bold text-[var(--primary)]"
                : "border border-[oklch(93%_0.015_250)] bg-white text-[var(--muted-foreground)]"
            }`}
          >
            {slot.label}
          </div>
        ))}
      </div>

      {/* Selected slot confirmation bar */}
      <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[oklch(96.5%_0.018_250)] px-2.5 py-1.5">
        <span className="text-[10px] font-semibold text-[var(--foreground)]">
          Fri 15 · 2:00 PM
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--primary)] px-2 py-0.5 text-[9px] font-bold text-white">
          <CalendarCheck className="h-2.5 w-2.5" aria-hidden="true" />
          Confirm
        </span>
      </div>
    </div>
  );
}

function WhatsAppPreview() {
  return (
    <div className="w-[248px] overflow-hidden rounded-[22px] border border-[oklch(88%_0.03_250)] bg-white shadow-[0_14px_30px_-14px_oklch(45%_0.12_255/0.28)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      {/* WhatsApp header bar */}
      <div className="flex items-center justify-between bg-[#075E54] px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#25D366] text-[10px] font-bold text-white">
            NS
          </div>
          <div>
            <p className="text-[11px] font-bold leading-none">Nisha&apos;s Studio</p>
            <p className="mt-0.5 text-[9px] text-emerald-100 leading-none">Usually replies fast</p>
          </div>
        </div>
        <Phone className="h-3.5 w-3.5 text-white/85" aria-hidden="true" />
      </div>

      {/* Chat bubbles */}
      <div className="space-y-2 bg-[#EFEAE2] p-3 text-[10px] leading-snug">
        <div className="max-w-[85%] rounded-xl rounded-tl-xs bg-white px-2.5 py-1.5 text-slate-800 shadow-2xs">
          Hi! Is the Bridal Package available next month?
        </div>
        <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-xs bg-[#D9FDD3] px-2.5 py-1.5 text-slate-900 shadow-2xs">
          Yes! Sharing open dates &amp; package details now.
          <span className="ml-1 inline-block text-[9px] font-bold text-[#0284C7]">✓✓</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialsPreview() {
  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-4 shadow-[0_14px_30px_-16px_oklch(45%_0.12_255/0.22)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
          ))}
        </div>
        <span className="text-[10px] font-semibold text-emerald-700">Verified Client</span>
      </div>

      <p className="mt-2.5 text-[11px] leading-relaxed text-[var(--foreground)]">
        &ldquo;Everything was listed clearly on her profile. I checked services, reviews, and booked on WhatsApp in minutes.&rdquo;
      </p>

      <div className="mt-3 flex items-center gap-2.5 border-t border-[oklch(94%_0.015_250)] pt-2.5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-[11px] font-bold text-white">
          AM
        </div>
        <div>
          <p className="text-[11px] font-bold text-[var(--foreground)]">Ananya Mehta</p>
          <p className="text-[10px] text-[var(--muted-foreground)]">Mumbai · Bridal Consultation</p>
        </div>
      </div>
    </div>
  );
}

function GalleryPreview() {
  return (
    <div className="w-full max-w-[300px] rounded-2xl border border-[oklch(90%_0.025_250)] bg-white p-3 shadow-[0_14px_30px_-16px_oklch(45%_0.12_255/0.22)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      <div className="grid grid-cols-3 gap-2">
        {/* Video tile with play button */}
        <div className="relative col-span-2 flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400">
          <svg viewBox="0 0 140 90" className="absolute inset-0 h-full w-full opacity-30" fill="none" aria-hidden="true">
            <circle cx="110" cy="24" r="22" fill="#FFFFFF" />
            <path d="M0 78L42 48L78 68L114 38L140 60V90H0V78Z" fill="#FFFFFF" />
          </svg>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[var(--primary)] shadow-md transition-transform duration-200 group-hover:scale-110 motion-reduce:transition-none">
            <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
          </div>
          <span className="absolute bottom-2 left-2 rounded-md bg-slate-900/65 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            0:45 Reel
          </span>
        </div>

        {/* Stacked photo thumbnails */}
        <div className="grid grid-rows-2 gap-2">
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-blue-100">
            <svg viewBox="0 0 36 28" className="h-6 w-8" fill="none" aria-hidden="true">
              <circle cx="12" cy="10" r="3" fill="#3B82F6" />
              <path d="M5 23L13 15L19 20L25 13L31 23H5Z" fill="#2563EB" />
            </svg>
          </div>
          <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-indigo-100">
            <svg viewBox="0 0 36 28" className="h-6 w-8" fill="none" aria-hidden="true">
              <rect x="8" y="6" width="20" height="16" rx="3" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="1.6" />
              <circle cx="18" cy="14" r="4" fill="#0EA5E9" fillOpacity="0.3" stroke="#0EA5E9" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessInfoPreview() {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-2xl border border-[oklch(90%_0.025_250)] bg-white shadow-[0_14px_30px_-16px_oklch(45%_0.12_255/0.22)] transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      {/* Mini map banner */}
      <div className="relative flex h-12 items-center justify-between bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 px-3">
        <svg viewBox="0 0 260 44" className="absolute inset-0 h-full w-full opacity-55" fill="none" aria-hidden="true">
          <path d="M0 14H260M0 32H260M55 0V44M150 0V44M215 0V44" stroke="#93C5FD" strokeWidth="1.4" />
        </svg>
        <div className="relative flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-[var(--foreground)] shadow-2xs">
          <MapPin className="h-3 w-3 text-[var(--primary)]" aria-hidden="true" />
          <span>Bandra West, Mumbai</span>
        </div>
        <span className="relative rounded-md bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
          Open Now
        </span>
      </div>

      {/* Contact & hours panel */}
      <div className="space-y-1.5 p-3 text-[10px] text-[var(--foreground)]">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
          <span className="font-medium">Mon – Sat · 10:00 AM – 7:30 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
          <span className="font-medium tabular-nums">+91 98458 81387</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" aria-hidden="true" />
          <span className="truncate font-medium">hello@nishastudio.in</span>
        </div>
      </div>
    </div>
  );
}

function ShareableLinkPreview() {
  return (
    <div className="flex w-full max-w-[304px] items-center gap-3 transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
      {/* Mini phone + QR */}
      <div className="w-[126px] shrink-0 rounded-2xl border border-[oklch(88%_0.03_250)] bg-white p-2.5 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl border border-[oklch(90%_0.025_250)] bg-[oklch(98%_0.01_250)] p-1.5">
          {/* Crisp mini QR SVG */}
          <svg viewBox="0 0 28 28" className="h-full w-full text-[var(--foreground)]" fill="currentColor" aria-hidden="true">
            <path d="M2 2H10V10H2V2ZM4 4V8H8V4H4ZM18 2H26V10H18V2ZM20 4V8H24V4H20ZM2 18H10V26H2V18ZM4 20V24H8V20H4ZM12 4H15V7H12V4ZM12 10H16V14H12V10ZM4 12H8V15H4V12ZM18 13H22V16H18V13ZM14 17H18V21H14V17ZM20 19H26V26H20V19ZM22 21V24H24V21H22ZM12 22H17V26H12V22Z" />
          </svg>
        </div>
        <div className="mt-2 flex items-center justify-center gap-1 rounded-md bg-[oklch(95%_0.03_252)] px-1.5 py-1 text-[9px] font-bold text-[var(--primary)]">
          <Globe className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
          <span className="truncate">smartbiz.in/nisha</span>
        </div>
      </div>

      {/* Share options card */}
      <div className="flex-1 space-y-2 rounded-2xl border border-[oklch(88%_0.03_250)] bg-white p-2.5 shadow-sm">
        <div className="flex items-center justify-between rounded-xl bg-[var(--primary)] px-2.5 py-1.5 text-[10px] font-bold text-white">
          <span className="flex items-center gap-1.5">
            <Copy className="h-3 w-3" aria-hidden="true" />
            Copy Link
          </span>
          <Check className="h-3 w-3 text-cyan-200" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          {/* WhatsApp */}
          <div className="flex flex-col items-center rounded-lg bg-[#DCFCE7] py-1.5 text-[#15803D]">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="mt-0.5 text-[8px] font-bold">WhatsApp</span>
          </div>
          {/* Instagram */}
          <div className="flex flex-col items-center rounded-lg bg-rose-50 py-1.5 text-rose-600">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <rect x="2.5" y="2.5" width="11" height="11" rx="3.2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="11.3" cy="4.7" r="0.8" fill="currentColor" />
            </svg>
            <span className="mt-0.5 text-[8px] font-bold">Instagram</span>
          </div>
          {/* Facebook */}
          <div className="flex flex-col items-center rounded-lg bg-blue-50 py-1.5 text-blue-600">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M9.5 14V8.8H11.2L11.5 6.8H9.5V5.5C9.5 4.9 9.7 4.5 10.5 4.5H11.6V2.7C11.4 2.7 10.7 2.6 10 2.6C8.4 2.6 7.4 3.5 7.4 5.3V6.8H5.7V8.8H7.4V14H9.5Z" />
            </svg>
            <span className="mt-0.5 text-[8px] font-bold">Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureVisualPreview({ id }: { id: FeatureId }) {
  switch (id) {
    case "profile":
      return <ProfilePreview />;
    case "services":
      return <ServicesPreview />;
    case "store":
      return <StorePreview />;
    case "booking":
      return <AppointmentBookingPreview />;
    case "whatsapp":
      return <WhatsAppPreview />;
    case "testimonials":
      return <TestimonialsPreview />;
    case "gallery":
      return <GalleryPreview />;
    case "info":
      return <BusinessInfoPreview />;
    case "link":
      return <ShareableLinkPreview />;
  }
}
