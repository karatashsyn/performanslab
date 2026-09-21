import { SCORE_WEIGHTS, FOCUS_THRESHOLDS, scoreBandFor } from "./thresholds";
import { FOCUS_CARDS, BALANCED_POSTURE_CARD } from "./copy";
import { clamp } from "./geometry";

function linearPenalty(value, { ideal, mild, severe, weight }) {
  const delta = Math.abs(value - ideal);
  if (delta <= mild) return 0;
  if (delta >= severe) return weight;
  return (weight * (delta - mild)) / (severe - mild);
}

export function computeScore(metrics) {
  let penalty = 0;
  for (const [key, config] of Object.entries(SCORE_WEIGHTS)) {
    const value = metrics[key];
    if (value == null) continue;
    penalty += linearPenalty(value, config);
  }
  return Math.round(clamp(100 - penalty, 0, 100));
}

function severityFor(value, { mild, medium, severe }) {
  if (value < mild) return null;
  if (value < medium) return "hafif";
  if (value < severe) return "oncelikli";
  return "yuksek";
}

const SEVERITY_RANK = { yuksek: 3, oncelikli: 2, hafif: 1 };

export function computeFocusAreas(metrics, maxCards = 3) {
  const candidates = [];

  for (const [thresholdKey, thresholds] of Object.entries(FOCUS_THRESHOLDS)) {
    const card = FOCUS_CARDS[thresholdKey];
    if (!card) continue;
    const value = metrics[card.metricKey];
    if (value == null) continue;
    const severity = severityFor(value, thresholds);
    if (!severity) continue;
    candidates.push({
      id: card.id,
      title: card.title,
      description: card.description,
      metricValue: card.format(value),
      priority: severity,
      value,
      metricKeySnake: thresholdKey,
      recommendations: card.recommendations || [],
    });
  }

  candidates.sort((a, b) => SEVERITY_RANK[b.priority] - SEVERITY_RANK[a.priority]);

  if (candidates.length === 0) {
    return [{ ...BALANCED_POSTURE_CARD, metricValue: null, priority: null }];
  }

  return candidates.slice(0, maxCards);
}

export function evaluate(metrics) {
  const score = computeScore(metrics);
  const band = scoreBandFor(score);
  const focusAreas = computeFocusAreas(metrics);
  return { score, band, focusAreas };
}
