import { describe, expect, it } from "vitest";
import { analyzeHeadline, extractRoleGuess, suggestHeadlines } from "@/lib/headlineOptimizer";

describe("analyzeHeadline", () => {
  it("scores an empty headline at 0", () => {
    expect(analyzeHeadline("").score).toBe(0);
  });

  it("flags generic 'seeking new opportunities' phrasing", () => {
    const result = analyzeHeadline("Seeking new opportunities in marketing");
    expect(result.genericPhrasesFound).toContain("seeking new opportunities");
    expect(result.score).toBeLessThan(70);
  });

  it("rewards separators, power words, and numbers with a high score", () => {
    const result = analyzeHeadline("Senior Data Analyst | Driving 30% growth through SQL & Python dashboards");
    expect(result.hasSeparator).toBe(true);
    expect(result.hasPowerWord).toBe(true);
    expect(result.hasNumbers).toBe(true);
    expect(result.genericPhrasesFound).toHaveLength(0);
    expect(result.score).toBeGreaterThanOrEqual(85);
  });

  it("flags headlines under the ideal minimum length as too short", () => {
    expect(analyzeHeadline("Marketer").tooShort).toBe(true);
  });

  it("flags headlines over LinkedIn's character limit", () => {
    const longHeadline = "A".repeat(250);
    expect(analyzeHeadline(longHeadline).withinLinkedInLimit).toBe(false);
  });
});

describe("extractRoleGuess", () => {
  it("takes the segment before the first separator", () => {
    expect(extractRoleGuess("Product Manager | SaaS | B2B")).toBe("Product Manager");
  });

  it("falls back to 'Professional' for empty input", () => {
    expect(extractRoleGuess("   ")).toBe("Professional");
  });

  it("returns the whole string when there's no separator", () => {
    expect(extractRoleGuess("Marketing Coordinator")).toBe("Marketing Coordinator");
  });
});

describe("suggestHeadlines", () => {
  it("returns exactly 5 distinct suggestions", () => {
    const suggestions = suggestHeadlines("Software Engineer | React & Node");
    expect(suggestions).toHaveLength(5);
    const ids = new Set(suggestions.map((s) => s.id));
    expect(ids.size).toBe(5);
  });

  it("seeds every suggestion with the extracted role", () => {
    const suggestions = suggestHeadlines("Registered Nurse | ICU");
    for (const suggestion of suggestions) {
      expect(suggestion.headline.toLowerCase()).toContain("registered nurse");
    }
  });
});
