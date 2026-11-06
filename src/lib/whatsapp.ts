import { siteConfig } from "../config/site.ts";
import { servicePreviews } from "../config/home.ts";

/**
 * Booking opens a WhatsApp conversation rather than reserving an appointment.
 * Do not put personal birth details into the prefilled message.
 */
export function getConsultationWhatsAppUrl(service?: string): string {
  const selectedService = service?.trim().replace(/\s+/g, " ").slice(0, 100);
  const message = selectedService
    ? `Hello, I would like to book a ${selectedService} consultation with SmartJyotishi. Please share available slots.`
    : "Hello, I would like to book a consultation with SmartJyotishi. Please share available slots.";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Resolve untrusted query strings only against the six approved service slugs. */
export function getConsultationWhatsAppUrlForSlug(slug?: string | null): string {
  const service = servicePreviews.find((item) => item.slug === slug);
  return getConsultationWhatsAppUrl(service?.title);
}
