import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  approvedReviews,
  approvedVideoReviews,
  filterReviews,
  getPublicVideoReviews,
  testimonialCategories,
} from "../src/config/testimonials.ts";
import { createReviewEmailUrl, validateFeedback } from "../src/lib/review-email.ts";
import { siteConfig } from "../src/config/site.ts";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const draft = {
  displayName: "Example Reviewer",
  category: "kundli",
  rating: 4,
  message: "This is a test of the feedback email composition feature.",
  consentToPublish: false,
};

test("the testimonials route is dedicated and not the old placeholder", () => {
  const nav = read("src/config/navigation.ts");
  assert.doesNotMatch(nav, /\n\s*testimonials: \{ title:/);
  const page = read("src/app/testimonials/page.tsx");
  for (const token of ["export const metadata", "ReviewBrowser", "ReviewForm", "VideoStories", "WhatsAppBookingLink", "approvedReviews", "approvedVideoReviews"]) {
    assert.ok(page.includes(token), token);
  }
});

test("the page has no fictional testimonials, ratings or videos", () => {
  assert.equal(approvedReviews.length, 0);
  assert.equal(approvedVideoReviews.length, 0);
  assert.equal(getPublicVideoReviews(approvedVideoReviews).length, 0);
  const page = read("src/app/testimonials/page.tsx");
  assert.match(page, /robots: \{ index: hasPublicReviews && isIndexingAllowed\(\), follow: true \}/);
  assert.doesNotMatch(page, /1000\+|4\.9\/5|five.star experience|Priya Sharma/);
});

test("review categories are unique and cover the six astrology services", () => {
  assert.equal(testimonialCategories.length, 7);
  assert.equal(new Set(testimonialCategories.map((item) => item.slug)).size, 7);
  assert.equal(testimonialCategories[0].slug, "all");
});

test("review filtering only displays approved, consented reviews", () => {
  const reviews = [
    { id: "a", name: "A", category: "kundli", quote: "Comment A", approved: true, consentToPublish: true },
    { id: "b", name: "B", category: "kundli", quote: "Comment B", approved: false, consentToPublish: true },
    { id: "c", name: "C", category: "career", quote: "Comment C", approved: true, consentToPublish: false },
    { id: "d", name: "D", category: "career", quote: "Comment D", approved: true, consentToPublish: true },
  ];
  assert.deepEqual(filterReviews(reviews, "all").map((v) => v.id), ["a", "d"]);
  assert.deepEqual(filterReviews(reviews, "kundli").map((v) => v.id), ["a"]);
  assert.deepEqual(filterReviews(reviews, "muhurat"), []);
});

test("videos require approval, consent and safe local paths", () => {
  const samples = [
    { id: "yes", name: "A", category: "kundli", caption: "Example", videoPath: "/videos/approved.mp4", approved: true, consentToPublish: true },
    { id: "no-permission", name: "B", category: "kundli", caption: "Example", videoPath: "/videos/unapproved.mp4", approved: true, consentToPublish: false },
    { id: "unsafe", name: "C", category: "kundli", caption: "Example", videoPath: "/videos/../secret.mp4", approved: true, consentToPublish: true },
    { id: "external", name: "D", category: "kundli", caption: "Example", videoPath: "https://other.example/video.mp4", approved: true, consentToPublish: true },
  ];
  assert.deepEqual(getPublicVideoReviews(samples).map((v) => v.id), ["yes"]);
});

test("review email points to the confirmed inbox with consent correctly recorded", () => {
  assert.equal(validateFeedback(draft), null);
  const uri = createReviewEmailUrl(draft);
  assert.ok(uri.startsWith(`mailto:${siteConfig.contactEmail}?`));
  const parsed = new URL(uri);
  assert.match(parsed.searchParams.get("body") ?? "", /Permission to publish.*NO/);
  assert.match(parsed.searchParams.get("body") ?? "", /Example Reviewer/);
  assert.match(parsed.searchParams.get("body") ?? "", /Personal rating: 4 \/ 5/);
  const withConsent = new URL(createReviewEmailUrl({...draft, consentToPublish: true }));
  assert.match(withConsent.searchParams.get("body") ?? "", /Permission to publish.*YES/);
});

test("invalid rating, category or feedback is rejected before preparing email", () => {
  assert.match(validateFeedback({...draft, category: "all" }), /Select the service/);
  assert.match(validateFeedback({...draft, rating: 0 }), /rating/);
  assert.match(validateFeedback({...draft, rating: 6 }), /rating/);
  assert.match(validateFeedback({...draft, message: "too short" }), /20 and 800/);
  assert.match(validateFeedback({...draft, message: "x".repeat(801) }), /20 and 800/);
  assert.throws(() => createReviewEmailUrl({...draft, message: ""}));
});

test("feedback does not pretend to send or auto-publish", () => {
  const form = read("src/components/testimonials/review-form.tsx");
  assert.match(form, /window.location.href = createReviewEmailUrl\(draft\)/);
  assert.match(form, /Your review has not been submitted or published/);
  assert.match(form, /Leave unchecked for private feedback only/);
  assert.match(form, /aria-pressed/);
});

test("category filters and empty states are interactive and accessible", () => {
  const browser = read("src/components/testimonials/review-browser.tsx");
  assert.ok(browser.trimStart().startsWith('"use client"'));
  assert.match(browser, /setCategory\(item.slug\)/);
  assert.match(browser, /filterReviews\(approvedReviews, category\)/);
  assert.match(browser, /aria-live="polite"/);
});
