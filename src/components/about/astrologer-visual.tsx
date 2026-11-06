import { CelestialArt } from "@/components/ui/celestial-art";

/**
 * Decorative stand-in, not a photo or likeness of the client.
 * Replace the mark with an approved real portrait when one is supplied.
 */
export function AstrologerVisual({ variant = "hero" }: { variant?: "hero" | "journey" }) {
  const compact = variant === "journey";
  return (
    <div
      className={[
        "relative isolate mx-auto w-full overflow-hidden border border-gold/35 bg-[radial-gradient(ellipse_at_50%_18%,#233a50_0%,#0c1b2e_57%,#030e1c_100%)] shadow-[0_24px_80px_rgba(0,0,0,.33)]",
        compact ? "max-w-[440px] rounded-[45%_45%_24px_24px] aspect-[.84]" : "max-w-[520px] rounded-[45%_45%_24px_24px] aspect-[1.04]",
      ].join(" ")}
      role="img"
      aria-label="Decorative celestial illustration representing SmartJyotishi"
    >
      <div aria-hidden="true" className="absolute inset-0 star-field opacity-35" />
      <div aria-hidden="true" className="absolute -left-14 right-[-60px] top-[-16%] opacity-80">
        <CelestialArt className="max-w-none" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_63%,transparent_20%,rgba(3,14,28,.1)_50%,rgba(3,14,28,.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center bg-gradient-to-t from-navy-deep via-navy-deep/90 to-transparent px-5 pb-[9%] pt-[29%] text-center">
        <span className="inline-flex size-[clamp(76px,12vw,112px)] items-center justify-center rounded-full border border-gold/50 bg-navy-deep/90 font-display text-[clamp(31px,5vw,48px)] text-gold-light shadow-[0_0_48px_rgba(232,182,100,.12)]">
          HS
        </span>
        <p className="mt-4 font-display text-[clamp(21px,2.7vw,30px)] leading-tight text-cream">Hariom Shrivastava</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.22em] text-gold-light sm:text-xs">SmartJyotishi</p>
      </div>
      <svg viewBox="0 0 500 440" fill="none" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
        <path d="M16 368c90-41 162-42 233 0s145 46 236 1" stroke="#e8b664" strokeOpacity=".25" />
        <path d="M40 388c85-34 154-34 218-1s125 40 201 3" stroke="#e8b664" strokeOpacity=".15" />
        <path d="m74 60 3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9ZM429 116l3 9 9 3-9 3-3 9-3-9-9-3 9-3 3-9Z" fill="#f8d99d" />
      </svg>
    </div>
  );
}
