import { Suspense } from "react";
import FreeToolsPage from "@/views/FreeToolsPage";

const meta = {
  h1: "Ücretsiz Fitness Hesaplayıcıları ve Testler",
  title: "Ücretsiz Fitness Araçları — TDEE, BMI, Vücut Yağı, Antrenman Testi | PerformansLab",
  description:
    "TDEE kalori hesaplayıcı, BMI hesaplayıcı, vücut yağ oranı hesaplayıcı ve antrenman seviyesi testi dahil tüm ücretsiz fitness araçlarımızı tek sayfada kullanın.",
};

export function generateMetadata() {
  return {
    metadataBase: new URL("https://www.performanslab.com"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: "https://www.performanslab.com/ucretsiz-araclar",
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: "https://www.performanslab.com/ucretsiz-araclar",
      images: [{ url: "/plab.jpeg", width: 1600, height: 1067, alt: meta.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/plab.jpeg"],
    },
  };
}

export default function Page() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.h1,
    url: "https://www.performanslab.com/ucretsiz-araclar",
    description: meta.description,
    hasPart: [
      {
        "@type": "WebApplication",
        name: "TDEE ve Günlük Kalori İhtiyacı Hesaplayıcı",
        url: "https://www.performanslab.com/ucretsiz-araclar/tdee",
        applicationCategory: "HealthApplication",
      },
      {
        "@type": "WebApplication",
        name: "Antrenman Seviyesi ve Program Testi",
        url: "https://www.performanslab.com/ucretsiz-araclar/training",
        applicationCategory: "HealthApplication",
      },
      {
        "@type": "WebApplication",
        name: "Vücut Yağ Oranı Hesaplayıcı",
        url: "https://www.performanslab.com/ucretsiz-araclar/bodyfat",
        applicationCategory: "HealthApplication",
      },
      {
        "@type": "WebApplication",
        name: "BMI — Vücut Kitle İndeksi Hesaplayıcı",
        url: "https://www.performanslab.com/ucretsiz-araclar/bmi",
        applicationCategory: "HealthApplication",
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://www.performanslab.com" },
      { "@type": "ListItem", position: 2, name: "Ücretsiz Araçlar", item: "https://www.performanslab.com/ucretsiz-araclar" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Suspense fallback={null}>
        <FreeToolsPage tool="tdee" />
      </Suspense>
    </>
  );
}
