"use client";
import Image from "next/image";
import { getFormattedDate } from "@/util";
import Link from "next/link";
import React from "react";
import { trackBlogCardClick } from "@/lib/analytics";

export default function BlogCard2({ blog, className }) {
  return (
    <Link
      href={`/${blog.slug}`}
      onClick={() => trackBlogCardClick(blog.title, blog.slug)}
      className={`${className} animate-fade-in bg-white hover:shadow-lg overflow-hidden rounded-md border-[1px] transition-all duration-200 flex flex-col gap-4 items-start cursor-pointer`}
    >
      <div
        className="relative w-full max-sm:min-w-16 transition-colors sm:min-w-24 !max-sm:aspect-[3/1] sm:h-48 duration-300 !aspect-square overflow-hidden"
      >
        <Image
          fill
          src={blog.titleImage}
          alt={blog.title}
          className="object-center object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="items-start w-full px-4 pt-2 pb-4 flex flex-col gap-1">
          <span
            style={{ lineHeight: "1" }}
            className="font-medium text-[#09090b] tracking-tight transition-opacity duration-100 text-[1.2rem] lg:text-[1.3rem]"
          >
            {blog.title}
          </span>
          <span className="text-[0.8rem] text-[#777]">
            {getFormattedDate(blog.date)}
          </span>
          <hr className="mt-1 mb-2 w-full opacity-5" />
        </div>
      </div>
    </Link>
  );
}
