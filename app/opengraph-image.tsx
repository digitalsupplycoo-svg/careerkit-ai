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
          background: "linear-gradient(135deg, #0f1e3d 0%, #1b3b6f 100%)",
          fontFamily: "sans-serif"
        }}
      >
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
