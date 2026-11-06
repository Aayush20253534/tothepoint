import { pageMetadata } from "@/lib/metadata";
import { getSiteOrigin, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { BlogArtwork } from "@/components/blog/blog-artwork";
import { BlogBrowser } from "@/components/blog/blog-browser";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { blogPosts, blogCategories } from "@/config/blog";

export const metadata = pageMetadata(
  "/blog",
  "Vedic Astrology Guides & Consultation Advice",
  "Read SmartJyotishi guides to Kundli, compatibility, career astrology, numerology, Vastu, Muhurat and preparing for an online astrology consultation.",
);

export default function BlogPage() {
  const featured = blogPosts[0];
  return (
    <>
      {getSiteOrigin() && <JsonLd data={breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])}/>} 
      <section aria-labelledby="blog-title" className="page-hero page-hero-blog celestial-glow star-field relative overflow-hidden border-b border-gold/20 bg-navy-deep py-12 sm:py-20">
        <Container className="page-hero-inner grid items-center gap-7 lg:grid-cols-[1fr_.95fr]">
          <div>
            <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-9">
              <ol className="flex items-center gap-2 text-sm text-cream/75">
                <li><Link href="/" className="hover:text-gold-light">Home</Link></li>
                <li aria-hidden="true"><Icon name="chevron-right" size={16} className="text-gold"/></li>
                <li aria-current="page" className="text-gold-light">Blog</li>
              </ol>
            </nav>
            <p className="eyebrow">Ideas, traditions and questions</p>
            <h1 id="blog-title" className="page-hero-title mt-4 font-display text-[clamp(3.2rem,6vw,5.6rem)] leading-[1.06] text-cream">
              Explore Astrology <span className="gold-gradient-text">Insights</span>
            </h1>
            <p className="page-hero-lead mt-6 max-w-xl text-base leading-8 text-cream/75">
              Learn the vocabulary and context of traditional astrology, one topic at a time.
              Our guides explain interpretive practices without promising particular results.
            </p>
            <Link href="#articles" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light">
              Browse Articles <Icon name="arrow-right" size={17}/>
            </Link>
          </div>
          <div className="page-hero-art overflow-hidden rounded-2xl border border-gold/35 bg-navy-soft/90 shadow-[0_28px_60px_rgba(0,0,0,.2)]">
            <Link href={`/blog/${featured.slug}`} tabIndex={-1} aria-hidden="true"><BlogArtwork category={featured.category} featured/></Link>
            <div className="px-6 pb-7 pt-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold-light">Featured guide · {featured.readingMinutes} min read</p>
              <h2 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
                <Link href={`/blog/${featured.slug}`} className="hover:text-gold-light">{featured.title}</Link>
              </h2>
            </div>
          </div>
        </Container>
      </section>
      <section aria-label="Blog topics" className="border-b border-[#e3d0b6] bg-cream py-8 text-navy">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <strong className="font-display text-lg">Topics we cover:</strong>
          {blogCategories.filter((item) => item.slug !== "all").map((item) =>
            <a key={item.slug} href="#articles" className="text-[#85561d] underline-offset-4 hover:underline">{item.label}</a>
          )}
        </Container>
      </section>
      <BlogBrowser/>
      <section aria-labelledby="blog-cta-title" className="celestial-glow star-field border-t border-gold/25 bg-navy py-16 sm:py-20">
        <Container className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="eyebrow">Have questions?</p>
            <h2 id="blog-cta-title" className="mt-3 font-display text-4xl text-cream sm:text-5xl">Continue the Conversation</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              Educational articles are not individual advice. Contact us for consultation scope, fees and availability.
            </p>
          </div>
          <WhatsAppBookingLink>Book Consultation</WhatsAppBookingLink>
        </Container>
      </section>
    </>
  );
}
