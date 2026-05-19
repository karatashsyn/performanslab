"use client";
import { useEffect } from "react";

export default function Calendly() {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/performanskurek/30min?text_color=3a3a3a&primary_color=d2000c"
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}
