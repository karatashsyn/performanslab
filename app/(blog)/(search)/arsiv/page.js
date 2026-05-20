import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedBlogs, getLatestBlogs } from "@/services/blog";
import BlogCardFull from "@/components/BlogCardFull";
import { notFound } from "next/navigation";
import { cropText } from "@/util";

export const revalidate = 3600;

export const metadata = {
  title: "Blog Arşivi — PerformansLab",
  description:
    "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.",
  alternates: {
    canonical: "https://performanslab.com/arsiv",
  },
};

function FeaturedHero({ blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-[10px] bg-[#1a1a1a]"
      style={{ minHeight: "340px" }}
    >
      <div className="absolute inset-0">
        <Image
          fill
          src={blog.titleImage}
          alt={blog.title}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 p-6 sm:p-8">
        {blog.categories?.[0] && (
          <span
            className="inline-block mb-3 rounded-[4px] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
            style={{
              background: "#D2000C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {blog.categories[0].title}
          </span>
        )}
        <h2
          className="text-xl font-bold leading-[1.2] text-white sm:text-2xl"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {cropText(blog.title, 90)}
        </h2>
      </div>
    </Link>
  );
}

function DiscoverCard({ blog, isLast }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className={`group flex items-center gap-4 py-4 ${!isLast ? "border-b border-[#eee]" : ""}`}
    >
      <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[6px]">
        <Image
          fill
          src={blog.titleImage}
          alt={blog.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="72px"
        />
      </div>
      <p
        className="text-[0.9rem] font-semibold leading-[1.35] text-[#111] group-hover:text-[#D2000C] transition-colors duration-200"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
      >
        {cropText(blog.title, 80)}
      </p>
    </Link>
  );
}

export default async function ArchivePage() {
  const [featured, latest] = await Promise.all([
    getFeaturedBlogs(5),
    getLatestBlogs(),
  ]);

  const featuredSlugs = new Set(featured.map((b) => b.slug));
  const filteredLatest = latest.filter((b) => !featuredSlugs.has(b.slug));

  if (filteredLatest.length === 0 && featured.length === 0) notFound();

  const [hero, ...discoverRest] = featured;

  return (
    <>
      {/* ── Featured Section ── */}
      {featured.length > 0 && (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left: big hero card */}
          <FeaturedHero blog={hero} />

          {/* Right: "Daha fazla keşfet" */}
          <div className="flex flex-col">
            <h2
              className="text-[1.1rem] font-bold text-[#111] mb-1"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Daha fazla keşfet
            </h2>
            <div>
              {discoverRest.map((blog, i) => (
                <DiscoverCard
                  key={blog.slug}
                  blog={blog}
                  isLast={i === discoverRest.length - 1}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Son Eklenenler Section ── */}
      <section className="mt-14">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-[1.4rem] font-bold text-[#111]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Son Eklenenler
          </h2>
          <Link
            href="/tum-yazilar"
            className="border border-[#E6E6E6] rounded-lg py-2 px-5 text-[1rem] text-[#595959] font-medium hover:border-[#aaa] transition-colors"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Tüm Yazılar
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {filteredLatest.map((blog) => (
            <BlogCardFull key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}
