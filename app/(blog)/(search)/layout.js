import { Inter as secondaryFont } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import PaddedContainer from "@/components/composite/PaddedContainer";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppPanel from "@/components/WhatsAppContact";

export const Inter = secondaryFont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "YAZILAR -",
  description: "Generated by create next app",
  openGraph: {
    siteName: "Gerekli, Anlaşılabilir, Bilimsel Bilgi",
    locale: "tr_TR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
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
        {/* <PaddedContainer className={"pt-[80px] max-sm:pt-[50px]"}> */}
        <PaddedContainer className={"blog-layout-container"}>
          <div className="!min-h-[100vh]">
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
