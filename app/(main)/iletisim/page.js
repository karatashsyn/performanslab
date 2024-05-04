import SocialBoxes from "@/components/SocialBoxes";
import ContactSection from "@/views/ContactSection";
import React from "react";

export default function Iletisim() {
  return (
    <main>
      <h1 className="text-primary-white  text-center mb-24 w-full max-sm:text-[2rem] arial text-[2.4rem] leading-[0.72]  font-bold mt-12">
        İletişim
      </h1>
      <div className="w-full items-center animate-fade-in flex justify-between max-lg:flex-col sm:px-24 mb-24 mt-16 ">
        <div className="relative flex max-lg:w-full max-lg:justify-center">
          <SocialBoxes />
        </div>
        <div className="flex  flex-col justify-center max-sm:mt-36 max-lg:mt-12 items-start bg-red500 sm:basis-[40%] ">
          <h1 className="text-primary-white w-full pl-2 text-[1.6rem] arial leading-[0.72]  font-bold mb-6">
            Bize Ulaşın
          </h1>
          <div className="  h-full border-l-[1px] border-white pl-2">
            <p className="text-[1.12rem] text-ce text-secondary-white animate-fade-in w-full">
              PerformansLab olarak sizlere yardımcı olmaktan mutluluk duyuyoruz.
              Salonumuzu ziyaret edebilir, veya aklınıza takılan soruları mail
              ya da telefon yoluyla sorabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <ContactSection className={"sm:px-24 "} titleHidden={true} />
    </main>
  );
}
