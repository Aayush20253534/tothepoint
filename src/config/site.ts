/** Only business details explicitly confirmed by the client are stored here. */
export const siteConfig = {
  name: "SmartJyotishi",
  astrologer: "Hariom Shrivastava",
  tagline: "Guidance • Clarity • Better Tomorrow",
  whatsappNumber: "917007962637",
  contactEmail: "tothepointastrology@gmail.com",
  // Confirmed by the owner on 6 November 2026. Street address, Maps URL and
  // opening hours are not yet supplied; never infer them from the city.
  location: { city: "Prayagraj", region: "Uttar Pradesh", country: "IN" },
  languages: ["Hindi", "English"],
  onlineConsultations: true,
  timeZone: "Asia/Kolkata",
  services: [
    { slug: "kundli-analysis", name: "Kundli Analysis" },
    { slug: "marriage-relationship", name: "Marriage & Relationship Guidance" },
    { slug: "career-guidance", name: "Career Guidance" },
    { slug: "numerology", name: "Numerology Consultation" },
    { slug: "vastu", name: "Vastu Consultation" },
    { slug: "muhurat", name: "Muhurat Guidance" },
  ],
} as const;
