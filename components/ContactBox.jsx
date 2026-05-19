/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { trackContactClick } from "@/lib/analytics";

const CHANNEL_MAP = {
  "/whatsapp.svg": "whatsapp",
  "/instagram.svg": "instagram",
  "/mail.svg": "email",
  "/phone2.svg": "phone",
};

export default function ContactBox({ className, color, icon, href, ...props }) {
  const channel = CHANNEL_MAP[icon] ?? "unknown";
  return (
    <a
      href={href}
      target="_blank"
      onClick={() => trackContactClick(channel, href)}
      className={`${className} border-[1.5px] border-[rgba(9,9,9,1)] active:scale-[.95] active:border-[rgba(0,0,0,0)]  hover:bg-neutral-800/65  bg-neutral-900/100 relative w-32 h-32 flex  transition-all duration-200  items-center justify-center p-6  hover:bg-nv-red cursor-pointer overflow-hidden`}
    >
      <img src={icon} className="w-full invert" alt="Contact Icon" />
    </a>
  );
}
