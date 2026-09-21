// Maps the app's local (camelCase) metrics/evaluation shape to the
// POST /api/posture/analyses request body. Field/enum constraints below were
// confirmed against the live API's validation errors, not just the docs:
// - every metrics.* key is required (no omitting nulls)
// - risk_profiles/issues must each have at least 1 item
// - risk_profile is a closed enum: shoulder_imbalance, hip_tilt, knee_asymmetry,
//   head_forward, neck_tilt, spine_deviation, lower_back, lumbar_lordosis,
//   scapular_asymmetry
import { SCORE_WEIGHTS } from "./thresholds";
import { BALANCED_POSTURE_CARD } from "./copy";

const METRIC_KEY_MAP = {
  shoulderTiltDeg: "shoulder_tilt_deg",
  hipTiltDeg: "hip_tilt_deg",
  headForwardRatio: "head_forward_ratio",
  spineDeviationRatio: "spine_deviation_ratio",
  kneeAsymmetryDeg: "knee_asymmetry_deg",
  neckTiltDeg: "neck_tilt_deg",
  lumbarLordosisDeg: "lumbar_lordosis_deg",
  scapularAsymmetryDeg: "scapular_asymmetry_deg",
  leftKneeAngleDeg: "left_knee_angle_deg",
  rightKneeAngleDeg: "right_knee_angle_deg",
};

const SEVERITY_MAP = { hafif: "low", oncelikli: "medium", yuksek: "high" };

// Local focus-card ids (lib/posture/copy.js FOCUS_CARDS) -> the API's
// risk_profile enum. Kept separate from the UI-facing id (used as a React
// key and analytics tag) so that stays stable regardless of backend naming.
const RISK_PROFILE_MAP = {
  shoulder_imbalance: "shoulder_imbalance",
  lumbar_lordosis: "hip_tilt",
  head_forward: "head_forward",
  spine_deviation: "spine_deviation",
  knee_asymmetry: "knee_asymmetry",
  neck_tilt: "neck_tilt",
};

function buildMetrics(metrics) {
  const out = {};
  for (const [camelKey, snakeKey] of Object.entries(METRIC_KEY_MAP)) {
    const value = metrics[camelKey];
    // lumbar_lordosis_deg is required by the API but can be null locally
    // (side photo didn't show enough of the lower body) — fall back to the
    // scoring engine's "ideal" value, i.e. the same as "no penalty" locally.
    out[snakeKey] = value != null && Number.isFinite(value) ? value : SCORE_WEIGHTS[camelKey]?.ideal ?? 0;
  }
  return out;
}

// focusAreas from lib/posture/rules.js evaluate(); the "balanced" card (no
// measurable risk) carries no metricKeySnake/priority. The API requires at
// least one issue/risk_profile per analysis, so a balanced result is reported
// as a single low-severity issue instead of being sent as empty arrays.
function buildIssues(focusAreas, metrics) {
  const real = focusAreas.filter((f) => f.metricKeySnake && f.priority);
  if (real.length > 0) {
    return real.map((f) => ({
      title: f.title,
      description: f.description,
      severity: SEVERITY_MAP[f.priority] || "medium",
      risk_profile: RISK_PROFILE_MAP[f.id] || "shoulder_imbalance",
      metric_key: f.metricKeySnake,
      metric_value: f.metricValue,
      recommendations: f.recommendations || [],
    }));
  }

  return [
    {
      title: BALANCED_POSTURE_CARD.title,
      description: BALANCED_POSTURE_CARD.description,
      severity: "low",
      risk_profile: "shoulder_imbalance",
      metric_key: "shoulder_tilt_deg",
      metric_value: `${metrics.shoulderTiltDeg.toFixed(1)}°`,
      recommendations: [],
    },
  ];
}

export function buildAnalysisPayload(metrics, evaluation, photoViews) {
  const issues = buildIssues(evaluation.focusAreas, metrics);
  return {
    posture_score: evaluation.score,
    risk_profiles: issues.map((issue) => issue.risk_profile),
    issues,
    metrics: buildMetrics(metrics),
    photo_views: photoViews,
  };
}
