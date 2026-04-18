/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

const postureViews = [
  {
    id: "front",
    label: "Ön",
    image: "/skeleton-analysis.png",
    score: 89,
    summary: "İyi postür, küçük geliştirmeler mümkün",
    metrics: [
      { value: "2.1°", label: "Omuz Eğimi" },
      { value: "1.4°", label: "Kalça Eğimi" },
      { value: "Hafif", label: "Baş" },
    ],
    guides: {
      lines: [
        { x1: 50, y1: 8, x2: 50, y2: 96, tone: "ideal", dashed: true },
        { x1: 34, y1: 32, x2: 67, y2: 32, tone: "good" },
        { x1: 39, y1: 69, x2: 62, y2: 69, tone: "good" },
        { points: "42,14 34,32 39,69 36,95", tone: "good" },
        { points: "58,14 67,32 62,69 65,95", tone: "good" },
        { x1: 34, y1: 32, x2: 62, y2: 69, tone: "good" },
        { x1: 67, y1: 32, x2: 39, y2: 69, tone: "good" },
        { x1: 42, y1: 14, x2: 58, y2: 14, tone: "warning" },
      ],
      points: [
        { x: 42, y: 14, tone: "warning" },
        { x: 58, y: 14, tone: "warning" },
        { x: 34, y: 32, tone: "good" },
        { x: 67, y: 32, tone: "good" },
        { x: 39, y: 69, tone: "good" },
        { x: 62, y: 69, tone: "good" },
      ],
    },
  },
  {
    id: "left",
    label: "Sol",
    image: "/posture-left.png",
    score: 64,
    summary: "Postür gelişimi için takip önerilir",
    metrics: [
      { value: "7.8°", label: "Baş Açısı" },
      { value: "6.2°", label: "Omuz Hattı" },
      { value: "Orta", label: "Kontrol" },
    ],
    guides: {
      lines: [
        { x1: 49, y1: 8, x2: 49, y2: 96, tone: "ideal", dashed: true },
        { points: "58,17 53,33 50,65 48,94", tone: "warning" },
        { x1: 49, y1: 17, x2: 58, y2: 17, tone: "warning" },
        { x1: 53, y1: 33, x2: 49, y2: 33, tone: "good" },
        { x1: 50, y1: 65, x2: 49, y2: 65, tone: "good" },
      ],
      points: [
        { x: 58, y: 17, tone: "warning" },
        { x: 53, y: 33, tone: "good" },
        { x: 50, y: 65, tone: "good" },
        { x: 48, y: 94, tone: "good" },
      ],
    },
  },
  {
    id: "right",
    label: "Sağ",
    image: "/posture-right.png",
    score: 64,
    summary: "Postür gelişimi için takip önerilir",
    metrics: [
      { value: "8.1°", label: "Baş Açısı" },
      { value: "5.9°", label: "Omuz Hattı" },
      { value: "Orta", label: "Kontrol" },
    ],
    guides: {
      lines: [
        { x1: 46, y1: 8, x2: 46, y2: 96, tone: "ideal", dashed: true },
        { points: "35,17 42,33 46,65 48,94", tone: "warning" },
        { x1: 46, y1: 17, x2: 35, y2: 17, tone: "warning" },
        { x1: 42, y1: 33, x2: 46, y2: 33, tone: "good" },
        { x1: 46, y1: 65, x2: 46, y2: 65, tone: "good" },
      ],
      points: [
        { x: 35, y: 17, tone: "warning" },
        { x: 42, y: 33, tone: "good" },
        { x: 46, y: 65, tone: "good" },
        { x: 48, y: 94, tone: "good" },
      ],
    },
  },
];

export default function AppPreview({ className = "" }) {
  const [activeViewId, setActiveViewId] = useState("front");
  const [autoAdvance, setAutoAdvance] = useState(true);
  const activeView =
    postureViews.find((view) => view.id === activeViewId) ?? postureViews[0];
  const scoreStateClass =
    activeView.score >= 80 ? "app-preview--strong" : "app-preview--warning";

  useEffect(() => {
    if (!autoAdvance) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveViewId((currentViewId) => {
        const currentIndex = postureViews.findIndex(
          (view) => view.id === currentViewId,
        );
        const nextIndex =
          currentIndex === -1 ? 0 : (currentIndex + 1) % postureViews.length;

        return postureViews[nextIndex].id;
      });
    }, 3000);

    return () => window.clearInterval(timer);
  }, [autoAdvance]);

  const handleViewSelect = (viewId) => {
    setAutoAdvance(false);
    setActiveViewId(viewId);
  };

  return (
    <div
      className={`${className} app-preview ${scoreStateClass}`}
      aria-label="PerformansLab uygulama önizlemesi"
    >
      <div className="app-preview__header">
        <div className="w-[2.875rem]">
          <span className="app-preview__back">‹</span>
        </div>
        <strong>Postür Analizi</strong>
        <span className="app-preview__date opacity-0">4 Nisan</span>
      </div>
      <div className="app-preview__tabs">
        {postureViews.map((view) => (
          <button
            key={view.id}
            type="button"
            aria-pressed={activeView.id === view.id}
            onClick={() => handleViewSelect(view.id)}
            className={`app-preview__tab ${
              activeView.id === view.id ? "app-preview__tab--active" : ""
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      <div className="app-preview__scan">
        <img src={activeView.image} alt="" />
        <svg
          className="app-preview__guides"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {activeView.guides.lines.map((line, index) =>
            line.points ? (
              <polyline
                key={`line-${index}`}
                points={line.points}
                className={`app-preview__guide-line app-preview__guide-line--${line.tone}`}
              />
            ) : (
              <line
                key={`line-${index}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                className={`app-preview__guide-line app-preview__guide-line--${line.tone} ${
                  line.dashed ? "app-preview__guide-line--dashed" : ""
                }`}
              />
            ),
          )}
          {activeView.guides.points.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="1.25"
              className={`app-preview__guide-point app-preview__guide-point--${point.tone}`}
            />
          ))}
        </svg>
        <div className="app-preview__badge">AI İskelet Analizi</div>
        <div className="app-preview__score-line">
          Skor: {activeView.score} / 100
        </div>
      </div>

      <div className="app-preview__score">
        <div className="app-preview__ring">
          <strong>{activeView.score}</strong>
          <span>/ 100</span>
        </div>
        <p>{activeView.summary}</p>
      </div>

      <div className="app-preview__metrics">
        {activeView.metrics.map((metric) => (
          <span key={metric.label}>
            {metric.value}
            <small>{metric.label}</small>
          </span>
        ))}
      </div>

      <div className="app-preview__cta">Önerileri Gör</div>
    </div>
  );
}
