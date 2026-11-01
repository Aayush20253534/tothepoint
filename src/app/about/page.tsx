import { canonicalPath, getSiteOrigin, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AboutCta } from "@/components/about/about-cta";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { aboutValues } from "@/config/about";
import { siteConfig } from "@/config/site";
import "./about-hero.css";

export const metadata: Metadata = {
  alternates: { canonical: canonicalPath("/about") },
  title: "About Hariom Shrivastava",
  description:
    "Get to know SmartJyotishi and Hariom Shrivastava, explore our traditional astrology consultation approach and connect directly through WhatsApp.",
  openGraph: {
    title: "About Hariom Shrivastava | SmartJyotishi",
    description:
      "Learn about our personal approach to traditional astrology and how to arrange a consultation.",
    type: "website",
  },
};

function AboutHero() {
  return (
    <section
      aria-labelledby="about-heading"
      className="page-hero page-hero-about about-photo-hero relative isolate overflow-hidden border-b border-gold/25 bg-navy-deep"
    >
      <div className="about-photo-hero-media">
        <Image
          src="/images/about-hero.png"
          alt="Astrology-themed portrait of Hariom Shrivastava with a glowing zodiac wheel, brass lamp and traditional books"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="about-photo-hero-image"
        />
      </div>
      <div className="about-photo-hero-shade" aria-hidden="true" />
      <Container className="page-hero-inner about-photo-hero-content relative z-10 flex items-center">
        <div className="about-photo-hero-copy w-full max-w-[590px]">
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-6">
            <ol className="flex items-center gap-2 text-sm text-cream/75">
              <li><Link href="/" className="transition-colors hover:text-gold-light">Home</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={15} className="text-gold" /></li>
              <li aria-current="page" className="text-gold-light">About</li>
            </ol>
          </nav>
          <h1 id="about-heading" className="page-hero-title about-photo-hero-title font-display text-cream">
            About <span className="block text-gold-light">Hariom Shrivastava</span>
          </h1>
          <h2 className="about-photo-hero-subtitle mt-5 font-display italic leading-snug text-cream">
            Meet the astrologer behind the consultations.
          </h2>
          <div aria-hidden="true" className="about-photo-hero-rule mt-5" />
          <p className="page-hero-lead about-photo-hero-lead mt-5 max-w-[540px] text-cream/90">
            Learn about {siteConfig.astrologer}, the traditional perspectives behind his consultations, and the principles that guide personal discussions.
          </p>
          <div className="page-hero-actions about-photo-hero-actions mt-7 flex flex-wrap gap-3">
            <WhatsAppBookingLink icon="message">Book a Consultation</WhatsAppBookingLink>
            <ActionLink href="/services" variant="outline">Explore Services</ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValuesStrip() {
  return (
    <section aria-label="Our values" className="bg-cream py-12 text-navy sm:py-14">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {aboutValues.map((value, index) => (
            <article key={value.title} className={["flex flex-col items-center px-5 text-center", index > 0 ? "lg:border-l lg:border-[#d9c6ac]" : ""].join(" ")}>
              <span className="mb-4 flex size-14 items-center justify-center rounded-full border border-[#cf9a51]/40 bg-[#f4e8d6] text-[#ad772d]">
                <Icon name={value.icon} size={30} />
              </span>
              <h2 className="font-display text-xl font-semibold">{value.title}</h2>
              <p className="mt-2 max-w-[260px] text-sm leading-6 text-[#4e514e]">{value.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


function OurStory() {
  return (
    <section aria-labelledby="story-heading" className="relative overflow-hidden border-y border-gold/20 bg-navy-deep py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="about-journey-portrait relative mx-auto aspect-[.98] w-full max-w-[470px] overflow-hidden rounded-[47%_47%_16px_16px] border border-gold/25">
          <Image src="/images/about-hero.png" alt="Traditional astrology portrait imagery" fill sizes="(max-width: 1024px) 90vw, 470px" className="object-cover object-[78%_50%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/35 to-transparent" />
        </div>
        <div>
          <p className="eyebrow">My Journey</p>
          <h2 id="story-heading" className="mt-3 font-display text-3xl leading-tight text-cream sm:text-5xl">From Curiosity to a Life of Astrology</h2>
          <p className="mt-5 text-[15px] leading-8 text-cream/75">My interest in astrology is rooted in the questions people ask about life, relationships and the decisions that shape their future. Traditional Vedic perspectives offer a way to reflect on those questions with care.</p>
          <p className="mt-4 text-[15px] leading-8 text-cream/75">Through SmartJyotishi, I aim to explain these ideas in an accessible way, with personal conversations and practical understanding at the centre of every consultation.</p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              ["Vedic", "Traditional knowledge"],
              ["Personal", "Individual guidance"],
              ["6", "Consultation topics"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-gold/25 bg-navy-soft/45 px-2 py-5 text-center">
                <strong className="block font-display text-2xl text-gold-light sm:text-3xl">{value}</strong>
                <span className="mt-2 block text-xs leading-5 text-cream/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ConsultationApproach() {
  return (
    <section id="our-approach" aria-labelledby="process-heading" className="about-approach-section star-field relative overflow-hidden border-y border-gold/20 bg-navy-deep py-14 sm:py-20">
      <Container className="relative z-10">
        <div className="mb-10 text-center">
          <h2 id="process-heading" className="font-display text-3xl text-gold-light sm:text-4xl">My Approach</h2>
          <p className="mt-3 text-sm text-cream/70">A balanced blend of ancient wisdom and modern understanding.</p>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {[
            { icon: "message" as const, title: "Understand", description: "Listen to your concerns and understand your personal goals." },
            { icon: "star" as const, title: "Interpret", description: "Explore traditional interpretations of relevant charts and topics." },
            { icon: "sparkles" as const, title: "Guide", description: "Explain perspectives clearly, without promising outcomes." },
            { icon: "shield" as const, title: "Support", description: "Respect your choices as you decide what comes next." },
          ].map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-center text-center">
              <div className="flex size-[72px] items-center justify-center rounded-full border-2 border-gold bg-navy-deep text-gold-light">
                <Icon name={step.icon} size={32} />
              </div>
              {index < 3 && <div aria-hidden="true" className="about-step-line" />}
              <h3 className="mt-4 font-display text-lg text-gold-light">{index + 1}. {step.title}</h3>
              <p className="mt-2 max-w-[245px] text-sm leading-6 text-cream/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Expertise() {
  const items = [
    { icon: "star" as const, title: "Classical Texts", description: "An interest in foundational Vedic astrology traditions and texts." },
    { icon: "sparkles" as const, title: "Continuous Learning", description: "Ongoing study and thoughtful interpretation of traditional ideas." },
    { icon: "calendar" as const, title: "Consultation Practice", description: "Personal conversations focused on individual questions and circumstances." },
    { icon: "shield" as const, title: "Areas of Expertise", description: "Kundli, relationships, career, numerology, Vastu and Muhurat." },
  ];
  return (
    <section id="disciplines" aria-labelledby="expertise-heading" className="bg-cream py-14 text-navy sm:py-20">
      <Container>
        <div className="mb-9 text-center">
          <h2 id="expertise-heading" className="font-display text-3xl sm:text-4xl">Education &amp; Expertise</h2>
          <p className="mt-2 text-sm text-[#514b42]">A foundation in traditional Vedic sources and a commitment to continued learning.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => (
            <article key={item.title} className={["flex flex-col items-center px-5 text-center", index > 0 ? "lg:border-l lg:border-[#deceb9]" : ""].join(" ")}>
              <Icon name={item.icon} size={32} className="text-[#ab7a37]" />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#514b42]">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {getSiteOrigin() && <JsonLd data={breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "About", path: "/about" }])}/>} 
      <AboutHero />
      <ValuesStrip />
      <OurStory />
      <ConsultationApproach />
      <Expertise />
      <AboutCta />
    </>
  );
}
