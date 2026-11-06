import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getIndexablePaths } from "../src/lib/seo";
import { blogPosts } from "../src/config/blog";

test("every public route renders unique metadata, linked data and a self canonical", async ({ page, request }) => {
  test.setTimeout(120_000);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of getIndexablePaths()) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await expect(page.locator("main h1"), path).toHaveCount(1);
    const title = await page.title();
    expect(title).toContain("SmartJyotishi");
    expect(title.match(/SmartJyotishi/g)?.length, title).toBe(1);
    expect(titles.has(title), title).toBe(false); titles.add(title);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length).toBeGreaterThan(60);
    expect(descriptions.has(description!), path).toBe(false); descriptions.add(description!);
    const canonical = page.locator('link[rel="canonical"]');
    if (process.env.EXPECT_INDEXABLE === "true") await expect(canonical).toHaveCount(1);
    if (await canonical.count()) {
      const url = new URL((await canonical.getAttribute("href"))!);
      expect(url.protocol).toBe("https:");
      expect(url.pathname).toBe(path);
      expect(url.search).toBe("");
      const socialUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
      expect(new URL(socialUrl!).href).toBe(url.href);
      await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /^https:\/\//);
      const data = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(data.length).toBeGreaterThan(0);
      const nodes = data.flatMap(text => JSON.parse(text));
      expect(nodes.some(node => node["@type"] === "LocalBusiness")).toBe(true);
    }
  }
  expect((await request.get("/services/not-a-real-service")).status()).toBe(404);
  expect((await request.get("/blog/not-a-real-article")).status()).toBe(404);
});

test("sitemap covers public routes and permits crawlers to read draft noindex tags", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
  if (process.env.EXPECT_INDEXABLE === "true") expect(urls.length).toBeGreaterThan(0);
  if (!urls.length) return;
  expect(urls.map(url => url.pathname).sort()).toEqual(getIndexablePaths().sort());
  expect(new Set(urls.map(url => url.origin)).size).toBe(1);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${urls[0].origin}/sitemap.xml`);
  expect(robots).not.toContain("Disallow: /privacy-policy");
  expect(robots).not.toContain("Disallow: /testimonials");
});

test("local and worldwide pages are responsive and accessible", async ({ page }) => {
  test.setTimeout(90_000);
  for (const path of ["/astrologer-in-prayagraj", "/online-astrology-consultation"]) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth), `${path} at ${width}`).toBeLessThanOrEqual(2);
      await expect(page.getByRole("link", { name: "Enquire about a consultation" })).toHaveAttribute("href", /wa\.me\/917007962637/);
    }
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations.filter(v => ["serious", "critical"].includes(v.impact ?? "")).map(v => v.id)).toEqual([]);
  }
});

test("all article navigation anchors resolve to headings", async ({ page }) => {
  for (const post of blogPosts) {
    await page.goto(`/blog/${post.slug}`);
    for (const section of post.sections) await expect(page.locator(`h2[id="${section.id}"]`)).toHaveCount(1);
  }
});

test("mobile navigation keeps keyboard focus inside the menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const last = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Book Consultation" });
  await last.focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close navigation menu" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(last).toBeFocused();
});


test("capture desktop and mobile layouts for visual review", async ({ page }, testInfo) => {
  for (const [name, path, width, height] of [
    ["home-desktop", "/", 1440, 1000],
    ["home-mobile", "/", 390, 844],
    ["prayagraj-desktop", "/astrologer-in-prayagraj", 1440, 1000],
    ["online-mobile", "/online-astrology-consultation", 390, 844],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto(path, { waitUntil: "networkidle" });
    await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: true });
  }
});
