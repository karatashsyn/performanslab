/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const features = [
  "Postür Analizi",
  "Antrenman Takibi",
  "Beslenme Programı",
];

export default function AppSection() {
  return (
    <section
      id="app"
      className="py-24 overflow-hidden"
      style={{ background: "#090A0D" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
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
        <div className="flex items-center justify-between gap-8">
          {/* Left feature tags */}
          <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
            {features.map((f, i) => (
              <div
                key={i}
                className="px-5 py-3 text-sm font-medium"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  color: "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </div>
            ))}
          </div>

          {/* Center: app mockup */}
          <div className="flex-1 flex justify-center">
            <img
              src="/mockup-app-section.png"
              alt="PerformansLab App"
              className="w-full max-w-[420px] drop-shadow-2xl"
            />
          </div>

          {/* Right feature tags */}
          <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
            {features.map((f, i) => (
              <div
                key={i}
                className="px-5 py-3 text-sm font-medium"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  color: "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile feature tags */}
        <div className="flex md:hidden flex-wrap justify-center gap-3 mt-8">
          {[...features, ...features].map((f, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm font-medium"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
              }}
            >
              {f}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/iletisim">
            <button
              className="text-white font-semibold px-10 py-3.5 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: "#D2000C",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Erkenden Kayıt Ol →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
