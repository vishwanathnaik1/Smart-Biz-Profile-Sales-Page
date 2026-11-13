import {
  Bed,
  Briefcase,
  Camera,
  CheckCircle2,
  Clock,
  Compass,
  Globe,
  Heart,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  Package,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Sun,
  Tag,
  Users,
} from "lucide-react";
import type { NicheData, NicheIconKey, NicheId } from "../data/nichesData";

export function NicheIcon({
  icon,
  className = "h-4 w-4",
}: {
  icon: NicheIconKey;
  className?: string;
}) {
  switch (icon) {
    case "sparkles":
      return <Sparkles className={className} aria-hidden="true" />;
    case "heart":
      return <Heart className={className} aria-hidden="true" />;
    case "briefcase":
      return <Briefcase className={className} aria-hidden="true" />;
    case "compass":
      return <Compass className={className} aria-hidden="true" />;
    case "users":
      return <Users className={className} aria-hidden="true" />;
    case "sun":
      return <Sun className={className} aria-hidden="true" />;
    case "shield":
      return <ShieldCheck className={className} aria-hidden="true" />;
    case "star":
      return <Star className={className} aria-hidden="true" />;
    case "rocket":
      return <Rocket className={className} aria-hidden="true" />;
    case "leaf":
      return <Leaf className={className} aria-hidden="true" />;
    case "store":
      return <Store className={className} aria-hidden="true" />;
    case "tag":
      return <Tag className={className} aria-hidden="true" />;
    case "package":
      return <Package className={className} aria-hidden="true" />;
    case "camera":
      return <Camera className={className} aria-hidden="true" />;
    case "clock":
      return <Clock className={className} aria-hidden="true" />;
    case "mapPin":
      return <MapPin className={className} aria-hidden="true" />;
    case "messageCircle":
      return <MessageCircle className={className} aria-hidden="true" />;
    case "palette":
      return <Palette className={className} aria-hidden="true" />;
    case "globe":
      return <Globe className={className} aria-hidden="true" />;
    case "home":
      return <Home className={className} aria-hidden="true" />;
    case "bed":
      return <Bed className={className} aria-hidden="true" />;
    case "checkCircle":
      return <CheckCircle2 className={className} aria-hidden="true" />;
  }
}

