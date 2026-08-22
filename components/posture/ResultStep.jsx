"use client";
import Link from "next/link";
import { METRIC_GRID_ROWS, PRIORITY_LABELS } from "@/lib/posture/copy";
import Disclaimer from "./Disclaimer";
import { trackCtaClick, trackPostureCtaTrial, trackPostureCtaWaitlist } from "@/lib/analytics";

function ScoreRing({ score, color }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {score}
        </span>
        <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          / 100
        </span>
      </div>
    </div>
  );
}

function priorityPillStyle(priority) {
  if (priority === "yuksek") return { background: "rgba(239,68,68,0.15)", color: "#F87171" };
  if (priority === "oncelikli") return { background: "rgba(245,166,35,0.15)", color: "#F5A623" };
  return { background: "rgba(34,197,94,0.15)", color: "#4ADE80" };
}

export default function ResultStep({ metrics, evaluation, onRestart }) {
  const { score, band, focusAreas } = evaluation;

  return (
    <div className="flex flex-col gap-10">
      {/* A. Score hero */}
      <div className="flex flex-col items-center gap-4 text-center">
        <ScoreRing score={score} color={band.color} />
        <div>
          <p
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            {band.label}
          </p>
          <p className="mt-1 text-sm text-white/50" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {band.subtitle}
          </p>
        </div>
      </div>

      {/* B. Metric grid */}
      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Ölçülen değerler
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {METRIC_GRID_ROWS.filter((row) => !row.requiresSide || metrics[row.key] != null).map((row) => (
            <div key={row.key} className="rounded-[8px] border border-white/10 p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-xs text-white/40" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                {row.label}
              </p>
              <p
                className="mt-1 text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
              >
                {row.format(metrics[row.key])}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C. Focus areas */}
      <div>
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/40"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          Odak alanları
        </p>
        <div className="flex flex-col gap-3">
          {focusAreas.map((f) => (
            <div key={f.id} className="rounded-[10px] border border-white/10 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="flex items-start justify-between gap-3">
                <p
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                >
                  {f.title}
                </p>
                {f.metricValue && (
                  <span
                    className="whitespace-nowrap text-sm font-semibold text-white/80"
                    style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                  >
                    {f.metricValue}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/50" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                {f.description}
              </p>
              {f.priority && (
                <span
                  className="mt-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold"
                  style={{ ...priorityPillStyle(f.priority), fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
                >
                  {PRIORITY_LABELS[f.priority]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* D. CTA */}
      <div className="flex flex-col gap-3">
        <Link
          href="/#takvim"
          onClick={() => {
            trackCtaClick("Ücretsiz Deneme Dersi Al", "postur_analizi_sonuc");
            trackPostureCtaTrial();
          }}
        >
          <button
            className="w-full rounded-[6px] bg-[#D2000C] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Ücretsiz Deneme Dersi Al →
          </button>
        </Link>
        <Link
          href="/uygulamamiz"
          onClick={() => {
            trackCtaClick("Uygulama Çıkınca Haber Ver", "postur_analizi_sonuc");
            trackPostureCtaWaitlist();
          }}
        >
          <button
            className="w-full rounded-[6px] border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
          >
            Uygulama Çıkınca Haber Ver
          </button>
        </Link>
        <button
          onClick={onRestart}
          className="self-center text-xs text-white/40 hover:text-white/70"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Testi tekrar yap
        </button>
      </div>

      <Disclaimer variant="result" />
    </div>
  );
}
