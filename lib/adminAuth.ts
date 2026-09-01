// Admin session + password verification helpers.
//
// Deliberately built on the Web Crypto API (`crypto.subtle`, `globalThis.crypto`)
// rather than Node's `crypto` module, because this file is imported from BOTH
// middleware.ts (which runs on the Edge runtime, which has no Node `crypto`)
// and Server Actions/Components (Node runtime). Web Crypto is available in
// both, so one implementation covers both without duplicating logic.
//
// The session cookie is a signed, stateless token: `${expiryEpochSeconds}.${hmacHex}`,
// HMAC-SHA256'd with ADMIN_PASSWORD as the key. There is no separate session
// secret env var by design (the brief specifies exactly four new env vars) —
// ADMIN_PASSWORD is already server-only and secret, so it doubles as the
// signing key. Never logged, never sent to the client.

export const SESSION_COOKIE_NAME = "ck_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Compares two equal-shape strings without an early-exit branch per
 * character, so a mismatch on the first byte doesn't return measurably
 * faster than a mismatch on the last one. Not a substitute for a real crypto
 * library's constant-time compare, but meaningfully better than `===` for
 * comparing secrets over a network-observable timing side channel.
 */
function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(signature);
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(input));
  return toHex(digest);
}

/**
 * Compares a candidate password to the real one via fixed-length digest
 * comparison, so differing input lengths don't short-circuit the compare
 * before it even reaches `timingSafeEqualStrings`.
 */
export async function verifyPassword(candidate: string, real: string): Promise<boolean> {
  const [a, b] = await Promise.all([sha256Hex(candidate), sha256Hex(real)]);
  return timingSafeEqualStrings(a, b);
}

/** Builds a fresh, signed session token. Throws if ADMIN_PASSWORD isn't configured — callers must check that themselves before offering a login form. */
export async function createSessionValue(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not configured.");
  const expires = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expires);
  const signature = await hmacHex(secret, payload);
  return `${payload}.${signature}`;
}

/** Verifies signature + expiry. Returns false (never throws) for any missing/malformed/expired/tampered value. */
export async function isSessionValueValid(value: string | undefined | null): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;

  const expectedSignature = await hmacHex(secret, payload);
  return timingSafeEqualStrings(signature, expectedSignature);
}
