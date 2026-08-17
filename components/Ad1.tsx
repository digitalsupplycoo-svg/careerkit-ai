"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/env";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

export default function Ad1() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [])

  return (
    <div
      style={{
        width: "100%",
        margin: "24px 0",
        minHeight: "100px",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot="1083800730"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
