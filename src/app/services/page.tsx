import { ConsultationOptions } from "@/components/booking/consultation-options";
import { pageMetadata } from "@/lib/metadata";
import { getSiteOrigin, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import Link from "next/link";
import { ServiceArtwork } from "@/components/services/service-artwork";
import { ActionLink } from "@/components/ui/action-link";
import { CelestialArt } from "@/components/ui/celestial-art";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { servicePreviews } from "@/config/home";
import {
  bookingSteps,
  consultationBenefits,
  serviceDetails,
  serviceQuestions,
} from "@/config/services-overview";

export const metadata = pageMetadata(
  "/services",
  "Vedic Astrology Consultation Services",
  "Explore Kundli analysis, marriage compatibility, career astrology, numerology, Vastu and Muhurat consultations in Prayagraj and online worldwide.",
);

function ServicesHero() {
  return (
    <section aria-labelledby="services-hero-title" className="page-hero page-hero-services celestial-glow star-field relative isolate overflow-hidden border-b border-gold/20 bg-navy-deep">
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-32 size-[690px] rounded-full bg-[radial-gradient(circle,rgba(195,134,63,.17),transparent_63%)] blur-xl" />
      <Container className="page-hero-inner relative grid min-h-[560px] items-center gap-8 pb-12 pt-12 lg:grid-cols-[1.13fr_.87fr] lg:pb-16 lg:pt-16">
        <div className="relative z-10 max-w-[720px]">
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-9">
            <ol className="flex items-center gap-2 text-sm text-cream/75">
              <li><Link href="/" className="transition-colors hover:text-gold-light">Home</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={16} className="text-gold" /></li>
              <li aria-current="page" className="text-gold-light">Services</li>
            </ol>
          </nav>
          <p className="eyebrow">Explore traditional astrology</p>
          <h1 id="services-hero-title" className="page-hero-title mt-4 font-display text-[clamp(3.3rem,6vw,5.8rem)] leading-[1.05] tracking-[-.035em] text-cream">
            Our Astrology <span className="block gold-gradient-text">Services</span>
          </h1>
          <h2 className="mt-5 font-display text-xl leading-snug text-cream/95 sm:text-2xl">
            Practical questions. Personal conversations. Traditional perspectives.
          </h2>
          <p className="page-hero-lead mt-5 max-w-xl text-[15px] leading-8 text-cream/75 sm:text-base">
            Explore six consultation topics, from birth charts and relationships to Vastu and Muhurat.
            Discuss your questions with SmartJyotishi and arrange the details directly.
          </p>
          <div className="page-hero-actions mt-6 flex flex-wrap gap-3">
            <WhatsAppBookingLink icon="message">Book Consultation</WhatsAppBookingLink>
            <ActionLink href="#service-list" variant="outline" icon="arrow-right">Explore Services</ActionLink>
          </div>
        </div>
        <div aria-hidden="true" className="page-hero-art relative mx-auto w-full max-w-[520px]">
          <CelestialArt className="relative max-w-none drop-shadow-[0_0_48px_rgba(207,158,75,.19)]" />
          <div className="absolute bottom-[5%] right-0 rounded-lg border border-gold/35 bg-navy-deep/85 px-4 py-3 shadow-2xl backdrop-blur">
            <span className="font-display text-lg text-gold-light">Astrology &amp; Guidance</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BenefitStrip() {
  const items = [
    { icon: "message", title: "Personal Consultation", sub: "Discuss your individual questions" },
    { icon: "star", title: "Six Service Topics", sub: "Explore the guidance that interests you" },
    { icon: "sparkles", title: "Traditional Methods", sub: "Rooted in astrology practices" },
    { icon: "shield", title: "Direct Arrangements", sub: "Confirm details before booking" },
  ] as const;

  return (
    <section aria-label="Consultation highlights" className="border-b border-[#e8dcc9] bg-cream py-9 text-navy sm:py-12">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {items.map((item, index) => (
          <div key={item.title} className={["flex flex-col items-center px-5 text-center", index > 0 ? "lg:border-l lg:border-[#ddc9ad]" : ""].join(" ")}>
            <Icon name={item.icon} size={33} className="text-[#ad742b]" />
            <h2 className="mt-3 font-display text-lg font-semibold">{item.title}</h2>
            <p className="mt-1.5 max-w-56 text-xs leading-6 text-[#4b514d]">{item.sub}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function ServiceCards() {
  return (
    <section id="service-list" aria-labelledby="service-list-title" className="scroll-mt-24 bg-navy-deep py-16 sm:py-24">
      <Container>
        <div className="mx-auto mb-11 max-w-3xl text-center">
          <p className="eyebrow">Our services</p>
          <h2 id="service-list-title" className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Complete Astrology <span className="gold-gradient-text">Consultations</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Find a topic that matches your interests. Open an individual service page for more context
            or start a WhatsApp conversation to discuss an appointment.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {servicePreviews.map((service) => {
            const detail = serviceDetails[service.slug];
            return (
              <article key={service.slug} className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/35 bg-navy-soft/80 shadow-[0_20px_42px_rgba(0,0,0,.22)] transition-colors hover:border-gold/70">
                <ServiceArtwork name={service.icon} />
                <div className="flex flex-1 flex-col px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[.21em] text-gold-light">{detail.eyebrow}</p>
                  <h3 className="mt-2 font-display text-[26px] leading-snug text-cream">{service.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-cream/90">{detail.lead}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{detail.details}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={service.title + " topics"}>
                    {detail.topics.map((topic) => (
                      <li key={topic} className="rounded-full border border-gold/20 bg-navy-deep/65 px-3 py-1.5 text-xs text-cream/75">{topic}</li>
                    ))}
                  </ul>
                  <div className="mt-auto grid gap-2 pt-7 sm:grid-cols-2">
                    <ActionLink href={`/services/${service.slug}`} variant="outline" size="small" icon="arrow-right" className="w-full">
                      Know More
                    </ActionLink>
                    <WhatsAppBookingLink service={service.title} size="small" icon="message" className="w-full">
                      Book Consultation
                    </WhatsAppBookingLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section aria-labelledby="services-process-title" className="bg-cream py-16 text-navy sm:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow !text-[#754715]">Our consultation process</p>
          <h2 id="services-process-title" className="mt-3 font-display text-4xl sm:text-5xl">How It Works</h2>
          <p className="mt-4 text-sm leading-7 text-[#49514d]">Four simple steps, with availability and fees agreed before any appointment is arranged.</p>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col items-center rounded-xl border border-[#e2d3bf] bg-[#fffaf2] px-5 py-8 text-center shadow-[0_10px_28px_rgba(75,45,20,.06)]">
              <div className="flex size-16 items-center justify-center rounded-full border border-[#c89b5e] bg-[#f7ead6] text-[#ad7227]">
                <Icon name={step.icon} size={32} />
              </div>
              <p className="mt-5 text-[11px] font-bold tracking-[.2em] text-[#754715]">STEP {step.id}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b514e]">{step.description}</p>
              {index < bookingSteps.length - 1 && (
                <span aria-hidden="true" className="absolute -right-5 top-14 z-10 hidden rounded-full bg-cream p-1 text-[#754715] lg:block">
                  <Icon name="arrow-right" size={19}/>
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section aria-labelledby="services-benefits-title" className="celestial-glow star-field border-y border-gold/25 bg-navy py-16 sm:py-24">
      <Container>
        <div className="mx-auto mb-11 max-w-2xl text-center">
          <p className="eyebrow">What to expect</p>
          <h2 id="services-benefits-title" className="mt-3 font-display text-4xl text-cream sm:text-5xl">
            Why Explore Our <span className="gold-gradient-text">Services?</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {consultationBenefits.map((item) => (
            <article key={item.title} className="flex h-full flex-col items-center rounded-xl border border-gold/30 bg-navy-deep/70 px-5 py-8 text-center transition-colors hover:border-gold/60">
              <div className="flex size-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                <Icon name={item.icon} size={28}/>
              </div>
              <h3 className="mt-5 font-display text-xl text-cream">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReviewSection() {
  return (
    <section aria-labelledby="services-reviews-title" className="border-b border-[#e6d7c0] bg-cream py-14 text-navy sm:py-20">
      <Container className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="eyebrow !text-[#754715]">Client experiences</p>
          <h2 id="services-reviews-title" className="mt-3 font-display text-4xl sm:text-5xl">What People Say</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#4e514e]">
            We intend to share genuine experiences after client feedback has been verified and approved.
            No ratings, reviews or results are published without a valid source.
          </p>
        </div>
        <div className="rounded-xl border border-[#d9c4a4] bg-[#fffaf2] p-7 shadow-[0_12px_30px_rgba(65,40,15,.07)] sm:p-9">
          <Icon name="message" size={37} className="text-[#a86e2a]" />
          <h3 className="mt-4 font-display text-2xl">Real Feedback Matters</h3>
          <p className="mt-3 text-sm leading-7 text-[#4e514e]">Client testimonials will appear when they are ready for publication.</p>
          <Link href="/testimonials" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-[#925d24] underline-offset-4 hover:underline">
            Testimonials page <Icon name="arrow-right" size={18}/>
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ServicesFaq() {
  return (
    <section aria-labelledby="services-faq-title" className="bg-cream py-16 text-navy sm:py-24">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow !text-[#754715]">Helpful information</p>
          <h2 id="services-faq-title" className="mt-3 font-display text-4xl sm:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-sm leading-7 text-[#4e514e]">Answers about services, consultation arrangements and what to expect.</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2">
          {serviceQuestions.map((item) => (
            <details key={item.question} className="group h-fit rounded-lg border border-[#dfcdb1] bg-[#fffaf2] open:border-[#bd8f51]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span aria-hidden="true" className="shrink-0 text-[#9f681e] transition-transform group-open:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </summary>
              <div className="border-t border-[#e7d7bf] px-5 py-4 text-sm leading-7 text-[#4e514e]">{item.answer}</div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="services-cta-title" className="celestial-glow star-field relative overflow-hidden border-t border-gold/25 bg-navy-deep py-16 sm:py-20">
      <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-3xl">
          <p className="eyebrow">Start your conversation</p>
          <h2 id="services-cta-title" className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Ready to Explore Your <span className="gold-gradient-text">Questions?</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
            Contact SmartJyotishi on WhatsApp. A consultation is arranged only once the details are confirmed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <WhatsAppBookingLink icon="message">Book Consultation</WhatsAppBookingLink>
          <ActionLink href="/contact" variant="outline" icon="arrow-right">Contact Us</ActionLink>
        </div>
      </Container>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      {getSiteOrigin() && <JsonLd data={breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])}/>} 
      <ServicesHero />
      <BenefitStrip />
      <ServiceCards />
      <HowItWorks />
      <WhyChooseUs />
      <ReviewSection />
      <ServicesFaq />
      <FinalCta />
      <ConsultationOptions/>
    </>
  );
}
