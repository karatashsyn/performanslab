/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { trackNavClick, trackMobileMenuToggle } from "@/lib/analytics";

export default function Navbar() {
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/arsiv", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/performanslab-app", label: "Uygulamamız" },
  ];

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setIsHidden(isScrollingDown && currentScrollY > 80 && !menuOpen);
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        background: "rgba(9,10,13,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        opacity: isHidden ? 0 : 1,
        pointerEvents: isHidden ? "none" : "auto",
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 grid grid-cols-[auto_1fr_auto] items-center h-16">
        <Link href="/" className="flex-shrink-0">
          <img
            loading="eager"
            src="/new-logo.png"
            alt="PerformansLab"
            className="h-9 w-auto"
          />
        </Link>

        <ul
          className="hidden md:flex items-center justify-center gap-10"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {navLinks.map((nl, i) => (
            <li key={i}>
              <Link
                href={nl.href}
                onClick={() => trackNavClick(nl.label, nl.href)}
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

        <Link
          href="/ucretsiz-araclar"
          onClick={() => trackNavClick("Ücretsiz Araçlar", "/ucretsiz-araclar")}
          className="hidden md:block justify-self-end text-sm font-semibold transition-colors"
          style={{
            color: pathName === "/ucretsiz-araclar" ? "#ffffff" : "rgba(255,255,255,0.72)",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Ücretsiz Araçlar
        </Link>

        <button
          className="md:hidden p-2 justify-self-end"
          onClick={() => {
            const next = !menuOpen;
            setMenuOpen(next);
            trackMobileMenuToggle(next);
          }}
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
              onClick={() => { setMenuOpen(false); trackNavClick(nl.label, nl.href); }}
              className="text-white text-lg font-medium"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              {nl.label}
            </Link>
          ))}
          <Link
            href="/ucretsiz-araclar"
            onClick={() => { setMenuOpen(false); trackNavClick("Ücretsiz Araçlar", "/ucretsiz-araclar"); }}
            className="text-white text-lg font-medium"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Ücretsiz Araçlar
          </Link>
        </div>
      )}
    </nav>
  );
}
