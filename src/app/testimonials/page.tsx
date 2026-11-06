import { canonicalPath, isIndexingAllowed } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { ReviewBrowser } from "@/components/testimonials/review-browser";
import { ReviewForm } from "@/components/testimonials/review-form";
import { Container } from "@/components/ui/container";
import { CelestialArt } from "@/components/ui/celestial-art";
import { Icon } from "@/components/ui/icons";
import { approvedReviews, approvedVideoReviews, getPublicVideoReviews } from "@/config/testimonials";

const videos = getPublicVideoReviews(approvedVideoReviews);
const hasPublicReviews = approvedReviews.some((review) => review.approved && review.consentToPublish) || videos.length > 0;

export const metadata: Metadata = {
  alternates: { canonical: canonicalPath("/testimonials") },
  title: "Client Testimonials & Experiences",
  description:
    "Explore verified client experiences at SmartJyotishi. Share your feedback for manual review and arrange an astrology consultation on WhatsApp.",
  robots: { index: hasPublicReviews && isIndexingAllowed(), follow: true },
  openGraph: {
    title: "Client Testimonials | SmartJyotishi",
    description: "Authentic, approved client experiences and feedback.",
    type: "website",
  },
};

function Hero() {
  return (
    <section aria-labelledby="testimonials-title" className="page-hero page-hero-testimonials celestial-glow star-field relative overflow-hidden border-b border-gold/20 bg-navy-deep">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(214,149,67,.17),transparent_65%)] blur-xl"/>
      <Container className="page-hero-inner relative grid items-center gap-8 pb-14 pt-12 lg:min-h-[520px] lg:grid-cols-[1.12fr_.88fr] lg:pb-16 lg:pt-14">
        <div className="max-w-2xl">
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-9">
            <ol className="flex items-center gap-2 text-sm text-cream/75">
              <li><Link href="/" className="rounded hover:text-gold-light">Home</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={15} className="text-gold"/></li>
              <li aria-current="page" className="text-gold-light">Testimonials</li>
            </ol>
          </nav>
          <p className="eyebrow">Client stories & feedback</p>
          <h1 id="testimonials-title" className="page-hero-title mt-4 font-display text-[clamp(3.25rem,6vw,5.55rem)] leading-[1.06] tracking-tight text-cream">
            Experiences That <span className="block gold-gradient-text">Deserve to Be Heard.</span>
          </h1>
          <p className="page-hero-lead mt-6 max-w-xl text-base leading-8 text-cream/75">
            Every personal experience is different. This page is for authentic feedback from clients
            who choose to share their stories, with permission and review before publication.
          </p>
          <div className="page-hero-actions mt-6 flex flex-wrap gap-3">
            <Link href="#share-feedback" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light">
              Share Your Experience <Icon name="arrow-right" size={16}/>
            </Link>
            <WhatsAppBookingLink variant="outline">Book Consultation</WhatsAppBookingLink>
          </div>
          <p className="mt-5 text-xs leading-6 text-muted">No fabricated testimonials, ratings, client counts or endorsements.</p>
        </div>
        <div className="page-hero-art relative mx-auto w-full max-w-[460px]" aria-hidden="true">
          <CelestialArt className="opacity-85"/>
          <div className="absolute bottom-[6%] left-[5%] rounded-xl border border-gold/35 bg-navy-deep/85 px-5 py-4 shadow-xl backdrop-blur">
            <span className="font-display text-lg text-gold-light">Genuine feedback. Thoughtfully shared.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const values = [
    { icon: "shield", heading: "Permission First", note: "Nothing is published without the client’s consent" },
    { icon: "star", heading: "Authentic Feedback", note: "Reviews represent real individual experiences" },
    { icon: "message", heading: "Personal Perspectives", note: "Each experience belongs to the person sharing it" },
    { icon: "sparkles", heading: "Transparent Process", note: "Feedback is reviewed before appearing on this site" },
  ] as const;
  return (
    <section aria-label="Review publication principles" className="bg-cream py-10 text-navy sm:py-12">
      <Container className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {values.map((value,index)=>(
          <div key={value.heading} className={["flex flex-col items-center px-5 text-center",index>0?"lg:border-l lg:border-[#deccb1]":""].join(" ")}>
            <Icon name={value.icon} size={30} className="text-[#a7742f]"/>
            <h2 className="mt-3 font-display text-lg font-semibold">{value.heading}</h2>
            <p className="mt-2 max-w-56 text-xs leading-6 text-[#4d514a]">{value.note}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function VideoStories() {
  return (
    <section id="video-reviews" aria-labelledby="videos-title" className="celestial-glow border-b border-gold/20 bg-navy py-16 sm:py-24">
      <Container>
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <p className="eyebrow">In their own words</p>
          <h2 id="videos-title" className="mt-3 font-display text-4xl text-cream sm:text-5xl">
            Video <span className="gold-gradient-text">Testimonials</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Client videos are shown only when the recording and publication have been approved.
          </p>
        </div>
        {videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video)=>(
              <article key={video.id} className="overflow-hidden rounded-xl border border-gold/30 bg-navy-deep">
                <video className="aspect-video w-full bg-navy-deep" controls preload="none" playsInline>
                  <source src={video.videoPath} type={video.videoPath.endsWith(".webm")?"video/webm":"video/mp4"}/>
                  Your browser does not support video playback.
                </video>
                <div className="p-6">
                  <h3 className="font-display text-xl text-cream">{video.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{video.caption}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col items-center rounded-2xl border border-gold/30 bg-navy-deep/80 px-6 py-11 text-center sm:px-12">
            <div className="flex size-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
              <svg aria-hidden="true" width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="6" width="26" height="22" rx="4"/><path d="m14 12 9 5-9 5z"/>
              </svg>
            </div>
            <h3 className="mt-5 font-display text-2xl text-cream">Verified video stories will appear here</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
              No recordings have been approved for publication yet. Video placeholders are not presented as genuine client stories.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

function Feedback() {
  return (
    <section id="share-feedback" aria-labelledby="feedback-title" className="scroll-mt-28 border-b border-gold/20 bg-navy-deep py-16 sm:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">Your voice matters</p>
          <h2 id="feedback-title" className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">
            Share Your <span className="gold-gradient-text">Experience</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-8 text-muted">
            If you have had a consultation, your perspective can help others understand what to expect.
            Share feedback honestly, whether positive, mixed or critical.
          </p>
          <div className="mt-8 space-y-4">
            {[
              "Your review is not published automatically.",
              "Public display requires explicit consent and verification.",
              "You can send private feedback without publication consent.",
            ].map((item)=>(
              <div key={item} className="flex items-start gap-3 text-sm leading-6 text-cream/80">
                <Icon name="shield" size={21} className="mt-0.5 shrink-0 text-gold"/>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gold/30 bg-navy-soft/80 p-6 shadow-[0_16px_42px_rgba(0,0,0,.18)] sm:p-9">
          <h3 className="font-display text-2xl text-cream sm:text-3xl">Write a Review</h3>
          <p className="mb-7 mt-2 text-sm leading-7 text-muted">Prepare a feedback email for manual review.</p>
          <ReviewForm/>
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section aria-labelledby="testimonials-cta-heading" className="celestial-glow star-field bg-navy py-16 sm:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="eyebrow">Explore for yourself</p>
          <h2 id="testimonials-cta-heading" className="mt-3 font-display text-4xl text-cream sm:text-5xl">
            Begin Your <span className="gold-gradient-text">Own Conversation</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Browse the astrology services or message us to discuss a consultation. Results are not guaranteed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <WhatsAppBookingLink>Book Consultation</WhatsAppBookingLink>
          <Link href="/services" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-gold/60 bg-gold/5 px-6 py-3 text-sm font-semibold text-gold-light hover:bg-gold/15">
            Explore Services <Icon name="arrow-right" size={16}/>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <Hero/>
      <TrustStrip/>
      <ReviewBrowser/>
      <VideoStories/>
      <Feedback/>
      <FinalCta/>
    </>
  );
}