export function NicheHeroVisual({ id }: { id: NicheId }) {
  switch (id) {
    case "tarot":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#EEF4FF" />
          <circle cx="290" cy="46" r="56" fill="#DBEAFE" fillOpacity="0.85" />
          <circle cx="62" cy="182" r="46" fill="#E0E7FF" fillOpacity="0.9" />
          {/* Three spread tarot cards */}
          <g transform="rotate(-10 112 118)">
            <rect x="74" y="48" width="76" height="120" rx="12" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" />
            <rect x="82" y="56" width="60" height="104" rx="8" fill="#F8FAFC" stroke="#BFDBFE" strokeWidth="1.2" />
            <path d="M112 86C104 86 98 92 98 100C98 108 104 114 112 114C107 112 104 106 104 100C104 94 107 88 112 86Z" fill="#2563EB" />
            <circle cx="117" cy="95" r="2.2" fill="#0EA5E9" />
          </g>
          <g transform="rotate(10 248 118)">
            <rect x="210" y="48" width="76" height="120" rx="12" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" />
            <rect x="218" y="56" width="60" height="104" rx="8" fill="#F8FAFC" stroke="#BFDBFE" strokeWidth="1.2" />
            <path d="M248 82L252 94L264 98L252 102L248 114L244 102L232 98L244 94L248 82Z" fill="#0EA5E9" />
          </g>
          {/* Center highlighted card */}
          <rect x="139" y="34" width="84" height="134" rx="14" fill="#1E3A8A" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="148" y="43" width="66" height="116" rx="9" stroke="#60A5FA" strokeWidth="1.4" />
          <circle cx="181" cy="86" r="15" fill="#38BDF8" fillOpacity="0.24" stroke="#93C5FD" strokeWidth="1.6" />
          <path d="M181 74L184 82L192 85L184 88L181 96L178 88L170 85L178 82L181 74Z" fill="#FDE047" />
          <rect x="159" y="114" width="44" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="166" y="123" width="30" height="3" rx="1.5" fill="#93C5FD" />
          {/* Floating WhatsApp booking ribbon */}
          <rect x="194" y="162" width="136" height="36" rx="12" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="1.5" />
          <circle cx="213" cy="180" r="9" fill="#22C55E" />
          <path d="M210 180L212.5 182.5L216.5 178" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="229" y="174" width="76" height="4" rx="2" fill="#0F172A" />
          <rect x="229" y="182" width="54" height="3" rx="1.5" fill="#64748B" fillOpacity="0.7" />
        </svg>
      );

    case "healers":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#ECFEFF" />
          <circle cx="180" cy="110" r="82" fill="#CFFAFE" fillOpacity="0.7" />
          <circle cx="180" cy="110" r="56" fill="#A5F3FC" fillOpacity="0.45" />
          <circle cx="180" cy="110" r="34" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="2" />
          {/* Lotus serenity illustration */}
          <path d="M180 76C188 90 192 104 180 120C168 104 172 90 180 76Z" fill="#0EA5E9" />
          <path d="M158 88C171 94 178 106 177 120C164 114 156 102 158 88Z" fill="#38BDF8" fillOpacity="0.85" />
          <path d="M202 88C189 94 182 106 183 120C196 114 204 102 202 88Z" fill="#38BDF8" fillOpacity="0.85" />
          {/* Floating chakra balance cards */}
          <rect x="26" y="42" width="110" height="48" rx="12" fill="#FFFFFF" stroke="#A5F3FC" strokeWidth="1.6" />
          <circle cx="46" cy="66" r="10" fill="#DBEAFE" />
          <circle cx="46" cy="66" r="4.5" fill="#2563EB" />
          <rect x="63" y="59" width="58" height="4" rx="2" fill="#0F172A" />
          <rect x="63" y="68" width="42" height="3.2" rx="1.6" fill="#0284C7" />
          <rect x="224" y="138" width="112" height="48" rx="12" fill="#FFFFFF" stroke="#A5F3FC" strokeWidth="1.6" />
          <circle cx="244" cy="162" r="10" fill="#DCFCE7" />
          <path d="M240 162L243 165L249 159" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="261" y="155" width="58" height="4" rx="2" fill="#0F172A" />
          <rect x="261" y="164" width="44" height="3.2" rx="1.6" fill="#64748B" />
        </svg>
      );

    case "astrologers":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#EEF2FF" />
          {/* Zodiac wheel */}
          <circle cx="156" cy="110" r="76" fill="#FFFFFF" stroke="#818CF8" strokeWidth="2.2" />
          <circle cx="156" cy="110" r="56" stroke="#C7D2FE" strokeWidth="1.6" />
          <circle cx="156" cy="110" r="24" fill="#1E3A8A" />
          <path d="M156 34V186M80 110H232M102 56L210 164M210 56L102 164" stroke="#E0E7FF" strokeWidth="1.4" />
          <circle cx="156" cy="110" r="7" fill="#FDE047" />
          <circle cx="196" cy="70" r="5" fill="#3B82F6" />
          <circle cx="112" cy="144" r="5" fill="#0EA5E9" />
          {/* Kundli square chart card */}
          <rect x="234" y="42" width="100" height="100" rx="14" fill="#FFFFFF" stroke="#A5B4FC" strokeWidth="2" />
          <rect x="248" y="56" width="72" height="72" stroke="#2563EB" strokeWidth="1.6" />
          <path d="M248 56L320 128M320 56L248 128M284 56L248 92L284 128L320 92L284 56Z" stroke="#60A5FA" strokeWidth="1.4" />
          <rect x="234" y="156" width="100" height="28" rx="10" fill="#2563EB" />
          <rect x="252" y="167.5" width="64" height="5" rx="2.5" fill="#FFFFFF" />
        </svg>
      );

    case "coaches":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#EFF6FF" />
          {/* Transformation chart panel */}
          <rect x="36" y="34" width="212" height="148" rx="16" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="2" />
          <rect x="54" y="52" width="84" height="6" rx="3" fill="#0F172A" />
          <rect x="54" y="64" width="54" height="4" rx="2" fill="#64748B" fillOpacity="0.6" />
          {/* Ascending bar + growth curve */}
          <rect x="58" y="132" width="22" height="30" rx="5" fill="#DBEAFE" />
          <rect x="92" y="114" width="22" height="48" rx="5" fill="#93C5FD" />
          <rect x="126" y="96" width="22" height="66" rx="5" fill="#3B82F6" />
          <rect x="160" y="76" width="22" height="86" rx="5" fill="#2563EB" />
          <path d="M62 122L102 104L137 86L176 62L218 52" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="218" cy="52" r="6" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="2" />
          {/* Session booking card */}
          <rect x="220" y="88" width="112" height="96" rx="14" fill="#1E3A8A" />
          <circle cx="246" cy="114" r="12" fill="#38BDF8" />
          <path d="M242 114L245 117L251 111" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="266" y="109" width="50" height="4.5" rx="2.25" fill="#FFFFFF" />
          <rect x="266" y="118" width="36" height="3.5" rx="1.75" fill="#93C5FD" />
          <rect x="236" y="142" width="80" height="24" rx="8" fill="#22C55E" />
          <rect x="252" y="151.5" width="48" height="4.5" rx="2.25" fill="#FFFFFF" />
        </svg>
      );

    case "wellness":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#ECFDF5" />
          <circle cx="176" cy="110" r="78" fill="#D1FAE5" fillOpacity="0.8" />
          {/* Calm studio arch */}
          <path d="M126 176V96C126 68.4 148.4 46 176 46C203.6 46 226 68.4 226 96V176H126Z" fill="#FFFFFF" stroke="#6EE7B7" strokeWidth="2.2" />
          {/* Sunrise & mindfulness pose */}
          <circle cx="176" cy="84" r="18" fill="#A7F3D0" />
          <circle cx="176" cy="90" r="8" fill="#059669" />
          <path d="M150 144C155 124 166 116 176 116C186 116 197 124 202 144H150Z" fill="#10B981" />
          <path d="M142 152H210" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          {/* Program tiles */}
          <rect x="28" y="54" width="108" height="46" rx="12" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.6" />
          <circle cx="48" cy="77" r="9" fill="#DBEAFE" />
          <rect x="64" y="71" width="56" height="4.2" rx="2.1" fill="#0F172A" />
          <rect x="64" y="79" width="40" height="3.2" rx="1.6" fill="#059669" />
          <rect x="224" y="132" width="110" height="46" rx="12" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.6" />
          <circle cx="244" cy="155" r="9" fill="#DCFCE7" />
          <rect x="260" y="149" width="58" height="4.2" rx="2.1" fill="#0F172A" />
          <rect x="260" y="157" width="42" height="3.2" rx="1.6" fill="#64748B" />
        </svg>
      );

    case "small-businesses":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#F0F9FF" />
          {/* Storefront illustration */}
          <rect x="52" y="64" width="176" height="120" rx="14" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <path d="M44 64L56 38H224L236 64H44Z" fill="#2563EB" />
          <rect x="64" y="46" width="22" height="12" rx="4" fill="#FFFFFF" fillOpacity="0.25" />
          <rect x="100" y="46" width="22" height="12" rx="4" fill="#FFFFFF" fillOpacity="0.25" />
          <rect x="136" y="46" width="22" height="12" rx="4" fill="#FFFFFF" fillOpacity="0.25" />
          <rect x="172" y="46" width="22" height="12" rx="4" fill="#FFFFFF" fillOpacity="0.25" />
          {/* Shop window & door */}
          <rect x="70" y="84" width="84" height="62" rx="8" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1.5" />
          <rect x="168" y="84" width="42" height="100" rx="8" fill="#DBEAFE" />
          <circle cx="176" cy="134" r="3" fill="#2563EB" />
          {/* Hours & review panel */}
          <rect x="206" y="88" width="124" height="84" rx="14" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.8" />
          <rect x="220" y="102" width="54" height="16" rx="6" fill="#DCFCE7" />
          <rect x="228" y="108.5" width="38" height="3.5" rx="1.75" fill="#15803D" />
          <rect x="220" y="128" width="90" height="4" rx="2" fill="#0F172A" />
          <rect x="220" y="138" width="70" height="3.5" rx="1.75" fill="#64748B" />
          <rect x="220" y="150" width="82" height="8" rx="4" fill="#2563EB" />
        </svg>
      );

    case "product-sellers":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#ECFEFF" />
          {/* Mobile storefront catalog */}
          <rect x="44" y="28" width="272" height="164" rx="18" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
          <rect x="64" y="46" width="96" height="6" rx="3" fill="#0F172A" />
          <rect x="242" y="44" width="54" height="14" rx="7" fill="#E0F2FE" />
          {/* Three product cards */}
          <rect x="64" y="70" width="70" height="102" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.4" />
          <rect x="72" y="78" width="54" height="44" rx="8" fill="#DBEAFE" />
          <rect x="92" y="88" width="14" height="24" rx="4" fill="#2563EB" />
          <rect x="74" y="130" width="44" height="4" rx="2" fill="#0F172A" />
          <rect x="74" y="142" width="26" height="4" rx="2" fill="#2563EB" />
          <rect x="74" y="152" width="50" height="12" rx="6" fill="#22C55E" />

          <rect x="145" y="70" width="70" height="102" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.4" />
          <rect x="153" y="78" width="54" height="44" rx="8" fill="#CFFAFE" />
          <rect x="167" y="88" width="26" height="24" rx="5" fill="#0EA5E9" />
          <rect x="155" y="130" width="46" height="4" rx="2" fill="#0F172A" />
          <rect x="155" y="142" width="28" height="4" rx="2" fill="#0EA5E9" />
          <rect x="155" y="152" width="50" height="12" rx="6" fill="#22C55E" />

          <rect x="226" y="70" width="70" height="102" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.4" />
          <rect x="234" y="78" width="54" height="44" rx="8" fill="#E0E7FF" />
          <circle cx="261" cy="100" r="12" fill="#4F46E5" />
          <rect x="236" y="130" width="42" height="4" rx="2" fill="#0F172A" />
          <rect x="236" y="142" width="26" height="4" rx="2" fill="#4F46E5" />
          <rect x="236" y="152" width="50" height="12" rx="6" fill="#22C55E" />
        </svg>
      );

    case "freelancers":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#EFF6FF" />
          {/* Workspace screen */}
          <rect x="44" y="28" width="232" height="148" rx="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
          <rect x="56" y="42" width="208" height="114" rx="8" fill="#FFFFFF" />
          <rect x="68" y="54" width="90" height="44" rx="8" fill="#DBEAFE" />
          <path d="M78 88L96 70L112 84L128 66L148 88H78Z" fill="#2563EB" />
          <rect x="168" y="54" width="84" height="44" rx="8" fill="#E0F2FE" />
          <circle cx="210" cy="76" r="12" fill="#0EA5E9" />
          <rect x="68" y="108" width="184" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2" />
          <rect x="80" y="118" width="96" height="4.5" rx="2.25" fill="#0F172A" />
          <rect x="80" y="128" width="64" height="3.5" rx="1.75" fill="#64748B" />
          {/* Floating testimonial pill */}
          <rect x="218" y="132" width="114" height="58" rx="12" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="234" y="148" width="68" height="4.5" rx="2.25" fill="#FFFFFF" />
          <rect x="234" y="158" width="82" height="3.5" rx="1.75" fill="#BFDBFE" />
          <rect x="234" y="168" width="44" height="4" rx="2" fill="#FDE047" />
        </svg>
      );

    case "resorts":
      return (
        <svg viewBox="0 0 360 220" className="h-full w-full" fill="none" aria-hidden="true">
          <rect width="360" height="220" rx="22" fill="#F0FDF4" />
          {/* Hills & sun */}
          <circle cx="288" cy="54" r="20" fill="#FDE047" />
          <path d="M0 164L96 108L188 156L282 96L360 144V220H0V164Z" fill="#BBF7D0" />
          {/* Resort villa */}
          <rect x="66" y="88" width="176" height="92" rx="14" fill="#FFFFFF" stroke="#86EFAC" strokeWidth="2" />
          <path d="M54 90L154 44L254 90H54Z" fill="#0284C7" />
          <rect x="84" y="106" width="56" height="42" rx="8" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="156" y="106" width="66" height="74" rx="8" fill="#DCFCE7" />
          {/* Swimming pool */}
          <rect x="84" y="158" width="56" height="14" rx="7" fill="#38BDF8" />
          {/* Map pin & nightly price tag */}
          <rect x="220" y="114" width="112" height="68" rx="14" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.8" />
          <rect x="234" y="128" width="64" height="5" rx="2.5" fill="#0F172A" />
          <rect x="234" y="139" width="48" height="4" rx="2" fill="#0284C7" />
          <rect x="234" y="152" width="84" height="16" rx="8" fill="#22C55E" />
          <rect x="248" y="158.5" width="56" height="3.5" rx="1.75" fill="#FFFFFF" />
        </svg>
      );
  }
}

