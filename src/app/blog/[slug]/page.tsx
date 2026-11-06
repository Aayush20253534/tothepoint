import { pageMetadata } from "@/lib/metadata";
import { getSiteOrigin, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogArtwork } from "@/components/blog/blog-artwork";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";
import { blogCategories, blogPosts, getBlogPost, getRelatedBlogPosts } from "@/config/blog";
import { articleComponents } from "@/content/blog/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article Not Found", robots: { index: false } };
  return pageMetadata(`/blog/${post.slug}`, post.title, post.excerpt, "article");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const Content = articleComponents[post.slug];
  if (!Content) notFound();
  const categoryLabel = blogCategories.find((category) => category.slug === post.category)?.label ?? "Astrology";
  const related = getRelatedBlogPosts(post);

  return (
    <>
      {getSiteOrigin() && <JsonLd data={[articleSchema(getSiteOrigin()!, post), breadcrumbSchema(getSiteOrigin()!, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }]) ]}/>} 
      <section aria-labelledby="article-title" className="page-hero page-hero-article celestial-glow star-field border-b border-gold/25 bg-navy-deep pb-16 pt-10 sm:pb-20">
        <Container className="page-hero-inner page-hero-article-inner">
          <nav aria-label="Breadcrumb" className="page-hero-breadcrumb mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/75 sm:text-sm">
              <li><Link href="/" className="hover:text-gold-light">Home</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={16} className="text-gold"/></li>
              <li><Link href="/blog" className="hover:text-gold-light">Blog</Link></li>
              <li aria-hidden="true"><Icon name="chevron-right" size={16} className="text-gold"/></li>
              <li aria-current="page" className="max-w-full text-gold-light">{post.title}</li>
            </ol>
          </nav>
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">{categoryLabel} · Educational guide</p>
            <h1 id="article-title" className="page-hero-title mt-5 font-display text-[clamp(2.7rem,5.4vw,5rem)] leading-[1.1] tracking-tight text-cream">{post.title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-cream/75">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gold-light">
              <Icon name="star" size={16}/>
              <span>{post.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <Link href="/about" className="underline underline-offset-4">SmartJyotishi editorial guide</Link>
            </div>
          </div>
          <div className="page-hero-article-art mx-auto mt-7 max-w-5xl overflow-hidden rounded-2xl border border-gold/35">
            <BlogArtwork category={post.category} featured/>
          </div>
        </Container>
      </section>

      <section className="bg-navy-deep py-14 sm:py-20">
        <Container className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
          <article aria-label={post.title} className="min-w-0 max-w-3xl">
            <div className="rounded-lg border border-gold/25 bg-navy-soft/60 px-5 py-4 text-sm leading-7 text-cream/75">
              <strong className="text-gold-light">Editorial note:</strong> This article explains traditional astrology concepts for general education.
              It does not provide a personalized reading or guarantee results. Consult appropriate qualified professionals for important medical, legal or financial decisions.
            </div>
            <div className="blog-article-body mt-8">
              <Content/>
            </div>
            <div className="mt-12 rounded-xl border border-gold/30 bg-navy-soft/80 p-6 sm:p-8">
              <p className="eyebrow">Personal questions?</p>
              <h2 className="mt-3 font-display text-2xl text-cream sm:text-3xl">Discuss the Topic in a Consultation</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Message SmartJyotishi on WhatsApp to ask about the consultation scope, fees and available times.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gold-light"><Link href="/astrologer-in-prayagraj" className="underline">Prayagraj consultations</Link><Link href="/online-astrology-consultation" className="underline">Online consultations worldwide</Link></div>
              <div className="mt-6">
                <WhatsAppBookingLink>Book Consultation</WhatsAppBookingLink>
              </div>
            </div>
          </article>

          <aside aria-label="Article navigation" className="lg:sticky lg:top-28">
            <div className="rounded-xl border border-gold/30 bg-navy-soft/85 p-6">
              <h2 className="font-display text-xl text-cream">In This Article</h2>
              <ol className="mt-5 space-y-4">
                {post.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="group flex items-start gap-3 text-sm leading-6 text-cream/70 hover:text-gold-light">
                      <span className="shrink-0 text-xs font-semibold text-gold">{String(index+1).padStart(2, "0")}</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-gold/20 pt-5">
                <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold">
                  <Icon name="arrow-right" size={18} className="rotate-180"/> Back to All Articles
                </Link>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="related-articles-title" className="border-t border-gold/20 bg-navy py-16 sm:py-20">
        <Container>
          <p className="eyebrow">Continue reading</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-articles-title" className="font-display text-3xl text-cream sm:text-4xl">More Astrology Insights</h2>
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-gold-light hover:text-gold">
              View All Articles <Icon name="arrow-right" size={17}/>
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {related.map((entry) => (
              <article key={entry.slug} className="flex flex-col overflow-hidden rounded-xl border border-gold/30 bg-navy-deep">
                <BlogArtwork category={entry.category}/>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs text-gold-light">{entry.readingMinutes} min read</p>
                  <h3 className="mt-3 font-display text-xl text-cream">
                    <Link href={`/blog/${entry.slug}`} className="hover:text-gold-light">{entry.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{entry.excerpt}</p>
                  <Link href={`/blog/${entry.slug}`} className="mt-5 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-gold-light hover:text-gold">
                    Read Article <Icon name="arrow-right" size={17}/>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
