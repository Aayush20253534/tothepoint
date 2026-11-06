import { siteConfig } from "../config/site.ts";

/**
 * All contact submissions are validated server-side.
 * No birth dates, health history, IDs, documents or other sensitive details are requested.
 */
export type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  service: string;
  message: string;
  consent: true;
  website: string;
};

const serviceSlugs = new Set<string>(siteConfig.services.map((service) => service.slug));
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; errors: Record<string, string> };

function stringField(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateContactSubmission(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, errors: { form: "Invalid form submission." } };
  }
  const obj = value as Record<string, unknown>;
  const name = stringField(obj.name);
  const email = stringField(obj.email).toLowerCase();
  const subject = stringField(obj.subject);
  const service = stringField(obj.service);
  const message = stringField(obj.message);
  const website = stringField(obj.website);
  const consent = obj.consent === true;
  const errors: Record<string, string> = {};

  if (name.length < 2 || name.length > 80 || /[\r\n]/.test(name)) {
    errors.name = "Enter your name (2–80 characters).";
  }
  if (email.length > 254 || !emailPattern.test(email) || /[\r\n]/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (subject.length < 5 || subject.length > 120 || /[\r\n]/.test(subject)) {
    errors.subject = "Enter a subject (5–120 characters).";
  }
  if (service && !serviceSlugs.has(service)) {
    errors.service = "Choose a valid consultation service.";
  }
  if (message.length < 20 || message.length > 2000) {
    errors.message = "Enter a message of 20–2000 characters.";
  }
  if (!consent) {
    errors.consent = "Consent is required to process your enquiry.";
  }
  if (website.length > 500) {
    errors.website = "Invalid form submission.";
  }

  return Object.keys(errors).length
    ? { success: false, errors }
    : { success: true, data: { name, email, subject, service, message, consent: true, website } };
}

export function prepareContactEmail(data: ContactSubmission): {
  subject: string; text: string; replyTo: string;
} {
  const serviceName = siteConfig.services.find((item) => item.slug === data.service)?.name ?? "General enquiry";
  return {
    subject: `Website enquiry: ${data.subject}`,
    replyTo: data.email,
    text: [
      "SmartJyotishi – Website contact enquiry", "",
      `Name: ${data.name}`,
      `Reply email: ${data.email}`,
      `Topic: ${serviceName}`,
      `Subject: ${data.subject}`,
      "Consent: Yes, for responding to this enquiry", "",
      "Message:", data.message, "",
      "This is a contact enquiry, not a confirmed consultation booking.",
    ].join("\n"),
  };
}

export type MailDeliveryResult = { success: true; id: string } | { success: false; status: number };

export async function deliverContactEmail(
  data: ContactSubmission,
  config: { apiKey: string; from: string; to: string },
  sender: typeof fetch = fetch,
): Promise<MailDeliveryResult> {
  const body = prepareContactEmail(data);
  const response = await sender("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      subject: body.subject,
      reply_to: body.replyTo,
      text: body.text,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return { success: false, status: response.status };
  const payload: unknown = await response.json();
  const id = payload && typeof payload === "object" && "id" in payload
    && typeof payload.id === "string" ? payload.id : "";
  if (!id) return { success: false, status: 502 };
  return { success: true, id };
}
