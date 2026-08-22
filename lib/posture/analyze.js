import { dist, midpoint, tiltAngleDeg, angleBetween3, signedPerpOffset, clamp } from "./geometry";
import { isVisible, namedLandmarks } from "./landmarks";
import { MIN_VISIBILITY, MIN_SIDE_VISIBILITY, MIN_SHOULDER_WIDTH } from "./thresholds";

const FRONT_REQUIRED = ["left_shoulder", "right_shoulder", "left_hip", "right_hip", "left_ear", "right_ear"];

// Angle (deg) of segment a->b measured from vertical (0 = perfectly vertical).
function verticalTiltDeg(a, b) {
  const dx = Math.abs(b.x - a.x);
  const dy = Math.abs(b.y - a.y);
  if (dy < 0.001 && dx < 0.001) return 0;
  return (Math.atan2(dx, dy) * 180) / Math.PI;
}

function kneeAngle(hip, knee, ankle) {
  if (!isVisible(hip, 0.4) || !isVisible(knee, 0.4) || !isVisible(ankle, 0.4)) return 175;
  return angleBetween3(hip, knee, ankle);
}

// Front-facing photo -> insufficiency check + primary metric set.
export function analyzeFront(rawLandmarks) {
  const lm = namedLandmarks(rawLandmarks);

  const missing = FRONT_REQUIRED.filter((name) => !isVisible(lm[name], MIN_VISIBILITY));
  if (missing.length > 0) {
    return { insufficient: true, reason: "landmarks_low_visibility", missing };
  }

  const shoulderWidth = dist(lm.left_shoulder, lm.right_shoulder);
  if (shoulderWidth < MIN_SHOULDER_WIDTH) {
    return { insufficient: true, reason: "too_far" };
  }

  const shoulderMid = midpoint(lm.left_shoulder, lm.right_shoulder);
  const hipMid = midpoint(lm.left_hip, lm.right_hip);
  const earMid = midpoint(lm.left_ear, lm.right_ear);

  const leftKneeAngleDeg = kneeAngle(lm.left_hip, lm.left_knee, lm.left_ankle);
  const rightKneeAngleDeg = kneeAngle(lm.right_hip, lm.right_knee, lm.right_ankle);

  return {
    insufficient: false,
    landmarks: lm,
    shoulderWidth,
    shoulderMid,
    hipMid,
    earMid,
    shoulderTiltDeg: tiltAngleDeg(lm.left_shoulder, lm.right_shoulder),
    hipTiltDeg: tiltAngleDeg(lm.left_hip, lm.right_hip),
    headForwardRatio: Math.abs(earMid.x - shoulderMid.x) / shoulderWidth,
    spineDeviationRatio: Math.abs(shoulderMid.x - hipMid.x) / shoulderWidth,
    neckTiltDeg: tiltAngleDeg(lm.left_ear, lm.right_ear),
    leftKneeAngleDeg,
    rightKneeAngleDeg,
    kneeAsymmetryDeg: Math.abs(leftKneeAngleDeg - rightKneeAngleDeg),
  };
}

