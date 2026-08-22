import { Suspense } from "react";
import PostureDemo from "./posture-demo";

const title = "Ücretsiz Postür Testi | PerformansLab";
const description =
  "İki fotoğrafla omuz, pelvis, baş ve gövde hizanı tarayıcında analiz et. 0-100 skor, ölçülen değerler ve odak alanlarını hemen gör.";

export const metadata = {
  metadataBase: new URL("https://www.performanslab.com"),
  title,
  description,
  alternates: {
    canonical: "https://www.performanslab.com/postur-analizi",
  },
  openGraph: {
    title,
    description,
    url: "https://www.performanslab.com/postur-analizi",
    images: [{ url: "/plab.jpeg", width: 1600, height: 1067, alt: "PerformansLab Postür Testi" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/plab.jpeg"],
  },
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "PerformansLab Postür Testi",
  url: "https://www.performanslab.com/postur-analizi",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
  provider: { "@type": "Organization", name: "PerformansLab", url: "https://www.performanslab.com" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://www.performanslab.com" },
    { "@type": "ListItem", position: 2, name: "Postür Testi", item: "https://www.performanslab.com/postur-analizi" },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Suspense fallback={null}>
        <PostureDemo />
      </Suspense>
    </>
  );
}
