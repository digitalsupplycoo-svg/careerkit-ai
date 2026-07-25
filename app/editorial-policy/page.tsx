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
