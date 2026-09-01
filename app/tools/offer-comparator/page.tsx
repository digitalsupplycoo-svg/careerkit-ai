import OfferComparatorTool from "@/components/OfferComparatorTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("offer-comparator");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Job Offer Comparator",
  description: "Compare two job offers side by side across salary, bonus, remote days, commute, growth, and culture — with a transparent, weighted winner."
});

const FAQS = [
  {
    question: "How is the overall winner calculated?",
    answer:
      "Each of the 5 categories is scored as a relative share between your two offers (not against some external benchmark), then combined using fixed weights: compensation 35%, remote flexibility 15%, commute 15%, growth potential 20%, culture fit 15%. The full breakdown table shows exactly how each category was scored."
  },
  {
    question: "Where do the growth and culture ratings come from?",
    answer:
      "From you. The tool has no independent way to assess a company's growth trajectory or culture — you rate each 1–5 based on your own research and interview impressions, and the tool just weighs those ratings alongside the harder numbers."
  },
  {
    question: "Should I make my decision based purely on this score?",
    answer:
      "No. Treat it as a structured way to see trade-offs you might otherwise weigh inconsistently in your head, not a verdict. A number you can't live with personally should override any score. See our Disclaimer for details."
  },
  {
    question: "Is my offer data stored or sent anywhere?",
    answer: "No. Everything is calculated in your browser and nothing you enter is transmitted or saved."
  }
];

export default function OfferComparatorPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Job Offer Comparator</h1>
      <p>
        Enter the numbers for two offers — salary, bonus, remote days, commute, and your own growth and culture
        ratings — to see a transparent, weighted comparison. Pairs well with our guide on{" "}
        <a href="/articles/evaluating-a-job-offer-beyond-salary">evaluating a job offer beyond salary</a>.
      </p>

      <OfferComparatorTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>Why weight anything other than salary?</h2>
        <p>
          Two offers with a $10,000 salary gap can flip in your actual preference once you account for a
          90-minute-shorter daily commute or three more remote days a week — both of which have a real, ongoing
          cost or benefit that a single salary number hides. Weighting multiple factors forces those trade-offs
          into the open instead of letting the biggest, most visible number silently win by default.
        </p>

        <h2>How to use the growth and culture ratings honestly</h2>
        <p>
          These two fields are the most subjective inputs in the tool, so treat them carefully: base them on
          specific signals from your research and interviews (stated promotion timelines, how current employees
          describe the team, how the interviewers themselves talked about their work) rather than a general gut
          feeling about the company&apos;s reputation.
        </p>

        <h2>Example</h2>
        <p>
          Offer A pays $130,000 with a $5,000 bonus, 2 remote days, a 40-minute commute, and 4/5 on both growth and
          culture. Offer B pays $120,000 with no bonus, 5 remote days, a 0-minute commute, and 3/5 on both. Despite
          the $15,000 gap in total compensation, Offer B&apos;s advantage in remote flexibility and commute can be
          enough to close — or even flip — the overall score, depending on how much weight those categories carry.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guides on <a href="/articles/evaluating-a-job-offer-beyond-salary">evaluating a job offer beyond salary</a>{" "}
          and <a href="/articles/negotiating-salary-after-a-job-offer">negotiating salary after a job offer</a>.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="offer-comparator-tool-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
