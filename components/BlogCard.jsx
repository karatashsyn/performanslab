/* eslint-disable @next/next/no-img-element */
import { cropText } from "@/util";
import Link from "next/link";
import React from "react";

export default function BlogCard({ blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="blog-suggestion-card hover:translate-x-1 transition-all duration-200 flex gap-4 items-start cursor-pointer arial"
    >
      <div
        className={`blog-suggestion-card__image relative max-sm:min-w-16 max-sm:min-h-16 transition-colors sm:min-w-24 sm:h-24 duration-300 !aspect-square overflow-hidden`}
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
          className={`blog-suggestion-card__title max-w-[196px] font-normal tracking-[-0px] transition-opacity duration-100 md:text-[1.1rem]`}
        >
          {cropText(blog.title, 120)}
        </span>
      </div>
    </Link>
  );
}
