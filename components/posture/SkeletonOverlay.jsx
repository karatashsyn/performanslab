"use client";
import { useEffect, useRef } from "react";
import { namedLandmarks, SKELETON_CONNECTIONS, OVERLAY_POINTS } from "@/lib/posture/landmarks";

// Draws the detected pose skeleton over its parent (which must be
// position:relative and share the exact aspect ratio of the photo, so
// normalized 0..1 landmark coords map 1:1 onto container pixels).
export default function SkeletonOverlay({ landmarks }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function draw() {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!landmarks) return;

      const lm = namedLandmarks(landmarks);

      ctx.strokeStyle = "rgba(34,197,94,0.9)";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      for (const [a, b] of SKELETON_CONNECTIONS) {
        const pa = lm[a];
        const pb = lm[b];
        if (!pa || !pb || (pa.visibility ?? 0) < 0.3 || (pb.visibility ?? 0) < 0.3) continue;
        ctx.beginPath();
        ctx.moveTo(pa.x * w, pa.y * h);
        ctx.lineTo(pb.x * w, pb.y * h);
        ctx.stroke();
      }

      ctx.fillStyle = "#22C55E";
      for (const name of OVERLAY_POINTS) {
        const p = lm[name];
        if (!p || (p.visibility ?? 0) < 0.3) continue;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(container);
    return () => ro.disconnect();
  }, [landmarks]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
