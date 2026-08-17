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

  it("falls back to the existing public publisher ID when the env value is absent", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    const { ADSENSE_CLIENT, EXISTING_ADSENSE_CLIENT, hasValidAdsenseClient } = await freshEnv();
    expect(ADSENSE_CLIENT).toBe(EXISTING_ADSENSE_CLIENT);
    expect(hasValidAdsenseClient()).toBe(true);
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

  it("derives ads.txt from the existing public publisher ID when the env value is absent", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    const { EXISTING_ADSENSE_CLIENT, adsTxtPublisherId } = await freshEnv();
    expect(adsTxtPublisherId()).toBe(EXISTING_ADSENSE_CLIENT.replace(/^ca-/, ""));
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

  it("can render units from the approval flag using the existing publisher ID", async () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS = "true";
    const { shouldRenderAdUnits } = await freshEnv();
    expect(shouldRenderAdUnits()).toBe(true);
  });

  it("renders ad units only once both a valid client id AND the enable flag are set", async () => {
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT = "ca-pub-1234567890123456";
    process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS = "true";
    const { shouldRenderAdUnits } = await freshEnv();
    expect(shouldRenderAdUnits()).toBe(true);
  });
});
