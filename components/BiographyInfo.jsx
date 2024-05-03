"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BiographyInfo({ className, children }) {
  return (
    <div className={`${className} flex gap-2`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        className="h-full  !min-w-[2px] bg-dark-red"
      ></motion.div>
      <motion.div
        initial={{
          opacity: 0,
          x: 6,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
      >
        <p className="text-left text-primary-white font-normal">{children}</p>
      </motion.div>
    </div>
  );
}
