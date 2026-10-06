import Link from "next/link";

const INTER = { fontFamily: "var(--font-inter), Inter, sans-serif" };
const MONTSERRAT = { fontFamily: "var(--font-montserrat), Montserrat, sans-serif" };

export const metadata = {
  metadataBase: new URL("https://www.performanslab.com"),
  title: "Açık Rıza Metni — PerformansLab Postür Testi",
  description: "PerformansLab Postür Testi açık rıza metni.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#090A0D] pb-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8 pt-24 flex flex-col gap-6 text-sm leading-6 text-white/70" style={INTER}>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white" style={MONTSERRAT}>
            Açık Rıza Metni
          </h1>
          <p className="mt-1 text-white/50">PerformansLab Postür Testi</p>
        </div>

        <p>
          Kişisel verilerinizin işlenmesine ilişkin detaylara{" "}
          <Link href="/kvkk" className="underline text-white hover:text-white/80">
            PerformansLab Postür Testi Kamera Kullanımı Aydınlatma Metni
          </Link>{" "}
          üzerinden ulaşabilirsiniz.
        </p>

        <p>
          <strong className="text-white">PerformansLab — Fatih Özkan (“PerformansLab”)</strong> tarafından aşağıdaki
          kişisel veri işleme faaliyetlerine ilişkin açık rızamı özgür irademle veriyorum:
        </p>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold text-white" style={MONTSERRAT}>
            Zorunlu test işlemi için
          </h2>
          <p>
            Önden ve yandan çekilen fotoğraflarımın ve bu fotoğraflardan elde edilen postür ölçümlerinin, postür
            testinin gerçekleştirilmesi amacıyla cihazım üzerinde işlenmesine açık rıza veriyorum.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-semibold text-white" style={MONTSERRAT}>
            İsteğe bağlı sunucu aktarımı
          </h2>
          <p>
            Postür testinin sunucu ortamında gerçekleştirilebilmesi amacıyla önden ve yandan çekilen fotoğraflarımın
            PerformansLab sunucularına ve Aydınlatma Metni&apos;nde belirtilen hizmet sağlayıcılara aktarılmasına ve
            işlenmesine açık rıza veriyorum.
          </p>
          <p>
            Bu seçenek isteğe bağlıdır. Bu seçeneği kabul etmemem halinde, teknik olarak mümkün olduğu ölçüde cihaz
            üzerinde gerçekleştirilen temel postür testini kullanabilirim.
          </p>
        </section>

        <p>
          Açık rızamı geleceğe yönelik olarak dilediğim zaman geri çekebileceğimi biliyorum. Açık rızamın geri
          çekilmesi, geri çekme tarihinden önce rızaya dayanılarak gerçekleştirilmiş veri işleme faaliyetlerinin
          hukuka uygunluğunu etkilemez.
        </p>
      </div>
    </main>
  );
}
