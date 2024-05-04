/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getBlogBySlug, getBlogs } from "@/services/blog";
import BlogText from "@/components/BlogText";
import { notFound } from "next/navigation";
import { Inter } from "../layout";
import ShareButton from "@/components/ShareButton";
import BlogSuggestion from "@/components/BlogSuggestion";

export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => blog.slug);
}

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    title: blog ? blog.title + " -" : "YAZILAR -",
    //TODO:
    description: blog ? blog.description : "Sayfa bulunamadı",
  };
}

export default async function BlogDetail({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }
  return (
    <>
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center gap-2 pt-4">
          <a
            target="_blank"
            href="https://www.instagram.com/performanslab/"
            className="instagram-button  flex items-center justify-center max-sm:h-[36px] max-sm:py-0 max-sm:px-0 max-sm:w-[36px] cursor-pointer  border-[1px] px-8 shadow-sm py-3 rounded-sm gap-1"
          >
            <img
              width={15}
              height={15}
              className=" mt-[2px] opacity-75"
              alt="instagram"
              src={"/icons/colorfulinstagram.png"}
            />

            <span className="arial text-gray-800 max-sm:hidden">Instagram</span>
          </a>
          <ShareButton />
        </div>
      </div>
      <div className={"mt-12 flex justify-center " + Inter.className}>
        <div className=" prose  blog-content bg-white">
          <h1 className="text-center font-normal">{blog?.title}</h1>
          <div className="w-full flex justify-center">
            <img
              className=" !w-full max-h-[300px] object-cover object-center rounded-md"
              src={blog?.titleImage}
              alt="blog-topic"
            />
          </div>
          <div className="text-[1rem]">
            <BlogText blog={blog} />
          </div>
        </div>
      </div>
      <BlogSuggestion />
    </>
  );
}
