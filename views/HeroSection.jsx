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

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 pt-28 pb-[min(17vh,200px)] lg:absolute lg:inset-0 lg:mx-auto lg:pt-0 lg:pb-0">
        {/* Left: text content */}
        <div className="lg:absolute lg:bottom-[min(17vh,200px)]">
          <h1
            className="text-white leading-none mb-4 text-[clamp(2.6rem,12vw,4.25rem)] tracking-[-4%]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Sana Özel <br className="max-sm:hidden" />
            <span className="sm:whitespace-nowrap text-[clamp(2.6rem,12vw,4.25rem)]">
              <span className="font-semibold text-[clamp(2.6rem,12vw,4.25rem)]">Sonuç Odaklı</span>{" "}
              Antrenman
            </span>
          </h1>

          <p
            className="mb-8 max-w-[38rem] lg:max-w-[60vw] !font-normal text-[#D8D8D8] text-base sm:text-xl leading-[1.45rem] sm:leading-[1.5rem] tracking-[-0%]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            Size uygun Fonksiyonel antrenmanlar, atletik antrenmanlar, postür{" "}
            <br className="hidden sm:block" />
            düzeltici egzersizler, performans testleri planlar.
          </p>

          <Link href="/iletisim">
            <button
              className="font-semibold bg-[#D2000C] text-white px-8 py-3 hover:bg-opacity-90 "
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Özel Ders Al
            </button>
          </Link>
        </div>

        {/* Right: iPhone mockup + actions */}
        <div className="relative flex-shrink-0 hidden w-[320px] md:block lg:absolute lg:right-16 lg:top-1/2 lg:-translate-y-[50%]">
          <div className="hero-app-fragment flex flex-col items-center gap-9">
            <img
              src="/mockup-hero.png"
              alt="PerformansLab App"
              className="hero-app-mockup z-10 w-[200px] max-w-[200px]"
            />

            <div className="cursor-pointer group hero-app-actions z-20 flex flex-col items-start">
              <Link href="/#app">
                <span
                  className="select-none cursor-pointer hero-app-label whitespace-nowrap px-4 py-2 text-sm font-semibold text-white"
                  style={{
                    fontFamily:
                      "var(--font-montserrat), Montserrat, sans-serif",
                  }}
                >
                  Uygulamamız Yakında !
                </span>
              </Link>
              <div className="group-hover:opacity-50">
                <Link
                  href="/#app"
                  className="hero-app-link mt-1 flex items-center gap-1 whitespace-nowrap font-semibold hover:opacity-50"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    textShadow: "0 1px 10.9px rgba(255,255,255,0.6)",
                  }}
                >
                  Erken Kayıt Ol{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
