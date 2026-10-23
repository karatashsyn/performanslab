"use client";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

const DEFAULT_HEADING = "Duruşunu 1 dakikada ölç";
const DEFAULT_TEXT = "İki fotoğrafla omuz, pelvis, baş ve gövde hizanı ücretsiz analiz et.";
const DEFAULT_BUTTON_LABEL = "Ücretsiz Postür Testi";

// Renders a Sanity-configured CTA to /postur-analizi inside blog content
// (lib/posture/copy.js owns the demo's own copy; this box is blog-editorial,
// so its text comes from the blog's `postureCta` field with static fallbacks).
export default function PostureCtaBox({ heading, text, buttonText, blogSlug, position }) {
  const label = buttonText || DEFAULT_BUTTON_LABEL;
  const handleClick = () => trackCtaClick(label, `blog_${position}_${blogSlug || "unknown"}`);

  return (
    <>
      {/* Mobile: full-width bold button, no description/icon. */}
      <Link
        href="/postur-analizi"
        onClick={handleClick}
        className="not-prose my-8 block rounded-[6px] bg-[#D2000C] px-6 py-5 text-center no-underline transition-colors hover:bg-[#a50009] sm:hidden"
      >
        <span className="font-montserrat text-xl font-bold text-white">{heading || DEFAULT_HEADING} →</span>
      </Link>

      {/* Tablet/desktop: richer card with description + icon. */}
      <Link
        href="/postur-analizi"
        onClick={handleClick}
        className="not-prose my-8 hidden items-center justify-between gap-5 rounded-[14px] bg-[#D2000C] p-7 no-underline transition-colors hover:bg-[#a50009] sm:flex"
      >
        <div>
          <p className="font-montserrat text-lg font-bold text-white">{heading || DEFAULT_HEADING}</p>
          <p className="mt-1 text-sm text-white/85">{text || DEFAULT_TEXT}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl text-white">
          →
        </span>
      </Link>
    </>
  );
}
