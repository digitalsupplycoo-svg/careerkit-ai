import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Career Guides",
  description: "All original CareerKit AI guides on resumes, interviews, job search strategy, and workplace skills."
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <div className="page-container">
      <h1>All guides</h1>
      <p>{articles.length} original, editorially reviewed guides. No filler, no copied content.</p>
      <div className="article-grid">
        {articles.map((article) => (
          <article key={article.slug} className="article-card">
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{article.category}</p>
            <h2 style={{ fontSize: "1.1rem" }}>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{article.readingTime}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
