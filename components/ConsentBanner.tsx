"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "careerkit-consent-notice-dismissed";

/**
 * IMPORTANT: this is NOT a certified Consent Management Platform (CMP) and must
 * never be presented to users as one. It only tells EEA/UK/CH visitors that a
 * real, Google-certified CMP (e.g. Google's own AdSense Privacy & Messaging tool)
 * will govern ad personalization consent once ads are enabled. No advertising
 * cookies are set by this component. See ADSENSE-LAUNCH-CHECKLIST.md item 3.
 */
export default function ConsentBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    setDismissed(stored === "true");

    function reopenPrivacyChoices(event: MouseEvent) {
      const target = event.target as Element | null;
      if (target?.closest('[data-role="reopen-cmp"]')) {
        setDismissed(false);
      }
    }

    document.addEventListener("click", reopenPrivacyChoices);
    return () => document.removeEventListener("click", reopenPrivacyChoices);
  }, []);

  if (dismissed) return null;

  return (
    <div className="consent-banner" role="dialog" aria-label="Privacy notice">
      <p>
        CareerKit does not show personalized ads or set advertising cookies at this time. If that changes, a
        certified consent platform will ask before anything is personalized. Read our{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem(STORAGE_KEY, "true");
          setDismissed(true);
        }}
      >
        Got it
      </button>
    </div>
  );
}
