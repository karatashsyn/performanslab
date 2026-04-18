"use client";
import AppPreview from "@/components/AppPreview";
import React from "react";
import { motion } from "framer-motion";
export default function TreatmentsView() {
  return (
    <section
      className="landing-section landing-treatments sm:mt-28 max-sm:mt-14 flex max-md:flex-col overflow-visible justify-between gap-24 md:items-center"
      id="treatments"
    >
      <AppPreview className="landing-app-preview" />

      <motion.div className="landing-panel md:w-[60%] mb-auto border-white">
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
          className="landing-section-title max-sm:text-[1.6rem] leading-[0.8] arial text-[3.06rem] font-bold mb-6"
        >
          Uygulama Destekli
          <br />
          <span className="text-[0.72em] leading-[0] text-nav-red">
            {" "}
            Antrenman Programı
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
          className="landing-copy text-[1rem] border-l-[0.5px] text-secondary-white"
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
            PerformansLab uygulaması postür analizini, kişiye özel antrenman
            programını ve hareket formu takibini tek sistemde birleştirir.
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
            Online eğitim sürecinde analiz sonuçlarına göre programın
            hazırlanır, antrenmanların uygulama üzerinden takip edilir ve gerçek
            zamanlı hareket analiziyle formun daha kontrollü ilerler.
          </motion.p>
        </motion.div>
        <div className="landing-feature-row">
          <span>Postür analizi</span>
          <span>Kişiye özel program</span>
          <span>Canlı hareket takibi</span>
        </div>
      </motion.div>
    </section>
  );
}
