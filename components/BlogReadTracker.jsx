"use client";

import { useEffect, useRef } from "react";
import {
  trackBlogView,
  trackBlogReadComplete,
  trackScrollDepth,
} from "@/lib/analytics";

const DEPTH_MILESTONES = [25, 50, 75, 90];

export default function BlogReadTracker({ title, slug }) {
  const startTime = useRef(Date.now());
  const firedDepths = useRef(new Set());
  const completeFired = useRef(false);

  useEffect(() => {
    trackBlogView(title, slug);
    startTime.current = Date.now();
    firedDepths.current = new Set();
    completeFired.current = false;

    function getScrollDepthPercent() {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) return 100;
      return Math.round((scrolled / total) * 100);
    }

    function handleScroll() {
      const depth = getScrollDepthPercent();

      for (const milestone of DEPTH_MILESTONES) {
        if (depth >= milestone && !firedDepths.current.has(milestone)) {
          firedDepths.current.add(milestone);
          trackScrollDepth(milestone, {
            content_type: "article",
            blog_slug: slug,
            blog_title: title,
          });
        }
      }

      if (depth >= 90 && !completeFired.current) {
        completeFired.current = true;
        const timeOnPageSec = Math.round((Date.now() - startTime.current) / 1000);
        trackBlogReadComplete(title, slug, timeOnPageSec);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [title, slug]);

  return null;
}
