import { CONTACT_EMAIL } from "@/lib/env";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";

const EFFECTIVE_DATE = "2026-07-24";
const LAST_UPDATED = "2026-07-26";

export const metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description: "How CareerKit AI handles data, cookies, advertising, and locally stored tool data."
});

export default function PrivacyPage() {
  return (
    <div className="page-container article-content">
      <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
      <h1>Privacy Policy</h1>
      <p>
        Effective date: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
      </p>

      <h2>What this policy covers</h2>
      <p>
        This policy explains what happens to your information when you use CareerKit AI, including our guides,
        the Resume Checklist Generator, the Salary Range Estimator, and the Job Application Tracker.
      </p>

      <h2>Advertising and cookies</h2>
      <p>
        CareerKit AI intends to display advertising served by Google and its advertising partners. Google and
        these partners may use cookies or similar technologies to serve ads based on your prior visits to this
        or other websites. You can manage how Google personalizes ads to you by visiting Google&apos;s advertising
        settings. Where a certified consent management platform is active on this site (for visitors in the EEA,
        UK, and Switzerland), no advertising cookie is set and no ad is personalized until you have made a choice
        through that tool.
      </p>

      <h2>Job Application Tracker data</h2>
      <p>
        Job entries you add to the tracker are stored only in your browser&apos;s local storage. They are not
        transmitted to, or stored on, any CareerKit AI server. Clearing your browser data or using a different
        device or browser will remove or hide this information.
      </p>

      <h2>Resume Checklist Generator and Salary Estimator</h2>
      <p>
        These tools run their calculations in your browser. The text and answers you enter are processed locally
        and are not sent to a server for storage or analysis unless a clearly labeled server-based feature is
        introduced in the future and you actively choose to use it.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Vercel Web Analytics to see aggregate traffic patterns for this site, such as how many people
        visit a given page. It does not use cookies, does not collect personally identifiable information, and
        does not track you across other websites. We only see anonymous, aggregated counts — never an
        individual visitor&apos;s activity.
      </p>

      <h2>Server logs</h2>
      <p>
        Our hosting provider may automatically log basic technical information about requests to this site, such
        as IP address, browser type, and page requested, for security and reliability purposes.
      </p>

      <h2>Your choices</h2>
      <p>
        You can control cookies through your browser settings, manage ad personalization through Google&apos;s
        advertising settings, and clear locally stored tool data at any time by clearing your browser&apos;s site
        data for this domain.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the site or applicable law changes. The &quot;Last updated&quot; date above
        reflects the most recent revision. This policy is provided for transparency and does not itself guarantee
        compliance with every jurisdiction&apos;s privacy law; consult a qualified professional for legal advice
        specific to your situation.
      </p>
    </div>
  );
}
