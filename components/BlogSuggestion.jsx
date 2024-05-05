import { getBlogs } from "@/services/blog";
import { shuffleArray } from "@/util";
import React from "react";
import BlogCard from "./BlogCard";

export const revalidate = 36000;

export default async function BlogSuggestion() {
  const blogs = shuffleArray(await getBlogs()).slice(0, 12);

  return (
    <div className="mt-16">
      <div className="text-[1.2rem] text-[#000]">Diğer Yazılar</div>
      <hr className="my-3 mb-6" />
      <div className=" flex max-md:flex-col max-md:gap-10 md:items-center gap-4 flex-wrap justify-between">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
