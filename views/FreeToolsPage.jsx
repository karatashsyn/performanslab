"use client";

import { useMemo, useState } from "react";

const tools = [
  { id: "tdee", label: "TDEE / Kalori" },
  { id: "training", label: "Antrenman Testi" },
  { id: "bodyfat", label: "Vücut Yağ %" },
  { id: "bmi", label: "BMI" },
];

const quizSteps = [
  {
    question: "Temel hedefin nedir?",
    sub: "En önemli hedefini seç",
    options: [
      [
        "performans",
        "⚡",
        "Atletik Performans",
        "Güç, hız, dayanıklılık geliştirme",
      ],
      [
        "estetik",
        "💪",
        "Vücut Kompozisyonu",
        "Kas kaz, yağ yak, estetik görünüm",
      ],
      ["saglik", "❤️", "Genel Sağlık", "Aktif yaşam, enerji, uzun ömür"],
      [
        "postur",
        "🧘",
        "Postür & Rehabilitasyon",
        "Ağrı, düzeltici egzersiz, denge",
      ],
    ],
  },
  {
    question: "Spor geçmişin nasıl?",
    sub: "Dürüst olmak daha iyi bir program demek",
    options: [
      ["yeni", "🌱", "Yeni başlıyorum", "Hiç düzenli antrenman yapmadım"],
      ["orta", "📈", "Orta seviye", "1-3 yıl düzenli antrenman"],
      [
        "ileri",
        "🏆",
        "İleri seviye / Sporcu",
        "3+ yıl veya aktif sporcu geçmişi",
      ],
    ],
  },
  {
    question: "Haftada kaç gün ayırabilirsin?",
    sub: "Gerçekçi bir sayı seç",
    options: [
      ["12", "1-2", "1-2 gün", "Yoğun iş / aile hayatı"],
      ["34", "3-4", "3-4 gün", "Dengeli, sürdürülebilir"],
      ["56", "5+", "5-6 gün", "Yüksek motivasyon, ciddi hedef"],
    ],
  },
  {
    question: "Herhangi bir ağrın veya kısıtın var mı?",
    sub: "Güvenli bir program için önemli",
    options: [
      [
        "yok",
        "✅",
        "Hayır, sağlıklıyım",
        "Herhangi bir ağrı veya yaralanma yok",
      ],
      ["hafif", "⚠️", "Hafif rahatsızlık", "Bel, diz veya omuz ağrısı var"],
      [
        "agir",
        "🏥",
        "Yaralanma / geçmiş cerrahi",
        "Doktor onaylı egzersiz gerekiyor",
      ],
    ],
  },
  {
    question: "Antrenman ortamın nedir?",
    sub: "Nerede antrenman yapmayı planlıyorsun?",
    options: [
      ["spor", "🏋️", "Spor salonu", "Tüm ekipmanlara erişim var"],
      ["ev", "🏠", "Ev / açık alan", "Sınırlı ekipman"],
      ["bazi", "🎒", "Bazen salon, bazen ev", "Esnek program gerekiyor"],
    ],
  },
];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-[#888]">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      type="number"
      className="w-full rounded-[6px] border border-[#2e2e2e] bg-[#2e2e2e] px-3.5 py-2.5 text-[15px] text-[#f5f3ef] outline-none transition-colors focus:border-[#D2000C]"
    />
  );
}

