import assert from "node:assert/strict";
import test from "node:test";
import { NICHES_DATA } from "../data/nichesData.ts";
import { DEFAULT_NICHE_ID, getAllNicheIds, getNicheById } from "./nicheSelection.ts";

test("all nine business categories have unique tailored headlines, journeys, and mockups", () => {
  const ids = getAllNicheIds();
  assert.equal(ids.length, 9);

  const headlines = new Set(NICHES_DATA.map((n) => n.headline));
  const brandNames = new Set(NICHES_DATA.map((n) => n.mockup.brandName));
  assert.equal(headlines.size, 9);
  assert.equal(brandNames.size, 9);

  for (const niche of NICHES_DATA) {
    assert.ok(niche.showcaseItems.length >= 4 && niche.showcaseItems.length <= 6);
    assert.equal(niche.journeySteps.length, 5);
    assert.equal(niche.mockup.packages.length, 3);
  }
});

test("getNicheById resolves each niche cleanly and falls back to default niche", () => {
  assert.equal(DEFAULT_NICHE_ID, "tarot");
  assert.equal(getNicheById("resorts").label, "Resorts & Local Businesses");
  assert.equal(getNicheById("product-sellers").label, "Product Sellers");
  assert.equal(getNicheById("unknown-niche").id, DEFAULT_NICHE_ID);
});
