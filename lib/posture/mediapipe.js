// Lazy-loaded MediaPipe Pose Landmarker wrapper. Nothing here is imported
// by the main app bundle — only the /postur-analizi page pulls this in,
// and even then only once the user reaches the camera/upload step.
"use client";

const WASM_BASE = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

let landmarkerPromise = null;

async function getLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const { FilesetResolver, PoseLandmarker } = await import("@mediapipe/tasks-vision");
      const vision = await FilesetResolver.forVisionTasks(WASM_BASE);
      return PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "IMAGE",
        numPoses: 1,
      });
    })();
  }
  return landmarkerPromise;
}

// Warms up the model without waiting on a detection — call on step mount so
// the first capture doesn't pay the full load latency.
export function preloadPoseLandmarker() {
  getLandmarker().catch(() => {
    // swallow — the real detect() call will surface the error to the user
  });
}

// image: HTMLImageElement | HTMLCanvasElement
// Returns { landmarks, personCount } — landmarks is the raw BlazePose array
// ([{x,y,z,visibility}, ...]) for the first detected person, or null.
export async function detectPoseInImage(image) {
  const landmarker = await getLandmarker();
  const result = landmarker.detect(image);
  const personCount = result.landmarks?.length ?? 0;
  return {
    landmarks: personCount > 0 ? result.landmarks[0] : null,
    personCount,
  };
}
