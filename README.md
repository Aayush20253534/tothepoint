# SmartJyotishi

Website of Hariom Shrivastava, implemented in phased releases. Parts 0–14 cover the Next.js foundation, shared design system, homepage, About page, Services overview, six service detail pages, standardized WhatsApp booking, Testimonials, the blog listing and MDX article pages, the contact email endpoint, legal policy drafts, SEO and browser-based quality checks.

## Stack
- Next.js 16 (App Router)
- React 19, TypeScript, Tailwind CSS 4, local MDX source-managed educational articles
- ESLint + Next.js rules, Node.js 22
- GitHub Actions CI, Vercel-compatible deployment

## Local development
1. Install **Node.js 22**.
2. Run `npm ci` to install the committed dependency versions.
3. Copy `.env.example` to `.env.local` and complete variables when relevant.
4. Run `npm run dev`. Open http://localhost:3000.

## Quality checks
```bash
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

The committed package-lock.json provides reproducible installs. GitHub Actions runs lint, types, unit tests, a production build, responsive/browser SEO checks and axe accessibility checks. Screenshots are uploaded for visual review.

## Current scope
- Confirmed booking WhatsApp: **+91 7007962637**. All booking CTAs open WhatsApp with a prefilled enquiry. The legacy `/booking` and `/book-consultation` routes redirect there. See `docs/whatsapp-booking.md`.
- Part 10: `/contact` uses the server-side `/api/contact` endpoint to submit email through Resend to **tothepointastrology@gmail.com**. Production requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender) and `CONTACT_TO_EMAIL` in Vercel. It returns an explicit error if unconfigured; no automatic booking.
- Part 7 Testimonials: category-filtered reviews and video section, initially empty until authentic, consented content is verified. The feedback form prepares an email for the visitor to send manually. See `docs/testimonials.md`.
- Parts 8–9 Blog: searchable category listing and eight local educational guides rendered from MDX. Edit content in `src/content/blog/` and metadata in `src/config/blog.ts`. See `docs/blog.md`.
- Part 11: Privacy, Terms and Refund pages contain clearly marked **drafts**, with `noindex` until client/legal approval. See `docs/legal-policies.md`.
- SEO: Prayagraj and worldwide consultation pages, eight guides, individual route metadata, 21-route sitemap, preview-safe robots and LocalBusiness/Person/Service/BlogPosting structured data. Production uses a verified custom origin or Vercel’s stable production alias. See `docs/seo.md`.
- Part 13: Automated responsive, Chromium browser, axe accessibility and basic performance checks, in addition to CI lint/typecheck/unit/build. See `docs/quality.md`.
- Historical Part 14 (the older upstream deployment, not the current fork): Vercel project `tothepoint` created, linked to `ayush-jha-NIT/tothepoint` on `main`, and production deployed. Node.js pinned to 22.x; production Vercel alias `https://tothepoint-green.vercel.app`. Public launch approval and verified Resend delivery remain outstanding. Run `BASE_URL=https://your-domain npm run smoke:production` once the domain is accessible. See `docs/deployment.md`.
- No payment gateway, booking database or automatic booking confirmation.

## Folder map
```text
src/
  app/             App Router routes and globals.css
  components/      Shared components (Part 1+)
  config/site.ts   Approved business facts and services
  config/blog.ts   Blog metadata, search and related-post functions
  content/blog/    Trusted MDX article source files
  lib/whatsapp.ts  WhatsApp deep link builder
  lib/seo.ts       Canonical domain, route index and JSON-LD builders
  types/           Shared type declarations
tests/             Dependency-free unit tests
docs/              Architecture and launch checklist
.github/workflows/ci.yml  CI checks
```

Design mockup reference images are supplied separately in the original Part 0 ZIP and have intentionally not been committed as binary files. The repository contains the website source and implementation foundation.

Do not treat sample prices, reviews, contact locations, photos, certificates, experience claims or booking IDs in mockups as verified business facts.

## Current repository and rollout

Work targets `Aayush20253534/tothepoint`. Its Vercel project is `prj_vNmB1BkJL2n3l5rBDlcxnJW4dGF7` in the `amplify-world` team. The older `tothepoint-green.vercel.app` address in `docs/deployment.md` belongs to the upstream repository. Do not copy it into this project’s canonical configuration. Current deployment status must be verified from the GitHub commit checks.

The verified primary domain is **https://www.smartjyotishi.in**. The apex domain redirects to `www`; `NEXT_PUBLIC_SITE_URL` is configured to that primary host. Run `BASE_URL=https://www.smartjyotishi.in npm run smoke:production` after deployment.

The owner confirmed a public Prayagraj office and international online consultations in Hindi and English. Exact office address/Maps URL and webmaster account verification remain outstanding; see `docs/seo.md`.
