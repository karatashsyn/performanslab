/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getBlogs } from "@/services/blog";
import BlogCard2 from "@/components/BlogCard2";
import { Inter } from "../layout";
import ContactSection from "@/views/ContactSection";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function Blog({ searchParams }) {
  const blogs = await getBlogs(searchParams.s);
  if (!blogs.length) {
    notFound();
  }

  return (
    <div className="archive-page">
      <div className="archive-toolbar w-full flex justify-between mt-8">
        <form className="w-[50%] max-sm:w-[80%] ">
          <div className="archive-search max-lg:w-full flex h-[48px] max-sm:h-[36px] items-center justify-between p-0 pl-2">
            <input
              required
              defaultValue={searchParams.s}
              name="s"
              className="archive-search__input
         
              h-full arial font-medium placeholder:font-normal placeholder:text-gray-600 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-0 focus:opacity-100 transition-all duration-300 w-[80%] outline-none"
              type="text"
              placeholder="Merak ettiğin konuyu ara..."
            />
            <button
              type="submit"
              className="archive-search__button cursor-pointer h-full gap-1 w-24 py-2 flex items-center justify-center"
            >
              <img
                src="/search.svg"
                alt="Search Icon"
                className="archive-search__icon w-4 h-4 inline-block"
              />
              <span className="arial">Ara</span>
            </button>
          </div>
        </form>
        <div className="flex gap-4">
          <a
            target="_blank"
            href="https://www.instagram.com/performanslab/"
            className="archive-social flex max-sm:h-[36px] max-sm:py-0 max-sm:px-2 cursor-pointer items-center px-4 py-3 gap-2"
          >
            <img width={24} height={30} alt="instagram" src={"/icon2.svg"} />

            <span className="arial max-sm:hidden">Instagram</span>
          </a>
        </div>
      </div>

      <div
        className={
          "archive-grid w-full mt-12 grid grid-cols-4 max-md:grid-cols-2 max-lg:grid-cols-3 gap-3 " +
          Inter.className
        }
      >
        {blogs.map((b, index) => (
          <BlogCard2 key={index} blog={b} />
        ))}
      </div>
      <ContactSection
        titleHidden={true}
      />
    </div>
  );
}
