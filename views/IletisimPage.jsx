/* eslint-disable @next/next/no-img-element */
"use client";
import { useRef, useState } from "react";
import {
  trackContactClick,
  trackFormStart,
  trackFormSubmit,
} from "@/lib/analytics";

const channels = [
  {
    label: "Telefon",
    value: "+90 544 732 03 31",
    href: "tel:+905447320331",
    channel: "phone",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+90 544 732 03 31",
    href: "https://wa.me/905447320331",
    channel: "whatsapp",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "E-posta",
    value: "ozkanmf@hotmail.com",
    href: "mailto:ozkanmf@hotmail.com",
    channel: "email",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    value: "@performanslab.levent",
    href: "https://www.instagram.com/performanslab.levent/",
    channel: "instagram",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

function Loader({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const formStarted = useRef(false);

  function handleFocus() {
    if (!formStarted.current) {
      formStarted.current = true;
      trackFormStart("contact_mail");
    }
  }

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    // TODO: wire up actual form submission (email service / API route)
    setTimeout(() => {
      setStatus("success");
      trackFormSubmit("contact_mail", true);
    }, 1000);
  }

  const inputClass =
    "w-full rounded-[6px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/25 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        name="name"
        type="text"
        required
        placeholder="Adınız"
        value={fields.name}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={status === "success"}
        className={inputClass}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      />
      <input
        name="email"
        type="email"
        required
        placeholder="E-posta adresiniz"
        value={fields.email}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={status === "success"}
        className={inputClass}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder="Mesajınız"
        value={fields.message}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={status === "success"}
        className={`${inputClass} resize-none`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-[6px] px-6 py-3 text-sm font-semibold text-white transition-all active:scale-95 disabled:cursor-default"
        style={{
          background: status === "success" ? "#16a34a" : "#D2000C",
          fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
          opacity: status === "loading" ? 0.8 : 1,
        }}
      >
        {status === "idle" && "Mesaj Gönder →"}
        {status === "loading" && (
          <>
            <Loader className="animate-spin" /> Gönderiliyor...
          </>
        )}
        {status === "success" && (
          <>
            <Check /> Mesajınız İletildi!
          </>
        )}
      </button>
    </form>
  );
}

export default function IletisimPage() {
  return (
    <main className="min-h-screen" style={{ background: "#090A0D" }}>
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10 pt-28 pb-24 lg:pt-36">
        {/* Two-column layout */}
        <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-20 lg:items-start">
          {/* ── Left: info ─────────────────────────────────────────────── */}
          <div>
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{
                color: "#D2000C",
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              İletişim
            </p>
            <h1
              className="font-bold leading-[1.05] text-white"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              }}
            >
              Birlikte
              <br />
              çalışalım.
            </h1>
            <p
              className="mt-5 max-w-md text-base leading-7 text-white/55"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Sorularınız için, bir seans planlamak için ya da sadece merhaba
              demek için aşağıdaki kanallardan ulaşabilirsiniz.
            </p>

            {/* Channel list */}
            <ul className="mt-10 flex flex-col divide-y divide-white/[0.07]">
              {channels.map((ch) => (
                <li key={ch.channel}>
                  <a
                    href={ch.href}
                    target={ch.channel !== "phone" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={() => trackContactClick(ch.channel, ch.href)}
                    className="group flex items-center gap-5 py-5 transition-colors"
                  >
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[8px] text-white/50 transition-all duration-200 group-hover:text-white"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      {ch.icon}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.1em] text-white/35"
                        style={{
                          fontFamily:
                            "var(--font-montserrat), Montserrat, sans-serif",
                        }}
                      >
                        {ch.label}
                      </span>
                      <span
                        className="text-sm font-medium text-white/80 transition-colors group-hover:text-white"
                        style={{
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                        }}
                      >
                        {ch.value}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-auto text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white/50"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right: form ────────────────────────────────────────────── */}
          <div
            className="rounded-[14px] border border-white/[0.04] p-6 sm:p-8 lg:sticky lg:top-28"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <p
              className="mb-1 text-base font-bold text-white"
              style={{
                fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              }}
            >
              Mesaj Gönder
            </p>
            <p
              className="mb-6 text-sm text-white/40"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              En kısa sürede dönüş yapılacaktır.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
