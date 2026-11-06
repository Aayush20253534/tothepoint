import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/", "/about", "/services", "/services/kundli-analysis",
  "/blog", "/blog/understanding-kundli-basics", "/contact",
  "/testimonials", "/privacy-policy",
];

test("main pages are rendered with page headings and without horizontal overflow", async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of routes) {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("main h1").first()).toBeVisible();
      const metrics = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        fullWidth: document.documentElement.scrollWidth,
      }));
      expect(metrics.fullWidth - metrics.viewport, `overflow at ${path} width ${width}`).toBeLessThanOrEqual(2);
    }
  }
});

test("mobile navigation can open, navigate and close using keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const open = page.getByRole("button", { name: "Open navigation menu" });
  await expect(open).toBeVisible();
  await open.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav.getByRole("link", { name: "Services" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await nav.getByRole("link", { name: "Services" }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(nav).toBeHidden();
});

test("blog search and category filters update the displayed articles", async ({ page }) => {
  await page.goto("/blog");
  const search = page.getByRole("searchbox", { name: "Search articles" });
  await search.fill("numerology");
  await expect(page.getByText("1 article found")).toBeVisible();
  await page.getByRole("button", { name: "Career", exact: true }).click();
  await expect(page.getByText("0 articles found")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("8 articles found")).toBeVisible();
});

test("contact form reports validation errors without sending an unconfigured email", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Check the highlighted fields.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
});

test("unverified legal pages and testimonials cannot be indexed", async ({ page }) => {
  for (const path of ["/privacy-policy", "/terms-and-conditions", "/refund-policy", "/testimonials"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  }
});

test("robots and sitemap match the indexing mode", async ({ request }) => {
  const home = await request.get("/");
  const configured = /rel="canonical"/.test(await home.text());
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  const robotsText = await robots.text();
  expect(robotsText.includes("Disallow: /\n")).toBe(!configured);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const body = await sitemap.text();
  expect(body.includes("<loc>")).toBe(configured);
});

test("key pages meet WCAG automated serious and critical checks", async ({ page }) => {
  for (const path of ["/", "/services", "/blog", "/contact", "/blog/understanding-kundli-basics"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const serious = result.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(serious.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target) })), path).toEqual([]);
  }
});

