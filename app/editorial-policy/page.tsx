import { CONTACT_EMAIL } from "@/lib/env";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";

export const metadata = buildMetadata({
  path: "/editorial-policy",
  title: "Editorial Policy",
  description: "How CareerKit AI researches, writes, reviews, and updates its guides."
});

export default function EditorialPolicyPage() {
  return (
    <div className="page-container article-content">
      <Breadcrumbs items={[{ name: "Editorial Policy" }]} />
      <h1>Editorial Policy</h1>

      <h2>Original content</h2>
      <p>
        Every guide published on CareerKit AI is written specifically for this site by the CareerKit AI Editorial
        Team. We do not publish copied, scraped, spun, auto-translated, or lightly rewritten content from other
        sources.
      </p>

      <h2>No fabricated credentials or claims</h2>
      <p>
        We do not attribute invented personal experience, research, professional credentials, statistics, or
        quotes to our writers. Where a guide references a general practice (such as a common interview format),
        it is described as general practice, not presented as a study finding unless a real, cited source is
        linked.
      </p>

      <h2>Review process</h2>
      <p>
        Guides are drafted, then reviewed for accuracy, clarity, and practical usefulness before publication.
        Each guide lists the date it was last substantively updated.
      </p>

      <h2>Sources and updates</h2>
      <p>
        When a factual or legal claim benefits from verification, we prefer primary sources such as government
        agencies and link them near the relevant passage. An updated date changes only after a substantive edit,
        not simply because a page was rebuilt or redeployed. General career advice is clearly separated from
        legal, financial, or jurisdiction-specific guidance.
      </p>

      <h2>Tool methodology and privacy</h2>
      <p>
        Each tool page explains what inputs it uses, how its calculation works, its limitations, and whether data
        leaves the browser. Our tools do not claim access to proprietary employer systems or real-time salary
        databases when they do not have it. See the <a href="/tools/salary-estimator">Salary Range Estimator</a>{" "}
        and <a href="/tools/resume-keyword-matcher">Resume Keyword Matcher</a> for examples.
      </p>

      <h2>Corrections</h2>
      <p>
        If you spot an error or an outdated recommendation, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will review and correct it.
      </p>

      <h2>Advertising independence</h2>
      <p>
        Advertising placement and revenue have no influence on which topics we cover or what a guide recommends.
        See our <a href="/advertising-disclosure">Advertising Disclosure</a>.
      </p>
    </div>
  );
}
