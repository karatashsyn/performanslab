import { Noto_Serif as mainfont } from "next/font/google";
import "./../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import PaddedContainer from "@/components/composite/PaddedContainer";
import GradientPage from "@/components/composite/GradientPage";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import WhatsAppPanel from "@/components/WhatsAppContact";

const NotoSerif = mainfont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "PL Ana Sayfa -",
  //TODO: Add description
  description:
    "PerformansLab, fonksiyonel antrenmanlar düzenler, beslenme programları oluşturur ve postür düzeltici egezersizler oluşturur.",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    siteName: "Gerekli, Anlaşılabilir, Bilimsel Bilgi",
    locale: "tr_TR",
    type: "website",
    url: "https://performanslab.com/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      style={{
        background: "#181818",
      }}
    >
      <WhatsAppPanel />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3696090202286990"
        crossorigin="anonymous"
      ></Script>

      <body className={NotoSerif.className}>
        <GradientPage topEnabled={true} bottomEnabled={true} bg={"#181818"}>
          <header>
            <Navbar transparent={true} />
          </header>
          <PaddedContainer>
            <div className="!min-h-[100vh]">{children}</div>
          </PaddedContainer>

          <Footer />
        </GradientPage>

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
