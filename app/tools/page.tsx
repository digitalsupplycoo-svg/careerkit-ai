import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import ToolIcon from "@/components/ToolIcon";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/tools",
  title: "Free Career Tools",
  description: "Every free, browser-based CareerKit AI tool in one place — resume, cover letter, LinkedIn, salary, interview, and offer tools. No signup, nothing uploaded to a server."
});

const FAQS = [
  {
    question: "Do any of these tools require an account or payment?",
    answer: "No. Every tool listed here is free and requires no signup, account, or payment of any kind."
  },
  {
    question: "Is my data sent to a server when I use these tools?",
    answer:
      "No. Every tool runs its calculations directly in your browser using JavaScript. Nothing you type, paste, or upload is transmitted to or stored on a CareerKit AI server — see each tool's own page for specifics."
  },
  {
    question: "Which tool should I start with?",
    answer:
      "If you're actively applying, start with the Resume Checklist Generator and Resume Keyword Matcher to sanity-check your resume, then use the Cover Letter Generator and Interview Prep Generator once you have a specific role you're applying to."
  }
];

export default function ToolsIndexPage() {
  const indexableTools = TOOLS.filter((tool) => tool.indexable);
  const privateTools = TOOLS.filter((tool) => !tool.indexable);

  return (
    <div className="page-container">
      <Breadcrumbs items={[{ name: "Free tools" }]} />
      <h1>Free career tools</h1>
      <p>
        Every tool below runs entirely in your browser — no signup, no upload to a server, and no account required.
        Pick the one that matches where you are in your job search.
      </p>

      <div className="article-grid">
        {indexableTools.map((tool) => (
          <div className="article-card" key={tool.slug}>
            <div className="tool-card-icon">
              <ToolIcon name={tool.icon} />
            </div>
            <h2>
              <Link href={tool.path}>{tool.name}</Link>
            </h2>
            <p>{tool.shortDescription}</p>
            <div className="tool-card-meta">
              <span className="badge">No signup required</span>
              <span className="tool-card-time">{tool.estimatedTime}</span>
            </div>
            <p style={{ marginTop: "var(--space-2)" }}>
              <Link href={tool.path}>Try it now →</Link>
            </p>
          </div>
        ))}
      </div>

      {privateTools.length > 0 && (
        <>
          <h2>Private tools</h2>
          <p>
            This tool stores data only in your own browser and is intentionally left out of search results, since
            the page shows your own private data rather than public content.
          </p>
          <div className="article-grid">
            {privateTools.map((tool) => (
              <div className="article-card" key={tool.slug}>
                <div className="tool-card-icon">
                  <ToolIcon name={tool.icon} />
                </div>
                <h2>
                  <Link href={tool.path}>{tool.name}</Link>
                </h2>
                <p>{tool.shortDescription}</p>
                <p style={{ marginTop: "var(--space-2)" }}>
                  <Link href={tool.path}>Open tool →</Link>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <AdSlot id="tools-index-below-grid" />

      <Faq items={FAQS} />
    </div>
  );
}
