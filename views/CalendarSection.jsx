/* eslint-disable @next/next/no-img-element */
import Cal from "@/components/cal";

export default function CalendarSection() {
  return (
    <section className="py-12" style={{ background: "#fff" }}>
      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            className="font-bold leading-[120%]"
            style={{
              fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
              color: "#111",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            }}
          >
            Ücretsiz Deneme Dersi
          </h2>
          <p
            className="mt-2 leading-[125%]"
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              color: "#555",
            }}
          >
            Kısa bir online görüşme için sana uygun günü ve saati seç.
          </p>
        </div>

        <Cal />
      </div>
    </section>
  );
}
