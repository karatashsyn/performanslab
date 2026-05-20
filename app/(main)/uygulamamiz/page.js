import PerformansLabAppPage from "@/views/PerformansLabAppPage";

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "PerformansLab Uygulaması — Yakında",
  description:
    "PerformansLab uygulaması ile postür analizi, kişiye özel programlar ve antrenman takibini tek yerden yönetin.",
  openGraph: {
    title: "PerformansLab Uygulaması — Yakında",
    description:
      "PerformansLab uygulaması ile postür analizi, kişiye özel programlar ve antrenman takibini tek yerden yönetin.",
    url: "https://performanslab.com/performanslab-app",
    images: [
      {
        url: "/mockup-app-section.png",
        width: 1200,
        height: 630,
        alt: "PerformansLab Uygulaması",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PerformansLab Uygulaması — Yakında",
    description:
      "PerformansLab uygulaması ile postür analizi, kişiye özel programlar ve antrenman takibini tek yerden yönetin.",
    images: ["/mockup-app-section.png"],
  },
};

export default function Page() {
  return <PerformansLabAppPage />;
}
