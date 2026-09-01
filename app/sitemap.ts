import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/env";

// Static pages do not have a reliable page-level modification source.
// Omitting lastModified for them is more accurate than assigning a shared
// deploy/content date crawlers would otherwise (mis)trust as real.
const STATIC_ROUTES = [
  "",
  "about",
  "privacy",
  "terms",
  "disclaimer",
  "editorial-policy",
  "advertising-disclosure",
  "contact",
  "tools",
  "tools/resume-checklist-generator",
  "tools/salary-estimator",
  "tools/resume-keyword-matcher",
  "tools/cover-letter",
  "tools/headline-optimizer",
  "tools/interview-prep",
  "tools/offer-comparator"
  // /tools/job-tracker and /admin/* intentionally excluded: private/internal, noindex.
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
