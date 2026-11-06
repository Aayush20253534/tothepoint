import Link from "next/link";

const logo = "/images/smartjyotishi-logo.webp";

/** Compact horizontal crop of the supplied SmartJyotishi artwork. */
export function BrandMark() {
  return (
    <Link href="/" aria-label="SmartJyotishi, home" className="group inline-flex min-w-0 shrink-0 items-center rounded-lg px-1 py-1 transition-colors hover:bg-white/5">
      {/* A native img is used because this small, inlined brand asset has fixed dimensions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt="SmartJyotishi" width={248} height={48} className="block h-auto w-[188px] object-contain transition-[filter] duration-200 group-hover:brightness-110 sm:w-[218px] lg:w-[228px]" />
    </Link>
  );
}
