import GradientPage from "@/components/composite/GradientPage";
import BiographySection from "@/views/BiographySection";
import ContactSection from "@/views/ContactSection";
import HeroSection from "@/views/HeroSection";
import TreatmentsView from "@/views/TreatmentsView";
import Image from "next/image";
import Script from "next/script";

export default function Home(params) {
  return (
    <>
      <HeroSection />
      <TreatmentsView />
      <BiographySection />
      <ContactSection />
    </>
  );
}
