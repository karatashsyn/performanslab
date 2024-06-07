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
      <Script id="clarity-script" type="text/javascript">
        {`  (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "mmw2pmmlb1");`}
      </Script>
      <HeroSection />
      <TreatmentsView />
      <BiographySection />
      <ContactSection />
    </>
  );
}
