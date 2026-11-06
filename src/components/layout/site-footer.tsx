import Link from "next/link";
import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";
import { primaryNavigation, policyNavigation } from "@/config/navigation";
import { servicePreviews } from "@/config/home";
import { siteConfig } from "@/config/site";
import { getConsultationWhatsAppUrl } from "@/lib/whatsapp";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20 bg-[#020b17]">
      <Container>
        <div className="grid gap-9 py-11 sm:grid-cols-2 lg:grid-cols-[1.3fr_.75fr_.98fr_1.06fr] lg:gap-12 lg:py-14">
          <div className="max-w-xs">
            <BrandMark />
            <p className="mt-5 text-sm leading-7 text-cream/70">
              Astrology consultations with {siteConfig.astrologer} in Prayagraj and online worldwide.
              Personal conversations in Hindi and English.
            </p>
            <WhatsAppBookingLink variant="outline" size="small" icon="message" className="mt-5">
              Enquire on WhatsApp
            </WhatsAppBookingLink>
          </div>
          <nav aria-label="Footer quick links">
            <h2 className="font-display text-lg font-semibold text-gold-light">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-flex min-h-11 items-center text-sm text-cream/70 transition-colors hover:text-gold-light sm:min-h-0">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer services">
            <h2 className="font-display text-lg font-semibold text-gold-light">Our Services</h2>
            <ul className="mt-4 space-y-2.5">
              {servicePreviews.map((item) => (
                <li key={item.slug}>
                  <Link href={"/services/"+item.slug} className="inline-flex min-h-11 items-center text-sm text-cream/70 transition-colors hover:text-gold-light sm:min-h-0">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display text-lg font-semibold text-gold-light">Get in Touch</h2>
            <div className="mt-4 flex flex-col gap-4">
              <a href={getConsultationWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-sm text-cream/70 transition-colors hover:text-gold-light">
                <Icon name="message" size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>+91 {siteConfig.whatsappNumber.slice(2)}</span>
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`} className="flex items-start gap-3 break-all text-sm text-cream/70 transition-colors hover:text-gold-light">
                <Icon name="mail" size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>{siteConfig.contactEmail}</span>
              </a>
              <p className="text-sm leading-6 text-cream/70">Prayagraj, Uttar Pradesh, India<br/>Office visits by appointment. Confirm directions on WhatsApp.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-gold/15 py-5 text-xs text-cream/55 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <nav aria-label="Policies" className="flex flex-wrap gap-x-5 gap-y-2">
            {policyNavigation.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center hover:text-gold-light sm:min-h-0">{item.label}</Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
