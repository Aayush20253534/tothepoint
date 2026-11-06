export type LegalKey = "privacy-policy" | "terms-and-conditions" | "refund-policy";
export type LegalSection = { title: string; body: string; bullets?: readonly string[] };
export type LegalDraft = {title: string; subtitle: string; warning: string; sections: readonly LegalSection[]};
export const legalDrafts: Record<LegalKey, LegalDraft> = {
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle: "How information is processed when you get in touch.",
    warning: "Draft pending approval. Actual retention periods and provider procedures must be verified by the operator before publishing as a final policy.",
    sections: [
      { title: "Information collected", body: "The contact form asks for name, email, subject, optional consultation service, message and agreement to process your enquiry. The form does not request birth date, medical records or official identity documents. Please avoid submitting sensitive information." },
      { title: "Purpose of processing", body: "Supplied contact information is used to email your enquiry to SmartJyotishi and respond. A message or WhatsApp link is not an appointment confirmation." },
      { title: "Service providers", body: "When configured, contact emails are sent through Resend to tothepointastrology@gmail.com. Vercel may process technical website request data as hosting provider. When you use WhatsApp, that platform's separate privacy practices apply." },
      { title: "Storage and retention", body: "The contact endpoint does not write to an application database. Messages may remain in recipient email inboxes and provider systems. The business must confirm exact retention periods and deletion procedures before this draft can be finalized." },
      { title: "Your choices and requests", body: "Visitors may contact the business by email or WhatsApp. The contact form requires agreement for replying. The testimonials form prepares an email in the visitor's email app; testimonials require separate verification and publication permission. Send data access, correction and deletion requests to tothepointastrology@gmail.com." },
      { title: "Security and changes", body: "Reasonable technical safeguards are used, but no online transmission can be guaranteed risk-free. This draft will be revised when operational practices are confirmed, subject to applicable law." },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    subtitle: "Website information and consultation enquiry terms.",
    warning: "Draft pending client and legal review. No unconfirmed fee, refund deadline, jurisdiction, service guarantee or business registration detail is asserted.",
    sections: [
      { title: "About the website", body: "SmartJyotishi provides educational information on traditional astrology practices and ways to enquire about consultations with Hariom Shrivastava. Such information is interpretive, not scientifically established prediction." },
      { title: "Booking and payment", body: "Book Consultation opens a WhatsApp enquiry. The contact form is also an enquiry only. Neither creates an automatic booking or payment. Availability, scope, fees, session format and deliverables must be agreed directly before paying." },
      { title: "No guaranteed outcomes", body: "Astrology, Vastu, numerology and Muhurat are traditional belief-based practices. No outcome is guaranteed. Website information does not substitute for qualified medical, mental-health, legal, engineering or financial advice." },
      { title: "Responsible use", body: "Do not misuse contact forms, submit unlawful material or attempt to interfere with site operation. Further intellectual-property permissions require confirmation by the operator." },
      { title: "Cancellation and refunds", body: "The website does not process payments. The operator must communicate actual cancellation, rescheduling and refund conditions in writing before payment. Applicable mandatory consumer rights are not excluded by this draft." },
      { title: "Contact and revisions", body: "To confirm terms or ask questions, contact tothepointastrology@gmail.com. Final legal identity, governing law, dispute process and effective date need operator confirmation." },
    ],
  },
  "refund-policy": {
    title: "Refund & Cancellation Policy",
    subtitle: "How to clarify payment, cancellation and refund questions.",
    warning: "Draft only. No refund percentages, non-refundable fees, cut-off times or payment processing timelines have been approved.",
    sections: [
      { title: "Before making a payment", body: "This website has no payment gateway. Confirm the consultation fee, service scope, booking status and cancellation or refund conditions in writing before sending payment." },
      { title: "Rescheduling and cancellation", body: "Contact the operator through the original booking channel as soon as you need to change a session. Any cut-offs or rescheduling fees must be agreed before payment. No such rules are established by this draft." },
      { title: "How to request a refund", body: "Email tothepointastrology@gmail.com with the consultation, transaction reference if any, booking correspondence and reason for the request. Do not include passwords, complete card numbers or ID documents." },
      { title: "Refund review", body: "Any eligibility, refund method, amount and processing period depend on the actual terms agreed for the transaction and applicable law. This website draft does not promise or deny a particular refund." },
      { title: "Consumer rights", body: "If the operator did not provide refund conditions, request written clarification. This draft does not waive statutory consumer protections." },
      { title: "Outstanding approvals", body: "The business must confirm rescheduling deadlines, missed-session rules, partial services, refund method, timelines and effective dates before approving and promoting this policy." },
    ],
  },
};
