import { useEffect, useMemo, useRef, useState } from "react";
import * as FlagIcons from "country-flag-icons/react/3x2";
import { Check, CheckCircle2, ChevronDown, Search } from "lucide-react";
import {
  DEFAULT_COUNTRY_CODE,
  detectCountryFromInternationalInput,
  getAllCountryOptions,
  getCountryPlaceholder,
  getDialCode,
  getPopularCountryCount,
  sanitizePhoneInput,
  validatePhoneNumber,
  type CountryCode,
  type CountryOption,
} from "../../utils/phone";

interface PhoneNumberInputProps {
  id: string;
  country: CountryCode;
  value: string;
  onChange: (nextValue: string, nextCountry: CountryCode) => void;
  error?: string;
  disabled?: boolean;
  ariaLabel?: string;
  dropdownPlacement?: "bottom" | "top";
}

type FlagComponent = (props: { className?: string; title?: string }) => React.JSX.Element;
const FLAG_MAP = FlagIcons as unknown as Record<string, FlagComponent | undefined>;

function CountryFlag({ code, title }: { code: CountryCode; title?: string }) {
  const Flag = FLAG_MAP[code];
  if (!Flag) {
    return (
      <span className="inline-flex h-4 w-6 items-center justify-center rounded-[2px] bg-[var(--secondary)] text-[9px] font-bold text-[var(--muted-foreground)]">
        {code}
      </span>
    );
  }
  return (
    <Flag
      title={title}
      className="h-4 w-6 shrink-0 rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
    />
  );
}

export function PhoneNumberInput({
  id,
  country = DEFAULT_COUNTRY_CODE,
  value,
  onChange,
  error,
  disabled = false,
  ariaLabel,
  dropdownPlacement = "bottom",
}: PhoneNumberInputProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);

  const allCountries = useMemo(() => getAllCountryOptions(), []);
  const popularCount = getPopularCountryCount();

  const selectedOption = useMemo<CountryOption>(() => {
    return (
      allCountries.find((opt) => opt.code === country) ?? {
        code: country,
        name: country,
        dialCode: getDialCode(country),
      }
    );
  }, [allCountries, country]);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allCountries;
    const digitsOnly = query.replace(/^\+/, "");
    return allCountries.filter(
      (opt) =>
        opt.name.toLowerCase().includes(query) ||
        opt.code.toLowerCase().includes(query) ||
        opt.dialCode.includes(query) ||
        opt.dialCode.slice(1).startsWith(digitsOnly),
    );
  }, [allCountries, searchQuery]);

  const liveValidation = useMemo(() => {
    if (!value.trim()) return null;
    return validatePhoneNumber(value, country);
  }, [value, country]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown, true);

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 10);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown, true);
      window.clearTimeout(timer);
    };
  }, [dropdownOpen]);

  const handleSelectCountry = (nextCountry: CountryCode) => {
    setDropdownOpen(false);
    setSearchQuery("");
    onChange(value, nextCountry);
    numberInputRef.current?.focus();
  };

  const handleNumberChange = (raw: string) => {
    const cleaned = sanitizePhoneInput(raw);
    if (cleaned.trim().startsWith("+")) {
      const detected = detectCountryFromInternationalInput(cleaned);
      if (detected) {
        onChange(detected.nationalNumber, detected.country);
        return;
      }
    }
    onChange(cleaned, country);
  };

  const placeholder = getCountryPlaceholder(country);
  const isLiveValid = Boolean(liveValidation?.isValid);

  return (
    <div ref={containerRef} className="relative mt-1.5">
      <div
        className={`flex h-11 w-full items-stretch rounded-xl border bg-white transition-colors ${
          error
            ? "border-[var(--destructive)] focus-within:border-[var(--destructive)] focus-within:ring-2 focus-within:ring-[var(--destructive)]/20"
            : "border-[var(--input)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20"
        }`}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setDropdownOpen((prev) => !prev);
            setSearchQuery("");
          }}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label={`Select country code. Current country: ${selectedOption.name} ${selectedOption.dialCode}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-l-xl border-r border-[var(--border)] bg-[oklch(98.5%_0.005_255)] px-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          <CountryFlag code={selectedOption.code} title={selectedOption.name} />
          <span className="tabular-nums text-xs font-semibold text-[var(--foreground)]">
            {selectedOption.dialCode}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-[var(--muted-foreground)] transition-transform duration-150 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>

        <div className="relative flex min-w-0 flex-1 items-center">
          <input
            ref={numberInputRef}
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            disabled={disabled}
            aria-label={ariaLabel}
            aria-invalid={Boolean(error)}
            value={value}
            onChange={(e) => handleNumberChange(e.target.value)}
            placeholder={placeholder}
            className={`h-full w-full min-w-0 rounded-r-xl bg-transparent pl-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]/65 disabled:cursor-not-allowed disabled:opacity-60 ${
              isLiveValid && !error ? "pr-8" : "pr-3"
            }`}
          />

          {isLiveValid && !error && (
            <span
              className="pointer-events-none absolute right-2.5 inline-flex items-center text-emerald-600"
              aria-label="Valid phone number"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>

      {dropdownOpen && (
        <div
          role="listbox"
          aria-label="Choose country calling code"
          className={`absolute left-0 z-50 w-full min-w-[260px] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-xl ${
            dropdownPlacement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          }`}
        >
          <div className="border-b border-[var(--border)] p-2">
            <div className="relative flex items-center">
              <Search
                className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[var(--muted-foreground)]"
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or dial code..."
                aria-label="Search country or dial code"
                className="h-9 w-full rounded-lg border border-[var(--input)] bg-[oklch(99%_0.004_255)] pr-3 pl-8 text-xs text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]/70 focus:border-[var(--primary)] focus:bg-white"
              />
            </div>
          </div>

          <div className="max-h-56 overflow-y-auto py-1">
            {filteredCountries.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs text-[var(--muted-foreground)]">
                No matching countries found.
              </p>
            ) : (
              filteredCountries.map((option, index) => {
                const isSelected = option.code === selectedOption.code;
                const showDivider = !searchQuery.trim() && index === popularCount;
                return (
                  <div key={option.code}>
                    {showDivider && (
                      <div
                        className="my-1 border-t border-[var(--border)]"
                        role="separator"
                      />
                    )}
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelectCountry(option.code)}
                      className={`flex w-full items-center justify-between gap-2.5 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[oklch(96%_0.025_252)] font-semibold text-[var(--primary)]"
                          : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <CountryFlag code={option.code} title={option.name} />
                        <span className="truncate">{option.name}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="tabular-nums text-[var(--muted-foreground)]">
                          {option.dialCode}
                        </span>
                        {isSelected && (
                          <Check
                            className="h-3.5 w-3.5 text-[var(--primary)]"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
