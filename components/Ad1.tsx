"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[]
  }
}

export default function Ad1() {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      console.error("AdSense error:", error)
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
        data-ad-client="ca-pub-5834688335918066"
        data-ad-slot="1083800730"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
