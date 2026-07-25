import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/articles",
  title: "Career Guides",
  description: "All original CareerKit AI guides on resumes, interviews, job search strategy, and workplace skills."
});

interface Props {
  searchParams: { q?: string };
}

export default function ArticlesIndexPage({ searchParams }: Props) {
  const query = (searchParams?.q ?? "").trim();
  const allArticles = getAllArticles();
  const needle = query.toLowerCase();
  const articles = needle
    ? allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(needle) ||
          a.description.toLowerCase().includes(needle) ||
          a.category.toLowerCase().includes(needle)
      )
    : allArticles;

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ name: "Guides" }]} />
      <h1>All guides</h1>
      <p>{allArticles.length} original, editorially reviewed guides. No filler, no copied content.</p>

      <form action="/articles" method="get" role="search" aria-label="Search guides" className="search-form">
        <label htmlFor="q" className="sr-only">Search guides</label>
        <input type="search" id="q" name="q" defaultValue={query} placeholder="Search guides, e.g. salary negotiation" />
        <button type="submit">Search</button>
      </form>
      {query && (
        <p>
          {articles.length} result{articles.length === 1 ? "" : "s"} for &quot;{query}&quot;.{" "}
          <Link href="/articles">Clear search</Link>
        </p>
      )}

      <div className="article-grid">
        {articles.map((article) => (
          <article key={article.slug} className="article-card">
            <p className="meta-text">{article.category}</p>
            <h2>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
            <p className="meta-text">{article.readingTime}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
