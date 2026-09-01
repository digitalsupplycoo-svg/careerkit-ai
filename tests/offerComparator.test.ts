import { describe, expect, it } from "vitest";
import { compareOffers, type JobOffer } from "@/lib/offerComparator";

function makeOffer(overrides: Partial<JobOffer> = {}): JobOffer {
  return {
    label: "Offer",
    annualSalary: 100000,
    annualBonus: 5000,
    remoteDaysPerWeek: 2,
    commuteMinutesOneWay: 30,
    growthRating: 3,
    cultureRating: 3,
    ...overrides
  };
}

describe("compareOffers", () => {
  it("declares a tie when both offers are identical", () => {
    const result = compareOffers(makeOffer(), makeOffer());
    expect(result.overallWinner).toBe("tie");
    expect(result.scoreA).toBe(result.scoreB);
  });

  it("picks the higher-paying offer when only compensation differs", () => {
    const a = makeOffer({ annualSalary: 150000 });
    const b = makeOffer({ annualSalary: 100000 });
    const result = compareOffers(a, b);
    expect(result.overallWinner).toBe("A");
    const compRow = result.rows.find((r) => r.category === "compensation");
    expect(compRow?.winner).toBe("A");
  });

  it("treats a shorter commute as better", () => {
    const a = makeOffer({ commuteMinutesOneWay: 10 });
    const b = makeOffer({ commuteMinutesOneWay: 60 });
    const result = compareOffers(a, b);
    const commuteRow = result.rows.find((r) => r.category === "commute");
    expect(commuteRow?.winner).toBe("A");
  });

  it("treats more remote days as better", () => {
    const a = makeOffer({ remoteDaysPerWeek: 5 });
    const b = makeOffer({ remoteDaysPerWeek: 0 });
    const result = compareOffers(a, b);
    const remoteRow = result.rows.find((r) => r.category === "remote");
    expect(remoteRow?.winner).toBe("A");
  });

  it("returns all 5 comparison categories", () => {
    const result = compareOffers(makeOffer(), makeOffer({ annualSalary: 90000 }));
    expect(result.rows.map((r) => r.category)).toEqual(["compensation", "remote", "commute", "growth", "culture"]);
  });

  it("weights sum to 100", () => {
    const result = compareOffers(makeOffer(), makeOffer());
    const totalWeight = result.rows.reduce((sum, r) => sum + r.weight, 0);
    expect(totalWeight).toBe(100);
  });

  it("a dominant offer across every category wins overall with a higher score", () => {
    const strong = makeOffer({
      annualSalary: 200000,
      annualBonus: 20000,
      remoteDaysPerWeek: 5,
      commuteMinutesOneWay: 0,
      growthRating: 5,
      cultureRating: 5
    });
    const weak = makeOffer({
      annualSalary: 60000,
      annualBonus: 0,
      remoteDaysPerWeek: 0,
      commuteMinutesOneWay: 90,
      growthRating: 1,
      cultureRating: 1
    });
    const result = compareOffers(strong, weak);
    expect(result.overallWinner).toBe("A");
    expect(result.scoreA).toBeGreaterThan(result.scoreB);
  });

  it("handles both commutes being 0 without dividing by zero", () => {
    const a = makeOffer({ commuteMinutesOneWay: 0 });
    const b = makeOffer({ commuteMinutesOneWay: 0 });
    const result = compareOffers(a, b);
    const commuteRow = result.rows.find((r) => r.category === "commute");
    expect(commuteRow?.winner).toBe("tie");
    expect(Number.isFinite(result.scoreA)).toBe(true);
  });
});
