/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";

const treatments = [
  { img: "/treat1.webp", name: "Emre, 28", desc: "Atletik performans antrenmanları ve özel beslenme programı sonrası" },
  { img: "/treat2.webp", name: "Burak, 32", desc: "Postür iyileşmesi için antrenmanlar ve uygun diyetler sonra" },
  { img: "/treat3.webp", name: "Kemal, 35", desc: "Fonksiyonel antrenmanlar ve yağ yakma programı sonrası" },
  { img: "/treat4.webp", name: "Ali, 41", desc: "Kondisyon ve kas geliştirme programı sonrası" },
  { img: "/treat5.webp", name: "Serkan, 38", desc: "Rehabilitasyon ve güç antrenmanları sonrası" },
];

export default function TreatmentsView() {
  const [active, setActive] = useState(1);

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
      <div className="flex items-end justify-center gap-4 px-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {treatments.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 cursor-pointer transition-all duration-300"
            style={{
              width: i === active ? "240px" : "180px",
              opacity: Math.abs(i - active) > 1 ? 0.5 : 1,
            }}
            onClick={() => setActive(i)}
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-full object-cover rounded-xl"
              style={{
                height: i === active ? "340px" : "260px",
                transition: "height 0.3s ease",
              }}
            />
          </div>
        ))}
      </div>

      {/* Active label */}
      <div className="text-center mt-8 px-4">
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
