import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Limits on the career, salary, and interview guidance provided by CareerKit AI."
};

export default function DisclaimerPage() {
  return (
    <div className="page-container article-content">
      <h1>Disclaimer</h1>
      <p>Last updated: 2026-07-24</p>

      <h2>Educational content only</h2>
      <p>
        Guides on CareerKit AI reflect general practices in resume writing, interviewing, and job searching. They
        are not a guarantee of interviews, offers, or any specific salary outcome. Hiring practices vary widely by
        employer, industry, region, and role.
      </p>

      <h2>Salary Range Estimator</h2>
      <p>
        Figures produced by the Salary Range Estimator are rough, formula-based educational estimates built from
        inputs you provide. They are not financial, tax, or legal advice, and should not be treated as a
        guaranteed or verified market rate. Always cross-check with current, role-specific data before relying on
        a number in a negotiation.
      </p>

      <h2>Honesty in applications</h2>
      <p>
        Our resume and interview guidance assumes truthful representation of your experience, skills, and
        qualifications. We do not support fabricating work history, credentials, or test results, and our tools
        are not designed to help with dishonest applications or assessment cheating.
      </p>

      <h2>No employment relationship</h2>
      <p>
        CareerKit AI is not a staffing agency, recruiter, or employer, and using this site does not create any
        employment or advisory relationship between you and CareerKit AI.
      </p>
    </div>
  );
}
