/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getBlogs } from "@/services/blog";
import BlogCardFull from "@/components/BlogCardFull";
import { notFound } from "next/navigation";

export const revalidate = 21600;

export async function generateMetadata({ searchParams }) {
  const q = searchParams.s;
  const title = q
    ? `"${q}" — Blog Arama — PerformansLab`
    : "Tüm Yazılar — PerformansLab";
  const description =
    "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.";
  return {
    title,
    description,
    alternates: {
      canonical: "https://www.performanslab.com/tum-yazilar",
    },
    openGraph: {
      title,
      description,
      url: "https://www.performanslab.com/tum-yazilar",
      siteName: "PerformansLab",
      locale: "tr_TR",
      type: "website",
      images: [{ url: "/plab.jpeg", width: 1600, height: 1067, alt: "PerformansLab Blog" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/plab.jpeg"],
    },
  };
}

export default async function TumYazilar({ searchParams }) {
  const blogs = await getBlogs(searchParams.s);

  if (!blogs.length) notFound();

  return (
    <>
      {/* Search bar */}
      <div className="mt-8 mb-10">
        <form role="search" className="flex items-center gap-3">
          <div className="flex flex-1 max-w-md h-[48px] items-center text-black border border-neutral-300 rounded-[4px] overflow-hidden">
            <label htmlFor="tum-yazilar-search" className="sr-only">
              Blog ara
            </label>
            <input
              id="tum-yazilar-search"
              name="s"
              type="search"
              defaultValue={searchParams.s}
              placeholder="Merak ettiğin konuyu ara..."
              className="h-full w-full px-4 outline-none text-sm text-[#111] placeholder:text-gray-400"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            />
            <button
              type="submit"
              aria-label="Ara"
              className="h-full px-5 bg-[#111] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[#D2000C] transition-colors"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              <img src="/search.svg" alt="" className="w-4 h-4 invert" />
              Ara
            </button>
          </div>

          {searchParams.s && (
            <a
              href="/tum-yazilar"
              className="text-sm text-[#888] hover:text-[#111] transition-colors"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Temizle
            </a>
          )}
        </form>

        {searchParams.s && (
          <p
            className="mt-3 text-sm text-[#666]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="font-semibold text-[#111]">
              &ldquo;{searchParams.s}&rdquo;
            </span>{" "}
            için {blogs.length} sonuç bulundu
          </p>
        )}
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mb-16">
        {blogs.map((blog) => (
          <BlogCardFull key={blog.slug} blog={blog} />
        ))}
      </div>
    </>
  );
}
