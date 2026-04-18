/* eslint-disable @next/next/no-img-element */
import AppPreview from "@/components/AppPreview";
import Link from "next/link";
import React from "react";

const features = [
  {
    title: "Postür Analizi",
    text: "Telefon kamerasıyla alınan görüntüler postür skoruna, ölçüm detaylarına ve tespit edilen problemlere dönüşür.",
  },
  {
    title: "Kişiye Özel Program",
    text: "Antrenman planı hedefe, postür sonucuna, hareket kapasitesine ve gelişim verilerine göre hazırlanır.",
  },
  {
    title: "Gerçek Zamanlı Hareket Analizi",
    text: "Egzersiz sırasında hareket formu takip edilir; tekrar kalitesi ve açı kontrolü daha görünür hale gelir.",
  },
  {
    title: "Online Eğitim Takibi",
    text: "Program, uygulama verileri ve antrenör geri bildirimiyle düzenli olarak güncellenir.",
  },
];

export const metadata = {
  title: "PerformansLab Uygulaması -",
  description:
    "PerformansLab uygulaması postür analizi, kişiye özel online antrenman programı ve gerçek zamanlı hareket analizi sunar.",
};

export default function UygulamamizPage() {
  return (
    <main className="app-page">
      <section className="app-page__hero">
        <div className="app-page__copy">
          <p className="app-page__eyebrow">PerformansLab Uygulaması</p>
          <h1>Postür analiziyle başlayan online eğitim.</h1>
          <p>
            Postürünü ölç, sana özel programını al ve antrenman formunu gerçek
            zamanlı hareket analiziyle takip et.
          </p>
          <div className="app-page__actions">
            <Link href="#indir" className="landing-primary-button">
              Uygulamayı İndir
            </Link>
            <Link href="/iletisim" className="landing-secondary-button">
              Online Eğitim Al
            </Link>
          </div>
        </div>
        <div className="app-page__visual">
          <AppPreview />
        </div>
      </section>

      <section className="app-page__features">
        {features.map((feature, index) => (
          <article className="app-page__feature" key={feature.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{feature.title}</h2>
            <p>{feature.text}</p>
          </article>
        ))}
      </section>

      <section className="app-page__training">
        <img src="/hero3.jpg" alt="" />
        <div>
          <h2>Program yalnızca liste değil, takip edilen bir süreçtir.</h2>
          <p>
            Analiz sonuçların antrenman seçimini belirler. Uygulamadaki hareket
            verileri ve antrenör değerlendirmesiyle programın ihtiyacına göre
            güncellenir.
          </p>
        </div>
      </section>

      <section id="indir" className="app-page__download">
        <p className="app-page__eyebrow">İndirme</p>
        <h2>Uygulamayı indir, gelişim sürecini başlat.</h2>
        <div className="app-page__store-row">
          <a href="/iletisim">App Store</a>
          <a href="/iletisim">Google Play</a>
        </div>
        <p>
          Mağaza bağlantıları aktif olduğunda burada yayınlanacak. Online eğitim
          kaydı için bize ulaşabilirsin.
        </p>
      </section>
    </main>
  );
}
