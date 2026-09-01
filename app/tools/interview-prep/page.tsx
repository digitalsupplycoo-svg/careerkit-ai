import InterviewPrepTool from "@/components/InterviewPrepTool";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { softwareApplicationSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/pageMetadata";
import { getTool } from "@/lib/tools";

const TOOL = getTool("interview-prep");

export const metadata = buildMetadata({
  path: TOOL.path,
  title: "Interview Prep Generator",
  description: "Generate 10 likely interview questions for your job title, seniority, and industry — each with a framework for structuring your answer, not a script."
});

const FAQS = [
  {
    question: "Does this give me answers to memorize?",
    answer:
      "No, deliberately. It gives you a framework for structuring an answer — most often a version of STAR (Situation, Task, Action, Result) — because a memorized answer that doesn't match your real experience falls apart under a follow-up question. The substance has to be yours."
  },
  {
    question: "How are the 10 questions chosen?",
    answer:
      "Five are near-universal across interviews (an opener, motivation, a behavioral conflict question, a failure question, and a prioritization question), two are tuned to the seniority level you select, one is specific to the job title you entered, one references your industry, and the last is always the closing 'do you have questions for us' prompt."
  },
  {
    question: "Is this based on real questions from real companies?",
    answer:
      "The questions are common, well-established interview formats used broadly across industries — not questions scraped or copied from any specific company's actual interview process."
  },
  {
    question: "Is my input stored anywhere?",
    answer: "No. Everything runs in your browser and nothing you type is sent to a server."
  }
];

export default function InterviewPrepPage() {
  return (
    <div className="page-container">
      <JsonLd data={softwareApplicationSchema(TOOL)} />
      <Breadcrumbs items={[{ name: "Free tools", path: "/tools" }, { name: TOOL.name }]} />
      <h1>Interview Prep Generator</h1>
      <p>
        Enter a job title, seniority level, and industry to get 10 likely interview questions, each paired with a
        framework for structuring your answer. See our guide on{" "}
        <a href="/articles/preparing-for-behavioral-interview-questions">preparing for behavioral interview questions</a>{" "}
        for more on the STAR method these frameworks build on.
      </p>

      <InterviewPrepTool />

      <div className="article-content tool-content" style={{ marginTop: "var(--space-5)" }}>
        <h2>Why frameworks, not answers</h2>
        <p>
          A generic, memorized answer is easy for an experienced interviewer to spot, and it falls apart the moment
          they ask a natural follow-up question your script didn&apos;t anticipate. A framework instead tells you
          what shape a strong answer takes — so you can walk in with a plan for organizing your own real
          experience, rather than trying to recall a script under pressure.
        </p>

        <h2>How to actually prepare with this list</h2>
        <p>
          For each question, don&apos;t just read the framework — write out a two- or three-sentence outline of your
          real answer using it, then practice saying it out loud once. The goal isn&apos;t to sound rehearsed; it&apos;s
          to make sure you&apos;re not organizing your thoughts for the first time while the interviewer is watching.
        </p>

        <h2>Example</h2>
        <p>
          For a mid-level Product Manager in fintech, this tool generates the five universal questions, two
          mid-level questions about ownership and handling disagreement, a role-specific question about your first
          90 days as a PM, an industry question about a recent fintech trend, and the closing &quot;questions for
          us&quot; prompt — 10 in total, ready to prep against.
        </p>

        <h2>Related guides</h2>
        <p>
          See our guides on{" "}
          <a href="/articles/preparing-for-behavioral-interview-questions">preparing for behavioral interview questions</a>,{" "}
          <a href="/articles/answering-tell-me-about-yourself">answering &quot;tell me about yourself&quot;</a>, and{" "}
          <a href="/articles/following-up-after-a-job-interview">following up after a job interview</a>.
        </p>
      </div>

      <div className="article-content tool-content">
        <AdSlot id="interview-prep-tool-below-content" />
      </div>

      <div className="article-content tool-content">
        <Faq items={FAQS} />
      </div>
    </div>
  );
}
