import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { AstrologerVisual } from "@/components/about/astrologer-visual";
import { ActionLink } from "@/components/ui/action-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { ServiceGlyph } from "@/components/home/service-glyph";
import { servicePreviews } from "@/config/home";
import { siteConfig } from "@/config/site";
import { ConsultationOptions } from "@/components/booking/consultation-options";
import { HomeFaq } from "@/components/home/faq-list";
import "./homepage.css";

export const metadata = pageMetadata(
  "/",
  "Astrology in Prayagraj & Online Worldwide",
  "Consult Hariom Shrivastava at SmartJyotishi in Prayagraj or online worldwide. Kundli, marriage, career, numerology, Vastu and Muhurat in Hindi and English.",
);

function HomeHero() {
  return (
    <section className="home-hero relative isolate overflow-hidden border-b border-gold/25 bg-[#041020]" aria-labelledby="home-title">
      <div className="home-hero-photo">
        <Image
          src="/images/hero-astrologer.png"
          alt="Illustrated astrologer seated beneath a glowing golden zodiac wheel, with traditional books and a star-filled night sky"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="home-hero-image"
        />
      </div>
      <div aria-hidden="true" className="home-hero-shade" />
      <Container className="home-hero-content relative z-10 flex items-center">
        <div className="home-hero-copy w-full max-w-[590px]">
          <p className="home-kicker mb-3 sm:mb-4">Prayagraj • Online Worldwide</p>
          <h1 id="home-title" className="home-hero-title font-display text-cream">
            Vedic astrology.
            <span className="block text-gold-light">Personal guidance.</span>
          </h1>
          <p className="home-hero-subtitle mt-4 font-display text-lg leading-snug text-cream sm:text-xl lg:text-2xl">Vedic astrology with {siteConfig.astrologer}.</p>
          <p className="home-hero-description mt-3 max-w-[540px] text-sm leading-[1.7] text-cream/85 sm:text-base">
            Explore Kundli, relationships, career and life decisions with {siteConfig.name}.
            Meet in Prayagraj or connect online from anywhere, in Hindi or English.
          </p>
          <div className="home-hero-actions mt-6 flex flex-wrap gap-3">
            <WhatsAppBookingLink icon="message" className="home-hero-button">Book a Consultation</WhatsAppBookingLink>
            <ActionLink href="/services" variant="outline" className="home-hero-button">Explore Services</ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="home-paper border-b border-[#e0d5c3] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">What We Offer</p>
          <h2 id="services-title" className="mt-3 font-display text-3xl text-[#102234] sm:text-5xl">Explore Our Consultations</h2>
          <p className="mt-3 text-sm leading-7 text-[#514e47]">Choose the traditional astrology topic that matches your questions.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {servicePreviews.map((service) => (
            <Link href={"/services/" + service.slug} key={service.slug} className="group flex min-h-[170px] flex-col justify-between rounded-xl border border-[#dfccae] bg-[#fff9ef] p-6 shadow-[0_10px_30px_rgba(60,40,20,.05)] transition-transform hover:-translate-y-1 hover:border-[#a77835]">
              <ServiceGlyph name={service.icon} size={36}/>
              <div className="mt-7 flex items-end justify-between gap-3">
                <div><h3 className="font-display text-xl font-semibold text-[#16283b]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-[#514e47]">{service.description}</p></div>
                <Icon name="arrow-up-right" size={19} className="shrink-0 text-[#95651e]"/>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MeetTheAstrologer() {
  return (
    <section aria-labelledby="meet-title" className="home-night relative overflow-hidden py-14 sm:py-20">
      <div aria-hidden="true" className="star-field absolute inset-0 opacity-20"/>
      <Container className="relative grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[480px]"><AstrologerVisual variant="journey"/></div>
        <div>
          <p className="home-kicker">Meet Your Astrologer</p>
          <h2 id="meet-title" className="mt-3 font-display text-3xl leading-tight text-cream sm:text-5xl">Consult with <span className="text-gold-light">{siteConfig.astrologer}</span></h2>
          <p className="mt-5 text-sm leading-7 text-cream/75 sm:text-[15px]">Talk through your questions with a personal approach to traditional Vedic astrology. Learn more about the astrologer, his perspective and consultation principles on the About page.</p>
          <div className="mt-7"><ActionLink href="/about" variant="outline">Meet Hariom Shrivastava</ActionLink></div>
        </div>
      </Container>
    </section>
  );
}

function BookingSteps() {
  const steps = [
    { icon: "star" as const, title: "Choose a Service", description: "Select the area you would like to explore." },
    { icon: "message" as const, title: "Share Your Question", description: "Discuss your enquiry, scope and consultation details." },
    { icon: "calendar" as const, title: "Arrange a Session", description: "Confirm availability and book directly on WhatsApp." },
  ];
  return (
    <section aria-labelledby="steps-title" className="home-paper py-14 sm:py-20">
      <Container>
        <h2 id="steps-title" className="text-center font-display text-3xl text-[#102234] sm:text-5xl">How to Get Started</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-xl border border-[#e0d0b8] p-6 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f3e7d3] text-[#95651e]"><Icon name={step.icon} size={28}/></span>
              <h3 className="mt-4 font-display text-xl font-semibold text-[#13283a]">{index + 1}. {step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#514e47]">{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ClosingCallToAction() {
  return (
    <section aria-labelledby="closing-title" className="home-final-sky star-field relative isolate overflow-hidden border-y border-gold/25 py-14 sm:py-17">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_85%,rgba(211,143,65,.33),transparent_42%)]"/>
      <svg aria-hidden="true" viewBox="0 0 1400 260" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute bottom-0 left-0 h-[82%] w-full opacity-75">
        <path d="M0 250 80 204 164 220 270 165 356 213 450 166 534 212 636 133 700 158 791 102 880 168 966 134 1037 187 1156 108 1260 174 1345 129 1400 159V260H0Z" fill="#0b1725" />
        <path d="M0 250 130 228 234 237 351 206 458 243 570 225 663 234 749 194 827 224 926 202 1034 240 1142 209 1239 244 1324 213 1400 229V260H0Z" fill="#030d17" />
      </svg>
      <Container className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="closing-title" className="font-display text-3xl text-cream sm:text-5xl">Let’s Find Clarity Together</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/80">
            Whether you are seeking perspective on a question or planning your next steps,
            begin with a conversation about traditional astrology.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppBookingLink icon="message">Book Your Consultation Now</WhatsAppBookingLink>
            <ActionLink href="/services" variant="outline">View All Services</ActionLink>
          </div>
        </div>
        <span aria-hidden="true" className="hidden shrink-0 pb-5 font-display text-[5rem] leading-none text-gold/55 lg:block">✧</span>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero/>
      <ServicesOverview/>
      <ConsultationOptions/>
      <MeetTheAstrologer/>
      <BookingSteps/>
      <HomeFaq/>
      <ClosingCallToAction/>
    </>
  );
}
