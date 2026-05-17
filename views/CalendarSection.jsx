/* eslint-disable @next/next/no-img-element */

export default function CalendarSection() {
  return (
    <section className="py-24" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="font-bold leading-[120%]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              color: "#111",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            }}
          >
            Ücretsiz Deneme Dersi
          </h2>
          <p
            className="leading-[125%]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#555",
            }}
          >
            Kısa bir online görüşme için sana uygun günü ve saati seç.
          </p>
        </div>

        {/* Widget card */}
        <div
          className="max-w-[980px] mx-auto rounded-2xl overflow-hidden flex flex-col md:flex-row"
          style={{
            border: "1px solid #e8e8e8",
            boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* Left panel */}
          <div
            className="flex flex-col gap-5 p-8 md:w-[320px] flex-shrink-0"
            style={{ borderRight: "1px solid #efefef" }}
          >
            {/* <div>
              <img
                src="/logo-for-white-bg.png"
                alt="PerformansLab"
                className="h-8 w-auto object-contain ml-6"
                style={{ filter: "none" }}
              />
              <div className="h-[1px] w-full bg-slate-100 mt-4" />
            </div> */}

            <div>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "#888",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Fatih Özkan ile
              </p>
              <h3
                className="font-bold"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  color: "#111",
                  fontSize: "1.125rem",
                }}
              >
                15 Dakikalık Görüşme
              </h3>
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "#555",
                fontSize: "0.875rem",
                lineHeight: "1.6",
              }}
            >
              Fatih Özkan ile 15 dakikada atletik hedeflerini, antrenman
              geçmişini ve sana en uygun programı konuşabiliriz.
            </p>

            <a
              href="https://wa.me/905447320331"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "#128C7E",
                marginTop: "auto",
              }}
            >
              <img src="/whatsapp.svg" alt="whatsapp" className="w-5 h-5" />
              WhatsApp ile ulaş
            </a>
          </div>

          {/* Right panel: calendar placeholder */}
          <div
            className="flex-1 flex flex-col items-center justify-center p-10 gap-4"
            style={{ background: "#fafafa", minHeight: "320px" }}
          >
            {/* Simple calendar grid mockup */}
            <div className="w-full max-w-[340px]">
              <div className="flex items-center justify-between mb-4">
                <span
                  className="font-semibold text-sm"
                  style={{
                    fontFamily:
                      "var(--font-montserrat), Montserrat, sans-serif",
                    color: "#111",
                  }}
                >
                  Haziran 2026
                </span>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-700 text-lg leading-none">
                    &lsaquo;
                  </button>
                  <button className="text-gray-400 hover:text-gray-700 text-lg leading-none">
                    &rsaquo;
                  </button>
                </div>
              </div>
              <div
                className="grid grid-cols-7 gap-1 text-center text-xs mb-2"
                style={{
                  color: "#aaa",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div
                className="grid grid-cols-7 gap-1 text-center text-sm"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {[
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                  25,
                  26,
                  27,
                  28,
                  29,
                  30,
                ].map((d, i) => (
                  <div
                    key={i}
                    className="py-1.5 rounded-full cursor-pointer hover:bg-red-50 transition-colors"
                    style={{
                      color: d ? "#333" : "transparent",
                      background: d === 15 ? "#D2000C" : undefined,
                      color: d === 15 ? "#fff" : d ? "#333" : "transparent",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <p
              style={{
                fontFamily: "var(--font-inter), Inter, sans-serif",
                color: "#aaa",
                fontSize: "0.8rem",
              }}
            >
              Takvim Bölümü
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
