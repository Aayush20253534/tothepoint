import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  blogPosts, blogCategories, filterBlogPosts, getBlogPost, getRelatedBlogPosts,
} from "../src/config/blog.ts";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("the blog contains complete unique educational guides", () => {
  assert.equal(blogPosts.length, 8);
  assert.equal(new Set(blogPosts.map((post) => post.slug)).size, blogPosts.length);
  assert.equal(blogCategories.length, 7);
  assert.deepEqual(
    new Set(blogPosts.map((post) => post.category)),
    new Set(blogCategories.filter((category) => category.slug !== "all").map((category) => category.slug)),
  );
  for (const post of blogPosts) {
    assert.ok(post.title.length > 20);
    assert.ok(post.excerpt.length > 60);
    assert.ok(post.readingMinutes >= 2);
    assert.equal(post.sections.length, 4);
    const mdx = read(`src/content/blog/${post.slug}.mdx`);
    assert.ok(mdx.length > 750, "Insufficient article body: " + post.slug);
    for (const section of post.sections) {
      assert.ok(mdx.includes(`## ${section.title}`), "Unmatched table of contents heading " + section.id);
    }
  }
});

test("search matches title, excerpt and keywords without case sensitivity", () => {
  assert.equal(filterBlogPosts("", "all").length, blogPosts.length);
  assert.deepEqual(filterBlogPosts("KuNdLi", "all").map((post) => post.slug), [
    "understanding-kundli-basics", "relationship-compatibility-in-vedic-astrology",
    "preparing-for-an-astrology-consultation", "online-astrology-abroad-time-zones",
  ]);
  assert.deepEqual(filterBlogPosts("work", "career").map((post) => post.category), ["career"]);
  assert.deepEqual(filterBlogPosts("anything", "muhurat"), []);
  assert.deepEqual(filterBlogPosts("   ", "all"), [...blogPosts]);
});

test("getBlogPost resolves only the known static article slugs", () => {
  for (const post of blogPosts) assert.equal(getBlogPost(post.slug), post);
  for (const bad of ["", "__proto__", "../private", "does-not-exist"]) {
    assert.equal(getBlogPost(bad), undefined);
  }
});

test("related posts exclude the active article and never return duplicates", () => {
  for (const post of blogPosts) {
    const related = getRelatedBlogPosts(post);
    assert.equal(related.length, 3);
    assert.ok(related.every((p) => p.slug !== post.slug));
    assert.equal(new Set(related.map((p) => p.slug)).size, 3);
  }
});

test("blog listing uses an actual search and category-filter interface", () => {
  const page = read("src/app/blog/page.tsx");
  const browser = read("src/components/blog/blog-browser.tsx");
  const navigation = read("src/config/navigation.ts");
  assert.match(page, /export default function BlogPage/);
  assert.match(page, /export const metadata/);
  assert.match(page, /BlogBrowser/);
  assert.match(browser, /useState/);
  assert.match(browser, /filterBlogPosts\(query, category\)/);
  assert.match(browser, /aria-pressed/);
  assert.match(browser, /Clear filters/);
  assert.match(browser, /aria-live="polite"/);
  assert.doesNotMatch(navigation, /\n\s*blog: \{ title:/);
});

test("article pages are statically generated and have individualized SEO", () => {
  const page = read("src/app/blog/[slug]/page.tsx");
  assert.match(page, /generateStaticParams/);
  assert.match(page, /dynamicParams = false/);
  assert.match(page, /generateMetadata/);
  assert.match(page, /getBlogPost\(slug\)/);
  assert.match(page, /articleComponents\[post.slug\]/);
  assert.match(page, /notFound\(\)/);
  assert.match(page, /post.sections.map/);
  assert.match(page, /getRelatedBlogPosts\(post\)/);
  assert.match(page, /WhatsAppBookingLink/);
  assert.match(page, /post.excerpt, "article"/);
});

test("all posts are statically mapped to local MDX files only", () => {
  const mapping = read("src/content/blog/posts.ts");
  for (const post of blogPosts) {
    assert.ok(mapping.includes(`"${post.slug}"`));
    assert.ok(mapping.includes(`"./${post.slug}.mdx"`));
  }
  assert.match(mapping, /satisfies Record/);
  const next = read("next.config.ts");
  assert.match(next, /createMDX/);
  assert.match(next, /"mdx"/);
});

test("articles avoid fabricated reviews and harmful outcome promises", () => {
  for (const post of blogPosts) {
    const body = read(`src/content/blog/${post.slug}.mdx`);
    assert.doesNotMatch(body, /4\.9\/5|1000\+ happy clients|guaranteed success|certified astrologer/i);
    assert.match(body, /consultation|astrology|traditional/i);
  }
});
