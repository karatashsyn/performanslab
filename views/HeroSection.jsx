/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="landing-hero mt-10 flex justify-center md:justify-between items-center"
    >
      <div className="landing-hero__media" aria-hidden="true">
        <img
          src="/hero3.jpg"
          className="landing-hero__backdrop"
          alt=""
        />
        <img src="/hero1.png" className="landing-hero__athlete" alt="" />
      </div>
      <div className="landing-hero__copy max-sm:text-center">
        <h1 className="landing-title animate-fade-in max-sm:text-[2rem] arial text-[4.6rem] leading-[1.04] max-sm:leading-[1.2] font-bold">
          PerformansLab <br className="leading-[0]" />
          <span className="landing-title__accent leading-[0] text-[1.14em] whitespace-nowrap">
            Personal Training
          </span>
        </h1>
        <div className="landing-hero__lead mt-[1rem] animate-fade-in-neutral">
          Size uygun Fonksiyonel antrenmanlar,
          <br />
          atletik antrenmanlar, postür düzeltici egzersizler,
          <br /> performans testleri planlar.
        </div>
        <div className="flex gap-6 !mt-16 sm:mt-[2rem] max-sm:flex-col">
          <Link href={"/iletisim"} className="max-sm:w-full">
            <button
              className="landing-primary-button arial max-sm:w-full font-semibold transition-all duration-300 px-16 py-3"
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
