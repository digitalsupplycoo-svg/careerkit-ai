// Pure, deterministic cover-letter generation logic — no network calls, no
// AI model, just template assembly from what the user typed in. Kept separate
// from the component so the assembly logic is unit-testable without a DOM.

export type CoverLetterTone = "formal" | "casual";

export interface CoverLetterInput {
  companyName: string;
  jobTitle: string;
  skills: [string, string, string];
  tone: CoverLetterTone;
  applicantName?: string;
}

export interface CoverLetterVariant {
  id: string;
  label: string;
  /** One-line description of the structural approach, shown above the draft. */
  approach: string;
  body: string;
}

function skillList(skills: string[], joiner: "and" | "&"): string {
  const cleaned = skills.map((s) => s.trim()).filter(Boolean);
  if (cleaned.length === 0) return "";
  if (cleaned.length === 1) return cleaned[0];
  if (cleaned.length === 2) return `${cleaned[0]} ${joiner === "and" ? "and" : "&"} ${cleaned[1]}`;
  return `${cleaned.slice(0, -1).join(", ")}, ${joiner === "and" ? "and" : "&"} ${cleaned[cleaned.length - 1]}`;
}

function signOff(name: string, tone: CoverLetterTone): string {
  const closing = tone === "formal" ? "Sincerely," : "Best,";
  return `${closing}\n${name || "[Your Name]"}`;
}

/**
 * Generates three structurally distinct drafts from the same inputs:
 * a skills-first opener, an achievement/story-first opener, and a
 * company-mission-first opener. Each is meant to be edited, not sent as-is —
 * the tool page says so explicitly.
 */
export function generateCoverLetters(input: CoverLetterInput): CoverLetterVariant[] {
  const company = input.companyName.trim() || "[Company Name]";
  const role = input.jobTitle.trim() || "[Job Title]";
  const name = (input.applicantName || "").trim();
  const skills = input.skills.map((s) => s.trim()).filter(Boolean);
  const skillsAnd = skillList(skills.length ? skills : ["[Key Skill 1]", "[Key Skill 2]", "[Key Skill 3]"], "and");
  const formal = input.tone === "formal";

  const greeting = formal ? "Dear Hiring Manager," : "Hi there,";
  const opener1 = formal
    ? `I'm writing to apply for the ${role} position at ${company}. My background in ${skillsAnd} lines up closely with what this role requires, and I'd welcome the chance to bring that experience to your team.`
    : `I saw the ${role} opening at ${company} and had to apply — my background in ${skillsAnd} is a strong match for what you're looking for, and I'd love to bring that to your team.`;

  const body1 = formal
    ? `Over the course of my career, I've built hands-on depth in ${skillsAnd}. I've used these skills to solve real problems for the teams I've worked with, and I'm confident I could do the same at ${company}. What draws me to this particular role is the opportunity to apply that experience somewhere the work clearly matters.`
    : `I've spent my career getting genuinely good at ${skillsAnd}, and I like using those skills to actually move things forward, not just check a box. What makes this role interesting to me is the chance to do that somewhere the work clearly matters.`;

  const close1 = formal
    ? `I'd welcome the opportunity to discuss how my background in ${skillsAnd} could contribute to ${company}. Thank you for your time and consideration.`
    : `I'd love the chance to talk more about how my experience with ${skillsAnd} could help your team. Thanks for taking the time to read this.`;

  const variant1: CoverLetterVariant = {
    id: "skills-first",
    label: "Skills-first",
    approach: "Leads with your strongest skills, then connects them directly to the role.",
    body: `${greeting}\n\n${opener1}\n\n${body1}\n\n${close1}\n\n${signOff(name, input.tone)}`
  };

  const opener2 = formal
    ? `When I found the ${role} opening at ${company}, it stood out immediately — it's the kind of role where my strengths in ${skillsAnd} can have a direct, visible impact.`
    : `The ${role} role at ${company} caught my eye right away — it's exactly the kind of work where I can put ${skillsAnd} to good use.`;

  const body2 = formal
    ? `In my previous roles, I've consistently been the person who takes ownership of hard problems and sees them through. That habit, paired with concrete skills in ${skillsAnd}, is what I'd bring to this position. I don't just want to do the job description — I want to understand what success looks like for ${company} in this role and work backward from there.`
    : `I'm the kind of person who takes ownership of a problem and doesn't let go until it's actually solved — and I back that up with real skills in ${skillsAnd}. I don't just want to tick off the job description; I want to know what winning looks like for ${company} in this role and work toward that from day one.`;

  const close2 = formal
    ? `I'd appreciate the opportunity to speak further about how I can contribute to ${company}'s goals in this role.`
    : `Would love to chat more about how I could help ${company} hit its goals in this role — let me know a good time.`;

  const variant2: CoverLetterVariant = {
    id: "achievement-first",
    label: "Ownership-first",
    approach: "Leads with how you work (ownership, follow-through), then backs it with your skills.",
    body: `${greeting}\n\n${opener2}\n\n${body2}\n\n${close2}\n\n${signOff(name, input.tone)}`
  };

  const opener3 = formal
    ? `I've followed ${company}'s work with real interest, and applying for the ${role} role felt like a natural next step given my background in ${skillsAnd}.`
    : `I've been keeping an eye on ${company} for a while now, so when the ${role} role opened up, it felt like a sign — especially given my background in ${skillsAnd}.`;

  const body3 = formal
    ? `What draws me to ${company} specifically is the direction the team is headed and the standard of work being produced. I'd like to be part of that, and I believe my experience in ${skillsAnd} would let me contribute meaningfully from early on rather than needing a long ramp-up period.`
    : `What draws me to ${company} specifically is the direction you're headed and the quality bar the team clearly holds itself to. I want to be part of that, and with ${skillsAnd} already in my toolkit, I don't think I'd need a long runway to start contributing.`;

  const close3 = formal
    ? `Thank you for considering my application. I look forward to the possibility of contributing to ${company}'s continued success.`
    : `Thanks for considering my application — hope to talk soon about how I can help ${company} keep doing great work.`;

  const variant3: CoverLetterVariant = {
    id: "company-first",
    label: "Company-first",
    approach: "Leads with why this company specifically, then ties your skills to their direction.",
    body: `${greeting}\n\n${opener3}\n\n${body3}\n\n${close3}\n\n${signOff(name, input.tone)}`
  };

  return [variant1, variant2, variant3];
}
