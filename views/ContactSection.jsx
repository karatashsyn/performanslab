import ContactInfo from "@/components/ContactInfo";
import React from "react";

export default function ContactSection({
  titleHidden = false,
  lightMode = false,
}) {
  return (
    <section id="fatih-ozkan" className=" mt-64  ">
      {!titleHidden && (
        <div className="w-full flex items-center justify-between">
          <h2 className="text-primary-white max-sm:text-[2rem] arial text-[2.25rem] leading-[0.72]  font-bold">
            İletişim
          </h2>
          <a
            href="https://www.instagram.com/performanslab.levent/"
            target="_blank"
          >
            <button
              className="bg-white  rounded-[0.08rem] border-[rgba(0,0,0,)] hover:opacity-70  text-[#DA0B12] transition-all duration-200  arial text-[0.88rem] h-[3rem] font-semibold px-9 py-3 sm:shadow-sm shadow-[#DA0B12]"
              role="button"
              style={{}}
            >
              Randevu Oluştur
            </button>
          </a>
        </div>
      )}
      <div className="flex justify-between items-center gap-20 w-full max-sm:mt-[4rem] mt-[4rem] max-sm:flex-col">
        <div
          className=" basis-full sm:hidden rounded-md overflow-hidden bg-gray-800 max-sm:w-full"
          src="/fake-img.png"
          alt="fatih-ozkan"
        >
          <iframe
            title="PerformansLab Levent Haritası"
            className="w-full rounded-md aspect-[2]"
            src="https://maps.google.com/maps?q=34394%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul%20performanslab%20Levent&t=m&z=15&output=embed&iwloc=near"
            frameBorder="0"
          ></iframe>
        </div>
        <ul className="pt-4 flex flex-col max-sm:items-start max-sm:w-full gap-10 basis-full">
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
          <ContactInfo
            textClass={lightMode ? "!text-[#09090b] arial" : ""}
            labelClass={lightMode ? "!text-[#555] arial" : ""}
            info={"Atom Sk. No:22-32, 34394 Şişli/İstanbul"}
            label={"Adres"}
            icon="/pin.svg"
          />
        </ul>
        <div className="basis-full max-sm:hidden rounded-md overflow-hidden bg-gray-500 max-sm:w-[90%]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255.0098647343109!2d29.008880689933875!3d41.07717282188019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab75094b5195f%3A0x562bfeef9f4801a7!2sPerformanslab%20Levent!5e0!3m2!1str!2str!4v1750218629408!5m2!1str!2str"
            className="w-full rounded-md sm:aspect-[666/307]"
            title="PerformansLab Levent Haritası"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
