import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icons";

export function ConsultationOptions() {
  return (
    <section aria-labelledby="consultation-options-title" className="border-y border-gold/20 bg-navy py-14 sm:py-20">
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Choose how we connect</p>
          <h2 id="consultation-options-title" className="mt-3 font-display text-3xl text-cream sm:text-4xl">In Prayagraj. Connected worldwide.</h2>
          <p className="mt-4 text-sm leading-7 text-muted">Personal consultations with Hariom Shrivastava, in Hindi and English.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { href: "/astrologer-in-prayagraj", kicker: "Visit the office", title: "Astrologer in Prayagraj", body: "Plan a consultation in Prayagraj (Allahabad). Confirm your appointment and office directions before visiting.", cta: "Plan your Prayagraj consultation" },
            { href: "/online-astrology-consultation", kicker: "India & worldwide", title: "Online astrology consultations", body: "Discuss your questions from wherever you live. Agree on your preferred language, time zone and session format.", cta: "Explore online consultations" },
          ].map((option) => (
            <Link key={option.href} href={option.href} className="group rounded-2xl border border-gold/25 bg-navy-deep p-6 transition-colors hover:border-gold/70 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{option.kicker}</p>
              <h3 className="mt-3 font-display text-2xl text-cream">{option.title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{option.body}</p>
              <span className="mt-6 flex items-center gap-3 text-sm font-semibold text-gold-light">{option.cta}<Icon name="arrow-right" size={18}/></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
