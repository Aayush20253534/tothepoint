import { pageMetadata } from "@/lib/metadata";
import { ConsultationOptions } from "@/components/booking/consultation-options";
import { blogPosts } from "@/config/blog";
import { getSiteOrigin, breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceArtwork } from "@/components/services/service-artwork";
import { ServiceGlyph } from "@/components/home/service-glyph";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { servicePreviews } from "@/config/home";
import { serviceProfiles } from "@/config/service-profiles";

type Props = { params: Promise<{ slug: string }> };

/** Only known, completed service routes are available. */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePreviews.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePreviews.find((item) => item.slug === slug);
  if (!service) return { title: "Service Not Found", robots: { index: false } };
  return pageMetadata(`/services/${service.slug}`, `${service.title} — Prayagraj & Online`,
    `${service.description} Consult Hariom Shrivastava in Prayagraj or online worldwide, in Hindi and English.`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicePreviews.find((item) => item.slug === slug);
  if (!service) notFound();
  const profile = serviceProfiles[service.slug];
  const guideCategory = ({ "kundli-analysis": "kundli", "marriage-relationship": "relationships", "career-guidance": "career", numerology: "numerology", vastu: "vastu", muhurat: "muhurat" } as const)[service.slug];
  const guide = blogPosts.find((post) => post.category === guideCategory);
  const relatedServices = servicePreviews.filter((item) => item.slug !== service.slug).slice(0,3);

  return (
    <>
      {getSiteOrigin() && <JsonLd data={[serviceSchema(getSiteOrigin()!, service), breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]) ]}/>} 
      {/* Hero and breadcrumbs */}
      <section aria-labelledby="service-title" className="page-hero page-hero-service-detail celestial-glow star-field relative isolate overflow-hidden border-b border-gold/25 bg-navy-deep">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-44 size-[640px] rounded-full bg-[radial-gradient(circle,rgba(194,133,54,.15),transparent_64%)] blur-xl" />
        <Container className="page-hero-inner relative grid items-center gap-10 pb-14 pt-10 lg:min-h-[570px] lg:grid-cols-[1.12fr_.88fr] lg:gap-12 lg:pb-20 lg:pt-12">
          <div className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/70 sm:text-sm">
                <li><Link href="/" className="rounded text-cream/75 transition-colors hover:text-gold-light">Home</Link></li>
                <li aria-hidden="true"><Icon name="chevron-right" size={15} className="text-gold" /></li>
                <li><Link href="/services" className="rounded text-cream/75 transition-colors hover:text-gold-light">Services</Link></li>
                <li aria-hidden="true"><Icon name="chevron-right" size={15} className="text-gold" /></li>
                <li aria-current="page" className="text-gold-light">{service.title}</li>
              </ol>
            </nav>
            <p className="eyebrow">SmartJyotishi • {service.title}</p>
            <h1 id="service-title" className="page-hero-title mt-5 font-display text-[clamp(3.15rem,5.6vw,5.65rem)] leading-[1.06] tracking-[-.035em] text-cream">
              {service.title}
            </h1>
            <p className="mt-5 font-display text-xl leading-snug text-gold-light sm:text-2xl">{profile.heroLine}</p>
            <p className="page-hero-lead mt-5 max-w-xl text-sm leading-8 text-cream/75 sm:text-base">{profile.introduction}</p>
            <div className="page-hero-actions mt-6 flex flex-wrap gap-3">
              <WhatsAppBookingLink service={service.title} icon="message">Book Consultation</WhatsAppBookingLink>
              <WhatsAppBookingLink service={service.title} variant="outline" icon="arrow-right">Chat on WhatsApp</WhatsAppBookingLink>
            </div>
            <p className="mt-6 max-w-lg text-xs leading-6 text-cream/65">
              Messaging us starts an enquiry, not a confirmed booking. Availability, consultation format and fees are agreed directly.
            </p>
          </div>
          <div className="page-hero-art relative mx-auto w-full max-w-[510px] overflow-hidden rounded-2xl border border-gold/35 bg-navy-soft/70 p-3 shadow-[0_25px_80px_rgba(0,0,0,.28)] sm:p-5">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,171,87,.17),transparent_60%)]" />
            <div className="relative overflow-hidden rounded-xl border border-gold/20">
              <ServiceArtwork name={service.icon} />
            </div>
            <div className="relative flex items-center gap-3 px-2 pb-1 pt-5 text-gold-light">
              <ServiceGlyph name={service.icon} size={34} />
              <span className="font-display text-lg text-cream">Traditional Perspectives, Personal Questions</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Honest trust highlights, without invented counts or ratings */}
      <section aria-label="Consultation information" className="bg-cream py-10 text-navy">
        <Container className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {[
            { icon: "message", heading: "Direct Enquiry", detail: "Book through a WhatsApp conversation" },
            { icon: "star", heading: "Your Questions", detail: "Choose which topics to discuss" },
            { icon: "shield", heading: "Clear Expectations", detail: "Confirm the session details in advance" },
            { icon: "calendar", heading: "Flexible Enquiry", detail: "Ask about availability before booking" },
          ].map((item, index) => (
            <div key={item.heading} className={["flex flex-col items-center px-4 text-center", index > 0 ? "lg:border-l lg:border-[#dcc6a9]" : ""].join(" ")}>
              <Icon name={item.icon as "message" | "star" | "shield" | "calendar"} size={33} className="text-[#a87530]" />
              <h2 className="mt-3 font-display text-lg font-semibold">{item.heading}</h2>
              <p className="mt-1 max-w-52 text-xs leading-6 text-[#4b514e]">{item.detail}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Service-specific explanation */}
      <section aria-labelledby="service-overview-heading" className="bg-navy-deep py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:gap-20">
          <div>
            <p className="eyebrow">Understanding the service</p>
            <h2 id="service-overview-heading" className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">
              {profile.overviewHeading}
            </h2>
            {profile.overview.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-3xl text-sm leading-8 text-cream/75 sm:text-base">{paragraph}</p>
            ))}
          </div>
          <aside aria-label="A note about the consultation" className="flex h-fit flex-col gap-4 rounded-xl border border-gold/30 bg-navy-soft/80 p-7 shadow-[0_12px_32px_rgba(0,0,0,.2)]">
            <Icon name="sparkles" size={35} className="text-gold" />
            <h3 className="font-display text-2xl text-cream">A Personal Perspective</h3>
            <p className="text-sm leading-7 text-muted">{profile.approachNote}</p>
            <p className="border-t border-gold/15 pt-4 text-xs leading-6 text-cream/65">
              Astrology is an interpretive tradition, not a guaranteed prediction or a replacement for professional medical, legal or financial advice.
            </p>
          </aside>
        </Container>
      </section>

      {/* Specific benefits (topics, not promises) */}
      <section aria-labelledby="focus-heading" className="celestial-glow star-field border-y border-gold/20 bg-navy py-16 sm:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="eyebrow">What we can discuss</p>
            <h2 id="focus-heading" className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">
              Topics Within <span className="gold-gradient-text">{service.title}</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">These are examples of subjects to explore, not promised outcomes or a fixed report package.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {profile.focus.map((item, index) => (
              <article key={item.title} className="rounded-xl border border-gold/30 bg-navy-deep/80 p-6 shadow-[0_14px_35px_rgba(0,0,0,.12)] transition-colors hover:border-gold/60 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/10 font-display text-lg text-gold-light">
                    {String(index + 1).padStart(2,"0")}
                  </span>
                  <h3 className="font-display text-xl leading-snug text-cream">{item.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Process is manual: no checkout or fictional scheduler */}
      <section aria-labelledby="process-heading" className="bg-cream py-16 text-navy sm:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow !text-[#9b6624]">Consultation process</p>
            <h2 id="process-heading" className="mt-3 font-display text-4xl sm:text-5xl">How It Works</h2>
            <p className="mt-4 text-sm leading-7 text-[#4d534e]">Four simple steps, all arranged through direct communication.</p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Choose Your Service", detail: `Select ${service.title} and prepare the main topic you want to discuss.`, icon: "star" },
              { title: "Send a Message", detail: "Open WhatsApp using the booking button. Your service name appears in the message.", icon: "message" },
              { title: "Agree on Details", detail: "Confirm the format, availability, scope and any fees directly.", icon: "calendar" },
              { title: "Discuss the Topic", detail: "Attend the agreed consultation and explore your questions.", icon: "sparkles" },
            ].map((step, index) => (
              <li key={step.title} className="relative rounded-xl border border-[#dfcdb3] bg-[#fffaf2] px-5 py-8 text-center shadow-[0_10px_27px_rgba(80,43,10,.06)]">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-[#caa064] bg-[#f7ead7] text-[#a57331]">
                  <Icon name={step.icon as "star" | "message" | "calendar" | "sparkles"} size={30} />
                </span>
                <p className="mt-4 text-xs font-semibold tracking-[.18em] text-[#a06d30]">STEP {index + 1}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#515750]">{step.detail}</p>
                {index < 3 && <span aria-hidden="true" className="absolute -right-4 top-12 z-10 hidden rounded-full bg-cream p-1 text-[#9c6e34] lg:block"><Icon name="arrow-right" size={18} /></span>}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Preparation and typical discussion outline replace invented PDF report previews */}
      <section aria-labelledby="preparation-heading" className="border-y border-gold/25 bg-navy-deep py-16 sm:py-24">
        <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="eyebrow">Preparing for your session</p>
            <h2 id="preparation-heading" className="mt-3 font-display text-4xl text-cream sm:text-5xl">Before You Enquire</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
              You can begin by sending only your service name and question. Further details are requested if relevant to the scope you agree on.
            </p>
            <ul className="mt-7 space-y-4">
              {profile.preparation.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-cream/80">
                  <Icon name="shield" size={20} className="mt-1 shrink-0 text-gold-light" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-gold/30 bg-navy-soft/65 p-7 sm:p-9">
            <p className="eyebrow">What to expect</p>
            <h3 className="mt-3 font-display text-2xl text-cream sm:text-3xl">An Agreed Consultation Scope</h3>
            <div className="mt-6 space-y-4">
              {[
                "Describe your question and the service that interests you.",
                "Confirm which information, if any, is needed for the discussion.",
                "Agree on the consultation format, fee and availability.",
                "Explore the selected subject without guaranteed results.",
              ].map((item, index) => (
                <div className="flex items-start gap-4 border-b border-gold/15 pb-4 last:border-0 last:pb-0" key={item}>
                  <span className="font-display text-xl text-gold-light">{String(index + 1).padStart(2,"0")}</span>
                  <p className="text-sm leading-7 text-cream/80">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs leading-6 text-muted">
              No report, remedy, follow-up session or particular outcome is included unless separately agreed.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing is deliberately not fabricated */}
      <section aria-labelledby="pricing-heading" className="bg-cream py-16 text-navy sm:py-20">
        <Container className="grid items-center gap-9 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow !text-[#a16b2b]">Consultation details</p>
            <h2 id="pricing-heading" className="mt-3 font-display text-4xl sm:text-5xl">Fees &amp; Availability</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4d514d] sm:text-base">
              To keep things accurate, consultation fees, duration, format and available dates are not listed without confirmation.
              Message us with the service you are interested in to discuss the options before committing.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#4d514d]">The website does not take payments or confirm appointments automatically.</p>
          </div>
          <div className="rounded-xl border border-[#d9bb90] bg-[#fff9ef] p-7 shadow-[0_16px_38px_rgba(80,48,12,.09)] sm:p-9">
            <div className="flex items-center gap-3">
              <Icon name="message" size={30} className="text-[#ad7630]" />
              <h3 className="font-display text-2xl">Discuss Your Consultation</h3>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#4d514d]">Ask about {service.title}, suitable options and current fees directly on WhatsApp.</p>
            <div className="mt-7">
              <WhatsAppBookingLink service={service.title} icon="message" className="w-full">Enquire on WhatsApp</WhatsAppBookingLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Service-specific FAQs */}
      <section aria-labelledby="service-faq-heading" className="bg-navy-deep py-16 sm:py-24">
        <Container>
          <div className="mx-auto mb-11 max-w-3xl text-center">
            <p className="eyebrow">Frequently asked questions</p>
            <h2 id="service-faq-heading" className="mt-3 font-display text-4xl text-cream sm:text-5xl">Questions About {service.title}</h2>
          </div>
          <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-2">
            {profile.questions.map((item) => (
              <details key={item.question} className="group h-fit rounded-xl border border-gold/25 bg-navy-soft/75 open:border-gold/60">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-semibold text-cream marker:content-none sm:px-6 [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span aria-hidden="true" className="shrink-0 text-gold transition-transform group-open:rotate-45">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </span>
                </summary>
                <p className="border-t border-gold/15 px-5 pb-5 pt-4 text-sm leading-7 text-muted sm:px-6">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <ConsultationOptions/>
      {guide && <section className="border-t border-gold/20 bg-navy-deep py-10"><Container><h2 className="font-display text-2xl text-cream">Learn before you book</h2><Link href={`/blog/${guide.slug}`} className="mt-4 inline-flex min-h-11 items-center text-sm text-gold-light underline underline-offset-4">{guide.title}</Link></Container></section>}

      {/* Related services provide navigation across all six pages */}
      <section aria-labelledby="related-heading" className="border-t border-gold/20 bg-navy py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow">Discover more</p>
              <h2 id="related-heading" className="mt-3 font-display text-3xl text-cream sm:text-4xl">Explore Other Services</h2>
            </div>
            <ActionLink href="/services" variant="outline" size="small" icon="arrow-right">All Services</ActionLink>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((related) => (
              <article key={related.slug} className="flex flex-col overflow-hidden rounded-xl border border-gold/25 bg-navy-deep">
                <ServiceArtwork name={related.icon} />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl text-cream">{related.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{related.description}</p>
                  <Link href={`/services/${related.slug}`} className="mt-5 inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-gold-light transition-colors hover:text-gold">
                    Learn More <Icon name="arrow-right" size={17}/>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="final-service-cta" className="celestial-glow star-field border-t border-gold/25 bg-navy-deep py-16 sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Start a conversation</p>
            <h2 id="final-service-cta" className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">Ready to Discuss {service.title}?</h2>
            <p className="mt-4 text-sm leading-7 text-muted">Message SmartJyotishi on WhatsApp and ask about your consultation.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppBookingLink service={service.title} icon="message">Book Consultation</WhatsAppBookingLink>
            <ActionLink href="/services" variant="outline" icon="arrow-right">All Services</ActionLink>
          </div>
        </Container>
      </section>
    </>
  );
}
