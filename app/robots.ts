import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
        // No Disallow entries on purpose: Disallow prevents crawling, which
        // prevents a crawler from ever seeing a page's noindex meta tag,
        // which can leave the URL indexed anyway (title-less, from external
        // links) instead of cleanly excluded. /tools/job-tracker and every
        // /admin/* route already carry noindex meta directly — that's the
        // correct, non-conflicting way to keep them out of search results.
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
