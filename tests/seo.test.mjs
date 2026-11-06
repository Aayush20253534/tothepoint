import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { blogPosts } from "../src/config/blog.ts";
import { servicePreviews } from "../src/config/home.ts";
import { consultationPages } from "../src/config/consultations.ts";
import {
  normalizeSiteOrigin, getSiteOrigin, isIndexingAllowed, canonicalPath, getIndexablePaths,
  organizationSchema, websiteSchema, personSchema, serviceSchema, articleSchema, breadcrumbSchema, consultationSchema,
} from "../src/lib/seo.ts";

test("canonical domains must be public HTTPS origins", () => {
  assert.equal(normalizeSiteOrigin("https://smartjyotishi.example.com/"), "https://smartjyotishi.example.com");
  for (const value of [undefined, "http://localhost:3000", "https://localhost", "https://your-website.example", "https://example.test",
    "https://a.com/path", "https://a.com/?test=1", "https://a.com/#frag", "https://a.com@localhost", "http://example.com"]) {
    assert.equal(normalizeSiteOrigin(value), null, value);
  }
  assert.equal(getSiteOrigin({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }), null);
});

test("production uses a stable configured domain or the production alias, never a deployment URL", () => {
  const production = { VERCEL_ENV: "production", VERCEL_PROJECT_PRODUCTION_URL: "site.vercel.app", VERCEL_URL: "unique-preview.vercel.app" };
  assert.equal(getSiteOrigin(production), "https://site.vercel.app");
  assert.equal(isIndexingAllowed(production), true);
  assert.equal(getSiteOrigin({ ...production, NEXT_PUBLIC_SITE_URL: "https://business.example.com" }), "https://business.example.com");
  assert.equal(getSiteOrigin({ VERCEL_ENV: "production", VERCEL_URL: production.VERCEL_URL }), null);
  assert.equal(getSiteOrigin({ ...production, SEO_ALLOW_VERCEL_DOMAIN: "false" }), null);
});

test("preview and development builds remain noindex even when production variables are inherited", () => {
  for (const VERCEL_ENV of ["preview", "development"]) {
    assert.equal(isIndexingAllowed({ VERCEL_ENV, NEXT_PUBLIC_SITE_URL: "https://business.example.com" }), false);
    assert.equal(getSiteOrigin({ VERCEL_ENV, VERCEL_PROJECT_PRODUCTION_URL: "site.vercel.app" }), null);
  }
  assert.equal(isIndexingAllowed({ NEXT_PUBLIC_SITE_URL: "https://business.example.com", SEO_INDEXING_DISABLED: "true" }), false);
  assert.equal(isIndexingAllowed({}), false);
});

test("canonicals exclude queries, fragments and external paths", () => {
  assert.equal(canonicalPath("/services", "https://business.example.com"), "https://business.example.com/services");
  assert.equal(canonicalPath("/", null), undefined);
  for (const path of ["//other.com", "/blog?draft=true", "/#fragment"]) assert.equal(canonicalPath(path, "https://business.example.com"), undefined);
});

test("sitemap includes all public local, global, service and guide pages with no drafts or duplicates", () => {
  const paths = getIndexablePaths();
  assert.equal(paths.length, 7 + servicePreviews.length + blogPosts.length);
  assert.equal(new Set(paths).size, paths.length);
  for (const path of ["/astrologer-in-prayagraj", "/online-astrology-consultation", ...servicePreviews.map(s => `/services/${s.slug}`), ...blogPosts.map(p => `/blog/${p.slug}`)]) assert.ok(paths.includes(path), path);
  for (const path of ["/api/contact", "/booking", "/privacy-policy", "/terms-and-conditions", "/refund-policy", "/testimonials"]) assert.ok(!paths.includes(path), path);
});

test("business schema uses confirmed city, contact and language facts without inventing an address or ratings", () => {
  const origin = "https://business.example.com";
  const business = organizationSchema(origin);
  assert.equal(business["@type"], "LocalBusiness");
  assert.equal(business.name, "SmartJyotishi");
  assert.equal(business.address.addressLocality, "Prayagraj");
  assert.equal(business.telephone, "+917007962637");
  assert.equal(business.email, "tothepointastrology@gmail.com");
  assert.ok(existsSync(new URL("../public/images/smartjyotishi-logo.webp", import.meta.url)));
  for (const field of ["aggregateRating", "streetAddress", "postalCode", "openingHours", "geo", "priceRange"]) assert.ok(!JSON.stringify(business).includes(field), field);
  assert.equal(websiteSchema(origin).publisher["@id"], business["@id"]);
  assert.equal(personSchema(origin).name, "Hariom Shrivastava");
  assert.equal(serviceSchema(origin, servicePreviews[0]).provider["@id"], business["@id"]);
  assert.equal(articleSchema(origin, blogPosts[0]).headline, blogPosts[0].title);
  assert.ok(!JSON.stringify(articleSchema(origin, blogPosts[0])).includes("datePublished"));
  assert.equal(breadcrumbSchema(origin, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]).itemListElement[1].position, 2);
});

test("local and global service data matches the visible page scope", () => {
  for (const page of Object.values(consultationPages)) {
    const schema = consultationSchema("https://business.example.com", page.path, page.title, page.description, page.online);
    assert.equal(schema.description, page.description);
    assert.deepEqual(schema.availableChannel.availableLanguage, ["Hindi", "English"]);
    assert.ok(page.questions.length >= 4);
    if (page.online) assert.equal(schema.areaServed, "Worldwide");
    else assert.equal(schema.areaServed.name, "Prayagraj");
  }
});
