import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { TOOLS, getFeaturedTool } from "@/lib/tools";
import { HOME_STATS } from "@/lib/homeStats";
import AdSlot from "@/components/AdSlot";
import Faq from "@/components/Faq";
import ToolIcon from "@/components/ToolIcon";
import HeroChecklistTeaser from "@/components/HeroChecklistTeaser";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/",
  description:
    "Free, original career guides and practical tools for resumes, interviews, salary negotiation, and job search strategy."
});

const HOME_FAQS = [
  {
    question: "Is CareerKit AI free to use?",
    answer:
      "Yes. Every guide and every tool — the Resume Checklist Generator, Salary Range Estimator, Resume Keyword Matcher, and Job Application Tracker — is free, with no account or sign-up required."
  },
  {
    question: "Do the tools send my resume or personal data to a server?",
    answer:
      "No. All four tools run their calculations directly in your browser. Nothing you type or upload is transmitted to or stored on a CareerKit AI server."
  },
  {
    question: "Who writes the guides?",
    answer:
      "Every guide is written specifically for this site by the CareerKit AI Editorial Team — none of it is copied, spun, or auto-generated from a template. See our Editorial Policy for details."
  },
  {
    question: "How often is content updated?",
    answer:
      "Guides list the date they were last substantively updated. We revisit guides when practices change or when we spot something worth correcting or expanding."
  }
];

export default function HomePage() {
  const articles = getAllArticles().slice(0, 6);
  const featuredTool = getFeaturedTool();

  return (
    <>
      <section className="hero">
        <h1>Know your resume works — before you hit submit</h1>
        <p>
          Free, browser-based tools built for job seekers — no signup, nothing uploaded to a server. Start with the
          tool most people reach for first.
        </p>
        <div className="hero-actions">
          <Link href={featuredTool.path} className="btn-primary btn-lg">
            Try the {featuredTool.name} — free
          </Link>
          <Link href="/articles" className="hero-secondary-link">
            or browse all guides →
          </Link>
        </div>

        <HeroChecklistTeaser />
      </section>

      <section className="stats-bar">
        <div className="stats-bar-inner">
          {HOME_STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
          <div className="stat">
            <span className="stat-value">{getAllArticles().length}</span>
            <span className="stat-label">original guides, zero filler</span>
          </div>
        </div>
      </section>

      <div className="page-container">
        <AdSlot id="home-below-hero" />

        <h2>Free tools</h2>
        <div className="article-grid">
          {TOOLS.map((tool) => (
            <div className="article-card" key={tool.slug}>
              <div className="tool-card-icon">
                <ToolIcon name={tool.icon} />
              </div>
              <h3><Link href={tool.path}>{tool.name}</Link></h3>
              <p>{tool.benefit}</p>
              <div className="tool-card-meta">
                <span className="badge">No signup required</span>
                <span className="tool-card-time">{tool.estimatedTime}</span>
              </div>
            </div>
          ))}
        </div>

        <h2>Latest guides</h2>
        <div className="article-grid">
          {articles.map((article) => (
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
        <p style={{ marginTop: "var(--space-3)" }}>
          <Link href="/articles">Browse all guides →</Link>
        </p>

        <Faq items={HOME_FAQS} />
      </div>
    </>
  );
}