function Segment({ options, value, onChange }) {
  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className="flex-1 rounded-[6px] border px-2 py-2.5 text-center text-[13px] font-medium transition"
          style={{
            background: value === option.value ? "#D2000C" : "#2e2e2e",
            borderColor: value === option.value ? "#D2000C" : "#2e2e2e",
            color: value === option.value ? "#f5f3ef" : "#888",
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function FormCard({ icon, title, children }) {
  return (
    <div className="rounded-[20px] border border-[#2e2e2e] bg-[#1a1a1a] p-8">
      <div className="mb-6 flex items-center gap-2.5 font-montserrat text-xl font-bold tracking-[-0.02em] text-[#f5f3ef]">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#D2000C] text-base">
          {icon}
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}

function EmptyState({ icon, children }) {
  return (
    <div className="rounded-[20px] border border-dashed border-[#2e2e2e] bg-[#1a1a1a] px-7 py-12 text-center">
      <div className="mb-3 text-4xl">{icon}</div>
      <p className="text-sm leading-6 text-[#555]">{children}</p>
    </div>
  );
}

function ResultCard({ children }) {
  return (
    <div className="animate-fade-in rounded-[20px] border border-[#2e2e2e] bg-[#1a1a1a] p-7">
      {children}
    </div>
  );
}

function StatBox({ label, value, unit, red }) {
  return (
    <div className="rounded-xl bg-[#2e2e2e] p-3.5 text-center">
      <div className="mb-1 text-[11px] uppercase tracking-[0.08em] text-[#888]">
        {label}
      </div>
      <div
        className="font-montserrat text-[22px] font-bold tracking-[-0.02em]"
        style={{ color: red ? "#D2000C" : "#f5f3ef" }}
      >
        {value}
      </div>
      <div className="text-xs text-[#888]">{unit}</div>
    </div>
  );
}

function CtaCard({ children }) {
  return (
    <a
      href="/iletisim"
      className="animate-fade-in mt-4 flex items-center justify-between gap-5 rounded-[20px] bg-[#D2000C] p-7 no-underline transition-colors hover:bg-[#a50009]"
    >
      <div>{children}</div>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl text-white">
        →
      </span>
    </a>
  );
}

function TdeeTool() {
  const [form, setForm] = useState({
    gender: "erkek",
    age: "",
    height: "",
    weight: "",
    activity: "1.55",
    goal: "koru",
  });
  const [result, setResult] = useState(null);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function calculate() {
    const age = Number(form.age);
    const h = Number(form.height);
    const w = Number(form.weight);
    if (!age || !h || !w) return;

    const bmr =
      form.gender === "erkek"
        ? 10 * w + 6.25 * h - 5 * age + 5
        : 10 * w + 6.25 * h - 5 * age - 161;
    const tdee = Math.round(bmr * Number(form.activity));
    const target =
      form.goal === "yak" ? tdee - 500 : form.goal === "al" ? tdee + 300 : tdee;
    const label =
      form.goal === "yak"
        ? "Yağ yakma hedefi (-500 kcal açık)"
        : form.goal === "al"
          ? "Kas kazanımı (+300 kcal fazla)"
          : "İdame - kilo koru";

    setResult({
      tdee,
      target,
      label,
      protein: Math.round(w * 2),
      fat: Math.round((target * 0.25) / 9),
      gauge: Math.min(Math.round((tdee - 1200) / 28), 100),
    });
  }

  return (
    <ToolLayout
      form={
        <FormCard icon="🔥" title="Günlük Kalori İhtiyacın">
          <div className="space-y-5">
            <Field label="Cinsiyet">
              <Segment
                value={form.gender}
                onChange={(value) => set("gender", value)}
                options={[
                  { value: "erkek", label: "Erkek" },
                  { value: "kadin", label: "Kadın" },
                ]}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Yaş">
                <Input
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                  placeholder="28"
                />
              </Field>
              <Field label="Boy (cm)">
                <Input
                  value={form.height}
                  onChange={(e) => set("height", e.target.value)}
                  placeholder="178"
                />
              </Field>
            </div>
            <Field label="Kilo (kg)">
              <Input
                value={form.weight}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="82"
              />
            </Field>
            <Field label="Aktivite Seviyesi">
              <select
                value={form.activity}
                onChange={(e) => set("activity", e.target.value)}
                className="w-full rounded-[6px] border border-[#2e2e2e] bg-[#2e2e2e] px-3.5 py-2.5 text-[15px] text-[#f5f3ef] outline-none focus:border-[#D2000C]"
              >
                <option value="1.2">Hareketsiz (masa başı iş)</option>
                <option value="1.375">Hafif aktif (haftada 1-3 gün)</option>
                <option value="1.55">Orta aktif (haftada 3-5 gün)</option>
                <option value="1.725">Çok aktif (haftada 6-7 gün)</option>
                <option value="1.9">Ekstra aktif (sporcu/fiziksel iş)</option>
              </select>
            </Field>
            <Field label="Hedef">
              <Segment
                value={form.goal}
                onChange={(value) => set("goal", value)}
                options={[
                  { value: "yak", label: "Yağ Yak" },
                  { value: "koru", label: "Koru" },
                  { value: "al", label: "Kas Al" },
                ]}
              />
            </Field>
            <button
              onClick={calculate}
              className="w-full rounded-xl bg-[#D2000C] p-3.5 font-montserrat text-[15px] font-bold text-white transition hover:bg-[#a50009]"
            >
              Hesapla →
            </button>
          </div>
        </FormCard>
      }
      result={
        result ? (
          <>
            <ResultCard>
              <SmallLabel>Günlük TDEE</SmallLabel>
              <BigResult value={result.tdee} unit="kcal" />
              <p className="mt-1 text-[13px] text-[#888]">{result.label}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatBox label="Protein" value={result.protein} unit="gram" />
                <StatBox
                  label="Hedef Kalori"
                  value={result.target}
                  unit="kcal"
                  red
                />
                <StatBox label="Yağ" value={result.fat} unit="gram" />
              </div>
              <Gauge value={result.gauge} />
            </ResultCard>
            <CtaCard>
              <div className="font-montserrat font-bold text-white">
                Kişisel beslenme planı al
              </div>
              <div className="mt-0.5 text-[13px] text-white/70">
                Fatih Özkan ile ücretsiz ön görüşme
              </div>
            </CtaCard>
          </>
        ) : (
          <EmptyState icon="📊">
            Bilgilerini gir ve
            <br />
            günlük kalori ihtiyacını öğren.
          </EmptyState>
        )
      }
    />
  );
}

function BodyFatTool() {
  const [form, setForm] = useState({
    gender: "erkek",
    height: "",
    weight: "",
    waist: "",
    neck: "",
    hip: "",
  });
  const [result, setResult] = useState(null);

  function set(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function calculate() {
    const h = Number(form.height);
    const w = Number(form.weight);
    const waist = Number(form.waist);
    const neck = Number(form.neck);
    const hip = Number(form.hip);
    if (
      !h ||
      !w ||
      !waist ||
      !neck ||
      waist <= neck ||
      (form.gender === "kadin" && !hip)
    )
      return;

    const denominator =
      form.gender === "erkek"
        ? 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)
        : 1.29579 -
          0.35004 * Math.log10(waist + hip - neck) +
          0.221 * Math.log10(h);
    const bf = Math.max(3, Math.round((495 / denominator - 450) * 10) / 10);
    const fatKg = Math.round(((w * bf) / 100) * 10) / 10;
    const leanKg = Math.round((w - fatKg) * 10) / 10;
    const male = form.gender === "erkek";
    const fit = male ? bf < 14 : bf < 21;
    const acceptable = male ? bf < 21 : bf < 28;
    const category = fit
      ? "Fit / Atletik"
      : acceptable
        ? "Kabul edilebilir"
        : "Fazla yağlı";

    setResult({
      bf,
      fatKg,
      leanKg,
      category,
      target: male ? "10-15" : "18-25",
      gauge: fit ? 30 : acceptable ? 55 : 82,
      cta: fit
        ? "Performansını bir üst seviyeye taşı"
        : acceptable
          ? "Kompozisyon programı için Fatih ile görüş"
          : "Yağ yakma programı için hemen başla",
    });
  }

  return (
    <ToolLayout
      form={
        <FormCard icon="📐" title="Vücut Yağ Oranı">
          <div className="space-y-5">
            <Field label="Cinsiyet">
              <Segment
                value={form.gender}
                onChange={(value) => set("gender", value)}
                options={[
                  { value: "erkek", label: "Erkek" },
                  { value: "kadin", label: "Kadın" },
                ]}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Boy (cm)">
                <Input
                  value={form.height}
                  onChange={(e) => set("height", e.target.value)}
                  placeholder="178"
                />
              </Field>
              <Field label="Kilo (kg)">
                <Input
                  value={form.weight}
                  onChange={(e) => set("weight", e.target.value)}
                  placeholder="82"
                />
              </Field>
            </div>
            <Field label="Bel Çevresi (cm) - göbek hizası">
              <Input
                value={form.waist}
                onChange={(e) => set("waist", e.target.value)}
                placeholder="88"
              />
            </Field>
            <Field label="Boyun Çevresi (cm)">
              <Input
                value={form.neck}
                onChange={(e) => set("neck", e.target.value)}
                placeholder="38"
              />
            </Field>
            {form.gender === "kadin" && (
              <Field label="Kalça Çevresi (cm) - en geniş nokta">
                <Input
                  value={form.hip}
                  onChange={(e) => set("hip", e.target.value)}
                  placeholder="98"
                />
              </Field>
            )}
            <button
              onClick={calculate}
              className="w-full rounded-xl bg-[#D2000C] p-3.5 font-montserrat text-[15px] font-bold text-white transition hover:bg-[#a50009]"
            >
              Hesapla →
            </button>
          </div>
        </FormCard>
      }
      result={
        result ? (
          <>
            <ResultCard>
              <SmallLabel>Vücut Yağ Oranı</SmallLabel>
              <BigResult value={result.bf} unit="%" />
              <p className="mt-1 text-[13px] text-[#888]">{result.category}</p>
              <Gauge value={result.gauge} />
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatBox label="Yağsız kütle" value={result.leanKg} unit="kg" />
                <StatBox
                  label="Yağ kütlesi"
                  value={result.fatKg}
                  unit="kg"
                  red
                />
                <StatBox label="Hedef aralık" value={result.target} unit="%" />
              </div>
            </ResultCard>
            <CtaCard>
              <div className="font-montserrat font-bold text-white">
                {result.cta}
              </div>
              <div className="mt-0.5 text-[13px] text-white/70">
                Fatih Özkan ile randevu al
              </div>
            </CtaCard>
          </>
        ) : (
          <EmptyState icon="📐">
            Ölçülerini gir ve
            <br />
            vücut yağ oranını öğren.
          </EmptyState>
        )
      }
    />
  );
}

function BmiTool() {
  const [form, setForm] = useState({ height: "", weight: "", age: "" });
  const result = useMemo(() => {
    const h = Number(form.height) / 100;
    const w = Number(form.weight);
    if (!h || !w || h < 0.5) return null;
    const bmi = Math.round((w / (h * h)) * 10) / 10;
    const category =
      bmi < 18.5
        ? "Zayıf"
        : bmi < 25
          ? "Normal"
          : bmi < 30
            ? "Fazla kilolu"
            : "Obez";
    const idealMin = Math.round(18.5 * h * h);
    const idealMax = Math.round(24.9 * h * h);
    const idealMid = Math.round((idealMin + idealMax) / 2);
    const diff = Math.round((w - idealMid) * 10) / 10;
    const gauge =
      bmi < 18.5
        ? Math.round((bmi / 18.5) * 22)
        : bmi < 25
          ? Math.round(22 + ((bmi - 18.5) / 6.5) * 26)
          : bmi < 30
            ? Math.round(48 + ((bmi - 25) / 5) * 26)
            : Math.min(96, Math.round(74 + ((bmi - 30) / 10) * 22));
    return {
      bmi,
      category,
      ideal: `${idealMin}-${idealMax}`,
      diff: `${diff > 0 ? "+" : ""}${diff}`,
      gauge,
    };
  }, [form]);

  return (
    <ToolLayout
      form={
        <FormCard icon="⚖️" title="Vücut Kitle İndeksi (BMI)">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Boy (cm)">
                <Input
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  placeholder="178"
                />
              </Field>
              <Field label="Kilo (kg)">
                <Input
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="82"
                />
              </Field>
            </div>
            <Field label="Yaş">
              <Input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="28"
              />
            </Field>
            <div className="rounded-xl bg-[#2e2e2e] p-3.5 text-xs leading-5 text-[#888]">
              <strong className="text-[#bbb]">BMI'nın sınırlılıkları:</strong>
              <br />
              BMI, kas kütlesini dikkate almaz. Daha doğru analiz için vücut yağ
              oranı testini kullan.
            </div>
          </div>
        </FormCard>
      }
      result={
        result ? (
          <>
            <ResultCard>
              <SmallLabel>BMI Skoru</SmallLabel>
              <div className="font-montserrat text-5xl font-extrabold leading-none tracking-[-0.04em] text-[#f5f3ef]">
                {result.bmi}
              </div>
              <p className="mt-1 text-[13px] text-[#888]">{result.category}</p>
              <Gauge value={result.gauge} />
              <div className="mt-5 grid grid-cols-3 gap-3">
                <StatBox label="İdeal kilo" value={result.ideal} unit="kg" />
                <StatBox label="Sapma" value={result.diff} unit="kg" red />
                <StatBox label="Kategori" value={result.category} unit=" " />
              </div>
            </ResultCard>
            <CtaCard>
              <div className="font-montserrat font-bold text-white">
                {result.bmi >= 25
                  ? "TDEE hesaplayıcı ile kalori planı yap"
                  : "Antrenman testini dene"}
              </div>
              <div className="mt-0.5 text-[13px] text-white/70">
                Ücretsiz, bilimsel, 2 dakika
              </div>
            </CtaCard>
          </>
        ) : (
          <EmptyState icon="⚖️">
            Boy ve kilonu gir,
            <br />
            BMI'ını anlık hesapla.
          </EmptyState>
        )
      }
    />
  );
}

function TrainingTool() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const result = useMemo(() => {
    const goal = answers[0];
    const level = answers[1];
    const injury = answers[3];
    if (injury === "agir" || goal === "postur") {
      return {
        type: "Düzeltici Egzersiz",
        title: "Postür & Rehabilitasyon Programı",
        desc: "Mevcut ağrı veya postür problemleri için bilimsel, kişiselleştirilmiş düzeltici egzersiz protokolü.",
        feats: [
          "Postür analizi ve düzeltme",
          "Ağrı yönetimi protokolü",
          "Fonksiyonel hareket değerlendirmesi",
          "Haftada 2-3 seans",
        ],
      };
    }
    if (goal === "performans" || level === "ileri") {
      return {
        type: "Atletik Antrenman",
        title: "Atletik Performans Programı",
        desc: "Güç, hız, çeviklik ve spor spesifik kondisyon geliştirmek için periodize antrenman sistemi.",
        feats: [
          "VO2 max ve güç testleri",
          "Spor spesifik kondisyon",
          "Periodizasyon planlaması",
          "Performans takibi",
        ],
      };
    }
    if (goal === "estetik") {
      return {
        type: "Fonksiyonel Antrenman",
        title: "Vücut Kompozisyon Programı",
        desc: "Kas kütlesi kazanımı ve yağ azaltımı için entegre antrenman ve beslenme yaklaşımı.",
        feats: [
          "Direnç + kardio programlama",
          "Beslenme entegrasyonu",
          "Vücut kompozisyon takibi",
          "Program güncellemesi",
        ],
      };
    }
    return {
      type: "Fonksiyonel Antrenman",
      title: "Fonksiyonel Sağlık Programı",
      desc: "Günlük yaşam kalitesini yükseltmek, enerji seviyesini artırmak ve uzun vadeli sağlığı korumak için bütünsel hareket yaklaşımı.",
      feats: [
        "Temel hareket patternleri",
        "Esneklik ve mobilite",
        "Cardiovascular sağlık",
        "Sürdürülebilir alışkanlıklar",
      ],
    };
  }, [answers]);

  const current = quizSteps[step];

  return (
    <ToolLayout
      form={
        <FormCard icon="🎯" title="Hangi Antrenman Sana Uygun?">
          {!done && (
            <>
              <div className="mb-7 flex gap-1">
                {quizSteps.map((_, i) => (
                  <span
                    key={i}
                    className="h-[3px] flex-1 rounded-sm"
                    style={{ background: i <= step ? "#D2000C" : "#2e2e2e" }}
                  />
                ))}
              </div>
              <h2 className="font-montserrat text-[22px] font-bold tracking-[-0.02em] text-[#f5f3ef]">
                {current.question}
              </h2>
              <p className="mb-6 text-sm font-light text-[#888]">
                {current.sub}
              </p>
              <div className="space-y-2.5">
                {current.options.map(([value, icon, title, sub]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setAnswers((existing) => ({ ...existing, [step]: value }))
                    }
                    className="flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition hover:translate-x-1"
                    style={{
                      background:
                        answers[step] === value
                          ? "rgba(210,0,12,0.12)"
                          : "#2e2e2e",
                      borderColor:
                        answers[step] === value ? "#D2000C" : "#2e2e2e",
                    }}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#1a1a1a] text-sm">
                      {icon}
                    </span>
                    <span>
                      <strong className="block text-sm font-medium text-[#f5f3ef]">
                        {title}
                      </strong>
                      <small className="text-xs text-[#888]">{sub}</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="rounded-xl border border-[#2e2e2e] px-5 py-3 text-sm text-[#888]"
                  >
                    ← Geri
                  </button>
                )}
                <button
                  disabled={!answers[step]}
                  onClick={() =>
                    step === quizSteps.length - 1
                      ? setDone(true)
                      : setStep(step + 1)
                  }
                  className="flex-1 rounded-xl bg-[#D2000C] px-5 py-3 font-montserrat text-sm font-bold text-white disabled:opacity-40"
                >
                  {step === quizSteps.length - 1 ? "Sonucu Gör →" : "Devam →"}
                </button>
              </div>
            </>
          )}
          {done && (
            <button
              onClick={() => {
                setAnswers({});
                setStep(0);
                setDone(false);
              }}
              className="w-full rounded-xl border border-[#2e2e2e] p-3 text-sm text-[#888]"
            >
              ← Testi yeniden başlat
            </button>
          )}
        </FormCard>
      }
      result={
        done ? (
          <ResultCard>
            <span className="mb-4 inline-flex rounded-full border border-[#D2000C]/30 bg-[#D2000C]/15 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.05em] text-[#D2000C]">
              {result.type}
            </span>
            <h2 className="font-montserrat text-[28px] font-extrabold tracking-[-0.03em] text-[#f5f3ef]">
              {result.title}
            </h2>
            <p className="my-5 text-sm font-light leading-6 text-[#888]">
              {result.desc}
            </p>
            <div className="space-y-2">
              {result.feats.map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2.5 text-sm text-[#bbb]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D2000C]" />
                  {feat}
                </div>
              ))}
            </div>
            <CtaCard>
              <div className="font-montserrat font-bold text-white">
                Fatih ile görüşmeye başla
              </div>
              <div className="mt-0.5 text-[13px] text-white/70">
                Instagram'dan randevu al
              </div>
            </CtaCard>
          </ResultCard>
        ) : (
          <EmptyState icon="🎯">
            5 soruyu yanıtla ve
            <br />
            sana en uygun antrenman tipini öğren.
          </EmptyState>
        )
      }
    />
  );
}

function ToolLayout({ form, result }) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[420px_1fr]">
      {form}
      <div className="flex flex-col gap-4">{result}</div>
    </div>
  );
}

