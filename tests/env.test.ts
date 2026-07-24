import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

const ORIGINAL_ENV = { ...process.env };

async function freshEnv() {
  // lib/env.ts reads process.env at import time, so reset vitest's module
  // registry between tests to pick up env changes on re-import.
  vi.resetModules();
  const mod = await import("@/lib/env");
  return mod;
}

describe("lib/env AdSense helpers", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("treats an empty client ID as invalid", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    const { hasValidAdsenseClient } = await freshEnv();
    expect(hasValidAdsenseClient()).toBe(false);
  });

  it("rejects a malformed client ID", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "not-a-real-id";
    const { hasValidAdsenseClient } = await freshEnv();
    expect(hasValidAdsenseClient()).toBe(false);
  });

  it("accepts a validly formatted client ID", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-1234567890123456";
    const { hasValidAdsenseClient } = await freshEnv();
    expect(hasValidAdsenseClient()).toBe(true);
  });

  it("never invents an ads.txt publisher id when unconfigured", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    const { adsTxtPublisherId } = await freshEnv();
    expect(adsTxtPublisherId()).toBeNull();
  });

  it("converts ca-pub- to pub- for ads.txt only when the id is valid", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-9999999999999999";
    const { adsTxtPublisherId } = await freshEnv();
    expect(adsTxtPublisherId()).toBe("pub-9999999999999999");
  });

  it("refuses to derive an ads.txt id from a malformed client id", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-abc";
    const { adsTxtPublisherId } = await freshEnv();
    expect(adsTxtPublisherId()).toBeNull();
  });

  it("does not render ad units from a valid client id alone (verification stage)", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-1234567890123456";
    delete process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS;
    const { shouldRenderAdUnits } = await freshEnv();
    expect(shouldRenderAdUnits()).toBe(false);
  });

  it("does not render ad units from the enable flag alone, without a valid client id", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS = "true";
    const { shouldRenderAdUnits } = await freshEnv();
    expect(shouldRenderAdUnits()).toBe(false);
  });

  it("renders ad units only once both a valid client id AND the enable flag are set", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-1234567890123456";
    process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS = "true";
    const { shouldRenderAdUnits } = await freshEnv();
    expect(shouldRenderAdUnits()).toBe(true);
  });
});
