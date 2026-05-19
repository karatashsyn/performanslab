import { Inter as secondaryFont } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppPanel from "@/components/WhatsAppContact";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import { Suspense } from "react";

export const Inter = secondaryFont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "PerformansLab — Blog",
  description:
    "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.",
  openGraph: {
    siteName: "PerformansLab",
    locale: "tr_TR",
    type: "article",
    images: [
      {
        url: "/plab.jpeg",
        width: 1600,
        height: 1067,
        alt: "PerformansLab Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/plab.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      style={{
        background: "rgb(254, 254, 254)",
      }}
    >
      <WhatsAppPanel />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3696090202286990"
        crossorigin="anonymous"
      ></Script>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3696090202286990"
        crossorigin="anonymous"
      ></Script>
      <body className={Inter.className}>
        {/* <header className="fixed top-0 z-[20]"> */}
        <header className="">
          <Navbar transparent={false} />
        </header>
        <div className="!min-h-[100vh]">
          <main>
            <article className="text-left">{children}</article>
          </main>
        </div>
        <Footer darkMode={true} />
        <Analytics />
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-90GN5TNZVK"
        ></Script>
        <Script id="gAnalyticsScript" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-90GN5TNZVK');`}
        </Script>
      </body>
    </html>
  );
}
