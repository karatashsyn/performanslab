/* eslint-disable @next/next/no-img-element */
"use client";

import { reviews } from "@/config/reviews";

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F3C94B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 min-h-max h-full flex w-[420px] max-w-[calc(100vw-4rem)] flex-col justify-between rounded-[6px] p-6"
      style={{
        background: "#fff",
      }}
    >
      <div>
        <StarRating count={review.stars} />
        <p
          className="mt-3 text-sm leading-[150%]"
          style={{
            color: "#3F3F3F",
            fontFamily: "var(--font-inter), Inter, sans-serif",
          }}
        >
          {review.text}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-auto pt-8">
        <img
          src="/fake-img.png"
          alt=""
          className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
        />
        <div>
          <p
            className="text-sm font-bold leading-[1.125rem] tracking-[-1%] text-black"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            {review.name}
          </p>
          <p
            className="text-xs font-normal leading-[1rem]"
            style={{
              color: "#B6B6B6",
              fontFamily: "var(--font-inter), Inter, sans-serif",
            }}
          >
            {review.time || "2 hafta önce"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section
      style={{ background: "#F8F3EB" }}
      className="py-20 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto mb-10">
        {/* Top row: heading + Google Reviews badge */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                color: "#111",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              }}
            >
              Gerçek Sonuçlar,
              <br />
              Gerçek Hikâyeler
            </h2>
          </div>

          {/* Google Reviews badge */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span
                className="text-sm font-semibold"
                style={{
                  color: "#111",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                Google Yorumları
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#F3C94B"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span
                className="text-sm font-semibold"
                style={{
                  color: "#111",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                4.9
              </span>
              <span
                className="text-sm"
                style={{
                  color: "#555",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                57 Değerlendirme
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite scroll track */}
      <div className="overflow-hidden">
        <div
          className="flex w-max"
          style={{ animation: "scroll-left 40s linear infinite" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="flex gap-4 pr-4">
              {reviews.map((review, i) => (
                <ReviewCard key={`${groupIndex}-${i}`} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
