import type { Metadata } from "next";
import { SITE_URL } from "@/lib/env";
import { SITE_NAME } from "@/lib/schema";

interface PageMetadataInput {
  /** Root-relative path, e.g. "/about" or "/" for home. */
  path: string;
  /** Page-specific title. The root layout's "%s | CareerKit AI" template applies automatically. */
  title?: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}

/**
 * Builds canonical + OpenGraph + Twitter metadata for a page. Centralized because
 * Next.js does NOT deep-merge `alternates`/`openGraph`/`twitter` between a layout
 * and a page — a page that sets its own object fully replaces the parent's, and a
 * page that sets none fully inherits the parent's. Every page must set its own
 * `alternates.canonical` explicitly or it silently inherits whatever the nearest
 * ancestor defined (see app/layout.tsx comment — this is what broke canonicals
 * site-wide before this helper existed).
 */
export function buildMetadata(input: PageMetadataInput): Metadata {
  const { path, title, description, type = "website", publishedTime, modifiedTime, noIndex } = input;
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Practical Career & Job Search Guides`;

  return {
    // Only include `title` at all when explicitly set. Next.js treats an
    // explicit `title: undefined` key as present, which breaks inheritance
    // of the root layout's default title/template entirely — omitting the
    // key lets pages that don't pass a title (currently just the homepage)
    // correctly fall back to the layout's default title.
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      siteName: SITE_NAME,
      locale: "en_US",
      title: ogTitle,
      description,
      url,
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description
    }
  };
}
