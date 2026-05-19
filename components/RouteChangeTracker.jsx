"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackPageView } from "@/lib/analytics";

export default function RouteChangeTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first render — gtag('config') in the Script tag already fires it
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const url =
      window.location.origin +
      pathname +
      (searchParams.toString() ? "?" + searchParams.toString() : "");

    trackPageView(url, document.title);
  }, [pathname, searchParams]);

  return null;
}
