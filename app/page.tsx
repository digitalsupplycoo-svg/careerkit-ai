import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  description:
    "Free, original career guides and practical tools for resumes, interviews, salary negotiation, and job search strategy."
};

export default function HomePage() {
  const articles = getAllArticles().slice(0, 6);

  return (
    <>
      <section className="hero">
        <h1>Practical career guidance, without the fluff</h1>
        <p>
          CareerKit AI publishes original, example-driven guides on resumes, interviews, and job search strategy,
          plus free tools you can use without creating an account.
        </p>
      </section>

      <div className="page-container">
        <AdSlot id="home-below-hero" />

        <h2>Latest guides</h2>
        <div className="article-grid">
          {articles.map((article) => (
            <article key={article.slug} className="article-card">
              <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{article.category}</p>
              <h3>
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.description}</p>
              <p style={{ fontSize: "0.8rem", color: "var(--color-muted)" }}>{article.readingTime}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          <Link href="/articles">Browse all guides →</Link>
        </p>

        <h2>Free tools</h2>
        <div className="article-grid">
          <div className="article-card">
            <h3><Link href="/tools/resume-checklist-generator">Resume Checklist Generator</Link></h3>
            <p>Answer a few questions and get a tailored, printable pre-submission checklist for your resume.</p>
          </div>
          <div className="article-card">
            <h3><Link href="/tools/salary-estimator">Salary Range Estimator</Link></h3>
            <p>A transparent, formula-based estimate to help you set a negotiation range — not financial advice.</p>
          </div>
          <div className="article-card">
            <h3><Link href="/tools/resume-keyword-matcher">Resume Keyword Matcher</Link></h3>
            <p>Compare your resume against a job description&apos;s most frequent terms, entirely in your browser.</p>
          </div>
          <div className="article-card">
            <h3><Link href="/tools/job-tracker">Job Application Tracker</Link></h3>
            <p>Track applications locally in your browser. Nothing is sent to a server.</p>
          </div>
        </div>
      </div>
    </>
  );
}
