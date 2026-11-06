/**
 * Editorial metadata for source-controlled MDX files.
 * New posts are added to this list and to src/content/blog/posts.ts.
 * No fictitious named author, credentials, ratings or publication history.
 */
export const blogCategories = [
  { slug: "all", label: "All Articles" },
  { slug: "kundli", label: "Kundli & Birth Charts" },
  { slug: "relationships", label: "Relationships" },
  { slug: "career", label: "Career" },
  { slug: "numerology", label: "Numerology" },
  { slug: "vastu", label: "Vastu" },
  { slug: "muhurat", label: "Muhurat" },
] as const;

export type BlogCategory = Exclude<(typeof blogCategories)[number]["slug"], "all">;
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readingMinutes: number;
  keywords: readonly string[];
  sections: readonly { id: string; title: string }[];
};

/** Educational guides introduced with the blog. Listed in deliberate editorial order. */
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "understanding-kundli-basics",
    title: "Understanding Kundli: A Beginner’s Guide to Birth Charts",
    excerpt: "Explore the vocabulary of signs, planets and houses found in traditional Vedic birth-chart interpretation.",
    category: "kundli",
    readingMinutes: 4,
    keywords: ["kundli", "janam kundli", "vedic", "birth chart", "houses", "planets"],
    sections: [
      { id: "what-is-a-kundli", title: "What is a Kundli?" },
      { id: "the-role-of-birth-information", title: "The role of birth information" },
      { id: "signs-planets-and-houses", title: "Signs, planets and houses" },
      { id: "questions-to-ask-during-a-consultation", title: "Questions to ask during a consultation" },
    ],
  },
  {
    slug: "relationship-compatibility-in-vedic-astrology",
    title: "Relationship Compatibility in Vedic Astrology",
    excerpt: "An introduction to traditional compatibility ideas and why real communication and consent remain essential.",
    category: "relationships",
    readingMinutes: 4,
    keywords: ["marriage", "compatibility", "kundli matching", "relationships", "partnership"],
    sections: [
      { id: "what-does-compatibility-mean", title: "What does compatibility mean?" },
      { id: "what-traditional-matching-considers", title: "What traditional matching considers" },
      { id: "what-a-chart-cannot-tell-you", title: "What a chart cannot tell you" },
      { id: "preparing-your-questions", title: "Preparing your questions" },
    ],
  },
  {
    slug: "career-questions-and-vedic-astrology",
    title: "Career Questions and Vedic Astrology: A Practical Perspective",
    excerpt: "How people approach work-related astrology questions without confusing interpretations with career guarantees.",
    category: "career",
    readingMinutes: 4,
    keywords: ["career", "work", "vedic astrology", "job", "education", "career guidance"],
    sections: [
      { id: "career-themes-in-traditional-astrology", title: "Career themes in traditional astrology" },
      { id: "use-questions-not-certainty", title: "Use questions, not certainty" },
      { id: "practical-factors-still-matter", title: "Practical factors still matter" },
      { id: "how-to-prepare-for-a-conversation", title: "How to prepare for a conversation" },
    ],
  },
  {
    slug: "numerology-numbers-and-meaning",
    title: "Numerology: Numbers, Symbolism and Common Questions",
    excerpt: "A clear introduction to number-based traditions, common methods and the limits of numerology claims.",
    category: "numerology",
    readingMinutes: 4,
    keywords: ["numerology", "name", "numbers", "birth date", "symbolism"],
    sections: [
      { id: "what-is-numerology", title: "What is numerology?" },
      { id: "more-than-one-method", title: "More than one method" },
      { id: "reading-symbolic-meanings", title: "Reading symbolic meanings" },
      { id: "questions-worth-asking", title: "Questions worth asking" },
    ],
  },
  {
    slug: "vastu-basics-for-home",
    title: "Vastu Basics for the Home: Space, Direction and Tradition",
    excerpt: "Explore traditional Vastu ideas while keeping structural safety, comfort and building rules separate.",
    category: "vastu",
    readingMinutes: 4,
    keywords: ["vastu", "home", "direction", "layout", "workspace"],
    sections: [
      { id: "what-is-vastu", title: "What is Vastu?" },
      { id: "common-topics-in-a-consultation", title: "Common topics in a consultation" },
      { id: "separating-tradition-from-safety", title: "Separating tradition from safety" },
      { id: "what-to-bring-to-a-discussion", title: "What to bring to a discussion" },
    ],
  },
  {
    slug: "muhurat-and-traditional-timing",
    title: "Muhurat: Understanding Traditional Timing for Occasions",
    excerpt: "What auspicious timing means in astrology and how to balance tradition with actual event logistics.",
    category: "muhurat",
    readingMinutes: 4,
    keywords: ["muhurat", "timing", "wedding", "housewarming", "ceremony"],
    sections: [
      { id: "what-does-muhurat-mean", title: "What does Muhurat mean?" },
      { id: "why-details-can-matter", title: "Why details can matter" },
      { id: "balance-tradition-with-planning", title: "Balance tradition with planning" },
      { id: "before-you-discuss-dates", title: "Before you discuss dates" },
    ],
  },
  {
    slug: "preparing-for-an-astrology-consultation",
    title: "How to Prepare for an Astrology Consultation",
    excerpt: "Choose useful questions, organize birth details and confirm fees and session arrangements before an office or online astrology consultation.",
    category: "kundli",
    readingMinutes: 4,
    keywords: ["astrology consultation", "prepare", "birth details", "prayagraj", "online"],
    sections: [
      { id: "start-with-your-questions", title: "Start with your questions" },
      { id: "prepare-relevant-details", title: "Prepare relevant details" },
      { id: "agree-on-the-session", title: "Agree on the session" },
      { id: "visiting-or-connecting-online", title: "Visiting or connecting online" },
    ],
  },
  {
    slug: "online-astrology-abroad-time-zones",
    title: "Booking Online Astrology from Abroad: Time Zones & Birth Details",
    excerpt: "A practical guide for international clients: separate birth information from your current location and confirm your appointment in both time zones.",
    category: "kundli",
    readingMinutes: 4,
    keywords: ["online astrology", "international", "time zone", "hindi", "english", "abroad"],
    sections: [
      { id: "two-locations-two-purposes", title: "Two locations, two purposes" },
      { id: "confirm-both-time-zones", title: "Confirm both time zones" },
      { id: "choose-language-and-format", title: "Choose language and format" },
      { id: "send-a-clear-first-message", title: "Send a clear first message" },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function filterBlogPosts(query: string, category: (typeof blogCategories)[number]["slug"]): BlogPost[] {
  const normalized = query.trim().toLocaleLowerCase("en-US");
  return blogPosts.filter((post) => {
    if (category !== "all" && post.category !== category) return false;
    if (!normalized) return true;
    const searchText = [post.title, post.excerpt, post.category, ...post.keywords].join(" ").toLocaleLowerCase("en-US");
    return searchText.includes(normalized);
  });
}

export function getRelatedBlogPosts(post: BlogPost, limit = 3): BlogPost[] {
  const other = blogPosts.filter((otherPost) => otherPost.slug !== post.slug);
  return [...other.filter((otherPost) => otherPost.category === post.category),
    ...other.filter((otherPost) => otherPost.category !== post.category)].slice(0, limit);
}
