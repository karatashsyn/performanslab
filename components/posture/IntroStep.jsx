"use client";
import { useState } from "react";
import Link from "next/link";
import { PHOTO_RULES_TEXT } from "@/lib/posture/copy";
import Disclaimer from "./Disclaimer";

const STEPS = [
  { title: "Ön fotoğraf", desc: "Karşıya bakarak, tüm vücut karede" },
  { title: "Yan fotoğraf", desc: "Profilden, tüm vücut karede" },
  { title: "Sonuç", desc: "Skor, metrikler ve odak alanları" },
];

export default function IntroStep({ onStart }) {
  const [consentRead, setConsentRead] = useState(false);
  const [serverConsent, setServerConsent] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#D2000C", fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Ücretsiz · 20 saniye
        </p>
        <h1
          className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] text-white"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Postürünü test et
        </h1>
        <p
          className="mt-4 max-w-xl text-base leading-7 text-white/60"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          İki fotoğrafla omuz, pelvis, baş ve gövde hizanı analiz ediyoruz.
          Fotoğraflar tarayıcında işlenir, hiçbir yere yüklenmez.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STEPS.map((s, i) => (
          <div
            key={s.title}
            className="rounded-[8px] border border-white/10 p-4"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D2000C] text-xs font-bold text-white">
              {i + 1}
            </span>
            <p
              className="mt-3 text-sm font-semibold text-white"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              {s.title}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/45" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        className="rounded-[8px] border border-white/10 p-4"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <p
          className="mb-1 text-xs font-semibold text-white/70"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Fotoğraf kuralları
        </p>
        <p className="text-sm leading-6 text-white/55" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          {PHOTO_RULES_TEXT}
        </p>
      </div>

      <div
        className="flex flex-col gap-3 rounded-[8px] border border-white/10 p-4"
        style={{ background: "rgba(255,255,255,0.04)", fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/80">
          <input
            type="checkbox"
            checked={consentRead}
            onChange={(e) => setConsentRead(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#D2000C]"
          />
          <span>
            <Link
              href="/postur-analizi/acik-riza"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-white/80"
            >
              Açık rıza metnini
            </Link>{" "}
            okudum, onaylıyorum.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/60">
          <input
            type="checkbox"
            checked={serverConsent}
            onChange={(e) => setServerConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[#D2000C]"
          />
          <span>
            Fotoğraflarımın analiz için PerformansLab sunucularına aktarılmasına izin veriyorum{" "}
            <span className="text-white/40">(isteğe bağlı)</span>.
          </span>
        </label>
      </div>

      <button
        onClick={() => onStart({ serverConsent })}
        disabled={!consentRead}
        className="w-full sm:w-auto self-start rounded-[6px] bg-[#D2000C] px-10 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
      >
        Teste Başla →
      </button>

      <Disclaimer />
    </div>
  );
}
