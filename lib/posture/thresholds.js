// Default thresholds for the posture scoring + rules engine.
// Ported 1:1 from the app's metric formulas/thresholds (§5.5 / §6 of the plan).
// v1: hardcoded. Later this can be swapped for a remote config fetch.

// Score penalty weights — value is compared to `ideal`; penalty ramps
// linearly from 0 (at `mild` delta) to `weight` (at `severe` delta).
export const SCORE_WEIGHTS = {
  shoulderTiltDeg: { ideal: 0, mild: 3, severe: 10, weight: 25 },
  hipTiltDeg: { ideal: 0, mild: 3, severe: 10, weight: 20 },
  headForwardRatio: { ideal: 0, mild: 0.1, severe: 0.35, weight: 25 },
  spineDeviationRatio: { ideal: 0, mild: 0.05, severe: 0.2, weight: 15 },
  kneeAsymmetryDeg: { ideal: 0, mild: 5, severe: 20, weight: 10 },
  neckTiltDeg: { ideal: 0, mild: 5, severe: 20, weight: 5 },
  lumbarLordosisDeg: { ideal: 40, mild: 5, severe: 15, weight: 15 },
  scapularAsymmetryDeg: { ideal: 0, mild: 3, severe: 12, weight: 8 },
};

// Focus-area severity bands (public-facing "odak alanları" cards).
export const FOCUS_THRESHOLDS = {
  shoulder_tilt_deg: { mild: 3, medium: 6, severe: 10 },
  hip_tilt_deg: { mild: 3, medium: 6, severe: 10 },
  head_forward_ratio: { mild: 0.1, medium: 0.2, severe: 0.35 },
  spine_deviation_ratio: { mild: 0.05, medium: 0.1, severe: 0.2 },
  knee_asymmetry_deg: { mild: 5, medium: 10, severe: 20 },
  neck_tilt_deg: { mild: 5, medium: 10, severe: 20 },
};

export const SCORE_BANDS = [
  { min: 90, label: "Mükemmel", subtitle: "Duruşun genel olarak dengeli görünüyor", color: "#22C55E" },
  { min: 75, label: "İyi", subtitle: "Küçük uyum alanları var", color: "#22C55E" },
  { min: 55, label: "Orta", subtitle: "Birkaç odak alanı öne çıkıyor", color: "#F5A623" },
  { min: 35, label: "Geliştirilmeli", subtitle: "Antrenmanı bu önceliklere göre uyarlamak faydalı olabilir", color: "#EF4444" },
  { min: -Infinity, label: "Dikkat", subtitle: "Bir antrenörle birlikte bakmak iyi bir sonraki adım", color: "#EF4444" },
];

export function scoreBandFor(score) {
  return SCORE_BANDS.find((b) => score >= b.min);
}

export const MIN_VISIBILITY = 0.5;
export const MIN_SIDE_VISIBILITY = 0.4;
export const MIN_SHOULDER_WIDTH = 0.05;

export const HEAD_FORWARD_LABELS = [
  { max: 0.1, label: "Normal" },
  { max: 0.2, label: "Hafif" },
  { max: 0.35, label: "Belirgin" },
  { max: Infinity, label: "Yüksek" },
];

export function headForwardLabel(ratio) {
  return HEAD_FORWARD_LABELS.find((l) => ratio < l.max)?.label ?? "Yüksek";
}
