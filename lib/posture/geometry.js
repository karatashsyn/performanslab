// Pure geometry helpers shared by the posture analysis engine.
// Landmarks are plain { x, y, visibility } objects, x/y normalized 0..1.

export function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

// Angle (deg) of the line a-b relative to horizontal, 0..90.
export function tiltAngleDeg(a, b) {
  const dx = Math.abs(b.x - a.x);
  const dy = Math.abs(b.y - a.y);
  if (dx < 0.001) return 90;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

// Interior angle (deg) at vertex b, formed by rays b->a and b->c.
export function angleBetween3(a, b, c) {
  const abx = a.x - b.x;
  const aby = a.y - b.y;
  const cbx = c.x - b.x;
  const cby = c.y - b.y;
  const magAB = Math.hypot(abx, aby);
  const magCB = Math.hypot(cbx, cby);
  if (magAB < 0.001 || magCB < 0.001) return 180;
  const dot = abx * cbx + aby * cby;
  return (Math.acos(Math.min(1, Math.max(-1, dot / (magAB * magCB)))) * 180) / Math.PI;
}

// Signed perpendicular offset of point p from the line a-b, normalized by |a-b|.
export function signedPerpOffset(p, a, b) {
  const abLen = dist(a, b);
  if (abLen < 0.001) return 0;
  return ((p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y)) / abLen;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
