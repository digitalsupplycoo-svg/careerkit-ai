import { describe, expect, it } from "vitest";
import { generateCoverLetters } from "@/lib/coverLetter";

const BASE_INPUT = {
  companyName: "Acme Corp",
  jobTitle: "Product Manager",
  skills: ["roadmapping", "stakeholder communication", "SQL"] as [string, string, string],
  tone: "formal" as const
};

describe("generateCoverLetters", () => {
  it("returns exactly 3 structurally distinct variants", () => {
    const variants = generateCoverLetters(BASE_INPUT);
    expect(variants).toHaveLength(3);
    const ids = variants.map((v) => v.id);
    expect(new Set(ids).size).toBe(3);
  });

  it("every variant mentions the company, role, and all three skills", () => {
    const variants = generateCoverLetters(BASE_INPUT);
    for (const variant of variants) {
      expect(variant.body).toContain("Acme Corp");
      expect(variant.body).toContain("Product Manager");
      expect(variant.body).toContain("roadmapping");
      expect(variant.body).toContain("stakeholder communication");
      expect(variant.body).toContain("SQL");
    }
  });

  it("bodies are meaningfully different from each other, not just relabeled", () => {
    const [a, b, c] = generateCoverLetters(BASE_INPUT).map((v) => v.body);
    expect(a).not.toBe(b);
    expect(b).not.toBe(c);
    expect(a).not.toBe(c);
  });

  it("falls back to bracketed placeholders when fields are left blank", () => {
    const variants = generateCoverLetters({
      companyName: "",
      jobTitle: "",
      skills: ["", "", ""],
      tone: "formal"
    });
    expect(variants[0].body).toContain("[Company Name]");
    expect(variants[0].body).toContain("[Job Title]");
    expect(variants[0].body).toContain("[Your Name]");
  });

  it("casual tone changes the greeting and sign-off", () => {
    const formal = generateCoverLetters({ ...BASE_INPUT, tone: "formal" });
    const casual = generateCoverLetters({ ...BASE_INPUT, tone: "casual" });
    expect(formal[0].body).toContain("Dear Hiring Manager,");
    expect(casual[0].body).toContain("Hi there,");
    expect(formal[0].body).toContain("Sincerely,");
    expect(casual[0].body).toContain("Best,");
  });

  it("uses the applicant name in the sign-off when provided", () => {
    const variants = generateCoverLetters({ ...BASE_INPUT, applicantName: "Jordan Lee" });
    for (const variant of variants) {
      expect(variant.body).toContain("Jordan Lee");
    }
  });
});
