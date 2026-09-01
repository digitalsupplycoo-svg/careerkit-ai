import CoverLetterGeneratorTool from "@/components/CoverLetterGeneratorTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("cover-letter");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Cover Letter Generator",
  description: "Generate three distinct cover letter drafts from a company, job title, and your key skills — free, in your browser."
});

const FAQS = [
  {
    question: "Are these letters written by AI?",
    answer:
      "No. The three drafts come from fixed templates that rearrange the details you enter — the company, job title, your skills, and your chosen tone — into three different structural approaches. There's no AI model and nothing is generated dynamically from your resume or any outside data."
  },
  {
    question: "Can I send a draft exactly as generated?",
    answer:
      "You shouldn't. Each draft is a structural starting point meant to save you from a blank page, not a finished letter. Read it fully, replace any bracketed placeholders, add a specific detail about the role or company, and make sure it sounds like you before sending it."
  },
  {
    question: "Is my information stored or sent anywhere?",
    answer: "No. Everything is generated and rendered in your browser. Refreshing the page clears all fields."
  },
  {
    question: "Why three different drafts instead of one?",
    answer:
      "Different roles and companies respond better to different openings — some readers prefer skills stated up front, others respond better to a clear sense of ownership or genuine interest in the company. Having three structural starting points lets you pick whichever framing fits the job you're applying to."
  }
];

export default function CoverLetterPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Cover Letter Generator</h1>
      <p>
        Enter the company, job title, your three strongest relevant skills, and a tone, and this tool builds three
        structurally different draft letters. They are starting points to edit, not finished letters to submit —
        see our guide on{" "}
        <a href="/articles/how-to-write-a-cover-letter-that-gets-read">writing a cover letter that gets read</a> for
        how to make one genuinely yours.
      </p>

      <CoverLetterGeneratorTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>How to use these drafts well</h2>
        <p>
          Start by picking the structural approach that fits the role: skills-first works well when a posting lists
          specific technical requirements, ownership-first works well for roles that emphasize autonomy or
          leadership, and company-first works well when you have a genuine, specific reason for wanting to work at
          that particular company. Whichever you pick, replace generic language with one concrete detail — a
          project, a number, a specific reason you looked into the company — before you send it.
        </p>

        <h2>What this tool can&apos;t do for you</h2>
        <p>
          It doesn&apos;t know your actual work history, so it can&apos;t cite a real accomplishment on your behalf. It
          also can&apos;t judge whether a company culture fits you, or whether your tone matches how that specific
          organization communicates. Treat the output as a structural skeleton, not a substitute for knowing why
          you actually want the job.
        </p>

        <h2>Example</h2>
        <p>
          Entering &quot;Bright Path Learning&quot;, &quot;Customer Success Manager&quot;, and the skills
          &quot;client onboarding&quot;, &quot;Salesforce&quot;, and &quot;conflict resolution&quot; with a formal
          tone produces three letters that each open differently — one leading with those three skills directly,
          one leading with a track record of ownership, and one leading with interest in the company specifically —
          all closing with a request for a conversation.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guides on{" "}
          <a href="/articles/how-to-write-a-cover-letter-that-gets-read">writing a cover letter that gets read</a>{" "}
          and <a href="/articles/writing-resume-bullet-points-that-show-impact">writing resume bullet points that show impact</a>,
          which pairs well with the specific skill you highlight here.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="cover-letter-tool-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
