"use client";
import Image from "next/image";
import Link from "next/link";
import { cropText } from "@/util";
import { trackBlogCardClick } from "@/lib/analytics";

export default function BlogCardFull({ blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      onClick={() => trackBlogCardClick(blog.title, blog.slug)}
      className="group flex flex-col cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[8px] mb-4">
        <Image
          fill
          src={blog.titleImage}
          alt={blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Title */}
      <h3
        className="font-bold text-[#111] leading-[1.25] mb-2 text-[1.05rem]"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
      >
        {cropText(blog.title, 80)}
      </h3>

      {/* Description */}
      {blog.description && (
        <p
          className="text-[#666] text-[0.85rem] leading-[1.55] mb-4 flex-1"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {cropText(blog.description, 120)}
        </p>
      )}

      {/* Author */}
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-6 h-6 rounded-full bg-[#ccc] flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/fatih-ozkan.jpeg"
            alt="Fatih Özkan"
            className="w-full h-full object-cover"
          />
        </div>
        <span
          className="text-[0.8rem] text-[#555]"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Fatih Özkan
        </span>
      </div>
    </Link>
  );
}
