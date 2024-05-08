import { getBlogs } from "@/services/blog";
import { shuffleArray } from "@/util";
import React from "react";
import BlogCard from "./BlogCard";

export const revalidate = 36000;

export default async function BlogSuggestion() {
  const blogs = shuffleArray(await getBlogs()).slice(0, 12);

  return (
    <div className="mt-10">
      <div className="text-[1.2rem] text-[#000]">Diğer Yazılar</div>
      <hr className="my-3 mb-6" />
      <div className=" sm:grid sm:gap-12 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:gap-10 sm:items-center gap-4 flex-wrap justify-between">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
