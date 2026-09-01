import ResumeKeywordMatcherTool from "@/components/ResumeKeywordMatcherTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("resume-keyword-matcher");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Resume Keyword Matcher",
  description:
    "Compare your resume text against a job description's most frequent terms, entirely in your browser."
});

const FAQS = [
  {
    question: "Does this tool understand meaning, or just match exact words?",
    answer:
      "Just word-frequency counting, not natural-language understanding. It won't recognize that \"managed a team\" and \"led a team\" mean roughly the same thing — a missing exact term isn't automatically a real gap."
  },
  {
    question: "Is my resume or the job description stored anywhere?",
    answer:
      "No. The text you paste stays in your browser's memory for the session only. Closing or refreshing the tab clears it completely."
  },
  {
    question: "Should I add every missing term it finds to my resume?",
    answer:
      "No — treat the list as questions to ask yourself, not a checklist to mechanically insert. Only add a term if it genuinely reflects your experience."
  }
];

export default function ResumeKeywordMatcherPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Resume Keyword Matcher</h1>
      <p>
        Paste a job description and your resume text to see which frequently used terms from the posting also
        appear in your resume. This runs entirely in your browser — nothing is uploaded or stored. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for details on what this tool can and can&apos;t tell you.
      </p>

      <ResumeKeywordMatcherTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>What this tool actually does</h2>
        <p>
          It counts how often each meaningful word appears in the job description, takes the 30 most frequent
          ones (filtering out common connector words like &quot;the&quot; or &quot;and&quot;), and checks whether each also
          appears somewhere in your resume text. That&apos;s the entire method — plain word-frequency counting, not
          natural-language understanding. It doesn&apos;t know that &quot;managed a team&quot; and &quot;led a team&quot; mean roughly
          the same thing, so a missing term isn&apos;t automatically a real gap.
        </p>

        <h2>How to use the results</h2>
        <p>
          Treat the &quot;missing terms&quot; list as a set of questions, not a checklist to mechanically insert. For
          each one, ask: does my resume already say this a different way, and if so, is it worth using the
          posting&apos;s exact wording instead, since some applicant tracking systems match on literal keywords? Or
          is this term genuinely not reflected in my experience at all — in which case, adding it just because
          it&apos;s in the posting would be misleading, not helpful. See our guide on{" "}
          <a href="/articles/beating-applicant-tracking-systems">how applicant tracking systems actually work</a>{" "}
          for more on why exact wording sometimes matters more than it should.
        </p>

        <h2>Why local, word-based matching has real limits</h2>
        <p>
          This tool can&apos;t assess whether your resume is well written, whether your bullet points show real
          impact, or whether you&apos;re a good fit for the role — only whether specific words show up in both
          texts. A resume that mechanically repeats every term from a job posting without genuine, specific
          detail behind it usually reads worse to a human reviewer, even if it would score well here. Use it as
          one input among several, not a pass/fail test.
        </p>

        <h2>Privacy</h2>
        <p>
          The text you paste into either box stays in your browser&apos;s memory for this session only. It is not
          transmitted to a server, logged, or stored — closing or refreshing the tab clears it completely.
        </p>

        <h2>Related guides</h2>
        <p>
          See <a href="/articles/writing-resume-bullet-points-that-show-impact">writing resume bullet points that show impact</a>{" "}
          and <a href="/articles/choosing-a-resume-format">choosing a resume format</a>.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="keyword-matcher-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
