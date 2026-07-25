// Central registry of the site's free tools, used for internal linking,
// structured data, the sitemap, and the homepage tool cards — so tool
// metadata is defined once.

export type ToolIconName = "checklist" | "salary" | "keyword" | "tracker";

export interface ToolMeta {
  slug: string;
  path: string;
  name: string;
  shortDescription: string;
  /** False for tools that are intentionally noindex (private, per-user data). */
  indexable: boolean;
  icon: ToolIconName;
  /** One line, benefit-first — for the homepage tool card, distinct from shortDescription. */
  benefit: string;
  /** Honest, rounded estimate of hands-on time, e.g. "2 min". */
  estimatedTime: string;
  /**
   * Featured as the primary homepage/header CTA. This is an editorial choice
   * (broadest applicability — nearly every job seeker needs a resume check),
   * not a claim backed by real usage analytics. Swap to whichever tool
   * actual usage data shows is most-used once that data exists.
   */
  featured: boolean;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "resume-checklist-generator",
    path: "/tools/resume-checklist-generator",
    name: "Resume Checklist Generator",
    shortDescription: "A tailored, printable pre-submission resume checklist based on your experience level.",
    indexable: true,
    icon: "checklist",
    benefit: "Catch resume mistakes before a recruiter does",
    estimatedTime: "2 min",
    featured: true
  },
  {
    slug: "salary-estimator",
    path: "/tools/salary-estimator",
    name: "Salary Range Estimator",
    shortDescription: "A transparent, formula-based salary range estimate to help you prepare for a negotiation.",
    indexable: true,
    icon: "salary",
    benefit: "Walk into a negotiation with a real number",
    estimatedTime: "1 min",
    featured: false
  },
  {
    slug: "resume-keyword-matcher",
    path: "/tools/resume-keyword-matcher",
    name: "Resume Keyword Matcher",
    shortDescription: "Compare your resume text against a job description's most frequent terms, in your browser.",
    indexable: true,
    icon: "keyword",
    benefit: "See which keywords your resume is missing",
    estimatedTime: "3 min",
    featured: false
  },
  {
    slug: "job-tracker",
    path: "/tools/job-tracker",
    name: "Job Application Tracker",
    shortDescription: "Track your job applications privately in your own browser.",
    indexable: false,
    icon: "tracker",
    benefit: "Stop losing track of where you've applied",
    estimatedTime: "1 min to start",
    featured: false
  }
];

export function getTool(slug: string): ToolMeta {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool slug: ${slug}`);
  return tool;
}

export function getFeaturedTool(): ToolMeta {
  const tool = TOOLS.find((t) => t.featured);
  if (!tool) throw new Error("No featured tool configured");
  return tool;
}
