/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

export default function ShareButton() {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      type="button"
      className={`share-button flex items-center relative max-sm:h-[36px] justify-center max-sm:w-[36px] sm:px-4 sm:py-3 transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        setClicked(true);
      }}
    >
      <span
        className={`${
          clicked ? "hidden" : ""
        } flex absolute items-center gap-1 `}
      >
        <img src="/icons/share.svg" alt="share" width={18} />
        <span className="share-button__label max-sm:hidden arial text-[1rem]">
          Paylaş
        </span>
      </span>
      <span
        style={{
          animationDuration: "250ms",
        }}
        className={`${
          clicked ? "animate-fade-in" : "opacity-0"
        }   flex items-center gap-1`}
      >
        <img src="/icons/check.svg" alt="Checkmark" width={20} />
        <span className="share-button__copied max-sm:hidden arial">
          Kopyalandı
        </span>
      </span>
    </button>
  );
}
