> Historical record for the upstream `ayush-jha-NIT` repository. The active repository is now `Aayush20253534/tothepoint`, with Vercel project `prj_vNmB1BkJL2n3l5rBDlcxnJW4dGF7` in Amplify World. Follow `docs/seo.md` for the current indexing/domain policy; do not reuse the historical domain as canonical.

# Part 14: Production Deployment & Launch Report

## Deployment created (31 October 2026)

- **GitHub repository:** `ayush-jha-NIT/tothepoint`
- **Production branch:** `main`
- **Vercel project:** `tothepoint`
- **Vercel team:** `ayush-jha-nits-projects`
- **Project ID:** `prj_HCvrDEzCrjO50awReACT9RBGdSKC`
- **Production domain:** `https://tothepoint-green.vercel.app`
- **Initial production deployment ID:** `dpl_FQtiM5WyGAta1Y1RC2CvopVP86Be`
- **Initial deployed SHA:** `09b6ca945a235a6a20ae8d6c84ab61eea1d9ba15`
- **Deployment state:** Vercel API reported **READY** and the Next.js build completed successfully.
- **Framework:** Next.js; project pinned to Node.js 22.x.
- **Git integration:** linked to the GitHub repository.
- **Protection:** Vercel Authentication configured for **Preview** only. Production aliases are intended to be publicly accessible.

## Important: Production release is NOT fully signed off

A READY Vercel deployment means its build and upload succeeded; it does not prove that every route works from a public network. Attempts to fetch the new deployment from the connected browser returned a project lookup error, and outbound DNS was unavailable from the sandbox. Therefore **live HTTP smoke testing, real-device testing, contact email delivery and Search Console setup were not verified**.

A repeatable smoke script is committed at `scripts/production-smoke.mjs`:
```bash
BASE_URL=https://tothepoint-green.vercel.app npm run smoke:production
```
It checks pages, icons, OG image, robots, sitemap, rejects malformed contact submissions (without sending an email) and checks the WhatsApp redirect. If Vercel Authentication is still enforced or DNS fails, fix access/DNS before treating it as a passing test.

## Email must be activated

`CONTACT_TO_EMAIL=tothepointastrology@gmail.com` was added to Production on Vercel. **Two further values are needed**:
1. `RESEND_API_KEY`, created inside the client's Resend account. Store as a secret Production environment variable in Vercel.
2. `CONTACT_FROM_EMAIL`, a verified sender such as `Tothepoint Astrology <contact@CLIENT-OWNED-DOMAIN>`. Verify sender domain DNS first.

Do not paste API keys in chat or commit them to Git. Redeploy after adding these environment variables. Perform a genuine end-to-end test with a controlled message and verify the recipient inbox.

The contact page currently shows a useful message when email delivery is unavailable. WhatsApp at `+91 7007962637` and direct email remain accessible.

## Domain and SEO

The client has not supplied a custom business domain. The Vercel-assigned domain works as a **provisional deployment address**, not a client-approved branded domain.

When the client specifies a domain:
1. Add the domain under Vercel Project Settings → Domains.
2. Apply the DNS records Vercel actually provides for that domain and verify HTTPS.
3. Set `NEXT_PUBLIC_SITE_URL=https://verified-client-domain` on **Production** and redeploy.
4. Verify `/robots.txt`, `/sitemap.xml`, canonical meta tags and JSON-LD on the live site.
5. Submit the sitemap in Google Search Console and Bing Webmaster Tools only after sign-off.

Until a canonical public HTTPS domain is set, the site intentionally generates `Disallow: /`, an empty sitemap and `noindex` to avoid indexing a test/provisional URL.

## Client approval blockers

- Obtain the real astrologer portrait and approved biography.
- Confirm business legal identity, disclosures and contact details as required.
- Approve Privacy Policy, Terms and Refund/Cancellation Policy. Current text is **draft**, excluded from indexing.
- Add genuine testimonials only after verification and publication consent.
- Confirm all advertised service details and any charges before enabling online payments or price claims.
- Verify WhatsApp flow on a real phone and full contact delivery.
- Run production Lighthouse and device/screen-reader checks; do not claim unmeasured scores.

## Operations

GitHub Actions CI on `main` runs lint, typecheck, Node.js unit tests, Next.js production build, Chromium E2E checks and axe accessibility scans. Deployment should track `main` through Vercel Git integration.

If a deployment fails, inspect Vercel Project → Deployments → Build Logs. For production errors inspect Runtime Logs and, if needed, revert to a previously known-good Vercel deployment. Avoid exposing credentials or full contact messages in logs.

**Final status:** infrastructure deployed, production build READY; final public acceptance depends on DNS/HTTP checks, Resend secrets, legal approval and client assets.
