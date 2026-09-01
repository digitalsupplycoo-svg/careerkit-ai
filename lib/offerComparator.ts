// Pure scoring logic for the Job Offer Comparator. Every category is scored
// as a RELATIVE share between the two offers (not against some absolute
// external benchmark, which the tool has no access to) and combined with
// fixed, visible weights — so the result is fully explainable from the
// numbers the user typed in.

export interface JobOffer {
  label: string;
  annualSalary: number;
  annualBonus: number;
  remoteDaysPerWeek: number; // 0–5
  commuteMinutesOneWay: number; // 0 for fully remote
  growthRating: number; // 1–5, user's own judgment
  cultureRating: number; // 1–5, user's own judgment
}

export type OfferWinner = "A" | "B" | "tie";

export interface OfferCategoryResult {
  category: string;
  label: string;
  valueA: string;
  valueB: string;
  winner: OfferWinner;
  weight: number;
}

export interface OfferComparisonResult {
  rows: OfferCategoryResult[];
  scoreA: number;
  scoreB: number;
  overallWinner: OfferWinner;
}

const WEIGHTS = {
  compensation: 35,
  remote: 15,
  commute: 15,
  growth: 20,
  culture: 15
};

/** Relative share of `a` vs `b`, higher-is-better. Returns [shareA, shareB] each 0–100, splitting evenly when both are 0. */
function higherIsBetterShare(a: number, b: number): [number, number] {
  if (a <= 0 && b <= 0) return [50, 50];
  const total = a + b;
  return [(a / total) * 100, (b / total) * 100];
}

/** Relative share where LOWER is better (e.g. commute time). */
function lowerIsBetterShare(a: number, b: number): [number, number] {
  const [shareBInverted, shareAInverted] = higherIsBetterShare(a, b);
  return [shareAInverted, shareBInverted];
}

function winnerFromValues(a: number, b: number, higherWins: boolean): OfferWinner {
  if (a === b) return "tie";
  if (higherWins) return a > b ? "A" : "B";
  return a < b ? "A" : "B";
}

export function compareOffers(offerA: JobOffer, offerB: JobOffer): OfferComparisonResult {
  const totalCompA = offerA.annualSalary + offerA.annualBonus;
  const totalCompB = offerB.annualSalary + offerB.annualBonus;
  const [compShareA, compShareB] = higherIsBetterShare(totalCompA, totalCompB);

  const [remoteShareA, remoteShareB] = higherIsBetterShare(offerA.remoteDaysPerWeek, offerB.remoteDaysPerWeek);

  const [commuteShareA, commuteShareB] = lowerIsBetterShare(
    offerA.commuteMinutesOneWay,
    offerB.commuteMinutesOneWay
  );

  const [growthShareA, growthShareB] = higherIsBetterShare(offerA.growthRating, offerB.growthRating);

  const [cultureShareA, cultureShareB] = higherIsBetterShare(offerA.cultureRating, offerB.cultureRating);

  const rows: OfferCategoryResult[] = [
    {
      category: "compensation",
      label: "Total annual compensation (salary + bonus)",
      valueA: `$${totalCompA.toLocaleString()}`,
      valueB: `$${totalCompB.toLocaleString()}`,
      winner: winnerFromValues(totalCompA, totalCompB, true),
      weight: WEIGHTS.compensation
    },
    {
      category: "remote",
      label: "Remote days per week",
      valueA: `${offerA.remoteDaysPerWeek}`,
      valueB: `${offerB.remoteDaysPerWeek}`,
      winner: winnerFromValues(offerA.remoteDaysPerWeek, offerB.remoteDaysPerWeek, true),
      weight: WEIGHTS.remote
    },
    {
      category: "commute",
      label: "One-way commute (minutes)",
      valueA: `${offerA.commuteMinutesOneWay}`,
      valueB: `${offerB.commuteMinutesOneWay}`,
      winner: winnerFromValues(offerA.commuteMinutesOneWay, offerB.commuteMinutesOneWay, false),
      weight: WEIGHTS.commute
    },
    {
      category: "growth",
      label: "Growth potential (1–5, your rating)",
      valueA: `${offerA.growthRating}/5`,
      valueB: `${offerB.growthRating}/5`,
      winner: winnerFromValues(offerA.growthRating, offerB.growthRating, true),
      weight: WEIGHTS.growth
    },
    {
      category: "culture",
      label: "Culture fit (1–5, your rating)",
      valueA: `${offerA.cultureRating}/5`,
      valueB: `${offerB.cultureRating}/5`,
      winner: winnerFromValues(offerA.cultureRating, offerB.cultureRating, true),
      weight: WEIGHTS.culture
    }
  ];

  const scoreA =
    (compShareA * WEIGHTS.compensation +
      remoteShareA * WEIGHTS.remote +
      commuteShareA * WEIGHTS.commute +
      growthShareA * WEIGHTS.growth +
      cultureShareA * WEIGHTS.culture) /
    100;

  const scoreB =
    (compShareB * WEIGHTS.compensation +
      remoteShareB * WEIGHTS.remote +
      commuteShareB * WEIGHTS.commute +
      growthShareB * WEIGHTS.growth +
      cultureShareB * WEIGHTS.culture) /
    100;

  const roundedA = Math.round(scoreA * 10) / 10;
  const roundedB = Math.round(scoreB * 10) / 10;

  return {
    rows,
    scoreA: roundedA,
    scoreB: roundedB,
    overallWinner: roundedA === roundedB ? "tie" : roundedA > roundedB ? "A" : "B"
  };
}
