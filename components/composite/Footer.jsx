/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import PaddedContainer from "./PaddedContainer";

export default function Footer({ darkMode = false }) {
  return (
    <PaddedContainer
      className={`${darkMode ? "bg-black py-6" : " pb-12 pt-12"} mt-24  `}
    >
      <footer className="flex justify-between  max-sm:flex-col arial ">
        <div className="flex items-center ">
          <span
            className={`text-[1rem] ${
              darkMode ? "text-[white]" : "text-[#737373]"
            } `}
          >
            PerformansLab Tüm Hakları Saklıdır
          </span>
          <div className="w-[2px] h-[30px] bg-dark-red mx-4"></div>
          <div className="flex gap-2 items-center">
            <a href="">
              <img width={22} height={28} alt="whatsapp" src={"/icon1.svg"} />
            </a>
            <a href="">
              <img width={11} height={15} alt="facebook" src={"/icon3.svg"} />
            </a>
            <a href="">
              <img width={24} height={30} alt="instagram" src={"/icon2.svg"} />
            </a>
          </div>
        </div>
        <div className="flex  gap-[1rem] sm:gap-[2rem] max-sm:flex-col max-sm:pt-12">
          <Link
            href={"/"}
            className={`text-[1rem] ${
              darkMode ? "text-[white]" : "text-[#737373]"
            } `}
          >
            Anasayfa
          </Link>
          <Link
            className={`text-[1rem] ${
              darkMode ? "text-[white]" : "text-[#737373]"
            } `}
            href={"/arsiv"}
          >
            Performans Testleri
          </Link>
          <Link
            className={`text-[1rem] ${
              darkMode ? "text-[white]" : "text-[#737373]"
            } `}
            href={"/arsiv"}
          >
            Yazılar
          </Link>
          <Link
            className={`text-[1rem] ${
              darkMode ? "text-[white]" : "text-[#737373]"
            } `}
            href={"/iletisim"}
          >
            İletişim
          </Link>
        </div>
      </footer>
    </PaddedContainer>
  );
}
