/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/arsiv", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/#app", label: "Uygulamamız" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(9,10,13,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex items-center justify-between h-16">
        <Link href="/" className="flex-shrink-0">
          <img
            loading="eager"
            src="/new-logo.png"
            alt="PerformansLab"
            className="h-9 w-auto"
          />
        </Link>

        <ul
          className="hidden md:flex items-center gap-10"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {navLinks.map((nl, i) => (
            <li key={i}>
              <Link
                href={nl.href}
                className="text-sm font-medium transition-colors"
                style={{
                  color: pathName === nl.href ? "#ffffff" : "rgba(255,255,255,0.7)",
                }}
              >
                {nl.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <img
            src={menuOpen ? "/x.svg" : "/menu.svg"}
            alt="menu"
            className="w-6 h-6 invert"
          />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden flex flex-col gap-6 px-8 py-8"
          style={{ background: "#090A0D", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {navLinks.map((nl, i) => (
            <Link
              key={i}
              href={nl.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg font-medium"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              {nl.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
