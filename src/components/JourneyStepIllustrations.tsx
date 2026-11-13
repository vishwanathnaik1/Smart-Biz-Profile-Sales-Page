export type WithoutStepId = "instagram" | "dm" | "ask-services" | "wait" | "ask-price";
export type WithStepId = "one-link" | "profile" | "services" | "proof" | "whatsapp";

function InstagramGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Smartphone frame */}
      <rect x="26" y="6" width="60" height="72" rx="11" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="2" />
      <rect x="46" y="10" width="20" height="3" rx="1.5" fill="#FECDD3" />
      {/* Instagram profile header */}
      <circle cx="40" cy="24" r="7" fill="#FFF1F2" stroke="#E11D48" strokeWidth="1.75" />
      <rect x="36.5" y="20.5" width="7" height="7" rx="2" stroke="#E11D48" strokeWidth="1.3" />
      <circle cx="40" cy="24" r="1.4" fill="#E11D48" />
      <rect x="51" y="19" width="24" height="3.5" rx="1.75" fill="#1E293B" fillOpacity="0.7" />
      <rect x="51" y="25" width="18" height="2.5" rx="1.25" fill="#FB7185" fillOpacity="0.65" />
      {/* Cluttered 3x2 grid of old posts */}
      <rect x="33" y="36" width="14" height="12" rx="2.5" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <rect x="49" y="36" width="14" height="12" rx="2.5" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="1" />
      <rect x="65" y="36" width="14" height="12" rx="2.5" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <rect x="33" y="51" width="14" height="12" rx="2.5" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="1" />
      <rect x="49" y="51" width="14" height="12" rx="2.5" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1" />
      <rect x="65" y="51" width="14" height="12" rx="2.5" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="1" />
      {/* Missing website confusion badge */}
      <circle cx="84" cy="18" r="10" fill="#E11D48" />
      <path
        d="M84 14.5C82.4 14.5 81.3 15.4 81.3 16.6M84 18.8V19.2M84 21.6H84.01"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M84 14.5C85.5 14.5 86.5 15.3 86.5 16.4C86.5 17.5 84 17.8 84 19" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DmGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Main chat window */}
      <rect x="16" y="14" width="66" height="54" rx="12" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="2" />
      {/* Incoming bubble */}
      <rect x="23" y="23" width="38" height="14" rx="7" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.2" />
      <rect x="29" y="28.5" width="22" height="3" rx="1.5" fill="#F43F5E" fillOpacity="0.6" />
      {/* Outgoing DM bubble */}
      <rect x="34" y="42" width="41" height="16" rx="8" fill="#FFE4E6" stroke="#FDA4AF" strokeWidth="1.2" />
      <rect x="41" y="47" width="25" height="2.8" rx="1.4" fill="#E11D48" fillOpacity="0.7" />
      <rect x="47" y="52" width="16" height="2.5" rx="1.25" fill="#E11D48" fillOpacity="0.45" />
      {/* DM Paper plane badge */}
      <circle cx="83" cy="24" r="13" fill="#E11D48" />
      <path
        d="M76.5 23.8L88.8 18.6L84.7 30.8L82 25.5L76.5 23.8Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Unread dot */}
      <circle cx="92" cy="54" r="6" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
      <circle cx="92" cy="54" r="2.6" fill="#E11D48" />
    </svg>
  );
}

function AskServicesGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Unclear service sheet */}
      <rect x="44" y="16" width="50" height="58" rx="10" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="2" />
      <rect x="52" y="25" width="26" height="4" rx="2" fill="#FDA4AF" />
      {/* Row 1 with missing clarity */}
      <circle cx="55" cy="38" r="2.5" fill="#F43F5E" />
      <rect x="61" y="36.5" width="24" height="3" rx="1.5" fill="#E2E8F0" />
      {/* Row 2 */}
      <circle cx="55" cy="49" r="2.5" fill="#F43F5E" />
      <rect x="61" y="47.5" width="19" height="3" rx="1.5" fill="#E2E8F0" />
      {/* Row 3 */}
      <circle cx="55" cy="60" r="2.5" fill="#F43F5E" />
      <rect x="61" y="58.5" width="22" height="3" rx="1.5" fill="#E2E8F0" />
      {/* Customer question bubble */}
      <path
        d="M16 18C16 13.6 19.6 10 24 10H52C56.4 10 60 13.6 60 18V33C60 37.4 56.4 41 52 41H32L22 48V41H24C19.6 41 16 37.4 16 33V18Z"
        fill="#E11D48"
      />
      <rect x="24" y="20" width="20" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
      <rect x="24" y="26.5" width="14" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.7" />
      <circle cx="49" cy="25.5" r="5.5" fill="#FFF1F2" />
      <path
        d="M47.4 24.1C47.4 23.1 48.1 22.5 49 22.5C49.9 22.5 50.6 23.1 50.6 23.9C50.6 24.7 49 25.1 49 26V26.4M49 28.3H49.01"
        stroke="#E11D48"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaitGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Outer loading track */}
      <circle cx="50" cy="42" r="28" stroke="#FFE4E6" strokeWidth="5" />
      <path
        d="M50 14A28 28 0 0 1 77.2 35.5"
        stroke="#E11D48"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Clock body */}
      <circle cx="50" cy="42" r="21" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="2" />
      <circle cx="50" cy="42" r="2.5" fill="#E11D48" />
      <path d="M50 28V42L59 48" stroke="#E11D48" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Waiting dots pill */}
      <rect x="67" y="48" width="31" height="17" rx="8.5" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.6" />
      <circle cx="76" cy="56.5" r="2.2" fill="#E11D48" fillOpacity="0.45" />
      <circle cx="82.5" cy="56.5" r="2.2" fill="#E11D48" fillOpacity="0.7" />
      <circle cx="89" cy="56.5" r="2.2" fill="#E11D48" />
    </svg>
  );
}

function AskPriceGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Price tag */}
      <path
        d="M28 24H56.5L74 41.5L52.5 63L35 45.5V31C35 27.1 31.9 24 28 24Z"
        fill="#FFFFFF"
        stroke="#FDA4AF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M27 21H54L74 41L53 62L33 42V27C33 23.7 30.3 21 27 21Z"
        fill="#FFF1F2"
        stroke="#FB7185"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="29" r="3" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.7" />
      {/* Price lines + question */}
      <path d="M46 39H56M46 43H54M49 39C52 39 53.5 40.5 53.5 42.5C53.5 44.5 52 46 49 46L54.5 51" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Chat bubble asking price */}
      <rect x="61" y="13" width="35" height="22" rx="9" fill="#E11D48" />
      <path d="M68 34L64 40V33" fill="#E11D48" />
      <rect x="68" y="20" width="14" height="2.8" rx="1.4" fill="#FFFFFF" />
      <text x="84.5" y="27" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">
        ?
      </text>
      {/* Waiting reply line */}
      <rect x="62" y="54" width="32" height="14" rx="7" fill="#FFFFFF" stroke="#FDA4AF" strokeWidth="1.6" />
      <rect x="69" y="59.5" width="18" height="3" rx="1.5" fill="#FDA4AF" />
    </svg>
  );
}

function OneLinkGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Crisp white phone silhouette */}
      <rect x="28" y="6" width="56" height="72" rx="11" fill="#FFFFFF" fillOpacity="0.16" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="47" y="11" width="18" height="2.8" rx="1.4" fill="#FFFFFF" fillOpacity="0.65" />
      {/* Highlighted single shareable link bar */}
      <rect x="33" y="28" width="46" height="18" rx="6" fill="#FFFFFF" />
      <path
        d="M42.5 37H45.5M47.5 37H50.5M44.5 34.5H43C41.6 34.5 40.5 35.6 40.5 37C40.5 38.4 41.6 39.5 43 39.5H44.5M48.5 34.5H50C51.4 34.5 52.5 35.6 52.5 37C52.5 38.4 51.4 39.5 50 39.5H48.5"
        stroke="#2563EB"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="56" y="35.2" width="17" height="3.6" rx="1.8" fill="#0EA5E9" />
      {/* Quick profile preview lines below link */}
      <rect x="36" y="53" width="40" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="41" y="61" width="30" height="3.5" rx="1.75" fill="#FFFFFF" fillOpacity="0.55" />
      {/* Share glow icon */}
      <circle cx="84" cy="20" r="10" fill="#FFFFFF" />
      <path
        d="M81 20.5L87 17M81 20.5L87 23.5"
        stroke="#2563EB"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="80.5" cy="20.5" r="1.8" fill="#2563EB" />
      <circle cx="87.2" cy="17" r="1.8" fill="#2563EB" />
      <circle cx="87.2" cy="23.5" r="1.8" fill="#2563EB" />
    </svg>
  );
}

function ProfileGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Digital profile card */}
      <rect x="18" y="9" width="76" height="66" rx="11" fill="#FFFFFF" fillOpacity="0.18" stroke="#FFFFFF" strokeWidth="2" />
      {/* Cover banner */}
      <path
        d="M20 19C20 14.6 23.6 11 28 11H84C88.4 11 92 14.6 92 19V29H20V19Z"
        fill="#FFFFFF"
        fillOpacity="0.28"
      />
      {/* Business logo avatar */}
      <circle cx="36" cy="30" r="10" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2" />
      <circle cx="36" cy="28" r="3" fill="#2563EB" />
      <path d="M31 35C32 32.8 33.8 32 36 32C38.2 32 40 32.8 41 35" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
      {/* Business name & tagline */}
      <rect x="51" y="34" width="32" height="4" rx="2" fill="#FFFFFF" />
      <rect x="51" y="41" width="22" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.7" />
      {/* Contact info row: Call, Map, Web */}
      <rect x="26" y="52" width="18" height="15" rx="4" fill="#FFFFFF" />
      <path d="M32.5 57C32.5 59.5 34.5 61.5 37 61.5L38.2 60.3L36.8 59L35.8 59.7C35 59.3 34.3 58.6 33.9 57.8L34.6 56.8L33.3 55.4L32.5 57Z" fill="#2563EB" />
      <rect x="47" y="52" width="18" height="15" rx="4" fill="#FFFFFF" />
      <path d="M56 55.5C54.3 55.5 53 56.8 53 58.5C53 60.6 56 63.2 56 63.2C56 63.2 59 60.6 59 58.5C59 56.8 57.7 55.5 56 55.5Z" fill="#0EA5E9" />
      <circle cx="56" cy="58.4" r="1.2" fill="#FFFFFF" />
      <rect x="68" y="52" width="18" height="15" rx="4" fill="#FFFFFF" />
      <circle cx="77" cy="59.5" r="4" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M73.5 59.5H80.5" stroke="#2563EB" strokeWidth="1.2" />
    </svg>
  );
}

function ServicesGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Left service card */}
      <rect x="13" y="13" width="40" height="58" rx="9" fill="#FFFFFF" fillOpacity="0.96" />
      <rect x="18" y="18" width="30" height="22" rx="5" fill="#DBEAFE" />
      <path d="M21 36L28 29L33 34L38 28L45 36H21Z" fill="#3B82F6" />
      <circle cx="25" cy="24" r="2.5" fill="#0EA5E9" />
      <rect x="18" y="45" width="24" height="3.8" rx="1.9" fill="#1E293B" />
      <rect x="18" y="52" width="16" height="3" rx="1.5" fill="#64748B" fillOpacity="0.65" />
      <rect x="18" y="59" width="20" height="6" rx="3" fill="#2563EB" />

      {/* Right service card */}
      <rect x="59" y="13" width="40" height="58" rx="9" fill="#FFFFFF" fillOpacity="0.96" />
      <rect x="64" y="18" width="30" height="22" rx="5" fill="#CFFAFE" />
      <rect x="70" y="23" width="18" height="12" rx="3" fill="#06B6D4" />
      <path d="M74 29H84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <rect x="64" y="45" width="25" height="3.8" rx="1.9" fill="#1E293B" />
      <rect x="64" y="52" width="18" height="3" rx="1.5" fill="#64748B" fillOpacity="0.65" />
      <rect x="64" y="59" width="20" height="6" rx="3" fill="#0EA5E9" />
    </svg>
  );
}

function ProofGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Testimonial review card */}
      <rect x="15" y="20" width="70" height="52" rx="11" fill="#FFFFFF" />
      {/* Five gold/amber stars inside crisp card */}
      <path d="M27 29L28.6 32.2L32.1 32.7L29.5 35.2L30.1 38.7L27 37L23.9 38.7L24.5 35.2L21.9 32.7L25.4 32.2L27 29Z" fill="#F59E0B" />
      <path d="M39 29L40.6 32.2L44.1 32.7L41.5 35.2L42.1 38.7L39 37L35.9 38.7L36.5 35.2L33.9 32.7L37.4 32.2L39 29Z" fill="#F59E0B" />
      <path d="M51 29L52.6 32.2L56.1 32.7L53.5 35.2L54.1 38.7L51 37L47.9 38.7L48.5 35.2L45.9 32.7L49.4 32.2L51 29Z" fill="#F59E0B" />
      <path d="M63 29L64.6 32.2L68.1 32.7L65.5 35.2L66.1 38.7L63 37L59.9 38.7L60.5 35.2L57.9 32.7L61.4 32.2L63 29Z" fill="#F59E0B" />
      <path d="M75 29L76.6 32.2L80.1 32.7L77.5 35.2L78.1 38.7L75 37L71.9 38.7L72.5 35.2L69.9 32.7L73.4 32.2L75 29Z" fill="#F59E0B" />
      {/* Testimonial lines */}
      <rect x="23" y="45" width="52" height="3.8" rx="1.9" fill="#1E293B" fillOpacity="0.8" />
      <rect x="23" y="52.5" width="38" height="3.2" rx="1.6" fill="#64748B" fillOpacity="0.55" />
      <circle cx="27" cy="63" r="4" fill="#DBEAFE" />
      <rect x="34" y="61.5" width="22" height="3" rx="1.5" fill="#2563EB" fillOpacity="0.7" />
      {/* Verified trust shield badge */}
      <path
        d="M84 11L95 15.5V23.5C95 30.2 90.3 35.8 84 38C77.7 35.8 73 30.2 73 23.5V15.5L84 11Z"
        fill="#10B981"
        stroke="#FFFFFF"
        strokeWidth="2.2"
      />
      <path d="M79.5 24.5L82.7 27.6L88.8 21.5" stroke="#FFFFFF" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppGraphic() {
  return (
    <svg viewBox="0 0 112 84" className="h-full w-full" fill="none" aria-hidden="true">
      {/* Chat enquiry card */}
      <rect x="30" y="16" width="66" height="54" rx="12" fill="#FFFFFF" />
      {/* Instant booking message bubble */}
      <rect x="40" y="25" width="46" height="16" rx="7" fill="#DCFCE7" />
      <rect x="46" y="30.5" width="28" height="3" rx="1.5" fill="#15803D" />
      <rect x="46" y="35.5" width="16" height="2.4" rx="1.2" fill="#16A34A" fillOpacity="0.7" />
      {/* Confirmed tap CTA bar */}
      <rect x="40" y="47" width="46" height="13" rx="6.5" fill="#16A34A" />
      <rect x="48" y="52" width="22" height="3" rx="1.5" fill="#FFFFFF" />
      <path d="M75 51.5L78 54L82 50" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Prominent WhatsApp emblem */}
      <circle cx="31" cy="36" r="16" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2.5" />
      <path
        d="M23.5 44.5L25 39.2C24.2 37.8 23.8 36.2 23.8 34.5C23.8 29.7 27.7 25.8 32.5 25.8C37.3 25.8 41.2 29.7 41.2 34.5C41.2 39.3 37.3 43.2 32.5 43.2C31 43.2 29.5 42.8 28.2 42.1L23.5 44.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M29.4 31.3C29.7 31 30.1 31.1 30.3 31.5L31.1 33C31.3 33.3 31.2 33.6 31 33.9L30.5 34.4C30.9 35.2 31.8 36.1 32.6 36.5L33.1 36C33.4 35.8 33.7 35.7 34 35.9L35.5 36.7C35.9 36.9 36 37.3 35.7 37.6C35.1 38.4 34 38.8 33 38.4C30.5 37.5 28.5 35.5 27.6 33C27.2 32 27.6 30.9 28.4 30.3L29.4 31.3Z"
        fill="#16A34A"
      />
    </svg>
  );
}

export function WithoutStepGraphic({ id }: { id: WithoutStepId }) {
  switch (id) {
    case "instagram":
      return <InstagramGraphic />;
    case "dm":
      return <DmGraphic />;
    case "ask-services":
      return <AskServicesGraphic />;
    case "wait":
      return <WaitGraphic />;
    case "ask-price":
      return <AskPriceGraphic />;
  }
}

export function WithStepGraphic({ id }: { id: WithStepId }) {
  switch (id) {
    case "one-link":
      return <OneLinkGraphic />;
    case "profile":
      return <ProfileGraphic />;
    case "services":
      return <ServicesGraphic />;
    case "proof":
      return <ProofGraphic />;
    case "whatsapp":
      return <WhatsAppGraphic />;
  }
}
