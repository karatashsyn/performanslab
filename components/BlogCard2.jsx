/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Inter } from "@/app/(main)/layout";
import { cropText, getFormattedDate } from "@/util";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BlogCard2({ blog, className }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className={`${className} animate-fade-in bg-white hover:shadow-lg  overflow-hidden rounded-md border-[1px] transition-all duration-200 flex flex-col gap-4 items-start cursor-pointer`}
    >
      <div
        className={`
        relative w-full max-sm:min-w-16 transition-colors sm:min-w-24 !max-sm:aspect-[3/1] sm:h-48 duration-300  !aspect-square  overflow-hidden`}
      >
        <img
          src={blog.titleImage}
          loading="eager"
          className={`!w-full !h-full  absolute inset-0 object-center object-cover`}
          //TODO: add alt text
          alt=""
        />
      </div>
      <div className="flex flex-col   justify-between">
        <div className=" items-start w-full  p-5 flex flex-col gap-1 ">
          <span
            style={{
              lineHeight: "1",
            }}
            className={`
        
            font-semibold  text-[#09090b] tracking-tight  transition-opacity duration-100  text-[1.2rem] lg:text-[1.3rem]`}
          >
            {blog.title}
          </span>

          <span className=" text-[0.8rem] text-[#777]">
            {/* {getFormattedDate(blog.date)} */}
          </span>
          <hr className="mt-1 mb-2 w-full opacity-5" />
          {/* <p className="text-[#484848] mt-2">
            {cropText(blog?.summary, 180) ?? ""}
          </p> */}
        </div>
      </div>
    </Link>
  );
}
