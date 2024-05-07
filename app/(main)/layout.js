import { Noto_Serif as mainfont } from "next/font/google";
import "./../globals.css";
import Navbar from "@/components/composite/Navbar";
import Footer from "@/components/composite/Footer";
import PaddedContainer from "@/components/composite/PaddedContainer";
import GradientPage from "@/components/composite/GradientPage";

const NotoSerif = mainfont({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "PL Ana Sayfa -",
  //TODO: Add description
  description:
    "Ana Sayfa Performans Testleri Arşiv Instagram Instagram Facebook Instagram Instagram Facebook Instagram Ana Sayfa Performans Testleri Arşiv Instagram PerformansLab Personal Training PerformansLab Ne Yapar? PerformansLab, fonksiyonel antrenmanlar, performans testleri, postür düzeltici egzersizler, atletik antrenmanlar ve dahası için sizleri bilgilendirir ve size uygun antrenmanlar planlar. BİZE ULAŞIN İçerikleri okumak için buraya tıkla! Fatih Özkan Kimdir? 1984",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    siteName: "- Gerekli, Anlaşılabilir, Bilimsel Bilgi",
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
      {/*  */}
      <body className={NotoSerif.className}>
        {/*  */}
        <GradientPage topEnabled={true} bottomEnabled={true} bg={"#181818"}>
          <header>
            <Navbar transparent={true} />
          </header>
          <PaddedContainer>
            <div className="!min-h-[100vh]">{children}</div>
          </PaddedContainer>
          <Footer />
        </GradientPage>
      </body>
    </html>
  );
}
