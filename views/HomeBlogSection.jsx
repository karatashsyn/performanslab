/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getBlogs } from "@/services/blog";
import { getFormattedDate, cropText } from "@/util";

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function FeaturedCard({ blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-[10px] bg-[#1a1a1a]"
      style={{ minHeight: "440px" }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={blog.titleImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Bottom gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>

      {/* Category badge */}
      {blog.categories?.[0] && (
        <span
          className="absolute top-5 left-5 rounded-[4px] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
          style={{
            background: "#D2000C",
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {blog.categories[0].title}
        </span>
      )}

      {/* Text */}
      <div className="relative z-10 p-6 sm:p-8">
        <p
          className="mb-2 text-xs text-white/45"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {getFormattedDate(blog.date)}
        </p>
        <h3
          className="text-xl font-bold leading-[1.2] text-white transition-colors duration-200 group-hover:text-white/85 sm:text-2xl"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {blog.title}
        </h3>
        {blog.description && (
          <p
            className="mt-2 text-sm leading-[1.55] text-white/50"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            {cropText(blog.description, 110)}
          </p>
        )}
        <span
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 transition-colors duration-200 group-hover:text-white"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          Devamını Oku <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

function SideCard({ blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="group flex gap-4 overflow-hidden rounded-[8px] border border-white/[0.025] bg-white/[0.03] p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.06]"
    >
      {/* Thumbnail */}
      <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[6px] sm:h-20 sm:w-20">
        <img
          src={blog.titleImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-col justify-center gap-1">
        {blog.categories?.[0] && (
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.1em]"
            style={{
              color: "#D2000C",
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            {blog.categories[0].title}
          </span>
        )}
        <p
          className="text-sm font-semibold leading-[1.35] text-white/90 group-hover:text-white"
          style={{
            fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          }}
        >
          {cropText(blog.title, 72)}
        </p>
        <p
          className="text-xs text-white/35"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {getFormattedDate(blog.date)}
        </p>
      </div>
    </Link>
  );
}

export default async function HomeBlogSection() {
  const blogs = await getBlogs();
  const visible = blogs.slice(0, 3);

  if (visible.length === 0) return null;

  const [featured, ...rest] = visible;

  return (
    <section className="py-20 lg:py-28" style={{ background: "#0f0f0f" }}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Header row */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: "#D2000C",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Blog
            </p>
            <h2
              className="font-bold leading-[1.05] text-white"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              }}
            >
              Antrenman, Performans
              <br className="hidden sm:block" />
              ve Daha Fazlası
            </h2>
          </div>

          <Link
            href="/arsiv"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors duration-200 hover:text-white sm:flex"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Tüm Yazılar <ArrowRight />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* Featured */}
          <FeaturedCard blog={featured} />

          {/* Side cards */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-4">
              {rest.map((blog) => (
                <SideCard key={blog.slug} blog={blog} />
              ))}
              {/* Filler card if only 1 side post */}
              {rest.length < 2 && (
                <Link
                  href="/arsiv"
                  className="flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-white/[0.07] text-sm font-semibold text-white/40 transition-all hover:border-white/15 hover:text-white/70"
                  style={{
                    fontFamily:
                      "var(--font-montserrat), Montserrat, sans-serif",
                    minHeight: "96px",
                  }}
                >
                  Tüm Yazıları Gör <ArrowRight />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile "all posts" link */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href="/arsiv"
            className="flex items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors hover:text-white"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
            }}
          >
            Tüm Yazılar <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
