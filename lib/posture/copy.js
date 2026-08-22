// Public-facing Turkish copy for the posture demo. Keep clinical language
// (tanı, tedavi, skolyoz, kifoz, hastalık, medikal, klinik…) out of this file.
import { headForwardLabel } from "./thresholds";

export const PHOTO_RULES_TEXT =
  "Ayakta, rahat duruş. Telefon göğüs hizasında. Kameradan 1.5–2 m uzak dur. Baştan ayağa tüm vücut karede olsun. Dar kıyafet daha iyi sonuç verir.";

export const DISCLAIMER_TEXT =
  "Bu bir tıbbi analiz değildir. Fotoğraflar tarayıcında işlenir, sunucuya yüklenmez. Sonuç yalnızca antrenman önceliği için yön verir.";

export const RESULT_DISCLAIMER_TEXT =
  "Bu bir tıbbi analiz veya tanı değildir. Değerler fotoğraftan tahmindir; antrenman önceliği içindir.";

export const PRIVACY_NOTE = "Fotoğrafların tarayıcında işlenir, kaydedilmez.";

export const INSUFFICIENT_MESSAGES = {
  landmarks_low_visibility: "Vücudun net görünmüyor. Daha aydınlık bir ortamda, tüm vücudun kadraja girecek şekilde tekrar dene.",
  too_far: "Kameradan uzaklaş, tüm vücut karede görünsün.",
  no_pose: "Poz tespit edilemedi. Tüm vücudun karede olduğundan emin ol.",
  multiple_people: "Karede tek kişi olsun.",
};

export const METRIC_GRID_ROWS = [
  {
    key: "shoulderTiltDeg",
    label: "Omuz eğimi",
    format: (v) => `${v.toFixed(1)}°`,
  },
  {
    key: "hipTiltDeg",
    label: "Pelvis eğimi",
    format: (v) => `${v.toFixed(1)}°`,
  },
  {
    key: "headForwardRatio",
    label: "İleri baş",
    format: (v) => `${headForwardLabel(v)} · %${Math.round(v * 100)}`,
  },
  {
    key: "spineDeviationRatio",
    label: "Gövde sapması",
    format: (v) => `%${Math.round(v * 100)} sapma`,
  },
  {
    key: "neckTiltDeg",
    label: "Boyun eğimi",
    format: (v) => `${v.toFixed(1)}°`,
  },
  {
    key: "kneeAsymmetryDeg",
    label: "Diz farkı",
    format: (v) => `${v.toFixed(1)}° fark`,
  },
  {
    key: "lumbarLordosisDeg",
    label: "Bel eğriliği (tahmini)",
    format: (v) => `${Math.round(v)}°`,
    requiresSide: true,
  },
];

// One card per FOCUS_THRESHOLDS key (§6).
export const FOCUS_CARDS = {
  shoulder_tilt_deg: {
    id: "shoulder_imbalance",
    metricKey: "shoulderTiltDeg",
    title: "Omuz eğimi",
    format: (v) => `${v.toFixed(1)}°`,
    description:
      "Üst sırt ve omuz duruşunda asimetri eğilimi. Antrenmanda çekme ve göğüs mobilitesi öncelik olabilir.",
  },
  hip_tilt_deg: {
    id: "lumbar_lordosis",
    metricKey: "hipTiltDeg",
    title: "Pelvis ve bel",
    format: (v) => `${Math.round(v)}°`,
    description:
      "Pelvis / bel hizasında duruş eğilimi. Kalça ve core desteği öncelik olabilir.",
  },
  head_forward_ratio: {
    id: "head_forward",
    metricKey: "headForwardRatio",
    title: "İleri baş",
    format: (v) => `${headForwardLabel(v)} · %${Math.round(v * 100)}`,
    description:
      "Başın gövdeye göre önde durma eğilimi. Boyun ve üst sırt desteği faydalı olabilir.",
  },
  spine_deviation_ratio: {
    id: "spine_deviation",
    metricKey: "spineDeviationRatio",
    title: "Gövde sapması",
    format: (v) => `%${Math.round(v * 100)} sapma`,
    description:
      "Omuz-kalça hizasında asimetri eğilimi. Simetrik yük ve yan core desteği faydalı olabilir.",
  },
  knee_asymmetry_deg: {
    id: "knee_asymmetry",
    metricKey: "kneeAsymmetryDeg",
    title: "Diz farkı",
    format: (v) => `${v.toFixed(1)}° fark`,
    description:
      "Diz hizasında asimetri eğilimi. Tek taraflı bacak işi öncelik olabilir.",
  },
  neck_tilt_deg: {
    id: "neck_tilt",
    metricKey: "neckTiltDeg",
    title: "Boyun eğimi",
    format: (v) => `${v.toFixed(1)}°`,
    description:
      "Boyun duruşunda eğilim. Günlük ekran yüksekliği ve boyun mobilitesi faydalı olabilir.",
  },
};

export const BALANCED_POSTURE_CARD = {
  id: "balanced",
  title: "Dengeli duruş",
  description:
    "Ölçülen değerler eşiklerin altında. Mevcut alışkanlıkları korumak ve periyodik kontrol iyi bir sonraki adım.",
};

export const PRIORITY_LABELS = {
  hafif: "hafif",
  oncelikli: "öncelikli",
  yuksek: "yüksek",
};
