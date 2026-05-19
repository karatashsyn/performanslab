import { Montserrat, Inter } from "next/font/google";
import "./../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppPanel from "@/components/WhatsAppContact";
import RouteChangeTracker from "@/components/RouteChangeTracker";
import { Suspense } from "react";

const montserratFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const interFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "PerformansLab — Personal Training",
  description:
    "PerformansLab, fonksiyonel antrenmanlar düzenler, beslenme programları oluşturur ve postür düzeltici egzersizler oluşturur.",
  openGraph: {
    siteName: "PerformansLab",
    locale: "tr_TR",
    type: "website",
    url: "https://performanslab.com/",
    title: "PerformansLab — Personal Training",
    description:
      "PerformansLab, fonksiyonel antrenmanlar düzenler, beslenme programları oluşturur ve postür düzeltici egzersizler oluşturur.",
    images: [
      {
        url: "/plab.jpeg",
        width: 1600,
        height: 1067,
        alt: "PerformansLab Personal Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PerformansLab — Personal Training",
    description:
      "PerformansLab, fonksiyonel antrenmanlar düzenler, beslenme programları oluşturur ve postür düzeltici egzersizler oluşturur.",
    images: ["/plab.jpeg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      className={`${montserratFont.variable} ${interFont.variable}`}
    >
      <body
        className={interFont.className}
        style={{ background: "#090A0D", overflowX: "hidden" }}
      >
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3696090202286990"
          crossOrigin="anonymous"
        />
        <header>
          <Navbar />
        </header>
        {children}
        <Footer />
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
        <WhatsAppPanel />
        <Suspense fallback={null}>
          <RouteChangeTracker />
        </Suspense>
      </body>
    </html>
  );
}
