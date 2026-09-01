import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";
import { getTool } from "@/lib/tools";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { MIN_WORDS_INTERNAL_SAFEGUARD } from "@/lib/contentSafeguards";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    path: `/articles/${article.slug}`,
    title: article.title,
    description: article.description,
    type: "article",
    publishedTime: article.updated,
    modifiedTime: article.updated
  });
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const eligibleForAds = article.wordCount >= MIN_WORDS_INTERNAL_SAFEGUARD;
  const relatedArticles = article.related
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== null);
  const relatedTool = article.relatedTool ? getTool(article.relatedTool) : null;

  return (
    <div>
      <JsonLd data={articleSchema(article)} />

      <div className="article-content">
        <Breadcrumbs
          items={[
            { name: "Guides", path: "/articles" },
            { name: article.title }
          ]}
        />
        <p className="meta-text">
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

      {(relatedArticles.length > 0 || relatedTool) && (
        <div className="article-content">
          <h2>Related guides</h2>
          <p>
            {relatedArticles.length > 0 && (
              <>
                See our guides on{" "}
                {relatedArticles.map((related, index) => (
                  <span key={related.slug}>
                    {index > 0 && " and "}
                    <a href={`/articles/${related.slug}`}>{related.title.toLowerCase()}</a>
                  </span>
                ))}
                .{" "}
              </>
            )}
            {relatedTool && (
              <>
                When you&apos;re ready to put it into practice, try our{" "}
                <a href={relatedTool.path}>{relatedTool.name}</a>.
              </>
            )}
          </p>
        </div>
      )}

      <div className="article-content">
        <p className="meta-text">
          <a href="/articles">← Back to all guides</a>
        </p>
      </div>
    </div>
  );
}
