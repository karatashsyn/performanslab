"use client";
import SlideShow from "@/components/SlideShow";
import React from "react";
import { motion } from "framer-motion";
export default function TreatmentsView() {
  return (
    <section
      className="sm:mt-72 max-sm:mt-24 flex max-md:flex-col overflow-visible justify-between gap-24 md:items-center"
      id="treatments"
    >
      <SlideShow />

      <motion.div className="md:w-[60%] mb-auto   border-white">
        <motion.h2
          initial={{
            opacity: 0,
            translateX: -6,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0,
          }}
          whileInView={{
            opacity: 1,
            translateX: 0,
          }}
          className="max-sm:text-[1.6rem] leading-[0.8] arial text-[3.06rem] font-bold  mb-6"
        >
          PerformansLab
          <br />
          <span className="text-[0.72em] leading-[0] texnav-red">
            {" "}
            Ne Yapar?
          </span>
        </motion.h2>
        {/* <hr className="mb-4 opacity-25" /> */}
        <motion.div
          initial={{
            borderLeftColor: "rgba(0,0,0,0)",
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: 0.2,
          }}
          whileInView={
            {
              // borderLeftColor: "#fff",
            }
          }
          className=" text-[1rem] border-l-[0.5px]  text-secondary-white"
        >
          <motion.p
            initial={{
              opacity: 0,
              translateX: -6,
              borderLeftColor: "rgba(0,0,0,0)",
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.1,
            }}
            whileInView={{
              opacity: 1,
              translateX: 0,
            }}
            className=""
          >
            Fonksiyonel antrenmanlar, performans testleri, postür düzeltici{" "}
            egzersizler, atletik antrenmanlar ve dahası için sizleri
            bilgilendirir ve size uygun antrenmanlar planlar.
          </motion.p>
          <br />
          <motion.p
            initial={{
              opacity: 0,
              translateX: -6,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
              delay: 0.14,
            }}
            whileInView={{
              opacity: 1,
              translateX: 0,
            }}
            className=" text-[1rem]"
          >
            Kişiselleştirilmiş antrenmanlar, vücuttaki dengesizlikleri gidermeye
            ve kasları güçlendirmeye odaklanır. Esneklik ve dayanıklılık
            kazandırırken, aynı zamanda sakatlanma riskini azaltır.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
