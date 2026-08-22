"use client";
import { useEffect, useState } from "react";
import { analyzeCombined } from "@/lib/posture/analyze";
import { evaluate } from "@/lib/posture/rules";
import { trackPostureDemoStart, trackPostureResult } from "@/lib/analytics";
import IntroStep from "@/components/posture/IntroStep";
import PhotoUploadStep from "@/components/posture/PhotoUploadStep";
import AnalyzingStep from "@/components/posture/AnalyzingStep";
import ResultStep from "@/components/posture/ResultStep";
import StepHeader from "@/components/posture/StepHeader";

export default function PostureDemo() {
  const [step, setStep] = useState("intro");
  const [frontData, setFrontData] = useState(null);
  const [sideData, setSideData] = useState(null);
  const [result, setResult] = useState(null); // { metrics, evaluation }
  const [error, setError] = useState(null);

  useEffect(() => {
    if (step !== "analyzing") return;
    const { landmarks: frontLm } = frontData;
    const { landmarks: sideLm } = sideData;

    const timer = setTimeout(() => {
      const analysis = analyzeCombined(frontLm, sideLm);
      if (analysis.insufficient) {
        setError(
          analysis.angle === "side"
            ? "Yan fotoğraf yeterli değildi, tekrar dener misin?"
            : "Ön fotoğraf yeterli değildi, tekrar dener misin?"
        );
        setStep(analysis.angle === "side" ? "side" : "front");
        return;
      }
      const evaluation = evaluate(analysis.metrics);
      setResult({ metrics: analysis.metrics, evaluation });
      trackPostureResult(evaluation.score, evaluation.focusAreas.length, evaluation.focusAreas[0]?.id);
      setStep("result");
    }, 700);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Confirming a photo happens near the bottom of the step (the "Kullan" button).
  // Without this, the next step mounts off-screen below the fold and only the
  // sticky header is visible on transition — easy to misread as nothing happened.
  useEffect(() => {
    if (step === "front" || step === "side") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  function restart() {
    setFrontData(null);
    setSideData(null);
    setResult(null);
    setError(null);
    setStep("intro");
  }

  const showProgress = step === "front" || step === "side";

  return (
    <main className="min-h-screen bg-[#090A0D] pb-20">
      <div className="mx-auto max-w-xl px-5 sm:px-8 pt-24">
        {showProgress && <StepHeader currentStep={step} />}

        {error && step !== "analyzing" && (
          <p className="mb-4 text-sm text-amber-400" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {error}
          </p>
        )}

        {step === "intro" && (
          <IntroStep
            onStart={() => {
              trackPostureDemoStart();
              setStep("front");
            }}
          />
        )}

        {step === "front" && (
          <PhotoUploadStep
            angle="front"
            title="Ön fotoğraf"
            hint="Karşıya bak, kollar yanda, tüm vücut karede olsun."
            onConfirm={(data) => {
              setError(null);
              setFrontData(data);
              setStep("side");
            }}
          />
        )}

        {step === "side" && (
          <PhotoUploadStep
            angle="side"
            title="Yan fotoğraf"
            hint="Profilden dur, tüm vücut karede olsun."
            onConfirm={(data) => {
              setError(null);
              setSideData(data);
              setStep("analyzing");
            }}
            onBack={() => setStep("front")}
          />
        )}

        {step === "analyzing" && <AnalyzingStep />}

        {step === "result" && result && (
          <ResultStep metrics={result.metrics} evaluation={result.evaluation} onRestart={restart} />
        )}
      </div>
    </main>
  );
}
