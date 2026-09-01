import HeadlineOptimizerTool from "@/components/HeadlineOptimizerTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("headline-optimizer");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "LinkedIn Headline Optimizer",
  description: "Analyze your LinkedIn headline for length, structure, and power words, and get 5 optimized headline templates."
});

const FAQS = [
  {
    question: "Does this tool know LinkedIn's actual search ranking algorithm?",
    answer:
      "No — LinkedIn doesn't publish it, and no third-party tool has access to it either. This tool checks visible, checkable qualities instead: length against LinkedIn's character limits, whether you use a separator to structure ideas, whether you include an active verb, and whether generic job-search phrasing is undercutting you."
  },
  {
    question: "Why do the suggested headlines have brackets in them?",
    answer:
      "Because the tool only has your current headline to work from — it doesn't know your actual metrics, certifications, or target audience. The bracketed suggestions are proven structural templates; you fill in the real specifics so the result is accurate, not invented."
  },
  {
    question: "Is my headline sent anywhere?",
    answer: "No. The analysis runs entirely in your browser and nothing you type is transmitted or stored."
  }
];

export default function HeadlineOptimizerPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>LinkedIn Headline Optimizer</h1>
      <p>
        Paste your current headline to see how it scores on length, structure, and power words, then get five
        rewritten templates to build from. Pairs well with our guide on{" "}
        <a href="/articles/optimizing-linkedin-profile-for-recruiters">optimizing your LinkedIn profile for recruiters</a>.
      </p>

      <HeadlineOptimizerTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>Why headline structure matters</h2>
        <p>
          Your headline is the single most-viewed piece of text on your LinkedIn profile — it shows up next to your
          name in every search result, comment, and connection request, whether or not anyone ever opens your full
          profile. A headline that just restates your job title wastes that space; one that leads with a specific
          skill, outcome, or audience gives a recruiter a reason to click through.
        </p>

        <h2>What &quot;generic phrasing&quot; actually costs you</h2>
        <p>
          Phrases like &quot;seeking new opportunities&quot; tell a human reader you&apos;re job-hunting, but they
          do nothing for the keyword search recruiters actually run — nobody searches LinkedIn for &quot;seeking new
          opportunities.&quot; They search for the skill, tool, or title they need. Every word in that space is
          better spent naming the thing you want to be found for.
        </p>

        <h2>Example</h2>
        <p>
          &quot;Marketing professional seeking new opportunities&quot; scores low: no separator, no power word, no
          number, and a generic job-search phrase that costs it 25 points. Rewritten as &quot;Marketing Manager |
          Driving 40% email revenue growth | Lifecycle &amp; retention&quot;, it picks up a separator, an active
          verb, a concrete number, and a specific specialty — a much stronger score, and a headline a recruiter
          searching for &quot;lifecycle marketing&quot; could actually find.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guide on{" "}
          <a href="/articles/optimizing-linkedin-profile-for-recruiters">optimizing your LinkedIn profile for recruiters</a>{" "}
          for how your headline fits into the rest of your profile.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="headline-tool-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
