// BlazePose (MediaPipe Pose Landmarker) landmark indices we use.
// https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker
export const LANDMARK_INDEX = {
  nose: 0,
  left_ear: 7,
  right_ear: 8,
  left_shoulder: 11,
  right_shoulder: 12,
  left_elbow: 13,
  right_elbow: 14,
  left_wrist: 15,
  right_wrist: 16,
  left_hip: 23,
  right_hip: 24,
  left_knee: 25,
  right_knee: 26,
  left_ankle: 27,
  right_ankle: 28,
};

// Converts a raw MediaPipe result (array indexed by BlazePose index) into a
// named lookup: { left_shoulder: {x,y,visibility}, ... }
export function namedLandmarks(rawLandmarks) {
  const out = {};
  for (const [name, index] of Object.entries(LANDMARK_INDEX)) {
    const lm = rawLandmarks?.[index];
    out[name] = lm ? { x: lm.x, y: lm.y, visibility: lm.visibility ?? 0 } : null;
  }
  return out;
}

export function isVisible(landmark, threshold = 0.5) {
  return !!landmark && (landmark.visibility ?? 0) >= threshold;
}

export const SKELETON_CONNECTIONS = [
  ["left_shoulder", "right_shoulder"],
  ["left_hip", "right_hip"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
  ["left_ear", "left_shoulder"],
  ["right_ear", "right_shoulder"],
];

export const OVERLAY_POINTS = [
  "nose",
  "left_ear",
  "right_ear",
  "left_shoulder",
  "right_shoulder",
  "left_elbow",
  "right_elbow",
  "left_wrist",
  "right_wrist",
  "left_hip",
  "right_hip",
  "left_knee",
  "right_knee",
  "left_ankle",
  "right_ankle",
];
