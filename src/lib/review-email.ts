import { siteConfig } from "../config/site.ts";
import { testimonialCategories, type TestimonialCategory } from "../config/testimonials.ts";

export type FeedbackDraft = {
  displayName: string;
  category: TestimonialCategory | "";
  rating: number;
  message: string;
  consentToPublish: boolean;
};

const allowed = new Set<string>(testimonialCategories.filter((item) => item.slug !== "all").map((item) => item.slug));

export function validateFeedback(draft: FeedbackDraft): string | null {
  if (!allowed.has(draft.category)) return "Select the service you want to review.";
  if (!Number.isInteger(draft.rating) || draft.rating < 1 || draft.rating > 5) return "Choose a rating from 1 to 5.";
  if (draft.displayName.trim().length > 70) return "Your display name must be 70 characters or less.";
  const length = draft.message.trim().length;
  if (length < 20 || length > 800) return "Write between 20 and 800 characters of feedback.";
  return null;
}

/** A draft email, NOT a delivered message or published review. */
export function createReviewEmailUrl(draft: FeedbackDraft): string {
  const issue = validateFeedback(draft);
  if (issue) throw new Error(issue);

  const category = testimonialCategories.find((item) => item.slug === draft.category);
  const body = [
    "SmartJyotishi - feedback for manual review",
    "",
    `Display name: ${draft.displayName.trim() || "Not provided"}`,
    `Consultation category: ${category?.label ?? ""}`,
    `Personal rating: ${draft.rating} / 5`,
    "",
    "Feedback:",
    draft.message.trim(),
    "",
    `Permission to publish this feedback with display name: ${draft.consentToPublish ? "YES" : "NO"}`,
    "This email is a submission for review. Do not publish without verification and approval.",
  ].join("\n");

  return `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("SmartJyotishi - client feedback")}&body=${encodeURIComponent(body)}`;
}
