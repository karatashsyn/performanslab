/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
export default function HeroSection() {
  return (
    <section
      id="hero"
      className=" mt-16 flex justify-center md:justify-between items-center"
    >
      <img
        src="/glow_white.png"
        className="absolute max-sm:hidden glow left-0 z-0 pointer-events-none"
        alt="Background Glow"
      />
      <img
        style={{
          animationDelay: "0.36ms",
        }}
        src=" /glow_red.png"
        className="translate-y-12 max-sm:hidden absolute glow right-0 top-0  opacity-75"
        alt="Glow Red"
      />
      <div className="max-sm:text-center ">
        <h1 className="text-bright-red animate-fade-in  max-sm:text-[2rem] arial text-[4.6rem] leading-[1.04] max-sm:leading-[1.2] font-bold">
          PerformansLab <br className="leading-[0]" />
          <span className="leading-[0] text-[1.14em] whitespace-nowrap">
            Personal Training
          </span>
        </h1>
        <div className=" mt-[1rem] animate-fade-in-neutral">
          Size uygun Fonksiyonel antrenmanlar,
          <br />
          atletik antrenmanlar, postür düzeltici egzersizler,
          <br /> performans testleri planlar.
        </div>
        <div className="flex gap-6 !mt-16 sm:mt-[2rem] max-sm:flex-col">
          <Link href={"/iletisim"} className="max-sm:w-full">
            <button
              className="sm:hover:bg-white arial max-sm:w-full sm:hover:text-[#181818] font-semibold sm:hover:border-primary-white transition-all duration-300 border-[2px] border-[#2D2D2D] px-16 py-3"
              role="button"
            >
              Bize Ulaşın
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
