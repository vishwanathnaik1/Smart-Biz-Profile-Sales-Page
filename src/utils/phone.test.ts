import assert from "node:assert/strict";
import test from "node:test";
import {
  detectCountryFromInternationalInput,
  formatPhoneForSubmission,
  getAllCountryOptions,
  validatePhoneNumber,
} from "./phone";

test("validatePhoneNumber accepts valid numbers for India, US, UK, and UAE", () => {
  const india = validatePhoneNumber("7507384721", "IN");
  assert.equal(india.isValid, true);
  assert.equal(india.e164, "+917507384721");
  assert.equal(india.formattedInternational, "+91 75073 84721");

  const us = validatePhoneNumber("(415) 555-2671", "US");
  assert.equal(us.isValid, true);
  assert.equal(us.e164, "+14155552671");

  const uk = validatePhoneNumber("7400 123456", "GB");
  assert.equal(uk.isValid, true);
  assert.equal(uk.e164, "+447400123456");

  const uae = validatePhoneNumber("50 123 4567", "AE");
  assert.equal(uae.isValid, true);
  assert.equal(uae.e164, "+971501234567");
});

test("validatePhoneNumber rejects wrong prefixes, wrong lengths, and dummy/repeated numbers", () => {
  // Invalid Indian starting digits (must be 6-9 for 10-digit Indian mobile numbers)
  assert.equal(validatePhoneNumber("1234567890", "IN").isValid, false);
  assert.equal(validatePhoneNumber("5123456789", "IN").isValid, false);
  assert.equal(validatePhoneNumber("0000000000", "IN").isValid, false);

  // Dummy repeated or sequential numbers even with valid starting digits
  assert.equal(validatePhoneNumber("9999999999", "IN").isValid, false);
  assert.equal(validatePhoneNumber("8888888888", "IN").isValid, false);
  assert.equal(validatePhoneNumber("9876543210", "IN").isValid, false);

  // Too short or too long
  assert.equal(validatePhoneNumber("75073847", "IN").isValid, false);
  assert.equal(validatePhoneNumber("750738472199", "IN").isValid, false);

  // Invalid characters
  assert.equal(validatePhoneNumber("75073abc21", "IN").isValid, false);

  // Invalid UAE prefix
  assert.equal(validatePhoneNumber("12 345 6789", "AE").isValid, false);

  // Invalid US toll-free number
  assert.equal(validatePhoneNumber("800 555 0199", "US").isValid, false);
});

test("detectCountryFromInternationalInput switches country when pasting + prefixed numbers", () => {
  const detectedUk = detectCountryFromInternationalInput("+44 7400 123456");
  assert.deepEqual(detectedUk, {
    country: "GB",
    nationalNumber: "7400123456",
  });

  const detectedIn = detectCountryFromInternationalInput("+91 75073 84721");
  assert.deepEqual(detectedIn, {
    country: "IN",
    nationalNumber: "7507384721",
  });

  assert.equal(detectCountryFromInternationalInput("7507384721"), null);
});

test("getAllCountryOptions puts India first and includes calling codes for global countries", () => {
  const options = getAllCountryOptions();
  assert.ok(options.length > 200);
  assert.equal(options[0].code, "IN");
  assert.equal(options[0].dialCode, "+91");
  assert.ok(options.some((opt) => opt.code === "US" && opt.dialCode === "+1"));
  assert.ok(options.some((opt) => opt.code === "AE" && opt.dialCode === "+971"));
});

test("formatPhoneForSubmission outputs international format with dial code", () => {
  assert.equal(formatPhoneForSubmission("7507384721", "IN"), "+91 75073 84721");
  assert.equal(formatPhoneForSubmission("50 123 4567", "AE"), "+971 50 123 4567");
});
