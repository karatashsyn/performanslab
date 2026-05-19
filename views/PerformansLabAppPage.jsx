/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef, useState } from "react";
import { trackFormStart, trackFormSubmit } from "@/lib/analytics";

const featureGroups = [
  {
    title: "Postür Analizi",
    desc: "Görsel değerlendirme, hareket kalitesi notları ve düzeltici egzersiz önerileri.",
  },
  {
    title: "Kişiye Özel Program",
    desc: "Hedef, seviye, ekipman ve sakatlık geçmişine göre güncellenen antrenman akışı.",
  },
  {
    title: "Antrenman Takibi",
    desc: "Set, tekrar, yük, süre ve ilerleme takibini tek ekrandan yönetme.",
  },
  {
    title: "Performans Testleri",
    desc: "Başlangıç ölçümleri ve periyodik testlerle gelişimi net biçimde izleme.",
  },
];

const steps = [
  "Ön değerlendirme ve hedef belirleme",
  "Postür, hareket ve performans kontrolü",
  "Kişisel programın uygulamaya aktarılması",
  "Haftalık takip ve programa göre güncelleme",
];

function Loader2({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function Check({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function EarlySignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const formStarted = useRef(false);

  function handleFocus() {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart("erken_kayit");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      trackFormSubmit("erken_kayit", true);
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={handleFocus}
        placeholder="E-posta adresiniz"
        disabled={status === "success"}
        className="w-full rounded-[6px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/30 disabled:opacity-50"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      />

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-sm font-semibold text-white transition-all active:scale-95 disabled:cursor-default"
        style={{
          background: status === "success" ? "#16a34a" : "#D2000C",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          opacity: status === "loading" ? 0.85 : 1,
        }}
      >
        {status === "idle" && "Erken Kayıt Ol →"}
        {status === "loading" && (
          <>
            <Loader2 className="animate-spin" />
            Kaydediliyor...
          </>
        )}
        {status === "success" && (
          <>
            <Check />
            Erken Kayıt Listesine Eklendiniz!
          </>
        )}
      </button>
    </form>
  );
}

export default function PerformansLabAppPage() {
  return (
    <main className="bg-black text-white">
      {/* ── Hero: two-column ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24"
        style={{
          background:
            "linear-gradient(180deg, #2a2a2a 0%, #111111 60%, #000000 100%)",
        }}
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10">
          {/*
            Flat 2×2 grid on desktop:
              [heading          | mockup         ]  ← row 1
              [form box         | feature cards  ]  ← row 2 — same row = same height
          */}
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">

            {/* Row 1 · Left: heading */}
            <div className="flex flex-col justify-end">
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{
                  color: "#D2000C",
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                }}
              >
                PerformansLab App — Yakında
              </p>
              <h1
                className="text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                Antrenman sürecin
                <br />
                tek yerde.
              </h1>
              <p
                className="mt-5 text-base leading-7 text-white/60"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Postür analizi, kişiye özel program, antrenman takibi ve
                performans ölçümlerini PerformansLab yaklaşımıyla bir araya
                getiriyoruz. Erken kayıt ol, çıkışta ilk sen haberdar ol.
              </p>
            </div>

            {/* Row 1 · Right: mockup — hidden on mobile */}
            <div className="hidden lg:flex items-end justify-center">
              <img
                src="/mockup-app-section.png"
                alt="PerformansLab uygulaması"
                className="w-full max-w-[300px] drop-shadow-2xl"
              />
            </div>

            {/* Row 2 · Left: form box */}
            <div
              className="flex flex-col rounded-[12px] border border-white/10 p-6"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <p
                className="mb-4 text-sm font-semibold text-white/80"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                Erken kayıt listesine katıl
              </p>
              <EarlySignupForm />
              <p
                className="mt-3 text-xs leading-5 text-white/30"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Spam yok. İstediğin zaman çıkabilirsin. E-posta adresiniz
                yalnızca uygulama lansmanı hakkında bilgilendirme amacıyla
                işlenecektir.{" "}
                <a
                  href="/kvkk"
                  className="text-xs underline underline-offset-2 hover:text-white/60 transition-colors"
                >
                  KVKK Aydınlatma Metni
                </a>
              </p>
            </div>

            {/* Row 2 · Right: feature cards — same grid row as form box = same height */}
            <div className="grid grid-cols-2 gap-3">
              {featureGroups.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-[8px] border border-[#333] bg-[#222] p-4"
                >
                  <p
                    className="text-sm font-semibold text-white"
                    style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                  >
                    {f.title}
                  </p>
                  <p
                    className="mt-1 text-xs leading-5 text-white/45"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[105%] text-black"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Programın sadece yazılmaz, takip edilir.
            </h2>
            <p
              className="mt-5 max-w-xl text-base leading-7 text-[#555]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Uygulama, antrenman sürecini ölçülebilir ve sürdürülebilir hale
              getirmek için tasarlanıyor. Böylece ne yaptığını, neden yaptığını
              ve nasıl ilerlediğini net görebilirsin.
            </p>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-[6px] bg-[#111] p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D2000C] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span
                  className="text-sm font-semibold text-white sm:text-base"
                  style={{
                    fontFamily:
                      "var(--font-montserrat), Montserrat, sans-serif",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
