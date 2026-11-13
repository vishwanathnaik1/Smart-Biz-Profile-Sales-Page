import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppMessage, buildWhatsAppUrl, validateLeadForm } from "./whatsapp";

test("validateLeadForm rejects empty fields with specific messages", () => {
  const errors = validateLeadForm({
    name: "",
    businessType: "",
    whatsappNumber: "123",
  });

  assert.ok(errors.name);
  assert.ok(errors.businessType);
  assert.ok(errors.whatsappNumber);
});

test("validateLeadForm accepts valid lead details", () => {
  const errors = validateLeadForm({
    name: "Nisha Sharma",
    businessType: "Tarot Readers",
    whatsappNumber: "+91 98765 43210",
  });

  assert.deepEqual(errors, {});
});

test("buildWhatsAppMessage formats trimmed user details", () => {
  const msg = buildWhatsAppMessage({
    name: "  Nisha Sharma ",
    businessType: "Tarot Readers",
    whatsappNumber: " +91 98765 43210 ",
  });

  assert.equal(
    msg,
    "Hi! I'm Nisha Sharma. I run a Tarot Readers business and I want to build my Smart Biz Profile. My WhatsApp number is +91 98765 43210. Please share the next steps.",
  );
});

test("buildWhatsAppUrl generates properly encoded wa.me URL", () => {
  const url = buildWhatsAppUrl({
    name: "Nisha Sharma",
    businessType: "Tarot Readers",
    whatsappNumber: "+91 98765 43210",
  });

  assert.equal(
    url,
    "https://wa.me/919845881387?text=Hi!%20I'm%20Nisha%20Sharma.%20I%20run%20a%20Tarot%20Readers%20business%20and%20I%20want%20to%20build%20my%20Smart%20Biz%20Profile.%20My%20WhatsApp%20number%20is%20%2B91%2098765%2043210.%20Please%20share%20the%20next%20steps.",
  );
});
