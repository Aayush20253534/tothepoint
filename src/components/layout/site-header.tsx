"use client";

import { WhatsAppBookingLink } from "@/components/booking/whatsapp-booking-link";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/config/navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuNavRef = useRef<HTMLElement>(null);

  // Lock background scrolling while the touch menu is open.
  // Escape returns keyboard focus to the trigger.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(menuNavRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
        const first = menuButtonRef.current;
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [menuOpen]);


  return (
    <header
      className="sticky top-0 z-50 border-b border-gold/20 bg-navy-deep/95 shadow-[0_10px_40px_rgba(0,0,0,.18)] backdrop-blur-xl"
    >
      <Container className="flex h-[70px] items-center justify-between gap-5 lg:h-[74px]">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:flex">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <Link
                href={item.href}
                key={item.href}
                aria-current={active ? "page" : undefined}
                className={["rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors", active ? "text-gold" : "text-cream/75 hover:bg-white/5 hover:text-cream"].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <WhatsAppBookingLink size="small" icon="arrow-up-right">Book Consultation</WhatsAppBookingLink>
        </div>

        <button
          type="button"
          ref={menuButtonRef}
          className="relative z-20 inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-gold/30 text-gold transition-colors hover:bg-gold/10 xl:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={23} />
        </button>
      </Container>

      {menuOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Dismiss mobile navigation"
          className="fixed inset-x-0 bottom-0 top-[70px] z-0 bg-[#020d1b]/70 xl:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <nav
        ref={menuNavRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-70px)] overscroll-contain overflow-y-auto border-b border-gold/25 bg-navy px-4 pt-4 pb-[max(20px,env(safe-area-inset-bottom))] shadow-2xl sm:px-8 xl:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={["flex min-h-12 items-center justify-between rounded-lg px-4 py-3 font-medium", active ? "bg-gold/10 text-gold" : "text-cream hover:bg-white/5"].join(" ")}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                  <Icon name="chevron-right" size={17} />
                </Link>
              </li>
            );
          })}
          <li className="mt-3">
            <WhatsAppBookingLink icon="message" className="w-full" onClick={() => setMenuOpen(false)}>Book Consultation</WhatsAppBookingLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
