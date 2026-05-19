import HeroSection from "@/views/HeroSection";
import ReviewsSection from "@/views/ReviewsSection";
import CalendarSection from "@/views/CalendarSection";
import TreatmentsView from "@/views/TreatmentsView";
import HomeBlogSection from "@/views/HomeBlogSection";
import AppSection from "@/views/AppSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ReviewsSection />
      <CalendarSection />
      <TreatmentsView />
      <HomeBlogSection />
      <AppSection />
    </>
  );
}
