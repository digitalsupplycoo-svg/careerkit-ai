import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/env";

const STATIC_ROUTES = [
  "",
  "about",
  "articles",
  "privacy",
  "terms",
  "disclaimer",
  "editorial-policy",
  "advertising-disclosure",
  "contact",
  "tools/resume-checklist-generator",
  "tools/salary-estimator",
  "tools/resume-keyword-matcher"
  // /tools/job-tracker intentionally excluded: private, per-user local data.
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}/${route}`.replace(/\/$/, "") || SITE_URL,
    lastModified: new Date()
  }));

  const articleEntries = getAllArticles().map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updated)
  }));

  return [...staticEntries, ...articleEntries];
}
