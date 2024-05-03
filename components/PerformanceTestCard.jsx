/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { cropText } from "@/util";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PerformanceTestCard({ blog, className }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className={`${className} font-sans bg-white hover:shadow-lg  overflow-hidden rounded-md shadow-md  transition-all duration-200 flex flex-col gap-4 items-start cursor-pointer`}
    >
      <div
        className={`
        relative w-full max-sm:min-w-16 transition-colors sm:min-w-24 !max-sm:aspect-[3/1] sm:h-48 duration-300  !aspect-square rounded-sm overflow-hidden`}
      >
        {/* <div
          className="absolute inset-0 bg-red-500"
          style={{
            transitionDuration: "500ms",
          }}
        ></div> */}
        <img
          src={blog.titleImage}
          loading="eager"
          className={`!w-full !h-full  absolute inset-0 object-center object-cover`}
          //TODO: add alt text
          alt=""
        />
      </div>
      <div className="flex flex-col   justify-between">
        <div className=" items-start w-full  p-3 ">
          <span
            className={` font-extrabold  text-[#181818] tracking-tight  transition-opacity duration-100  text-[1.1rem] lg:text-[1.24rem]`}
          >
            {blog.title}
          </span>
          <hr className="mt-1 mb-2 w-full opacity-5" />
          <p className="text-[#484848] mt-2">
            {cropText(blog.summary, 180) ?? ""}
          </p>
        </div>
      </div>
      <div className="  mt-auto pt-4 p-3 max-sm:w-full mb-2">
        <div className="rounded-md flex items-center max-sm:w-full justify-center p-2 px-4 bg-nav-red font-semibold tracking-wide text-white text-[0.8rem]">
          Tamamını Oku
        </div>
      </div>
    </Link>
  );
}
