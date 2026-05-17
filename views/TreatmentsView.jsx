/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const treatments = [
  {
    beforeImg: "/treat1.webp",
    resultImg: "/treat1.png",
    name: "Emre, 28",
    desc: "Atletik performans antrenmanları ve özel beslenme programı sonrası",
  },
  {
    beforeImg: "/treat2.webp",
    resultImg: "/treat2.png",
    name: "Burak, 32",
    desc: "Postür iyileşmesi için antrenmanlar ve uygun diyetler sonra",
  },
  {
    beforeImg: "/treat3.webp",
    resultImg: "/treat3.png",
    name: "Kemal, 35",
    desc: "Fonksiyonel antrenmanlar ve yağ yakma programı sonrası",
  },
  {
    beforeImg: "/treat4.webp",
    resultImg: "/treat4.png",
    name: "Ali, 41",
    desc: "Kondisyon ve kas geliştirme programı sonrası",
  },
  {
    beforeImg: "/treat5.webp",
    resultImg: "/treat5.png",
    name: "Serkan, 38",
    desc: "Rehabilitasyon ve güç antrenmanları sonrası",
  },
];

export default function TreatmentsView() {
  const [active, setActive] = useState(1);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

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

  return (
    <section className="py-24 overflow-hidden" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
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

      {/* Photos carousel */}
      <div className="relative mx-auto h-[390px] max-w-[1200px] overflow-hidden px-4">
        {treatments.map((t, i) => {
          const offset = getOffset(i);

          return (
          <div
            key={t.resultImg}
            className="group absolute left-1/2 top-1/2 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: offset === 0 ? "300px" : Math.abs(offset) === 1 ? "240px" : "130px",
              opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.68 : 0.45,
              transform: `translateX(calc(-50% + ${
                offset === -2
                  ? "-640px"
                  : offset === -1
                    ? "-330px"
                    : offset === 1
                      ? "330px"
                      : offset === 2
                        ? "640px"
                        : "0px"
              })) translateY(-50%) scale(${offset === 0 ? 1 : 0.96})`,
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
              style={{
                height: offset === 0 ? "360px" : Math.abs(offset) === 1 ? "285px" : "180px",
              }}
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

      {/* Active label */}
      <div className="text-center mt-2 px-4">
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

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <Link href="/iletisim">
          <button
            className="text-white font-semibold px-8 py-3 text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all"
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
