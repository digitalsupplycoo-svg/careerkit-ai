import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/env";

// Real dates the linked content last substantively changed — NOT `new Date()`.
// A build-time `new Date()` would stamp every static route as "modified today"
// on every deploy regardless of whether the page actually changed, which is
// misleading to crawlers and can make Google trust lastmod on this site less.
const SITE_CONTENT_UPDATED = "2026-09-01"; // last edit to general site/tool page copy (added 4 new tools + B&W redesign)
const LEGAL_LAST_UPDATED = "2026-07-24"; // matches EFFECTIVE_DATE/LAST_UPDATED in privacy & terms pages

const STATIC_ROUTES: Array<{ route: string; lastModified: string }> = [
  { route: "", lastModified: SITE_CONTENT_UPDATED },
  { route: "about", lastModified: SITE_CONTENT_UPDATED },
  { route: "privacy", lastModified: LEGAL_LAST_UPDATED },
  { route: "terms", lastModified: LEGAL_LAST_UPDATED },
  { route: "disclaimer", lastModified: LEGAL_LAST_UPDATED },
  { route: "editorial-policy", lastModified: SITE_CONTENT_UPDATED },
  { route: "advertising-disclosure", lastModified: SITE_CONTENT_UPDATED },
  { route: "contact", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/resume-checklist-generator", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/salary-estimator", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/resume-keyword-matcher", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/cover-letter", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/headline-optimizer", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/interview-prep", lastModified: SITE_CONTENT_UPDATED },
  { route: "tools/offer-comparator", lastModified: SITE_CONTENT_UPDATED }
  // /tools/job-tracker intentionally excluded: private, per-user local data, noindex.
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  // The guides index lists every article, so its own lastmod should track
  // whichever article changed most recently, not a fixed date.
  const mostRecentArticleUpdate = articles.reduce(
    (latest, article) => (article.updated > latest ? article.updated : latest),
    SITE_CONTENT_UPDATED
  );

  const staticEntries = STATIC_ROUTES.map(({ route, lastModified }) => ({
    url: `${SITE_URL}/${route}`.replace(/\/$/, "") || SITE_URL,
    lastModified: new Date(lastModified)
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
