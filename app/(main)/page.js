import GradientPage from "@/components/composite/GradientPage";
import BiographySection from "@/views/BiographySection";
import ContactSection from "@/views/ContactSection";
import HeroSection from "@/views/HeroSection";
import TreatmentsView from "@/views/TreatmentsView";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

export default function Home(params) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="preload" href="/treat1.webp" as="image" />
        <link rel="preload" href="/treat2.webp" as="image" />
        <link rel="preload" href="/treat3.webp" as="image" />
        <link rel="preload" href="/treat4.webp" as="image" />
        <link rel="preload" href="/treat5.webp" as="image" />
      </Head>
      <HeroSection />
      <TreatmentsView />
      <BiographySection />
      <ContactSection />
    </>
  );
}
