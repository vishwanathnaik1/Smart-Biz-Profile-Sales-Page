import assert from "node:assert/strict";
import test from "node:test";
import { FOOTER_NAV_LINKS, getPageMeta, normalizePathname, type AppRoute } from "./routing";
import {
  buildContactMessage,
  buildContactWhatsAppUrl,
  validateContactForm,
} from "./contactForm";
import { buildCanonicalUrl, buildRouteStructuredData } from "./seo";

test("normalizePathname resolves all 5 dedicated footer routes and falls back cleanly", () => {
  assert.equal(normalizePathname("/"), "/");
  assert.equal(normalizePathname("/terms-and-conditions"), "/terms-and-conditions");
  assert.equal(normalizePathname("/privacy-policy/"), "/privacy-policy");
  assert.equal(normalizePathname("/DISCLAIMER"), "/disclaimer");
  assert.equal(normalizePathname("/refund-policy"), "/refund-policy");
  assert.equal(normalizePathname("/contact-us/"), "/contact-us");
  assert.equal(normalizePathname("/non-existent"), "/");
});

test("every footer link maps to unique metadata title and description", () => {
  assert.equal(FOOTER_NAV_LINKS.length, 5);
  const titles = new Set<string>();
  for (const link of FOOTER_NAV_LINKS) {
    const meta = getPageMeta(link.href);
    assert.ok(meta.title.includes("Smart Biz Profile"));
    assert.ok(meta.description.length > 20);
    titles.add(meta.title);
  }
  assert.equal(titles.size, 5);
});

test("SEO metadata targets Smart Business Profile cleanly and excludes digital business card", () => {
  const routes: AppRoute[] = [
    "/",
    "/terms-and-conditions",
    "/privacy-policy",
    "/disclaimer",
    "/refund-policy",
    "/contact-us",
  ];

  const homeMeta = getPageMeta("/");
  assert.ok(homeMeta.title.includes("Smart Business Profile"));
  assert.ok(homeMeta.description.includes("Smart Business Profile"));
  assert.ok(homeMeta.title.length >= 30 && homeMeta.title.length <= 60);
  assert.ok(homeMeta.description.length >= 120 && homeMeta.description.length <= 160);

  for (const route of routes) {
    const meta = getPageMeta(route);
    assert.ok(meta.title.length >= 30 && meta.title.length <= 60, `Title length for ${route}`);
    assert.ok(
      meta.description.length >= 120 && meta.description.length <= 160,
      `Description length for ${route}`,
    );
    assert.ok(!meta.title.toLowerCase().includes("digital business card"));
    assert.ok(!meta.description.toLowerCase().includes("digital business card"));
    assert.ok(meta.description.includes("Smart Business Profile"));
  }

  const homeLd = buildRouteStructuredData("https://smartbizprofile.in", "/") as {
    "@graph": Array<{ "@type": string; mainEntity?: unknown[] }>;
  };
  const faqNode = homeLd["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.ok(faqNode && Array.isArray(faqNode.mainEntity) && faqNode.mainEntity.length === 15);
  assert.equal(
    buildCanonicalUrl("https://smartbizprofile.in/", "/contact-us"),
    "https://smartbizprofile.in/contact-us",
  );
});

test("validateContactForm validates all required contact fields", () => {
  const invalid = validateContactForm({
    name: "A",
    email: "not-an-email",
    phone: "123",
    subject: "",
    message: "short",
  });
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.phone);
  assert.ok(invalid.subject);
  assert.ok(invalid.message);

  const valid = validateContactForm({
    name: "Riya Kapoor",
    email: "riya@example.com",
    phone: "+91 98765 43210",
    subject: "Customer Support",
    message: "Need help updating my services list on Smart Biz Profile.",
  });
  assert.deepEqual(valid, {});
});

test("buildContactWhatsAppUrl builds properly formatted wa.me enquiry URL", () => {
  const values = {
    name: "Riya Kapoor",
    email: "riya@example.com",
    phone: "+91 98765 43210",
    subject: "Sales Enquiries",
    message: "Interested in setting up Smart Biz Profile for my salon.",
  };
  const msg = buildContactMessage(values);
  assert.ok(msg.includes("Sales Enquiries"));
  assert.ok(msg.includes("Riya Kapoor"));

  const url = buildContactWhatsAppUrl(values);
  assert.ok(url.startsWith("https://wa.me/918329410074?text="));
  assert.ok(url.includes(encodeURIComponent("Sales Enquiries")));
});
