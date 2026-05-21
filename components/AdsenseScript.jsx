"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

const NO_ADS_PATHS = ["/uygulamamiz"];

export default function AdsenseScript() {
  const pathname = usePathname();
  if (NO_ADS_PATHS.some((p) => pathname.startsWith(p))) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3696090202286990"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
