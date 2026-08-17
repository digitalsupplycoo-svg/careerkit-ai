import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/env";

// Static pages do not have a reliable page-level modification source. Omitting
// lastModified is more accurate than assigning one shared deploy/content date.
const STATIC_ROUTES = [
  "",
  "about",
  "privacy",
  "terms",
  "disclaimer",
  "editorial-policy",
  "advertising-disclosure",
  "contact",
  "tools/resume-checklist-generator",
  "tools/salary-estimator",
  "tools/resume-keyword-matcher"
  // /tools/job-tracker intentionally excluded: private, per-user local data, noindex.
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // The guides index lists every article, so its own lastmod should track
  // whichever article changed most recently, not a fixed date.
  const mostRecentArticleUpdate = articles.reduce(
    (latest, article) => (article.updated > latest ? article.updated : latest),
    "1970-01-01"
  );

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}/${route}`.replace(/\/$/, "") || SITE_URL
  }));

  const articlesIndexEntry = {
    url: `${SITE_URL}/articles`,
    lastModified: new Date(mostRecentArticleUpdate)
  };

  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updated)
  }));

  return [...staticEntries, articlesIndexEntry, ...articleEntries];
}
