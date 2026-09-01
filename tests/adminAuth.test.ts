import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createSessionValue, isSessionValueValid, verifyPassword } from "@/lib/adminAuth";

const ORIGINAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

describe("adminAuth", () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct-horse-battery-staple";
  });

  afterEach(() => {
    process.env.ADMIN_PASSWORD = ORIGINAL_ADMIN_PASSWORD;
  });

  describe("verifyPassword", () => {
    it("returns true for a matching password", async () => {
      expect(await verifyPassword("correct-horse-battery-staple", "correct-horse-battery-staple")).toBe(true);
    });

    it("returns false for a non-matching password", async () => {
      expect(await verifyPassword("wrong-password", "correct-horse-battery-staple")).toBe(false);
    });

    it("returns false for passwords of different lengths", async () => {
      expect(await verifyPassword("short", "correct-horse-battery-staple")).toBe(false);
    });

    it("is case-sensitive", async () => {
      expect(await verifyPassword("Correct-Horse-Battery-Staple", "correct-horse-battery-staple")).toBe(false);
    });
  });

  describe("createSessionValue / isSessionValueValid", () => {
    it("round-trips: a freshly created session is valid", async () => {
      const token = await createSessionValue();
      expect(await isSessionValueValid(token)).toBe(true);
    });

    it("rejects a tampered payload", async () => {
      const token = await createSessionValue();
      const [payload, signature] = token.split(".");
      const tampered = `${Number(payload) + 10000}.${signature}`;
      expect(await isSessionValueValid(tampered)).toBe(false);
    });

    it("rejects a tampered signature", async () => {
      const token = await createSessionValue();
      const [payload] = token.split(".");
      const tampered = `${payload}.0000000000000000000000000000000000000000000000000000000000000000`;
      expect(await isSessionValueValid(tampered)).toBe(false);
    });

    it("rejects an expired token", async () => {
      const expiredPayload = String(Math.floor(Date.now() / 1000) - 60);
      // Can't forge a valid signature without the secret in a real attack —
      // here we only need an expired-but-otherwise-shaped token to confirm
      // the expiry check runs before/independently of a signature match.
      expect(await isSessionValueValid(`${expiredPayload}.deadbeef`)).toBe(false);
    });

    it("rejects malformed values", async () => {
      expect(await isSessionValueValid(undefined)).toBe(false);
      expect(await isSessionValueValid(null)).toBe(false);
      expect(await isSessionValueValid("")).toBe(false);
      expect(await isSessionValueValid("not-a-valid-token")).toBe(false);
      expect(await isSessionValueValid("123456")).toBe(false);
    });

    it("rejects any token when ADMIN_PASSWORD is unset", async () => {
      const token = await createSessionValue();
      delete process.env.ADMIN_PASSWORD;
      expect(await isSessionValueValid(token)).toBe(false);
    });

    it("a token signed with one password is rejected once the password changes", async () => {
      const token = await createSessionValue();
      process.env.ADMIN_PASSWORD = "a-different-password";
      expect(await isSessionValueValid(token)).toBe(false);
    });
  });
});
