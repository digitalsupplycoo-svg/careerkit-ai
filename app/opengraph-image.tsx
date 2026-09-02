import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          fontFamily: "sans-serif"
        }}
      >
        {/* Brand mark, inlined rather than imported from components/Logo.tsx —
            Satori (next/og) renders a limited JSX/CSS subset, so this file
            keeps its own copy of the same path data. */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="104" height="104" viewBox="0 0 32 32" fill="#ffffff">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 0h18a7 7 0 0 1 7 7v18a7 7 0 0 1-7 7H7a7 7 0 0 1-7-7V7a7 7 0 0 1 7-7ZM9 13l4.8 4.8L23.4 8.2v6l-9.6 9.6L9 19v-6Z"
            />
          </svg>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              display: "flex"
            }}
          >
            CareerKit AI
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "rgba(255,255,255,0.75)",
            display: "flex"
          }}
        >
          Practical career guidance, without the fluff
        </div>
      </div>
    ),
    { ...size }
  );
}
