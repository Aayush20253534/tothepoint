export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Online", href: "/online-astrology-consultation" },
  { label: "Prayagraj", href: "/astrologer-in-prayagraj" },
  { label: "Contact", href: "/contact" },
] as const;

export const policyNavigation = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
] as const;

/** These pages are placeholders until their corresponding roadmap phases. */
export const placeholderPages: Record<string, { title: string; message: string; phase: string }> = {
};