function SmallLabel({ children }) {
  return (
    <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#888]">
      {children}
    </div>
  );
}

function BigResult({ value, unit }) {
  return (
    <div className="font-montserrat text-5xl font-extrabold leading-none tracking-[-0.04em] text-[#f5f3ef]">
      {value} <span className="text-xl font-medium text-[#888]">{unit}</span>
    </div>
  );
}

function Gauge({ value }) {
  return (
    <>
      <div className="mt-5 h-2 overflow-hidden rounded bg-[#2e2e2e]">
        <div
          className="h-full rounded bg-[#D2000C] transition-all duration-700"
          style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] uppercase tracking-[0.08em] text-[#888]">
        <span>Düşük</span>
        <span>Orta</span>
        <span>Yüksek</span>
      </div>
    </>
  );
}

export default function FreeToolsPage() {
  const [active, setActive] = useState("tdee");

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16 text-[#f5f3ef]">
      <section className="mx-auto max-w-[1100px] px-8 pb-4 pt-8 max-md:px-5">
        <h1 className="max-w-[620px] text-4xl font-montserrat font-extrabold leading-[1.05] tracking-[-0.03em] text-[#f5f3ef]">
          Kendinizi{" "}
          <em className="not-italic text-[#D2000C] text-[1em]">tanıyın,</em>
          <br />
          daha iyi antrenman yapın
        </h1>
      </section>

      <nav className="mx-auto flex max-w-[1100px] gap-1 overflow-x-auto border-b border-[#2e2e2e] px-8 max-md:px-5 overflow-y-hidden">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActive(tool.id)}
            className="mb-[-1px] flex items-center gap-2 whitespace-nowrap border-b-2 px-6 py-3.5 font-montserrat text-[13px] font-semibold transition"
            style={{
              borderColor: active === tool.id ? "#D2000C" : "transparent",
              color: active === tool.id ? "#f5f3ef" : "#888",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: active === tool.id ? "#D2000C" : "#2e2e2e" }}
            />
            {tool.label}
          </button>
        ))}
      </nav>

      <section className="mx-auto max-w-[1100px] px-8 py-12 max-md:px-5">
        {active === "tdee" && <TdeeTool />}
        {active === "training" && <TrainingTool />}
        {active === "bodyfat" && <BodyFatTool />}
        {active === "bmi" && <BmiTool />}
      </section>
    </main>
  );
}
