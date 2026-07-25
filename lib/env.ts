// Central place to read public env vars so no other file guesses or hardcodes values.

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
export const ADSENSE_VERIFICATION = process.env.NEXT_PUBLIC_ADSENSE_VERIFICATION || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "info@careerkit.online";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@careerkit.example";

/** True only when a syntactically valid AdSense publisher ID is configured. */
export function hasValidAdsenseClient(): boolean {
  return /^ca-pub-\d{10,}$/.test(ADSENSE_CLIENT);
}

/**
 * True only when visible ad unit boxes (AdSlot) should render.
 *
 * This is intentionally a SEPARATE switch from hasValidAdsenseClient(). A valid
 * client ID is needed early — to load the AdSense script/verification snippet
 * so Google can verify site ownership — but that does not mean approved,
 * visible ad units should appear yet. Set NEXT_PUBLIC_ADSENSE_ENABLE_UNITS=true
 * only after the site has actually been approved. Until then, the verification
 * snippet can be live (via ADSENSE_CLIENT) while AdSlot stays fully inert.
 */
export function shouldRenderAdUnits(): boolean {
  return hasValidAdsenseClient() && process.env.NEXT_PUBLIC_ADSENSE_ENABLE_UNITS === "true";
}

/** Converts "ca-pub-XXXX" to the "pub-XXXX" format required by ads.txt. */
export function adsTxtPublisherId(): string | null {
  if (!hasValidAdsenseClient()) return null;
  return ADSENSE_CLIENT.replace(/^ca-/, "");
}
