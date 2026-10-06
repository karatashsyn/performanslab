"use client";
import Link from "next/link";
import { useState } from "react";

const INTER = { fontFamily: "var(--font-inter), Inter, sans-serif" };
const MONTSERRAT = { fontFamily: "var(--font-montserrat), Montserrat, sans-serif" };

function ConsentCheckbox({ checked, onChange, children }) {
  return (
    <label
      className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-white/10 p-4"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#D2000C]"
      />
      <span className="text-sm leading-6 text-white/80" style={INTER}>
        {children}
      </span>
    </label>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40" style={MONTSERRAT}>
      {children}
    </p>
  );
}

// onContinue receives { serverConsent } — the optional server-transfer choice.
export default function ConsentStep({ onContinue, onBack }) {
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [serverConsent, setServerConsent] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white" style={MONTSERRAT}>
          Açık Rıza Metni
        </h2>
        <p className="mt-1 text-sm text-white/50" style={INTER}>
          PerformansLab Postür Testi
        </p>
      </div>

      <div className="flex flex-col gap-4 text-sm leading-6 text-white/70" style={INTER}>
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
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Zorunlu test işlemi için</SectionLabel>
        <ConsentCheckbox checked={requiredConsent} onChange={setRequiredConsent}>
          <strong className="text-white">
            Önden ve yandan çekilen fotoğraflarımın ve bu fotoğraflardan elde edilen postür ölçümlerinin, postür
            testinin gerçekleştirilmesi amacıyla cihazım üzerinde işlenmesine açık rıza veriyorum.
          </strong>
        </ConsentCheckbox>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>İsteğe bağlı sunucu aktarımı</SectionLabel>
        <ConsentCheckbox checked={serverConsent} onChange={setServerConsent}>
          <strong className="text-white">
            Postür testinin sunucu ortamında gerçekleştirilebilmesi amacıyla önden ve yandan çekilen
            fotoğraflarımın PerformansLab sunucularına ve Aydınlatma Metni&apos;nde belirtilen hizmet sağlayıcılara
            aktarılmasına ve işlenmesine açık rıza veriyorum.
          </strong>
        </ConsentCheckbox>
        <p className="text-xs leading-5 text-white/50" style={INTER}>
          Bu seçenek isteğe bağlıdır. Bu seçeneği kabul etmemem halinde, teknik olarak mümkün olduğu ölçüde cihaz
          üzerinde gerçekleştirilen temel postür testini kullanabilirim.
        </p>
      </div>

      <p className="text-xs leading-5 text-white/50" style={INTER}>
        Açık rızamı geleceğe yönelik olarak dilediğim zaman geri çekebileceğimi biliyorum. Açık rızamın geri
        çekilmesi, geri çekme tarihinden önce rızaya dayanılarak gerçekleştirilmiş veri işleme faaliyetlerinin
        hukuka uygunluğunu etkilemez.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="rounded-[6px] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          style={MONTSERRAT}
        >
          Geri
        </button>
        <button
          onClick={() => onContinue({ serverConsent })}
          disabled={!requiredConsent}
          className="flex-1 rounded-[6px] bg-[#D2000C] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          style={MONTSERRAT}
        >
          Onaylıyorum, devam et →
        </button>
      </div>
    </div>
  );
}
