/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function HeroCard({ img, title, href = "#", className }) {
  // !aspect-[39/51]
  return (
    <Link
      href={href}
      className={`${className} min-w-[120px] basis-full bg-red-400 
      overflow-hidden relative`}
    >
      <div className="w-full h-full bg-[#181818] overflow-hidden">
        <img
          src={img}
          alt={title}
          className={` h-full w-full transition-all duration-200 object-cover`}
        />
      </div>
      <div
        className="absolute inset-0 bg-black"
        style={
          {
            // background:"linear-gradient(180deg, rgba(0, 0, 0, 0) 0%,  rgba(0, 0, 0, 0.6) 80%, #000000 100%)",
          }
        }
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute bottom-4  right-5 flex items-center">
          <h1
            style={{
              letterSpacing: "0.0rem",
            }}
            className={`text-primary-white text-[100%] font-extrabold transition-all duration-300 ${
              hovered ? "sm:translate-x-8 sm:opacity-0" : "sm:translate-x-6"
            }`}
          >
            {title}
          </h1>
          <h1
            className={`max-sm:hidden text-primary-white text-[5rem] font-bold transition-all duration-300 ${
              hovered ? " opacity-100 translate-x-2 " : "opacity-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon scale-125 icon-tabler icons-tabler-outline icon-tabler-arrow-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </h1>
        </div>
      </div>
      <div />
    </Link>
  );
}
