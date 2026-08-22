function Bar({ w }) {
  return <div className="h-3 rounded-full bg-white/10 animate-pulse" style={{ width: w }} />;
}

export default function AnalyzingStep() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="h-28 w-28 rounded-full border-4 border-white/10 border-t-[#D2000C] animate-spin" />
        <p
          className="text-sm text-white/50"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          Postürün analiz ediliyor…
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-[8px] border border-white/10 p-4">
            <Bar w="60%" />
            <Bar w="40%" />
          </div>
        ))}
      </div>
    </div>
  );
}
