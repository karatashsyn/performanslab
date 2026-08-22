import { DISCLAIMER_TEXT, RESULT_DISCLAIMER_TEXT } from "@/lib/posture/copy";

export default function Disclaimer({ variant = "step", className = "" }) {
  const text = variant === "result" ? RESULT_DISCLAIMER_TEXT : DISCLAIMER_TEXT;
  return (
    <p
      className={`text-xs leading-5 text-white/40 ${className}`}
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      {text}
    </p>
  );
}
