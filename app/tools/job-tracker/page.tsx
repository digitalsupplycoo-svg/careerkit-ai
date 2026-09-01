import JobTrackerTool from "@/components/JobTrackerTool";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("job-tracker");

// Intentionally noindex: this page shows the visitor's own private, locally
// stored data, not publisher content, and must never carry ads. See
// ADSENSE-LAUNCH-CHECKLIST.md item 5 and scripts/audit-adsense.mjs. No
// SoftwareApplication/FAQ schema here on purpose — structured data on a
// noindex page is never read by crawlers.
export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Job Application Tracker",
  description: "Track your job applications privately in your own browser.",
  noIndex: true
});

export default function JobTrackerPage() {
  return (
    <div className="page-container">
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Job Application Tracker</h1>
      <p>
        This tracker stores your entries only in this browser&apos;s local storage. Nothing is sent to a server, and
        no advertising appears on this page.
      </p>
      <JobTrackerTool />
    </div>
  );
}
