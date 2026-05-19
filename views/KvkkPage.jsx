export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-[#090A0D] text-white">
      <div
        className="mx-auto max-w-[780px] px-5 sm:px-8 pt-32 pb-24"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {/* Header */}
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#D2000C]"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Yasal Bilgilendirme
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight text-white"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          KVKK Aydınlatma Metni
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Son güncelleme: Mayıs 2025
        </p>

        <hr className="my-8 border-white/10" />

        <div className="space-y-10 text-[15px] leading-7 text-white/70">

          {/* 1 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              1. Veri Sorumlusunun Kimliği
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca,
              kişisel verileriniz aşağıda kimlik bilgileri verilen veri sorumlusu
              tarafından işlenmektedir.
            </p>
            <div className="mt-4 rounded-[8px] border border-white/10 p-5 text-sm space-y-1"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <p><span className="text-white/40">Unvan:</span> PerformansLab — Fatih Özkan</p>
              <p><span className="text-white/40">Adres:</span> Levent, Şişli, İstanbul {/* TODO: Tam adres eklenecek */}</p>
              <p><span className="text-white/40">E-posta:</span> ozkanmf@hotmail.com</p>
              <p><span className="text-white/40">Telefon:</span> +90 544 732 03 31</p>
              <p><span className="text-white/40">Web sitesi:</span> performanslab.com</p>
            </div>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              2. İşlenen Kişisel Veriler
            </h2>
            <p>
              Web sitemiz aracılığıyla aşağıdaki kişisel veriler toplanmaktadır:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-[#D2000C]">
              <li><span className="text-white/80 font-medium">E-posta adresi</span> — erken kayıt formu aracılığıyla</li>
              <li><span className="text-white/80 font-medium">Ad ve e-posta</span> — iletişim formu aracılığıyla</li>
              <li><span className="text-white/80 font-medium">Mesaj içeriği</span> — iletişim formu aracılığıyla</li>
              <li><span className="text-white/80 font-medium">Kullanım verileri</span> — Google Analytics aracılığıyla (anonim, kişisel tanımlama yapılmaz)</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              3. Kişisel Verilerin İşlenme Amacı
            </h2>
            <p>Toplanan kişisel veriler yalnızca aşağıdaki amaçlarla işlenmektedir:</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-[#D2000C]">
              <li>PerformansLab uygulamasının lansman duyurusunu iletmek</li>
              <li>İletişim taleplerinizi yanıtlamak</li>
              <li>Hizmetlerimizin kalitesini geliştirmek amacıyla anonim site analizi yapmak</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              4. Hukuki Sebep
            </h2>
            <p>
              Kişisel verileriniz, KVKK'nın 5. maddesi kapsamında aşağıdaki hukuki
              sebeplere dayanılarak işlenmektedir:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-[#D2000C]">
              <li>Açık rızanızın bulunması (erken kayıt formu)</li>
              <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması (iletişim talepleri)</li>
              <li>Veri sorumlusunun meşru menfaatlerini korumak (anonim analitik)</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              5. Kişisel Verilerin Aktarılması
            </h2>
            <p>
              Kişisel verileriniz; pazarlama, reklam veya ticari amaçlarla üçüncü
              kişilerle paylaşılmamaktadır. Yalnızca aşağıdaki hizmet sağlayıcılarla,
              hizmetin yürütülmesi amacıyla sınırlı olarak paylaşılabilir:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-[#D2000C]">
              <li>Google LLC (Google Analytics — anonim kullanım verisi)</li>
              <li>Vercel Inc. (web sitesi barındırma altyapısı)</li>
            </ul>
            <p className="mt-3">
              Bu aktarımlar, yalnızca KVKK'nın 8. ve 9. maddeleri kapsamındaki
              güvenceler çerçevesinde gerçekleştirilmektedir.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              6. Saklama Süresi
            </h2>
            <p>
              Kişisel verileriniz, işlenme amacının ortadan kalkması ya da talebiniz
              üzerine silinmektedir. Uygulama lansman duyurusu gerçekleştikten sonra,
              erken kayıt listesindeki e-posta adresleri 30 gün içinde silinir.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              7. İlgili Kişinin Hakları (KVKK Madde 11)
            </h2>
            <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside marker:text-[#D2000C]">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini ya da yok edilmesini isteme</li>
              <li>İşlemenin yalnızca açık rızaya dayandığı durumlarda rızanızı geri alma</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-3 text-base font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
              8. Başvuru Yöntemi
            </h2>
            <p>
              Yukarıdaki haklarınızı kullanmak için aşağıdaki e-posta adresine
              yazılı başvuruda bulunabilirsiniz. Başvurularınız en geç 30 gün
              içinde sonuçlandırılacaktır.
            </p>
            <div className="mt-4 rounded-[8px] border border-white/10 p-5 text-sm"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <p>
                <span className="text-white/40">E-posta:</span>{" "}
                <a
                  href="mailto:ozkanmf@hotmail.com"
                  className="text-white underline underline-offset-2 hover:text-white/70 transition-colors"
                >
                  ozkanmf@hotmail.com
                </a>
              </p>
              <p className="mt-1">
                <span className="text-white/40">Konu satırı:</span>{" "}
                <span className="text-white/60">KVKK Başvurusu</span>
              </p>
            </div>
          </section>

        </div>

        <hr className="my-10 border-white/10" />

        <p className="text-xs text-white/25 leading-6">
          Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
          ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve
          Esaslar Hakkında Tebliğ kapsamında hazırlanmıştır.
        </p>
      </div>
    </main>
  );
}
