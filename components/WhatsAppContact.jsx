"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";

export default function WhatsAppPanel() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setVisible(true),
      10000 + Math.random() * 1000,
    );
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = "https://wa.me/+905447320331";

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 max-sm:right-4 z-50 flex">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp üzerinden mesaj yaz"
        className="whatsapp-panel animate-fade-in"
      >
        <span className="whatsapp-panel__icon" aria-hidden="true">
          <img src="/whatsapp.svg" alt="" />
        </span>
        <div className="whatsapp-panel__copy">
          <p>Bize WhatsApp&apos;tan ulaşın</p>
          <span>Online eğitim için mesaj yaz</span>
        </div>
        <span className="whatsapp-panel__button" aria-hidden="true">
          Mesaj Yaz
        </span>
      </a>
    </div>
  );
}
