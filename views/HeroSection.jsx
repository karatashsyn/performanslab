/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";
import { useEffect, useState } from "react";

const slides = [
  {
    before: "/ayse-demir-before.png",
    after: "/ayse-demir-after.png",
    name: "Ayşe Demir, 31",
  },
  {
    before: "/elif-yilmaz-before.png",
    after: "/elif-yilmaz-after.png",
    name: "Elif Yılmaz, 29",
  },
  {
    before: "/murat-kilic-before.png",
    after: "/murat-kilic-after.png",
    name: "Murat Kılıç, 30",
  },
  {
    before: "/serkan-arslan-before.png",
    after: "/serkan-arslan-after.png",
    name: "Serkan Öztürk, 40",
  },
  {
    before: "/hakan-arslan-before.png",
    after: "/hakan-arslan-after.png",
    name: "Hakan Arslan, 48",
  },
];

function BeforeAfterSlider({ imgHeight, showName = false }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="relative overflow-hidden" style={{ height: imgHeight }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center gap-1 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            {[
              { src: slide.before, label: "Önce", bg: "rgba(0,0,0,0.6)" },
              { src: slide.after, label: "Sonra", bg: "rgba(210,0,12,0.85)" },
            ].map(({ src, label, bg }) => (
              <div
                key={label}
                className="relative flex-1 min-w-0 overflow-hidden"
                style={{ height: imgHeight }}
              >
                <img
                  src={src}
                  alt={label}
                  className="w-full h-full object-cover object-top"
                />
                <span
                  className="absolute bottom-2 right-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm"
                  style={{
                    background: bg,
                    fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {showName && (
        <p
          className="text-center text-white/70 text-xs mt-2"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            minHeight: "1rem",
          }}
        >
          {slides[current].name}
        </p>
      )}

      <div className="flex justify-center gap-1.5 mt-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "16px" : "6px",
              height: "6px",
              background: i === current ? "#fff" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-start lg:items-center overflow-hidden"
      style={{ background: "#090A0D" }}
    >
      {/* Background hero image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
          loading="eager"
        />
        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,10,13,0.7) 0%, rgba(9,10,13,0.1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 pt-28 pb-[min(17vh,200px)] md:flex md:flex-col md:gap-10 lg:block lg:absolute lg:inset-0 lg:mx-auto lg:pt-0 lg:pb-0">
        {/* Left: text content */}
        <div className="lg:absolute lg:bottom-[min(17vh,200px)]">
          <h1
            className="text-white leading-none mb-4 max-sm:text-5xl text-[clamp(2.6rem,12vw,4.25rem)] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Postürünü test et. <br />
            <span className="max-sm:text-5xl font-semibold text-[clamp(2.6rem,12vw,4.25rem)]">
              Ücretsiz dene.
            </span>
          </h1>

          <p
            className="mb-8 max-w-[38rem] lg:max-w-[60vw] !font-normal text-[#D8D8D8] text-base sm:text-lg leading-[1.45rem] sm:leading-[1.5rem] tracking-[-0%]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            Kişiye özel postür analizi, fonksiyonel antrenman ve performans{" "}
            <br className="hidden sm:block" />
            testleriyle vücudunu yeniden hizala
          </p>

          <div className="flex flex-col gap-3">
            <div className="w-full sm:w-auto">
              <button
                onClick={() => {
                  trackCtaClick("Özel Ders Al", "hero_ana_buton");
                  document
                    .getElementById("takvim")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto font-semibold bg-[#D2000C] text-white px-10 border-[1.5px] border-[#850008] py-3 hover:bg-opacity-90 rounded-sm"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                }}
              >
                Ücretsiz Deneme Dersi
              </button>
            </div>

            <Link
              href="/uygulamamiz"
              onClick={() =>
                trackCtaClick("Uygulamamızı İndir", "hero_uygulama_indir")
              }
              className="w-full sm:hidden"
            >
              <button
                className="w-full font-semibold bg-transparent text-white px-10 border-[1.5px] border-white py-3 hover:bg-white/10 rounded-sm"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                }}
              >
                Uygulamamızı İndir
              </button>
            </Link>
          </div>

          {/* Mobile / tablet: before-after slider below CTA buttons */}
          <div className="lg:hidden mt-10 w-full">
            <BeforeAfterSlider imgHeight="190px" showName={false} />
          </div>
        </div>

        {/* Right: before-after auto-sliding panel (desktop only) */}
        <div className="hidden lg:block lg:w-[480px] lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-[50%]">
          <BeforeAfterSlider imgHeight="320px" showName />
        </div>
      </div>

      {/* Mobile: scroll-to-reviews hint */}
      <div
        className="sm:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() =>
          document
            .getElementById("yorumlar")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          className="text-sm font-semibold text-white whitespace-nowrap"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Yorumları Gör
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
