import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/tools/job-tracker"] // private, per-user local data — no index value, no ads
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
