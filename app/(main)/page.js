import HeroSection from "@/views/HeroSection";
import ReviewsSection from "@/views/ReviewsSection";
import CalendarSection from "@/views/CalendarSection";
import TreatmentsView from "@/views/TreatmentsView";
import HomeBlogSection from "@/views/HomeBlogSection";
import AppSection from "@/views/AppSection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "PerformansLab",
  url: "https://www.performanslab.com",
  logo: "https://www.performanslab.com/new-logo.png",
  description:
    "PerformansLab, fonksiyonel antrenmanlar düzenler, beslenme programları oluşturur ve postür düzeltici egzersizler oluşturur.",
  sameAs: ["https://www.instagram.com/performanslab/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <ReviewsSection />
      <CalendarSection />
      <TreatmentsView />
      <HomeBlogSection />
      <AppSection />
    </>
  );
}
