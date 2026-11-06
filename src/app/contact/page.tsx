import { pageMetadata } from "@/lib/metadata";
import { getSiteOrigin, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { CelestialArt } from "@/components/ui/celestial-art";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { ConsultationOptions } from "@/components/booking/consultation-options";

export const metadata = pageMetadata(
  "/contact",
  "Contact & Prayagraj Office",
  "Contact Hariom Shrivastava for a Prayagraj office visit or online astrology consultation worldwide. WhatsApp +91 7007962637. Hindi and English.",
);

function ContactHero() {
  return (
    <section aria-labelledby="contact-heading" className="page-hero page-hero-contact celestial-glow star-field relative overflow-hidden border-b border-gold/20 bg-navy-deep">
      <Container className="page-hero-inner grid items-center gap-7 pb-14 pt-10 lg:min-h-[490px] lg:grid-cols-[1.1fr_.9fr] lg:pb-16">
        <div className="max-w-2xl">
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-9">
            <ol className="flex items-center gap-2 text-sm text-cream/75">
              <li><Link href="/" className="hover:text-gold-light">Home</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={16} className="text-gold"/></li>
              <li aria-current="page" className="text-gold-light">Contact</li>
            </ol>
          </nav>
          <p className="eyebrow">We are here to listen</p>
          <h1 id="contact-heading" className="page-hero-title mt-4 font-display text-[clamp(3.2rem,6vw,5.5rem)] leading-[1.07] text-cream">
            Get in <span className="gold-gradient-text">Touch</span>
          </h1>
          <p className="page-hero-lead mt-6 max-w-xl text-base leading-8 text-cream/75">
            Contact {siteConfig.astrologer} at SmartJyotishi in Prayagraj.
            Arrange an office visit or an online consultation worldwide in Hindi or English.
          </p>
          <div className="page-hero-actions mt-6 flex flex-wrap gap-3">
            <WhatsAppBookingLink>Book Consultation</WhatsAppBookingLink>
            <a href="#contact-form" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-gold/60 px-6 py-3 text-sm font-semibold text-gold-light hover:bg-gold/10">Send a Message <Icon name="arrow-right" size={16}/></a>
          </div>
        </div>
        <div className="page-hero-art mx-auto w-full max-w-[410px]"><CelestialArt className="opacity-90"/></div>
      </Container>
    </section>
  );
}

function ContactDetails() {
  return (
    <section aria-label="Contact options" className="border-b border-gold/20 bg-navy py-12 sm:py-16">
      <Container className="grid gap-5 md:grid-cols-3">
        {[
          { icon: "mail" as const, title: "Email Us", primary: siteConfig.contactEmail, secondary: "For general enquiries", href: `mailto:${siteConfig.contactEmail}` },
          { icon: "message" as const, title: "WhatsApp", primary: "+91 7007962637", secondary: "For consultation enquiries", href: "https://wa.me/917007962637" },
          { icon: "calendar" as const, title: "Prayagraj Office", primary: "Prayagraj, Uttar Pradesh", secondary: "By appointment. Confirm the exact address and directions before visiting.", href: "/astrologer-in-prayagraj" },
        ].map((option) => (
          <article key={option.title} className="surface-panel rounded-xl px-6 py-7">
            <span className="flex size-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
              <Icon name={option.icon} size={25}/>
            </span>
            <h2 className="mt-4 font-display text-xl text-cream">{option.title}</h2>
            <a className="mt-3 block break-all text-sm font-semibold text-gold-light underline-offset-4 hover:underline" href={option.href}>{option.primary}</a>
            <p className="mt-2 text-xs leading-6 text-muted">{option.secondary}</p>
          </article>
        ))}
      </Container>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      {getSiteOrigin() && <JsonLd data={breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])}/>} 
      <ContactHero/>
      <ContactDetails/>
      <ConsultationOptions/>
      <section id="contact-form" aria-labelledby="form-title" className="scroll-mt-24 border-b border-gold/20 bg-navy-deep py-16 sm:py-24">
        <Container className="grid gap-11 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Write to us</p>
            <h2 id="form-title" className="mt-4 font-display text-4xl text-cream sm:text-5xl">Send Your <span className="gold-gradient-text">Enquiry</span></h2>
            <p className="mt-5 max-w-md text-sm leading-8 text-muted">
              Tell us which service you are interested in. For online sessions, include your current city, country and preferred language. For an office visit, mention a convenient date.
            </p>
            <div className="mt-8 space-y-5 text-sm leading-6 text-cream/80">
              {[
                "The contact form does not create a booking.",
                "Availability and fees are confirmed separately.",
                "Avoid sharing birth details, documents, passwords or medical information in this form.",
              ].map((line)=><p key={line} className="flex items-start gap-3"><Icon name="shield" size={20} className="mt-1 shrink-0 text-gold"/>{line}</p>)}
            </div>
          </div>
          <div className="surface-panel relative rounded-2xl p-6 sm:p-9">
            <h3 className="mb-6 font-display text-2xl text-cream">Contact Form</h3>
            <ContactForm/>
          </div>
        </Container>
      </section>
      <section className="celestial-glow star-field bg-navy py-14">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow">Prefer a direct conversation?</p>
            <h2 className="mt-2 font-display text-3xl text-cream">Connect on WhatsApp</h2>
          </div>
          <WhatsAppBookingLink icon="message">Chat on WhatsApp</WhatsAppBookingLink>
        </Container>
      </section>
    </>
  );
}
