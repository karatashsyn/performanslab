import { Suspense } from "react";
import FreeToolsPage from "@/views/FreeToolsPage";

export const metadata = {
  metadataBase: new URL("https://performanslab.com"),
  title: "Ücretsiz Araçlar — PerformansLab",
  description:
    "TDEE, antrenman testi, vücut yağ oranı ve BMI hesaplayıcıları.",
  openGraph: {
    title: "Ücretsiz Araçlar — PerformansLab",
    description: "TDEE, antrenman testi, vücut yağ oranı ve BMI hesaplayıcıları.",
    url: "https://performanslab.com/ucretsiz-araclar",
    images: [{ url: "/plab.jpeg", width: 1600, height: 1067, alt: "PerformansLab Ücretsiz Araçlar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ücretsiz Araçlar — PerformansLab",
    description: "TDEE, antrenman testi, vücut yağ oranı ve BMI hesaplayıcıları.",
    images: ["/plab.jpeg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FreeToolsPage />
    </Suspense>
  );
}
