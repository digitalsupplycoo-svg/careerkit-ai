import type { Metadata } from "next";
import JobTrackerTool from "@/components/JobTrackerTool";

// Intentionally noindex: this page shows the visitor's own private, locally
// stored data, not publisher content, and must never carry ads. See
// ADSENSE-LAUNCH-CHECKLIST.md item 5 and scripts/audit-adsense.mjs.
export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications privately in your own browser.",
  robots: { index: false, follow: false }
};

export default function JobTrackerPage() {
  return (
    <div className="page-container">
      <h1>Job Application Tracker</h1>
      <p>
        This tracker stores your entries only in this browser&apos;s local storage. Nothing is sent to a server, and
        no advertising appears on this page.
      </p>
      <JobTrackerTool />
    </div>
  );
}
