import SalaryEstimatorTool from "@/components/SalaryEstimatorTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("salary-estimator");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Salary Range Estimator",
  description: "A transparent, formula-based salary range estimate to help you prepare for a negotiation."
});

const FAQS = [
  {
    question: "Where does the salary formula get its data from?",
    answer:
      "Only from the base figure, years of experience, and skills you enter — the tool has no external salary database. Your base number needs to come from a real source, like the posting itself or a role-specific survey."
  },
  {
    question: "Is this tool's output financial or legal advice?",
    answer: "No. It's an educational estimate, not financial, tax, or legal advice — see our Disclaimer for details."
  },
  {
    question: "Is my input data stored anywhere?",
    answer: "No. The calculation runs entirely in your browser and nothing you enter is sent to a server."
  }
];

export default function SalaryEstimatorPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Salary Range Estimator</h1>
      <p>
        This tool applies a simple, visible formula to a posted or typical salary figure you provide. It is an
        educational estimate, not financial, tax, or legal advice, and not a substitute for real market data. See
        our <a href="/disclaimer">Disclaimer</a> for details.
      </p>

      <SalaryEstimatorTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>How the calculation works</h2>
        <p>
          Starting from the base figure you enter, the tool adds a small percentage for each year of relevant
          experience (capped at 15 years) and a small percentage for each in-demand skill you report having
          (capped at 5). It then builds a range roughly 7% below and 10% above that adjusted figure, since real
          offers rarely land on a single exact number.
        </p>

        <h2>Where to get the base number</h2>
        <p>
          The tool is only as good as the number you start with. Pull a base figure from the actual job posting
          when a range is listed, a recent, role-specific salary survey, or conversations with people currently
          working in similar roles in your region — not from your own last salary alone, which may not reflect
          current market rates.
        </p>

        <h2>Example</h2>
        <p>
          If postings for a role in your area cluster around $70,000, you have four years of relevant experience,
          and two skills the postings specifically call out, the tool adds roughly 6% for experience and 4% for
          skills — landing an anchor point near $77,000 and a range of about $71,500 to $84,500. You&apos;d open a
          negotiation near the top of that range, not the middle.
        </p>

        <h2>Limitations</h2>
        <p>
          The formula doesn&apos;t know your specific employer&apos;s pay bands, your location&apos;s true cost of labor, or how
          competitive the specific hiring process is. Treat the output as a starting anchor to sanity-check
          against real data, not as a number to quote as if it were independently verified.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guides on <a href="/articles/negotiating-salary-after-a-job-offer">negotiating salary after a job offer</a>{" "}
          and <a href="/articles/how-to-ask-for-a-raise">how to ask for a raise without threatening to quit</a>.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="salary-tool-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
