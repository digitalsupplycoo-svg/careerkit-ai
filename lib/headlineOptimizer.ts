// Pure analysis + suggestion logic for the LinkedIn Headline Optimizer tool.
// No AI model, no external data — just heuristics anyone could check by hand,
// kept in one place so they're unit-testable without a DOM.

export const POWER_WORDS = [
  "driving",
  "building",
  "leading",
  "scaling",
  "delivering",
  "architecting",
  "transforming",
  "optimizing",
  "launching",
  "mentoring",
  "growing",
  "shipping"
];

const GENERIC_PHRASES = [
  "seeking new opportunities",
  "looking for work",
  "looking for a job",
  "unemployed",
  "open to work",
  "aspiring",
  "job seeker",
  "in transition"
];

const IDEAL_MIN_LENGTH = 20;
const IDEAL_MAX_LENGTH = 220; // LinkedIn's hard headline character cap
const SEARCH_RESULT_PREVIEW_LENGTH = 60; // roughly what shows before truncation in feeds/search

export interface HeadlineAnalysis {
  length: number;
  withinLinkedInLimit: boolean;
  tooShort: boolean;
  truncatesInPreview: boolean;
  hasSeparator: boolean;
  hasPowerWord: boolean;
  hasNumbers: boolean;
  genericPhrasesFound: string[];
  /** 0–100, heuristic only — not a claim about actual recruiter search ranking. */
  score: number;
}

export function analyzeHeadline(headline: string): HeadlineAnalysis {
  const trimmed = headline.trim();
  const lower = trimmed.toLowerCase();
  const length = trimmed.length;

  const hasSeparator = /[|•·]/.test(trimmed) || /\s-\s/.test(trimmed);
  const hasPowerWord = POWER_WORDS.some((word) => lower.includes(word));
  const hasNumbers = /\d/.test(trimmed);
  const genericPhrasesFound = GENERIC_PHRASES.filter((phrase) => lower.includes(phrase));
  const tooShort = length > 0 && length < IDEAL_MIN_LENGTH;
  const withinLinkedInLimit = length <= IDEAL_MAX_LENGTH;
  const truncatesInPreview = length > SEARCH_RESULT_PREVIEW_LENGTH;

  let score = 100;
  if (length === 0) score = 0;
  if (tooShort) score -= 20;
  if (!withinLinkedInLimit) score -= 15;
  if (!hasSeparator) score -= 15;
  if (!hasPowerWord) score -= 15;
  if (genericPhrasesFound.length > 0) score -= 25;
  if (!hasNumbers) score -= 10;
  score = Math.max(0, Math.min(100, score));

  return {
    length,
    withinLinkedInLimit,
    tooShort,
    truncatesInPreview,
    hasSeparator,
    hasPowerWord,
    hasNumbers,
    genericPhrasesFound,
    score
  };
}

/** Pulls a rough "role" guess from the first segment before a separator, so suggestions have something concrete to build on. */
export function extractRoleGuess(headline: string): string {
  const cleaned = headline.trim();
  if (!cleaned) return "Professional";
  const firstSegment = cleaned.split(/[|•·\n]|\s-\s|,/)[0].trim();
  if (!firstSegment) return "Professional";
  return firstSegment.length > 60 ? firstSegment.slice(0, 60).trim() : firstSegment;
}

export interface HeadlineSuggestion {
  id: string;
  label: string;
  headline: string;
}

/**
 * Returns 5 rewritten headline TEMPLATES seeded with a role guessed from the
 * user's current headline. These intentionally include bracketed placeholders
 * ([audience], [outcome], etc.) rather than invented specifics — the tool has
 * no way to know your real accomplishments, so it teaches the structure
 * instead of fabricating claims on your behalf.
 */
export function suggestHeadlines(headline: string): HeadlineSuggestion[] {
  const role = extractRoleGuess(headline);
  const powerWord = POWER_WORDS[role.length % POWER_WORDS.length];
  const capitalizedPowerWord = powerWord.charAt(0).toUpperCase() + powerWord.slice(1);

  return [
    {
      id: "audience-outcome",
      label: "Audience + outcome",
      headline: `${role} | Helping [audience] achieve [specific outcome]`
    },
    {
      id: "power-word-lead",
      label: "Power word lead",
      headline: `${capitalizedPowerWord} ${role.toLowerCase()} focused on [key result or metric]`
    },
    {
      id: "skills-stack",
      label: "Skills stack",
      headline: `${role} | [Skill 1] • [Skill 2] • [Skill 3]`
    },
    {
      id: "specialty-credential",
      label: "Specialty + credential",
      headline: `${role} — [X years] in [specialty] | [Notable certification or tool]`
    },
    {
      id: "open-to",
      label: "Open-to, without sounding unemployed",
      headline: `${role} | Open to [role type] roles in [industry]`
    }
  ];
}
