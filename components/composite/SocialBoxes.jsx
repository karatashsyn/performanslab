"use client";
import React, { useEffect, useRef, useState } from "react";
import ContactBox from "../ContactBox";

export default function SocialBoxes() {
  const pointerRef = useRef(null);
  const boxRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [color, setColor] = useState("#ffffff");

  const socialLinks = [
    {
      icon: "/whatsapp.svg",
      color: "#25D366",
    },
    {
      icon: "/instagram.svg",
      color: "#d62976",
    },
    {
      icon: "/facebook.svg",
      color: "#1877F2",
    },
    {
      icon: "/twitter.svg",
      color: "#fff",
    },
    {
      icon: "/mail.svg",
      color: "#00A3EE",
    },
    {
      icon: "/phone2.svg",
      color: "#25D366",
    },
  ];

  useEffect(() => {
    const box = boxRef.current;
    const pointer = pointerRef.current;
    if (!box || !pointer) return;
    box.addEventListener("mousemove", (e) => {
      const x = e.clientX - box.getBoundingClientRect().left;
      const y = e.clientY - box.getBoundingClientRect().top;
      pointer.style.left = `${x}px`;
      pointer.style.top = `${y}px`;
    });
  }, [pointerRef, boxRef]);
  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      ref={boxRef}
      className="grid grid-cols-3 grid-rows-2 relative overflow-hidden "
    >
      <div
        style={{
          backgroundColor: color,
        }}
        className={`${
          hovered ? "opacity-100" : "opacity-0"
        } absolute !z-[0] max-sm:hidden -translate-y-[50%] -translate-x-[50%]  w-24 h-24 blur-[42px] rounded-full transition-opaciy duration-20 bg-white`}
        ref={pointerRef}
      ></div>
      {socialLinks.map((link, index) => (
        <div
          key={index}
          onMouseOver={() => {
            setColor(link.color);
          }}
        >
          <ContactBox
            icon={link.icon}
            color={link.color}
            className="col-span-1 row-span-1"
          />
        </div>
      ))}
    </div>
  );
}
