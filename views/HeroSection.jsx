/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#090A0D" }}
    >
      {/* Background hero image at 40% opacity */}
      <div className="absolute inset-0">
        <img
          src="/hero-image.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 1 }}
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

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 pt-28 pb-20 lg:pb-0 lg:absolute lg:inset-x-0 lg:bottom-[170px] flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: text content */}
        <div className="flex-1 max-w-xl">
          <h1
            className="text-white leading-none mb-4 text-[4.25rem] tracking-[-4%]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Sana Özel <br />
            <span className="whitespace-nowrap text-[4.25rem]">
              <span className="font-semibold text-[4.25rem]">Sonuç Odaklı</span>{" "}
              Antrenman
            </span>
          </h1>

          <p
            className="mb-8 !font-normal text-[#D8D8D8] text-[1.5rem] leading-[1.5rem] tracking-[-2%]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            Size uygun Fonksiyonel antrenmanlar, atletik antrenmanlar, postür
            düzeltici egzersizler, performans testleri planlar.
          </p>

          <Link href="/iletisim">
            <button
              className="font-semibold text-white px-8 py-3 text-sm hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: "#D2000C",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Online Eğitim Al
            </button>
          </Link>
        </div>

        {/* Right: iPhone mockup + badge */}
        <div className="relative flex-shrink-0 hidden md:block w-[240px] h-[320px]">
          <img
            src="/mockup-hero.png"
            alt="PerformansLab App"
            className="absolute right-4 top-0 z-10 w-[180px] max-w-[200px]"
          />

          {/* Badge */}
          <div
            className="absolute bottom-6 left-0 z-20 px-4 py-2 flex items-center gap-3 text-white"
            style={{ background: "#D2000C" }}
          >
            <span
              className="text-sm font-semibold whitespace-nowrap"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Uygulamamız Yakında !
            </span>
            <Link
              href="/#app"
              className="text-xs font-medium text-white flex items-center gap-1 border-l border-white/30 pl-3 whitespace-nowrap"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Erken Kayıt Ol ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
