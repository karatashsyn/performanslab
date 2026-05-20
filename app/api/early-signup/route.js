import crypto from "crypto";

const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_TAB = "Erken Kayit Listesi";

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  ).toString("base64url");

  const signingInput = `${header}.${payload}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signingInput);
  const signature = sign.sign(PRIVATE_KEY, "base64url");

  const jwt = `${signingInput}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const { access_token } = await res.json();
  return access_token;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const { email } = body ?? {};

  if (!email) {
    return Response.json({ error: "missing_email" }, { status: 400 });
  }

  const emailStr = String(email).trim().slice(0, 254);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  if (!emailValid) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const token = await getAccessToken();
  const range = `${SHEET_TAB}!A:B`;

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[emailStr, new Date().toISOString()]],
      }),
    }
  );

  if (!res.ok) {
    const detail = await res.text();
    console.error("Sheets API error:", detail);
    return Response.json({ error: "save_failed", detail }, { status: 500 });
  }

  return Response.json({ success: true });
}
