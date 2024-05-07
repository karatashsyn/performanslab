"use client";
import BiographyInfo from "@/components/BiographyInfo";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BiographySection() {
  return (
    <section id="fatih-ozkan" className=" mt-48">
      <div className="h-48 relative flex mb-48 max-md:flex-col max-md:h-72 overflow-hidden">
        <img src="/plab.jpeg" className=" absolute  inset-0 opacity-50" />

        <Link
          href="/arsiv"
          className={`basis-full hover:backdrop-blur-[10px] flex  arial text-[1.4rem] font-bold border-[1.5px] border-[rgba(60,60,60,1)] active:scale-[.95] active:border-[rgba(0,0,0,0)]  hover:bg-neutral-800/65  bg-neutral-900/65 relative h-full  transition-all duration-200  items-center justify-center p-6  hover:bg-nv-red cursor-pointer overflow-hidden`}
        >
          <svg
            className="absolute top-4 left-4 icon icon-tabler icons-tabler-outline icon-tabler-news"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
            <path d="M8 8l4 0" />
            <path d="M8 12l4 0" />
            <path d="M8 16l4 0" />
          </svg>
          İçerikleri Oku
        </Link>

        <Link
          target="_blank"
          href="https://www.instagram.com/performanslab.levent/"
          className={`hover:backdrop-blur-[10px] basis-full arial text-[1.4rem] font-bold border-y-[1.5px] max-md:border-y-[0] max-md:border-x-[1.5px] border-[rgba(60,60,60,1)] active:scale-[.95] active:border-[rgba(0,0,0,0)]  hover:bg-neutral-800/65  bg-neutral-900/65 relative h-full flex  transition-all duration-200  items-center justify-center p-6  hover:bg-nv-red cursor-pointer overflow-hidden`}
        >
          <svg
            className="absolute top-4 left-4 icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h10" />
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M18 16.5v1.5l.5 .5" />
          </svg>
          Randevu Al
        </Link>
        <Link
          target="_blank"
          href="https://www.instagram.com/performanslab.levent/"
          className={`hover:backdrop-blur-[10px] basis-full arial text-[1.4rem] font-bold border-[1.5px] border-[rgba(60,60,60,1)] active:scale-[.95] active:border-[rgba(0,0,0,0)]  hover:bg-neutral-800/65  bg-neutral-900/65 relative h-full flex  transition-all duration-200  items-center justify-center p-6  hover:bg-nv-red cursor-pointer overflow-hidden`}
        >
          <svg
            className="absolute top-4 left-4 icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M16.5 7.5l0 .01" />
          </svg>
          Instagram
        </Link>
      </div>
      <h4 className="text-primary-white max-sm:text-[2rem] arial text-[3.06rem] leading-[0.72]  font-bold">
        Fatih Özkan <br />
        <span className="!leading-[0] !text-[0.75em] font-normal whitespace-nowrap">
          Kimdir?
        </span>
      </h4>

      <div className=" flex justify-between gap-20 h-auto max-sm:mt-[4rem] mt-[6rem]">
        <div
          style={{
            background:
              "linear-gradient(120deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)",
          }}
          className="max-lg:hidden basis-[50%] aspect-[3/2] rounded-sm relative bg-gray-300  p-3 flex items-center "
        >
          <motion.img
            initial={{
              opacity: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            whileInView={{
              opacity: 1,
            }}
            style={
              {
                // boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.6)",
              }
            }
            className=" max-w-full h-full object-cover translate-x-0 -translate-y-0  shadow-black !z-[5]"
            src="/fatih-ozkan.jpeg"
            alt="fatih-ozkan"
          />
        </div>
        <div className="flex flex-col gap-10 lg:basis-[50%]">
          <BiographyInfo>
            1984 İstanbul doğumlu olan <strong> Fatih Özkan</strong> sporculuğa
            Şişecam Kürek Takımı’nda başlamış, sırasıyla Fenerbahçe ve Milli
            takımlarda kürek çekmiştir.
          </BiographyInfo>
          <BiographyInfo>
            Ayrıca <strong> Fenerbahçe</strong> futbol altyapı ve birçok futbol
            kulübünde performans antrenörlüğü ve rehabilitasyon kondisyonerliği
            yapmıştır. 2012 yılından itibaren personal trainer’lık yapmaktadır.
          </BiographyInfo>
          <BiographyInfo>
            Aynı dönem{" "}
            <strong> İstanbul Üniversitesi Spor Bilimleri Fakültesi</strong>’ne
            girdikten sonra <strong> Almanya Köln Spor Akademisi</strong>’nde
            dil eğitimi almış ve futbol takımlarında kondisyoner olarak
            çalışmıştır.
          </BiographyInfo>
          <BiographyInfo>
            <strong>Atletik performans </strong>ve{" "}
            <strong> düzeltici egzersizler</strong> konusunda özel dersler
            vermektedir. Yüksek lisansını Haliç Üniversitesi’nde tamamladıktan
            sonra doktora öğrenimine aynı üniversitede devam etmektedir.
          </BiographyInfo>
        </div>
      </div>
    </section>
  );
}
