import type { Metadata } from "next";
import ResumeChecklistTool from "@/components/ResumeChecklistTool";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Resume Checklist Generator",
  description: "Get a tailored, printable pre-submission resume checklist based on your experience level."
};

export default function ResumeChecklistPage() {
  return (
    <div className="page-container">
      <h1>Resume Checklist Generator</h1>
      <p>
        Answer two quick questions and get a checklist tailored to your experience level. Everything runs in your
        browser — nothing you enter is sent to a server.
      </p>

      <ResumeChecklistTool />

      <div className="article-content" style={{ marginTop: 40, padding: 0 }}>
        <h2>How this tool works</h2>
        <p>
          The generator combines a base set of formatting and proofreading checks that apply to almost any resume
          with a smaller set of checks specific to your experience level and whether you&apos;re applying through
          systems that use resume-screening software (an Applicant Tracking System, or ATS). It doesn&apos;t read your
          actual resume file — it&apos;s a checklist to run through yourself, not an automated grader.
        </p>

        <h2>How to use the results</h2>
        <p>
          Go through the list with your resume open next to it. Treat each item as a yes/no check rather than a
          score. If you can&apos;t check a box, that&apos;s the specific thing to fix before you submit — not a signal to
          rewrite the whole document.
        </p>

        <h2>Example</h2>
        <p>
          A mid-career applicant targeting ATS-heavy job boards will see items about quantified bullet points,
          trimming older roles, and matching keywords from the job posting — because those are the failure points
          most likely to sink an otherwise strong resume in that situation. A new graduate will instead see items
          about coursework and internship framing, since they usually don&apos;t have five years of bullet points to
          trim yet.
        </p>

        <h2>Limitations</h2>
        <p>
          This is a formatting and completeness checklist, not a guarantee of an interview. It can&apos;t evaluate
          whether your accomplishments are compelling, whether your resume matches a specific job&apos;s requirements
          in depth, or how a specific company&apos;s ATS will parse your file. For that, compare your resume directly
          against the job posting&apos;s language.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guides on <a href="/articles/writing-resume-bullet-points-that-show-impact">writing resume bullet points that show impact</a>{" "}
          and <a href="/articles/beating-applicant-tracking-systems">how applicant tracking systems actually work</a>.
        </p>
      </div>

      <div className="article-content" style={{ padding: 0 }}>
        <AdSlot id="resume-tool-below-content" />
      </div>
    </div>
  );
}
