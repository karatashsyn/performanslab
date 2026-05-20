import IletisimPage from "@/views/IletisimPage";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "İletişim — PerformansLab",
  description:
    "PerformansLab ile iletişime geçin. WhatsApp, Instagram, e-posta veya telefon yoluyla bize ulaşabilirsiniz.",
  openGraph: {
    title: "İletişim — PerformansLab",
    description:
      "PerformansLab ile iletişime geçin. WhatsApp, Instagram, e-posta veya telefon yoluyla bize ulaşabilirsiniz.",
    url: "https://performanslab.com/iletisim",
    images: [{ url: "/plab.jpeg", width: 1600, height: 1067, alt: "PerformansLab İletişim" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim — PerformansLab",
    description:
      "PerformansLab ile iletişime geçin. WhatsApp, Instagram, e-posta veya telefon yoluyla bize ulaşabilirsiniz.",
    images: ["/plab.jpeg"],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "İletişim — PerformansLab",
  url: "https://performanslab.com/iletisim",
  description:
    "PerformansLab ile iletişime geçin. WhatsApp, Instagram, e-posta veya telefon yoluyla bize ulaşabilirsiniz.",
  mainEntity: {
    "@type": "ProfessionalService",
    name: "PerformansLab",
    url: "https://performanslab.com",
    telephone: "+905447320331",
    email: "ozkanmf@hotmail.com",
    sameAs: ["https://www.instagram.com/performanslab.levent/"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+905447320331",
      contactType: "customer service",
      availableLanguage: "Turkish",
    },
  },
};

export default function Iletisim() {
  return (
    <>
      <Script
        id="contact-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <IletisimPage />
    </>
  );
}
