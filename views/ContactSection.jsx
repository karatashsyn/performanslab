import ContactInfo from "@/components/ContactInfo";
import React from "react";

export default function ContactSection({
  titleHidden = false,
  lightMode = false,
  className = "",
}) {
  return (
    <section
      id="iletisim"
      className={`${className} landing-section landing-contact mt-56`}
    >
      {!titleHidden && (
        <div className="w-full flex items-center justify-between">
          <h2 className="landing-section-title text-primary-white max-sm:text-[2rem] arial text-[2.25rem] leading-[0.72] font-bold">
            Online Eğitim
          </h2>
          <a href="/iletisim">
            <button
              className="landing-primary-button landing-contact__button transition-all duration-200 arial text-[0.88rem] h-[3rem] font-semibold px-9 py-3"
              role="button"
              style={{}}
            >
              Online Eğitim Al
            </button>
          </a>
        </div>
      )}
      <div className="flex justify-between items-center gap-20 w-full max-sm:mt-[4rem] mt-[4rem] max-sm:flex-col">
        <div
          className="landing-map basis-full sm:hidden overflow-hidden bg-gray-800 max-sm:w-full"
          src="/fake-img.png"
          alt="fatih-ozkan"
        >
          <iframe
            title="PerformansLab Levent Haritası"
            className="w-full aspect-[2]"
            src="https://maps.google.com/maps?q=34394%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul%20performanslab%20Levent&t=m&z=15&output=embed&iwloc=near"
            frameBorder="0"
          ></iframe>
        </div>
        <ul className="landing-contact-list pt-4 flex flex-col max-sm:items-start max-sm:w-full gap-10 basis-full">
          <ContactInfo
            textClass={lightMode ? "!text-[#09090b] arial" : ""}
            labelClass={lightMode ? "!text-[#555] arial" : ""}
            info={"(+90) 544 732 03 31"}
            label={"Telefon"}
            icon="/phone.svg"
          />
          <ContactInfo
            textClass={lightMode ? "!text-[#09090b] arial" : ""}
            labelClass={lightMode ? "!text-[#555] arial" : ""}
            info={"ozkanmf@hotmail.com"}
            label={"Mail"}
            icon="/message.svg"
          />
        </ul>
      </div>
    </section>
  );
}
