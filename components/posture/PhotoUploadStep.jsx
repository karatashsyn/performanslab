"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { detectPoseInImage, preloadPoseLandmarker } from "@/lib/posture/mediapipe";
import { analyzeFront, analyzeSide } from "@/lib/posture/analyze";
import { INSUFFICIENT_MESSAGES } from "@/lib/posture/copy";
import {
  trackPostureCameraOpen,
  trackPostureCameraDenied,
  trackPostureCapture,
  trackPostureAngleResult,
} from "@/lib/analytics";
import SkeletonOverlay from "./SkeletonOverlay";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

function CameraIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  );
}

function FlipIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 2.1l4 4-4 4" />
      <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8" />
      <path d="M7 21.9l-4-4 4-4" />
      <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
    </svg>
  );
}

// angle: 'front' | 'side'
export default function PhotoUploadStep({ angle, title, hint, onConfirm, onBack }) {
  const [phase, setPhase] = useState("idle"); // idle | camera | detecting | review
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(null);
  const [captured, setCaptured] = useState(null); // { url, source, landmarks, aspect }
  const [insufficient, setInsufficient] = useState(null); // { reason }
  const [detecting, setDetecting] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  useEffect(() => {
    preloadPoseLandmarker();
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => stopStream, [stopStream]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  async function openCamera(mode = facingMode) {
    setCameraError(null);
    stopStream();

    if (typeof window !== "undefined" && !window.isSecureContext) {
      setCameraError(
        "Kamera yalnızca https:// veya http://localhost üzerinden çalışır. Bu sayfayı https ile aç ya da galeriden yükle."
      );
      trackPostureCameraDenied(angle);
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Bu tarayıcı kamerayı desteklemiyor. Galeriden yükleyebilirsin.");
      trackPostureCameraDenied(angle);
      return;
    }

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: mode } },
          audio: false,
        });
      } catch (err) {
        // Some browsers throw OverconstrainedError even for an `ideal` (non-mandatory)
        // constraint when there's a single camera — retry with no facingMode hint.
        if (err?.name === "OverconstrainedError") {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        } else {
          throw err;
        }
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setPhase("camera");
      trackPostureCameraOpen(angle);
    } catch (err) {
      console.error("posture demo camera error:", err);
      const messages = {
        NotAllowedError: "Kamera izni reddedildi. Galeriden yükleyebilirsin.",
        NotFoundError: "Kamera bulunamadı. Galeriden yükleyebilirsin.",
        NotReadableError: "Kamera başka bir uygulama tarafından kullanılıyor olabilir. Galeriden yükleyebilirsin.",
      };
      setCameraError(messages[err?.name] || "Kameraya erişilemedi. Galeriden yükleyebilirsin.");
      trackPostureCameraDenied(angle);
    }
  }

  function flipCamera() {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    openCamera(next);
  }

  async function runDetection(imageSource, dataUrl, source, aspect) {
    setDetecting(true);
    setPhase("detecting");
    try {
      const { landmarks, personCount } = await detectPoseInImage(imageSource);
      if (personCount === 0 || !landmarks) {
        setInsufficient({ reason: "no_pose" });
        setCaptured({ url: dataUrl, source, landmarks: null, aspect });
        trackPostureAngleResult(angle, false, "no_pose");
      } else {
        const analysis = angle === "front" ? analyzeFront(landmarks) : analyzeSide(landmarks);
        if (analysis.insufficient) {
          setInsufficient({ reason: analysis.reason });
          setCaptured({ url: dataUrl, source, landmarks, aspect });
          trackPostureAngleResult(angle, false, analysis.reason);
        } else {
          setInsufficient(null);
          setCaptured({ url: dataUrl, source, landmarks, aspect });
          trackPostureAngleResult(angle, true);
        }
      }
    } catch (err) {
      setInsufficient({ reason: "no_pose" });
      setCaptured({ url: dataUrl, source, landmarks: null, aspect });
    } finally {
      setDetecting(false);
      setPhase("review");
    }
  }

  function captureStill() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    stopStream();
    trackPostureCapture(angle, "camera");
    runDetection(canvas, dataUrl, "camera", canvas.width / canvas.height);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setCameraError("Dosya çok büyük (max 10MB). Daha küçük bir fotoğraf seç.");
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    const img = new Image();
    img.onload = () => {
      trackPostureCapture(angle, "upload");
      runDetection(img, url, "upload", img.naturalWidth / img.naturalHeight);
    };
    img.onerror = () => {
      setCameraError("Bu dosya açılamadı. JPEG veya PNG formatında bir fotoğraf dene.");
    };
    img.src = url;
  }

  function retake() {
    setCaptured(null);
    setInsufficient(null);
    setPhase("idle");
  }

  function confirm() {
    if (!captured?.landmarks || insufficient) return;
    onConfirm({ landmarks: captured.landmarks, previewUrl: captured.url });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2
          className="text-xl sm:text-2xl font-bold text-white"
          style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
        >
          {title}
        </h2>
        <p className="mt-1 text-sm text-white/50" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          {hint}
        </p>
      </div>

      {phase === "idle" && (
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center justify-center rounded-[10px] border border-dashed border-white/15 aspect-[3/4] max-h-[420px]"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex flex-col items-center gap-2 text-white/30">
              <CameraIcon />
              <span className="text-xs" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Fotoğraf bekleniyor
              </span>
            </div>
          </div>

          {cameraError && (
            <p className="text-xs text-amber-400" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {cameraError}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openCamera()}
              className="flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-[#D2000C] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              <CameraIcon /> Kamerayla çek
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              <UploadIcon /> Galeriden yükle
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        </div>
      )}

      {phase === "camera" && (
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-[10px] bg-black aspect-[3/4] max-h-[420px] mx-auto w-full">
            <video ref={videoRef} playsInline muted autoPlay className="h-full w-full object-cover" />
            <button
              onClick={flipCamera}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
              aria-label="Kamerayı çevir"
            >
              <FlipIcon />
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                stopStream();
                setPhase("idle");
              }}
              className="rounded-[6px] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Vazgeç
            </button>
            <button
              onClick={captureStill}
              className="flex-1 rounded-[6px] bg-[#D2000C] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Çek
            </button>
          </div>
        </div>
      )}

      {phase === "detecting" && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-[10px] border border-white/10 aspect-[3/4] max-h-[420px]" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#D2000C]" />
          <span className="text-xs text-white/40" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Analiz ediliyor…
          </span>
        </div>
      )}

      {phase === "review" && captured && (
        <div className="flex flex-col gap-3">
          <div
            className="relative mx-auto w-full max-h-[420px] overflow-hidden rounded-[10px] bg-black"
            style={{ aspectRatio: captured.aspect || 0.75 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={captured.url} alt="" className="h-full w-full object-cover" />
            {!insufficient && <SkeletonOverlay landmarks={captured.landmarks} />}
          </div>

          {insufficient ? (
            <p className="text-sm text-amber-400" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {INSUFFICIENT_MESSAGES[insufficient.reason] || INSUFFICIENT_MESSAGES.no_pose}
            </p>
          ) : (
            <p className="text-sm text-emerald-400" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Poz tespit edildi, kullanıma hazır.
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={retake}
              className="rounded-[6px] border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Tekrar çek
            </button>
            <button
              onClick={confirm}
              disabled={!!insufficient}
              className="flex-1 rounded-[6px] bg-[#D2000C] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}
            >
              Kullan →
            </button>
          </div>
        </div>
      )}

      {onBack && phase === "idle" && (
        <button
          onClick={onBack}
          className="self-start text-xs text-white/40 hover:text-white/70"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          ← Geri
        </button>
      )}
    </div>
  );
}
