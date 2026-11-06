#!/usr/bin/env node
/** Read-only deployment checks, plus a deliberately invalid contact POST.
 * Does not book appointments, send real emails, or require secrets.
 * Run: BASE_URL=https://your-production-domain npm run smoke:production
 */
const raw = process.env.BASE_URL;
if (!raw) {
  console.error("BASE_URL must be an actual accessible HTTPS site URL.");
  process.exit(2);
}
let origin;
try {
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:" || (parsed.pathname !== "/" && parsed.pathname !== "") ||
      parsed.search || parsed.hash || !parsed.hostname.includes(".")) throw Error("invalid origin");
  origin = parsed.origin;
} catch {
  console.error("BASE_URL must be a complete HTTPS origin without a path, query or fragment.");
  process.exit(2);
}
const routes = [
  "/", "/astrologer-in-prayagraj", "/online-astrology-consultation", "/about", "/services", "/services/kundli-analysis",
  "/services/marriage-relationship", "/services/career-guidance",
  "/services/numerology", "/services/vastu", "/services/muhurat",
  "/blog", "/blog/understanding-kundli-basics",
  "/blog/relationship-compatibility-in-vedic-astrology",
  "/blog/career-questions-and-vedic-astrology",
  "/blog/numerology-numbers-and-meaning",
  "/blog/vastu-basics-for-home", "/blog/muhurat-and-traditional-timing",
  "/blog/preparing-for-an-astrology-consultation", "/blog/online-astrology-abroad-time-zones",
  "/contact", "/testimonials", "/privacy-policy", "/terms-and-conditions",
  "/refund-policy",
];
const failures=[];
async function check(path, opts) {
  try {
    const response=await fetch(origin+path,{redirect:"manual",signal:AbortSignal.timeout(12000),...opts});
    return response;
  } catch(err) {
    failures.push(`${path}: ${err instanceof Error?err.message:String(err)}`);
    return null;
  }
}
for(const path of routes) {
  const res=await check(path);
  if(!res)continue;
  const html=await res.text();
  if(res.status!==200 || !/<h1(?:\s|>)/i.test(html)){
    failures.push(`${path}: expected HTTP 200 with an H1, received HTTP ${res.status}`);
  }else console.log(`PASS ${path} (200)`);
  const draft = ["/testimonials", "/privacy-policy", "/terms-and-conditions", "/refund-policy"].includes(path);
  if (!draft) {
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    if (!canonical || new URL(canonical).href !== new URL(origin + path).href) failures.push(`${path}: wrong or missing production canonical: ${canonical}`);
    if (/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(html)) failures.push(`${path}: public page is noindex`);
    if (!html.includes('application/ld+json')) failures.push(`${path}: missing structured data`);
  }
}
const favicon=await check("/icon.svg");
if(favicon && (favicon.status!==200 || !favicon.headers.get("content-type")?.includes("svg"))) failures.push("icon.svg is missing or wrong content type");
const openGraph=await check("/opengraph-image");
if(openGraph && (openGraph.status!==200 || !openGraph.headers.get("content-type")?.includes("image/png"))) failures.push("Open Graph image is missing");
const robots=await check("/robots.txt");
if(robots){
 const text=await robots.text();
 if(robots.status!==200 || !text.includes("User-agent:") || /^Disallow: \/$/m.test(text) || !text.includes(`Sitemap: ${origin}/sitemap.xml`))failures.push("/robots.txt invalid");
 else console.log("PASS robots.txt");
}
const sitemap=await check("/sitemap.xml");
if(sitemap){
 const text=await sitemap.text();
 const urls = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
 if(sitemap.status!==200 || urls.length < 21 || urls.some(url => !url.startsWith(origin + "/"))) failures.push("/sitemap.xml failed or canonical URL coverage is incomplete");
 else console.log(`PASS sitemap.xml (${urls.length} canonical entries)`);
}
const invalid=await check("/api/contact",{
 method:"POST",headers:{"Content-Type":"application/json"},
 body:JSON.stringify({}),
});
if(invalid){
 if(invalid.status!==422) failures.push(`/api/contact: expected 422 for invalid data, received ${invalid.status}`);
 else console.log("PASS /api/contact rejects invalid data (no email sent)");
}
const redirect=await check("/booking");
if(redirect){
 const target=redirect.headers.get("location")??"";
 if(![301,302,303,307,308].includes(redirect.status)||!target.includes("wa.me/917007962637")){
  failures.push(`/booking: redirect invalid (HTTP ${redirect.status})`);
 }else console.log("PASS /booking WhatsApp redirect");
}
if(failures.length){
 console.error(`\nFAIL: ${failures.length} production checks did not pass.`);
 for(const failure of failures)console.error("- "+failure);
 console.error("Vercel Authentication, missing deployment, DNS errors, or application failures may block checks.");
 process.exit(1);
}
console.log(`\nPASS: Production smoke checks succeeded for ${origin}.`);
