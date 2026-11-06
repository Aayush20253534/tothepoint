# SmartJyotishi: Prayagraj and worldwide SEO

## Published website scope

The site has 21 indexable routes: seven core/consultation pages, six service detail pages and eight educational guides. The shared route inventory drives the sitemap and browser SEO checks.

| Search intent | Primary page |
| --- | --- |
| Brand and broad Vedic astrology | `/` |
| Astrologer in Prayagraj / Allahabad | `/astrologer-in-prayagraj` |
| Online astrology consultation worldwide | `/online-astrology-consultation` |
| Kundli, relationships, career, numerology, Vastu, Muhurat | The six existing `/services/*` pages |
| Practitioner and consultation approach | `/about` |
| Booking/contact information | `/contact` |
| Educational and preparation questions | `/blog/*` |

Pages have individual titles/descriptions, self canonicals, absolute Open Graph URLs/images and large Twitter cards. Business names and WhatsApp messages consistently use SmartJyotishi. Server-rendered text, breadcrumbs, relevant guide/service links and visible FAQs provide context without city-keyword duplication or invented reviews.

## Confirmed business facts

- Name: SmartJyotishi; practitioner: Hariom Shrivastava.
- WhatsApp: +91 7007962637; email: tothepointastrology@gmail.com.
- Owner confirmed a public Prayagraj office and worldwide online consultations in Hindi and English on 6 November 2026.
- Exact street address, postcode, Maps/Business Profile URL, hours and verified social profile URLs have **not** been supplied. These are not invented. Office directions must be confirmed directly before a visit.
- `LocalBusiness` includes only city, region and country in its address. Complete address and Maps verification are still needed for a full local listing. No coordinates, price range, ratings, qualifications or claims of search ranking are fabricated.

## Indexing and domain policy

The verified primary production domain is `https://www.smartjyotishi.in`. Vercel redirects `https://smartjyotishi.in` to the `www` host with HTTP 308. The existing `NEXT_PUBLIC_SITE_URL` environment variable is configured to the primary domain. Use `https://www.smartjyotishi.in/sitemap.xml` for webmaster submission.

`NEXT_PUBLIC_SITE_URL` is the preferred verified HTTPS canonical origin. On Vercel production, an unset/invalid value falls back to `VERCEL_PROJECT_PRODUCTION_URL`, the stable production alias. It never uses the unique `VERCEL_URL` deployment hostname. This enables the requested SEO launch without relying on the older fork's domain in historical deployment notes.

Preview/development Vercel builds remain noindex even when they inherit a production custom URL. Unconfigured local builds remain noindex. `SEO_INDEXING_DISABLED=true` disables indexing explicitly; `SEO_ALLOW_VERCEL_DOMAIN=false` disables the alias fallback. Configure a verified custom domain before migrating canonicals, redirect old aliases to it and redeploy.

`robots.txt` advertises `/sitemap.xml` and blocks `/api/` in production. Draft policies and empty testimonials remain out of the sitemap and carry noindex; they remain crawlable so engines can read that directive. Preview builds block all crawling and return an empty sitemap. No fabricated modification timestamps are emitted.

The global consultation page is English content for a worldwide audience. Hindi/English refer to consultation languages, not translated website versions. No misleading hreflang alternatives or auto location redirects are added. Add reciprocal hreflang only when real translated pages exist.

## Structured data

- Shared: LocalBusiness, Person and WebSite with stable linked IDs.
- Services and consultation pages: Service with matching visible subject and service area.
- Guides: BlogPosting with the organization as editorial author and publisher, an image and no fabricated publication date.
- Inner pages: BreadcrumbList.
- The supplied logo is served byte-for-byte at `/images/smartjyotishi-logo.webp`; it is not a generated replacement.

## Webmaster and local listing steps requiring account access

No Search Console, Bing Webmaster or Google Business Profile connection was available during implementation. The code does not claim to have verified a property, submitted a sitemap, created backlinks, edited a Business Profile or achieved rankings.

1. Verify the actual production domain in Google Search Console (DNS for a domain property, or the supplied token in `GOOGLE_SITE_VERIFICATION` for URL-prefix verification). Bing's token is supported through `BING_SITE_VERIFICATION`.
2. Redeploy after setting a verification token, then complete verification in the respective account. Submit `https://ACTUAL-PRODUCTION-HOST/sitemap.xml`.
3. Inspect the homepage, Prayagraj page, online consultation page and service pages in Search Console. Monitor indexing, queries, countries, devices and engagement over time.
4. Confirm the real office street address/postcode, map pin, opening/appointment hours and approved social URLs. Apply the same details to the website and the claimed Google Business Profile. Use the real business name without keyword additions.
5. Add authentic business photos and request genuine client reviews through the business's own process. No purchased or fabricated reviews/backlinks.

## Validation

Run `npm ci`, lint, typecheck and unit tests. CI builds with a reserved example-domain fixture and runs all browser checks against localhost; it does not deploy that fixture domain.

```bash
npm run lint
npm run typecheck
npm test
NEXT_PUBLIC_SITE_URL=https://seo-validation.example.com npm run build
EXPECT_INDEXABLE=true npm run test:e2e
```

Browser checks cover every indexable page, canonical/social metadata, JSON-LD parsing, sitemap completeness, heading counts, missing-route 404s, guide anchors, responsive layouts, keyboard navigation and axe serious/critical violations. CI uploads screenshots for visual review. For an installed system Chromium, `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` can select its binary; use the bundled Playwright browser in normal CI.

Run `BASE_URL=https://www.smartjyotishi.in npm run smoke:production` after deployment. This checks generated SEO responses and never sends a genuine contact message.

## Reference documentation

- https://developers.google.com/search/docs/crawling-indexing/block-indexing
- https://developers.google.com/search/docs/appearance/structured-data/local-business
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
