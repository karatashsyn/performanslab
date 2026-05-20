/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const treatments = [
  {
    beforeImg: "/ayse-demir-before.png",
    resultImg: "/ayse-demir-after.png",
    name: "Ayşe Demir, 31",
    desc: "Postür iyileştirici antrenmanlardan ve uygun diyetten sonra sırt duruşunda daha dengeli görünüm.",
  },
  {
    beforeImg: "/elif-yilmaz-before.png",
    resultImg: "/elif-yilmaz-after.png",
    name: "Elif Yılmaz, 29",
    desc: "Kişiye özel kuvvet antrenmanları ve sürdürülebilir beslenme planından sonra bel-sırt bölgesinde toparlanma.",
  },
  {
    beforeImg: "/murat-kilic-before.png",
    resultImg: "/murat-kilic-after.png",
    name: "Murat Kılıç, 30",
    desc: "Yağ kaybı odaklı diyet ve düzenli direnç antrenmanlarından sonra daha fit ve dengeli vücut kompozisyonu.",
  },
  {
    beforeImg: "/serkan-arslan-before.png",
    resultImg: "/serkan-arslan-after.png",
    name: "Serkan Öztürk, 40",
    desc: "Analiz sonrası hazırlanan core programıyla yağ oranında azalma.",
  },
  {
    beforeImg: "/hakan-arslan-before.png",
    resultImg: "/hakan-arslan-after.png",
    name: "Hakan Arslan, 48",
    desc: "Postür iyileştirici antrenmanlar ve uygun beslenme sürecinden sonra karın bölgesinde azalma ve daha kontrollü duruş.",
  },
];

export default function TreatmentsView() {
  const [active, setActive] = useState(1);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isCenterHovered, setIsCenterHovered] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const scrollRef = useRef(null);

  function handleMobileScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 220 + 16; // card width + gap-4
    const index = Math.round(el.scrollLeft / cardWidth);
    setCenteredIndex(Math.max(0, Math.min(index, treatments.length - 1)));
  }

  useEffect(() => {
    document.body.style.overflow = modalIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalIndex]);

  useEffect(() => {
    if (!isAutoSliding || isCenterHovered) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % treatments.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoSliding, isCenterHovered]);

  function getOffset(index) {
    let offset = index - active;
    if (offset > treatments.length / 2) offset -= treatments.length;
    if (offset < -treatments.length / 2) offset += treatments.length;
    return offset;
  }

  function getSlideMetrics(offset) {
    return {
      width:
        offset === 0 ? "300px" : Math.abs(offset) === 1 ? "240px" : "130px",
      height:
        offset === 0 ? "360px" : Math.abs(offset) === 1 ? "285px" : "180px",
      x:
        offset === -2
          ? "-640px"
          : offset === -1
            ? "-330px"
            : offset === 1
              ? "330px"
              : offset === 2
                ? "640px"
                : "0px",
    };
  }

  return (
    <section className="py-16 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16">
        <h2
          className="font-bold text-center mb-14"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            color: "#111",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          }}
        >
          Değişimler
        </h2>
      </div>

      {/* Mobile / Tablet: horizontal snap scroll */}
      <div
        ref={scrollRef}
        onScroll={handleMobileScroll}
        className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        style={{ paddingInline: "calc(50% - 110px)" }}
      >
        {treatments.map((t, i) => (
          <div
            key={t.resultImg}
            className="snap-center flex-shrink-0 w-[220px] cursor-pointer"
            onClick={() => setModalIndex(i)}
          >
            <div className="relative h-[280px] overflow-hidden">
              <img
                src={t.resultImg}
                alt={`${t.name} sonuç`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {centeredIndex === i && (
                <div className="absolute top-2 right-2 z-10 bg-black/40 rounded p-1 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
                    <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                  </svg>
                </div>
              )}
            </div>
            <p
              className="mt-2 text-sm font-bold text-center"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                color: "#111",
              }}
            >
              {t.name}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: fan carousel with hover before/after */}
      <div className="hidden lg:block relative mx-auto h-[390px] max-w-[1200px] overflow-hidden px-4">
        {treatments.map((t, i) => {
          const offset = getOffset(i);
          const metrics = getSlideMetrics(offset);

          return (
            <div
              key={t.resultImg}
              className="group absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: metrics.width,
                opacity:
                  offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.68 : 0.45,
                transform: `translateX(calc(-50% + ${metrics.x})) translateY(-50%) scale(${offset === 0 ? 1 : 0.96})`,
                zIndex: 10 - Math.abs(offset),
              }}
              onClick={() => {
                setActive(i);
                setIsAutoSliding(false);
              }}
              onMouseEnter={() => {
                if (offset === 0) setIsCenterHovered(true);
              }}
              onMouseLeave={() => {
                if (offset === 0) setIsCenterHovered(false);
              }}
            >
              <div
                className="relative w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ height: metrics.height }}
              >
                <img
                  src={t.resultImg}
                  alt={`${t.name} sonuç`}
                  className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
                />
                <img
                  src={t.beforeImg}
                  alt={`${t.name} önce`}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Active label — desktop only */}
      <div className="hidden lg:block text-center mt-2 px-4">
        <p
          className="font-bold text-lg mb-1"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            color: "#111",
          }}
        >
          {treatments[active].name}
        </p>
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "#666",
          }}
        >
          {treatments[active].desc}
        </p>
      </div>

      {/* Mobile: Before / After modal */}
      {modalIndex !== null && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,0,0,0.92)" }}
        >
          <div className="flex-shrink-0 flex justify-end p-4">
            <button
              onClick={() => setModalIndex(null)}
              className="text-white text-xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 pb-10 max-w-lg mx-auto flex flex-col gap-4">
              <div>
                <p
                  className="text-white text-center text-xs font-semibold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Önce
                </p>
                <div className="relative overflow-hidden w-full" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={treatments[modalIndex].beforeImg}
                    alt={`${treatments[modalIndex].name} önce`}
                    className="absolute left-0 w-full object-cover"
                    style={{ top: "-25%", height: "125%" }}
                  />
                </div>
              </div>
              <div>
                <p
                  className="text-white text-center text-xs font-semibold mb-2 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  Sonra
                </p>
                <div className="relative overflow-hidden w-full" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={treatments[modalIndex].resultImg}
                    alt={`${treatments[modalIndex].name} sonuç`}
                    className="absolute left-0 w-full object-cover"
                    style={{ top: "-25%", height: "125%" }}
                  />
                </div>
              </div>
              <div className="text-center">
                <p
                  className="text-white font-bold"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                >
                  {treatments[modalIndex].name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "#aaa", fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {treatments[modalIndex].desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-center mt-16">
        <Link href="/iletisim">
          <button
            className="text-white font-semibold px-8 py-4 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
            style={{
              background: "#D2000C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Dönüşüme Şimdi Başla →
          </button>
        </Link>
      </div>
    </section>
  );
}