test("home page initial load stays under a basic asset transfer budget", async ({ page }) => {
  let transferred = 0;
  page.on("response", async (response) => {
    try {
      const headers = await response.allHeaders();
      const size = Number(headers["content-length"]);
      if (size > 0) transferred += size;
    } catch {
      // Failed network assets are caught by the basic page smoke tests.
    }
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(transferred, "Header-reported transfer bytes should not exceed 3 MB").toBeLessThan(3_000_000);
  const fontCount = await page.evaluate(() => document.fonts.size);
  expect(fontCount, "Bundled external web fonts are not required").toBe(0);
});

test("desktop hero fits completely below the header at 100% zoom", async ({ page }) => {
  for (const config of [
    { width: 1280, height: 720 }, { width: 1366, height: 768 },
    { width: 1440, height: 900 }, { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(config);
    await page.goto("/", { waitUntil: "networkidle" });
    const positions = await page.evaluate(() => {
      const header = document.querySelector("header")!.getBoundingClientRect();
      const hero = document.querySelector(".home-hero")!.getBoundingClientRect();
      const heading = document.querySelector("#home-title")!.getBoundingClientRect();
      const buttons = [...document.querySelectorAll<HTMLElement>(".home-hero-button")];
      return {
        headerBottom: header.bottom, heroTop: hero.top, heroBottom: hero.bottom,
        headingBottom: heading.bottom,
        buttonBottom: Math.max(...buttons.map(b => b.getBoundingClientRect().bottom)),
      };
    });
    expect(positions.heroTop).toBeGreaterThanOrEqual(positions.headerBottom - 2);
    expect(positions.heroBottom, "desktop hero exceeds viewport").toBeLessThanOrEqual(config.height + 3);
    expect(positions.headingBottom).toBeLessThan(positions.heroBottom);
    expect(positions.buttonBottom).toBeLessThanOrEqual(positions.heroBottom);
  }
});

test("phones show full-width booking controls and no horizontal page scroll", async ({ page }) => {
  for (const width of [320, 360, 375, 390, 430]) {
    await page.setViewportSize({ width, height: 740 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const metrics = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      pageWidth: document.documentElement.scrollWidth,
      imageHeight: document.querySelector(".home-hero-photo")!.getBoundingClientRect().height,
      links: [...document.querySelectorAll<HTMLElement>(".home-hero-button")].map(link => {
        const bounds = link.getBoundingClientRect();
        return { width: bounds.width, height: bounds.height, left: bounds.left, right: bounds.right };
      }),
    }));
    expect(metrics.pageWidth - metrics.viewport, "horizontal overflow on phone").toBeLessThanOrEqual(2);
    expect(metrics.imageHeight).toBeGreaterThan(200);
    expect(metrics.links).toHaveLength(2);
    for (const link of metrics.links) {
      expect(link.height, "tap target too short").toBeGreaterThanOrEqual(44);
      expect(link.left).toBeGreaterThanOrEqual(0);
      expect(link.right).toBeLessThanOrEqual(width + 1);
    }
  }
});

test("mobile menu locks scrolling and restores focus on Escape", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
});

test("contact fields stay at 16px on mobile to prevent iOS focus zoom", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/contact");
  for (const field of ["contact-name", "contact-email", "contact-message"]) {
    const size = await page.locator("#" + field).evaluate(el => parseFloat(getComputedStyle(el).fontSize));
    expect(size).toBeGreaterThanOrEqual(16);
  }
});

test("internal-page heroes fit at 100% desktop zoom without clipped content", async ({ page }) => {
  test.setTimeout(180_000);
  const pageRoutes = [
    "/about", "/services",
    "/services/kundli-analysis", "/services/marriage-relationship",
    "/services/career-guidance", "/services/numerology",
    "/services/vastu", "/services/muhurat",
    "/blog", "/blog/understanding-kundli-basics",
    "/blog/relationship-compatibility-in-vedic-astrology",
    "/blog/career-questions-and-vedic-astrology",
    "/blog/numerology-numbers-and-meaning",
    "/blog/vastu-basics-for-home", "/blog/muhurat-and-traditional-timing",
    "/testimonials", "/contact",
    "/privacy-policy", "/terms-and-conditions", "/refund-policy",
  ];
  for (const viewport of [
    { width: 1280, height: 720 }, { width: 1366, height: 768 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const path of pageRoutes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const hero = page.locator(".page-hero").first();
      await expect(hero, path).toBeVisible();
      const positions = await page.evaluate(() => {
        const box = document.querySelector(".page-hero")!.getBoundingClientRect();
        const title = document.querySelector(".page-hero h1")!.getBoundingClientRect();
        const header = document.querySelector("header")!.getBoundingClientRect();
        return {
          top: box.top, bottom: box.bottom,
          headerBottom: header.bottom, titleTop: title.top, titleBottom: title.bottom,
          viewportWidth: document.documentElement.clientWidth,
          pageWidth: document.documentElement.scrollWidth,
        };
      });
      expect(positions.top, `${path}: hero header overlap at ${viewport.width}x${viewport.height}`).toBeGreaterThanOrEqual(positions.headerBottom - 3);
      expect(positions.bottom, `${path}: hero overflows the visible screen at ${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(viewport.height + 4);
      expect(positions.titleTop, path + ": title clipped above hero").toBeGreaterThanOrEqual(positions.top - 2);
      expect(positions.titleBottom, path + ": title clipped below hero").toBeLessThanOrEqual(positions.bottom + 2);
      expect(positions.pageWidth - positions.viewportWidth, path + ": horizontal overflow").toBeLessThanOrEqual(2);
    }
  }
});

test("internal heroes remain readable and scrollable on small phones", async ({ page }) => {
  test.setTimeout(110_000);
  const routes = [
    "/about", "/services", "/services/kundli-analysis",
    "/blog", "/blog/understanding-kundli-basics",
    "/testimonials", "/contact", "/privacy-policy",
  ];
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 740 });
    for (const path of routes) {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const size = await page.evaluate(() => {
        const hero = document.querySelector(".page-hero")!.getBoundingClientRect();
        const title = document.querySelector(".page-hero h1")!.getBoundingClientRect();
        return {
          pageWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
          titleBottom: title.bottom,
          heroBottom: hero.bottom,
          buttons: [...document.querySelectorAll<HTMLElement>(".page-hero-actions > a")]
            .map(el => el.getBoundingClientRect().height),
        };
      });
      expect(size.pageWidth-size.viewportWidth, path+" phone overflow").toBeLessThanOrEqual(2);
      expect(size.titleBottom, path+" heading clipped").toBeLessThanOrEqual(size.heroBottom + 2);
      for (const height of size.buttons) expect(height, path+" touch target too small").toBeGreaterThanOrEqual(44);
    }
  }
});

test("approved About hero is visible, responsive and contains working consultation links", async ({ page }) => {
  for (const viewport of [
    { width: 1280, height: 720 },
    { width: 1366, height: 768 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/about", { waitUntil: "networkidle" });
    const hero = page.locator(".about-photo-hero");
    await expect(hero).toBeVisible();
    const image = hero.locator('img[src*="about-hero"]');
    await expect(image).toBeVisible();
    // Next.js delivers responsive variants; intrinsic decoded width may be
    // smaller on phones even though the original source is high resolution.
    await expect.poll(async () => image.evaluate((el) => {
      const img = el as HTMLImageElement;
      return img.complete && img.naturalWidth > 0;
    }), { message: "About photo must load and decode" }).toBe(true);
    const contact = hero.getByRole("link", { name: "Book a Consultation" });
    await expect(contact).toHaveAttribute("href", /wa\.me\/917007962637/);
    const dimensions = await page.evaluate(() => ({
      bottom: document.querySelector(".about-photo-hero")!.getBoundingClientRect().bottom,
      viewportWidth: document.documentElement.clientWidth,
      pageWidth: document.documentElement.scrollWidth,
    }));
    expect(dimensions.pageWidth - dimensions.viewportWidth).toBeLessThanOrEqual(2);
    if (viewport.width >= 768) expect(dimensions.bottom).toBeLessThanOrEqual(viewport.height + 4);
  }
});