// Side photo -> lumbar lordosis estimate + head-forward/neck-tilt refinement.
// Confidence threshold 0.4 (looser than front, side photos are noisier).
export function analyzeSide(rawLandmarks) {
  const lm = namedLandmarks(rawLandmarks);

  const shouldersOk = isVisible(lm.left_shoulder, MIN_SIDE_VISIBILITY) || isVisible(lm.right_shoulder, MIN_SIDE_VISIBILITY);
  const earsOk = isVisible(lm.left_ear, MIN_SIDE_VISIBILITY) || isVisible(lm.right_ear, MIN_SIDE_VISIBILITY);
  const hipsOk = isVisible(lm.left_hip, MIN_SIDE_VISIBILITY) || isVisible(lm.right_hip, MIN_SIDE_VISIBILITY);

  if (!shouldersOk || !earsOk || !hipsOk) {
    return { insufficient: true, reason: "landmarks_low_visibility" };
  }

  // Pick the more visible side for the shoulder/hip/lower chain.
  const leftVis = (lm.left_shoulder?.visibility ?? 0) + (lm.left_hip?.visibility ?? 0) + (lm.left_ear?.visibility ?? 0);
  const rightVis = (lm.right_shoulder?.visibility ?? 0) + (lm.right_hip?.visibility ?? 0) + (lm.right_ear?.visibility ?? 0);
  const side = leftVis >= rightVis ? "left" : "right";
  const shoulder = lm[`${side}_shoulder`];
  const hip = lm[`${side}_hip`];
  const ear = lm[`${side}_ear`];
  const ankle = lm[`${side}_ankle`];
  const knee = lm[`${side}_knee`];

  if (!isVisible(shoulder, MIN_SIDE_VISIBILITY) || !isVisible(hip, MIN_SIDE_VISIBILITY) || !isVisible(ear, MIN_SIDE_VISIBILITY)) {
    return { insufficient: true, reason: "landmarks_low_visibility" };
  }

  const shoulderMid = { x: shoulder.x, y: shoulder.y };
  const earMid = { x: ear.x, y: ear.y };
  const sideShoulderWidth = dist(shoulder, hip) || 0;

  let headForwardRatio = null;
  let neckTiltDeg = null;
  if (sideShoulderWidth > MIN_SHOULDER_WIDTH) {
    headForwardRatio = Math.abs(earMid.x - shoulderMid.x) / sideShoulderWidth;
    const neckDy = Math.abs(earMid.y - shoulderMid.y);
    neckTiltDeg = (Math.atan2(neckDy, sideShoulderWidth) * 180) / Math.PI;
  }

  // Lumbar lordosis estimate (§5.4) — a calibration-grade approximation of
  // the app's shoulder→hip→foot chain, not a clinical measurement.
  let lumbarLordosisDeg = null;
  const lower = isVisible(ankle, MIN_SIDE_VISIBILITY) ? ankle : isVisible(knee, MIN_SIDE_VISIBILITY) ? knee : null;
  if (lower) {
    const hipJointAngle = angleBetween3(shoulder, hip, lower);
    const hipAngleDev = clamp(180 - hipJointAngle, 0, 35);
    const trunkLen = dist(shoulder, hip);
    const offsetRatio = trunkLen > 0.001 ? Math.abs(signedPerpOffset(hip, shoulder, lower)) / trunkLen : 0;
    const upperTilt = verticalTiltDeg(shoulder, hip);
    const lowerTilt = verticalTiltDeg(hip, lower);
    lumbarLordosisDeg = clamp(
      40 + hipAngleDev * 1.35 + offsetRatio * 22 + Math.abs(lowerTilt - upperTilt) * 0.85,
      20,
      70
    );
  }

  return {
    insufficient: false,
    side,
    headForwardRatio,
    neckTiltDeg,
    lumbarLordosisDeg,
  };
}

// Combines a front + side analysis into the final metrics object used by
// the scoring/rules engine.
export function analyzeCombined(frontRaw, sideRaw) {
  const front = analyzeFront(frontRaw);
  if (front.insufficient) {
    return { insufficient: true, angle: "front", reason: front.reason, missing: front.missing };
  }

  const metrics = {
    shoulderTiltDeg: front.shoulderTiltDeg,
    hipTiltDeg: front.hipTiltDeg,
    headForwardRatio: front.headForwardRatio,
    spineDeviationRatio: front.spineDeviationRatio,
    neckTiltDeg: front.neckTiltDeg,
    leftKneeAngleDeg: front.leftKneeAngleDeg,
    rightKneeAngleDeg: front.rightKneeAngleDeg,
    kneeAsymmetryDeg: front.kneeAsymmetryDeg,
    lumbarLordosisDeg: null,
    scapularAsymmetryDeg: 0,
  };

  if (sideRaw) {
    const side = analyzeSide(sideRaw);
    if (side.insufficient) {
      return { insufficient: true, angle: "side", reason: side.reason };
    }
    if (side.headForwardRatio != null) {
      metrics.headForwardRatio = Math.max(metrics.headForwardRatio, side.headForwardRatio);
    }
    if (side.neckTiltDeg != null) {
      metrics.neckTiltDeg = Math.max(metrics.neckTiltDeg, side.neckTiltDeg);
    }
    metrics.lumbarLordosisDeg = side.lumbarLordosisDeg;
  }

  return { insufficient: false, metrics };
}
