import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import AdSlot from "@/components/AdSlot";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` }
  };
}

// This is an internal, self-imposed safeguard against showing ads next to very
// thin pages — NOT a published Google/AdSense word-count requirement (Google
// does not publish one). It exists so a near-empty or barely-started article
// can never carry an ad slot. See scripts/audit-adsense.mjs.
const MIN_WORDS_INTERNAL_SAFEGUARD = 350;

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const eligibleForAds = article.wordCount >= MIN_WORDS_INTERNAL_SAFEGUARD;

  return (
    <div>
      <div className="article-content">
        <p style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
          {article.category} · {article.readingTime} · Updated {article.updated}
        </p>
        <h1>{article.title}</h1>
      </div>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />

      {eligibleForAds && (
        <div className="article-content">
          <AdSlot id={`article-${article.slug}-end`} />
        </div>
      )}

      <div className="article-content">
        <p style={{ fontSize: "0.85rem" }}>
          <a href="/articles">← Back to all guides</a>
        </p>
      </div>
    </div>
  );
}
