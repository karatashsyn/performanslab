import { notFound } from "next/navigation";
import { Suspense } from "react";
import FreeToolsPage from "@/views/FreeToolsPage";

const toolMeta = {
  tdee: {
    h1: "TDEE ve Günlük Kalori İhtiyacı Hesaplayıcı",
    title: "TDEE Kalori Hesaplayıcı — PerformansLab",
    description:
      "Toplam günlük enerji harcamanızı (TDEE) ve kalori ihtiyacınızı ücretsiz hesaplayın. Hedeflerinize göre kilo verme, kilo alma veya koruma için gereken kalori miktarını öğrenin.",
  },
  training: {
    h1: "Antrenman Seviyesi ve Program Testi",
    title: "Ücretsiz Antrenman Testi — PerformansLab",
    description:
      "Spor geçmişinizi, hedeflerinizi ve antrenman koşullarınızı analiz ederek size en uygun programı öneren ücretsiz antrenman testi.",
  },
  bodyfat: {
    h1: "Vücut Yağ Oranı Hesaplayıcı",
    title: "Vücut Yağ Oranı Hesaplayıcı — PerformansLab",
    description:
      "Navy ölçüm metoduyla vücut yağ yüzdenizi ücretsiz hesaplayın. Cinsiyet, boy, bel ve kalça ölçüleriyle vücut kompozisyonunuzu analiz edin.",
  },
  bmi: {
    h1: "BMI — Vücut Kitle İndeksi Hesaplayıcı",
    title: "BMI Hesaplayıcı — PerformansLab",
    description:
      "Boy ve kilonuza göre BMI değerinizi ve sağlık kategorinizi ücretsiz hesaplayın.",
  },
};

const validTools = Object.keys(toolMeta);

export function generateStaticParams() {
  return validTools.map((tool) => ({ tool }));
}

export async function generateMetadata({ params }) {
  const { tool } = await params;
  if (!validTools.includes(tool)) return {};
  const meta = toolMeta[tool];
  return {
    metadataBase: new URL("https://performanslab.com"),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://performanslab.com/ucretsiz-araclar/${tool}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://performanslab.com/ucretsiz-araclar/${tool}`,
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

export default async function Page({ params }) {
  const { tool } = await params;
  if (!validTools.includes(tool)) notFound();

  const meta = toolMeta[tool];

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: meta.h1,
    url: `https://performanslab.com/ucretsiz-araclar/${tool}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: meta.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    provider: { "@type": "Organization", name: "PerformansLab", url: "https://performanslab.com" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Anasayfa", item: "https://performanslab.com" },
      { "@type": "ListItem", position: 2, name: "Ücretsiz Araçlar", item: "https://performanslab.com/ucretsiz-araclar" },
      { "@type": "ListItem", position: 3, name: meta.h1, item: `https://performanslab.com/ucretsiz-araclar/${tool}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Suspense fallback={null}>
        <FreeToolsPage tool={tool} />
      </Suspense>
    </>
  );
}
