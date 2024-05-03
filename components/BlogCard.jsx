"use client";
import useWidth from "@/hooks/useWidth";
import { cropText } from "@/util";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }) {
  const { width } = useWidth();
  return (
    <Link
      href={`/${blog.slug}`}
      className="hover:translate-x-1 transition-all duration-200 flex gap-4 items-start cursor-pointer arial"
    >
      <div
        className={`relative max-sm:min-w-16 max-sm:min-h-16 transition-colors   sm:min-w-24 sm:h-24  duration-300  !aspect-square rounded-sm overflow-hidden`}
      >
        <div
          className="absolute inset-0 bg-red-500"
          style={{
            transitionDuration: "500ms",
          }}
        ></div>
        <img
          src={blog.titleImage}
          loading="lazy"
          className={`!w-full !h-full  absolute inset-0 object-center object-cover`}
          //TODO: add alt text
          alt=""
        />
      </div>
      <div className="flex items-start h-full">
        <span
          className={` font-bold tracking-[-0px] text-black  transition-opacity duration-100 max-sm:text-[0.8rem]  md:text-[1.1rem]`}
        >
          {width > 720 ? cropText(blog.title, 42) : blog.title}
        </span>
      </div>
    </Link>
  );
}
