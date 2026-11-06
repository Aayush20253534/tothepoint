import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { servicePreviews, frequentlyAskedQuestions } from "../src/config/home.ts";
import { getConsultationWhatsAppUrl } from "../src/lib/whatsapp.ts";

const source = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("all six service previews have unique slugs and descriptions", () => {
  assert.equal(servicePreviews.length, 6);
  assert.equal(new Set(servicePreviews.map((s) => s.slug)).size, 6);
  assert.ok(servicePreviews.every((s) => s.title.length && s.description.length));
});

test("every service resolves to the confirmed WhatsApp number", () => {
  for (const service of servicePreviews) {
    const url = new URL(getConsultationWhatsAppUrl(service.title));
    assert.equal(url.pathname, "/917007962637");
    assert.ok(url.searchParams.get("text")?.includes(service.title));
  }
});

test("FAQ includes direct booking guidance and appropriate limitations", () => {
  assert.ok(frequentlyAskedQuestions.length >= 4);
  assert.ok(frequentlyAskedQuestions.some((item) => item.answer.includes("7007962637")));
  assert.ok(frequentlyAskedQuestions.some((item) => item.answer.includes("does not guarantee outcomes")));
});

test("homepage uses the shared design system and direct booking integration", () => {
  const page = source("src/app/page.tsx");
  for (const tag of ["Container", "ActionLink", "Image", "AstrologerVisual", "servicePreviews", "WhatsAppBookingLink"]) {
    assert.ok(page.includes(tag), tag);
  }
  assert.ok(!page.includes("Priya Sharma"));
  assert.ok(!page.includes("1000+"));
});

test("all six completed service routes are statically generated with metadata", () => {
  const page = source("src/app/services/[slug]/page.tsx");
  assert.match(page, /generateStaticParams/);
  assert.match(page, /serviceProfiles/);
  assert.match(page, /generateMetadata/);
  assert.doesNotMatch(page, /index: false, follow: false/);
  assert.match(page, /<WhatsAppBookingLink service=\{service.title\}/);
});

test("homepage presents services, consultation options and booking information in order", () => {
  const page = source("src/app/page.tsx");
  const order = [
    "<HomeHero/>", "<ServicesOverview/>", "<ConsultationOptions/>", "<MeetTheAstrologer/>",
    "<BookingSteps/>", "<HomeFaq/>", "<ClosingCallToAction/>",
  ];
  let previous = -1;
  for (const section of order) {
    const index = page.indexOf(section);
    assert.ok(index > previous, section + " is missing or out of order");
    previous = index;
  }
  const styles = source("src/app/homepage.css");
  for (const name of ["home-paper", "home-hero-image", "home-step-connector", "home-final-sky"]) {
    assert.ok(styles.includes(name));
  }
});

test("homepage keeps all service routes discoverable without unverifiable business claims", () => {
  const page = source("src/app/page.tsx");
  const footer = source("src/components/layout/site-footer.tsx");
  assert.match(page, /servicePreviews\.map/);
  assert.match(footer, /servicePreviews\.map/);
  for (const absent of ["1000+", "10+ Years", "100% genuine", "Indore", "1999", "guaranteed success"]) {
    assert.ok(!page.includes(absent), "Unverified claim: " + absent);
  }
});

test("homepage hero uses the exact generated image asset with responsive rendering", () => {
  const page = source("src/app/page.tsx");
  const css = source("src/app/homepage.css");
  assert.ok(page.includes('src="/images/hero-astrologer.png"'));
  assert.match(page, /priority/);
  assert.match(page, /sizes="100vw"/);
  assert.doesNotMatch(page, /home-hero-monogram|home-hero-figure/);
  assert.match(css, /home-hero-image/);
  assert.match(css, /object-position: 74% 45%/);
});

test("hero uses available desktop viewport height and mobile-safe sizing", () => {
  const styles = source("src/app/homepage.css");
  const header = source("src/components/layout/site-header.tsx");
  const global = source("src/app/globals.css");
  const page = source("src/app/page.tsx");
  assert.match(styles, /100svh - 74px/);
  assert.match(styles, /max-height:740px/);
  assert.match(styles, /home-hero-button/);
  assert.doesNotMatch(styles, /min-height: 590px/);
  const hero = page.slice(page.indexOf("function HomeHero()"),page.indexOf("function ValuesStrip()"));
  assert.doesNotMatch(hero, /Breadcrumb/);
  assert.match(header, /document.body.style.overflow = "hidden"/);
  assert.match(global, /font-size: 16px !important/);
});
