import { describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";

describe("rateLimit", () => {
  it("allows the first several attempts for a fresh key", () => {
    const key = `test-fresh-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(key).allowed).toBe(true);
    }
  });

  it("blocks the attempt after the limit is reached", () => {
    const key = `test-block-${Math.random()}`;
    for (let i = 0; i < 5; i++) checkRateLimit(key);
    const result = checkRateLimit(key);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("tracks separate keys independently", () => {
    const keyA = `test-a-${Math.random()}`;
    const keyB = `test-b-${Math.random()}`;
    for (let i = 0; i < 5; i++) checkRateLimit(keyA);
    expect(checkRateLimit(keyA).allowed).toBe(false);
    expect(checkRateLimit(keyB).allowed).toBe(true);
  });

  it("resetRateLimit clears an existing bucket so the key is allowed again", () => {
    const key = `test-reset-${Math.random()}`;
    for (let i = 0; i < 5; i++) checkRateLimit(key);
    expect(checkRateLimit(key).allowed).toBe(false);
    resetRateLimit(key);
    expect(checkRateLimit(key).allowed).toBe(true);
  });
});
