/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getBlogBySlug, getBlogs } from "@/services/blog";
import BlogText from "@/components/BlogText";
import { notFound } from "next/navigation";
import { Inter } from "../../(search)/layout";
import ShareButton from "@/components/ShareButton";
import BlogSuggestion from "@/components/BlogSuggestion";
import { NotoSerif } from "@/util/fonts";
import PaddedContainer from "@/components/composite/PaddedContainer";

export const revalidate = 3600;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => blog.slug);
}

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }
  return {
    title: blog ? blog.title : "Spor ve Performans",
    description: blog?.description
      ? blog.description
      : blog.content.filter(
          (item) => item._type === "block" && item.children[0]?.text
        )[0]?.children[0]?.text,

    modifiedTime: blog?.date ? blog.date : "",
    openGraph: {
      siteName: "Gerekli, Anlaşılabilir, Bilimsel Bilgi",
      locale: "tr_TR",
      type: "article",
      title: blog ? blog.title : "Spor ve Performans",
      description: blog ? blog.description : "antrenman spor",
      url: "https://performanslab.com/" + blog.slug,
      modifiedTime: blog?.date ? blog.date : "",
      article: {
        modifiedTime: blog?.date ? blog.date : "",
      },
      images: [
        {
          url: blog?.titleImage
            ? blog.titleImage
            : "https://performanslab.com/opengraph-image.png",
          width: 800,
          height: 600,
          alt: blog.title ? blog.title : "Spor ve Performans",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: blog?.title,
    author: {
      "@type": "Person",
      name: "Fatih Özkan",
    },
    dateModified: blog?.date,
    image: blog?.titleImage,
    description: blog?.description,
  };

  return (
    <>
      <PaddedContainer className={"md:px-0"}>
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2 pt-4">
              <a
                target="_blank"
                href="https://www.instagram.com/performanslab/"
                className="instagram-button  flex items-center justify-center max-sm:h-[36px] max-sm:py-0 max-sm:px-0 max-sm:w-[36px] cursor-pointer  border-[1px] px-8  py-3 rounded-sm gap-1"
              >
                <img
                  width={15}
                  height={15}
                  className=" mt-[2px] opacity-75"
                  alt="instagram"
                  src={"/icons/colorfulinstagram.png"}
                />

                <span className="arial text-gray-800 max-sm:hidden">
                  Instagram
                </span>
              </a>
              <ShareButton />
            </div>
          </div>
          <div className={"mt-12  flex justify-start " + Inter.className}>
            <div className=" prose max-md:px-0 md:px-[6rem] lg:px-[10rem]  min-w-full  blog-content">
              <header>
                <h1 className="text-[3rem]  mb-[1rem] text-center font-bold">
                  {/* {blog?.title?.toLocaleUpperCase("tr")} */}
                  {blog?.title}
                </h1>
              </header>
              <img
                className=" sm:w-[70%] mx-auto object-center rounded-md"
                src={blog?.titleImage}
                alt="blog-topic"
              />
              <div className={` text-left ${NotoSerif.className}`}>
                <BlogText blog={blog} />
              </div>
            </div>
          </div>
        </article>
      </PaddedContainer>

      <PaddedContainer>
        <BlogSuggestion />
      </PaddedContainer>
    </>
  );
}
