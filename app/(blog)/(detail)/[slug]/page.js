import React from "react";
import Image from "next/image";
import { getBlogBySlug, getBlogs } from "@/services/blog";
import BlogText from "@/components/BlogText";
import { notFound } from "next/navigation";
import { Inter } from "../../(search)/layout";
import ShareButton from "@/components/ShareButton";
import BlogSuggestion from "@/components/BlogSuggestion";
import PaddedContainer from "@/components/composite/PaddedContainer";
import BlogReadTracker from "@/components/BlogReadTracker";

export const revalidate = 21600;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }
  const description =
    blog.seoDescription ||
    blog.description ||
    blog.content?.filter(
      (item) => item._type === "block" && item.children?.[0]?.text
    )[0]?.children[0]?.text ||
    "";

  const seoTitle = blog.seoTitle || blog.title;

  return {
    metadataBase: new URL("https://performanslab.com"),
    title: seoTitle,
    description,
    alternates: {
      canonical: `https://performanslab.com/${blog.slug}`,
    },
    openGraph: {
      siteName: "Gerekli, Anlaşılabilir, Bilimsel Bilgi",
      locale: "tr_TR",
      type: "article",
      title: seoTitle,
      description: blog.seoDescription || blog.description || "",
      url: `https://performanslab.com/${blog.slug}`,
      publishedTime: blog.publishedAt || blog.date || "",
      modifiedTime: blog.date || "",
      article: {
        publishedTime: blog.publishedAt || blog.date || "",
        modifiedTime: blog.date || "",
      },
      images: [
        {
          url: blog.titleImage || "https://performanslab.com/opengraph-image.png",
          width: 800,
          height: 600,
          alt: blog.titleImageAlt || blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: blog.seoDescription || blog.description || "",
      images: [blog.titleImage || "https://performanslab.com/plab.jpeg"],
    },
  };
}

export default async function BlogDetail({ params }) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) {
    notFound();
  }

  const pageUrl = `https://performanslab.com/${blog.slug}`;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    name: blog.title,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@type": "Person", name: "Fatih Özkan" },
    datePublished: blog.publishedAt || blog.date,
    dateModified: blog.date,
    image: blog.titleImage,
    description: blog.seoDescription || blog.description,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: "https://performanslab.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://performanslab.com/arsiv",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <BlogReadTracker title={blog.title} slug={blog.slug} />
      <PaddedContainer className={"md:px-0"}>
        <article>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
          <div className="w-full flex items-center justify-end">
            <div className="flex items-center gap-2 pt-4">
              <a
                target="_blank"
                href="https://www.instagram.com/performanslab/"
                className="instagram-button flex items-center justify-center max-sm:h-[36px] max-sm:py-0 max-sm:px-0 max-sm:w-[36px] cursor-pointer border-[1px] px-8 py-3 rounded-sm gap-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  width={15}
                  height={15}
                  className="mt-[2px] opacity-75"
                  alt="Instagram"
                  src={"/icons/colorfulinstagram.png"}
                />
                <span className="arial text-gray-800 max-sm:hidden">
                  Instagram
                </span>
              </a>
              <ShareButton blogTitle={blog.title} blogSlug={blog.slug} />
            </div>
          </div>
          <div className={"mt-12 flex justify-start " + Inter.className}>
            <div className="prose max-md:px-0 md:px-[6rem] lg:px-[10rem] min-w-full blog-content">
              <header>
                <h1 className="text-[3rem] mb-[1rem] text-center font-bold">
                  {blog.title}
                </h1>
              </header>
              {blog.titleImage && (
                <div className="relative sm:w-[70%] mx-auto rounded-md overflow-hidden aspect-[4/3]">
                  <Image
                    fill
                    className="object-cover object-center"
                    src={blog.titleImage}
                    alt={blog.titleImageAlt || blog.title}
                    priority
                    sizes="(max-width: 640px) 100vw, 70vw"
                  />
                </div>
              )}
              <div className={`text-left ${Inter.className}`}>
                <BlogText blog={blog} />
              </div>
            </div>
          </div>
        </article>
      </PaddedContainer>

      <PaddedContainer className="pb-20">
        <BlogSuggestion />
      </PaddedContainer>
    </>
  );
}
