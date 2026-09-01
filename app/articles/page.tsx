import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/pageMetadata";
import { collectionPageSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  path: "/articles",
  title: "Career Guides",
  description: "All original CareerKit AI guides on resumes, interviews, job search strategy, and workplace skills."
});

interface Props {
  searchParams: { q?: string };
}

const CONTENT_HUBS = [
  { name: "Resume Writing & ATS", categories: ["Resumes"] },
  { name: "Interview Preparation", categories: ["Interviews"] },
  { name: "Salary & Offers", categories: ["Salary & Offers", "Workplace"] },
  { name: "Job Search Strategy & Branding", categories: ["Job Search", "Networking", "LinkedIn"] },
  { name: "Career Transitions & Applications", categories: ["Career Change", "Applications"] }
];

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
  const hubs = CONTENT_HUBS.map((hub) => ({
    ...hub,
    articles: articles.filter((article) => hub.categories.includes(article.category))
  })).filter((hub) => hub.articles.length > 0);

  return (
    <div className="page-container">
      <JsonLd data={collectionPageSchema(allArticles)} />
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

      {articles.length === 0 && <p>No guides match that search yet.</p>}

      {hubs.map((hub) => (
        <section key={hub.name} aria-labelledby={`hub-${hub.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
          <h2 id={`hub-${hub.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}>{hub.name}</h2>
          <div className="article-grid">
            {hub.articles.map((article) => (
              <article key={article.slug} className="article-card">
                <p className="meta-text">{article.category}</p>
                <h3>
                  <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                </h3>
                <p>{article.description}</p>
                <p className="meta-text">{article.readingTime}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
