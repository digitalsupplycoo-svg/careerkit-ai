// Simple in-memory, per-server-instance rate limiter for the admin login
// form. Intentionally lightweight, not a distributed rate limiter — state
// resets on server restart and is NOT shared across multiple concurrent
// instances or regions. That's an accepted trade-off for a single-admin
// site (see PUBLISHING.md); a busier multi-instance deployment would want a
// shared store (e.g. Upstash Redis) instead.

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

/** Records one attempt for `key` and reports whether it's within the limit. Call once per real attempt (e.g. once per login POST). */
export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (bucket.count >= MAX_ATTEMPTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}

/** Clears a key's bucket — call after a successful login so a legitimate user isn't penalized by earlier typos. */
export function resetRateLimit(key: string): void {
  buckets.delete(key);
}
