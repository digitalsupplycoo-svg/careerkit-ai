import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const title = article?.title ?? "CareerKit AI";
  const category = article?.category ?? "Career Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#000000",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#cccccc",
            display: "flex"
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            display: "flex"
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "rgba(255,255,255,0.7)",
            display: "flex"
          }}
        >
          CareerKit AI
        </div>
      </div>
    ),
    { ...size }
  );
}
