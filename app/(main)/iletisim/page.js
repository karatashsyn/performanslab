import IletisimPage from "@/views/IletisimPage";

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

export default function Iletisim() {
  return <IletisimPage />;
}
