import React from "react";
import { getBlogBySlug } from "@/services/blog";
import BlogText from "@/components/BlogText";
import { notFound } from "next/navigation";
import { Inter } from "../layout";
import ShareButton from "@/components/ShareButton";

export default async function BlogDetail({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }
  return (
    <>
      <div className="w-full flex items-center justify-end">
        <div className="flex items-center gap-4">
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
    </>
  );
}
