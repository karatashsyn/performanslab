import { Inter as secondaryFont } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import PaddedContainer from "@/components/composite/PaddedContainer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import { Suspense } from "react";

export const Inter = secondaryFont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "Blog — PerformansLab",
  description:
    "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.",
  openGraph: {
    siteName: "PerformansLab",
    locale: "tr_TR",
    type: "website",
    title: "Blog — PerformansLab",
    description:
      "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.",
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
    title: "Blog — PerformansLab",
    description:
      "Spor bilimi, antrenman ve beslenme üzerine gerekli, anlaşılabilir ve bilimsel yazılar.",
    images: ["/plab.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={Inter.className}>
        <header>
          <Navbar transparent={false} />
        </header>
        <PaddedContainer className={"blog-layout-container"}>
          <div className="!min-h-[100vh] pt-20">
            <main>
              <article>{children}</article>
            </main>
          </div>
        </PaddedContainer>
        <Footer darkMode={true} />
        <Analytics />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-90GN5TNZVK"
        />
        <Script id="gAnalyticsScript" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-90GN5TNZVK');`}
        </Script>
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>
      </body>
    </html>
  );
}
