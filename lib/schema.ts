// JSON-LD builders. Each function returns a plain schema.org object to be
// rendered via <JsonLd data={...} />. Kept free of fabricated data (no fake
// ratings/reviews, no invented social profiles) — only claims backed by
// something real and visible on the page.

import { SITE_URL, CONTACT_EMAIL } from "@/lib/env";
import type { ToolMeta } from "@/lib/tools";

export const SITE_NAME = "CareerKit AI";

export interface BreadcrumbItem {
  name: string;
  /** Absolute or root-relative path. Omit on the final (current) item. */
  path?: string;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    email: CONTACT_EMAIL
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/articles?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function collectionPageSchema(articles: Array<{ slug: string; title: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "CareerKit AI Career Guides",
    url: `${SITE_URL}/articles`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${SITE_URL}/articles/${article.slug}`
      }))
    }
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {})
    }))
  };
}

export interface ArticleSchemaInput {
  slug: string;
  title: string;
  description: string;
  updated: string;
}

export function articleSchema(article: ArticleSchemaInput) {
  const url = `${SITE_URL}/articles/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.updated,
    dateModified: article.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    author: { "@type": "Organization", name: `${SITE_NAME} Editorial Team`, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/opengraph-image` }
    }
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function softwareApplicationSchema(tool: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: `${SITE_URL}${tool.path}`,
    description: tool.shortDescription,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (runs in the browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };
}
