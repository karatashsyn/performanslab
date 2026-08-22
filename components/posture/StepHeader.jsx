"use client";

const STEPS = [
  { key: "front", label: "Ön Fotoğraf" },
  { key: "side", label: "Yan Fotoğraf" },
];

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// Sticky under the site navbar (h-16) while the front/side capture steps are
// active, so it's unmistakable that a 2nd photo is expected next — captures
// otherwise read as "the process reset" once the page scrolls past the first
// photo's controls.
export default function StepHeader({ currentStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div
      className="sticky top-16 z-40 -mx-5 sm:-mx-8 mb-6 px-5 pt-4 pb-3 sm:px-8"
      style={{
        background: "rgba(9,10,13,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        {STEPS.map((s, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={s.key} className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                style={{
                  background: done ? "#22C55E" : active ? "#D2000C" : "rgba(255,255,255,0.1)",
                  color: done || active ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {done ? <CheckIcon /> : i + 1}
              </span>
              <span
                className="whitespace-nowrap text-xs font-semibold sm:text-sm"
                style={{
                  fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
                  color: active ? "#fff" : done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)",
                }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        {STEPS.map((s, i) => (
          <div key={s.key} className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: i < currentIndex ? "100%" : i === currentIndex ? "50%" : "0%",
                background: i < currentIndex ? "#22C55E" : "#D2000C",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
