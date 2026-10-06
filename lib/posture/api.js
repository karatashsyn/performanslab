// Thin client for the anonymous posture-analysis API. Guest tokens are
// session-scoped (a new mint is a new guest identity), so this module never
// caches or persists a token itself — callers own the token lifecycle.

const DEFAULT_BASE_URL = "https://performanslab.ew.r.appspot.com";
const BASE_URL = (process.env.NEXT_PUBLIC_POSTURE_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");

export class PostureApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = "PostureApiError";
    this.status = status;
    this.details = details;
  }
}

async function request(path, { method = "GET", token, body } = {}) {
  const isForm = body instanceof FormData;
  const headers = isForm ? {} : { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: isForm ? body : body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new PostureApiError("network_error", { status: 0 });
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    // No/invalid JSON body (e.g. some 4xx/5xx responses) — fall through to status check.
  }

  if (!res.ok || json?.success === false) {
    // The API returns errors as either a plain string (`error: "Validation failed"`,
    // with per-field messages in `details`) or, for some routes, `error.message`.
    const message =
      (typeof json?.error === "string" ? json.error : json?.error?.message) ||
      json?.message ||
      `request_failed_${res.status}`;
    throw new PostureApiError(message, { status: res.status, details: json?.details });
  }

  return json?.data ?? json;
}

// POST /api/public/guest-token — no Authorization header, public endpoint.
// Returns { accessToken, expiresIn }.
export function mintGuestToken(captchaToken) {
  return request("/api/public/guest-token", {
    method: "POST",
    body: captchaToken ? { captcha_token: captchaToken } : {},
  });
}

// POST /api/posture/analyses — requires a guest bearer token.
// Returns the created analysis (includes analysisId).
export function createPostureAnalysis(accessToken, payload) {
  return request("/api/posture/analyses", { method: "POST", token: accessToken, body: payload });
}

// GET /api/posture/analyses/{analysisId} — must use the same guest token
// that created it; another guest token cannot read it.
export function getPostureAnalysis(accessToken, analysisId) {
  return request(`/api/posture/analyses/${encodeURIComponent(analysisId)}`, { token: accessToken });
}

// POST /api/posture/analyses/{analysisId}/photos — multipart; `front` and `side`
// are JPEG/PNG blobs, max 5 MB each.
export function uploadPosturePhotos(accessToken, analysisId, { front, side }) {
  const form = new FormData();
  if (front) form.append("front", front, "front.jpg");
  if (side) form.append("side", side, "side.jpg");
  return request(`/api/posture/analyses/${encodeURIComponent(analysisId)}/photos`, {
    method: "POST",
    token: accessToken,
    body: form,
  });
}
