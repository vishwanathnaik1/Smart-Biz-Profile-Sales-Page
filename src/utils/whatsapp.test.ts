import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppMessage, buildWhatsAppUrl, validateLeadForm } from "./whatsapp";

test("validateLeadForm rejects empty or invalid fields with specific messages", () => {
  const errors = validateLeadForm({
    name: "",
    email: "invalid-email",
    businessType: "",
    whatsappNumber: "123",
  });

  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.businessType);
  assert.ok(errors.whatsappNumber);
});

test("validateLeadForm accepts valid lead details including 10-digit WhatsApp numbers", () => {
  const errors = validateLeadForm({
    name: "Vishwanath Naik",
    email: "vishunaik1229@gmail.com",
    businessType: "Freelancers & Consultants",
    whatsappNumber: "7507384721",
  });

  assert.deepEqual(errors, {});
});

test("buildWhatsAppMessage formats trimmed user details accurately", () => {
  const msg = buildWhatsAppMessage({
    name: "  Vishwanath Naik ",
    email: "vishunaik1229@gmail.com",
    businessType: "Freelancers & Consultants",
    whatsappNumber: " 7507384721 ",
  });

  assert.equal(
    msg,
    "Hi! I'm Vishwanath Naik. I run a Freelancers & Consultants business and I want to build my Smart Biz Profile. My WhatsApp number is 7507384721. Please share the next steps.",
  );
});

test("buildWhatsAppUrl generates properly encoded wa.me URL targeting +918329410074", () => {
  const url = buildWhatsAppUrl({
    name: "Vishwanath Naik",
    email: "vishunaik1229@gmail.com",
    businessType: "Freelancers & Consultants",
    whatsappNumber: "7507384721",
  });

  assert.equal(
    url,
    "https://wa.me/918329410074?text=Hi!%20I'm%20Vishwanath%20Naik.%20I%20run%20a%20Freelancers%20%26%20Consultants%20business%20and%20I%20want%20to%20build%20my%20Smart%20Biz%20Profile.%20My%20WhatsApp%20number%20is%207507384721.%20Please%20share%20the%20next%20steps.",
  );
});
