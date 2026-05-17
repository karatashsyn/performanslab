/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer
      className="py-8 px-8 md:px-16"
      style={{
        background: "#090A0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo-black.png"
            alt="PerformansLab"
            className="h-8 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <span
          className="text-sm"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          PerformansLab tüm hakları saklıdır · 2026
        </span>
      </div>
    </footer>
  );
}
