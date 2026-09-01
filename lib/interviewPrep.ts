// Deterministic interview-question + answer-framework generator. Frameworks
// teach a structure (usually a variant of STAR: Situation, Task, Action,
// Result) rather than supplying a scripted answer, since this tool has no
// way to know the user's actual work history.

export type Seniority = "junior" | "mid" | "senior";

export interface InterviewPrepInput {
  jobTitle: string;
  seniority: Seniority;
  industry: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  framework: string;
}

const STAR_FRAMEWORK =
  "Use STAR: state the Situation in one sentence, the Task you were responsible for, the Action you specifically took (use \"I\", not \"we\"), and the Result, ideally with a number. Keep it under two minutes spoken.";

const SENIORITY_LABEL: Record<Seniority, string> = {
  junior: "early-career",
  mid: "mid-level",
  senior: "senior"
};

const SENIORITY_QUESTIONS: Record<Seniority, InterviewQuestion[]> = {
  junior: [
    {
      id: "junior-learning",
      category: "Growth & learning",
      question: "Tell me about a time you had to learn a new tool, system, or skill quickly. How did you approach it?",
      framework:
        "Name the specific gap, the resource or method you used to close it (a person, a doc, trial and error), and how fast you got to a usable level of competence. Avoid vague claims like \"I'm a fast learner\" without a concrete example attached."
    },
    {
      id: "junior-project",
      category: "Applied experience",
      question: "Walk me through a school, internship, or personal project you're proud of.",
      framework:
        `${STAR_FRAMEWORK} Since you may not have full-time work history, a class project, internship, or personal build is a completely valid Situation — just be specific about your individual contribution.`
    }
  ],
  mid: [
    {
      id: "mid-ownership",
      category: "Ownership",
      question: "Describe a project you owned end-to-end, from planning through delivery.",
      framework:
        `${STAR_FRAMEWORK} Emphasize the decisions that were yours to make — what you'd have done differently is a strong optional closer if the interviewer asks a follow-up.`
    },
    {
      id: "mid-disagreement",
      category: "Collaboration",
      question: "Tell me about a time you disagreed with a teammate's approach. What did you do?",
      framework:
        "Describe the specific disagreement, how you raised it (privately, with data, early rather than late), and the actual outcome — including if their approach won out. Interviewers are checking whether you can disagree productively, not whether you're always right."
    }
  ],
  senior: [
    {
      id: "senior-influence",
      category: "Influence without authority",
      question: "Describe a time you influenced a decision or outcome without having direct authority over it.",
      framework:
        "Name who you needed to convince, the case you built (data, a prototype, a pilot), and the specific outcome. This question is checking for persuasion and stakeholder management, not seniority or title."
    },
    {
      id: "senior-mentoring",
      category: "Developing others",
      question: "How do you approach mentoring or developing more junior people on your team?",
      framework:
        "Give one concrete example of someone you helped develop, what you specifically did (regular 1:1s, a stretch assignment, targeted feedback), and a visible result in their growth or output — not just a philosophy statement."
    },
    {
      id: "senior-ambiguity",
      category: "Judgment under ambiguity",
      question: "Tell me about a decision you had to make with incomplete information.",
      framework:
        "Describe the information you did and didn't have, how you decided anyway (a reasonable default, a small test, a deadline that forced a call), and what happened. Show your reasoning process, since that's what's being evaluated, not just the outcome."
    }
  ]
};

/**
 * Builds exactly 10 questions: 5 universal core questions, 2 seniority-tuned
 * questions, one role-specific question, one industry-specific question, and
 * a closing "do you have questions" prompt — always 10 total regardless of
 * seniority.
 */
export function generateInterviewQuestions(input: InterviewPrepInput): InterviewQuestion[] {
  const jobTitle = input.jobTitle.trim() || "this role";
  const industry = input.industry.trim() || "your industry";
  const level = SENIORITY_LABEL[input.seniority];

  const universal: InterviewQuestion[] = [
    {
      id: "tell-me-about-yourself",
      category: "Opener",
      question: "Tell me about yourself.",
      framework:
        "Give a present → past → future arc in under 90 seconds: what you do now, one or two relevant steps that got you here, and why this specific role is the logical next step. Don't recite your full resume."
    },
    {
      id: "why-this-role",
      category: "Motivation",
      question: `Why are you interested in this ${jobTitle} role specifically?`,
      framework:
        "Connect one thing you've researched about this specific team or company to one thing you specifically want to do more of in your career. Avoid answers that would apply equally to any job at any company."
    },
    {
      id: "conflict",
      category: "Behavioral",
      question: "Describe a time you had a conflict with a coworker or manager. How did you handle it?",
      framework: `${STAR_FRAMEWORK} Focus on the resolution, not the grievance — end on how the relationship or outcome improved.`
    },
    {
      id: "failure",
      category: "Self-awareness",
      question: "Tell me about a time you failed or made a mistake. What did you learn?",
      framework:
        "Pick a real, moderate-stakes mistake (not a trivial one, not a career-ending one), own it directly without over-explaining, and spend most of the answer on the specific change you made afterward as a result."
    },
    {
      id: "prioritization",
      category: "Working style",
      question: "How do you prioritize when you have multiple urgent things competing for your time?",
      framework:
        "Name the actual method you use (a simple framework like urgent-vs-important, checking in with your manager on priorities, timeboxing), then illustrate it with one specific recent example rather than describing it in the abstract."
    }
  ];

  const seniorityPicks = SENIORITY_QUESTIONS[input.seniority].slice(0, 2);

  const roleSpecific: InterviewQuestion = {
    id: "role-specific",
    category: "Role-specific",
    question: `What would your first 90 days as our ${jobTitle} look like?`,
    framework:
      "Structure it in phases: an initial listening/learning period, an early win you'd target, and a longer-term goal. Being explicit that you'd start by learning the team's context (not arriving with a fixed plan) reads as confident, not indecisive."
  };

  const industrySpecific: InterviewQuestion = {
    id: "industry-specific",
    category: "Industry awareness",
    question: `What's a recent trend or change in ${industry} that you think matters for a ${level} ${jobTitle}, and why?`,
    framework:
      "Name one specific, real development you've actually followed (not a vague generality like \"technology is changing fast\"), then connect it directly to how it would change the day-to-day work of this specific role."
  };

  const closing: InterviewQuestion = {
    id: "questions-for-us",
    category: "Closing",
    question: "Do you have any questions for us?",
    framework:
      "Always say yes. Ask something that couldn't be answered by reading the job posting — about how success is measured in the first 6 months, what's changed on the team recently, or a specific challenge the team is working through right now."
  };

  return [...universal, ...seniorityPicks, roleSpecific, industrySpecific, closing];
}
