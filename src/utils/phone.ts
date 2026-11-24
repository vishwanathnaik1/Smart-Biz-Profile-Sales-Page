import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  parsePhoneNumberFromString,
  type CountryCode,
  type NumberType,
} from "libphonenumber-js/max";

export type { CountryCode };

export const DEFAULT_COUNTRY_CODE: CountryCode = "IN";

export interface CountryOption {
  code: CountryCode;
  name: string;
  dialCode: string;
}

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  e164?: string;
  formattedInternational?: string;
  nationalNumber?: string;
  country?: CountryCode;
}

const POPULAR_COUNTRY_CODES: CountryCode[] = [
  "IN",
  "AE",
  "US",
  "GB",
  "CA",
  "AU",
  "SG",
];

const PLACEHOLDER_BY_COUNTRY: Partial<Record<CountryCode, string>> = {
  IN: "98234 51678",
  US: "(415) 555-2671",
  CA: "(416) 555-0198",
  GB: "7400 123456",
  AE: "50 123 4567",
  AU: "412 345 678",
  SG: "8123 4567",
  DE: "1512 3456789",
  FR: "6 12 34 56 78",
  SA: "50 123 4567",
  QA: "5512 3456",
  MY: "12-345 6789",
  NZ: "21 123 4567",
  NP: "984-1234567",
  LK: "71 234 5678",
};

const ALLOWED_NUMBER_TYPES = new Set<NumberType>([
  "MOBILE",
  "FIXED_LINE_OR_MOBILE",
]);

const ALLOWED_PHONE_CHARS_REGEX = /^[\d\s\-()+.]+$/;
const REPEATED_DIGIT_REGEX = /^(\d)\1+$/;
const ASCENDING_SEQUENCE = "01234567890123456789";
const DESCENDING_SEQUENCE = "98765432109876543210";

let cachedCountries: CountryOption[] | null = null;
let regionDisplayNames: Intl.DisplayNames | null = null;

function getCountryName(code: CountryCode): string {
  if (!regionDisplayNames && typeof Intl !== "undefined" && "DisplayNames" in Intl) {
    try {
      regionDisplayNames = new Intl.DisplayNames(["en"], { type: "region" });
    } catch {
      regionDisplayNames = null;
    }
  }
  return regionDisplayNames?.of(code) || code;
}

export function getAllCountryOptions(): CountryOption[] {
  if (cachedCountries) return cachedCountries;

  const popularRank = new Map<CountryCode, number>(
    POPULAR_COUNTRY_CODES.map((code, index) => [code, index]),
  );

  cachedCountries = getCountries()
    .map((code) => ({
      code,
      name: getCountryName(code),
      dialCode: `+${getCountryCallingCode(code)}`,
    }))
    .sort((a, b) => {
      const rankA = popularRank.get(a.code);
      const rankB = popularRank.get(b.code);
      if (rankA !== undefined && rankB !== undefined) return rankA - rankB;
      if (rankA !== undefined) return -1;
      if (rankB !== undefined) return 1;
      return a.name.localeCompare(b.name);
    });

  return cachedCountries;
}

export function getPopularCountryCount(): number {
  return POPULAR_COUNTRY_CODES.length;
}

export function getCountryPlaceholder(countryCode: CountryCode): string {
  return PLACEHOLDER_BY_COUNTRY[countryCode] ?? "Enter phone number";
}

export function getDialCode(countryCode: CountryCode): string {
  return `+${getCountryCallingCode(countryCode)}`;
}

export function sanitizePhoneInput(raw: string): string {
  return raw.replace(/[^\d\s\-()+]/g, "");
}

function isDummyNationalNumber(nationalDigits: string): boolean {
  if (nationalDigits.length < 6) return false;
  if (REPEATED_DIGIT_REGEX.test(nationalDigits)) return true;
  if (
    nationalDigits.length >= 8 &&
    (ASCENDING_SEQUENCE.includes(nationalDigits) ||
      DESCENDING_SEQUENCE.includes(nationalDigits))
  ) {
    return true;
  }
  return false;
}

export function detectCountryFromInternationalInput(
  rawInput: string,
): { country: CountryCode; nationalNumber: string } | null {
  const trimmed = rawInput.trim();
  if (!trimmed.startsWith("+")) return null;

  const parsed = parsePhoneNumberFromString(trimmed);
  if (!parsed?.country || !isSupportedCountry(parsed.country)) return null;

  return {
    country: parsed.country,
    nationalNumber: parsed.nationalNumber,
  };
}

export function validatePhoneNumber(
  rawInput: string,
  countryCode: CountryCode = DEFAULT_COUNTRY_CODE,
): PhoneValidationResult {
  const trimmed = rawInput.trim();
  const safeCountry: CountryCode = isSupportedCountry(countryCode)
    ? countryCode
    : DEFAULT_COUNTRY_CODE;
  const countryLabel = `${getCountryName(safeCountry)} (${getDialCode(safeCountry)})`;

  if (!trimmed) {
    return {
      isValid: false,
      error: `Please enter a valid ${countryLabel} phone number.`,
    };
  }

  if (!ALLOWED_PHONE_CHARS_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Phone number can only contain digits and standard formatting characters.",
    };
  }

  const parsed = parsePhoneNumberFromString(trimmed, safeCountry);
  if (!parsed || !parsed.isValid()) {
    return {
      isValid: false,
      error: `Please enter a valid ${countryLabel} number.`,
    };
  }

  // If the user didn't explicitly type a '+' international prefix, enforce that
  // the parsed number matches the selected country (or shares its calling code, e.g. US/CA).
  if (!trimmed.startsWith("+") && parsed.country && parsed.country !== safeCountry) {
    const selectedCallingCode = getCountryCallingCode(safeCountry);
    if (parsed.countryCallingCode !== selectedCallingCode) {
      return {
        isValid: false,
        error: `Please enter a valid ${countryLabel} number.`,
      };
    }
  }

  const numberType = parsed.getType();
  if (numberType && !ALLOWED_NUMBER_TYPES.has(numberType)) {
    return {
      isValid: false,
      error: `Please enter a valid ${countryLabel} mobile / WhatsApp number.`,
    };
  }

  const nationalDigits = String(parsed.nationalNumber ?? "").replace(/\D/g, "");
  if (isDummyNationalNumber(nationalDigits)) {
    return {
      isValid: false,
      error: "Please enter a real phone number — dummy or repeated numbers are not accepted.",
    };
  }

  return {
    isValid: true,
    e164: parsed.number,
    formattedInternational: parsed.formatInternational(),
    nationalNumber: nationalDigits,
    country: parsed.country ?? safeCountry,
  };
}

export function formatPhoneForSubmission(
  rawInput: string,
  countryCode: CountryCode = DEFAULT_COUNTRY_CODE,
): string {
  const result = validatePhoneNumber(rawInput, countryCode);
  return result.formattedInternational ?? rawInput.trim();
}
