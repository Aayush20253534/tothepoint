import Link from "next/link";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";
import { servicePreviews } from "@/config/home";
import type { ConsultationContent } from "@/config/consultations";
import { breadcrumbSchema, consultationSchema, getSiteOrigin } from "@/lib/seo";

export function ConsultationPage({ content }: { content: ConsultationContent }) {
  const origin = getSiteOrigin();
  return (
    <>
      {origin && <JsonLd data={[
        breadcrumbSchema(origin, [{ name: "Home", path: "/" }, { name: content.label, path: content.path }]),
        consultationSchema(origin, content.path, content.title, content.description, content.online),
      ]}/>}
      <section className="celestial-glow border-b border-gold/25 bg-navy-deep py-10 sm:py-16" aria-labelledby="consultation-title">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-9 text-sm text-muted"><ol className="flex flex-wrap gap-3"><li><Link href="/" className="hover:text-gold-light">Home</Link></li><li aria-hidden="true">/</li><li aria-current="page">{content.label}</li></ol></nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="consultation-title" className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.08] tracking-tight text-cream">{content.heading}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted">{content.lead}</p>
              <div className="mt-7"><WhatsAppBookingLink service={content.bookingService} icon="message">Enquire about a consultation</WhatsAppBookingLink></div>
            </div>
            <aside aria-label={content.detailTitle} className="rounded-2xl border border-gold/30 bg-navy p-6 sm:p-8">
              <p className="eyebrow">SmartJyotishi</p>
              <h2 className="mt-3 font-display text-2xl text-gold-light">{content.detailTitle}</h2>
              <dl className="mt-6 space-y-5">{content.details.map(([label, value]) => <div key={label} className="border-t border-gold/15 pt-4"><dt className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt><dd className="mt-2 text-sm leading-7 text-cream">{value}</dd></div>)}</dl>
            </aside>
          </div>
        </Container>
      </section>
      <section className="bg-cream py-14 text-navy sm:py-20" aria-labelledby="consultation-overview">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div><h2 id="consultation-overview" className="font-display text-3xl sm:text-4xl">{content.sectionTitle}</h2>{content.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5 text-sm leading-8 text-[#414b55]">{paragraph}</p>)}<Link href="/about" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#81521b] underline underline-offset-4">Meet Hariom Shrivastava<Icon name="arrow-right" size={16}/></Link></div>
          <div className="rounded-2xl border border-[#d9c5a6] bg-[#fffaf2] p-6 sm:p-8"><h2 className="font-display text-2xl">{content.preparationTitle}</h2><ol className="mt-6 space-y-6">{content.preparation.map((step, index) => <li key={step} className="flex gap-4 text-sm leading-7 text-[#414b55]"><span className="font-display text-xl text-[#81521b]">0{index + 1}</span><span>{step}</span></li>)}</ol></div>
        </Container>
      </section>
      <section className="bg-navy py-14 sm:py-20" aria-labelledby="consultation-services">
        <Container><p className="eyebrow">Find your topic</p><h2 id="consultation-services" className="mt-3 font-display text-3xl text-cream sm:text-4xl">Choose a consultation service</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{servicePreviews.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-xl border border-gold/25 bg-navy-deep p-6 hover:border-gold/70"><h3 className="font-display text-xl text-gold-light">{service.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{service.description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm text-gold-light">View consultation details<Icon name="arrow-right" size={16}/></span></Link>)}</div></Container>
      </section>
      <section className="bg-navy-deep py-14 sm:py-20" aria-labelledby="consultation-faq">
        <Container className="max-w-4xl"><h2 id="consultation-faq" className="font-display text-3xl text-cream sm:text-4xl">Before you book</h2><div className="mt-8 space-y-3">{content.questions.map((faq) => <details key={faq.question} className="rounded-xl border border-gold/25 bg-navy p-5 open:border-gold/60"><summary className="cursor-pointer text-base font-semibold leading-7 text-cream">{faq.question}</summary><p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p></details>)}</div></Container>
      </section>
      <section className="border-y border-gold/20 bg-navy py-12">
        <Container className="flex flex-wrap items-center justify-between gap-6"><div><h2 className="font-display text-2xl text-cream">Prepare for your conversation</h2><div className="mt-4 flex flex-col gap-3 text-sm text-gold-light"><Link className="underline underline-offset-4" href="/blog/preparing-for-an-astrology-consultation">What to prepare before a consultation</Link><Link className="underline underline-offset-4" href={content.online ? "/astrologer-in-prayagraj" : "/online-astrology-consultation"}>{content.online ? "Visiting Prayagraj? Plan an office consultation" : "Outside Prayagraj? Explore online consultations"}</Link></div></div><WhatsAppBookingLink service={content.bookingService} icon="message">Discuss fees &amp; availability</WhatsAppBookingLink></Container>
      </section>
    </>
  );
}
