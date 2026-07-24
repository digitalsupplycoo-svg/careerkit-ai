import type { Metadata } from "next";
import SalaryEstimatorTool from "@/components/SalaryEstimatorTool";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Salary Range Estimator",
  description: "A transparent, formula-based salary range estimate to help you prepare for a negotiation."
};

export default function SalaryEstimatorPage() {
  return (
    <div className="page-container">
      <h1>Salary Range Estimator</h1>
      <p>
        This tool applies a simple, visible formula to a posted or typical salary figure you provide. It is an
        educational estimate, not financial, tax, or legal advice, and not a substitute for real market data. See
        our <a href="/disclaimer">Disclaimer</a> for details.
      </p>

      <SalaryEstimatorTool />

      <div className="article-content" style={{ marginTop: 40, padding: 0 }}>
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
          See our guide on <a href="/articles/negotiating-salary-after-a-job-offer">negotiating salary after a job offer</a>.
        </p>
      </div>

      <div className="article-content" style={{ padding: 0 }}>
        <AdSlot id="salary-tool-below-content" />
      </div>
    </div>
  );
}