const THEME_GRADIENT_MAP: Record<NicheData["mockup"]["accentTheme"], string> = {
  violet: "from-indigo-600 via-blue-600 to-cyan-500",
  teal: "from-teal-600 via-cyan-600 to-blue-500",
  indigo: "from-indigo-700 via-blue-600 to-sky-500",
  blue: "from-blue-600 via-blue-500 to-cyan-500",
  emerald: "from-emerald-600 via-teal-600 to-cyan-500",
  sky: "from-sky-600 via-blue-600 to-cyan-500",
  cyan: "from-cyan-600 via-sky-600 to-blue-600",
};

export function NichePhoneMockup({ niche }: { niche: NicheData }) {
  const { mockup } = niche;
  const headerGradient = THEME_GRADIENT_MAP[mockup.accentTheme];

  return (
    <div className="mx-auto w-full max-w-[330px] rounded-[28px] border-[5px] border-[oklch(22%_0.04_262)] bg-white shadow-[0_26px_54px_-22px_oklch(35%_0.14_255/0.35)]">
      {/* Top phone speaker & banner */}
      <div className={`bg-gradient-to-br ${headerGradient} rounded-t-[22px] px-4 pt-3 pb-5 text-white`}>
        <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-white/35" />
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/80 bg-white font-display text-xs font-extrabold text-[var(--primary)]">
              {mockup.initials}
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-tight text-white">
                {mockup.brandName}
              </p>
              <p className="mt-0.5 text-[10px] text-white/85">{mockup.tagline}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
            {mockup.badge}
          </span>
        </div>

        {/* Highlights row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {mockup.highlights.map((item) => (
            <span
              key={item}
              className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Body cards */}
      <div className="space-y-2.5 p-3.5">
        {mockup.packages.map((pkg) => (
          <div
            key={pkg.name}
            className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border)] bg-[oklch(98.5%_0.008_252)] px-3 py-2.5"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-[var(--foreground)]">{pkg.name}</p>
              <p className="truncate text-[10px] text-[var(--muted-foreground)]">{pkg.detail}</p>
            </div>
            <span className="shrink-0 rounded-lg bg-[var(--primary)]/10 px-2 py-1 text-[11px] font-bold text-[var(--primary)] tabular-nums">
              {pkg.price}
            </span>
          </div>
        ))}

        {/* Testimonial / Proof snippet */}
        <div className="rounded-xl border border-amber-200/70 bg-amber-50/55 px-3 py-2 text-[11px] leading-snug text-slate-700">
          {mockup.proofLine}
        </div>

        {/* WhatsApp CTA bar inside preview */}
        <div className="flex items-center justify-center gap-1.5 rounded-full bg-[var(--success)] py-2.5 text-xs font-bold text-[var(--success-foreground)] shadow-xs">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{mockup.ctaLabel}</span>
        </div>
      </div>
    </div>
  );
}
