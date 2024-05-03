/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  "/treat1.png",
  "/treat2.png",
  "/treat3.png",
  "/treat4.png",
  "/treat5.png",
];

const Slide = ({ src }) => {
  return (
    <div className="w-full h-full flex justify-center bg-neutral-700">
      <img src={src} alt="" className="w-full h-[100%] object-cover" />
    </div>
  );
};

export default function SlideShow({ className }) {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle?.current?.style?.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#ffffff",
        "--swiper-pagination-bullet-inactive-color": "#555",
        "--swiper-pagination-bullet-inactive-opacity": 1,
        "--swiper-navigation-size": "2.64rem",
        "--swiper-navigation-color": "#fff",
        paddingBottom: "3rem",
      }}
      cssMode={true}
      speed={100}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
      pagination={{
        type: "bullets",
        clickable: true,
      }}
      effect="fade"
      className={`${className} sm:w-[64%] max-sm:w-[80%] fade reltive`}
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={50}
      SlidesPerView={1}
    >
      {images.map((src) => (
        <SwiperSlide key={src}>
          <Slide src={src} />
        </SwiperSlide>
      ))}
      <div className="autoplay-progress absolute  top-10 bg-black rounded-full right-0 -translate-y-[60%]">
        <svg className="absolute" viewBox="0 0 48 48" ref={progressCircle}>
          <circle cx="24" cy="24" r="20"></circle>
        </svg>
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}
