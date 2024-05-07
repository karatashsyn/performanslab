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
    title: blog ? blog.title + " -" : "Spor ve Performans",
    description: blog?.description ? blog.description : "antrenman spor",
    modifiedTime: blog?.date ? blog.date : "",
    openGraph: {
      siteName: "- Gerekli, Anlaşılabilir, Bilimsel Bilgi",
      locale: "tr_TR",
      type: "article",
      title: blog ? blog.title + " -" : "Spor ve Performans",
      description: blog ? blog.description : "antrenman spor",
      url: "https://performanslab.com/" + blog.slug,
      modifiedTime: blog?.date ? blog.date : "",
      article: {
        modifiedTime: blog?.date ? blog.date : "",
      },
      images: [
        {
          url: blog
            ? blog.titleImage
            : "https://performanslab.com/opengraph-image.png",
          width: 800,
          height: 600,
          alt: blog ? blog.title : "Spor ve Performans",
        },
      ],
    },
    article: {
      modifiedTime: blog?.date ? blog.date : "",
    },
  };
}

export default async function BlogDetail({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }
  return (
    <>
      <div className="content w-full flex items-center justify-end">
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
      <div className={"mt-0 flex justify-center " + Inter.className}>
        <div className=" prose  blog-content bg-white">
          <header>
            <h1 className="text-center font-normal">{blog?.title}</h1>
          </header>
          <div className="w-full flex justify-center">
            <img
              className=" !w-[100%] max-h-[280px] object-cover object-center rounded-md"
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
