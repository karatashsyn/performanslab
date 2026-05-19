/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { trackCtaClick } from "@/lib/analytics";

const features = ["Postür Analizi", "Kişiye Özel Program", "Antrenman Takibi"];

function FeatureCard({ children, side, index }) {
  const offset = index * 43;

  return (
    <div
      className="w-[313px] px-6 py-3 text-lg font-medium"
      style={{
        marginLeft: side === "left" ? `${offset}px` : undefined,
        marginRight: side === "right" ? `${offset}px` : undefined,
        fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
        color: "#FFFFFF",
        textAlign: side === "right" ? "right" : "left",
        background:
          side === "left"
            ? "linear-gradient(90deg, rgba(80,80,80,0.36) 0%, rgba(14,14,14,0) 100%)"
            : "linear-gradient(270deg, rgba(80,80,80,0.36) 0%, rgba(14,14,14,0) 100%)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

export default function AppSection() {
  return (
    <section
      id="app"
      className="py-24 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #343434 0%, #000000 100%)",
      }}
    >
      <div className="max-w-[1415px] mx-auto px-5 sm:px-8 lg:px-0">
        {/* Heading */}
        <h2
          className="font-bold text-center text-white mb-16"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            lineHeight: 1.2,
          }}
        >
          Uygulamamız Yakında
          <br />
          tüm Platformlarda !
        </h2>

        {/* Three column layout */}
        <div className="flex items-center justify-between gap-0">
          {/* Left feature tags */}
          <div className="hidden lg:flex w-[400px] flex-shrink-0 flex-col gap-[18px]">
            {features.map((f, i) => (
              <FeatureCard key={i} side="left" index={i}>
                {f}
              </FeatureCard>
            ))}
          </div>

          {/* Center: app mockup */}
          <div className="flex-[100] flex min-w-0 justify-center">
            <img
              src="/mockup-app-section.png"
              alt="PerformansLab App"
              className="w-full max-w-[420px] lg:max-w-[566px] drop-shadow-2xl"
            />
          </div>

          {/* Right feature tags */}
          <div className="hidden lg:flex w-[400px] flex-shrink-0 flex-col items-end gap-[18px]">
            {features.map((f, i) => (
              <FeatureCard key={i} side="right" index={i}>
                {f}
              </FeatureCard>
            ))}
          </div>
        </div>

        {/* Mobile feature tags */}
        <div className="flex lg:hidden flex-wrap justify-center gap-3 mt-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm font-medium"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "rgba(255,255,255,0.85)",
                background: "#222222",
                border: "1px solid rgba(255,255,255,0.00)",
                borderRadius: "6px",
                boxShadow:
                  "inset 0 -14px 20px rgba(0,0,0,0.78), 0 12px 30px rgba(0,0,0,0.36)",
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/performanslab-app" onClick={() => trackCtaClick("Erken Kayıt Ol", "app_section")}>
            <button
              className="text-white font-semibold px-10 py-3.5 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: "#D2000C",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Erken Kayıt Ol →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
