/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import PaddedContainer from "./PaddedContainer";

export default function Navbar({ transparent, className }) {
  const pathName = usePathname();
  const navLink = ({ href, label, key }) => (
    <li
      onClick={() => {
        setMenuOpen(false);
      }}
      style={{
        fontWeight: pathName === href ? 500 : "",
      }}
      className={`${
        pathName === href ? "text-nav-red" : ""
      } font-medium whitespace-nowrap `}
      key={key}
    >
      <Link href={href}>{label}</Link>
    </li>
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Anasayfa" },
    { href: "/arsiv", label: "Yazılar" },
    { href: "/iletisim", label: "İletişim" },
  ];

  const BlogNavbarDecoration = () => (
    <div
      className={`${
        (pathName.includes("arsiv") ||
          pathName === "/[slug]" ||
          pathName === "/category/perftest") &&
        !menuOpen
          ? "flex"
          : "hidden"
      } h-[48px] max-lg:h-[36px]  items-center  border-l-[1px] border-white/20 pl-4 gap-2 overflow-hidden pr-4`}
    >
      <h2 className="text-white whitespace-nowrap ">
        Gerekli, Anlaşılabilir, Bilimsel Bilgi
      </h2>
    </div>
  );

  return (
    <PaddedContainer
      className={`${transparent ? " " : " !bg-black"} ${className}  arial`}
    >
      <nav className="relative flex justify-between items-center !z-[20]">
        <Link href={"/"} className="z-[20] flex items-center gap-4">
          <img
            loading="eager"
            src="/logo.svg"
            alt="logo"
            className="w-[6rem] sm:w-[7rem] h-[3.5rem]"
          />
          <BlogNavbarDecoration />
        </Link>
        <div
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
          className="z-[20] fixed cursor-pointer flex items-center justify-center right-5 top-2 sm:hidden "
        >
          <img
            src={menuOpen ? "/x.svg" : "/menu.svg"}
            alt="navigation"
            className="w-[32px] h-[32px] invert "
          />
        </div>
        <ul
          className={`flex max-sm:fixed transition-all duration-200 max-sm:inset-0 max-sm:flex-col max-sm:items-center max-sm:gap-12 max-sm:pt-24 max-sm:bg-[#181818] max-sm:overflow-hidden sm:justify-between sm:gap-[3.4rem] sm:py-[1.6rem] ${
            menuOpen
              ? ""
              : "max-sm:pointer-events-none max-sm:-translate-y-[2vh] max-sm:opacity-0"
          }`}
        >
          {navLinks.map((nl, i) => navLink({ key: i, ...nl }))}
          <li>
            <a target="_blank" href="https://www.instagram.com/performanslab/">
              Instagram
            </a>
          </li>
        </ul>
      </nav>
    </PaddedContainer>
  );
}
