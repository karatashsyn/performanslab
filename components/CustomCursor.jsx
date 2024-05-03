"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
export default function CustomCursor() {
  const mouseRef = useRef(null);
  const mousePosition = (e) => {
    mouseRef.current.style.transform = `translate(${e.clientX - 8 + "px"}, ${
      e.clientY - 8 + "px"
    })`;
  };

  const ifOverElement = (e) => {
    const element = document.elementFromPoint(e.clientX, e.clientY);
    if (element && element.classList.contains("inverted")) {
      alert("inverted");
      mouseRef.current.style.backgroundColor = "red";
    }
  };

  useEffect(() => {
    if (!mouseRef.current) return;

    window.addEventListener("mousemove", (e) => {
      mousePosition(e);
      ifOverElement(e);
    });
  }, [mouseRef]);

  return (
    <motion.div
      className="w-6 h-6 bg-primary-white  transition-all duration-100 ease-out  rounded-full fixed !z-50 pointer-events-none"
      ref={mouseRef}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      animate={{ scale: 1.2 }}
    ></motion.div>
  );
}
